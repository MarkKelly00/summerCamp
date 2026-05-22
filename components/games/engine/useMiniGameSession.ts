"use client";

/**
 * React hook that backs every mini-game's session state.
 *
 * Renderers call:
 *   - session.start() — sets startedAt, status='playing'
 *   - session.recordCorrect({ points, skillTag }) — bumps rawScore + correctCount
 *   - session.recordMistake({ prompt, selectedAnswer, correctAnswer, skillTag })
 *   - session.finish() — captures endedAt + duration, status='finished'
 *
 * The Shell watches `status` to drive the submission flow.
 */

import { useCallback, useMemo, useRef, useState } from "react";

import type {
  MiniGameMistakeInput,
  MiniGameSession,
  MiniGameStatus,
} from "./types";

export function useMiniGameSession(): MiniGameSession {
  const [status, setStatus] = useState<MiniGameStatus>("idle");
  const [rawScore, setRawScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);
  const [mistakes, setMistakes] = useState<MiniGameMistakeInput[]>([]);
  const [skillTagsPracticed, setSkillTagsPracticed] = useState<string[]>([]);
  const startedAtRef = useRef<number | null>(null);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [endedAt, setEndedAt] = useState<number | null>(null);
  const [finalAccuracy, setFinalAccuracy] = useState<number | null>(null);

  const start = useCallback(() => {
    if (status !== "idle") return;
    const now = Date.now();
    startedAtRef.current = now;
    setStartedAt(now);
    setStatus("playing");
  }, [status]);

  const recordCorrect = useCallback(
    (opts: { points?: number; skillTag?: string } = {}) => {
      setRawScore((s) => s + (opts.points ?? 1));
      setCorrectCount((c) => c + 1);
      if (opts.skillTag) {
        setSkillTagsPracticed((tags) =>
          tags.includes(opts.skillTag!) ? tags : [...tags, opts.skillTag!],
        );
      }
    },
    [],
  );

  const recordMistake = useCallback(
    (
      mistake: MiniGameMistakeInput,
      opts: { pointsLost?: number } = {},
    ) => {
      setMistakeCount((c) => c + 1);
      setMistakes((prev) => [...prev, mistake]);
      setSkillTagsPracticed((tags) =>
        tags.includes(mistake.skillTag) ? tags : [...tags, mistake.skillTag],
      );
      if (opts.pointsLost && opts.pointsLost > 0) {
        setRawScore((s) => Math.max(0, s - opts.pointsLost!));
      }
    },
    [],
  );

  const finish = useCallback(
    (overrides?: { rawScore?: number; accuracy?: number }) => {
      const now = Date.now();
      setEndedAt(now);
      if (overrides?.rawScore != null) {
        setRawScore(overrides.rawScore);
      }
      if (overrides?.accuracy != null) {
        setFinalAccuracy(overrides.accuracy);
      }
      setStatus("finished");
    },
    [],
  );

  const reset = useCallback(() => {
    startedAtRef.current = null;
    setStartedAt(null);
    setEndedAt(null);
    setRawScore(0);
    setCorrectCount(0);
    setMistakeCount(0);
    setMistakes([]);
    setSkillTagsPracticed([]);
    setFinalAccuracy(null);
    setStatus("idle");
  }, []);

  const accuracy = useMemo(() => {
    if (finalAccuracy != null) return finalAccuracy;
    const total = correctCount + mistakeCount;
    if (total === 0) return 0;
    return correctCount / total;
  }, [finalAccuracy, correctCount, mistakeCount]);

  const durationMs = useMemo(() => {
    if (!startedAt) return 0;
    return (endedAt ?? Date.now()) - startedAt;
  }, [startedAt, endedAt]);

  return {
    status,
    startedAt,
    endedAt,
    durationMs,
    rawScore,
    correctCount,
    mistakeCount,
    accuracy,
    mistakes,
    skillTagsPracticed,
    start,
    recordCorrect,
    recordMistake,
    finish,
    reset,
  };
}
