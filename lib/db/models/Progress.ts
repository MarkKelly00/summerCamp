/**
 * Progress model — per-student-per-lesson progress record.
 *
 * Strangler notes:
 *   - Shares the `progresses` collection with the legacy schema (Mongoose
 *     default plural of "Progress").
 *   - Adds 2026 fields atop legacy: masteryLevel, miniGameScore, earnedXp,
 *     earnedFunMoney, rewardGranted.
 *   - The unique compound index { studentId, lessonId } is preserved.
 *
 * Money path safety:
 *   `rewardGranted` is the idempotency anchor in Phase 6. Once it flips
 *   true for a given Progress doc, Server Actions refuse to award Fun
 *   Money or XP again, even on score recomputes.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

export type ProgressStatus = "not-started" | "in-progress" | "completed";
export type MasteryLevel =
  | "not-started"
  | "in-progress"
  | "practicing"
  | "mastered"
  | "exceeded";

export interface IQuizAnswer {
  questionIndex: number;
  answer: string | string[];
  isCorrect: boolean;
  timeSpent: number;
  skillTag?: string;
}

export interface IProgress extends Document {
  studentId: mongoose.Types.ObjectId;
  lessonId: mongoose.Types.ObjectId;
  status: ProgressStatus;
  score: number;
  attempts: number;
  timeSpent: number; // minutes
  quizAnswers: IQuizAnswer[];
  completedAt?: Date;

  // 2026 additions
  masteryLevel: MasteryLevel;
  miniGameScore?: number;
  earnedXp: number;
  earnedFunMoney: number;
  rewardGranted: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const QuizAnswerSchema = new Schema<IQuizAnswer>(
  {
    questionIndex: { type: Number, required: true },
    answer: { type: Schema.Types.Mixed, required: true },
    isCorrect: { type: Boolean, required: true },
    timeSpent: { type: Number, default: 0 },
    skillTag: { type: String },
  },
  { _id: false },
);

const ProgressSchema = new Schema<IProgress>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
    },
    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started",
    },
    score: { type: Number, default: 0, min: 0, max: 100 },
    attempts: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 },
    quizAnswers: [QuizAnswerSchema],
    completedAt: { type: Date },

    masteryLevel: {
      type: String,
      enum: [
        "not-started",
        "in-progress",
        "practicing",
        "mastered",
        "exceeded",
      ],
      default: "not-started",
    },
    miniGameScore: { type: Number },
    earnedXp: { type: Number, default: 0 },
    earnedFunMoney: { type: Number, default: 0 },
    rewardGranted: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "progresses" },
);

ProgressSchema.index({ studentId: 1, lessonId: 1 }, { unique: true });
ProgressSchema.index({ studentId: 1, status: 1 });
ProgressSchema.index({ studentId: 1, rewardGranted: 1 });

export const Progress: Model<IProgress> =
  (mongoose.models.Progress as Model<IProgress> | undefined) ??
  mongoose.model<IProgress>("Progress", ProgressSchema);

/**
 * Maps a numeric score (0-100) to a mastery level enum. Centralized so
 * Server Actions and the migration share one definition.
 */
export function masteryLevelForScore(
  score: number,
  status: ProgressStatus,
): MasteryLevel {
  if (status === "not-started") return "not-started";
  if (status === "in-progress") return "in-progress";
  if (score >= 95) return "exceeded";
  if (score >= 80) return "mastered";
  return "practicing";
}
