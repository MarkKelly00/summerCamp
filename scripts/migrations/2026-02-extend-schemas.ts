/**
 * Migration 2026-02 — Schema extension backfills + legacy data normalization.
 *
 * Idempotent. Safe to re-run.
 *
 * Uses the raw MongoDB driver (Mongoose's `.collection.*` methods) so it
 * can fix documents that don't currently conform to any schema — for
 * example legacy lessons where `content` was saved as a markdown string
 * rather than the declared sub-document, or quiz items missing the
 * required `type` field. Mongoose validation would refuse to load those
 * rows; raw $set updates do not validate.
 *
 * What it does:
 *   1. Lessons:
 *      - Normalize `content` from string → { introduction, mainContent,
 *        activities, funFacts } when needed.
 *      - Infer `quiz[i].type` from shape when missing.
 *      - Backfill slug, learningTrack, lessonType, estimatedMinutes,
 *        rewardPolicy, standards[], skillTags[].
 *   2. Progress:
 *      - Backfill masteryLevel from score.
 *      - Backfill earnedFunMoney from User.completedLessons.
 *      - Default earnedXp to 0.
 *      - Lock rewardGranted=true on completed historical rows
 *        (idempotency anchor for Phase 6).
 *   3. Rewards:
 *      - Backfill slug, active (mirror isAvailable), category,
 *        requiresParentApproval (default false to preserve legacy
 *        auto-redeem behavior).
 *   4. RewardRedemptions:
 *      - Backfill status from `redeemed` (true → fulfilled, false →
 *        approved for historical rows).
 *      - Backfill costAtRedemption from cost.
 *   5. Badges:
 *      - Backfill slug, xpReward, active.
 *
 * What it does NOT do:
 *   - Touch any document where all relevant fields are already set.
 *   - Modify any user record (handled by 2026-01).
 *   - Delete or rename anything.
 *
 * Usage:
 *   tsx scripts/migrations/2026-02-extend-schemas.ts
 */

import "dotenv/config";

import mongoose from "mongoose";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../../lib/db/mongoose";

interface Counter {
  scanned: number;
  updated: number;
}
interface MigrationCounters {
  lessons: Counter;
  progress: Counter;
  rewards: Counter;
  redemptions: Counter;
  badges: Counter;
}

const counters: MigrationCounters = {
  lessons: { scanned: 0, updated: 0 },
  progress: { scanned: 0, updated: 0 },
  rewards: { scanned: 0, updated: 0 },
  redemptions: { scanned: 0, updated: 0 },
  badges: { scanned: 0, updated: 0 },
};

const NORMALIZED_FIX_LOG: string[] = [];

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function trackForGrade(grade: number | undefined): "entering-3rd" | "entering-5th" {
  return (grade ?? 0) >= 4 ? "entering-5th" : "entering-3rd";
}

function masteryLevelForScore(
  score: number | undefined,
  status: string | undefined,
): string {
  if (status === "not-started" || status == null) return "not-started";
  if (status === "in-progress") return "in-progress";
  const s = score ?? 0;
  if (s >= 95) return "exceeded";
  if (s >= 80) return "mastered";
  return "practicing";
}

function inferQuizType(q: Record<string, unknown>): string {
  const options = Array.isArray(q.options) ? (q.options as unknown[]) : [];
  if (options.length === 2) {
    const lower = options.map((o) => String(o).toLowerCase().trim());
    if (lower.includes("true") && lower.includes("false")) {
      return "true-false";
    }
  }
  if (options.length > 0) {
    return "multiple-choice";
  }
  // No options: prefer fill-blank if there's a single short correct
  // answer; else short-answer.
  const correct = q.correctAnswer;
  if (typeof correct === "string" && correct.length <= 30) {
    return "fill-blank";
  }
  return "short-answer";
}

// --- Lessons ---------------------------------------------------------------

