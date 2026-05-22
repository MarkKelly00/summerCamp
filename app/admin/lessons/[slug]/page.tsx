/**
 * Edit an existing lesson by slug.
 */

import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { Lesson, MiniGame } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";
import { LessonEditor } from "@/components/admin/LessonEditor";

export const dynamic = "force-dynamic";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  const { slug } = await params;
  await connectToDatabase();
  const lesson = await Lesson.findOne({ slug }).lean();
  if (!lesson) notFound();

  const [miniGames, currentMiniGame] = await Promise.all([
    MiniGame.find({ active: true })
      .select({ slug: 1, title: 1 })
      .lean(),
    lesson.miniGameId
      ? MiniGame.findById(lesson.miniGameId)
          .select({ slug: 1 })
          .lean()
      : Promise.resolve(null),
  ]);

  return (
    <AppShell
      identity={{
        line1: `Edit · ${lesson.slug ?? slug}`,
        line2: lesson.title,
      }}
      nav={[
        { href: "/admin/lessons", label: "Library" },
        { href: "/admin/rewards", label: "Rewards" },
      ]}
    >
      <LessonEditor
        mode="edit"
        initial={{
          slug: lesson.slug,
          title: lesson.title,
          questTitle: lesson.questTitle,
          subject: lesson.subject,
          gradeLevel: lesson.gradeLevel,
          learningTrack: lesson.learningTrack,
          week: lesson.week,
          day: lesson.day,
          lessonType: lesson.lessonType,
          difficulty: lesson.difficulty,
          estimatedMinutes:
            lesson.estimatedMinutes ?? lesson.estimatedTime ?? 30,
          skillTags: lesson.skillTags,
          standards: lesson.standards,
          content: {
            hook: lesson.content?.hook,
            storyContext: lesson.content?.storyContext,
            learningGoals: lesson.content?.learningGoals,
            instruction: lesson.content?.instruction,
            mainContent: lesson.content?.mainContent,
            examples: lesson.content?.examples,
            offlineActivity: lesson.content?.offlineActivity,
            creativeMission: lesson.content?.creativeMission,
            reflectionPrompt: lesson.content?.reflectionPrompt,
            funFacts: lesson.content?.funFacts,
          },
          quiz: lesson.quiz?.map((q) => ({
            question: q.question,
            type: q.type,
            options: q.options,
            correctAnswer: q.correctAnswer,
            explanation: q.explanation,
            points: q.points ?? 10,
            skillTag: q.skillTag,
          })) ?? [],
          rewardPolicy: lesson.rewardPolicy,
          miniGameSlug: currentMiniGame?.slug,
          published: lesson.published !== false,
        }}
        miniGames={miniGames.map((m) => ({ slug: m.slug, title: m.title }))}
      />
    </AppShell>
  );
}
