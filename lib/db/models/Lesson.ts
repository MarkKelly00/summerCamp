/**
 * Lesson model — Summer Camp 2026 schema (additive over legacy).
 *
 * Strangler notes:
 *   - Shares the `lessons` collection with the legacy server's schema.
 *   - All legacy fields are preserved on the new schema so existing
 *     documents read cleanly and the legacy app continues to work.
 *   - New 2026 fields default safely so old rows are valid without a
 *     backfill, and the 2026-02 migration script supplies higher-fidelity
 *     defaults (slug, learningTrack, lessonType, rewardPolicy).
 *
 * Subject enum widened from {math, science, reading, history} to also
 * include {writing, engineering} per the 2026 curriculum map. Old values
 * remain valid.
 */

import mongoose, { Schema, type Document, type Model } from "mongoose";

export type LessonSubject =
  | "math"
  | "science"
  | "reading"
  | "writing"
  | "history"
  | "engineering";

export type LearningTrack = "entering-3rd" | "entering-5th";
export type LessonType = "core" | "bonus" | "capstone";
export type LessonDifficulty = "easy" | "medium" | "hard";
export type QuizType =
  | "multiple-choice"
  | "true-false"
  | "fill-blank"
  | "short-answer";

export type StandardsFramework =
  | "Utah Core"
  | "Utah SEEd"
  | "Utah Social Studies"
  | "CCSS"
  | "NGSS";

export interface IStandard {
  framework: StandardsFramework;
  code: string;
  description: string;
}

export interface ICheckpoint {
  prompt: string;
  expectedAnswer?: string;
  skillTag?: string;
}

export interface IQuiz {
  question: string;
  type: QuizType;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  points: number;
  skillTag?: string;
}

export interface IRewardPolicy {
  xp: number;
  funMoney: number;
  masteryThreshold: number; // 0-100; score >= threshold awards Fun Money
  allowReplayPracticeXp: boolean;
}

export interface ILessonContent {
  // Legacy fields (preserved verbatim)
  introduction: string;
  mainContent: string;
  activities: string[];
  funFacts?: string[];

  // 2026 additions — optional during transition; backfilled at author-time
  hook?: string;
  storyContext?: string;
  learningGoals?: string[];
  instruction?: string;
  examples?: string[];
  checkpoints?: ICheckpoint[];
  offlineActivity?: string;
  creativeMission?: string;
  reflectionPrompt?: string;
}

export interface ILesson extends Document {
  // Legacy + new shared
  title: string;
  subject: LessonSubject;
  gradeLevel: number;
  week: number;
  day: number;
  estimatedTime: number;
  isBonus: boolean;
  funMoneyReward: number;
  difficulty: LessonDifficulty;
  content: ILessonContent;
  quiz: IQuiz[];

  // 2026 additions
  slug?: string;
  questTitle?: string;
  learningTrack?: LearningTrack;
  lessonType: LessonType;
  standards: IStandard[];
  skillTags: string[];
  miniGameId?: mongoose.Types.ObjectId;
  rewardPolicy: IRewardPolicy;
  estimatedMinutes?: number; // Phase 4 prefers this name; old `estimatedTime` stays

  /**
   * Phase 8 gating. Students only see lessons with `published: true`.
   * Existing lessons (legacy + Phase 4 seeds) default to true so they
   * stay visible without a migration; admin-authored lessons can start
   * as drafts.
   */
  published: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const StandardSchema = new Schema<IStandard>(
  {
    framework: {
      type: String,
      enum: [
        "Utah Core",
        "Utah SEEd",
        "Utah Social Studies",
        "CCSS",
        "NGSS",
      ],
      required: true,
    },
    code: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false },
);

const CheckpointSchema = new Schema<ICheckpoint>(
  {
    prompt: { type: String, required: true },
    expectedAnswer: { type: String },
    skillTag: { type: String },
  },
  { _id: false },
);

const QuizSchema = new Schema<IQuiz>(
  {
    question: { type: String, required: true },
    type: {
      type: String,
      enum: ["multiple-choice", "true-false", "fill-blank", "short-answer"],
      required: true,
    },
    options: [{ type: String }],
    correctAnswer: { type: Schema.Types.Mixed, required: true },
    explanation: { type: String },
    points: { type: Number, default: 10 },
    skillTag: { type: String },
  },
  { _id: false },
);

const RewardPolicySchema = new Schema<IRewardPolicy>(
  {
    xp: { type: Number, default: 10 },
    funMoney: { type: Number, default: 10 },
    masteryThreshold: { type: Number, default: 70, min: 0, max: 100 },
    allowReplayPracticeXp: { type: Boolean, default: true },
  },
  { _id: false },
);

const LessonContentSchema = new Schema<ILessonContent>(
  {
    introduction: { type: String, default: "" },
    mainContent: { type: String, default: "" },
    activities: [{ type: String }],
    funFacts: [{ type: String }],

    hook: { type: String },
    storyContext: { type: String },
    learningGoals: [{ type: String }],
    instruction: { type: String },
    examples: [{ type: String }],
    checkpoints: [CheckpointSchema],
    offlineActivity: { type: String },
    creativeMission: { type: String },
    reflectionPrompt: { type: String },
  },
  { _id: false },
);

const LessonSchema = new Schema<ILesson>(
  {
    title: { type: String, required: true, trim: true },
    subject: {
      type: String,
      enum: ["math", "science", "reading", "writing", "history", "engineering"],
      required: true,
    },
    gradeLevel: { type: Number, required: true, min: 1, max: 12 },
    week: { type: Number, required: true, min: 1, max: 12 },
    day: { type: Number, required: true, min: 1, max: 5 },
    estimatedTime: { type: Number, default: 30 },
    estimatedMinutes: { type: Number },
    isBonus: { type: Boolean, default: false },
    funMoneyReward: { type: Number, default: 10 },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    content: { type: LessonContentSchema, default: () => ({}) },
    quiz: [QuizSchema],

    slug: { type: String, index: true },
    questTitle: { type: String },
    learningTrack: {
      type: String,
      enum: ["entering-3rd", "entering-5th"],
      index: true,
    },
    lessonType: {
      type: String,
      enum: ["core", "bonus", "capstone"],
      default: "core",
    },
    standards: { type: [StandardSchema], default: [] },
    skillTags: { type: [String], default: [] },
    miniGameId: { type: Schema.Types.ObjectId, ref: "MiniGame" },
    rewardPolicy: { type: RewardPolicySchema, default: () => ({}) },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true, collection: "lessons" },
);

LessonSchema.index({ subject: 1, gradeLevel: 1, week: 1, day: 1 });
LessonSchema.index({ learningTrack: 1, week: 1, day: 1 });

export const Lesson: Model<ILesson> =
  (mongoose.models.Lesson as Model<ILesson> | undefined) ??
  mongoose.model<ILesson>("Lesson", LessonSchema);
