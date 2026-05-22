/**
 * MasteryHeatmap — compact 8x5 grid showing each lesson's status for one
 * child. Read-only; meant for at-a-glance parent monitoring.
 */

import type { MasteryLevel } from "@/lib/db/models/Progress";

export interface HeatmapCell {
  week: number;
  day: number;
  status: "locked" | "available" | "in-progress" | "practicing" | "mastered" | "exceeded";
  title: string;
  subject: string;
}

const CELL_CLASSES: Record<HeatmapCell["status"], string> = {
  locked: "bg-[var(--camp-surface-soft)]/30",
  available: "bg-[var(--camp-surface-soft)]",
  "in-progress": "bg-[var(--camp-quest)]/40",
  practicing: "bg-[var(--camp-warning)]/40",
  mastered: "bg-[var(--camp-positive)]/55",
  exceeded:
    "bg-[var(--camp-accent)]/70 shadow-[0_0_0_1px_var(--camp-accent)]",
};

interface Props {
  cells: HeatmapCell[];
}

export function MasteryHeatmap({ cells }: Props) {
  const grid = new Map<string, HeatmapCell>();
  for (const c of cells) grid.set(`${c.week}-${c.day}`, c);

  return (
    <div
      role="img"
      aria-label="Mastery heatmap: 8 weeks across, 5 days down. Brighter cells indicate higher mastery."
      className="grid grid-cols-8 gap-0.5"
    >
      {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
        <div key={week} className="space-y-0.5" aria-hidden="true">
          <p className="text-center text-[0.55rem] font-semibold uppercase tracking-widest text-camp-ink-muted/80">
            W{week}
          </p>
          {[1, 2, 3, 4, 5].map((day) => {
            const cell = grid.get(`${week}-${day}`);
            if (!cell) {
              return (
                <div
                  key={day}
                  className={`aspect-square rounded-sm ${CELL_CLASSES.locked}`}
                  title={`Week ${week} day ${day}: not yet`}
                />
              );
            }
            return (
              <div
                key={day}
                title={`W${week} D${day} · ${cell.subject} · ${cell.status}`}
                className={`aspect-square rounded-sm ${CELL_CLASSES[cell.status]}`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export function masteryStatusFor(
  mastery: MasteryLevel | undefined,
  status: string | undefined,
): HeatmapCell["status"] {
  if (mastery === "exceeded") return "exceeded";
  if (mastery === "mastered") return "mastered";
  if (mastery === "practicing") return "practicing";
  if (status === "in-progress") return "in-progress";
  if (status === "completed") return "mastered";
  return "available";
}
