"use client";

/**
 * Result + reward reveal screen after a lesson submission.
 *
 * Shows score, XP/Fun Money earned, new level, new streak, and any newly
 * earned badges. Reduced-motion users get a static layout with no
 * animation.
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Coins, Flame, Sparkles, Trophy } from "lucide-react";

import type { AwardLessonCompletionState } from "@/lib/actions/progress";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

interface Props {
  state: AwardLessonCompletionState | null;
  submitting: boolean;
  onReplay(): void;
}

export function LessonResult({ state, submitting, onReplay }: Props) {
  if (submitting || !state) {
    return (
      <CampCard className="text-center" aria-live="polite">
        <CampKicker>Saving your work</CampKicker>
        <p className="mt-2 text-base text-camp-ink">Almost there…</p>
      </CampCard>
    );
  }

  if (!state.ok) {
    return (
      <CampCard className="text-center" role="alert" aria-live="assertive">
        <CampKicker>Something went wrong</CampKicker>
        <p className="mt-2 text-base text-camp-ink">
          {state.error ?? "Try again."}
        </p>
        <div className="mt-4 flex justify-center">
          <CampButton intent="primary" onClick={onReplay}>
            Try again
          </CampButton>
        </div>
      </CampCard>
    );
  }

  const r = state.result!;
  const masteryLabel =
    r.masteryLevel === "exceeded"
      ? "Crushed it"
      : r.masteryLevel === "mastered"
        ? "Mastered"
        : r.masteryLevel === "practicing"
          ? "Practicing"
          : "Logged";
  const masteryTone =
    r.masteryLevel === "exceeded"
      ? "accent"
      : r.masteryLevel === "mastered"
        ? "positive"
        : "warning";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="motion-reduce:transition-none"
    >
      <CampCard className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <CampKicker>Quest complete</CampKicker>
            <h2 className="mt-1 text-2xl font-bold">{masteryLabel}</h2>
          </div>
          <CampChip tone={masteryTone as never}>{r.score} / 100</CampChip>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            icon={<Sparkles className="h-4 w-4" />}
            label="XP earned"
            value={`+${r.earnedXp}`}
            sub={`Total ${r.newXp} · Level ${r.newLevel}`}
          />
          <Stat
            icon={<Coins className="h-4 w-4" />}
            label="Fun Money"
            value={r.earnedFunMoney > 0 ? `+${r.earnedFunMoney}` : "0"}
            sub={`Wallet ${r.newFunMoney}`}
          />
          <Stat
            icon={<Flame className="h-4 w-4" />}
            label="Streak"
            value={`${r.currentStreak} day${r.currentStreak === 1 ? "" : "s"}`}
            sub={r.streakAdvanced ? "Advanced today" : "Already counted today"}
          />
          <Stat
            icon={<Trophy className="h-4 w-4" />}
            label="Badges"
            value={r.newBadgeNames.length > 0 ? `+${r.newBadgeNames.length}` : "0"}
            sub={
              r.newBadgeNames.length > 0
                ? r.newBadgeNames.slice(0, 2).join(" · ")
                : "Keep going"
            }
          />
        </div>

        {r.newBadgeNames.length > 0 ? (
          <div className="camp-card-soft px-4 py-3">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
              New badges
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {r.newBadgeNames.map((b) => (
                <CampChip key={b} tone="accent" icon={<Trophy className="h-3 w-3" />}>
                  {b}
                </CampChip>
              ))}
            </div>
          </div>
        ) : null}

        {!r.isFirstAward ? (
          <p className="text-xs text-camp-ink-muted">
            You&apos;d already mastered this quest — practice XP only. Fun
            Money is awarded the first time you reach mastery.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Link href="/student/dashboard">
            <CampButton intent="primary">Back to the trail</CampButton>
          </Link>
          <CampButton intent="secondary" onClick={onReplay}>
            Replay this quest
          </CampButton>
        </div>
      </CampCard>
    </motion.div>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="camp-card-soft px-3 py-2">
      <div className="flex items-center gap-2 text-camp-ink-muted">
        {icon}
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <p className="mt-0.5 text-xl font-bold text-camp-ink">{value}</p>
      {sub ? <p className="text-[0.7rem] text-camp-ink-muted">{sub}</p> : null}
    </div>
  );
}
