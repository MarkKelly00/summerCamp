"use server";

/**
 * Mini-game Server Actions.
 *
 * The single public action `submitMiniGameResult` is the atomic write
 * path for everything a play of a mini-game produces:
 *   - one MiniGameAttempt document (always)
 *   - User.xp / User.level recompute (always; even 5 XP for effort)
 *   - User.funMoney increment (only on mastery)
 *   - First-mastery flag is exclusive per (userId, miniGameId): a
 *     transaction holds the read + write so concurrent submissions can't
 *     both claim the first-mastery bonus.
 *
 * Uses the shared `runInTx` helper so transient MongoDB errors auto-retry.
 */

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { GracefulAbortError, runInTx } from "@/lib/db/transaction";
import {
  MiniGame,
  MiniGameAttempt,
  User,
} from "@/lib/db/models";
import {
  DEFAULT_REWARD_SCHEDULE,
  computeReward,
  levelForXp,
  scoreAttempt,
} from "@/lib/gamification/scoring";
import { MiniGameResultSchema } from "@/lib/schemas/progress";

export interface SubmitMiniGameResultInput {
  miniGameId: string;
  rawScore: number;
  accuracy: number;
  timeSpent: number;
  skillTagsPracticed: string[];
  mistakes: {
    prompt: string;
    selectedAnswer: string;
    correctAnswer: string;
    skillTag: string;
  }[];
}

export interface SubmitMiniGameResultState {
  ok: boolean;
  error?: string;
  result?: {
    finalScore: number;
    isMastery: boolean;
    isFirstMastery: boolean;
    earnedXp: number;
    earnedFunMoney: number;
    newXp: number;
    newLevel: number;
    newFunMoney: number;
  };
}

export async function submitMiniGameResult(
  input: SubmitMiniGameResultInput,
): Promise<SubmitMiniGameResultState> {
  const session = await getSession();
  if (!session) {
    return { ok: false, error: "Not signed in." };
  }
  if (session.role !== "student" && session.role !== "admin") {
    return {
      ok: false,
      error: "Only students can submit mini-game results.",
    };
  }

  const parsed = MiniGameResultSchema.safeParse({
    studentId: session.userId,
    ...input,
    score: input.rawScore,
  });
  if (!parsed.success) {
    return { ok: false, error: "Invalid mini-game payload." };
  }

  await connectToDatabase();

  const miniGame = await MiniGame.findById(parsed.data.miniGameId).lean();
  if (!miniGame) {
    return { ok: false, error: "Mini-game not found." };
  }
  if (!miniGame.active) {
    return { ok: false, error: "This mini-game is not active." };
  }

  const { finalScore, isMastery } = scoreAttempt({
    rawScore: parsed.data.score,
    accuracy: parsed.data.accuracy,
    timeSpent: parsed.data.timeSpent,
    scoringRules: miniGame.scoringRules,
  });

  try {
    const result = await runInTx(async (mongoSession) => {
      // Check (and claim) first-mastery exclusively within the transaction.
      let isFirstMastery = false;
      if (isMastery) {
        const existingMastery = await MiniGameAttempt.findOne(
          {
            userId: session.userId,
            miniGameId: parsed.data.miniGameId,
            isFirstMastery: true,
          },
          { _id: 1 },
        ).session(mongoSession);
        isFirstMastery = !existingMastery;
      }

      const reward = computeReward({
        isMastery,
        isFirstMastery,
        schedule: DEFAULT_REWARD_SCHEDULE,
      });

      await MiniGameAttempt.create(
        [
          {
            userId: session.userId,
            miniGameId: parsed.data.miniGameId,
            rawScore: parsed.data.score,
            finalScore,
            accuracy: parsed.data.accuracy,
            timeSpent: parsed.data.timeSpent,
            isMastery,
            isFirstMastery,
            skillTagsPracticed: parsed.data.skillTagsPracticed,
            mistakes: parsed.data.mistakes,
            earnedXp: reward.xp,
            earnedFunMoney: reward.funMoney,
            rewardGranted: reward.xp > 0 || reward.funMoney > 0,
          },
        ],
        { session: mongoSession },
      );

      const userDoc = await User.findById(session.userId).session(mongoSession);
      if (!userDoc) {
        throw new GracefulAbortError("User vanished mid-transaction.");
      }
      userDoc.xp = (userDoc.xp ?? 0) + reward.xp;
      userDoc.level = levelForXp(userDoc.xp);
      userDoc.funMoney = (userDoc.funMoney ?? 0) + reward.funMoney;
      userDoc.lastActiveDate = new Date();
      await userDoc.save({ session: mongoSession });

      return {
        finalScore,
        isMastery,
        isFirstMastery,
        earnedXp: reward.xp,
        earnedFunMoney: reward.funMoney,
        newXp: userDoc.xp,
        newLevel: userDoc.level,
        newFunMoney: userDoc.funMoney,
      };
    });

    return { ok: true, result };
  } catch (error) {
    if (error instanceof GracefulAbortError) {
      return { ok: false, error: error.reason };
    }
    console.error("[submitMiniGameResult] failed:", error);
    return { ok: false, error: "Could not record your result. Try again." };
  }
}
