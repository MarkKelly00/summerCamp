/**
 * Student prize shop — `/student/rewards`.
 *
 * Server Component: fetches the user's Fun Money balance, the active
 * reward catalog, and the user's recent redemption history. Hands the
 * data to the RewardsClient which wires up the redeem button via
 * Server Action.
 *
 * Phase 7 will skin this; Phase 6 keeps it utilitarian.
 */
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Reward, RewardRedemption, User } from "@/lib/db/models";

import { RewardsClient } from "./rewards-client";

export const dynamic = "force-dynamic";

export default async function StudentRewardsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectToDatabase();
  const [user, rewardsRaw, redemptionsRaw] = await Promise.all([
    User.findById(session.userId).lean(),
    Reward.find({ active: true }).sort({ cost: 1 }).lean(),
    RewardRedemption.find({ userId: session.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean(),
  ]);

  const rewards = rewardsRaw.map((r) => ({
    id: String(r._id),
    name: r.name,
    description: r.description,
    cost: r.cost,
    category: r.category ?? "custom",
    requiresParentApproval: !!r.requiresParentApproval,
    inventoryCount: r.inventoryCount,
  }));

  const redemptions = redemptionsRaw.map((r) => ({
    id: String(r._id),
    rewardName: r.rewardName,
    cost: r.costAtRedemption || r.cost,
    status: r.status,
    code: r.code,
    notes: r.notes,
    createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : "",
  }));

  return (
    <RewardsClient
      studentId={session.userId}
      initialFunMoney={user?.funMoney ?? 0}
      rewards={rewards}
      redemptions={redemptions}
    />
  );
}
