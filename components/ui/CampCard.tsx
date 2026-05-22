/**
 * Lightweight card primitives. Style is driven by the CSS variables in
 * app/globals.css so a theme swap flows through automatically.
 */

import type { HTMLAttributes } from "react";

type DivProps = HTMLAttributes<HTMLDivElement>;

export function CampCard({ className = "", ...rest }: DivProps) {
  return <div className={`camp-card p-6 ${className}`} {...rest} />;
}

export function CampCardSoft({ className = "", ...rest }: DivProps) {
  return <div className={`camp-card-soft p-4 ${className}`} {...rest} />;
}

export function CampKicker({
  className = "",
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted ${className}`}
      {...rest}
    />
  );
}
