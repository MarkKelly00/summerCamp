/**
 * Admin home — quick access to the lesson + reward editors and approval
 * queue. Stats card shows live counts.
 */

import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, Gift, ListChecks } from "lucide-react";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import {
  Lesson,
  Reward,
  RewardRedemption,
} from "@/lib/db/models";

import { AppShell } from "@/components/ui/AppShell";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampButton } from "@/components/ui/CampButton";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  await connectToDatabase();
  const [lessonsLive, lessonsDraft, rewardsActive, rewardsTotal, pendingApprovals] =
    await Promise.all([
      Lesson.countDocuments({ published: { $ne: false } }),
      Lesson.countDocuments({ published: false }),
      Reward.countDocuments({ active: true }),
      Reward.countDocuments({}),
      RewardRedemption.countDocuments({ status: "pending" }),
    ]);

  return (
    <AppShell
      identity={{
        line1: "Admin",
        line2: "Author lessons, manage rewards, oversee approvals",
      }}
      nav={[
        { href: "/parent/dashboard", label: "Parent view" },
        { href: "/api/admin/lessons/export", label: "Export JSON" },
      ]}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <Tile
          icon={<BookOpen className="h-5 w-5" />}
          title="Lessons"
          stat={`${lessonsLive} live · ${lessonsDraft} draft${lessonsDraft === 1 ? "" : "s"}`}
          ctaHref="/admin/lessons"
          ctaLabel="Open library"
        />
        <Tile
          icon={<Gift className="h-5 w-5" />}
          title="Rewards"
          stat={`${rewardsActive} active · ${rewardsTotal} total`}
          ctaHref="/admin/rewards"
          ctaLabel="Open catalog"
        />
        <Tile
          icon={<ListChecks className="h-5 w-5" />}
          title="Approvals"
          stat={`${pendingApprovals} pending`}
          ctaHref="/parent/approvals"
          ctaLabel="Open queue"
        />
      </div>

      <CampCard className="mt-4">
        <CampKicker>Quick links</CampKicker>
        <ul className="mt-2 space-y-1 text-sm">
          <li>
            <Link href="/admin/lessons/new" className="text-[var(--camp-accent)] underline-offset-2 hover:underline">
              + New lesson
            </Link>
          </li>
          <li>
            <Link href="/admin/rewards/new" className="text-[var(--camp-accent)] underline-offset-2 hover:underline">
              + New reward
            </Link>
          </li>
          <li>
            <a href="/api/admin/lessons/export" className="text-[var(--camp-accent)] underline-offset-2 hover:underline">
              Download all lessons as JSON
            </a>
          </li>
        </ul>
      </CampCard>
    </AppShell>
  );
}

function Tile({
  icon,
  title,
  stat,
  ctaHref,
  ctaLabel,
}: {
  icon: React.ReactNode;
  title: string;
  stat: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <CampCard className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-camp-ink-muted">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--camp-accent)]/15 text-[var(--camp-accent)]">
          {icon}
        </span>
        <p className="text-xs font-semibold uppercase tracking-widest">{title}</p>
      </div>
      <p className="text-xl font-bold">{stat}</p>
      <Link href={ctaHref}>
        <CampButton intent="primary" size="sm">
          {ctaLabel}
        </CampButton>
      </Link>
    </CampCard>
  );
}
