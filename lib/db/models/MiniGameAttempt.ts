/**
 * MiniGameAttempt model — one record per play of a mini-game.
 *
 * Captures the raw and normalized scores, accuracy, time, mistakes, and
 * the reward decision. `isFirstMastery` is the idempotency anchor — the
 * Server Action only flips it true once per (userId, miniGameId), and
 * only awards Fun Money + the first-mastery XP bonus on that one row.
 *
 * Subsequent attempts are valuable for practice and replay rewards, but
 * never duplicate the first-mastery bonus.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IMiniGameMistakeRecord {
  prompt: string;
  selectedAnswer: string;
  correctAnswer: string;
  skillTag: string;
}

export interface IMiniGameAttempt extends Document {
  userId: mongoose.Types.ObjectId;
  miniGameId: mongoose.Types.ObjectId;
  rawScore: number;
  finalScore: number; // 0..100
  accuracy: number; // 0..1
  timeSpent: number; // milliseconds
  isMastery: boolean;
  isFirstMastery: boolean;
  skillTagsPracticed: string[];
  mistakes: IMiniGameMistakeRecord[];
  earnedXp: number;
  earnedFunMoney: number;
  rewardGranted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MiniGameMistakeSchema = new Schema<IMiniGameMistakeRecord>(
  {
    prompt: { type: String, required: true },
    selectedAnswer: { type: String, required: true },
    correctAnswer: { type: String, required: true },
    skillTag: { type: String, required: true },
  },
  { _id: false },
);

const MiniGameAttemptSchema = new Schema<IMiniGameAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    miniGameId: {
      type: Schema.Types.ObjectId,
      ref: "MiniGame",
      required: true,
    },
    rawScore: { type: Number, required: true, min: 0 },
    finalScore: { type: Number, required: true, min: 0, max: 100 },
    accuracy: { type: Number, required: true, min: 0, max: 1 },
    timeSpent: { type: Number, required: true, min: 0 },
    isMastery: { type: Boolean, required: true, default: false },
    isFirstMastery: { type: Boolean, required: true, default: false },
    skillTagsPracticed: { type: [String], default: [] },
    mistakes: { type: [MiniGameMistakeSchema], default: [] },
    earnedXp: { type: Number, required: true, default: 0 },
    earnedFunMoney: { type: Number, required: true, default: 0 },
    rewardGranted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, collection: "minigameattempts" },
);

MiniGameAttemptSchema.index({ userId: 1, miniGameId: 1, createdAt: -1 });
MiniGameAttemptSchema.index({ userId: 1, miniGameId: 1, isFirstMastery: 1 });

export const MiniGameAttempt: Model<IMiniGameAttempt> =
  (mongoose.models.MiniGameAttempt as Model<IMiniGameAttempt> | undefined) ??
  mongoose.model<IMiniGameAttempt>("MiniGameAttempt", MiniGameAttemptSchema);
