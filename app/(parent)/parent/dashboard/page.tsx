/**
 * Parent dashboard — side-by-side child cards with stats, mastery
 * heatmaps, skill weaknesses, and an approval-queue shortcut.
 */

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import {
  Family,
  Lesson,
  Progress,
  RewardRedemption,
  User,
} from "@/lib/db/models";
import { TRACK_SLUG_PREFIX } from "@/lib/curriculum/slugs";
import { levelForXp } from "@/lib/gamification/scoring";

import { AppShell } from "@/components/ui/AppShell";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampButton } from "@/components/ui/CampButton";
import { CampChip } from "@/components/ui/CampChip";
import { KidCard, type KidCardData } from "@/components/parent/KidCard";
import {
  masteryStatusFor,
  type HeatmapCell,
} from "@/components/parent/MasteryHeatmap";

export const dynamic = "force-dynamic";

export default async function ParentDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "parent" && session.role !== "admin") {
    redirect("/student/dashboard");
  }

  await connectToDatabase();
  const parent = await User.findById(session.userId).lean();
  const familyId = parent?.familyId;
  const family = familyId ? await Family.findById(familyId).lean() : null;
  const studentIds = family?.studentIds ?? [];

  // Pull all kids in parallel.
  const kidsData = await Promise.all(
    studentIds.map(async (id) => {
      const kid = await User.findById(id).lean();
      if (!kid) return null;
      const track =
        (kid.profile?.learningTrack as KidCardData["track"]) ?? "entering-3rd";
      const prefix = TRACK_SLUG_PREFIX[track];

      const [lessons, progress, pendingApprovals, skillMisses] =
        await Promise.all([
          Lesson.find({
            learningTrack: track,
            slug: { $regex: `^${prefix}` },
            published: { $ne: false },
          })
            .select({ week: 1, day: 1, subject: 1, slug: 1, title: 1, _id: 1 })
            .lean(),
          Progress.find({ studentId: id }).lean(),
          RewardRedemption.countDocuments({ userId: id, status: "pending" }),
          Progress.aggregate([
            { $match: { studentId: id } },
            { $unwind: "$quizAnswers" },
            {
              $match: {
                "quizAnswers.isCorrect": false,
                "quizAnswers.skillTag": { $exists: true, $ne: null },
              },
            },
            {
              $group: {
                _id: "$quizAnswers.skillTag",
                misses: { $sum: 1 },
              },
            },
            { $sort: { misses: -1 } },
            { $limit: 8 },
          ]),
        ]);

      const progByLesson = new Map<string, (typeof progress)[number]>();
      for (const p of progress) progByLesson.set(String(p.lessonId), p);
      const heatmap: HeatmapCell[] = lessons.map((l) => {
        const p = progByLesson.get(String(l._id));
        return {
          week: l.week,
          day: l.day,
          subject: l.subject,
          title: l.title,
          status: masteryStatusFor(p?.masteryLevel, p?.status),
        };
      });

      const xp = kid.xp ?? 0;
      const level = levelForXp(xp);
      const completed = progress.filter((p) => p.status === "completed").length;

      const data: KidCardData = {
        name: kid.profile?.name ?? kid.username,
        username: kid.username,
        track,
        level,
        xp,
        funMoney: kid.funMoney ?? 0,
        currentStreak: kid.currentStreak ?? 0,
        longestStreak: kid.longestStreak ?? 0,
        badgeCount: (kid.badges ?? []).length,
        lessonsCompleted: completed,
        lessonsTotal: lessons.length,
        pendingApprovals,
        lastActive: kid.lastActiveDate ?? null,
        topSkillWeaknesses: skillMisses.map((m) => ({
          skillTag: String(m._id),
          misses: m.misses as number,
        })),
        heatmap,
      };
      return data;
    }),
  );
  const kids = kidsData.filter((k): k is KidCardData => k !== null);

  const totalPending = kids.reduce((acc, k) => acc + k.pendingApprovals, 0);

  return (
    <AppShell
      identity={{
        line1: `Welcome, ${parent?.profile?.name ?? parent?.username ?? "Parent"}.`,
        line2: family?.name ?? "Kelly Family",
      }}
      nav={
        session.role === "admin"
          ? [
              { href: "/parent/approvals", label: "Approvals" },
              { href: "/admin", label: "Admin tools" },
            ]
          : [{ href: "/parent/approvals", label: "Approvals" }]
      }
    >
      <CampCard className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <CampKicker>Family at a glance</CampKicker>
          <h2 className="mt-1 text-xl font-bold">
            {kids.length === 1
              ? `1 camper signed up`
              : `${kids.length} campers signed up`}
          </h2>
          <p className="mt-1 text-xs text-camp-ink-muted">
            Tap a camper&apos;s heatmap cell label or open Approvals to act.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {totalPending > 0 ? (
            <CampChip tone="warning">
              {totalPending} pending approval{totalPending === 1 ? "" : "s"}
            </CampChip>
          ) : (
            <CampChip tone="positive">No pending approvals</CampChip>
          )}
          <a href="/parent/approvals">
            <CampButton intent="primary">Open approvals</CampButton>
          </a>
        </div>
      </CampCard>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {kids.map((kid) => (
          <KidCard key={kid.username} kid={kid} />
        ))}
        {kids.length === 0 ? (
          <CampCard className="text-center">
            <CampKicker>No campers linked</CampKicker>
            <p className="mt-2 text-sm text-camp-ink-muted">
              Run the migration script <code>npm run migrate -- 2026-01</code>{" "}
              to set up the Kelly Family aggregate.
            </p>
          </CampCard>
        ) : null}
      </div>
    </AppShell>
  );
}
