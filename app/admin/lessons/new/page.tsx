/**
 * Create a new lesson. Hands an empty editor to LessonEditor in
 * "create" mode; on save it redirects to the slug-based edit page.
 */

import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { MiniGame } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";
import { LessonEditor } from "@/components/admin/LessonEditor";

export const dynamic = "force-dynamic";

export default async function NewLessonPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "admin") redirect("/parent/dashboard");

  await connectToDatabase();
  const miniGames = await MiniGame.find({ active: true })
    .select({ slug: 1, title: 1 })
    .lean();

  return (
    <AppShell
      identity={{
        line1: "New lesson",
        line2: "Save as draft, polish, then publish",
      }}
      nav={[
        { href: "/admin/lessons", label: "Library" },
        { href: "/admin/rewards", label: "Rewards" },
      ]}
    >
      <LessonEditor
        mode="create"
        initial={{}}
        miniGames={miniGames.map((m) => ({ slug: m.slug, title: m.title }))}
      />
    </AppShell>
  );
}
