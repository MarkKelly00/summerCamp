/**
 * Engine-side types.
 *
 * Every mini-game renderer receives the same prop shape:
 *   - `config` — game-type-specific config (validated by Zod at write
 *     time; this is the read-time consumer)
 *   - `scoringRules` — copied from the MiniGame document
 *   - `session` — the live session state + callbacks from
 *     useMiniGameSession()
 *
 * Renderers call `session.start()` once they're ready, then
 * `session.recordCorrect()` / `session.recordMistake()` as the player
 * plays, then `session.finish()` when the round ends.
 */

import type { IScoringRules } from "@/lib/db/models/MiniGame";

export interface MiniGameMistakeInput {
  prompt: string;
  selectedAnswer: string;
  correctAnswer: string;
  skillTag: string;
}

export type MiniGameStatus = "idle" | "playing" | "finished";

export interface MiniGameSession {
  status: MiniGameStatus;
  startedAt: number | null;
  endedAt: number | null;
  durationMs: number;
  rawScore: number;
  correctCount: number;
  mistakeCount: number;
  accuracy: number;
  mistakes: MiniGameMistakeInput[];
  skillTagsPracticed: string[];

  /** Begin the run; safe to call once. */
  start(): void;
  /** Add to the raw score and record a correct response. */
  recordCorrect(opts?: { points?: number; skillTag?: string }): void;
  /** Record a mistake (subtract from score? depends on game). */
  recordMistake(mistake: MiniGameMistakeInput, opts?: { pointsLost?: number }): void;
  /** End the run. Optional override of raw score / accuracy. */
  finish(overrides?: { rawScore?: number; accuracy?: number }): void;
  /** Reset to idle. */
  reset(): void;
}

export interface GameRendererProps {
  config: Record<string, unknown>;
  scoringRules: IScoringRules;
  session: MiniGameSession;
  /** Stable info the renderer can show in the UI (title, learning track). */
  meta: {
    title: string;
    learningTrack: "entering-3rd" | "entering-5th";
    skillTags: string[];
  };
}
