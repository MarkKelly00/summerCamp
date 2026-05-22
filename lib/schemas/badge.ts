/**
 * Zod schemas for Badge upserts (Phase 4 seed + Phase 8 authoring).
 */

import { z } from "zod";

export const BADGE_CATEGORIES = [
  "weekly",
  "subject",
  "streak",
  "special",
] as const;
export const BADGE_RARITIES = [
  "common",
  "rare",
  "epic",
  "legendary",
] as const;
export const BADGE_REQUIREMENT_TYPES = [
  "weekly-completion",
  "subject-mastery",
  "streak",
  "perfect-score",
  "bonus-lessons",
] as const;

export const BadgeRequirementSchema = z.object({
  type: z.enum(BADGE_REQUIREMENT_TYPES),
  target: z.number().int().min(1),
  timeframe: z.string().optional(),
});

export const BadgeUpsertSchema = z.object({
  slug: z.string().trim().min(1).max(64),
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(500),
  icon: z.string().min(1),
  category: z.enum(BADGE_CATEGORIES),
  subject: z.string().optional(),
  subjectScope: z.array(z.string()).default([]),
  gradeLevel: z.number().int().min(1).max(12),
  learningTrack: z.enum(["entering-3rd", "entering-5th"]).optional(),
  requirements: BadgeRequirementSchema,
  funMoneyReward: z.number().int().min(0).default(50),
  xpReward: z.number().int().min(0).default(100),
  rarity: z.enum(BADGE_RARITIES).default("common"),
  active: z.boolean().default(true),
});

export type BadgeUpsertInput = z.infer<typeof BadgeUpsertSchema>;
