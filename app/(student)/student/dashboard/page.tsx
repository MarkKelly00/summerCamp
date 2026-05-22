/**
 * Student dashboard — adventure-map view.
 *
 * Server Component pulls the user's stats + their track's lessons + their
 * progress, computes the next un-completed lesson, and renders the
 * Adventure Map, Today's Quest card, and stat HUD.
 */
import { redirect } from "next/navigation";
import { Coins, Flame, Sparkles, Star } from "lucide-react";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Lesson, Progress, User } from "@/lib/db/models";
import { TRACK_SLUG_PREFIX } from "@/lib/curriculum/slugs";
import { TRACK_WEEKS } from "@/lib/curriculum/2026";
import { levelForXp, xpToNextLevel } from "@/lib/gamification/scoring";

import { AppShell } from "@/components/ui/AppShell";
import { CampStat, CampXpBar } from "@/components/ui/CampStat";
import { CampCard } from "@/components/ui/CampCard";
import {
  AdventureMap,
  type AdventureMapCell,
} from "@/components/student/AdventureMap";
import { TodaysQuest } from "@/components/student/TodaysQuest";

export const dynamic = "force-dynamic";

export default async function StudentDashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectToDatabase();
  const user = await User.findById(session.userId).lean();
  if (!user) redirect("/login");

  const track = user.profile?.learningTrack ?? "entering-3rd";
  const prefix = TRACK_SLUG_PREFIX[track];

  const [lessonsRaw, progressRaw] = await Promise.all([
    Lesson.find({
      learningTrack: track,
      slug: { $regex: `^${prefix}` },
      published: { $ne: false },
    })
      .sort({ week: 1, day: 1 })
      .lean(),
    Progress.find({ studentId: user._id }).lean(),
  ]);

  const progressBySlug = new Map<string, (typeof progressRaw)[number]>();
  for (const p of progressRaw) {
    progressBySlug.set(String(p.lessonId), p);
  }

  // Build adventure-map cells.
  const cells: AdventureMapCell[] = lessonsRaw.map((l) => {
    const p = progressBySlug.get(String(l._id));
    let status: AdventureMapCell["status"] = "available";
    if (p) {
      if (p.masteryLevel === "exceeded") status = "exceeded";
      else if (p.masteryLevel === "mastered") status = "mastered";
      else if (p.masteryLevel === "practicing") status = "practicing";
      else if (p.status === "in-progress") status = "in-progress";
      else if (p.status === "completed") status = "mastered";
    }
    return {
      week: l.week,
      day: l.day,
      slug: l.slug ?? "",
      title: l.title,
      subject: l.subject,
      status,
      isCapstone: l.lessonType === "capstone",
      isBonus: l.lessonType === "bonus",
    };
  });

  // Pick today's quest = first lesson not completed/mastered, sorted by week/day.
  const ordered = [...lessonsRaw].sort((a, b) =>
    a.week !== b.week ? a.week - b.week : a.day - b.day,
  );
  const nextLesson = ordered.find((l) => {
    const p = progressBySlug.get(String(l._id));
    return !p || p.status !== "completed";
  });

  const trackWeeks = TRACK_WEEKS[track];
  const weeks = trackWeeks.map((w) => ({ week: w.week, theme: w.theme }));
  const weekTheme = nextLesson
    ? trackWeeks.find((w) => w.week === nextLesson.week)?.theme
    : undefined;

  const xp = user.xp ?? 0;
  const level = levelForXp(xp);
  const toNext = xpToNextLevel(xp);

  return (
    <AppShell
      identity={{
        line1: `Hi, ${user.profile?.name ?? user.username}.`,
        line2:
          track === "entering-3rd"
            ? "Entering 3rd grade"
            : "Entering 5th grade",
      }}
      nav={[
        { href: "/student/mini-games", label: "Mini-games" },
        { href: "/student/rewards", label: "Prize shop" },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-4">
        <CampStat
          label="Level"
          value={level}
          icon={<Star className="h-5 w-5" />}
        />
        <div className="camp-card-soft px-4 py-3 lg:col-span-2">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            Experience
          </p>
          <CampXpBar xp={xp} level={level} toNext={toNext} />
        </div>
        <CampStat
          label="Fun Money"
          value={user.funMoney ?? 0}
          icon={<Coins className="h-5 w-5" />}
        />
        <CampStat
          label="Streak"
          value={`${user.currentStreak ?? 0} day${(user.currentStreak ?? 0) === 1 ? "" : "s"}`}
          icon={<Flame className="h-5 w-5" />}
          hint={`Longest ${user.longestStreak ?? 0}`}
        />
        <CampStat
          label="Badges"
          value={(user.badges ?? []).length}
          icon={<Sparkles className="h-5 w-5" />}
        />
        <CampStat
          label="Lessons done"
          value={`${progressRaw.filter((p) => p.status === "completed").length} / ${lessonsRaw.length}`}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <TodaysQuest
            lesson={
              nextLesson
                ? {
                    slug: nextLesson.slug ?? "",
                    title: nextLesson.title,
                    questTitle: nextLesson.questTitle,
                    subject: nextLesson.subject,
                    week: nextLesson.week,
                    day: nextLesson.day,
                    estimatedMinutes:
                      nextLesson.estimatedMinutes ??
                      nextLesson.estimatedTime ??
                      30,
                    lessonType: nextLesson.lessonType,
                    miniGameSlug: nextLesson.miniGameId ? "wired" : undefined,
                  }
                : null
            }
            weekTheme={weekTheme}
          />
        </div>
        <div className="lg:col-span-2">
          <CampCard className="h-full">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
              How the trail works
            </p>
            <h3 className="mt-1 text-lg font-bold">Eight weeks of camp</h3>
            <ul className="mt-3 space-y-2 text-sm text-camp-ink-muted">
              <li>
                <span className="font-semibold text-camp-ink">Five days</span>{" "}
                per week, ~1 hour each.
              </li>
              <li>
                Tap any cell to open that quest. Cells turn{" "}
                <span className="text-[var(--camp-positive)]">green</span> when
                mastered.
              </li>
              <li>
                Capstones (★) and bonus quests (◆) award extra Fun Money.
              </li>
              <li>
                Replay any lesson for practice XP — no double Fun Money.
              </li>
            </ul>
          </CampCard>
        </div>
      </div>

      <div className="mt-6">
        <AdventureMap cells={cells} weeks={weeks} />
      </div>
    </AppShell>
  );
}
