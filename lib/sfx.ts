/**
 * Sound effects.
 *
 * Tiered loader:
 *   1. If `public/sfx/<name>.mp3` exists on the server, play it.
 *      (Generated via `scripts/generate-sfx.ts` using ElevenLabs.)
 *   2. Otherwise fall back to a procedurally-synthesized Web Audio tone.
 *
 * Both paths respect the user's mute preference (localStorage `camp-sfx`).
 * All entry points are SSR-safe.
 *
 * Why a fallback at all? Two reasons:
 *   - Day-1 deploys may not have audio files yet. Procedural sounds
 *     ship in the bundle and work immediately.
 *   - Files can fail to load (network, 404). The procedural path keeps
 *     the game's feedback loop alive even when audio assets break.
 */

const STORAGE_KEY = "camp-sfx";

// ----- Real-file layer ---------------------------------------------------

const REAL_SFX: Record<string, string> = {
  munch: "/sfx/munch.mp3",
  wrong: "/sfx/wrong.mp3",
  mastery: "/sfx/mastery.mp3",
  levelUp: "/sfx/level-up.mp3",
  click: "/sfx/click.mp3",
};

type CacheEntry = HTMLAudioElement | "missing" | "loading";
const audioCache: Record<string, CacheEntry> = {};

function tryPlayReal(name: keyof typeof REAL_SFX): boolean {
  if (typeof window === "undefined") return false;
  const cached = audioCache[name];

  if (cached === "missing") return false;

  if (cached && cached !== "loading") {
    cached.currentTime = 0;
    cached.play().catch(() => {
      audioCache[name] = "missing";
    });
    return true;
  }

  if (cached === "loading") return true; // first call in flight

  // First call: kick off the load. The first sound after page load may
  // be silent if the file isn't cached yet; subsequent ones play.
  audioCache[name] = "loading";
  const audio = new Audio(REAL_SFX[name]);
  audio.volume = 0.5;
  audio.preload = "auto";
  audio.addEventListener(
    "error",
    () => {
      audioCache[name] = "missing";
    },
    { once: true },
  );
  audio.addEventListener(
    "canplaythrough",
    () => {
      audioCache[name] = audio;
    },
    { once: true },
  );
  // Attempt immediate play; harmless if not yet decodable.
  audio.play().catch(() => {
    // Will fall through to procedural the first time; future calls work.
  });
  return true;
}

// ----- Procedural Web Audio layer ----------------------------------------

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioCtx && audioCtx.state !== "closed") return audioCtx;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  audioCtx = new Ctx();
  return audioCtx;
}

export function primeAudio(): void {
  const ctx = getCtx();
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

interface ToneSpec {
  freq: number;
  duration: number;
  type?: OscillatorType;
  endFreq?: number;
  gain?: number;
}

function playTone(spec: ToneSpec, delay = 0): void {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = spec.type ?? "sine";
  osc.frequency.setValueAtTime(spec.freq, now);
  if (spec.endFreq) {
    osc.frequency.exponentialRampToValueAtTime(spec.endFreq, now + spec.duration);
  }
  const peakGain = spec.gain ?? 0.18;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + spec.duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + spec.duration + 0.02);
}

// ----- Public toggle -----------------------------------------------------

export function isSfxEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSfxEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    /* ignore */
  }
}

// ----- Public entry points -----------------------------------------------

export function sfxMunch(): void {
  if (!isSfxEnabled()) return;
  if (tryPlayReal("munch")) return;
  playTone({
    freq: 600,
    endFreq: 200,
    duration: 0.12,
    type: "square",
    gain: 0.14,
  });
}

export function sfxWrong(): void {
  if (!isSfxEnabled()) return;
  if (tryPlayReal("wrong")) return;
  playTone({
    freq: 280,
    endFreq: 70,
    duration: 0.25,
    type: "sawtooth",
    gain: 0.16,
  });
}

export function sfxMastery(): void {
  if (!isSfxEnabled()) return;
  if (tryPlayReal("mastery")) return;
  playTone({ freq: 523, duration: 0.1, type: "sine", gain: 0.18 }, 0);
  playTone({ freq: 659, duration: 0.1, type: "sine", gain: 0.18 }, 0.09);
  playTone({ freq: 784, duration: 0.1, type: "sine", gain: 0.2 }, 0.18);
  playTone({ freq: 1047, duration: 0.32, type: "sine", gain: 0.22 }, 0.27);
}

export function sfxLevelUp(): void {
  if (!isSfxEnabled()) return;
  if (tryPlayReal("levelUp")) return;
  playTone({ freq: 660, duration: 0.08, type: "triangle", gain: 0.18 }, 0);
  playTone({ freq: 880, duration: 0.14, type: "triangle", gain: 0.2 }, 0.07);
}

export function sfxClick(): void {
  if (!isSfxEnabled()) return;
  if (tryPlayReal("click")) return;
  playTone({ freq: 440, duration: 0.04, type: "sine", gain: 0.08 });
}
