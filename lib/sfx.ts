/**
 * Procedural Sound Effects via the Web Audio API.
 *
 * Why procedural and not sample-based:
 *   - Zero ongoing cost (no ElevenLabs API hits).
 *   - Zero asset management (no public/sfx/*.mp3 to ship + cache).
 *   - 8-bit-game-friendly aesthetic that suits Number Muncher.
 *   - Loads instantly; no buffering delay before the first sound.
 *
 * Trade-off: you can't ship a recognizable mascot voice or "yum"
 * sample. If we ever want that, drop the mp3s in `public/sfx/` and
 * swap out the `playTone` calls.
 *
 * User control:
 *   - Mute persists in localStorage under `camp-sfx`. Default = on.
 *   - All entry points return early when muted, so callers don't need
 *     to gate themselves.
 *   - All entry points safe to call during SSR (return early when no
 *     `window`).
 */

const STORAGE_KEY = "camp-sfx";

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

/**
 * Browsers require a user gesture before audio plays. Call this from a
 * click/keydown handler on game start to "warm" the context.
 */
export function primeAudio(): void {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
}

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
    // localStorage unavailable; ignore.
  }
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
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  const now = ctx.currentTime + delay;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = spec.type ?? "sine";
  osc.frequency.setValueAtTime(spec.freq, now);
  if (spec.endFreq) {
    osc.frequency.exponentialRampToValueAtTime(spec.endFreq, now + spec.duration);
  }
  const peakGain = spec.gain ?? 0.18;
  // Quick attack, exponential decay — avoids clicks at start/end.
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peakGain, now + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + spec.duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + spec.duration + 0.02);
}

// ----- Public entry points -------------------------------------------------

export function sfxMunch(): void {
  if (!isSfxEnabled()) return;
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
  // C major arpeggio: C5 (523) → E5 (659) → G5 (784) → C6 (1047).
  playTone({ freq: 523, duration: 0.1, type: "sine", gain: 0.18 }, 0);
  playTone({ freq: 659, duration: 0.1, type: "sine", gain: 0.18 }, 0.09);
  playTone({ freq: 784, duration: 0.1, type: "sine", gain: 0.2 }, 0.18);
  playTone({ freq: 1047, duration: 0.32, type: "sine", gain: 0.22 }, 0.27);
}

export function sfxLevelUp(): void {
  if (!isSfxEnabled()) return;
  playTone({ freq: 660, duration: 0.08, type: "triangle", gain: 0.18 }, 0);
  playTone({ freq: 880, duration: 0.14, type: "triangle", gain: 0.2 }, 0.07);
}

export function sfxClick(): void {
  if (!isSfxEnabled()) return;
  playTone({ freq: 440, duration: 0.04, type: "sine", gain: 0.08 });
}
