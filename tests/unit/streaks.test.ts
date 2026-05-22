/**
 * Unit tests for the streak helper.
 *
 * Pure functions, no DB. Cover the four interesting branches plus a
 * couple edge cases (clock skew, large gaps).
 */

import { describe, expect, it } from "vitest";

import { updateStreak } from "@/lib/gamification/streaks";

function utcDayAt(yyyy: number, mm: number, dd: number, hh = 12): Date {
  // Construct a UTC instant at a specific calendar date. `Date.UTC`
  // months are 0-indexed.
  return new Date(Date.UTC(yyyy, mm - 1, dd, hh));
}

describe("updateStreak", () => {
  it("starts streak at 1 when there is no prior activity", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 1),
      lastActiveDate: null,
      currentStreak: 0,
      longestStreak: 0,
    });
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.advanced).toBe(true);
  });

  it("does nothing if active twice in the same UTC day", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 5, 22),
      lastActiveDate: utcDayAt(2026, 6, 5, 9),
      currentStreak: 3,
      longestStreak: 5,
    });
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(5);
    expect(result.advanced).toBe(false);
  });

  it("advances by 1 when previous activity was exactly yesterday", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 5),
      lastActiveDate: utcDayAt(2026, 6, 4),
      currentStreak: 4,
      longestStreak: 5,
    });
    expect(result.currentStreak).toBe(5);
    expect(result.longestStreak).toBe(5);
    expect(result.advanced).toBe(true);
  });

  it("bumps longest streak when current passes prior longest", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 6),
      lastActiveDate: utcDayAt(2026, 6, 5),
      currentStreak: 5,
      longestStreak: 5,
    });
    expect(result.currentStreak).toBe(6);
    expect(result.longestStreak).toBe(6);
    expect(result.advanced).toBe(true);
  });

  it("resets to 1 when there's a 2+ day gap", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 10),
      lastActiveDate: utcDayAt(2026, 6, 5),
      currentStreak: 5,
      longestStreak: 5,
    });
    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(5);
    expect(result.advanced).toBe(true);
  });

  it("does not penalize backdated activity (clock skew)", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 4),
      // last "active" is in the future — treat as same-day.
      lastActiveDate: utcDayAt(2026, 6, 5),
      currentStreak: 3,
      longestStreak: 5,
    });
    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(5);
    expect(result.advanced).toBe(false);
  });

  it("handles a fresh user with undefined lastActiveDate", () => {
    const result = updateStreak({
      now: utcDayAt(2026, 6, 1),
      lastActiveDate: undefined,
      currentStreak: 0,
      longestStreak: 0,
    });
    expect(result.currentStreak).toBe(1);
    expect(result.advanced).toBe(true);
  });
});
