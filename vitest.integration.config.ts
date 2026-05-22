import { defineConfig } from "vitest/config";
import path from "node:path";

/**
 * Integration test config — boots a mongodb-memory-server replica set in
 * globalSetup so Server Action tests can use Mongoose transactions.
 *
 * Run with: npm run test:integration
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/integration/**/*.test.ts"],
    globalSetup: ["./tests/global-setup-integration.ts"],
    setupFiles: ["./tests/setup-integration.ts"],
    testTimeout: 30_000,
    hookTimeout: 90_000,
    fileParallelism: false,
    pool: "forks",
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
  },
});
