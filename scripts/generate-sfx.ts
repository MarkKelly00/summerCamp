/**
 * Generate sound effects via ElevenLabs and save them to `public/sfx/`.
 *
 * Setup:
 *   1. Get an ElevenLabs API key: https://elevenlabs.io → Profile → API Keys.
 *   2. Add it to `.env`:
 *        ELEVENLABS_API_KEY=sk_...
 *   3. Run:
 *        npx tsx scripts/generate-sfx.ts
 *   4. The script writes mp3s to `public/sfx/`. The next time anyone
 *      loads a mini-game, `lib/sfx.ts` will auto-detect the files and
 *      use them instead of the procedural fallback.
 *
 * Idempotent: skips files that already exist on disk. Pass `--force`
 * to overwrite them.
 *
 * Costs: each call hits the ElevenLabs Sound Effects API. ~5 effects
 * is well under a free-tier allotment, but each call counts toward your
 * monthly character usage. Check pricing before regenerating in bulk.
 */

import "dotenv/config";

import { existsSync, mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";

interface SfxSpec {
  /** File name — must match the keys in `REAL_SFX` in lib/sfx.ts. */
  name: string;
  /** Description handed to ElevenLabs. Be specific about timbre + length. */
  prompt: string;
  /** Target duration in seconds (ElevenLabs allows 0.5–22). */
  durationSeconds: number;
}

const SFX_TO_GENERATE: SfxSpec[] = [
  {
    name: "munch",
    prompt:
      "Short, satisfying 8-bit arcade game eating sound, like Pac-Man munching a dot. A small playful chomp lasting one-tenth of a second, low-pitch, no music.",
    durationSeconds: 0.5,
  },
  {
    name: "wrong",
    prompt:
      "Short, friendly 8-bit error buzz from a kid's video game. A descending two-tone bloop, not harsh or scary, lasting about a quarter second.",
    durationSeconds: 0.5,
  },
  {
    name: "mastery",
    prompt:
      "Cheerful triumphant arcade win jingle, ascending major chord arpeggio in chiptune style, like clearing a level in a Mario or Zelda game. Bright and uplifting, about 1 second long.",
    durationSeconds: 1.2,
  },
  {
    name: "level-up",
    prompt:
      "Quick two-note positive ding, similar to receiving an item in a Nintendo game. Bright and short, about half a second.",
    durationSeconds: 0.6,
  },
  {
    name: "click",
    prompt:
      "Very short clean UI click sound, like a soft button tap. Sub-100ms duration, no reverb, no pitch.",
    durationSeconds: 0.3,
  },
];

const FORCE = process.argv.includes("--force");

async function main(): Promise<void> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error(
      "[generate-sfx] ELEVENLABS_API_KEY is not set. Add it to .env and re-run.",
    );
    process.exit(1);
  }

  const outDir = resolve(process.cwd(), "public/sfx");
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
    console.log(`[generate-sfx] Created ${outDir}`);
  }

  for (const spec of SFX_TO_GENERATE) {
    const outPath = resolve(outDir, `${spec.name}.mp3`);
    if (existsSync(outPath) && !FORCE) {
      console.log(`[generate-sfx] Skipping ${spec.name} (exists; --force to overwrite)`);
      continue;
    }

    console.log(`[generate-sfx] Generating ${spec.name}...`);
    const res = await fetch(
      "https://api.elevenlabs.io/v1/sound-generation",
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: spec.prompt,
          duration_seconds: spec.durationSeconds,
          prompt_influence: 0.6,
        }),
      },
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error(
        `[generate-sfx] Failed ${spec.name}: ${res.status} ${res.statusText}\n${errText}`,
      );
      continue;
    }

    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(outPath, buf);
    console.log(`[generate-sfx]   → ${outPath} (${buf.length} bytes)`);
  }

  console.log("\n[generate-sfx] Done.");
  console.log(
    "[generate-sfx] Commit the new files in public/sfx/ to ship them via Vercel.",
  );
}

main().catch((err) => {
  console.error("[generate-sfx] FAILED:", err);
  process.exit(1);
});
