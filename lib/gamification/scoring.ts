/**
 * Mini-game scoring + reward math.
 *
 * The mini-game engine reports a raw score (game-specific units). The
 * Server Action runs that score through this module to:
 *   - normalize against `scoringRules.maxScore` -> 0..100
 *   - decide mastery vs practice
 *   - compute XP and Fun Money to award
 *
 * Pure functions only — no DB, no Mongoose. Easy to unit-test.
 */

import type { IScoringRules } from "@/lib/db/models/MiniGame";

export interface RewardSchedule {
  /** XP for any attempt, regardless of score. */
  effortXp: number;
  /** Extra XP if the attempt reaches mastery (cumulative on top of effortXp). */
  masteryBonusXp: number;
  /** Extra XP only on the very first mastery for this (user, game). */
  firstMasteryBonusXp: number;
  /** Fun Money awarded on the first mastery only. */
  firstMasteryFunMoney: number;
  /** Fun Money awarded on subsequent masteries (encourages replays). */
  replayMasteryFunMoney: number;
}

export const DEFAULT_REWARD_SCHEDULE: RewardSchedule = {
  effortXp: 5,
  masteryBonusXp: 15,
  firstMasteryBonusXp: 30,
  firstMasteryFunMoney: 25,
  replayMasteryFunMoney: 5,
};

export interface ScoreInput {
  rawScore: number;
  accuracy: number; // 0..1
  timeSpent: number; // ms
  scoringRules: IScoringRules;
}

export interface ScoredResult {
  finalScore: number; // 0..100
  isMastery: boolean;
}

/**
 * Convert a raw game score (0..maxScore) to a normalized 0..100 score
 * blended with accuracy and (optionally) speed.
 *
 * Most games will pass their own raw score equal to the points earned in
 * the run. The scoringRules.accuracyWeight and speedWeight scale how much
 * each axis contributes. We never exceed 100.
 */
export function scoreAttempt(input: ScoreInput): ScoredResult {
  const {
    rawScore,
    accuracy,
    timeSpent,
    scoringRules: { maxScore, accuracyWeight, speedWeight = 0, masteryThreshold },
  } = input;

  const safeMax = Math.max(maxScore, 1);
  const rawNormalized = Math.max(0, Math.min(rawScore / safeMax, 1));
  const totalWeight = Math.max(accuracyWeight + speedWeight, 1);

  // Speed bonus: max if completed under 60s, 0 if over 5 minutes.
  const speedBonus =
    speedWeight === 0
      ? 0
      : Math.max(0, 1 - Math.max(timeSpent - 60_000, 0) / (4 * 60_000));

  const weighted =
    rawNormalized * (accuracyWeight / totalWeight) +
    accuracy * (accuracyWeight / totalWeight) * 0.0 +
    speedBonus * (speedWeight / totalWeight);

  // Blend with raw + accuracy: 80% raw normalized + 20% pure accuracy, then
  // add the speed bonus on top.
  const blended = rawNormalized * 0.8 + accuracy * 0.2 + weighted * 0.0;
  const finalScore = Math.round(
    Math.max(0, Math.min(1, blended + speedBonus * 0.1)) * 100,
  );

  return {
    finalScore,
    isMastery: finalScore >= masteryThreshold,
  };
}

export interface ComputeRewardInput {
  isMastery: boolean;
  isFirstMastery: boolean;
  schedule?: RewardSchedule;
}

export interface ComputedReward {
  xp: number;
  funMoney: number;
}

/**
 * Convert mastery flags into actual XP + Fun Money awards.
 */
export function computeReward(input: ComputeRewardInput): ComputedReward {
  const s = input.schedule ?? DEFAULT_REWARD_SCHEDULE;
  let xp = s.effortXp;
  let funMoney = 0;

  if (input.isMastery) {
    xp += s.masteryBonusXp;
    if (input.isFirstMastery) {
      xp += s.firstMasteryBonusXp;
      funMoney += s.firstMasteryFunMoney;
    } else {
      funMoney += s.replayMasteryFunMoney;
    }
  }

  return { xp, funMoney };
}

/**
 * Linear level curve: 200 XP per level. Level 1 = 0..199 XP, etc.
 *
 * The 200-per-level cadence gives a kid a level-up roughly every other
 * lesson completion at the Phase 4 reward defaults (50 XP per core
 * lesson). Tuneable later without a schema change.
 */
export function levelForXp(xp: number): number {
  return Math.max(1, Math.floor(xp / 200) + 1);
}

export function xpToNextLevel(xp: number): number {
  const next = levelForXp(xp) * 200;
  return Math.max(0, next - xp);
}
