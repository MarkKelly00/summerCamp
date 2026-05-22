/**
 * Reward catalog for Summer 2026.
 *
 * The seed runner upserts these by `slug` so re-running never duplicates
 * a reward and `cost`/`category`/`approvalThreshold` edits propagate
 * through to the DB.
 */

import type { RewardCategory } from "@/lib/db/models/Reward";

export interface RewardSeed {
  slug: string;
  name: string;
  description: string;
  cost: number;
  category: RewardCategory;
  image?: string;
  requiresParentApproval: boolean;
  approvalThreshold?: number;
  active: boolean;
}

export const REWARD_SEEDS: RewardSeed[] = [
  {
    slug: "fiiz-drink",
    name: "Fiiz Drink",
    description: "One Fiiz drink of your choice on the next family run.",
    cost: 300,
    category: "food",
    image: "fiiz",
    requiresParentApproval: false,
    active: true,
  },
  {
    slug: "happy-meal",
    name: "Happy Meal",
    description: "Your pick of Happy Meal at McDonald's.",
    cost: 500,
    category: "food",
    image: "happy-meal",
    requiresParentApproval: false,
    active: true,
  },
  {
    slug: "vbucks-10",
    name: "$10 V-Bucks",
    description: "$10 in Fortnite V-Bucks credit, applied to your account.",
    cost: 1000,
    category: "digital",
    image: "vbucks",
    requiresParentApproval: true,
    active: true,
  },
  {
    slug: "robux-10",
    name: "$10 Robux",
    description: "$10 in Roblox Robux credit, applied to your account.",
    cost: 1000,
    category: "digital",
    image: "robux",
    requiresParentApproval: true,
    active: true,
  },
  {
    slug: "cold-stone",
    name: "Cold Stone Ice Cream",
    description: "A Cold Stone Like-It-size creation on the next family run.",
    cost: 1000,
    category: "food",
    image: "cold-stone",
    requiresParentApproval: false,
    active: true,
  },
  {
    slug: "new-shoes",
    name: "New Pair of Shoes",
    description: "Pick out a new pair of shoes (one parent-approved pair).",
    cost: 1500,
    category: "experience",
    image: "shoes",
    requiresParentApproval: true,
    active: true,
  },
  {
    slug: "screen-time-bonus-hour",
    name: "Bonus Hour of Screen Time",
    description: "One extra hour of approved screen time, used within a week.",
    cost: 200,
    category: "experience",
    image: "screen-time",
    requiresParentApproval: true,
    active: true,
  },
  {
    slug: "pick-the-movie",
    name: "Pick Family Movie Night",
    description: "Choose what the family watches on the next movie night.",
    cost: 250,
    category: "experience",
    image: "movie",
    requiresParentApproval: false,
    active: true,
  },
  {
    slug: "stay-up-30-min",
    name: "Stay Up 30 Extra Minutes",
    description: "One night of staying up 30 minutes past normal bedtime.",
    cost: 150,
    category: "experience",
    image: "moon",
    requiresParentApproval: true,
    active: true,
  },
  {
    slug: "skip-a-chore",
    name: "Skip a Chore Pass",
    description: "Skip one weekly chore — parent picks which qualifies.",
    cost: 250,
    category: "experience",
    image: "skip",
    requiresParentApproval: true,
    active: true,
  },
];