async function migrateLessons(): Promise<void> {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Mongo connection not ready.");
  const coll = db.collection("lessons");

  const cursor = coll.find({});
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;
    counters.lessons.scanned += 1;

    const updates: Record<string, unknown> = {};

    // -- content normalization -------------------------------------------
    if (typeof doc.content === "string") {
      updates.content = {
        introduction: "",
        mainContent: doc.content,
        activities: [],
        funFacts: [],
      };
      NORMALIZED_FIX_LOG.push(
        `lesson ${doc._id?.toString?.()} (${doc.title}): content was a string, wrapped into object`,
      );
    } else if (doc.content == null) {
      updates.content = {
        introduction: "",
        mainContent: "",
        activities: [],
        funFacts: [],
      };
    } else if (typeof doc.content === "object") {
      const content = doc.content as Record<string, unknown>;
      // Fill any missing required-by-new-schema sub-fields.
      const contentPatch: Record<string, unknown> = {};
      if (content.introduction == null) contentPatch.introduction = "";
      if (content.mainContent == null) contentPatch.mainContent = "";
      if (!Array.isArray(content.activities)) contentPatch.activities = [];
      if (Object.keys(contentPatch).length > 0) {
        updates.content = { ...content, ...contentPatch };
      }
    }

    // -- quiz[i].type inference ------------------------------------------
    if (Array.isArray(doc.quiz)) {
      let changed = false;
      const fixedQuiz = (doc.quiz as Record<string, unknown>[]).map((q) => {
        if (q.type) return q;
        changed = true;
        const inferredType = inferQuizType(q);
        NORMALIZED_FIX_LOG.push(
          `lesson ${doc._id?.toString?.()} quiz item missing type → inferred "${inferredType}"`,
        );
        return { ...q, type: inferredType };
      });
      if (changed) {
        updates.quiz = fixedQuiz;
      }
    }

    // -- New 2026 fields --------------------------------------------------
    if (!doc.slug) {
      updates.slug = `${doc.subject}-g${doc.gradeLevel}-w${doc.week}-d${doc.day}`;
    }
    if (!doc.learningTrack) {
      updates.learningTrack = trackForGrade(doc.gradeLevel as number);
    }
    if (!doc.lessonType) {
      updates.lessonType = doc.isBonus ? "bonus" : "core";
    }
    if (!doc.estimatedMinutes && doc.estimatedTime) {
      updates.estimatedMinutes = doc.estimatedTime;
    }

    const rp = doc.rewardPolicy as Record<string, number> | undefined;
    if (!rp || (rp.xp === 0 && rp.funMoney === 0)) {
      const base = (doc.funMoneyReward as number | undefined) ?? 10;
      updates.rewardPolicy = {
        xp: base,
        funMoney: base,
        masteryThreshold: 70,
        allowReplayPracticeXp: true,
      };
    }

    if (!Array.isArray(doc.standards)) updates.standards = [];
    if (!Array.isArray(doc.skillTags)) updates.skillTags = [];

    if (Object.keys(updates).length > 0) {
      await coll.updateOne({ _id: doc._id }, { $set: updates });
      counters.lessons.updated += 1;
    }
  }
}

// --- Progress --------------------------------------------------------------

async function migrateProgress(): Promise<void> {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Mongo connection not ready.");

  // Build lookup of (userId, lessonId) → funMoneyEarned from legacy
  // User.completedLessons so we can backfill Progress.earnedFunMoney.
  const fundedLookup = new Map<string, number>();
  const usersCursor = db.collection("users").find(
    { completedLessons: { $exists: true, $ne: [] } },
    { projection: { _id: 1, completedLessons: 1 } },
  );
  while (await usersCursor.hasNext()) {
    const u = await usersCursor.next();
    if (!u) continue;
    const completed = Array.isArray(u.completedLessons)
      ? (u.completedLessons as Record<string, unknown>[])
      : [];
    for (const cl of completed) {
      if (!cl.lessonId) continue;
      const key = `${u._id?.toString?.()}::${String(cl.lessonId)}`;
      const earned = Number(cl.funMoneyEarned ?? 0);
      fundedLookup.set(key, (fundedLookup.get(key) ?? 0) + earned);
    }
  }

  const coll = db.collection("progresses");
  const cursor = coll.find({});
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;
    counters.progress.scanned += 1;

    const updates: Record<string, unknown> = {};

    const derivedMastery = masteryLevelForScore(
      doc.score as number | undefined,
      doc.status as string | undefined,
    );
    if (
      doc.masteryLevel == null ||
      // Backfill if currently the default "not-started" but the row is
      // actually completed/in-progress.
      (doc.masteryLevel === "not-started" && derivedMastery !== "not-started")
    ) {
      updates.masteryLevel = derivedMastery;
    }

    if (doc.earnedFunMoney == null) {
      const key = `${doc.studentId?.toString?.()}::${doc.lessonId?.toString?.()}`;
      updates.earnedFunMoney = fundedLookup.get(key) ?? 0;
    } else if (doc.earnedFunMoney === 0) {
      const key = `${doc.studentId?.toString?.()}::${doc.lessonId?.toString?.()}`;
      const funded = fundedLookup.get(key);
      if (funded && funded > 0) {
        updates.earnedFunMoney = funded;
      }
    }

    if (doc.earnedXp == null) updates.earnedXp = 0;

    if (doc.status === "completed" && doc.rewardGranted !== true) {
      updates.rewardGranted = true;
    }
    if (doc.status !== "completed" && doc.rewardGranted == null) {
      updates.rewardGranted = false;
    }

    if (Object.keys(updates).length > 0) {
      await coll.updateOne({ _id: doc._id }, { $set: updates });
      counters.progress.updated += 1;
    }
  }
}

