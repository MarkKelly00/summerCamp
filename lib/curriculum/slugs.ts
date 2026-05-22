/**
 * Maps a learning track to the slug prefix used by the 2026 curriculum
 * (vs. the legacy 2025 curriculum, which uses subject-based slugs).
 */

import type { LearningTrack } from "@/lib/db/models/Lesson";

export const TRACK_SLUG_PREFIX: Record<LearningTrack, string> = {
  "entering-3rd": "dean-",
  "entering-5th": "addie-",
};

export function isCurriculum2026Slug(slug: string | undefined): boolean {
  if (!slug) return false;
  return slug.startsWith("dean-") || slug.startsWith("addie-");
}
