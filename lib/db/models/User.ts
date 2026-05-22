/**
 * User model — Summer Camp 2026 schema.
 *
 * Strangler migration notes:
 *   - This model shares the `users` collection with the legacy server's
 *     User schema (server/src/models/User.ts). All legacy fields are
 *     preserved here so existing documents read cleanly and nothing gets
 *     stripped on save.
 *   - New fields default to safe values so existing rows are valid without
 *     a backfill migration. The 2026-01 migration backfills role/family
 *     linkage and learningTrack; everything else defaults at read time.
 *   - Role enum expanded from {student, admin} to {student, parent, admin}.
 *     Existing admin accounts continue to work; the migration upgrades
 *     Mark to keep admin (admin implies all parent permissions in
 *     proxy.ts and Server Actions).
 *
 * Password handling:
 *   - Legacy server uses bcryptjs with salt rounds=10. We use the same
 *     here so existing hashes verify correctly with comparePassword.
 *   - The pre-save hook re-hashes only when `password` is modified.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "student" | "parent" | "admin";
export type LearningTrack = "entering-3rd" | "entering-5th";
export type UserTheme = "space" | "jungle" | "ocean" | "castle" | "arcade";

export interface IUserSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  dyslexiaFont: boolean;
  dailyGoalMinutes: number;
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
  familyId?: mongoose.Types.ObjectId;

  profile: {
    name: string;
    age: number;
    gradeLevel: number;
    avatar?: string;
    theme?: UserTheme;
    learningTrack?: LearningTrack;
  };

  // 2026 gamification
  xp: number;
  level: number;
  funMoney: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate?: Date;

  // Legacy fields preserved
  totalProgress: number;
  completedLessons: Array<{
    lessonId: mongoose.Types.ObjectId;
    completedAt: Date;
    funMoneyEarned: number;
  }>;
  badges: mongoose.Types.ObjectId[];
  rewardHistory: mongoose.Types.ObjectId[];

  settings: IUserSettings;

  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidate: string): Promise<boolean>;
}

const UserSettingsSchema = new Schema<IUserSettings>(
  {
    soundEnabled: { type: Boolean, default: true },
    reducedMotion: { type: Boolean, default: false },
    dyslexiaFont: { type: Boolean, default: false },
    dailyGoalMinutes: { type: Number, default: 60 },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ["student", "parent", "admin"],
      default: "student",
      index: true,
    },
    familyId: {
      type: Schema.Types.ObjectId,
      ref: "Family",
      index: true,
    },

    profile: {
      name: { type: String, required: true },
      age: { type: Number, required: true, min: 5 },
      gradeLevel: { type: Number, required: true, min: 1, max: 12 },
      avatar: { type: String },
      theme: {
        type: String,
        enum: ["space", "jungle", "ocean", "castle", "arcade"],
      },
      learningTrack: {
        type: String,
        enum: ["entering-3rd", "entering-5th"],
      },
    },

    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    funMoney: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },

    totalProgress: { type: Number, default: 0 },
    completedLessons: [
      {
        lessonId: {
          type: Schema.Types.ObjectId,
          ref: "Lesson",
          required: true,
        },
        completedAt: { type: Date, default: Date.now },
        funMoneyEarned: { type: Number, default: 0 },
      },
    ],
    badges: [{ type: Schema.Types.ObjectId, ref: "Badge" }],
    rewardHistory: [{ type: Schema.Types.ObjectId, ref: "RewardRedemption" }],

    settings: { type: UserSettingsSchema, default: () => ({}) },
  },
  { timestamps: true, collection: "users" },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

UserSchema.methods.comparePassword = async function (
  this: IUser,
  candidate: string,
): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

/**
 * Guard against OverwriteModelError under Next.js dev hot-reload. The Next
 * server re-evaluates this module on every change; without the lookup we'd
 * try to register "User" twice on the same mongoose instance.
 */
export const User: Model<IUser> =
  (mongoose.models.User as Model<IUser> | undefined) ??
  mongoose.model<IUser>("User", UserSchema);
