/**
 * Zod schemas for Reward catalog and redemption flows (Phase 6 + 8).
 */

import { z } from "zod";

export const REWARD_CATEGORIES = [
  "food",
  "digital",
  "toy",
  "experience",
  "custom",
] as const;

export const RewardUpsertSchema = z.object({
  slug: z.string().trim().min(1).max(64),
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(500),
  cost: z.number().int().min(0).max(100_000),
  image: z.string().optional(),
  category: z.enum(REWARD_CATEGORIES).default("custom"),
  inventoryCount: z.number().int().min(0).optional(),
  requiresParentApproval: z.boolean().default(true),
  approvalThreshold: z.number().int().min(0).optional(),
  active: z.boolean().default(true),
});

export type RewardUpsertInput = z.infer<typeof RewardUpsertSchema>;

export const RedemptionRequestSchema = z.object({
  studentId: z.string().regex(/^[a-f0-9]{24}$/i),
  rewardId: z.string().regex(/^[a-f0-9]{24}$/i),
});

export type RedemptionRequestInput = z.infer<typeof RedemptionRequestSchema>;

export const RedemptionDecisionSchema = z.object({
  redemptionId: z.string().regex(/^[a-f0-9]{24}$/i),
  notes: z.string().max(500).optional(),
});

export type RedemptionDecisionInput = z.infer<
  typeof RedemptionDecisionSchema
>;
