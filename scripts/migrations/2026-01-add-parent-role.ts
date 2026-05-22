/**
 * Migration 2026-01 — Family + role + learningTrack backfill.
 *
 * Idempotent. Safe to re-run.
 *
 * What it does:
 *   1. Connects to MongoDB.
 *   2. Finds existing admin and student users (the legacy schema permits
 *      only these two roles).
 *   3. Backfills profile.learningTrack on students from their gradeLevel
 *      if missing (entering-3rd for grade <= 3, entering-5th for grade >= 4).
 *   4. Creates (or updates) the "Kelly Family" Family aggregate, linking
 *      the admin as a parent and all students as students.
 *   5. Backfills familyId on each linked user if missing.
 *
 * What it does NOT do:
 *   - Touch Progress, Lesson, Badge, Reward, or Redemption documents.
 *   - Change anyone's password.
 *   - Demote anyone's role. (Admin stays admin; admin has all parent powers.)
 *   - Hard-delete anything.
 *
 * Usage:
 *   npm run migrate -- 2026-01     # via the migrations runner (added later)
 *   tsx scripts/migrations/2026-01-add-parent-role.ts   # direct
 */

import "dotenv/config";

import { connectToDatabase, disconnectFromDatabase } from "../../lib/db/mongoose";
import { Family } from "../../lib/db/models/Family";
import { User } from "../../lib/db/models/User";

function trackForGrade(grade: number | undefined): "entering-3rd" | "entering-5th" {
  return (grade ?? 0) >= 4 ? "entering-5th" : "entering-3rd";
}

async function main(): Promise<void> {
  console.log("[2026-01] Connecting to MongoDB...");
  await connectToDatabase();
  console.log("[2026-01] Connected.\n");

  // ------------------------------------------------------------------
  // Step 1: Find the admin (Mark).
  // ------------------------------------------------------------------
  const admin = await User.findOne({ role: "admin" }).exec();
  if (!admin) {
    console.log(
      "[2026-01] No admin user found. Nothing to migrate. If you intended to seed the family from scratch, run the (future) seed script instead.",
    );
    await disconnectFromDatabase();
    return;
  }
  console.log(
    `[2026-01] Admin: ${admin.username} (${admin.profile?.name ?? "no name"})`,
  );

  // ------------------------------------------------------------------
  // Step 2: Find students. Sort oldest first so we can label them
  // predictably in logs.
  // ------------------------------------------------------------------
  const students = await User.find({ role: "student" })
    .sort({ "profile.age": -1 })
    .exec();
  console.log(`[2026-01] Students found: ${students.length}`);
  for (const s of students) {
    console.log(
      `   - ${s.username} (${s.profile?.name ?? "no name"}, age ${s.profile?.age ?? "?"}, grade ${s.profile?.gradeLevel ?? "?"})`,
    );
  }

  // ------------------------------------------------------------------
  // Step 3: Backfill learningTrack on students.
  // ------------------------------------------------------------------
  let trackBackfills = 0;
  for (const s of students) {
    if (!s.profile.learningTrack) {
      const track = trackForGrade(s.profile?.gradeLevel);
      s.profile.learningTrack = track;
      await s.save();
      trackBackfills += 1;
      console.log(
        `[2026-01] learningTrack=${track} -> ${s.username}`,
      );
    }
  }
  if (trackBackfills === 0) {
    console.log("[2026-01] learningTrack already set on every student.");
  }

  // ------------------------------------------------------------------
  // Step 4: Create or update the Kelly Family record.
  // ------------------------------------------------------------------
  let family = await Family.findOne({ name: "Kelly Family" }).exec();
  if (!family) {
    family = await Family.create({
      name: "Kelly Family",
      parentIds: [admin._id],
      studentIds: students.map((s) => s._id),
    });
    console.log(
      `\n[2026-01] Created Kelly Family with 1 parent and ${students.length} student(s).`,
    );
  } else {
    const parentSet = new Set(family.parentIds.map((id) => id.toString()));
    if (!parentSet.has(admin._id.toString())) {
      family.parentIds.push(admin._id);
    }
    const studentSet = new Set(family.studentIds.map((id) => id.toString()));
    for (const s of students) {
      if (!studentSet.has(s._id.toString())) {
        family.studentIds.push(s._id);
      }
    }
    await family.save();
    console.log(
      `\n[2026-01] Kelly Family membership reconciled (parents=${family.parentIds.length}, students=${family.studentIds.length}).`,
    );
  }

  // ------------------------------------------------------------------
  // Step 5: Link familyId onto each member.
  // ------------------------------------------------------------------
  let familyLinks = 0;
  if (!admin.familyId) {
    admin.familyId = family._id;
    await admin.save();
    familyLinks += 1;
    console.log(`[2026-01] familyId -> ${admin.username}`);
  }
  for (const s of students) {
    if (!s.familyId) {
      s.familyId = family._id;
      await s.save();
      familyLinks += 1;
      console.log(`[2026-01] familyId -> ${s.username}`);
    }
  }
  if (familyLinks === 0) {
    console.log("[2026-01] familyId already linked on every member.");
  }

  console.log("\n[2026-01] Migration complete.");
  await disconnectFromDatabase();
}

main().catch(async (err) => {
  console.error("[2026-01] FAILED:", err);
  await disconnectFromDatabase().catch(() => {
    // Already disconnected or never connected. Nothing actionable.
  });
  process.exit(1);
});
