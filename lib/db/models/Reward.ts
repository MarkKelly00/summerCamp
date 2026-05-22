/**
 * Reward model — Summer Camp 2026 schema (additive over legacy).
 *
 * Strangler notes:
 *   - Shares the `rewards` collection with the legacy schema.
 *   - Legacy `isAvailable` is mirrored to the new `active` field. Both
 *     are kept on the schema during transition so the legacy server's
 *     reads continue to work; the 2026-02 migration backfills `active`
 *     from `isAvailable` for existing rows.
 *   - Adds `slug`, `category`, `inventoryCount`, `requiresParentApproval`,
 *     `approvalThreshold`.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

export type RewardCategory =
  | "food"
  | "digital"
  | "toy"
  | "experience"
  | "custom";

export interface IReward extends Document {
  // Legacy + new shared
  name: string;
  description: string;
  cost: number;
  image: string;
  isAvailable: boolean;

  // 2026 additions
  slug?: string;
  active: boolean;
  category: RewardCategory;
  inventoryCount?: number;
  requiresParentApproval: boolean;
  /**
   * Optional per-reward override. If set, redemptions at or above this Fun
   * Money cost require parent approval even when `requiresParentApproval`
   * is false at the family-default level.
   */
  approvalThreshold?: number;

  createdAt: Date;
  updatedAt: Date;
}

const RewardSchema = new Schema<IReward>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },

    slug: { type: String, index: true },
    active: { type: Boolean, default: true, index: true },
    category: {
      type: String,
      enum: ["food", "digital", "toy", "experience", "custom"],
      default: "custom",
    },
    inventoryCount: { type: Number, min: 0 },
    requiresParentApproval: { type: Boolean, default: true },
    approvalThreshold: { type: Number, min: 0 },
  },
  { timestamps: true, collection: "rewards" },
);

export const Reward: Model<IReward> =
  (mongoose.models.Reward as Model<IReward> | undefined) ??
  mongoose.model<IReward>("Reward", RewardSchema);
