/**
 * Badge model — Summer Camp 2026 schema (additive over legacy).
 *
 * Strangler notes:
 *   - Shares the `badges` collection with the legacy schema.
 *   - Legacy already has `name`, `description`, `icon`, `category`,
 *     `subject?`, `gradeLevel`, `requirements`, `funMoneyReward`, `rarity`.
 *     Those are preserved verbatim.
 *   - 2026 adds `slug`, `subjectScope[]`, `learningTrack?`, `xpReward`,
 *     and an optional `active` flag for deactivating retired badges
 *     without deleting historical earnings.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

import type { LearningTrack } from "./Lesson";

export type BadgeCategory = "weekly" | "subject" | "streak" | "special";
export type LegacyBadgeRequirementType =
  | "weekly-completion"
  | "subject-mastery"
  | "streak"
  | "perfect-score"
  | "bonus-lessons";
export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export interface IBadgeRequirement {
  type: LegacyBadgeRequirementType;
  target: number;
  timeframe?: string;
}

export interface IBadge extends Document {
  // Legacy + new shared
  name: string;
  description: string;
  icon: string;
  category: BadgeCategory;
  subject?: string;
  gradeLevel: number;
  requirements: IBadgeRequirement;
  funMoneyReward: number;
  rarity: BadgeRarity;

  // 2026 additions
  slug?: string;
  subjectScope?: string[];
  learningTrack?: LearningTrack;
  xpReward: number;
  active: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const BadgeRequirementSchema = new Schema<IBadgeRequirement>(
  {
    type: {
      type: String,
      enum: [
        "weekly-completion",
        "subject-mastery",
        "streak",
        "perfect-score",
        "bonus-lessons",
      ],
      required: true,
    },
    target: { type: Number, required: true },
    timeframe: { type: String },
  },
  { _id: false },
);

const BadgeSchema = new Schema<IBadge>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    category: {
      type: String,
      enum: ["weekly", "subject", "streak", "special"],
      required: true,
    },
    subject: { type: String },
    gradeLevel: { type: Number, required: true, min: 1, max: 12 },
    requirements: { type: BadgeRequirementSchema, required: true },
    funMoneyReward: { type: Number, default: 50 },
    rarity: {
      type: String,
      enum: ["common", "rare", "epic", "legendary"],
      default: "common",
    },

    slug: { type: String, index: true },
    subjectScope: { type: [String], default: [] },
    learningTrack: {
      type: String,
      enum: ["entering-3rd", "entering-5th"],
    },
    xpReward: { type: Number, default: 100 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "badges" },
);

export const Badge: Model<IBadge> =
  (mongoose.models.Badge as Model<IBadge> | undefined) ??
  mongoose.model<IBadge>("Badge", BadgeSchema);
