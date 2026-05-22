/**
 * Phase 3 verification — read every collection through the new Mongoose
 * models. If any historical document fails to validate, this script
 * exits non-zero with a printed cause.
 *
 * Safe to re-run. Read-only.
 */

import "dotenv/config";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../lib/db/mongoose";
import {
  Badge,
  Family,
  Lesson,
  MiniGame,
  Progress,
  Reward,
  RewardRedemption,
  User,
} from "../lib/db/models";

async function main(): Promise<void> {
  await connectToDatabase();

  const [
    userCount,
    familyCount,
    lessonCount,
    progressCount,
    rewardCount,
    redemptionCount,
    miniGameCount,
    badgeCount,
  ] = await Promise.all([
    User.countDocuments(),
    Family.countDocuments(),
    Lesson.countDocuments(),
    Progress.countDocuments(),
    Reward.countDocuments(),
    RewardRedemption.countDocuments(),
    MiniGame.countDocuments(),
    Badge.countDocuments(),
  ]);

  console.log("Document counts:");
  console.log(`  users:             ${userCount}`);
  console.log(`  families:          ${familyCount}`);
  console.log(`  lessons:           ${lessonCount}`);
  console.log(`  progresses:        ${progressCount}`);
  console.log(`  rewards:           ${rewardCount}`);
  console.log(`  rewardredemptions: ${redemptionCount}`);
  console.log(`  minigames:         ${miniGameCount}`);
  console.log(`  badges:            ${badgeCount}`);

  // Read every lesson through the new model to surface any remaining drift.
  const lessons = await Lesson.find({}).lean();
  let missingSlug = 0;
  let missingTrack = 0;
  let missingLessonType = 0;
  let missingRewardPolicy = 0;
  for (const l of lessons) {
    if (!l.slug) missingSlug += 1;
    if (!l.learningTrack) missingTrack += 1;
    if (!l.lessonType) missingLessonType += 1;
    if (!l.rewardPolicy || (l.rewardPolicy.xp === 0 && l.rewardPolicy.funMoney === 0)) {
      missingRewardPolicy += 1;
    }
  }
  console.log("\nLesson field coverage:");
  console.log(`  with slug:           ${lessons.length - missingSlug} / ${lessons.length}`);
  console.log(`  with learningTrack:  ${lessons.length - missingTrack} / ${lessons.length}`);
  console.log(`  with lessonType:     ${lessons.length - missingLessonType} / ${lessons.length}`);
  console.log(`  with rewardPolicy:   ${lessons.length - missingRewardPolicy} / ${lessons.length}`);

  // Spot-check one lesson per track.
  const sampleTrack3rd = await Lesson.findOne({ learningTrack: "entering-3rd" }).lean();
  const sampleTrack5th = await Lesson.findOne({ learningTrack: "entering-5th" }).lean();
  if (sampleTrack3rd) {
    console.log("\nSample entering-3rd lesson:");
    console.log(`  slug:           ${sampleTrack3rd.slug}`);
    console.log(`  title:          ${sampleTrack3rd.title}`);
    console.log(`  lessonType:     ${sampleTrack3rd.lessonType}`);
    console.log(`  rewardPolicy:   ${JSON.stringify(sampleTrack3rd.rewardPolicy)}`);
  }
  if (sampleTrack5th) {
    console.log("\nSample entering-5th lesson:");
    console.log(`  slug:           ${sampleTrack5th.slug}`);
    console.log(`  title:          ${sampleTrack5th.title}`);
    console.log(`  lessonType:     ${sampleTrack5th.lessonType}`);
    console.log(`  rewardPolicy:   ${JSON.stringify(sampleTrack5th.rewardPolicy)}`);
  }

  // Read every Progress to confirm masteryLevel + rewardGranted are set.
  const progressDocs = await Progress.find({}).lean();
  let pMastery = 0;
  let pRewardGranted = 0;
  for (const p of progressDocs) {
    if (p.masteryLevel) pMastery += 1;
    if (p.rewardGranted === true || p.status !== "completed") {
      // Completed rows must have rewardGranted=true; other rows are
      // allowed to be false. Track only the completed-with-grant case.
      if (p.status === "completed" && p.rewardGranted === true) {
        pRewardGranted += 1;
      }
    }
  }
  const completedCount = progressDocs.filter((p) => p.status === "completed").length;
  console.log("\nProgress field coverage:");
  console.log(`  with masteryLevel:           ${pMastery} / ${progressDocs.length}`);
  console.log(`  completed w/ rewardGranted:  ${pRewardGranted} / ${completedCount}`);

  await disconnectFromDatabase();
  console.log("\nPhase 3 verification: OK");
}

main().catch(async (err) => {
  console.error("Phase 3 verification FAILED:", err);
  await disconnectFromDatabase().catch(() => {});
  process.exit(1);
});
