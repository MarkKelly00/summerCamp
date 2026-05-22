/**
 * Summer Camp 2026 — Curriculum seed runner.
 *
 * Idempotent. Safe to re-run after authoring edits to any file under
 * `lib/curriculum/2026/`.
 *
 * What it seeds:
 *   1. Mini-games   (by `slug`)
 *   2. Badges       (by `slug`)
 *   3. Rewards      (by `slug`)
 *   4. Lessons      (by `slug`) — both tracks, 8 weeks x 5 days each.
 *      Resolves `miniGameSlug` to a real `miniGameId` after the
 *      mini-games are seeded.
 *
 * What it does NOT touch:
 *   - User records (handled by 2026-01).
 *   - Progress records (preserves Addie's and Dean's 2025 work).
 *   - The 100 legacy lessons from the 2025 curriculum (their slugs do
 *     not collide with the new naming convention). To prune those,
 *     add an explicit `deleteLegacyLessons` flag in a follow-up.
 *
 * Usage:
 *   tsx scripts/seed-summer-2026.ts
 *   npm run seed:2026
 */

import "dotenv/config";

import { Types } from "mongoose";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../lib/db/mongoose";
import {
  Badge,
  Lesson,
  MiniGame,
  Reward,
  type ILesson,
} from "../lib/db/models";
import {
  BADGE_SEEDS,
  type BadgeSeed,
  MINI_GAME_SEEDS,
  type MiniGameSeed,
  REWARD_SEEDS,
  type RewardSeed,
  TRACK_WEEKS,
} from "../lib/curriculum/2026";
import type {
  LessonDefinition,
  WeekDefinition,
} from "../lib/curriculum/2026/shared/types";

interface Counter {
  created: number;
  updated: number;
  unchanged: number;
}

const counters = {
  miniGames: { created: 0, updated: 0, unchanged: 0 } as Counter,
  badges: { created: 0, updated: 0, unchanged: 0 } as Counter,
  rewards: { created: 0, updated: 0, unchanged: 0 } as Counter,
  lessons: { created: 0, updated: 0, unchanged: 0 } as Counter,
};

function report(label: string, c: Counter): void {
  console.log(
    `  ${label.padEnd(12)} created=${c.created}  updated=${c.updated}  unchanged=${c.unchanged}`,
  );
}

// ---------------------------------------------------------------------------
// Mini-games
// ---------------------------------------------------------------------------

async function seedMiniGames(): Promise<Map<string, Types.ObjectId>> {
  const slugToId = new Map<string, Types.ObjectId>();

  for (const seed of MINI_GAME_SEEDS) {
    const existing = await MiniGame.findOne({ slug: seed.slug });
    if (!existing) {
      const created = await MiniGame.create({ ...seed });
      slugToId.set(seed.slug, created._id as Types.ObjectId);
      counters.miniGames.created += 1;
      continue;
    }

    if (miniGameNeedsUpdate(existing.toObject() as unknown as Record<string, unknown>, seed)) {
      Object.assign(existing, seed);
      await existing.save();
      counters.miniGames.updated += 1;
    } else {
      counters.miniGames.unchanged += 1;
    }
    slugToId.set(seed.slug, existing._id as Types.ObjectId);
  }

  return slugToId;
}

