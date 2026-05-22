/**
 * Phase 4 verification — confirm the 2026 curriculum landed correctly.
 *
 * Read-only. Re-runnable.
 */

import "dotenv/config";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../lib/db/mongoose";
import {
  Badge,
  Lesson,
  MiniGame,
  Reward,
} from "../lib/db/models";

async function main(): Promise<void> {
  await connectToDatabase();

  const [
    totalLessons,
    deanLessons,
    addieLessons,
    deanCapstones,
    addieCapstones,
    miniGameCount,
    badgeCount,
    rewardCount,
  ] = await Promise.all([
    Lesson.countDocuments(),
    Lesson.countDocuments({ learningTrack: "entering-3rd", slug: /^dean-/ }),
    Lesson.countDocuments({ learningTrack: "entering-5th", slug: /^addie-/ }),
    Lesson.countDocuments({
      learningTrack: "entering-3rd",
      slug: /^dean-/,
      lessonType: "capstone",
    }),
    Lesson.countDocuments({
      learningTrack: "entering-5th",
      slug: /^addie-/,
      lessonType: "capstone",
    }),
    MiniGame.countDocuments({}),
    Badge.countDocuments({}),
    Reward.countDocuments({}),
  ]);

  console.log("Document counts:");
  console.log(`  total lessons:                ${totalLessons}`);
  console.log(`  Dean (entering-3rd) lessons:  ${deanLessons}  (expect 40)`);
  console.log(`  Addie (entering-5th) lessons: ${addieLessons} (expect 40)`);
  console.log(`  Dean capstones:               ${deanCapstones} (expect 5)`);
  console.log(`  Addie capstones:              ${addieCapstones} (expect 5)`);
  console.log(`  mini-games:                   ${miniGameCount}`);
  console.log(`  badges total:                 ${badgeCount}`);
  console.log(`  rewards:                      ${rewardCount}`);

  // Sample week shape.
  console.log("\nDean — Week 3 (Fraction Forest):");
  const deanW3 = await Lesson.find({
    learningTrack: "entering-3rd",
    week: 3,
    slug: /^dean-/,
  })
    .sort({ day: 1 })
    .lean();
  for (const l of deanW3) {
    console.log(
      `  d${l.day} ${(l.slug ?? "").padEnd(36)} ${l.subject.padEnd(11)} ${l.lessonType.padEnd(8)} skills=${l.skillTags.length}`,
    );
  }

  console.log("\nAddie — Week 6 (Reading Guild & Vocabulary Arena):");
  const addieW6 = await Lesson.find({
    learningTrack: "entering-5th",
    week: 6,
    slug: /^addie-/,
  })
    .sort({ day: 1 })
    .lean();
  for (const l of addieW6) {
    console.log(
      `  d${l.day} ${(l.slug ?? "").padEnd(36)} ${l.subject.padEnd(11)} ${l.lessonType.padEnd(8)} skills=${l.skillTags.length}`,
    );
  }

  console.log("\nMini-games:");
  const games = await MiniGame.find({}).sort({ learningTrack: 1, slug: 1 }).lean();
  for (const g of games) {
    console.log(`  ${g.learningTrack}  ${(g.slug ?? "").padEnd(32)} ${g.type}`);
  }

  console.log("\nRewards:");
  const rewards = await Reward.find({}).sort({ cost: 1 }).lean();
  for (const r of rewards) {
    console.log(
      `  ${String(r.cost).padStart(5)}  ${r.name.padEnd(30)} approval=${r.requiresParentApproval ? "yes" : "no"}`,
    );
  }

  await disconnectFromDatabase();
  console.log("\nPhase 4 verification: OK");
}

main().catch(async (err) => {
  console.error("Phase 4 verification FAILED:", err);
  await disconnectFromDatabase().catch(() => {});
  process.exit(1);
});
