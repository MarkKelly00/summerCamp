"use server";

/**
 * Lesson completion Server Action — the second money-path action.
 *
 * Mirrors the redemption actions:
 *   - Zod-validated input.
 *   - Mongoose transaction via `runInTx` (auto-retries on
 *     `TransientTransactionError` — catalog changes, lock timeouts,
 *     write conflicts).
 *   - `Progress.rewardGranted` is the idempotency anchor: once true for
 *     a given (studentId, lessonId), no further Fun Money is awarded.
 *     Practice XP can still accrue on replays (per the lesson's
 *     `rewardPolicy.allowReplayPracticeXp`).
 *   - Streak math runs once per call (any completion counts toward the
 *     daily streak).
 *   - Badges are evaluated inside the same transaction so any badge XP/
 *     Fun Money is committed atomically with the lesson award.
 */

import { Types } from "mongoose";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { GracefulAbortError, runInTx } from "@/lib/db/transaction";
import {
  Lesson,
  Progress,
  User,
  masteryLevelForScore,
  type MasteryLevel,
} from "@/lib/db/models";
import { evaluateBadges } from "@/lib/gamification/badges";
import { levelForXp } from "@/lib/gamification/scoring";
import { updateStreak } from "@/lib/gamification/streaks";
import {
  LessonCompletionSchema,
  type LessonCompletionInput,
} from "@/lib/schemas/progress";

export interface AwardLessonCompletionState {
  ok: boolean;
  error?: string;
  result?: {
    score: number;
    masteryLevel: MasteryLevel;
    isFirstAward: boolean;
    earnedXp: number;
    earnedFunMoney: number;
    streakAdvanced: boolean;
    currentStreak: number;
    longestStreak: number;
    newXp: number;
    newLevel: number;
    newFunMoney: number;
    newBadgeNames: string[];
  };
}

const PRACTICE_XP_AFTER_FIRST_AWARD = 10;