// --- Rewards ---------------------------------------------------------------

async function migrateRewards(): Promise<void> {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Mongo connection not ready.");
  const coll = db.collection("rewards");

  const cursor = coll.find({});
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;
    counters.rewards.scanned += 1;

    const updates: Record<string, unknown> = {};

    if (!doc.slug) {
      updates.slug = slugify(String(doc.name ?? ""));
    }
    if (doc.active == null) {
      updates.active = doc.isAvailable !== false;
    } else if (doc.active !== doc.isAvailable) {
      updates.isAvailable = doc.active;
    }
    if (!doc.category) {
      updates.category = "custom";
    }
    if (doc.requiresParentApproval == null) {
      // Preserve legacy auto-redeem behavior; Mark flips per reward via
      // admin UI in Phase 8.
      updates.requiresParentApproval = false;
    }

    if (Object.keys(updates).length > 0) {
      await coll.updateOne({ _id: doc._id }, { $set: updates });
      counters.rewards.updated += 1;
    }
  }
}

// --- RewardRedemptions ----------------------------------------------------

async function migrateRedemptions(): Promise<void> {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Mongo connection not ready.");
  const coll = db.collection("rewardredemptions");

  const cursor = coll.find({});
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;
    counters.redemptions.scanned += 1;

    const updates: Record<string, unknown> = {};

    if (!doc.status) {
      updates.status = doc.redeemed === true ? "fulfilled" : "approved";
    }
    if (doc.costAtRedemption == null) {
      updates.costAtRedemption = doc.cost ?? 0;
    }

    if (Object.keys(updates).length > 0) {
      await coll.updateOne({ _id: doc._id }, { $set: updates });
      counters.redemptions.updated += 1;
    }
  }
}

// --- Badges ----------------------------------------------------------------

async function migrateBadges(): Promise<void> {
  const db = mongoose.connection.db;
  if (!db) throw new Error("Mongo connection not ready.");
  const coll = db.collection("badges");

  const cursor = coll.find({});
  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    if (!doc) continue;
    counters.badges.scanned += 1;

    const updates: Record<string, unknown> = {};

    if (!doc.slug) {
      updates.slug = slugify(String(doc.name ?? ""));
    }
    if (doc.active == null) updates.active = true;
    if (doc.xpReward == null) updates.xpReward = 100;
    if (!Array.isArray(doc.subjectScope)) updates.subjectScope = [];

    if (Object.keys(updates).length > 0) {
      await coll.updateOne({ _id: doc._id }, { $set: updates });
      counters.badges.updated += 1;
    }
  }
}

function report(label: string, c: Counter): void {
  console.log(
    `[2026-02] ${label}: scanned=${c.scanned}, updated=${c.updated}, unchanged=${c.scanned - c.updated}`,
  );
}

async function main(): Promise<void> {
  console.log("[2026-02] Connecting to MongoDB...");
  await connectToDatabase();
  console.log("[2026-02] Connected.\n");

  await migrateLessons();
  await migrateProgress();
  await migrateRewards();
  await migrateRedemptions();
  await migrateBadges();

  console.log("");
  report("Lessons     ", counters.lessons);
  report("Progress    ", counters.progress);
  report("Rewards     ", counters.rewards);
  report("Redemptions ", counters.redemptions);
  report("Badges      ", counters.badges);

  if (NORMALIZED_FIX_LOG.length > 0) {
    console.log("\n[2026-02] Legacy data normalizations:");
    for (const line of NORMALIZED_FIX_LOG.slice(0, 25)) {
      console.log(`   - ${line}`);
    }
    if (NORMALIZED_FIX_LOG.length > 25) {
      console.log(`   …and ${NORMALIZED_FIX_LOG.length - 25} more.`);
    }
  }

  console.log("\n[2026-02] Migration complete.");
  await disconnectFromDatabase();
}

main().catch(async (err) => {
  console.error("[2026-02] FAILED:", err);
  await disconnectFromDatabase().catch(() => {
    // already disconnected
  });
  process.exit(1);
});
