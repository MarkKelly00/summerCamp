/**
 * Student prize shop page.
 */
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Reward, RewardRedemption, User } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";

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
    <AppShell
      identity={{
        line1: "Prize shop",
        line2: user?.profile?.name ?? session.username,
      }}
      nav={[
        { href: "/student/dashboard", label: "Back to trail" },
        { href: "/student/mini-games", label: "Mini-games" },
      ]}
    >
      <RewardsClient
        studentId={session.userId}
        initialFunMoney={user?.funMoney ?? 0}
        rewards={rewards}
        redemptions={redemptions}
      />
    </AppShell>
  );
}
