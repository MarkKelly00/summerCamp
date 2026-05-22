"use client";

/**
 * Number Muncher — multiplication / multiples fluency game.
 *
 * Rule: "Eat all the [multiples of 3]" (or whatever the lesson sets).
 *
 * Controls:
 *   - Arrow keys move the muncher one cell.
 *   - Space / Enter to eat the cell the muncher is sitting on.
 *   - On-screen D-pad + Eat button for touch / iPad.
 *
 * Scoring:
 *   - Correct eat: +10 raw points.
 *   - Wrong eat: -1 life, captured as a mistake.
 *   - Win condition: all matching cells eaten (clear board).
 *   - Lose condition: lives drop to 0 or timer expires.
 *
 * Accessibility:
 *   - Keyboard-first.
 *   - The grid is a focusable region with an aria-live updates area.
 *   - Visible focus ring on the muncher cell.
 *   - All animations gated by `motion-safe:`.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { GameRendererProps } from "../engine/types";

// ---- Config (validated upstream by Zod in lib/schemas/mini-game.ts) ------
interface NumberMuncherConfig {
  rule: string; // e.g. "multiples-of-3"
  gridSize: number;
  durationSeconds: number;
  numberRange: { min: number; max: number };
}

// ---- Cell state ---------------------------------------------------------
interface Cell {
  value: number;
  eaten: boolean;
  /** Briefly true to animate the eat / wrong feedback. */
  flash: "none" | "correct" | "wrong";
}

interface Position {
  x: number;
  y: number;
}

const LIVES = 3;
const CORRECT_POINTS = 10;
const WRONG_POINTS = 3; // counted toward mistake total only

function parseMultiple(rule: string): { skillTag: string; isMatch: (n: number) => boolean; label: string } {
  const match = /^multiples-of-(\d+)$/.exec(rule);
  const n = match ? Number(match[1]) : 3;
  return {
    skillTag: `multiples-of-${n}`,
    isMatch: (v: number) => v % n === 0,
    label: `Eat the multiples of ${n}`,
  };
}

function makeBoard(cfg: NumberMuncherConfig, ruleFn: (n: number) => boolean): Cell[][] {
  const { gridSize, numberRange } = cfg;
  const board: Cell[][] = [];
  // Build the value pool: roughly 40% matching, 60% non-matching.
  const targetMatches = Math.floor(gridSize * gridSize * 0.4);
  const matchValues: number[] = [];
  const nonMatchValues: number[] = [];
  for (let v = numberRange.min; v <= numberRange.max; v += 1) {
    (ruleFn(v) ? matchValues : nonMatchValues).push(v);
  }
  const picks: number[] = [];
  for (let i = 0; i < targetMatches; i += 1) {
    picks.push(matchValues[Math.floor(Math.random() * matchValues.length)] ?? 0);
  }
  while (picks.length < gridSize * gridSize) {
    picks.push(
      nonMatchValues[Math.floor(Math.random() * nonMatchValues.length)] ?? 1,
    );
  }
  // Shuffle.
  for (let i = picks.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [picks[i], picks[j]] = [picks[j], picks[i]] as [number, number];
  }
  for (let row = 0; row < gridSize; row += 1) {
    const r: Cell[] = [];
    for (let col = 0; col < gridSize; col += 1) {
      r.push({
        value: picks[row * gridSize + col] ?? 0,
        eaten: false,
        flash: "none",
      });
    }
    board.push(r);
  }
  return board;
}

// ---- Component -----------------------------------------------------------

