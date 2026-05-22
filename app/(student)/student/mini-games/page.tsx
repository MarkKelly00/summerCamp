/**
 * Mini-game directory — lists games for the signed-in student's track.
 * Wrapped in AppShell for consistent nav (back to dashboard, theme +
 * SFX toggles, sign out).
 */
import Link from "next/link";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { MiniGame, User } from "@/lib/db/models";
import { AppShell } from "@/components/ui/AppShell";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";

export const dynamic = "force-dynamic";

export default async function MiniGameDirectoryPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectToDatabase();

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
    <AppShell
      identity={{
        line1: "Mini-games",
        line2: "Pick a game to play",
      }}
      nav={[
        { href: "/student/dashboard", label: "Back to trail" },
        { href: "/student/rewards", label: "Prize shop" },
      ]}
    >
      <CampCard className="space-y-2">
        <CampKicker>Playable today</CampKicker>
        <p className="text-sm text-camp-ink-muted">
          Number Muncher (3rd-grade track) and Vocabulary Arena (5th-grade
          track) are fully playable with sounds, animations, and rewards.
          The other games show a &ldquo;coming soon&rdquo; card for now.
        </p>
      </CampCard>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {games.map((g) => (
          <li key={String(g._id)}>
            <Link
              href={`/student/mini-games/${g.slug}`}
              className="block h-full rounded-2xl border border-[var(--camp-border)] bg-[var(--camp-surface)] p-5 transition hover:border-[var(--camp-accent)] hover:bg-[var(--camp-surface-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)]"
            >
              <div className="flex items-start justify-between gap-2">
                <CampKicker>
                  {g.subject} · {g.learningTrack === "entering-3rd" ? "3rd" : "5th"} grade
                </CampKicker>
                {g.type === "number-muncher" || g.type === "knoword-vocab" ? (
                  <CampChip tone="positive">Playable</CampChip>
                ) : (
                  <CampChip tone="neutral">Coming soon</CampChip>
                )}
              </div>
              <h2 className="mt-2 text-lg font-bold text-camp-ink">
                {g.title}
              </h2>
              <p className="mt-1 text-xs text-camp-ink-muted">
                {g.skillTags.slice(0, 3).join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {games.length === 0 ? (
        <CampCard className="mt-6 text-center">
          <p className="text-sm text-camp-ink-muted">
            No mini-games seeded yet for your track. Ask an admin to run{" "}
            <code className="rounded bg-[var(--camp-surface-soft)] px-1 font-mono">
              npm run seed:2026
            </code>
            .
          </p>
        </CampCard>
      ) : null}
    </AppShell>
  );
}
