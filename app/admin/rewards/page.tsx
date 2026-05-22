/**
 * Admin reward catalog list.
 */

import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Reward } from "@/lib/db/models";

import { AppShell } from "@/components/ui/AppShell";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampButton } from "@/components/ui/CampButton";
import { CampChip } from "@/components/ui/CampChip";

export const dynamic = "force-dynamic";

export default async function AdminRewardsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  await connectToDatabase();
  const rewards = await Reward.find({}).sort({ cost: 1 }).lean();

  return (
    <AppShell
      identity={{
        line1: "Reward catalog",
        line2: `${rewards.length} reward${rewards.length === 1 ? "" : "s"} configured`,
      }}
      nav={[
        { href: "/admin/lessons", label: "Lessons" },
        { href: "/admin", label: "Admin home" },
        { href: "/parent/approvals", label: "Approvals" },
      ]}
    >
      <CampCard className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <CampKicker>Rewards</CampKicker>
          <Link href="/admin/rewards/new">
            <CampButton intent="primary">+ New reward</CampButton>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-[0.65rem] uppercase tracking-widest text-camp-ink-muted">
              <tr>
                <th className="py-2">Slug</th>
                <th className="py-2">Name</th>
                <th className="py-2">Cost</th>
                <th className="py-2">Category</th>
                <th className="py-2">Approval</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((r) => (
                <tr
                  key={String(r._id)}
                  className="border-t border-[var(--camp-border)]/40"
                >
                  <td className="py-2 align-top">
                    <Link
                      href={`/admin/rewards/${r.slug ?? String(r._id)}`}
                      className="font-mono text-xs text-[var(--camp-accent)] underline-offset-2 hover:underline"
                    >
                      {r.slug ?? "(no-slug)"}
                    </Link>
                  </td>
                  <td className="py-2 align-top">
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-[0.7rem] text-camp-ink-muted">
                      {r.description}
                    </p>
                  </td>
                  <td className="py-2 align-top font-mono text-sm">
                    {r.cost} FM
                  </td>
                  <td className="py-2 align-top text-xs text-camp-ink-muted">
                    {r.category ?? "custom"}
                  </td>
                  <td className="py-2 align-top">
                    {r.requiresParentApproval ? (
                      <CampChip tone="warning">Required</CampChip>
                    ) : (
                      <CampChip tone="neutral">Auto</CampChip>
                    )}
                  </td>
                  <td className="py-2 align-top">
                    {r.active ? (
                      <CampChip tone="positive">Active</CampChip>
                    ) : (
                      <CampChip tone="danger">Inactive</CampChip>
                    )}
                  </td>
                </tr>
              ))}
              {rewards.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="py-8 text-center text-sm text-camp-ink-muted"
                  >
                    No rewards yet. Add one or run{" "}
                    <code>npm run seed:2026</code>.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </CampCard>
    </AppShell>
  );
}