function miniGameNeedsUpdate(
  existing: Record<string, unknown>,
  desired: MiniGameSeed,
): boolean {
  const fields: (keyof MiniGameSeed)[] = [
    "title",
    "type",
    "gradeLevel",
    "learningTrack",
    "subject",
    "active",
  ];
  for (const f of fields) {
    if (existing[f] !== desired[f]) return true;
  }
  if (JSON.stringify(existing.config) !== JSON.stringify(desired.config)) {
    return true;
  }
  if (
    JSON.stringify(existing.scoringRules) !==
    JSON.stringify(desired.scoringRules)
  ) {
    return true;
  }
  if (JSON.stringify(existing.skillTags) !== JSON.stringify(desired.skillTags)) {
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Badges
// ---------------------------------------------------------------------------

async function seedBadges(): Promise<void> {
  for (const seed of BADGE_SEEDS) {
    const existing = await Badge.findOne({ slug: seed.slug });
    if (!existing) {
      await Badge.create({ ...seed });
      counters.badges.created += 1;
      continue;
    }
    if (badgeNeedsUpdate(existing.toObject() as unknown as Record<string, unknown>, seed)) {
      Object.assign(existing, seed);
      await existing.save();
      counters.badges.updated += 1;
    } else {
      counters.badges.unchanged += 1;
    }
  }
}

function badgeNeedsUpdate(
  existing: Record<string, unknown>,
  desired: BadgeSeed,
): boolean {
  const fields: (keyof BadgeSeed)[] = [
    "name",
    "description",
    "icon",
    "category",
    "subject",
    "gradeLevel",
    "learningTrack",
    "funMoneyReward",
    "xpReward",
    "rarity",
    "active",
  ];
  for (const f of fields) {
    if (existing[f] !== desired[f]) return true;
  }
  if (
    JSON.stringify(existing.requirements) !==
    JSON.stringify(desired.requirements)
  ) {
    return true;
  }
  if (
    JSON.stringify(existing.subjectScope ?? []) !==
    JSON.stringify(desired.subjectScope ?? [])
  ) {
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// Rewards
// ---------------------------------------------------------------------------

async function seedRewards(): Promise<void> {
  for (const seed of REWARD_SEEDS) {
    const existing = await Reward.findOne({ slug: seed.slug });
    if (!existing) {
      await Reward.create({
        ...seed,
        // Maintain legacy isAvailable mirror at create time so the legacy
        // app's reads continue to work during transition.
        isAvailable: seed.active,
      });
      counters.rewards.created += 1;
      continue;
    }
    if (rewardNeedsUpdate(existing.toObject() as unknown as Record<string, unknown>, seed)) {
      existing.name = seed.name;
      existing.description = seed.description;
      existing.cost = seed.cost;
      existing.image = seed.image ?? existing.image;
      existing.category = seed.category;
      existing.requiresParentApproval = seed.requiresParentApproval;
      existing.approvalThreshold = seed.approvalThreshold;
      existing.active = seed.active;
      existing.isAvailable = seed.active;
      await existing.save();
      counters.rewards.updated += 1;
    } else {
      counters.rewards.unchanged += 1;
    }
  }
}

function rewardNeedsUpdate(
  existing: Record<string, unknown>,
  desired: RewardSeed,
): boolean {
  return (
    existing.name !== desired.name ||
    existing.description !== desired.description ||
    existing.cost !== desired.cost ||
    existing.category !== desired.category ||
    existing.requiresParentApproval !== desired.requiresParentApproval ||
    existing.approvalThreshold !== desired.approvalThreshold ||
    existing.active !== desired.active
  );
}

// ---------------------------------------------------------------------------
// Lessons
// ---------------------------------------------------------------------------

async function seedLessons(
  miniGameSlugToId: Map<string, Types.ObjectId>,
): Promise<void> {
  for (const [track, weeks] of Object.entries(TRACK_WEEKS)) {
    console.log(`\n[seed] track=${track} weeks=${(weeks as WeekDefinition[]).length}`);
    for (const week of weeks as WeekDefinition[]) {
      for (const def of week.lessons) {
        await upsertLesson(def, miniGameSlugToId);
      }
    }
  }
}

async function upsertLesson(
  def: LessonDefinition,
  miniGameSlugToId: Map<string, Types.ObjectId>,
): Promise<void> {
  const miniGameId = def.miniGameSlug
    ? miniGameSlugToId.get(def.miniGameSlug)
    : undefined;

  // Build the canonical doc we want the DB to hold.
  const desired: Partial<ILesson> = {
    title: def.title,
    questTitle: def.questTitle,
    subject: def.subject,
    gradeLevel: def.gradeLevel,
    learningTrack: def.learningTrack,
    week: def.week,
    day: def.day,
    estimatedTime: def.estimatedMinutes,
    estimatedMinutes: def.estimatedMinutes,
    isBonus: def.lessonType === "bonus",
    funMoneyReward: def.rewardPolicy.funMoney,
    difficulty: def.difficulty,
    slug: def.slug,
    lessonType: def.lessonType,
    standards: def.standards,
    skillTags: def.skillTags,
    miniGameId,
    rewardPolicy: def.rewardPolicy,
    content: {
      ...def.content,
      // Legacy compat: keep every required-by-legacy key defined as a string.
      mainContent: def.content.mainContent ?? "",
      activities: def.content.activities ?? [],
      funFacts: def.content.funFacts ?? [],
    },
    quiz: def.quiz,
  };

  const existing = await Lesson.findOne({ slug: def.slug });
  if (!existing) {
    await Lesson.create(desired);
    counters.lessons.created += 1;
    return;
  }

  if (lessonNeedsUpdate(existing.toObject() as unknown as Record<string, unknown>, desired)) {
    Object.assign(existing, desired);
    await existing.save();
    counters.lessons.updated += 1;
  } else {
    counters.lessons.unchanged += 1;
  }
}

/**
 * Canonical JSON for diff comparison.
 *
 * Strips Mongoose's array-default-of-[] and undefined keys so a freshly
 * read doc compares equal to its source-of-truth seed. Without this, a
 * second `seed:2026` reports every lesson as `updated` because Mongoose
 * fills `checkpoints: []` etc. when the seed simply omitted them.
 */
function canonical(value: unknown): string {
  const norm = (v: unknown): unknown => {
    if (v === undefined || v === null) return undefined;
    if (Array.isArray(v)) {
      const arr = v.map(norm).filter((x) => x !== undefined);
      return arr.length === 0 ? undefined : arr;
    }
    if (typeof v === "object") {
      const out: Record<string, unknown> = {};
      const obj = v as Record<string, unknown>;
      for (const key of Object.keys(obj).sort()) {
        if (key.startsWith("_")) continue; // _id, __v
        const n = norm(obj[key]);
        if (n !== undefined) out[key] = n;
      }
      return Object.keys(out).length === 0 ? undefined : out;
    }
    return v;
  };
  return JSON.stringify(norm(value) ?? null);
}

function lessonNeedsUpdate(
  existing: Record<string, unknown>,
  desired: Partial<ILesson>,
): boolean {
  const fields: (keyof ILesson)[] = [
    "title",
    "questTitle",
    "subject",
    "gradeLevel",
    "learningTrack",
    "week",
    "day",
    "estimatedTime",
    "estimatedMinutes",
    "isBonus",
    "funMoneyReward",
    "difficulty",
    "slug",
    "lessonType",
  ];
  for (const f of fields) {
    if (existing[f] !== desired[f]) return true;
  }
  // miniGameId: compare as strings.
  const ex = (existing.miniGameId as Types.ObjectId | undefined)?.toString() ?? null;
  const de = (desired.miniGameId as Types.ObjectId | undefined)?.toString() ?? null;
  if (ex !== de) return true;

  if (canonical(existing.standards) !== canonical(desired.standards)) return true;
  if (canonical(existing.skillTags) !== canonical(desired.skillTags)) return true;
  if (canonical(existing.rewardPolicy) !== canonical(desired.rewardPolicy)) return true;
  if (canonical(existing.content) !== canonical(desired.content)) return true;
  if (canonical(existing.quiz) !== canonical(desired.quiz)) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  console.log("[seed] Summer Camp 2026 curriculum seed");
  console.log("[seed] Connecting to MongoDB...");
  await connectToDatabase();
  console.log("[seed] Connected.\n");

  console.log("[seed] Mini-games...");
  const slugToId = await seedMiniGames();
  console.log("[seed] Badges...");
  await seedBadges();
  console.log("[seed] Rewards...");
  await seedRewards();
  console.log("[seed] Lessons...");
  await seedLessons(slugToId);

  console.log("\n[seed] Summary:");
  report("mini-games", counters.miniGames);
  report("badges", counters.badges);
  report("rewards", counters.rewards);
  report("lessons", counters.lessons);

  console.log("\n[seed] Seed complete.");
  await disconnectFromDatabase();
}

main().catch(async (err) => {
  console.error("[seed] FAILED:", err);
  await disconnectFromDatabase().catch(() => {
    // already disconnected
  });
  process.exit(1);
});
