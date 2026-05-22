"use client";

/**
 * MiniGameShell — the chrome around any mini-game.
 *
 * Responsibilities:
 *   - Render the type-specific game from the registry.
 *   - Watch session.status; when it flips to "finished", call
 *     submitMiniGameResult and render the result screen.
 *   - Provide a reset path so the student can replay.
 *
 * Renderer lookup runs INSIDE this client component. A previous version
 * looked it up in the Server Component page and passed the component as
 * a prop — but Next.js's RSC boundary doesn't serialize plain-object
 * lookups into client component references, so the prop landed as
 * undefined at render time. Lookup-on-the-client avoids the boundary
 * problem entirely.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  submitMiniGameResult,
  type SubmitMiniGameResultState,
} from "@/lib/actions/mini-games";
import { sfxLevelUp, sfxMastery } from "@/lib/sfx";
import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampChip } from "@/components/ui/CampChip";
import { Confetti } from "@/components/ui/Confetti";

import { GAME_RENDERERS } from "../registry";
import { useMiniGameSession } from "./useMiniGameSession";

interface MiniGameShellProps {
  miniGame: {
    _id: string;
    slug: string;
    title: string;
    /** Renderer key — must be one of the MiniGameType enum values. */
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
}

export function MiniGameShell({ miniGame }: MiniGameShellProps) {
  const session = useMiniGameSession();
  const [submitState, setSubmitState] =
    useState<SubmitMiniGameResultState | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Lookup the right renderer for this game type. Falls back to a clear
  // error UI if the type isn't in the registry — better than rendering
  // <undefined /> and crashing React.
  const Game = (GAME_RENDERERS as Record<string, React.ComponentType<{
    config: Record<string, unknown>;
    scoringRules: MiniGameShellProps["miniGame"]["scoringRules"];
    session: ReturnType<typeof useMiniGameSession>;
    meta: {
      title: string;
      learningTrack: "entering-3rd" | "entering-5th";
      skillTags: string[];
    };
  }> | undefined>)[miniGame.type];

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
    <div className="mx-auto max-w-3xl">
      {!Game ? (
        <UnknownGameTypeNotice type={miniGame.type} />
      ) : session.status === "finished" ? (
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
    </div>
  );
}

function UnknownGameTypeNotice({ type }: { type: string }) {
  return (
    <CampCard role="alert" aria-live="assertive" className="space-y-2">
      <CampKicker>Renderer not found</CampKicker>
      <p className="text-base">
        No renderer is registered for game type{" "}
        <code className="rounded bg-[var(--camp-surface-soft)] px-1.5 py-0.5 font-mono text-xs">
          {type}
        </code>
        .
      </p>
      <p className="text-sm text-camp-ink-muted">
        Check <code className="font-mono">components/games/registry.ts</code>
        {" "}— add a renderer entry for this type or seed the mini-game
        with a known type.
      </p>
      <Link href="/student/mini-games">
        <CampButton intent="primary" size="sm">
          Back to games
        </CampButton>
      </Link>
    </CampCard>
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
  // Fire the celebration audio once when a successful result lands.
  // useEffect with the result identity in deps means a replay re-fires it.
  useEffect(() => {
    if (submitting || !state?.ok || !state.result) return;
    if (state.result.isFirstMastery) {
      sfxMastery();
    } else if (state.result.isMastery) {
      sfxLevelUp();
    }
    // We intentionally don't fire a sound on "keep practicing" — the
    // game already played its wrong/right sounds during play.
  }, [submitting, state]);

  if (submitting || !state) {
    return (
      <CampCard className="text-center" aria-live="polite">
        <p className="text-base font-medium">Saving your results...</p>
      </CampCard>
    );
  }

  if (!state.ok) {
    return (
      <CampCard role="alert" aria-live="assertive" className="space-y-3">
        <CampKicker>Something went wrong</CampKicker>
        <p className="text-base">{state.error ?? "Try again."}</p>
        <CampButton intent="primary" onClick={onReplay}>
          Play again
        </CampButton>
      </CampCard>
    );
  }

  const r = state.result!;
  const masteryLabel = r.isFirstMastery
    ? "First mastery!"
    : r.isMastery
      ? "Mastery"
      : "Keep practicing";
  const masteryTone =
    r.isFirstMastery ? "accent" : r.isMastery ? "positive" : "warning";

  return (
    <CampCard aria-live="polite" className="space-y-4">
      <Confetti active={r.isFirstMastery} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <CampKicker>Result</CampKicker>
          <h2 className="mt-1 text-2xl font-bold">{masteryLabel}</h2>
        </div>
        <CampChip tone={masteryTone as never}>{r.finalScore} / 100</CampChip>
      </div>
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Score" value={`${r.finalScore} / 100`} />
        <Stat label="XP earned" value={`+${r.earnedXp}`} />
        <Stat label="Fun Money" value={`+${r.earnedFunMoney}`} />
        <Stat label="Level" value={`${r.newLevel}`} />
      </dl>
      <div className="flex flex-wrap gap-2">
        <CampButton intent="primary" onClick={onReplay}>
          Play again
        </CampButton>
        <Link href="/student/mini-games">
          <CampButton intent="secondary">Pick another game</CampButton>
        </Link>
        <Link href="/student/dashboard">
          <CampButton intent="ghost">Back to the trail</CampButton>
        </Link>
      </div>
    </CampCard>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="camp-card-soft px-3 py-2">
      <dt className="text-[0.7rem] font-semibold uppercase tracking-widest text-camp-ink-muted">
        {label}
      </dt>
      <dd className="mt-0.5 text-xl font-bold">{value}</dd>
    </div>
  );
}
