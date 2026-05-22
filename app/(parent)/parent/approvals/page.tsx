/**
 * Parent approval queue — `/parent/approvals`.
 *
 * Lists all pending redemptions for the parent's family, plus a recent
 * approved/fulfilled/rejected history. Server Component fetches; the
 * client component wires up the approve/reject/fulfill actions.
 */
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Family, RewardRedemption, User } from "@/lib/db/models";

import { AppShell } from "@/components/ui/AppShell";

import { ApprovalsClient } from "./approvals-client";

export const dynamic = "force-dynamic";

export default async function ApprovalsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "parent" && session.role !== "admin") {
    redirect("/student/dashboard");
  }

  await connectToDatabase();

  // Resolve the parent's family + linked student IDs.
  const parent = await User.findById(session.userId).lean();
  const familyId = parent?.familyId;
  const family = familyId ? await Family.findById(familyId).lean() : null;
  const studentIds = family?.studentIds ?? [];

  // Build a name lookup so we can show "for Addie" / "for Dean".
  const students = studentIds.length
    ? await User.find({ _id: { $in: studentIds } })
        .select({ _id: 1, "profile.name": 1, username: 1 })
        .lean()
    : [];
  const nameById = new Map(
    students.map((s) => [
      String(s._id),
      s.profile?.name ?? s.username,
    ]),
  );

  // Pull all redemptions for the family, newest first.
  const redemptionsRaw = studentIds.length
    ? await RewardRedemption.find({ userId: { $in: studentIds } })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean()
    : [];

  const redemptions = redemptionsRaw.map((r) => ({
    id: String(r._id),
    studentId: String(r.userId),
    studentName: nameById.get(String(r.userId)) ?? "Unknown",
    rewardName: r.rewardName,
    cost: r.costAtRedemption || r.cost,
    status: r.status,
    code: r.code,
    notes: r.notes,
    createdAt:
      r.createdAt instanceof Date ? r.createdAt.toISOString() : "",
  }));

  return (
    <AppShell
      identity={{
        line1: "Reward approvals",
        line2: family?.name ?? "Kelly Family",
      }}
      nav={[
        { href: "/parent/dashboard", label: "Dashboard" },
        ...(session.role === "admin"
          ? [{ href: "/admin", label: "Admin" }]
          : []),
      ]}
    >
      <ApprovalsClient initialRedemptions={redemptions} />
    </AppShell>
  );
}
