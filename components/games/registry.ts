"use client";

/**
 * Renderer registry — maps `MiniGame.type` to the React component that
 * actually renders the game. Two games are real in Phase 5; the other
 * nine share the ComingSoon placeholder until they're implemented.
 */

import type { MiniGameType } from "@/lib/db/models/MiniGame";

import type { GameRendererProps } from "./engine/types";
import { KnowordVocab } from "./knoword-vocab/KnowordVocab";
import { NumberMuncher } from "./number-muncher/NumberMuncher";
import { ComingSoon } from "./shared/ComingSoon";

export const GAME_RENDERERS: Record<
  MiniGameType,
  React.ComponentType<GameRendererProps>
> = {
  "number-muncher": NumberMuncher,
  "knoword-vocab": KnowordVocab,
  "fraction-pizza": ComingSoon,
  "fraction-forge": ComingSoon,
  "decimal-dash": ComingSoon,
  "evidence-detective": ComingSoon,
  "ecosystem-sim": ComingSoon,
  "timeline-trail": ComingSoon,
  "weather-studio": ComingSoon,
  "coordinate-map": ComingSoon,
  "primary-source-lab": ComingSoon,
};
