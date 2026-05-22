/**
 * Unit tests for the Progress.masteryLevelForScore helper.
 */

import { describe, expect, it } from "vitest";

import { masteryLevelForScore } from "@/lib/db/models/Progress";

describe("masteryLevelForScore", () => {
  it("returns not-started for any score when status is not-started", () => {
    expect(masteryLevelForScore(0, "not-started")).toBe("not-started");
    expect(masteryLevelForScore(95, "not-started")).toBe("not-started");
  });

  it("returns in-progress when status is in-progress", () => {
    expect(masteryLevelForScore(50, "in-progress")).toBe("in-progress");
  });

  it("returns practicing for completed below 80", () => {
    expect(masteryLevelForScore(0, "completed")).toBe("practicing");
    expect(masteryLevelForScore(79, "completed")).toBe("practicing");
  });

  it("returns mastered for completed in [80, 95)", () => {
    expect(masteryLevelForScore(80, "completed")).toBe("mastered");
    expect(masteryLevelForScore(94, "completed")).toBe("mastered");
  });

  it("returns exceeded for completed >= 95", () => {
    expect(masteryLevelForScore(95, "completed")).toBe("exceeded");
    expect(masteryLevelForScore(100, "completed")).toBe("exceeded");
  });
});
