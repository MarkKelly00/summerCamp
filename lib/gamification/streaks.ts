/**
 * Daily learning streaks.
 *
 * Pure date math — no DB, no Mongoose. Called from inside the
 * `awardLessonCompletion` transaction with the user's current values.
 *
 * Streak rules:
 *   - First-ever activity: currentStreak = 1.
 *   - Same UTC day as `lastActiveDate`: streak unchanged.
 *   - Exactly one UTC day later: streak += 1.
 *   - Two or more UTC days later: streak resets to 1.
 *   - longestStreak always tracks the historical max.
 *
 * Using UTC dates avoids "did the kid play at 11:55 PM or 12:05 AM"
 * edge cases. For a family in one time zone this is good enough; if we
 * later need per-user time-zone tuning, that's a `User.timeZone` field
 * plus this same arithmetic with a localized formatter.
 */

export interface StreakInput {
  now: Date;
  lastActiveDate: Date | undefined | null;
  currentStreak: number;
  longestStreak: number;
}

export interface StreakOutput {
  currentStreak: number;
  longestStreak: number;
  /** True if this update advanced the streak (good moment for celebration UX). */
  advanced: boolean;
}

function utcDayIndex(d: Date): number {
  // Days since Unix epoch in UTC. Integer comparable with arithmetic.
  return Math.floor(d.getTime() / 86_400_000);
}

export function updateStreak(input: StreakInput): StreakOutput {
  const todayIdx = utcDayIndex(input.now);

  if (!input.lastActiveDate) {
    return {
      currentStreak: 1,
      longestStreak: Math.max(1, input.longestStreak ?? 0),
      advanced: true,
    };
  }

  const lastIdx = utcDayIndex(new Date(input.lastActiveDate));
  const diff = todayIdx - lastIdx;

  if (diff < 0) {
    // Clock skew or backdated activity. Don't penalize — treat as same day.
    return {
      currentStreak: input.currentStreak,
      longestStreak: input.longestStreak,
      advanced: false,
    };
  }

  if (diff === 0) {
    return {
      currentStreak: input.currentStreak,
      longestStreak: input.longestStreak,
      advanced: false,
    };
  }

  if (diff === 1) {
    const next = input.currentStreak + 1;
    return {
      currentStreak: next,
      longestStreak: Math.max(next, input.longestStreak ?? 0),
      advanced: true,
    };
  }

  // Streak broken: reset to today.
  return {
    currentStreak: 1,
    longestStreak: Math.max(1, input.longestStreak ?? 0),
    advanced: true,
  };
}
