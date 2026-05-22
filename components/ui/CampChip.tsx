/**
 * Compact status chip — used for lesson type, mastery level, redemption
 * status, etc. Variants reference theme tokens so chips never look out
 * of place across themes.
 */

import type { HTMLAttributes, ReactNode } from "react";

type Tone = "neutral" | "accent" | "positive" | "warning" | "danger" | "quest";

const TONE_CLASSES: Record<Tone, string> = {
  neutral:
    "bg-[var(--camp-surface-soft)] text-camp-ink-muted border border-[var(--camp-border)]",
  accent:
    "bg-[var(--camp-accent)]/15 text-[var(--camp-accent)] border border-[var(--camp-accent)]/40",
  positive:
    "bg-[var(--camp-positive)]/15 text-[var(--camp-positive)] border border-[var(--camp-positive)]/40",
  warning:
    "bg-[var(--camp-warning)]/15 text-[var(--camp-warning)] border border-[var(--camp-warning)]/40",
  danger:
    "bg-[var(--camp-danger)]/15 text-[var(--camp-danger)] border border-[var(--camp-danger)]/40",
  quest:
    "bg-[var(--camp-quest)]/15 text-[var(--camp-quest)] border border-[var(--camp-quest)]/40",
};

interface CampChipProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  icon?: ReactNode;
}

export function CampChip({
  tone = "neutral",
  icon,
  children,
  className = "",
  ...rest
}: CampChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${TONE_CLASSES[tone]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
