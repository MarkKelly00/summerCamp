/**
 * Integration tests for `awardLessonCompletion`.
 *
 * Verifies the money-path invariants:
 *   - Full XP + Fun Money on first mastery.
 *   - No Fun Money double-payment on replays (rewardGranted anchor).
 *   - Practice XP only for below-mastery scores.
 *   - Auth: students can only submit their own work.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Types } from "mongoose";

// Mock auth before importing the action. vi.mock is hoisted by Vitest.
vi.mock("@/lib/auth/cookies", () => ({
  getSession: vi.fn(),
  setSession: vi.fn(),
  clearSession: vi.fn(),
}));

import { getSession } from "@/lib/auth/cookies";
import { Lesson, Progress, User } from "@/lib/db/models";
import { awardLessonCompletion } from "@/lib/actions/progress";

describe("awardLessonCompletion", () => {
  let studentId: string;
  let lessonId: string;

  beforeEach(async () => {
    const student = await User.create({
      username: "testkid",
      password: "password123",
      role: "student",
      profile: {
        name: "Test Kid",
        age: 8,
        gradeLevel: 3,
        learningTrack: "entering-3rd",
      },
      xp: 0,
      level: 1,
      funMoney: 0,
      currentStreak: 0,
      longestStreak: 0,
    });
    studentId = String(student._id);

    const lesson = await Lesson.create({
      slug: "test-lesson",
      title: "Test Lesson",
      subject: "math",
      gradeLevel: 3,
      week: 1,
      day: 1,
      learningTrack: "entering-3rd",
      lessonType: "core",
      estimatedMinutes: 30,
      content: {
        introduction: "hi",
        mainContent: "",
        activities: [],
        funFacts: [],
      },
      quiz: [],
      rewardPolicy: {
        xp: 50,
        funMoney: 25,
        masteryThreshold: 70,
        allowReplayPracticeXp: true,
      },
      published: true,
    });
    lessonId = String(lesson._id);

    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("awards full XP + Fun Money on first mastery", async () => {
    const result = await awardLessonCompletion({
      studentId,
      lessonId,
      score: 85,
      quizAnswers: [],
      timeSpent: 100,
    });

    expect(result.ok).toBe(true);
    expect(result.result?.isFirstAward).toBe(true);
    expect(result.result?.earnedXp).toBeGreaterThanOrEqual(50);
    expect(result.result?.earnedFunMoney).toBeGreaterThanOrEqual(25);

    const user = await User.findById(studentId);
    expect(user?.funMoney).toBe(result.result?.earnedFunMoney);
    expect(user?.currentStreak).toBe(1);

    const progress = await Progress.findOne({
      studentId,
      lessonId,
    });
    expect(progress?.rewardGranted).toBe(true);
    expect(progress?.status).toBe("completed");
    expect(progress?.masteryLevel).toBe("mastered");
  });

  it("does not double-pay Fun Money on replay", async () => {
    const first = await awardLessonCompletion({
      studentId,
      lessonId,
      score: 85,
      quizAnswers: [],
      timeSpent: 100,
    });
    expect(first.ok).toBe(true);
    const firstFunMoney = first.result!.earnedFunMoney;
    expect(firstFunMoney).toBeGreaterThan(0);

    const second = await awardLessonCompletion({
      studentId,
      lessonId,
      score: 100,
      quizAnswers: [],
      timeSpent: 100,
    });
    expect(second.ok).toBe(true);
    expect(second.result?.earnedFunMoney).toBe(0);
    expect(second.result?.earnedXp).toBeGreaterThan(0);

    const user = await User.findById(studentId);
    // Wallet should equal first reward only — replay added zero.
    expect(user?.funMoney).toBe(firstFunMoney);
  });

  it("awards practice XP only on a below-mastery completion", async () => {
    const result = await awardLessonCompletion({
      studentId,
      lessonId,
      score: 50,
      quizAnswers: [],
      timeSpent: 100,
    });

    expect(result.ok).toBe(true);
    expect(result.result?.isFirstAward).toBe(false);
    expect(result.result?.earnedFunMoney).toBe(0);
    expect(result.result?.earnedXp).toBeGreaterThan(0);
    expect(result.result?.masteryLevel).toBe("practicing");

    const progress = await Progress.findOne({ studentId, lessonId });
    expect(progress?.rewardGranted).toBe(false);
  });

  it("rejects submissions made on behalf of another student", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: new Types.ObjectId().toString(),
      username: "otherkid",
      role: "student",
    });

    const result = await awardLessonCompletion({
      studentId,
      lessonId,
      score: 100,
      quizAnswers: [],
      timeSpent: 100,
    });

    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/own work/i);
  });

  it("returns ok:false when the lesson does not exist", async () => {
    const result = await awardLessonCompletion({
      studentId,
      lessonId: new Types.ObjectId().toString(),
      score: 100,
      quizAnswers: [],
      timeSpent: 100,
    });

    expect(result.ok).toBe(false);
  });
});
