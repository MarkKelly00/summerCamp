/**
 * Zod schemas for Progress / mini-game result submissions.
 *
 * `submitMiniGameResult` (Phase 6) validates against MiniGameResultSchema
 * before touching the DB. `awardLessonCompletion` validates against
 * LessonCompletionSchema.
 */

import { z } from "zod";

export const QuizAnswerSchema = z.object({
  questionIndex: z.number().int().min(0),
  answer: z.union([z.string(), z.array(z.string())]),
  isCorrect: z.boolean(),
  timeSpent: z.number().int().min(0).default(0),
  skillTag: z.string().optional(),
});

export const LessonCompletionSchema = z.object({
  studentId: z.string().regex(/^[a-f0-9]{24}$/i, "Invalid ObjectId"),
  lessonId: z.string().regex(/^[a-f0-9]{24}$/i, "Invalid ObjectId"),
  score: z.number().int().min(0).max(100),
  miniGameScore: z.number().int().min(0).optional(),
  quizAnswers: z.array(QuizAnswerSchema).default([]),
  timeSpent: z.number().int().min(0).default(0),
});

export type LessonCompletionInput = z.infer<typeof LessonCompletionSchema>;

export const MiniGameMistakeSchema = z.object({
  prompt: z.string(),
  selectedAnswer: z.string(),
  correctAnswer: z.string(),
  skillTag: z.string(),
});

export const MiniGameResultSchema = z.object({
  studentId: z.string().regex(/^[a-f0-9]{24}$/i),
  miniGameId: z.string().regex(/^[a-f0-9]{24}$/i),
  lessonId: z.string().regex(/^[a-f0-9]{24}$/i).optional(),
  score: z.number().min(0),
  accuracy: z.number().min(0).max(1),
  timeSpent: z.number().int().min(0),
  skillTagsPracticed: z.array(z.string()).default([]),
  mistakes: z.array(MiniGameMistakeSchema).default([]),
});

export type MiniGameResultInput = z.infer<typeof MiniGameResultSchema>;
