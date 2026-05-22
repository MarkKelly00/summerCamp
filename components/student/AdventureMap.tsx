"use client";

/**
 * AdventureMap — week-by-week 8x5 grid showing lesson status at a glance.
 *
 * Cells are real <Link>s so keyboard navigation works without custom code.
 * The cell's color reflects progress: locked (no lesson yet), available
 * (no progress), in-progress, mastered, exceeded, completed-below-mastery.
 *
 * Subject lives in the cell's icon (we use a one-letter glyph). Phase 9
 * accessibility pass adds optional alt-text per subject.
 */

import Link from "next/link";
import { motion } from "framer-motion";

import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

type Status =
  | "locked"
  | "available"
  | "in-progress"
  | "practicing"
  | "mastered"
  | "exceeded";

export interface AdventureMapCell {
  week: number;
  day: number;
  slug: string;
  title: string;
  subject: string;
  status: Status;
  isCapstone?: boolean;
  isBonus?: boolean;
}

interface AdventureMapProps {
  cells: AdventureMapCell[];
  weeks: { week: number; theme: string }[];
}

const SUBJECT_LETTER: Record<string, string> = {
  math: "M",
  science: "S",
  reading: "R",
  writing: "W",
  history: "H",
  engineering: "E",
};

const STATUS_CLASSES: Record<Status, string> = {
  locked:
    "bg-[var(--camp-surface-soft)]/60 text-camp-ink-muted/50 border-dashed",
  available:
    "bg-[var(--camp-surface-soft)] text-camp-ink border-[var(--camp-border)] hover:border-[var(--camp-accent)]",
  "in-progress":
    "bg-[var(--camp-quest)]/15 text-camp-ink border-[var(--camp-quest)]",
  practicing:
    "bg-[var(--camp-warning)]/15 text-camp-ink border-[var(--camp-warning)]/70",
  mastered:
    "bg-[var(--camp-positive)]/15 text-camp-ink border-[var(--camp-positive)]",
  exceeded:
    "bg-[var(--camp-accent)]/25 text-camp-ink border-[var(--camp-accent)] shadow-camp-glow",
};

const STATUS_LABEL: Record<Status, string> = {
  locked: "Not yet",
  available: "Ready to start",
  "in-progress": "In progress",
  practicing: "Practicing",
  mastered: "Mastered",
  exceeded: "Crushed it",
};

export function AdventureMap({ cells, weeks }: AdventureMapProps) {
  const grid = new Map<string, AdventureMapCell>();
  for (const c of cells) grid.set(`${c.week}-${c.day}`, c);

  return (
    <CampCard className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <CampKicker>Adventure map</CampKicker>
          <h3 className="text-xl font-bold">Your eight-week trail</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <CampChip tone="positive">Mastered</CampChip>
          <CampChip tone="warning">Practicing</CampChip>
          <CampChip tone="quest">In progress</CampChip>
        </div>
      </div>

      <div className="space-y-3">
        {weeks.map((w, weekIdx) => (
          <motion.div
            key={w.week}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: weekIdx * 0.04 }}
            className="space-y-1.5"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-camp-ink-muted">
                Week {w.week}
              </p>
              <p className="text-xs text-camp-ink-muted">{w.theme}</p>
            </div>
            <ol className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((day) => {
                const cell = grid.get(`${w.week}-${day}`);
                if (!cell) {
                  return (
                    <li
                      key={day}
                      className={`flex aspect-square flex-col items-center justify-center rounded-lg border text-[0.7rem] font-semibold ${STATUS_CLASSES.locked}`}
                      aria-label={`Week ${w.week} day ${day}: not seeded yet`}
                    >
                      <span>—</span>
                    </li>
                  );
                }
                const letter = SUBJECT_LETTER[cell.subject] ?? cell.subject[0]?.toUpperCase() ?? "?";
                return (
                  <li key={day}>
                    <Link
                      href={`/student/lesson/${cell.slug}`}
                      aria-label={`Week ${cell.week} day ${cell.day}, ${cell.subject}: ${cell.title}. ${STATUS_LABEL[cell.status]}.`}
                      className={`flex aspect-square flex-col items-center justify-center rounded-lg border-2 text-[0.7rem] font-bold transition motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)] ${STATUS_CLASSES[cell.status]}`}
                    >
                      <span className="text-base">{letter}</span>
                      <span className="text-[0.6rem] opacity-80">D{cell.day}</span>
                      {cell.isCapstone ? (
                        <span className="text-[0.5rem] uppercase tracking-widest text-[var(--camp-accent)]">★</span>
                      ) : cell.isBonus ? (
                        <span className="text-[0.5rem] uppercase tracking-widest text-[var(--camp-quest)]">◆</span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </motion.div>
        ))}
      </div>
    </CampCard>
  );
}
