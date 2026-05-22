/**
 * Badge catalog for Summer 2026.
 *
 * Categories follow the legacy enum (weekly | subject | streak | special)
 * but the badges themselves are the 2026 set. Some are shared
 * (5-Day Streak, Perfect Quiz, Capstone Champion), others are
 * track-specific (Multiplication Ranger for Dean, Fraction Forge Master
 * for Addie).
 */

import type {
  BadgeCategory,
  BadgeRarity,
  IBadgeRequirement,
} from "@/lib/db/models/Badge";
import type { LearningTrack } from "@/lib/db/models/Lesson";

export interface BadgeSeed {
  slug: string;
  name: string;
  description: string;
  icon: string; // short token; Phase 7 maps to an icon component
  category: BadgeCategory;
  subject?: string;
  subjectScope?: string[];
  gradeLevel: number;
  learningTrack?: LearningTrack;
  requirements: IBadgeRequirement;
  funMoneyReward: number;
  xpReward: number;
  rarity: BadgeRarity;
  active: boolean;
}

const RARITY_REWARDS: Record<BadgeRarity, { funMoney: number; xp: number }> = {
  common: { funMoney: 50, xp: 100 },
  rare: { funMoney: 100, xp: 200 },
  epic: { funMoney: 200, xp: 400 },
  legendary: { funMoney: 400, xp: 800 },
};

function badge(
  args: Omit<BadgeSeed, "funMoneyReward" | "xpReward" | "active"> & {
    funMoneyReward?: number;
    xpReward?: number;
    active?: boolean;
  },
): BadgeSeed {
  const r = RARITY_REWARDS[args.rarity];
  return {
    funMoneyReward: args.funMoneyReward ?? r.funMoney,
    xpReward: args.xpReward ?? r.xp,
    active: args.active ?? true,
    ...args,
  };
}

export const BADGE_SEEDS: BadgeSeed[] = [
  // ----- Shared (both tracks) -----
  badge({
    slug: "five-day-streak",
    name: "5-Day Streak",
    description: "Camped 5 days in a row.",
    icon: "flame-5",
    category: "streak",
    gradeLevel: 3,
    requirements: { type: "streak", target: 5, timeframe: "week" },
    rarity: "rare",
  }),
  badge({
    slug: "perfect-quiz",
    name: "Perfect Quiz",
    description: "Scored 100 on a quiz.",
    icon: "star-100",
    category: "special",
    gradeLevel: 3,
    requirements: { type: "perfect-score", target: 100 },
    rarity: "rare",
  }),
  badge({
    slug: "comeback-kid",
    name: "Comeback Kid",
    description: "Improved a quiz score by 30 points on a replay.",
    icon: "comeback",
    category: "special",
    gradeLevel: 3,
    requirements: { type: "subject-mastery", target: 30 },
    rarity: "common",
  }),
  badge({
    slug: "capstone-champion",
    name: "Capstone Champion",
    description: "Completed the Week 8 capstone showcase.",
    icon: "trophy",
    category: "special",
    gradeLevel: 3,
    requirements: { type: "weekly-completion", target: 5 },
    rarity: "legendary",
  }),
  badge({
    slug: "bonus-quest-hunter",
    name: "Bonus Quest Hunter",
    description: "Finished 5 bonus quests.",
    icon: "compass",
    category: "special",
    gradeLevel: 3,
    requirements: { type: "bonus-lessons", target: 5 },
    rarity: "rare",
  }),
  badge({
    slug: "prize-shop-saver",
    name: "Prize Shop Saver",
    description: "Saved 1000+ Fun Money before spending any.",
    icon: "piggy",
    category: "special",
    gradeLevel: 3,
    requirements: { type: "subject-mastery", target: 1000 },
    rarity: "rare",
  }),

  // ----- Dean (entering 3rd) -----
  badge({
    slug: "multiplication-ranger",
    name: "Multiplication Ranger",
    description: "Mastered multiplication facts through 10.",
    icon: "multiply-shield",
    category: "subject",
    subject: "math",
    subjectScope: ["math"],
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "epic",
  }),
  badge({
    slug: "fraction-chef-3rd",
    name: "Fraction Chef",
    description: "Showed fractions on a number line and pizza model.",
    icon: "pizza",
    category: "subject",
    subject: "math",
    subjectScope: ["math"],
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "rare",
  }),
  badge({
    slug: "weather-watcher",
    name: "Weather Watcher",
    description: "Logged a week of weather observations.",
    icon: "sun-cloud",
    category: "subject",
    subject: "science",
    subjectScope: ["science"],
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "common",
  }),
  badge({
    slug: "main-idea-hero",
    name: "Main Idea Hero",
    description: "Identified the main idea across five different texts.",
    icon: "book-spark",
    category: "subject",
    subject: "reading",
    subjectScope: ["reading"],
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "rare",
  }),
  badge({
    slug: "map-explorer",
    name: "Map Explorer",
    description: "Drew and explained a community map.",
    icon: "map",
    category: "subject",
    subject: "history",
    subjectScope: ["history"],
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "common",
  }),
  badge({
    slug: "timeline-trailblazer",
    name: "Timeline Trailblazer",
    description: "Built a timeline of community changes.",
    icon: "timeline",
    category: "subject",
    subject: "history",
    subjectScope: ["history"],
    gradeLevel: 3,
    learningTrack: "entering-3rd",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "rare",
  }),

  // ----- Addie (entering 5th) -----
  badge({
    slug: "fraction-forge-master",
    name: "Fraction Forge Master",
    description: "Added and subtracted fractions with unlike denominators.",
    icon: "forge",
    category: "subject",
    subject: "math",
    subjectScope: ["math"],
    gradeLevel: 5,
    learningTrack: "entering-5th",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "epic",
  }),
  badge({
    slug: "decimal-dash-champ",
    name: "Decimal Dash Champion",
    description: "Outpaced the timer on decimal operations.",
    icon: "lightning",
    category: "subject",
    subject: "math",
    subjectScope: ["math"],
    gradeLevel: 5,
    learningTrack: "entering-5th",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "rare",
  }),
  badge({
    slug: "evidence-detective",
    name: "Evidence Detective",
    description: "Cited text evidence to answer five inference questions.",
    icon: "magnifier",
    category: "subject",
    subject: "reading",
    subjectScope: ["reading"],
    gradeLevel: 5,
    learningTrack: "entering-5th",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "rare",
  }),
  badge({
    slug: "ecosystem-engineer",
    name: "Ecosystem Engineer",
    description: "Built a stable food web with producers, consumers, decomposers.",
    icon: "leaf-net",
    category: "subject",
    subject: "science",
    subjectScope: ["science"],
    gradeLevel: 5,
    learningTrack: "entering-5th",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "epic",
  }),
  badge({
    slug: "research-scholar",
    name: "Research Scholar",
    description: "Completed a short research project with cited sources.",
    icon: "scroll",
    category: "subject",
    subject: "writing",
    subjectScope: ["writing", "reading"],
    gradeLevel: 5,
    learningTrack: "entering-5th",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "rare",
  }),
  badge({
    slug: "debate-champion",
    name: "Debate Champion",
    description: "Won an evidence-based debate using primary sources.",
    icon: "gavel",
    category: "subject",
    subject: "history",
    subjectScope: ["history"],
    gradeLevel: 5,
    learningTrack: "entering-5th",
    requirements: { type: "subject-mastery", target: 80 },
    rarity: "epic",
  }),
];
