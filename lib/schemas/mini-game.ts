/**
 * Zod schemas for MiniGame upserts (Phase 8 authoring) plus per-type
 * config validation.
 *
 * The MiniGame document stores `config` as Mixed in Mongoose. We validate
 * the config shape per game type at write-time so each engine renderer
 * gets a guaranteed shape at read-time.
 */

import { z } from "zod";

export const MINI_GAME_TYPES = [
  "number-muncher",
  "knoword-vocab",
  "fraction-pizza",
  "fraction-forge",
  "decimal-dash",
  "evidence-detective",
  "ecosystem-sim",
  "timeline-trail",
  "weather-studio",
  "coordinate-map",
  "primary-source-lab",
] as const;

export const ScoringRulesSchema = z.object({
  maxScore: z.number().int().min(1).max(10_000),
  masteryThreshold: z.number().int().min(0).max(100),
  accuracyWeight: z.number().min(0).max(10).default(1),
  speedWeight: z.number().min(0).max(10).default(0),
  mistakePenalty: z.number().min(0).max(100).default(0),
});

// --- Per-type config shapes (Phase 5 expands these). -----------------

const NumberMuncherConfig = z.object({
  // e.g. "multiples-of-3", "factors-of-12", "multiples-of-5"
  rule: z.string().min(1),
  gridSize: z.number().int().min(3).max(8).default(5),
  durationSeconds: z.number().int().min(30).max(300).default(120),
  numberRange: z
    .object({ min: z.number().int(), max: z.number().int() })
    .refine((v) => v.max > v.min, "max must be greater than min"),
});

const KnowordVocabConfig = z.object({
  wordList: z
    .array(
      z.object({
        word: z.string().min(1),
        definition: z.string().min(1),
        partOfSpeech: z.string().optional(),
      }),
    )
    .min(5),
  revealIntervalMs: z.number().int().min(500).max(10_000).default(2_000),
  roundCount: z.number().int().min(3).max(20).default(10),
});

// Other game configs land alongside their implementations in Phase 5.
// Default to a permissive passthrough so authoring can proceed before
// every renderer ships.
const PermissiveConfig = z.record(z.string(), z.unknown());

export const MiniGameConfigSchemas = {
  "number-muncher": NumberMuncherConfig,
  "knoword-vocab": KnowordVocabConfig,
  "fraction-pizza": PermissiveConfig,
  "fraction-forge": PermissiveConfig,
  "decimal-dash": PermissiveConfig,
  "evidence-detective": PermissiveConfig,
  "ecosystem-sim": PermissiveConfig,
  "timeline-trail": PermissiveConfig,
  "weather-studio": PermissiveConfig,
  "coordinate-map": PermissiveConfig,
  "primary-source-lab": PermissiveConfig,
} as const;

export const MiniGameUpsertSchema = z
  .object({
    slug: z.string().trim().min(1),
    title: z.string().trim().min(1),
    type: z.enum(MINI_GAME_TYPES),
    gradeLevel: z.number().int().min(1).max(12),
    learningTrack: z.enum(["entering-3rd", "entering-5th"]),
    subject: z.string().min(1),
    skillTags: z.array(z.string()).default([]),
    config: z.unknown(),
    scoringRules: ScoringRulesSchema,
    active: z.boolean().default(true),
  })
  .superRefine((value, ctx) => {
    const schema = MiniGameConfigSchemas[value.type];
    const result = schema.safeParse(value.config);
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({
          ...issue,
          path: ["config", ...issue.path],
        });
      }
    }
  });

export type MiniGameUpsertInput = z.infer<typeof MiniGameUpsertSchema>;
