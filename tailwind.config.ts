import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CSS-variable backed palette; theme swaps update these at runtime.
        camp: {
          surface: "var(--camp-surface)",
          "surface-soft": "var(--camp-surface-soft)",
          "surface-strong": "var(--camp-surface-strong)",
          border: "var(--camp-border)",
          ink: "var(--camp-ink)",
          "ink-muted": "var(--camp-ink-muted)",
          accent: "var(--camp-accent)",
          "accent-strong": "var(--camp-accent-strong)",
          "accent-soft": "var(--camp-accent-soft)",
          positive: "var(--camp-positive)",
          warning: "var(--camp-warning)",
          danger: "var(--camp-danger)",
          quest: "var(--camp-quest)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "camp-glow": "0 0 0 1px var(--camp-border), 0 10px 30px -10px rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
