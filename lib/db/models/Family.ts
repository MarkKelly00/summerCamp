/**
 * Family aggregate — links parents and students into one household.
 *
 * For the Kelly family this will be one document linking Mark (parent/admin)
 * to Addie and Dean (students). The model is intentionally simple — most
 * permissions checks happen via the parent's role + `familyId` match on
 * the student rather than by walking the array on every request.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IFamilySettings {
  /** Redemptions at or above this Fun Money cost require parent approval. */
  rewardApprovalThreshold: number;
  /** Target number of camp days per week. */
  weeklyGoalDays: number;
  /** Daily on-screen learning target in minutes (default per student). */
  defaultDailyGoalMinutes: number;
}

export interface IFamily extends Document {
  name: string;
  parentIds: mongoose.Types.ObjectId[];
  studentIds: mongoose.Types.ObjectId[];
  settings: IFamilySettings;
  createdAt: Date;
  updatedAt: Date;
}

const FamilySettingsSchema = new Schema<IFamilySettings>(
  {
    rewardApprovalThreshold: { type: Number, default: 500 },
    weeklyGoalDays: { type: Number, default: 5 },
    defaultDailyGoalMinutes: { type: Number, default: 60 },
  },
  { _id: false },
);

const FamilySchema = new Schema<IFamily>(
  {
    name: { type: String, required: true, trim: true },
    parentIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    studentIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    settings: { type: FamilySettingsSchema, default: () => ({}) },
  },
  { timestamps: true, collection: "families" },
);

export const Family: Model<IFamily> =
  (mongoose.models.Family as Model<IFamily> | undefined) ??
  mongoose.model<IFamily>("Family", FamilySchema);
