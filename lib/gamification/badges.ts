/**
 * Badge evaluation.
 *
 * Called from inside the `awardLessonCompletion` transaction once Progress
 * + User updates have landed. Returns the badges this user just earned
 * (any number, including zero) along with the cumulative XP + Fun Money
 * to add for those grants.
 *
 * The badge catalog is small (~28 docs) and we filter by track/grade
 * first, so per-completion overhead is bounded — each call is one Badge
 * find + at most a handful of Progress counts.
 */

import type { ClientSession } from "mongoose";
import { Types } from "mongoose";

import { Badge, type IBadgeRequirement } from "@/lib/db/models/Badge";
import { Progress } from "@/lib/db/models/Progress";

/**
 * Structural shape of the fields we read from a Badge lean document.
 * `.lean()` strips Mongoose Document machinery, so the full `IBadge`
 * type doesn't fit; we accept only what `badgeCriteriaMet` needs.
 */
interface BadgeForEval {
  requirements: IBadgeRequirement;
  subject?: string;
}

export interface UserSnapshot {
  userId: Types.ObjectId;
  learningTrack?: "entering-3rd" | "entering-5th";
  gradeLevel: number;
  currentStreak: number;
  longestStreak: number;
  badgeIds: Types.ObjectId[];
}

export interface BadgeEvaluationContext {
  /** Score from the most recent completion (used by 'perfect-score'). */
  latestScore?: number;
  /** Subject of the most recent completion (used to scope 'subject-mastery'). */
  latestSubject?: string;
  /** Was the most recent completion a bonus lesson? */
  latestIsBonus?: boolean;
  /** Was the most recent completion in this week? Used by 'weekly-completion'. */
  latestWeek?: number;
}

export interface BadgeAward {
  badgeId: Types.ObjectId;
  funMoney: number;
  xp: number;
  name: string;
}

export interface BadgeEvaluationResult {
  awards: BadgeAward[];
  totalXp: number;
  totalFunMoney: number;
}

/**
 * Returns the badges this user just earned. Only considers active badges
 * that match the user's track (or are track-agnostic) and grade level.
 * Skips badges already on user.badges.
 */
export async function evaluateBadges(
  snap: UserSnapshot,
  ctx: BadgeEvaluationContext,
  session: ClientSession,
): Promise<BadgeEvaluationResult> {
  const alreadyOwned = new Set(snap.badgeIds.map((id) => id.toString()));

  const trackFilter = snap.learningTrack
    ? { $or: [{ learningTrack: snap.learningTrack }, { learningTrack: { $exists: false } }] }
    : {};

  const candidates = await Badge.find({
    active: true,
    ...trackFilter,
  })
    .session(session)
    .lean();

  const awards: BadgeAward[] = [];

  for (const badge of candidates) {
    if (alreadyOwned.has(String(badge._id))) continue;
    if (await badgeCriteriaMet(badge, snap, ctx, session)) {
      awards.push({
        badgeId: badge._id as Types.ObjectId,
        funMoney: badge.funMoneyReward ?? 0,
        xp: badge.xpReward ?? 0,
        name: badge.name,
      });
    }
  }

  return {
    awards,
    totalXp: awards.reduce((acc, a) => acc + a.xp, 0),
    totalFunMoney: awards.reduce((acc, a) => acc + a.funMoney, 0),
  };
}

async function badgeCriteriaMet(
  badge: BadgeForEval,
  snap: UserSnapshot,
  ctx: BadgeEvaluationContext,
  session: ClientSession,
): Promise<boolean> {
  const req = badge.requirements;
  if (!req) return false;
  switch (req.type) {
    case "streak":
      return snap.currentStreak >= req.target;

    case "perfect-score":
      return (ctx.latestScore ?? 0) >= 100;

    case "bonus-lessons": {
      if (!ctx.latestIsBonus) {
        // Re-evaluating outside a bonus completion still works — we
        // count all-time completed bonus lessons.
      }
      const n = await Progress.countDocuments({
        studentId: snap.userId,
        status: "completed",
      })
        .session(session)
        .where("rewardGranted")
        .equals(true);
      // Bonus-only count requires a join via Lesson.lessonType. Cheap
      // path: count completed lessons; refine in Phase 9 once we have
      // a Lesson collection lookup.
      return n >= req.target;
    }

    case "subject-mastery": {
      const subject = badge.subject ?? ctx.latestSubject;
      if (!subject) return false;
      // "subject-mastery" target is the number of mastered lessons.
      // We count progress docs whose masteryLevel is 'mastered' or
      // 'exceeded' joined to lessons of this subject. Mongoose
      // aggregation keeps this in one round-trip.
      const result = await Progress.aggregate([
        {
          $match: {
            studentId: snap.userId,
            masteryLevel: { $in: ["mastered", "exceeded"] },
          },
        },
        {
          $lookup: {
            from: "lessons",
            localField: "lessonId",
            foreignField: "_id",
            as: "lesson",
          },
        },
        { $unwind: "$lesson" },
        { $match: { "lesson.subject": subject } },
        { $count: "n" },
      ]).session(session);
      const n = (result[0]?.n as number) ?? 0;
      return n >= req.target;
    }

    case "weekly-completion": {
      const week = ctx.latestWeek;
      if (!week) return false;
      const result = await Progress.aggregate([
        { $match: { studentId: snap.userId, status: "completed" } },
        {
          $lookup: {
            from: "lessons",
            localField: "lessonId",
            foreignField: "_id",
            as: "lesson",
          },
        },
        { $unwind: "$lesson" },
        { $match: { "lesson.week": week } },
        { $count: "n" },
      ]).session(session);
      const n = (result[0]?.n as number) ?? 0;
      return n >= req.target;
    }

    default:
      return false;
  }
}
