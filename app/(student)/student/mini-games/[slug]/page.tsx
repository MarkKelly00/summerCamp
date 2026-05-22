/**
 * Mini-game play page — `/student/mini-games/[slug]`.
 *
 * Wraps the MiniGameShell in AppShell so the kid has consistent
 * navigation (back to trail, back to game list) + theme/SFX toggles.
 */

import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { MiniGame } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";
import { MiniGameShell } from "@/components/games/engine/MiniGameShell";

export const dynamic = "force-dynamic";

export default async function MiniGamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { slug } = await params;
  await connectToDatabase();

  const game = await MiniGame.findOne({ slug, active: true }).lean();
  if (!game) notFound();

  const miniGame = {
    _id: String(game._id),
    slug: game.slug,
    title: game.title,
    type: game.type,
    subject: game.subject,
    learningTrack: game.learningTrack,
    skillTags: game.skillTags ?? [],
    config: (game.config ?? {}) as Record<string, unknown>,
    scoringRules: {
      maxScore: game.scoringRules.maxScore,
      masteryThreshold: game.scoringRules.masteryThreshold,
      accuracyWeight: game.scoringRules.accuracyWeight,
      speedWeight: game.scoringRules.speedWeight,
      mistakePenalty: game.scoringRules.mistakePenalty,
    },
  };

  return (
    <AppShell
      identity={{
        line1: game.title,
        line2: `${game.subject} · ${game.learningTrack === "entering-3rd" ? "3rd" : "5th"} grade track`,
      }}
      nav={[
        { href: "/student/mini-games", label: "All games" },
        { href: "/student/dashboard", label: "Back to trail" },
      ]}
    >
      <MiniGameShell miniGame={miniGame} />
    </AppShell>
  );
}
