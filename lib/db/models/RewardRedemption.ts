/**
 * RewardRedemption model — Summer Camp 2026 schema (additive over legacy).
 *
 * Strangler notes:
 *   - Shares the `rewardredemptions` collection with the legacy schema.
 *   - Legacy stored a `redeemed` boolean and `redeemedAt` timestamp.
 *   - 2026 adds the `status` enum {pending, approved, fulfilled, rejected}
 *     plus `approvedBy`, `fulfilledBy`, `notes`, `costAtRedemption`. The
 *     legacy fields are preserved for backward compatibility; the
 *     2026-02 migration backfills `status` from `redeemed`.
 *
 * Why a status enum instead of two booleans:
 *   The parent approval flow needs four distinguishable states (queued,
 *   approved, fulfilled in-store, rejected with refund). A single enum
 *   makes the state machine explicit and lets us add indexes and queries
 *   like "approval queue for this family."
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

export type RedemptionStatus =
  | "pending"
  | "approved"
  | "fulfilled"
  | "rejected";

export interface IRewardRedemption extends Document {
  // Legacy + new shared
  userId: mongoose.Types.ObjectId;
  rewardId: mongoose.Types.ObjectId;
  rewardName: string;
  cost: number;
  redeemed: boolean;
  redeemedAt?: Date;
  code: string;

  // 2026 additions
  status: RedemptionStatus;
  costAtRedemption: number;
  approvedBy?: mongoose.Types.ObjectId;
  fulfilledBy?: mongoose.Types.ObjectId;
  notes?: string;

  createdAt: Date;
  updatedAt: Date;
}

const RewardRedemptionSchema = new Schema<IRewardRedemption>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rewardId: { type: Schema.Types.ObjectId, ref: "Reward", required: true },
    rewardName: { type: String, required: true },
    cost: { type: Number, required: true },
    redeemed: { type: Boolean, default: false },
    redeemedAt: { type: Date },
    code: { type: String, required: true, unique: true },

    status: {
      type: String,
      enum: ["pending", "approved", "fulfilled", "rejected"],
      default: "pending",
      index: true,
    },
    costAtRedemption: { type: Number, default: 0 },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
    fulfilledBy: { type: Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },
  },
  { timestamps: true, collection: "rewardredemptions" },
);

RewardRedemptionSchema.index({ userId: 1, status: 1 });

export const RewardRedemption: Model<IRewardRedemption> =
  (mongoose.models.RewardRedemption as
    | Model<IRewardRedemption>
    | undefined) ??
  mongoose.model<IRewardRedemption>(
    "RewardRedemption",
    RewardRedemptionSchema,
  );
