"use server";

/**
 * Admin lesson Server Actions.
 *
 * All actions require an authenticated admin. They use the same
 * LessonUpsertSchema as the seed script so the form, the seed, and the
 * future JSON import all share one validator.
 */

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Lesson, MiniGame } from "@/lib/db/models";
import {
  LessonUpsertSchema,
  type LessonUpsertInput,
} from "@/lib/schemas/lesson";

export interface AdminLessonState {
  ok: boolean;
  error?: string;
  slug?: string;
  fieldErrors?: Record<string, string>;
}

async function requireAdmin(): Promise<
  { ok: true; userId: string } | { ok: false; state: AdminLessonState }
> {
  const session = await getSession();
  if (!session)
    return { ok: false, state: { ok: false, error: "Not signed in." } };
  if (session.role !== "admin")
    return {
      ok: false,
      state: { ok: false, error: "Admin role required." },
    };
  return { ok: true, userId: session.userId };
}

export async function upsertLesson(
  input: LessonUpsertInput & { published?: boolean },
): Promise<AdminLessonState> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.state;

  const parsed = LessonUpsertSchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_root";
      fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Validation failed.", fieldErrors };
  }

  await connectToDatabase();

  // Resolve mini-game slug → ObjectId, if provided.
  let miniGameId: Types.ObjectId | undefined;
  if (parsed.data.miniGameSlug) {
    const mg = await MiniGame.findOne({ slug: parsed.data.miniGameSlug })
      .select({ _id: 1 })
      .lean();
    if (!mg) {
      return {
        ok: false,
        error: `Mini-game with slug "${parsed.data.miniGameSlug}" not found.`,
      };
    }
    miniGameId = mg._id as Types.ObjectId;
  }

  const update = {
    title: parsed.data.title,
    questTitle: parsed.data.questTitle,
    subject: parsed.data.subject,
    gradeLevel: parsed.data.gradeLevel,
    learningTrack: parsed.data.learningTrack,
    week: parsed.data.week,
    day: parsed.data.day,
    lessonType: parsed.data.lessonType,
    isBonus: parsed.data.lessonType === "bonus",
    difficulty: parsed.data.difficulty,
    estimatedMinutes: parsed.data.estimatedMinutes,
    estimatedTime: parsed.data.estimatedMinutes,
    standards: parsed.data.standards,
    skillTags: parsed.data.skillTags,
    content: parsed.data.content,
    quiz: parsed.data.quiz,
    rewardPolicy: parsed.data.rewardPolicy,
    funMoneyReward: parsed.data.rewardPolicy.funMoney,
    miniGameId,
    published: input.published ?? false, // new lessons default to draft
  };

  const existing = await Lesson.findOne({ slug: parsed.data.slug });
  if (existing) {
    Object.assign(existing, update);
    // Keep existing published state unless the caller explicitly set it.
    if (input.published !== undefined) existing.published = input.published;
    await existing.save();
  } else {
    await Lesson.create({ ...update, slug: parsed.data.slug });
  }

  revalidatePath("/admin/lessons");
  revalidatePath(`/admin/lessons/${parsed.data.slug}`);
  revalidatePath("/student/dashboard");

  return { ok: true, slug: parsed.data.slug };
}

export async function setLessonPublished(
  slug: string,
  published: boolean,
): Promise<AdminLessonState> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.state;

  await connectToDatabase();
  const lesson = await Lesson.findOne({ slug });
  if (!lesson) return { ok: false, error: "Lesson not found." };
  lesson.published = published;
  await lesson.save();

  revalidatePath("/admin/lessons");
  revalidatePath("/student/dashboard");

  return { ok: true, slug };
}

export async function deleteLesson(slug: string): Promise<AdminLessonState> {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.state;

  await connectToDatabase();
  const lesson = await Lesson.findOne({ slug });
  if (!lesson) return { ok: false, error: "Lesson not found." };

  // Hard delete is acceptable here — Mark explicitly requested. Progress
  // docs that reference this lessonId remain (kid's history is preserved).
  await Lesson.deleteOne({ _id: lesson._id });

  revalidatePath("/admin/lessons");
  revalidatePath("/student/dashboard");

  return { ok: true, slug };
}