export async function awardLessonCompletion(
  input: LessonCompletionInput,
): Promise<AwardLessonCompletionState> {
  // Auth: only the student themselves (or admin acting on their behalf)
  // may submit a completion.
  const session = await getSession();
  if (!session) return { ok: false, error: "Not signed in." };

  const parsed = LessonCompletionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid lesson completion payload." };
  }

  if (
    session.role === "student" &&
    session.userId !== parsed.data.studentId
  ) {
    return { ok: false, error: "Students may only submit their own work." };
  }
  if (session.role !== "student" && session.role !== "admin") {
    return {
      ok: false,
      error:
        "Only students (or admin acting on their behalf) can complete lessons.",
    };
  }

  await connectToDatabase();

  const lesson = await Lesson.findById(parsed.data.lessonId).lean();
  if (!lesson) {
    return { ok: false, error: "Lesson not found." };
  }

  const studentObjectId = new Types.ObjectId(parsed.data.studentId);
  const lessonObjectId = new Types.ObjectId(parsed.data.lessonId);

  try {
    const result = await runInTx(async (mongoSession) => {
      // ---- Load or create the Progress row exclusively in this tx ------
      let progress = await Progress.findOne({
        studentId: studentObjectId,
        lessonId: lessonObjectId,
      }).session(mongoSession);

      if (!progress) {
        progress = new Progress({
          studentId: studentObjectId,
          lessonId: lessonObjectId,
          status: "not-started",
          attempts: 0,
        });
      }

      const previouslyGranted = progress.rewardGranted === true;
      const newAttempts = (progress.attempts ?? 0) + 1;
      const mastery: MasteryLevel = masteryLevelForScore(
        parsed.data.score,
        "completed",
      );

      // ---- Compute reward --------------------------------------------
      const rp = lesson.rewardPolicy ?? {
        xp: 10,
        funMoney: 10,
        masteryThreshold: 70,
        allowReplayPracticeXp: true,
      };
      const isMastery = parsed.data.score >= rp.masteryThreshold;

      let xpThisAttempt = 0;
      let funMoneyThisAttempt = 0;
      let isFirstAward = false;

      if (!previouslyGranted) {
        isFirstAward = isMastery;
        xpThisAttempt = isMastery
          ? rp.xp
          : Math.min(rp.xp, PRACTICE_XP_AFTER_FIRST_AWARD);
        funMoneyThisAttempt = isMastery ? rp.funMoney : 0;
      } else if (rp.allowReplayPracticeXp) {
        xpThisAttempt = PRACTICE_XP_AFTER_FIRST_AWARD;
      }

      // ---- Update Progress ------------------------------------------
      progress.status = "completed";
      progress.score = parsed.data.score;
      progress.miniGameScore =
        parsed.data.miniGameScore ?? progress.miniGameScore;
      progress.attempts = newAttempts;
      progress.timeSpent = (progress.timeSpent ?? 0) + parsed.data.timeSpent;
      progress.quizAnswers = parsed.data.quizAnswers;
      progress.completedAt = new Date();
      progress.masteryLevel = mastery;
      progress.earnedXp = (progress.earnedXp ?? 0) + xpThisAttempt;
      progress.earnedFunMoney =
        (progress.earnedFunMoney ?? 0) + funMoneyThisAttempt;
      if (isFirstAward) progress.rewardGranted = true;
      await progress.save({ session: mongoSession });

      // ---- Load + update User --------------------------------------
      const userDoc = await User.findById(studentObjectId).session(
        mongoSession,
      );
      if (!userDoc) {
        throw new GracefulAbortError("User vanished mid-transaction.");
      }

      const now = new Date();
      const streak = updateStreak({
        now,
        lastActiveDate: userDoc.lastActiveDate,
        currentStreak: userDoc.currentStreak ?? 0,
        longestStreak: userDoc.longestStreak ?? 0,
      });

      userDoc.xp = (userDoc.xp ?? 0) + xpThisAttempt;
      userDoc.funMoney = (userDoc.funMoney ?? 0) + funMoneyThisAttempt;
      userDoc.currentStreak = streak.currentStreak;
      userDoc.longestStreak = streak.longestStreak;
      userDoc.lastActiveDate = now;

      // ---- Badge evaluation (inside the transaction) ----------------
      const badgeResult = await evaluateBadges(
        {
          userId: userDoc._id as Types.ObjectId,
          learningTrack: userDoc.profile?.learningTrack,
          gradeLevel: userDoc.profile?.gradeLevel ?? 0,
          currentStreak: streak.currentStreak,
          longestStreak: streak.longestStreak,
          badgeIds: (userDoc.badges ?? []).map((id) => id as Types.ObjectId),
        },
        {
          latestScore: parsed.data.score,
          latestSubject: lesson.subject,
          latestIsBonus:
            lesson.lessonType === "bonus" || lesson.isBonus === true,
          latestWeek: lesson.week,
        },
        mongoSession,
      );

      for (const award of badgeResult.awards) {
        userDoc.badges = [...(userDoc.badges ?? []), award.badgeId];
      }
      userDoc.xp += badgeResult.totalXp;
      userDoc.funMoney += badgeResult.totalFunMoney;
      userDoc.level = levelForXp(userDoc.xp);

      await userDoc.save({ session: mongoSession });

      const totalXp = xpThisAttempt + badgeResult.totalXp;
      const totalFunMoney = funMoneyThisAttempt + badgeResult.totalFunMoney;

      return {
        score: parsed.data.score,
        masteryLevel: mastery,
        isFirstAward,
        earnedXp: totalXp,
        earnedFunMoney: totalFunMoney,
        streakAdvanced: streak.advanced,
        currentStreak: userDoc.currentStreak,
        longestStreak: userDoc.longestStreak,
        newXp: userDoc.xp,
        newLevel: userDoc.level,
        newFunMoney: userDoc.funMoney,
        newBadgeNames: badgeResult.awards.map((a) => a.name),
      };
    });

    return { ok: true, result };
  } catch (error) {
    if (error instanceof GracefulAbortError) {
      return { ok: false, error: error.reason };
    }
    console.error("[awardLessonCompletion] failed:", error);
    return { ok: false, error: "Could not record your work. Try again." };
  }
}
