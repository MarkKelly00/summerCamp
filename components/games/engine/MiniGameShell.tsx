"use client";

/**
 * MiniGameShell — the chrome around any mini-game.
 *
 * Responsibilities:
 *   - Show the rule banner + title.
 *   - Render the type-specific game from the registry.
 *   - Watch session.status; when it flips to "finished", call
 *     submitMiniGameResult and render the result screen.
 *   - Provide a reset path so the student can replay.
 *   - Respect prefers-reduced-motion.
 *
 * Phase 7 will skin this; Phase 5 keeps it utilitarian and accessible.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  submitMiniGameResult,
  type SubmitMiniGameResultState,
} from "@/lib/actions/mini-games";

import { useMiniGameSession } from "./useMiniGameSession";
import type { MiniGameSession } from "./types";

interface MiniGameShellProps {
  miniGame: {
    _id: string;
    slug: string;
    title: string;
    type: string;
    subject: string;
    learningTrack: "entering-3rd" | "entering-5th";
    skillTags: string[];
    config: Record<string, unknown>;
    scoringRules: {
      maxScore: number;
      masteryThreshold: number;
      accuracyWeight: number;
      speedWeight?: number;
      mistakePenalty?: number;
    };
  };
  renderer: React.ComponentType<{
    config: Record<string, unknown>;
    scoringRules: MiniGameShellProps["miniGame"]["scoringRules"];
    session: MiniGameSession;
    meta: {
      title: string;
      learningTrack: "entering-3rd" | "entering-5th";
      skillTags: string[];
    };
  }>;
}

export function MiniGameShell({ miniGame, renderer: Game }: MiniGameShellProps) {
  const session = useMiniGameSession();
  const [submitState, setSubmitState] =
    useState<SubmitMiniGameResultState | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // When the game finishes, submit once.
  useEffect(() => {
    if (session.status !== "finished" || submitting || submitState) return;
    setSubmitting(true);

    void submitMiniGameResult({
      miniGameId: miniGame._id,
      rawScore: session.rawScore,
      accuracy: session.accuracy,
      timeSpent: session.durationMs,
      skillTagsPracticed: session.skillTagsPracticed,
      mistakes: session.mistakes,
    })
      .then((res) => setSubmitState(res))
      .finally(() => setSubmitting(false));
  }, [
    session.status,
    session.rawScore,
    session.accuracy,
    session.durationMs,
    session.skillTagsPracticed,
    session.mistakes,
    miniGame._id,
    submitting,
    submitState,
  ]);

  const handleReplay = () => {
    setSubmitState(null);
    session.reset();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
            Mini-game · {miniGame.subject}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">{miniGame.title}</h1>
        </div>
        <Link
          href="/student/mini-games"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Back to games
        </Link>
      </header>

      {session.status === "finished" ? (
        <ResultPanel
          state={submitState}
          submitting={submitting}
          onReplay={handleReplay}
        />
      ) : (
        <Game
          config={miniGame.config}
          scoringRules={miniGame.scoringRules}
          session={session}
          meta={{
            title: miniGame.title,
            learningTrack: miniGame.learningTrack,
            skillTags: miniGame.skillTags,
          }}
        />
      )}
    </main>
  );
}

function ResultPanel({
  state,
  submitting,
  onReplay,
}: {
  state: SubmitMiniGameResultState | null;
  submitting: boolean;
  onReplay: () => void;
}) {
  if (submitting || !state) {
    return (
      <section
        aria-live="polite"
        className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
      >
        <p className="text-base font-medium">Saving your results...</p>
      </section>
    );
  }

  if (!state.ok) {
    return (
      <section
        role="alert"
        aria-live="assertive"
        className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-rose-800 shadow-sm"
      >
        <h2 className="text-lg font-bold">Something went wrong.</h2>
        <p className="mt-1 text-sm">{state.error ?? "Try again."}</p>
        <button
          type="button"
          onClick={onReplay}
          className="mt-4 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Play again
        </button>
      </section>
    );
  }

  const r = state.result!;
  const masteryLabel = r.isFirstMastery
    ? "First mastery!"
    : r.isMastery
      ? "Mastery"
      : "Keep practicing";
  const masteryBg = r.isFirstMastery
    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
    : r.isMastery
      ? "bg-sky-50 border-sky-200 text-sky-900"
      : "bg-amber-50 border-amber-200 text-amber-900";

  return (
    <section
      aria-live="polite"
      className={`rounded-2xl border p-6 shadow-sm ${masteryBg}`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest opacity-80">
        Result
      </p>
      <h2 className="mt-1 text-2xl font-bold">{masteryLabel}</h2>
      <dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Score" value={`${r.finalScore} / 100`} />
        <Stat label="XP earned" value={`+${r.earnedXp}`} />
        <Stat label="Fun Money" value={`+${r.earnedFunMoney}`} />
        <Stat label="Level" value={`${r.newLevel}`} />
      </dl>
      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onReplay}
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Play again
        </button>
        <Link
          href="/student/mini-games"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
        >
          Pick another game
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest opacity-70">{label}</dt>
      <dd className="mt-0.5 text-xl font-bold">{value}</dd>
    </div>
  );
}
