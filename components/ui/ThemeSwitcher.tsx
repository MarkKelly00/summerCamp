"use client";

/**
 * Theme switcher. A real <select> for built-in keyboard + a11y.
 */

import { Palette } from "lucide-react";

import { CAMP_THEMES, type CampTheme } from "@/lib/themes";
import { useCampTheme } from "./ThemeProvider";

export function ThemeSwitcher() {
  const { theme, setTheme } = useCampTheme();

  return (
    <label className="inline-flex items-center gap-2 rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-1.5 text-xs text-camp-ink-muted focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--camp-accent)]">
      <Palette className="h-4 w-4 text-[var(--camp-accent)]" aria-hidden="true" />
      <span className="sr-only">Theme</span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as CampTheme)}
        className="bg-transparent text-camp-ink focus:outline-none"
        aria-label="Choose theme"
      >
        {CAMP_THEMES.map((t) => (
          <option key={t.slug} value={t.slug} className="bg-[var(--camp-surface)] text-camp-ink">
            {t.label}
          </option>
        ))}
      </select>
    </label>
  );
}
