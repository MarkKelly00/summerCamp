/**
 * Mini-game directory — lists games for the signed-in student's track.
 *
 * Phase 5 places this under /student/mini-games. Phase 7 will integrate
 * the list into the proper adventure-map dashboard.
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { MiniGame, User } from "@/lib/db/models";

export const dynamic = "force-dynamic";

export default async function MiniGameDirectoryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectToDatabase();

  // Determine which track to show. Students see their own track. Admins
  // see both for testing.
  const user = await User.findById(session.userId).lean();
  const studentTrack = user?.profile?.learningTrack ?? "entering-3rd";
  const filter =
    session.role === "admin"
      ? { active: true }
      : { active: true, learningTrack: studentTrack };

  const games = await MiniGame.find(filter)
    .sort({ learningTrack: 1, slug: 1 })
    .lean();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <header>
        <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
          Mini-games
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Pick a game
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Two are fully playable in Phase 5 — Number Muncher (Dean&apos;s track)
          and Vocabulary Arena (Addie&apos;s track). The other nine give a small
          XP nudge for showing up and ship soon.
        </p>
      </header>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {games.map((g) => (
          <li key={String(g._id)}>
            <Link
              href={`/student/mini-games/${g.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-400 hover:shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                {g.subject} · {g.learningTrack === "entering-3rd" ? "3rd" : "5th"} grade
              </p>
              <h2 className="mt-1 text-lg font-bold">{g.title}</h2>
              <p className="mt-1 text-xs text-slate-500">
                {g.skillTags.slice(0, 3).join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {games.length === 0 ? (
        <p className="mt-12 rounded-md bg-amber-50 p-4 text-sm text-amber-900">
          No mini-games seeded yet for your track. Ask an admin to run{" "}
          <code className="rounded bg-amber-100 px-1">npm run seed:2026</code>.
        </p>
      ) : null}
    </main>
  );
}
