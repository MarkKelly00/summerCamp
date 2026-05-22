"use client";

/**
 * Confetti — fullscreen one-shot celebration overlay.
 *
 * Used by the mini-game result screen on First Mastery. Renders 60-ish
 * colored squares that fall + rotate + fade. Auto-cleans after the
 * animation finishes. Respects `prefers-reduced-motion`.
 */

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = [
  "#fbbf24",
  "#34d399",
  "#f472b6",
  "#60a5fa",
  "#a78bfa",
  "#22d3ee",
  "#fb923c",
];

const COUNT = 80;

interface Props {
  /** When this changes, the confetti re-fires. */
  active: boolean;
}

export function Confetti({ active }: Props) {
  const reduceMotion = useReducedMotion();

  const pieces = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      id: i,
      startX: 50 + (Math.random() - 0.5) * 30, // vw, start near center top
      endX: Math.random() * 100, // vw, spread across the viewport
      delay: Math.random() * 0.3,
      duration: 1.5 + Math.random() * 1.2,
      rotateStart: Math.random() * 360,
      rotateEnd: Math.random() * 720 - 360,
      color: COLORS[i % COLORS.length],
      size: 6 + Math.random() * 6,
    }));
  }, []);

  if (reduceMotion || !active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          initial={{
            top: -20,
            left: `${p.startX}vw`,
            rotate: p.rotateStart,
            opacity: 1,
          }}
          animate={{
            top: "110vh",
            left: `${p.endX}vw`,
            rotate: p.rotateEnd,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size * 0.4,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}
