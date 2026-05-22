/**
 * Unit tests for the scoring + reward helpers.
 *
 * These functions drive XP and Fun Money awards on every lesson and
 * mini-game completion, so we want broad branch coverage.
 */

import { describe, expect, it } from "vitest";

import {
  DEFAULT_REWARD_SCHEDULE,
  computeReward,
  levelForXp,
  scoreAttempt,
  xpToNextLevel,
} from "@/lib/gamification/scoring";

describe("levelForXp", () => {
  it("returns level 1 for 0 XP", () => {
    expect(levelForXp(0)).toBe(1);
  });

  it("returns level 1 just below the 200 XP threshold", () => {
    expect(levelForXp(199)).toBe(1);
  });

  it("returns level 2 at exactly 200 XP", () => {
    expect(levelForXp(200)).toBe(2);
  });

  it("returns level 5 at 800 XP", () => {
    expect(levelForXp(800)).toBe(5);
  });

  it("never returns a level below 1, even for negative XP", () => {
    expect(levelForXp(-100)).toBeGreaterThanOrEqual(1);
  });
});

describe("xpToNextLevel", () => {
  it("returns the full level distance at the start of a level", () => {
    expect(xpToNextLevel(0)).toBe(200);
  });

  it("returns 1 when 199 XP into level 1", () => {
    expect(xpToNextLevel(199)).toBe(1);
  });

  it("returns 200 when exactly at a level boundary", () => {
    expect(xpToNextLevel(200)).toBe(200);
  });
});

describe("computeReward", () => {
  it("gives effort XP only on a non-mastery attempt", () => {
    const result = computeReward({ isMastery: false, isFirstMastery: false });
    expect(result.xp).toBe(DEFAULT_REWARD_SCHEDULE.effortXp);
    expect(result.funMoney).toBe(0);
  });

  it("stacks effort + mastery XP on a non-first mastery (replay)", () => {
    const result = computeReward({ isMastery: true, isFirstMastery: false });
    expect(result.xp).toBe(
      DEFAULT_REWARD_SCHEDULE.effortXp +
        DEFAULT_REWARD_SCHEDULE.masteryBonusXp,
    );
    expect(result.funMoney).toBe(
      DEFAULT_REWARD_SCHEDULE.replayMasteryFunMoney,
    );
  });

  it("stacks all three on a first mastery", () => {
    const result = computeReward({ isMastery: true, isFirstMastery: true });
    expect(result.xp).toBe(
      DEFAULT_REWARD_SCHEDULE.effortXp +
        DEFAULT_REWARD_SCHEDULE.masteryBonusXp +
        DEFAULT_REWARD_SCHEDULE.firstMasteryBonusXp,
    );
    expect(result.funMoney).toBe(
      DEFAULT_REWARD_SCHEDULE.firstMasteryFunMoney,
    );
  });

  it("never awards Fun Money below mastery, even if isFirstMastery is true", () => {
    // Defensive: callers shouldn't pass this, but if they do, behavior
    // should still be conservative.
    const result = computeReward({ isMastery: false, isFirstMastery: true });
    expect(result.funMoney).toBe(0);
  });

  it("honors a custom schedule override", () => {
    const result = computeReward({
      isMastery: true,
      isFirstMastery: true,
      schedule: {
        effortXp: 0,
        masteryBonusXp: 0,
        firstMasteryBonusXp: 100,
        firstMasteryFunMoney: 999,
        replayMasteryFunMoney: 0,
      },
    });
    expect(result.xp).toBe(100);
    expect(result.funMoney).toBe(999);
  });
});

describe("scoreAttempt", () => {
  const rules = {
    maxScore: 100,
    masteryThreshold: 70,
    accuracyWeight: 1,
    speedWeight: 0,
    mistakePenalty: 0,
  };

  it("flags mastery when normalized score >= threshold", () => {
    const result = scoreAttempt({
      rawScore: 80,
      accuracy: 0.9,
      timeSpent: 120_000,
      scoringRules: rules,
    });
    expect(result.isMastery).toBe(true);
    expect(result.finalScore).toBeGreaterThanOrEqual(70);
  });

  it("flags not-mastery when score is far below threshold", () => {
    const result = scoreAttempt({
      rawScore: 20,
      accuracy: 0.2,
      timeSpent: 240_000,
      scoringRules: rules,
    });
    expect(result.isMastery).toBe(false);
    expect(result.finalScore).toBeLessThan(70);
  });

  it("clamps the finalScore to 0..100", () => {
    const result = scoreAttempt({
      rawScore: 999_999,
      accuracy: 1,
      timeSpent: 1_000,
      scoringRules: rules,
    });
    expect(result.finalScore).toBeLessThanOrEqual(100);
    expect(result.finalScore).toBeGreaterThanOrEqual(0);
  });

  it("considers accuracy when blending the raw score", () => {
    // Same raw score, lower accuracy → lower final score.
    const high = scoreAttempt({
      rawScore: 80,
      accuracy: 1,
      timeSpent: 60_000,
      scoringRules: rules,
    });
    const low = scoreAttempt({
      rawScore: 80,
      accuracy: 0.3,
      timeSpent: 60_000,
      scoringRules: rules,
    });
    expect(high.finalScore).toBeGreaterThan(low.finalScore);
  });
});
