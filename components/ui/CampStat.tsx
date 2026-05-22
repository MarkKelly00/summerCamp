/**
 * Stat tile + XP progress bar. Used on the dashboard HUD and on result
 * screens. Accepts an optional icon node from lucide-react.
 */

import type { ReactNode } from "react";

interface CampStatProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
}

export function CampStat({ label, value, icon, hint }: CampStatProps) {
  return (
    <div className="camp-card-soft flex items-center gap-4 px-4 py-3">
      {icon ? (
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--camp-accent)]/15 text-[var(--camp-accent)]">
          {icon}
        </div>
      ) : null}
      <div className="min-w-0">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
          {label}
        </p>
        <p className="text-2xl font-bold leading-tight text-camp-ink">
          {value}
        </p>
        {hint ? (
          <p className="text-xs text-camp-ink-muted">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

export function CampXpBar({
  xp,
  level,
  toNext,
}: {
  xp: number;
  level: number;
  toNext: number;
}) {
  // Per scoring.ts: 200 XP per level.
  const xpInLevel = xp - (level - 1) * 200;
  const pct = Math.min(100, Math.max(0, (xpInLevel / 200) * 100));
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between gap-2 text-xs text-camp-ink-muted">
        <span>
          Level <span className="font-bold text-camp-ink">{level}</span>
        </span>
        <span>
          <span className="font-bold text-camp-ink">{toNext}</span> XP to next
        </span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--camp-surface-soft)]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={200}
        aria-valuenow={xpInLevel}
        aria-label="Experience toward next level"
      >
        <div
          className="h-full rounded-full bg-[var(--camp-accent)] transition-[width] motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
