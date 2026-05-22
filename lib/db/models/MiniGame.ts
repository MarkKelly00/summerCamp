/**
 * MiniGame model — config for the reusable mini-game engine (Phase 5).
 *
 * One document per game variant. The engine reads `config` and
 * `scoringRules` to render a session, then submits results via the
 * `submitMiniGameResult` Server Action (Phase 6).
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

import type { LearningTrack } from "./Lesson";

export type MiniGameType =
  | "number-muncher"
  | "knoword-vocab"
  | "fraction-pizza"
  | "fraction-forge"
  | "decimal-dash"
  | "evidence-detective"
  | "ecosystem-sim"
  | "timeline-trail"
  | "weather-studio"
  | "coordinate-map"
  | "primary-source-lab";

export interface IScoringRules {
  maxScore: number;
  masteryThreshold: number;
  accuracyWeight: number;
  speedWeight?: number;
  mistakePenalty?: number;
}

export interface IMiniGame extends Document {
  slug: string;
  title: string;
  type: MiniGameType;
  gradeLevel: number;
  learningTrack: LearningTrack;
  subject: string;
  skillTags: string[];
  /**
   * Game-specific config blob. Shape depends on `type`. Schemas for each
   * type live in `lib/schemas/mini-game.ts` and are validated at write
   * time in Server Actions; Mongoose stores it as Mixed.
   */
  config: Record<string, unknown>;
  scoringRules: IScoringRules;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ScoringRulesSchema = new Schema<IScoringRules>(
  {
    maxScore: { type: Number, required: true, min: 1 },
    masteryThreshold: { type: Number, required: true, min: 0, max: 100 },
    accuracyWeight: { type: Number, default: 1 },
    speedWeight: { type: Number, default: 0 },
    mistakePenalty: { type: Number, default: 0 },
  },
  { _id: false },
);

const MiniGameSchema = new Schema<IMiniGame>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    gradeLevel: { type: Number, required: true, min: 1, max: 12 },
    learningTrack: {
      type: String,
      enum: ["entering-3rd", "entering-5th"],
      required: true,
      index: true,
    },
    subject: { type: String, required: true },
    skillTags: { type: [String], default: [] },
    config: { type: Schema.Types.Mixed, default: () => ({}) },
    scoringRules: { type: ScoringRulesSchema, default: () => ({}) },
    active: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, collection: "minigames" },
);

export const MiniGame: Model<IMiniGame> =
  (mongoose.models.MiniGame as Model<IMiniGame> | undefined) ??
  mongoose.model<IMiniGame>("MiniGame", MiniGameSchema);
