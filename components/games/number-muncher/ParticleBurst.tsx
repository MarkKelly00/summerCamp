"use client";

/**
 * ParticleBurst — small colored squares fly outward from a point.
 *
 * Spawns a fixed set of particles, animates them with framer-motion to a
 * random outward angle, fades them out, then removes itself via the
 * parent's timeout. Pure visual effect — no game state changes.
 *
 * Respects `prefers-reduced-motion` by rendering nothing (a stationary
 * particle burst would be visual noise, not useful information).
 */

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLORS = [
  "#fbbf24", // accent yellow
  "#34d399", // positive green
  "#f472b6", // pink
  "#60a5fa", // sky blue
  "#a78bfa", // violet
];

const PARTICLE_COUNT = 10;

interface Props {
  /** Reset key — change to spawn a fresh burst */
  burstKey: string | number;
}

export function ParticleBurst({ burstKey }: Props) {
  const reduceMotion = useReducedMotion();

  // Pre-compute random vectors so each particle has a distinct trajectory.
  // useMemo keyed on burstKey re-shuffles on every new burst.
  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const angle = (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.4;
      const distance = 28 + Math.random() * 14;
      return {
        id: i,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance,
        color: COLORS[i % COLORS.length],
        rotation: (Math.random() - 0.5) * 180,
        size: 4 + Math.random() * 3,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [burstKey]);

  if (reduceMotion) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
          animate={{
            x: p.dx,
            y: p.dy,
            opacity: 0,
            rotate: p.rotation,
            scale: 0.4,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute rounded-sm"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
        />
      ))}
    </div>
  );
}