export function NumberMuncher({ config, session }: GameRendererProps) {
  const cfg = useMemo<NumberMuncherConfig>(
    () => ({
      rule: (config.rule as string) ?? "multiples-of-3",
      gridSize: (config.gridSize as number) ?? 5,
      durationSeconds: (config.durationSeconds as number) ?? 120,
      numberRange: (config.numberRange as { min: number; max: number }) ?? {
        min: 1,
        max: 50,
      },
    }),
    [config],
  );
  const { isMatch, label, skillTag } = useMemo(
    () => parseMultiple(cfg.rule),
    [cfg.rule],
  );

  const [board, setBoard] = useState<Cell[][]>(() => makeBoard(cfg, isMatch));
  const [pos, setPos] = useState<Position>(() => ({
    x: Math.floor(cfg.gridSize / 2),
    y: Math.floor(cfg.gridSize / 2),
  }));
  const [lives, setLives] = useState(LIVES);
  const [timeLeft, setTimeLeft] = useState(cfg.durationSeconds);
  const [announce, setAnnounce] = useState<string>(label);
  const boardRef = useRef<HTMLDivElement>(null);

  const totalMatching = useMemo(() => {
    let n = 0;
    for (const row of board) for (const c of row) if (isMatch(c.value) && !c.eaten) n += 1;
    return n;
  }, [board, isMatch]);

  // ---- Game start ------------------------------------------------------
  useEffect(() => {
    session.start();
    // Focus the board so keyboard works without a click.
    boardRef.current?.focus();
  }, [session]);

  // ---- Timer -----------------------------------------------------------
  useEffect(() => {
    if (session.status !== "playing") return;
    if (timeLeft <= 0) {
      session.finish();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [session, timeLeft]);

  // ---- Win check -------------------------------------------------------
  useEffect(() => {
    if (session.status !== "playing") return;
    if (totalMatching === 0) {
      setAnnounce("Board clear! All targets eaten.");
      session.finish();
    }
  }, [session, totalMatching]);

  // ---- Lives check -----------------------------------------------------
  useEffect(() => {
    if (session.status !== "playing") return;
    if (lives <= 0) {
      setAnnounce("Out of lives.");
      session.finish();
    }
  }, [session, lives]);

  // ---- Movement + eat --------------------------------------------------
  const tryMove = useCallback(
    (dx: number, dy: number) => {
      if (session.status !== "playing") return;
      setPos((p) => {
        const nx = Math.max(0, Math.min(cfg.gridSize - 1, p.x + dx));
        const ny = Math.max(0, Math.min(cfg.gridSize - 1, p.y + dy));
        return { x: nx, y: ny };
      });
    },
    [cfg.gridSize, session.status],
  );

  const eat = useCallback(() => {
    if (session.status !== "playing") return;
    setBoard((prev) => {
      const next = prev.map((row) => row.map((c) => ({ ...c })));
      const cell = next[pos.y]?.[pos.x];
      if (!cell || cell.eaten) return prev;
      if (isMatch(cell.value)) {
        cell.eaten = true;
        cell.flash = "correct";
        session.recordCorrect({ points: CORRECT_POINTS, skillTag });
        setAnnounce(`Correct: ${cell.value} is a match.`);
      } else {
        cell.flash = "wrong";
        session.recordMistake(
          {
            prompt: label,
            selectedAnswer: String(cell.value),
            correctAnswer: "a matching number",
            skillTag,
          },
          { pointsLost: WRONG_POINTS },
        );
        setLives((l) => l - 1);
        setAnnounce(`Not a match: ${cell.value}.`);
      }
      return next;
    });
    // Clear the flash after a beat.
    setTimeout(() => {
      setBoard((prev) => {
        const next = prev.map((row) => row.map((c) => ({ ...c, flash: "none" as const })));
        return next;
      });
    }, 240);
  }, [isMatch, label, pos, session, skillTag]);

  // ---- Keyboard --------------------------------------------------------
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (session.status !== "playing") return;
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          tryMove(0, -1);
          break;
        case "ArrowDown":
          e.preventDefault();
          tryMove(0, 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          tryMove(-1, 0);
          break;
        case "ArrowRight":
          e.preventDefault();
          tryMove(1, 0);
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          eat();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [eat, tryMove, session.status]);

  // ---- Render ----------------------------------------------------------
  return (
    <section
      aria-label="Number Muncher game"
      className="space-y-4 select-none"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white">
        <p className="text-sm font-semibold uppercase tracking-widest">
          {label}
        </p>
        <div className="flex gap-4 text-sm">
          <span aria-label={`Score ${session.rawScore}`}>
            Score <span className="font-mono font-bold">{session.rawScore}</span>
          </span>
          <span aria-label={`${lives} lives remaining`}>
            Lives <span className="font-mono font-bold">{"♥".repeat(Math.max(lives, 0))}</span>
          </span>
          <span aria-label={`${timeLeft} seconds remaining`}>
            Time <span className="font-mono font-bold">{timeLeft}s</span>
          </span>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <p className="text-center text-xs text-camp-ink-muted">
        <span className="hidden sm:inline">
          Use{" "}
          <kbd className="rounded border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-1.5 py-0.5 font-mono text-[0.7rem]">←</kbd>{" "}
          <kbd className="rounded border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-1.5 py-0.5 font-mono text-[0.7rem]">↑</kbd>{" "}
          <kbd className="rounded border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-1.5 py-0.5 font-mono text-[0.7rem]">→</kbd>{" "}
          <kbd className="rounded border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-1.5 py-0.5 font-mono text-[0.7rem]">↓</kbd>{" "}
          to move,{" "}
          <kbd className="rounded border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-1.5 py-0.5 font-mono text-[0.7rem]">SPACE</kbd>{" "}
          to eat,
        </span>{" "}
        or tap any cell to move there — tap the muncher cell to eat.
      </p>

      <div
        ref={boardRef}
        tabIndex={0}
        role="grid"
        aria-label={`${cfg.gridSize} by ${cfg.gridSize} number grid. Use arrow keys to move and space to eat.`}
        className="mx-auto grid w-full max-w-md gap-1 rounded-xl bg-slate-800 p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
        style={{ gridTemplateColumns: `repeat(${cfg.gridSize}, minmax(0, 1fr))` }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => {
            const isPlayer = pos.x === x && pos.y === y;
            const bg = cell.eaten
              ? "bg-slate-700/60"
              : cell.flash === "correct"
                ? "bg-emerald-400 text-slate-900"
                : cell.flash === "wrong"
                  ? "bg-rose-500 text-white"
                  : "bg-slate-100 text-slate-900 hover:bg-white";
            // Cells are clickable as a fallback for kids who don't reach
            // for the keyboard. Click jumps the muncher to that cell;
            // clicking the cell the muncher is already on eats it.
            const handleClick = () => {
              if (session.status !== "playing") return;
              if (isPlayer) {
                eat();
              } else if (!cell.eaten) {
                setPos({ x, y });
              }
            };
            return (
              <button
                key={`${x}-${y}`}
                type="button"
                role="gridcell"
                onClick={handleClick}
                disabled={cell.eaten || session.status !== "playing"}
                aria-label={
                  cell.eaten
                    ? "Empty cell"
                    : `Cell ${x + 1},${y + 1} value ${cell.value}${isPlayer ? " — muncher here, click to eat" : ", click to move"}`
                }
                aria-current={isPlayer ? "location" : undefined}
                className={`relative flex aspect-square items-center justify-center rounded-md font-mono text-lg font-bold transition motion-reduce:transition-none disabled:cursor-not-allowed sm:text-xl ${bg} ${
                  isPlayer
                    ? "ring-4 ring-amber-400 ring-offset-2 ring-offset-slate-800"
                    : "cursor-pointer"
                }`}
              >
                {cell.eaten ? "" : cell.value}
              </button>
            );
          }),
        )}
      </div>

      <TouchControls
        onMove={tryMove}
        onEat={eat}
        disabled={session.status !== "playing"}
      />
    </section>
  );
}

