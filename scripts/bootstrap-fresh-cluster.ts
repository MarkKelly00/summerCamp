/**
 * Bootstrap a fresh Atlas cluster with the three Kelly-family user
 * accounts (admin Mark + students Addie and Dean) and the Kelly Family
 * aggregate. Idempotent — re-running won't duplicate users.
 *
 * Use this when you stand up a new MongoDB cluster from scratch.
 * Existing-cluster setups should use `scripts/migrations/2026-01-add-parent-role.ts`
 * which finds existing users instead of creating them.
 *
 * Default passwords are easy on purpose so the kids can sign in
 * immediately. You should change them via Atlas / a future settings UI
 * before sharing the deployed app with anyone outside the family.
 *
 * Usage:
 *   tsx scripts/bootstrap-fresh-cluster.ts
 */

import "dotenv/config";

import {
  connectToDatabase,
  disconnectFromDatabase,
} from "../lib/db/mongoose";
import { Family, User } from "../lib/db/models";

interface SeedUser {
  username: string;
  password: string;
  role: "student" | "parent" | "admin";
  profile: {
    name: string;
    age: number;
    gradeLevel: number;
    learningTrack?: "entering-3rd" | "entering-5th";
  };
}

const SEED_USERS: SeedUser[] = [
  {
    username: "admin",
    password: "changeme123",
    role: "admin",
    profile: { name: "Mark Kelly", age: 40, gradeLevel: 12 },
  },
  {
    username: "addie",
    password: "addie123",
    role: "student",
    profile: {
      name: "Addie",
      age: 10,
      gradeLevel: 5,
      learningTrack: "entering-5th",
    },
  },
  {
    username: "dean",
    password: "dean123",
    role: "student",
    profile: {
      name: "Dean",
      age: 7,
      gradeLevel: 3,
      learningTrack: "entering-3rd",
    },
  },
];

async function main(): Promise<void> {
  console.log("[bootstrap] Connecting to MongoDB...");
  await connectToDatabase();
  console.log("[bootstrap] Connected.\n");

  // ----- Create users (idempotent) ----------------------------------------
  const createdUsers: { id: string; username: string; role: string }[] = [];
  for (const seed of SEED_USERS) {
    let user = await User.findOne({ username: seed.username });
    if (user) {
      console.log(
        `[bootstrap] User ${seed.username} already exists (${user.profile?.name})`,
      );
    } else {
      user = await User.create({
        username: seed.username,
        // Pre-save hook in User.ts hashes the password with bcrypt.
        password: seed.password,
        role: seed.role,
        profile: seed.profile,
      });
      console.log(
        `[bootstrap] Created ${seed.role}: ${seed.username} / ${seed.password} (${user.profile?.name})`,
      );
    }
    createdUsers.push({
      id: String(user._id),
      username: user.username,
      role: user.role,
    });
  }

  // ----- Create Kelly Family aggregate -----------------------------------
  const parents = createdUsers.filter(
    (u) => u.role === "admin" || u.role === "parent",
  );
  const students = createdUsers.filter((u) => u.role === "student");

  let family = await Family.findOne({ name: "Kelly Family" });
  if (!family) {
    family = await Family.create({
      name: "Kelly Family",
      parentIds: parents.map((p) => p.id),
      studentIds: students.map((s) => s.id),
    });
    console.log(
      `\n[bootstrap] Created Kelly Family (${parents.length} parent, ${students.length} students).`,
    );
  } else {
    const parentSet = new Set(family.parentIds.map((id) => id.toString()));
    const studentSet = new Set(family.studentIds.map((id) => id.toString()));
    for (const p of parents) {
      if (!parentSet.has(p.id)) family.parentIds.push(p.id as never);
    }
    for (const s of students) {
      if (!studentSet.has(s.id)) family.studentIds.push(s.id as never);
    }
    await family.save();
    console.log(
      `\n[bootstrap] Reconciled Kelly Family membership.`,
    );
  }

  // ----- Link familyId on each user --------------------------------------
  for (const u of createdUsers) {
    const updated = await User.findByIdAndUpdate(
      u.id,
      { $set: { familyId: family._id } },
      { new: true },
    );
    if (updated) {
      console.log(`[bootstrap] familyId linked on ${updated.username}`);
    }
  }

  console.log("\n[bootstrap] Bootstrap complete.");
  console.log("[bootstrap] Default credentials (change in production):");
  for (const seed of SEED_USERS) {
    console.log(`  ${seed.username.padEnd(8)} / ${seed.password}  (${seed.role})`);
  }

  await disconnectFromDatabase();
}

main().catch(async (err) => {
  console.error("[bootstrap] FAILED:", err);
  await disconnectFromDatabase().catch(() => {});
  process.exit(1);
});
