"use client";

/**
 * Placeholder renderer for mini-games whose engine hasn't been built
 * yet. Two games are fully playable in Phase 5 (Number Muncher,
 * Knoword Vocab); the other nine route here.
 *
 * Previous behavior auto-submitted a 0/100 attempt so the student got
 * a small effort-XP nudge — but the resulting "Keep practicing"
 * screen was confusing (looks like the kid played and bombed). Now
 * the placeholder just shows a clean "coming soon" + navigation back.
 * No XP awarded, no Progress recorded.
 */

import Link from "next/link";

import { CampButton } from "@/components/ui/CampButton";
import { CampCard, CampKicker } from "@/components/ui/CampCard";

import type { GameRendererProps } from "../engine/types";

export function ComingSoon({ meta }: GameRendererProps) {
  return (
    <CampCard className="space-y-3">
      <CampKicker>Coming soon</CampKicker>
      <h2 className="text-xl font-bold">{meta.title}</h2>
      <p className="text-sm text-camp-ink-muted">
        This mini-game is on the build list. Two games are fully playable
        today: <span className="font-semibold text-camp-ink">Number Muncher</span>{" "}
        (multiplication, 3rd-grade track) and{" "}
        <span className="font-semibold text-camp-ink">Vocabulary Arena</span>{" "}
        (5th-grade track). The rest will land in follow-up updates.
      </p>
      <div className="flex flex-wrap gap-2 pt-1">
        <Link href="/student/mini-games">
          <CampButton intent="primary">Pick a playable game</CampButton>
        </Link>
        <Link href="/student/dashboard">
          <CampButton intent="secondary">Back to the trail</CampButton>
        </Link>
      </div>
    </CampCard>
  );
}
