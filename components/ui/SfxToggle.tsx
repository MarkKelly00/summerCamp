"use client";

/**
 * Small speaker icon toggle that flips the localStorage SFX flag.
 * Sits in the AppShell header next to the theme switcher.
 */

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { isSfxEnabled, primeAudio, setSfxEnabled, sfxClick } from "@/lib/sfx";

export function SfxToggle() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setEnabled(isSfxEnabled());
  }, []);

  const toggle = () => {
    const next = !enabled;
    setSfxEnabled(next);
    setEnabled(next);
    if (next) {
      primeAudio();
      sfxClick();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={enabled ? "Mute sound effects" : "Enable sound effects"}
      aria-pressed={enabled}
      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] text-camp-ink-muted transition hover:text-camp-ink hover:bg-[var(--camp-surface)]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)]"
    >
      {enabled ? (
        <Volume2 className="h-4 w-4" aria-hidden="true" />
      ) : (
        <VolumeX className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
