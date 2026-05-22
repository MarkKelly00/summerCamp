/**
 * Zod schemas for Lesson-related boundary validation (Server Actions,
 * Route Handlers, Phase 8 admin authoring).
 */

import { z } from "zod";

export const SUBJECTS = [
  "math",
  "science",
  "reading",
  "writing",
  "history",
  "engineering",
] as const;

export const LEARNING_TRACKS = ["entering-3rd", "entering-5th"] as const;
export const LESSON_TYPES = ["core", "bonus", "capstone"] as const;
export const DIFFICULTIES = ["easy", "medium", "hard"] as const;
export const QUIZ_TYPES = [
  "multiple-choice",
  "true-false",
  "fill-blank",
  "short-answer",
] as const;
export const STANDARDS_FRAMEWORKS = [
  "Utah Core",
  "Utah SEEd",
  "Utah Social Studies",
  "CCSS",
  "NGSS",
] as const;

export const StandardSchema = z.object({
  framework: z.enum(STANDARDS_FRAMEWORKS),
  code: z.string().trim().min(1),
  description: z.string().trim().min(1),
});

export const CheckpointSchema = z.object({
  prompt: z.string().trim().min(1),
  expectedAnswer: z.string().optional(),
  skillTag: z.string().optional(),
});

export const QuizQuestionSchema = z.object({
  question: z.string().trim().min(1),
  type: z.enum(QUIZ_TYPES),
  options: z.array(z.string()).optional(),
  correctAnswer: z.union([z.string(), z.array(z.string())]),
  explanation: z.string().optional(),
  points: z.number().int().min(1).max(100).default(10),
  skillTag: z.string().optional(),
});

export const RewardPolicySchema = z.object({
  xp: z.number().int().min(0),
  funMoney: z.number().int().min(0),
  masteryThreshold: z.number().int().min(0).max(100),
  allowReplayPracticeXp: z.boolean(),
});

export const LessonContentSchema = z.object({
  introduction: z.string().default(""),
  mainContent: z.string().default(""),
  activities: z.array(z.string()).default([]),
  funFacts: z.array(z.string()).optional(),

  hook: z.string().optional(),
  storyContext: z.string().optional(),
  learningGoals: z.array(z.string()).optional(),
  instruction: z.string().optional(),
  examples: z.array(z.string()).optional(),
  checkpoints: z.array(CheckpointSchema).optional(),
  offlineActivity: z.string().optional(),
  creativeMission: z.string().optional(),
  reflectionPrompt: z.string().optional(),
});

export const LessonUpsertSchema = z.object({
  slug: z.string().trim().min(1),
  title: z.string().trim().min(1),
  questTitle: z.string().optional(),
  subject: z.enum(SUBJECTS),
  gradeLevel: z.number().int().min(1).max(12),
  learningTrack: z.enum(LEARNING_TRACKS),
  week: z.number().int().min(1).max(12),
  day: z.number().int().min(1).max(5),
  lessonType: z.enum(LESSON_TYPES),
  difficulty: z.enum(DIFFICULTIES).default("medium"),
  estimatedMinutes: z.number().int().min(1).max(240).default(30),
  standards: z.array(StandardSchema).default([]),
  skillTags: z.array(z.string()).default([]),
  content: LessonContentSchema,
  quiz: z.array(QuizQuestionSchema).default([]),
  rewardPolicy: RewardPolicySchema,
  miniGameSlug: z.string().optional(),
});

export type LessonUpsertInput = z.infer<typeof LessonUpsertSchema>;
