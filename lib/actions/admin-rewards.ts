"use server";

/**
 * Admin reward Server Actions. Mirror the lesson admin actions but for
 * the prize-shop catalog.
 */

import { revalidatePath } from "next/cache";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Reward } from "@/lib/db/models";
import {
  RewardUpsertSchema,
  type RewardUpsertInput,
} from "@/lib/schemas/reward";

export interface AdminRewardState {
  ok: boolean;
  error?: string;
  slug?: string;
  fieldErrors?: Record<string, string>;
}

async function requireAdmin(): Promise<
  { ok: true; userId: string } | { ok: false; state: AdminRewardState }
> {
  const session = await getSession();
  if (!session)
    return { ok: false, state: { ok: false, error: "Not signed in." } };
  if (session.role !== "admin")
    return {
      ok: false,
      state: { ok: false, error: "Admin role required." },
    };
  return { ok: true, userId: session.userId };
}

export async function upsertReward(
  input: RewardUpsertInput,
): Promise<AdminRewardState> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.state;

  const parsed = RewardUpsertSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".") || "_root"] = issue.message;
    }
    return { ok: false, error: "Validation failed.", fieldErrors };
  }

  await connectToDatabase();

  const existing = await Reward.findOne({ slug: parsed.data.slug });
  if (existing) {
    existing.name = parsed.data.name;
    existing.description = parsed.data.description;
    existing.cost = parsed.data.cost;
    if (parsed.data.image !== undefined) existing.image = parsed.data.image;
    existing.category = parsed.data.category;
    existing.inventoryCount = parsed.data.inventoryCount;
    existing.requiresParentApproval = parsed.data.requiresParentApproval;
    existing.approvalThreshold = parsed.data.approvalThreshold;
    existing.active = parsed.data.active;
    existing.isAvailable = parsed.data.active; // legacy mirror
    await existing.save();
  } else {
    await Reward.create({
      slug: parsed.data.slug,
      name: parsed.data.name,
      description: parsed.data.description,
      cost: parsed.data.cost,
      image: parsed.data.image,
      category: parsed.data.category,
      inventoryCount: parsed.data.inventoryCount,
      requiresParentApproval: parsed.data.requiresParentApproval,
      approvalThreshold: parsed.data.approvalThreshold,
      active: parsed.data.active,
      isAvailable: parsed.data.active,
    });
  }

  revalidatePath("/admin/rewards");
  revalidatePath("/student/rewards");
  return { ok: true, slug: parsed.data.slug };
}

export async function setRewardActive(
  slug: string,
  active: boolean,
): Promise<AdminRewardState> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.state;

  await connectToDatabase();
  const reward = await Reward.findOne({ slug });
  if (!reward) return { ok: false, error: "Reward not found." };
  reward.active = active;
  reward.isAvailable = active;
  await reward.save();

  revalidatePath("/admin/rewards");
  revalidatePath("/student/rewards");
  return { ok: true, slug };
}
