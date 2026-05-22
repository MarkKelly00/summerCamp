"use client";

/**
 * Today's Quest — the single biggest CTA on the dashboard. Surfaces the
 * student's next un-completed lesson with a hero treatment.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, BookOpen, Gamepad2, Trophy } from "lucide-react";

import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";
import { CampButton } from "@/components/ui/CampButton";

export interface TodaysQuestProps {
  lesson: {
    slug: string;
    title: string;
    questTitle?: string;
    subject: string;
    week: number;
    day: number;
    estimatedMinutes: number;
    lessonType: "core" | "bonus" | "capstone";
    miniGameSlug?: string;
  } | null;
  weekTheme?: string;
}

export function TodaysQuest({ lesson, weekTheme }: TodaysQuestProps) {
  if (!lesson) {
    return (
      <CampCard className="text-center">
        <CampKicker>Today&apos;s quest</CampKicker>
        <h2 className="mt-2 text-2xl font-bold">Camp complete!</h2>
        <p className="mt-1 text-sm text-camp-ink-muted">
          You&apos;ve finished every lesson on the trail. Replay any mini-game
          or revisit a favorite quest.
        </p>
        <div className="mt-4 flex justify-center gap-2">
          <Link href="/student/mini-games">
            <CampButton intent="primary">Play a mini-game</CampButton>
          </Link>
          <Link href="/student/rewards">
            <CampButton intent="secondary">Prize shop</CampButton>
          </Link>
        </div>
      </CampCard>
    );
  }

  const typeChip =
    lesson.lessonType === "capstone" ? (
      <CampChip tone="accent" icon={<Trophy className="h-3 w-3" />}>
        Capstone
      </CampChip>
    ) : lesson.lessonType === "bonus" ? (
      <CampChip tone="quest" icon={<Sparkles className="h-3 w-3" />}>
        Bonus quest
      </CampChip>
    ) : (
      <CampChip tone="neutral">Core lesson</CampChip>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CampCard className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--camp-accent)]/15 blur-3xl"
        />
        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <CampKicker>Today&apos;s quest</CampKicker>
            <span className="text-[0.7rem] text-camp-ink-muted">
              · Week {lesson.week} · Day {lesson.day}
              {weekTheme ? ` · ${weekTheme}` : ""}
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
            {lesson.questTitle ?? lesson.title}
          </h2>
          <p className="mt-1 text-sm text-camp-ink-muted">{lesson.title}</p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {typeChip}
            <CampChip tone="neutral" icon={<BookOpen className="h-3 w-3" />}>
              {lesson.subject}
            </CampChip>
            <CampChip tone="neutral">
              ~{lesson.estimatedMinutes} min
            </CampChip>
            {lesson.miniGameSlug ? (
              <CampChip tone="quest" icon={<Gamepad2 className="h-3 w-3" />}>
                Includes mini-game
              </CampChip>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href={`/student/lesson/${lesson.slug}`}>
              <CampButton intent="primary" size="lg">
                Start the quest
              </CampButton>
            </Link>
            <Link href="/student/mini-games">
              <CampButton intent="secondary">Mini-games</CampButton>
            </Link>
          </div>
        </div>
      </CampCard>
    </motion.div>
  );
}
