import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config — scaffold for end-to-end tests in Phase 9.
 *
 * One smoke test ships today (`e2e/smoke.spec.ts`); the full suite
 * (Dean completes a Number Muncher lesson, parent approves a reward,
 * etc.) lands in a follow-up that also seeds a deterministic test
 * fixture user pair.
 *
 * Run: `npm run test:e2e`
 */

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  timeout: 30_000,

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
