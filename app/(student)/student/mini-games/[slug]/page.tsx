/**
 * Mini-game play page — `/student/mini-games/[slug]`.
 *
 * Server Component: fetches the MiniGame document by slug and hands the
 * plain serializable data to MiniGameShell (a client component) which
 * looks up the right renderer from the registry itself.
 *
 * The renderer lookup MUST happen client-side. A previous version of
 * this file did the lookup here and passed the component as a prop —
 * that fails because Next.js's RSC boundary doesn't serialize plain
 * objects of client component references; the prop arrives as
 * undefined.
 */

import { notFound, redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { MiniGame } from "@/lib/db/models";
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

  return <MiniGameShell miniGame={miniGame} />;
}
