"use client";

/**
 * Knoword Vocabulary Arena — Addie's vocabulary-fluency game.
 *
 * Each round:
 *   - Show a definition.
 *   - Show the answer word with all letters hidden as underscores.
 *   - Every `revealIntervalMs`, reveal one more random letter as a hint.
 *   - Player types the answer and presses Enter (or taps "Submit").
 *   - Correct → green burst, advance to next round.
 *   - Wrong → shake, mistake recorded, player may try again or tap Skip.
 *
 * Scoring per round:
 *   - 100 points if no hints revealed yet (full credit).
 *   - Subtract 10 per hint already revealed when answered correctly.
 *   - Skipped rounds = 0 points + mistake recorded.
 *
 * Accessibility:
 *   - The input is the natural focus target; aria-live announces results.
 *   - Errors use role="alert".
 *   - All shake animations gated by motion-safe.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { GameRendererProps } from "../engine/types";

interface KnowordWord {
  word: string;
  definition: string;
  partOfSpeech?: string;
}
interface KnowordConfig {
  wordList: KnowordWord[];
  revealIntervalMs: number;
  roundCount: number;
}

type RoundResult = "correct" | "wrong" | "skipped";

interface RoundState {
  word: KnowordWord;
  /** Indices of letters revealed as hints. */
  revealed: Set<number>;
  /** Whether the round has been completed/skipped. */
  result: RoundResult | null;
}

const POINTS_PER_ROUND = 100;
const HINT_COST = 10;

function pickRounds(cfg: KnowordConfig): KnowordWord[] {
  const shuffled = [...cfg.wordList];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]] as [
      KnowordWord,
      KnowordWord,
    ];
  }
  return shuffled.slice(0, Math.min(cfg.roundCount, shuffled.length));
}

function revealedLetterMask(word: string, revealed: Set<number>): string {
  return word
    .split("")
    .map((ch, i) => (revealed.has(i) || ch === " " ? ch : "_"))
    .join(" ");
}

// ---- Component -----------------------------------------------------------

