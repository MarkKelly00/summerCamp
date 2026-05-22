/**
 * Theme-aware buttons. Three intents: primary (accent), secondary (outline),
 * ghost (subtle). Always renders a real <button> for built-in accessibility.
 */

import { forwardRef, type ButtonHTMLAttributes } from "react";

type Intent = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

export interface CampButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent;
  size?: Size;
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

const INTENT_CLASSES: Record<Intent, string> = {
  primary:
    "bg-[var(--camp-accent)] text-[var(--camp-surface-strong)] hover:bg-[var(--camp-accent-strong)] shadow-camp-glow",
  secondary:
    "border border-[var(--camp-border)] text-[var(--camp-ink)] hover:bg-[var(--camp-surface-soft)]",
  ghost:
    "text-[var(--camp-ink-muted)] hover:text-[var(--camp-ink)] hover:bg-[var(--camp-surface-soft)]/60",
  danger:
    "bg-[var(--camp-danger)] text-[var(--camp-surface-strong)] hover:bg-[color-mix(in_srgb,var(--camp-danger)_85%,white)]",
};

export const CampButton = forwardRef<HTMLButtonElement, CampButtonProps>(
  ({ intent = "primary", size = "md", className = "", ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)] disabled:cursor-not-allowed disabled:opacity-50 ${SIZE_CLASSES[size]} ${INTENT_CLASSES[intent]} ${className}`}
        {...rest}
      />
    );
  },
);

CampButton.displayName = "CampButton";
