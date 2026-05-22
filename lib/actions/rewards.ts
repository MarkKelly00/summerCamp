"use server";

/**
 * Reward redemption Server Actions.
 *
 * Lifecycle:
 *   requestRedemption    -> pending  | approved (if auto)
 *   approveRedemption    -> approved (from pending)
 *   rejectRedemption     -> rejected (from pending, REFUNDS Fun Money)
 *   fulfillRedemption    -> fulfilled (from approved, marks redeemed)
 *
 * All four use the shared `runInTx` helper, which calls
 * `session.withTransaction` under the hood — meaning transient
 * MongoDB errors (catalog changes, lock timeouts, write conflicts)
 * are auto-retried.
 *
 * Graceful refusals (insufficient balance, illegal state transition)
 * are signaled with `GracefulAbortError` so the transaction aborts
 * cleanly and the action returns ok:false without logging a "real"
 * server error.
 */

import { Types } from "mongoose";
import { randomBytes } from "crypto";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { GracefulAbortError, runInTx } from "@/lib/db/transaction";
import {
  Reward,
  RewardRedemption,
  User,
  type RedemptionStatus,
} from "@/lib/db/models";
import {
  RedemptionDecisionSchema,
  RedemptionRequestSchema,
  type RedemptionDecisionInput,
  type RedemptionRequestInput,
} from "@/lib/schemas/reward";

export interface RewardActionState {
  ok: boolean;
  error?: string;
  result?: {
    redemptionId: string;
    status: RedemptionStatus;
    code?: string;
    newFunMoney?: number;
    rewardName?: string;
  };
}

function generateCode(rewardName: string): string {
  const prefix = rewardName
    .replace(/[^A-Za-z]/g, "")
    .slice(0, 3)
    .toUpperCase()
    .padEnd(3, "X");
  const unique = randomBytes(4).toString("hex").toUpperCase();
  return `${prefix}-${unique.slice(0, 6)}`;
}

async function assertParentOrAdmin(): Promise<
  | { ok: true; userId: string }
  | { ok: false; state: RewardActionState }
> {
  const session = await getSession();
  if (!session)
    return { ok: false, state: { ok: false, error: "Not signed in." } };
  if (session.role !== "parent" && session.role !== "admin") {
    return {
      ok: false,
      state: { ok: false, error: "Only a parent or admin can do that." },
    };
  }
  return { ok: true, userId: session.userId };
}

// ---------------------------------------------------------------------------
// requestRedemption
// ---------------------------------------------------------------------------

export async function requestRedemption(
  input: RedemptionRequestInput,
): Promise<RewardActionState> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Not signed in." };

  const parsed = RedemptionRequestSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid request." };

  if (
    session.role === "student" &&
    session.userId !== parsed.data.studentId
  ) {
    return { ok: false, error: "Students may only redeem for themselves." };
  }
  if (session.role === "parent") {
    return {
      ok: false,
      error: "Parents approve redemptions; they don't initiate them.",
    };
  }

  await connectToDatabase();

  // Pre-validate the reward outside the tx — read-only and avoids
  // wasting a transaction slot when the reward is bad.
  const reward = await Reward.findById(parsed.data.rewardId).lean();
  if (!reward) return { ok: false, error: "Reward not found." };
  if (!reward.active) return { ok: false, error: "This reward is not active." };
  if (reward.inventoryCount != null && reward.inventoryCount <= 0) {
    return { ok: false, error: "This reward is sold out." };
  }

  const rewardCost = reward.cost;
  const rewardName = reward.name;
  const wantsApproval = !!reward.requiresParentApproval;
  const hasInventory = reward.inventoryCount != null;

  try {
    const result = await runInTx(async (mongoSession) => {
      const userDoc = await User.findById(parsed.data.studentId).session(
        mongoSession,
      );
      if (!userDoc) throw new GracefulAbortError("User not found.");

      if ((userDoc.funMoney ?? 0) < rewardCost) {
        throw new GracefulAbortError("Not enough Fun Money.");
      }

      userDoc.funMoney = (userDoc.funMoney ?? 0) - rewardCost;

      const status: RedemptionStatus = wantsApproval ? "pending" : "approved";
      const code = generateCode(rewardName);

      const created = await RewardRedemption.create(
        [
          {
            userId: userDoc._id,
            rewardId: parsed.data.rewardId,
            rewardName,
            cost: rewardCost,
            costAtRedemption: rewardCost,
            status,
            code,
            redeemed: false,
          },
        ],
        { session: mongoSession },
      );
      const newRedemption = created[0]!;

      if (hasInventory) {
        await Reward.updateOne(
          { _id: parsed.data.rewardId },
          { $inc: { inventoryCount: -1 } },
          { session: mongoSession },
        );
      }

      userDoc.rewardHistory = [
        ...(userDoc.rewardHistory ?? []),
        newRedemption._id as Types.ObjectId,
      ];
      await userDoc.save({ session: mongoSession });

      return {
        redemptionId: String(newRedemption._id),
        status,
        code,
        newFunMoney: userDoc.funMoney,
        rewardName,
      };
    });

    return { ok: true, result };
  } catch (err) {
    if (err instanceof GracefulAbortError) {
      return { ok: false, error: err.reason };
    }
    console.error("[requestRedemption] failed:", err);
    return { ok: false, error: "Could not request the reward. Try again." };
  }
}