export function KnowordVocab({ config, session }: GameRendererProps) {
  const cfg = useMemo<KnowordConfig>(
    () => ({
      wordList: (config.wordList as KnowordWord[]) ?? [],
      revealIntervalMs: (config.revealIntervalMs as number) ?? 2000,
      roundCount: (config.roundCount as number) ?? 10,
    }),
    [config],
  );

  const rounds = useMemo(() => pickRounds(cfg), [cfg]);
  const [index, setIndex] = useState(0);
  const [round, setRound] = useState<RoundState>(() => ({
    word: rounds[0] ?? { word: "", definition: "" },
    revealed: new Set(),
    result: null,
  }));
  const [input, setInput] = useState("");
  const [shake, setShake] = useState(false);
  const [announce, setAnnounce] = useState<string>(
    "Type the word that matches the definition.",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // ---- Start -----------------------------------------------------------
  useEffect(() => {
    session.start();
    inputRef.current?.focus();
  }, [session]);

  // ---- Hint reveal timer ----------------------------------------------
  useEffect(() => {
    if (session.status !== "playing" || round.result) return;
    const w = round.word.word;
    if (round.revealed.size >= w.length) return;
    const id = setTimeout(() => {
      setRound((r) => {
        const hidden = w
          .split("")
          .map((_, i) => i)
          .filter((i) => !r.revealed.has(i) && w[i] !== " ");
        if (hidden.length === 0) return r;
        const pick = hidden[Math.floor(Math.random() * hidden.length)]!;
        const next = new Set(r.revealed);
        next.add(pick);
        return { ...r, revealed: next };
      });
    }, cfg.revealIntervalMs);
    return () => clearTimeout(id);
  }, [round, cfg.revealIntervalMs, session.status]);

  // ---- Advance helpers -------------------------------------------------
  const advance = useCallback(() => {
    const next = index + 1;
    if (next >= rounds.length) {
      session.finish();
      return;
    }
    setIndex(next);
    setRound({
      word: rounds[next] ?? { word: "", definition: "" },
      revealed: new Set(),
      result: null,
    });
    setInput("");
    inputRef.current?.focus();
  }, [index, rounds, session]);

  const submit = useCallback(() => {
    if (session.status !== "playing" || round.result) return;
    const guess = input.trim().toLowerCase();
    const target = round.word.word.trim().toLowerCase();
    if (!guess) return;
    if (guess === target) {
      const points = Math.max(
        10,
        POINTS_PER_ROUND - round.revealed.size * HINT_COST,
      );
      session.recordCorrect({ points, skillTag: "domain-vocabulary" });
      setAnnounce(`Correct! ${round.word.word}.`);
      setRound((r) => ({ ...r, result: "correct" }));
      setTimeout(advance, 700);
    } else {
      session.recordMistake({
        prompt: round.word.definition,
        selectedAnswer: input,
        correctAnswer: round.word.word,
        skillTag: "domain-vocabulary",
      });
      setShake(true);
      setAnnounce("Not quite. Try again or tap Skip.");
      setTimeout(() => setShake(false), 300);
    }
  }, [advance, input, round, session]);

  const skip = useCallback(() => {
    if (round.result) return;
    session.recordMistake({
      prompt: round.word.definition,
      selectedAnswer: input || "(skipped)",
      correctAnswer: round.word.word,
      skillTag: "domain-vocabulary",
    });
    setAnnounce(`Skipped. The answer was "${round.word.word}".`);
    setRound((r) => ({ ...r, result: "skipped" }));
    setTimeout(advance, 1200);
  }, [advance, input, round, session]);

  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submit();
      }
    },
    [submit],
  );

  if (cfg.wordList.length === 0) {
    return (
      <p className="rounded-md bg-amber-50 p-4 text-amber-900">
        No vocabulary list configured for this game.
      </p>
    );
  }

  const masked = revealedLetterMask(round.word.word, round.revealed);
  const remainingHints = round.word.word.length - round.revealed.size;
  return (
    <section aria-label="Vocabulary Arena" className="space-y-4">
      <div className="flex items-center justify-between rounded-xl bg-slate-900 px-4 py-2 text-white">
        <p className="text-sm font-semibold uppercase tracking-widest">
          Round {index + 1} / {rounds.length}
        </p>
        <p className="text-sm">
          Score <span className="font-mono font-bold">{session.rawScore}</span>
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <div
        className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition motion-reduce:transition-none ${
          shake ? "motion-safe:animate-pulse" : ""
        }`}
      >
        {round.word.partOfSpeech ? (
          <p className="text-xs uppercase tracking-widest text-slate-500">
            {round.word.partOfSpeech}
          </p>
        ) : null}
        <p className="mt-1 text-lg text-slate-800">{round.word.definition}</p>

        <p
          className="mt-4 select-none font-mono text-2xl tracking-[0.4em] text-slate-900"
          aria-label={`Word with ${round.revealed.size} of ${round.word.word.length} letters revealed`}
        >
          {masked}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          {round.revealed.size === 0
            ? "No hints yet."
            : `Hints used: ${round.revealed.size} · ${remainingHints} letters still hidden`}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label htmlFor="knoword-answer" className="sr-only">
            Your answer
          </label>
          <input
            id="knoword-answer"
            ref={inputRef}
            type="text"
            inputMode="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            disabled={round.result !== null || session.status !== "playing"}
            className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-base focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 disabled:opacity-60"
            placeholder="Type the word"
          />
          <button
            type="button"
            onClick={submit}
            disabled={round.result !== null}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-60"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={skip}
            disabled={round.result !== null}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-60"
          >
            Skip
          </button>
        </div>

        {round.result === "correct" ? (
          <p className="mt-3 text-sm font-semibold text-emerald-700">Correct.</p>
        ) : null}
        {round.result === "skipped" ? (
          <p
            className="mt-3 text-sm font-semibold text-amber-700"
            role="alert"
          >
            Skipped. The answer was &ldquo;{round.word.word}&rdquo;.
          </p>
        ) : null}
      </div>
    </section>
  );
}