function TouchControls({
  onMove,
  onEat,
  disabled,
}: {
  onMove: (dx: number, dy: number) => void;
  onEat: () => void;
  disabled: boolean;
}) {
  const btn =
    "rounded-lg bg-slate-200 px-4 py-3 text-base font-semibold text-slate-900 active:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900";
  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-2 sm:hidden">
      <div />
      <button
        type="button"
        className={btn}
        onClick={() => onMove(0, -1)}
        aria-label="Move up"
        disabled={disabled}
      >
        ↑
      </button>
      <div />
      <button
        type="button"
        className={btn}
        onClick={() => onMove(-1, 0)}
        aria-label="Move left"
        disabled={disabled}
      >
        ←
      </button>
      <button
        type="button"
        className={`${btn} bg-amber-400 hover:bg-amber-300`}
        onClick={onEat}
        aria-label="Eat current cell"
        disabled={disabled}
      >
        EAT
      </button>
      <button
        type="button"
        className={btn}
        onClick={() => onMove(1, 0)}
        aria-label="Move right"
        disabled={disabled}
      >
        →
      </button>
      <div />
      <button
        type="button"
        className={btn}
        onClick={() => onMove(0, 1)}
        aria-label="Move down"
        disabled={disabled}
      >
        ↓
      </button>
      <div />
    </div>
  );
}
