"use client";

/**
 * Placeholder renderer for mini-games whose engine hasn't been built yet
 * in Phase 5. Lessons can reference these games today; the rest of their
 * implementations land in follow-up phases.
 */

import { useEffect } from "react";

import type { GameRendererProps } from "../engine/types";

export function ComingSoon({ session, meta }: GameRendererProps) {
  // Auto-finish with a baseline score so the engine doesn't get stuck —
  // gives the student a small effort XP reward and a friendly message.
  useEffect(() => {
    if (session.status === "idle") {
      session.start();
      session.recordCorrect({ points: 0 });
      // Finish at 0% so they get effort XP only, not mastery.
      session.finish({ rawScore: 0, accuracy: 0 });
    }
  }, [session]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">{meta.title}</h2>
      <p className="mt-1 text-sm text-slate-600">
        This game is in the works. You still get a small XP nudge for
        showing up — come back soon to play it for real.
      </p>
    </section>
  );
}
