"use client";

/**
 * ThemeProvider — applies the selected theme to <html> via data-theme,
 * and exposes `useCampTheme()` for components that want to read the
 * current value (e.g., the theme switcher).
 *
 * Persists to localStorage so the chosen theme survives reloads. SSR
 * resolves to the user's stored preference (passed in via initialTheme)
 * if provided.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_THEME, type CampTheme } from "@/lib/themes";

interface ThemeContextValue {
  theme: CampTheme;
  setTheme: (t: CampTheme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "summer-camp-theme";

export function ThemeProvider({
  children,
  initialTheme = DEFAULT_THEME,
}: {
  children: ReactNode;
  initialTheme?: CampTheme;
}) {
  const [theme, setThemeState] = useState<CampTheme>(initialTheme);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as CampTheme | null;
      if (stored && stored !== theme) {
        setThemeState(stored);
      }
    } catch {
      // localStorage may be unavailable (e.g., private browsing). Ignore.
    }
    // Only on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync to <html data-theme> + localStorage on change.
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore.
    }
  }, [theme]);

  const setTheme = useCallback((t: CampTheme) => setThemeState(t), []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useCampTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useCampTheme must be used inside a <ThemeProvider>.");
  }
  return ctx;
}
