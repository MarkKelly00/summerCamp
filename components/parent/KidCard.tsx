/**
 * KidCard — per-child summary tile in the parent dashboard.
 */

import { Coins, Flame, Sparkles, Star, Trophy } from "lucide-react";

import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

import { MasteryHeatmap, type HeatmapCell } from "./MasteryHeatmap";

export interface KidCardData {
  name: string;
  username: string;
  track: "entering-3rd" | "entering-5th";
  level: number;
  xp: number;
  funMoney: number;
  currentStreak: number;
  longestStreak: number;
  badgeCount: number;
  lessonsCompleted: number;
  lessonsTotal: number;
  pendingApprovals: number;
  lastActive?: Date | null;
  topSkillWeaknesses: { skillTag: string; misses: number }[];
  heatmap: HeatmapCell[];
}

function relativeDays(d: Date | null | undefined): string {
  if (!d) return "Not active yet";
  const ms = Date.now() - d.getTime();
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return "Active today";
  if (days === 1) return "Active yesterday";
  if (days < 7) return `Active ${days} days ago`;
  return d.toLocaleDateString();
}

export function KidCard({ kid }: { kid: KidCardData }) {
  const trackLabel =
    kid.track === "entering-3rd" ? "Entering 3rd" : "Entering 5th";
  const completionPct = Math.round(
    (kid.lessonsCompleted / Math.max(kid.lessonsTotal, 1)) * 100,
  );

  return (
    <CampCard className="space-y-4">
      <header className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <CampKicker>{trackLabel}</CampKicker>
          <h3 className="text-xl font-bold">{kid.name}</h3>
          <p className="text-xs text-camp-ink-muted">
            @{kid.username} · {relativeDays(kid.lastActive ?? null)}
          </p>
        </div>
        {kid.pendingApprovals > 0 ? (
          <CampChip tone="warning">
            {kid.pendingApprovals} pending approval{kid.pendingApprovals === 1 ? "" : "s"}
          </CampChip>
        ) : null}
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat icon={<Star className="h-3.5 w-3.5" />} label="Level" value={kid.level} />
        <Stat icon={<Coins className="h-3.5 w-3.5" />} label="Fun Money" value={kid.funMoney} />
        <Stat
          icon={<Flame className="h-3.5 w-3.5" />}
          label="Streak"
          value={`${kid.currentStreak}d`}
          sub={`Best ${kid.longestStreak}`}
        />
        <Stat
          icon={<Trophy className="h-3.5 w-3.5" />}
          label="Badges"
          value={kid.badgeCount}
        />
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between text-xs text-camp-ink-muted">
          <span>
            Lessons{" "}
            <span className="font-bold text-camp-ink">
              {kid.lessonsCompleted} / {kid.lessonsTotal}
            </span>
          </span>
          <span>{completionPct}% complete</span>
        </div>
        <div
          className="h-2 w-full overflow-hidden rounded-full bg-[var(--camp-surface-soft)]"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completionPct}
        >
          <div
            className="h-full rounded-full bg-[var(--camp-positive)]"
            style={{ width: `${completionPct}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
          Mastery map
        </p>
        <div className="mt-2">
          <MasteryHeatmap cells={kid.heatmap} />
        </div>
      </div>

      <div>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
          Skill weaknesses
        </p>
        {kid.topSkillWeaknesses.length === 0 ? (
          <p className="mt-1 text-xs text-camp-ink-muted">
            No misses yet. Keep an eye on this section after the first few quizzes.
          </p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {kid.topSkillWeaknesses.slice(0, 6).map((w) => (
              <li key={w.skillTag}>
                <CampChip
                  tone="warning"
                  icon={<Sparkles className="h-3 w-3" />}
                >
                  {w.skillTag} · {w.misses}
                </CampChip>
              </li>
            ))}
          </ul>
        )}
      </div>
    </CampCard>
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
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="camp-card-soft px-3 py-2">
      <div className="flex items-center gap-1.5 text-camp-ink-muted">
        {icon}
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>
      <p className="mt-0.5 text-lg font-bold text-camp-ink">{value}</p>
      {sub ? <p className="text-[0.65rem] text-camp-ink-muted">{sub}</p> : null}
    </div>
  );
}
