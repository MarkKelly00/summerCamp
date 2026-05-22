import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Base Vitest config. Unit tests run with `npm run test:unit`,
 * integration tests with `npm run test:integration`. The integration
 * config (vitest.integration.config.ts) extends this one and adds
 * mongodb-memory-server lifecycle hooks.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    globals: false,
    testTimeout: 5_000,
  },
});
