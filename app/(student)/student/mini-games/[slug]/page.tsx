/**
 * Mini-game play page — `/student/mini-games/[slug]`.
 *
 * Server Component: fetches the MiniGame document by slug, hands it to
 * the client-side MiniGameShell which loads the right renderer from the
 * registry. Auth is enforced by proxy.ts; this page double-checks role
 * and that the game is active.
 */
import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { MiniGame } from "@/lib/db/models";
import { GAME_RENDERERS } from "@/components/games/registry";
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

  const Renderer = GAME_RENDERERS[game.type];

  // Serialize the lean doc into plain values for the client component.
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

  return <MiniGameShell miniGame={miniGame} renderer={Renderer} />;
}
