"use client";

/**
 * Self-assessment fallback used when a lesson has no quiz questions.
 *
 * The Phase 4 curriculum seeded skeletons with empty quizzes — full
 * quizzes ship via Phase 8 authoring. Until then, the student is the
 * authority on whether they got the activity. This gives them four
 * options that map cleanly to the masteryThreshold tiers.
 */

import { CampButton } from "@/components/ui/CampButton";

interface Option {
  label: string;
  blurb: string;
  score: number;
}

const OPTIONS: Option[] = [
  { label: "Crushed it", blurb: "I got every part of it.", score: 100 },
  { label: "Got it", blurb: "I understand the main idea.", score: 85 },
  { label: "Mostly", blurb: "I get it but I'd want to practice once more.", score: 70 },
  { label: "Need more work", blurb: "I want to try this again tomorrow.", score: 50 },
];

interface Props {
  onChoose(score: number): void;
  disabled?: boolean;
}

export function LessonSelfAssess({ onChoose, disabled }: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-camp-ink-muted">
        This quest doesn&apos;t have an auto-graded quiz yet. Tell us how it
        went — the score updates your XP and Fun Money fairly.
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {OPTIONS.map((o) => (
          <button
            key={o.label}
            type="button"
            onClick={() => onChoose(o.score)}
            disabled={disabled}
            className="rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-4 py-3 text-left transition hover:border-[var(--camp-accent)] hover:bg-[var(--camp-surface)]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <p className="text-sm font-bold text-camp-ink">{o.label}</p>
            <p className="text-xs text-camp-ink-muted">{o.blurb}</p>
          </button>
        ))}
      </div>
      <p className="text-[0.7rem] text-camp-ink-muted/80">
        Picking lower won&apos;t hurt you. Practice XP still accrues, and you
        can replay any time.
      </p>
      {/* The unused import keeps the file ready for richer interactive UI
          in Phase 8 authoring. */}
      <span className="hidden">
        <CampButton intent="primary">.</CampButton>
      </span>
    </div>
  );
}
