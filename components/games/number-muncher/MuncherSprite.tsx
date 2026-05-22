"use client";

/**
 * MuncherSprite — the green creature that sits on the active cell.
 *
 * Three visual states driven by the parent:
 *   - "idle": small closed mouth, gentle bob
 *   - "munching": wide mouth open, scaled up briefly
 *   - "wrong": red flash + shake (parent applies the shake)
 *
 * Rendered as inline SVG so it inherits theme colors via currentColor
 * and scales cleanly. ~40px square at default.
 */

import { motion } from "framer-motion";

export type MuncherState = "idle" | "munching" | "wrong";

interface Props {
  state: MuncherState;
  size?: number;
}

export function MuncherSprite({ state, size = 44 }: Props) {
  const isMunching = state === "munching";
  const isWrong = state === "wrong";

  // Mouth path opens wider when munching.
  const mouthPath = isMunching
    ? "M 50 50 L 95 28 L 95 72 Z" // wide wedge
    : "M 50 50 L 92 44 L 92 56 Z"; // narrow slit

  return (
    <motion.svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      aria-hidden="true"
      className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      animate={
        isWrong
          ? { scale: [1, 1.1, 1], rotate: [0, -8, 8, -4, 0] }
          : isMunching
            ? { scale: [1, 1.15, 1] }
            : { scale: [1, 1.04, 1] }
      }
      transition={{
        duration: isWrong ? 0.32 : isMunching ? 0.22 : 1.4,
        repeat: isWrong || isMunching ? 0 : Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Body — green when idle/munching, red when wrong */}
      <circle
        cx="50"
        cy="50"
        r="42"
        fill={isWrong ? "var(--camp-danger)" : "#4ade80"}
        stroke="#166534"
        strokeWidth="3"
      />
      {/* Eye whites */}
      <circle cx="62" cy="36" r="10" fill="white" stroke="#166534" strokeWidth="2" />
      {/* Pupil — looks toward the mouth when munching */}
      <circle
        cx={isMunching ? 67 : 64}
        cy={isMunching ? 38 : 36}
        r="5"
        fill="#0f172a"
      />
      {/* Tiny shine on pupil */}
      <circle cx={isMunching ? 69 : 66} cy={isMunching ? 36 : 34} r="1.5" fill="white" />
      {/* Mouth — animated path */}
      <motion.path
        d={mouthPath}
        fill="#0a1130"
        stroke="#166534"
        strokeWidth="2"
        strokeLinejoin="round"
        animate={{ d: mouthPath }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
      {/* Tongue when munching */}
      {isMunching ? (
        <ellipse cx="78" cy="58" rx="8" ry="4" fill="#fca5a5" />
      ) : null}
    </motion.svg>
  );
}