// ---------------------------------------------------------------------------
// approveRedemption
// ---------------------------------------------------------------------------

export async function approveRedemption(
  input: RedemptionDecisionInput,
): Promise<RewardActionState> {
  const auth = await assertParentOrAdmin();
  if (!auth.ok) return auth.state;

  const parsed = RedemptionDecisionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid decision payload." };

  await connectToDatabase();

  try {
    const result = await runInTx(async (mongoSession) => {
      const redemption = await RewardRedemption.findById(
        parsed.data.redemptionId,
      ).session(mongoSession);
      if (!redemption) throw new GracefulAbortError("Redemption not found.");
      if (redemption.status !== "pending") {
        throw new GracefulAbortError(
          `Cannot approve from status "${redemption.status}".`,
        );
      }
      redemption.status = "approved";
      redemption.approvedBy = new Types.ObjectId(auth.userId);
      if (parsed.data.notes) redemption.notes = parsed.data.notes;
      await redemption.save({ session: mongoSession });
      return {
        redemptionId: String(redemption._id),
        status: "approved" as RedemptionStatus,
        rewardName: redemption.rewardName,
      };
    });
    return { ok: true, result };
  } catch (err) {
    if (err instanceof GracefulAbortError) {
      return { ok: false, error: err.reason };
    }
    console.error("[approveRedemption] failed:", err);
    return { ok: false, error: "Could not approve. Try again." };
  }
}

// ---------------------------------------------------------------------------
// rejectRedemption — REFUNDS Fun Money
// ---------------------------------------------------------------------------

export async function rejectRedemption(
  input: RedemptionDecisionInput,
): Promise<RewardActionState> {
  const auth = await assertParentOrAdmin();
  if (!auth.ok) return auth.state;

  const parsed = RedemptionDecisionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid decision payload." };

  await connectToDatabase();

  try {
    const result = await runInTx(async (mongoSession) => {
      const redemption = await RewardRedemption.findById(
        parsed.data.redemptionId,
      ).session(mongoSession);
      if (!redemption) throw new GracefulAbortError("Redemption not found.");
      if (redemption.status !== "pending") {
        throw new GracefulAbortError(
          `Cannot reject from status "${redemption.status}".`,
        );
      }
      const userDoc = await User.findById(redemption.userId).session(
        mongoSession,
      );
      if (!userDoc) throw new GracefulAbortError("Original student missing.");

      userDoc.funMoney = (userDoc.funMoney ?? 0) + redemption.costAtRedemption;
      await userDoc.save({ session: mongoSession });

      redemption.status = "rejected";
      redemption.approvedBy = new Types.ObjectId(auth.userId);
      if (parsed.data.notes) redemption.notes = parsed.data.notes;
      await redemption.save({ session: mongoSession });

      return {
        redemptionId: String(redemption._id),
        status: "rejected" as RedemptionStatus,
        newFunMoney: userDoc.funMoney,
        rewardName: redemption.rewardName,
      };
    });
    return { ok: true, result };
  } catch (err) {
    if (err instanceof GracefulAbortError) {
      return { ok: false, error: err.reason };
    }
    console.error("[rejectRedemption] failed:", err);
    return { ok: false, error: "Could not reject. Try again." };
  }
}

// ---------------------------------------------------------------------------
// fulfillRedemption
// ---------------------------------------------------------------------------

export async function fulfillRedemption(
  input: RedemptionDecisionInput,
): Promise<RewardActionState> {
  const auth = await assertParentOrAdmin();
  if (!auth.ok) return auth.state;

  const parsed = RedemptionDecisionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid decision payload." };

  await connectToDatabase();

  try {
    const result = await runInTx(async (mongoSession) => {
      const redemption = await RewardRedemption.findById(
        parsed.data.redemptionId,
      ).session(mongoSession);
      if (!redemption) throw new GracefulAbortError("Redemption not found.");
      if (redemption.status !== "approved") {
        throw new GracefulAbortError(
          `Cannot fulfill from status "${redemption.status}".`,
        );
      }
      redemption.status = "fulfilled";
      redemption.fulfilledBy = new Types.ObjectId(auth.userId);
      redemption.redeemed = true;
      redemption.redeemedAt = new Date();
      if (parsed.data.notes) redemption.notes = parsed.data.notes;
      await redemption.save({ session: mongoSession });
      return {
        redemptionId: String(redemption._id),
        status: "fulfilled" as RedemptionStatus,
        rewardName: redemption.rewardName,
      };
    });
    return { ok: true, result };
  } catch (err) {
    if (err instanceof GracefulAbortError) {
      return { ok: false, error: err.reason };
    }
    console.error("[fulfillRedemption] failed:", err);
    return { ok: false, error: "Could not mark fulfilled. Try again." };
  }
}
