/**
 * Lesson play page — `/student/lesson/[slug]`.
 *
 * Server Component fetches the lesson by slug, hands it to the
 * LessonPlayer client component. proxy.ts enforces auth; this page
 * double-checks role.
 */

import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Lesson, MiniGame } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";
import { LessonPlayer } from "@/components/student/LessonPlayer";

export const dynamic = "force-dynamic";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { slug } = await params;
  await connectToDatabase();

  const lesson = await Lesson.findOne({ slug }).lean();
  if (!lesson) notFound();

  // Resolve mini-game slug if linked.
  let miniGameSlug: string | undefined;
  if (lesson.miniGameId) {
    const mg = await MiniGame.findById(lesson.miniGameId)
      .select({ slug: 1 })
      .lean();
    miniGameSlug = mg?.slug;
  }

  const lessonForPlayer = {
    id: String(lesson._id),
    slug: lesson.slug ?? slug,
    title: lesson.title,
    questTitle: lesson.questTitle,
    subject: lesson.subject,
    week: lesson.week,
    day: lesson.day,
    lessonType: lesson.lessonType,
    estimatedMinutes:
      lesson.estimatedMinutes ?? lesson.estimatedTime ?? 30,
    rewardPolicy: {
      xp: lesson.rewardPolicy?.xp ?? 10,
      funMoney: lesson.rewardPolicy?.funMoney ?? 10,
      masteryThreshold: lesson.rewardPolicy?.masteryThreshold ?? 70,
    },
    miniGameSlug,
    content: {
      hook: lesson.content?.hook ?? lesson.content?.introduction ?? "",
      storyContext: lesson.content?.storyContext,
      learningGoals: lesson.content?.learningGoals,
      instruction: lesson.content?.instruction,
      mainContent: lesson.content?.mainContent,
      examples: lesson.content?.examples,
      checkpoints: lesson.content?.checkpoints,
      activities: lesson.content?.activities,
      offlineActivity: lesson.content?.offlineActivity,
      creativeMission: lesson.content?.creativeMission,
      reflectionPrompt: lesson.content?.reflectionPrompt,
      funFacts: lesson.content?.funFacts,
    },
    quiz: (lesson.quiz ?? []).map((q) => ({
      question: q.question,
      type: q.type,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      points: q.points ?? 10,
      skillTag: q.skillTag,
    })),
  };

  return (
    <AppShell
      identity={{
        line1: lessonForPlayer.questTitle ?? lessonForPlayer.title,
        line2: `Week ${lessonForPlayer.week} · Day ${lessonForPlayer.day}`,
      }}
      nav={[{ href: "/student/dashboard", label: "Dashboard" }]}
    >
      <LessonPlayer lesson={lessonForPlayer} studentId={session.userId} />
    </AppShell>
  );
}
