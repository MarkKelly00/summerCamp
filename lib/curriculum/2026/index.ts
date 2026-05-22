/**
 * Summer Camp 2026 curriculum barrel.
 *
 * The seed runner consumes `ALL_TRACKS` to iterate per-track and per-week
 * without hard-coding paths.
 */

import type { WeekDefinition } from "./shared/types";

import { ADDIE_WEEKS } from "./addie-entering-5th";
import { DEAN_WEEKS } from "./dean-entering-3rd";

export const TRACK_WEEKS: Record<"entering-3rd" | "entering-5th", WeekDefinition[]> = {
  "entering-3rd": DEAN_WEEKS,
  "entering-5th": ADDIE_WEEKS,
};

export * from "./shared";
