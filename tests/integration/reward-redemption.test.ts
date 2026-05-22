/**
 * Integration tests for the redemption Server Actions.
 *
 * Money path under test:
 *   - requestRedemption deducts Fun Money atomically + reserves a code.
 *   - approveRedemption flips status without changing money.
 *   - rejectRedemption refunds Fun Money inside the same transaction.
 *   - fulfillRedemption flips approved → fulfilled.
 *   - Insufficient balance is refused at request time.
 */

import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/cookies", () => ({
  getSession: vi.fn(),
  setSession: vi.fn(),
  clearSession: vi.fn(),
}));

import { getSession } from "@/lib/auth/cookies";
import { Reward, RewardRedemption, User } from "@/lib/db/models";
import {
  approveRedemption,
  fulfillRedemption,
  rejectRedemption,
  requestRedemption,
} from "@/lib/actions/rewards";

describe("redemption Server Actions", () => {
  let studentId: string;
  let parentId: string;
  let rewardId: string;

  beforeEach(async () => {
    const parent = await User.create({
      username: "testparent",
      password: "password123",
      role: "admin",
      profile: { name: "Test Parent", age: 40, gradeLevel: 12 },
    });
    parentId = String(parent._id);

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
      funMoney: 500,
    });
    studentId = String(student._id);

    const reward = await Reward.create({
      slug: "test-reward",
      name: "Test Reward",
      description: "A reward for tests.",
      cost: 200,
      active: true,
      isAvailable: true,
      category: "experience",
      requiresParentApproval: true,
    });
    rewardId = String(reward._id);
  });

  it("deducts Fun Money atomically and creates a pending redemption", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });

    const result = await requestRedemption({ studentId, rewardId });
    expect(result.ok).toBe(true);
    expect(result.result?.status).toBe("pending");
    expect(result.result?.code).toMatch(/^[A-Z]{3}-[A-F0-9]{6}$/);
    expect(result.result?.newFunMoney).toBe(300);

    const user = await User.findById(studentId);
    expect(user?.funMoney).toBe(300);
    expect((user?.rewardHistory ?? []).length).toBe(1);
  });

  it("refuses to redeem when balance is insufficient", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });

    // Crank reward cost above what the student has.
    await Reward.updateOne({ _id: rewardId }, { $set: { cost: 9999 } });

    const result = await requestRedemption({ studentId, rewardId });
    expect(result.ok).toBe(false);
    expect(result.error).toMatch(/not enough/i);

    const user = await User.findById(studentId);
    expect(user?.funMoney).toBe(500); // Unchanged.
  });

  it("approves a pending redemption without touching money", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });
    const req = await requestRedemption({ studentId, rewardId });
    expect(req.ok).toBe(true);

    vi.mocked(getSession).mockResolvedValue({
      userId: parentId,
      username: "testparent",
      role: "admin",
    });
    const approval = await approveRedemption({
      redemptionId: req.result!.redemptionId,
      notes: "Looks good",
    });
    expect(approval.ok).toBe(true);
    expect(approval.result?.status).toBe("approved");

    const user = await User.findById(studentId);
    expect(user?.funMoney).toBe(300); // Still deducted; no refund.

    const redemption = await RewardRedemption.findById(
      req.result!.redemptionId,
    );
    expect(redemption?.notes).toBe("Looks good");
  });

  it("refunds Fun Money atomically when a parent rejects", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });
    const req = await requestRedemption({ studentId, rewardId });
    expect(req.ok).toBe(true);

    vi.mocked(getSession).mockResolvedValue({
      userId: parentId,
      username: "testparent",
      role: "admin",
    });
    const rejection = await rejectRedemption({
      redemptionId: req.result!.redemptionId,
      notes: "Try a smaller prize first",
    });
    expect(rejection.ok).toBe(true);
    expect(rejection.result?.status).toBe("rejected");
    expect(rejection.result?.newFunMoney).toBe(500);

    const user = await User.findById(studentId);
    expect(user?.funMoney).toBe(500); // Full refund.
  });

  it("transitions approved → fulfilled and records redeemedAt", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });
    const req = await requestRedemption({ studentId, rewardId });

    vi.mocked(getSession).mockResolvedValue({
      userId: parentId,
      username: "testparent",
      role: "admin",
    });
    await approveRedemption({ redemptionId: req.result!.redemptionId });
    const result = await fulfillRedemption({
      redemptionId: req.result!.redemptionId,
      notes: "Delivered today",
    });

    expect(result.ok).toBe(true);
    expect(result.result?.status).toBe("fulfilled");

    const redemption = await RewardRedemption.findById(
      req.result!.redemptionId,
    );
    expect(redemption?.redeemed).toBe(true);
    expect(redemption?.redeemedAt).toBeInstanceOf(Date);
  });

  it("refuses approval from a non-parent / non-admin", async () => {
    vi.mocked(getSession).mockResolvedValue({
      userId: studentId,
      username: "testkid",
      role: "student",
    });
    const req = await requestRedemption({ studentId, rewardId });

    // Same student tries to self-approve.
    const approval = await approveRedemption({
      redemptionId: req.result!.redemptionId,
    });
    expect(approval.ok).toBe(false);
  });
});
