/**
 * Vitest globalSetup — boots a mongodb-memory-server replica set so the
 * Server Action tests can use Mongoose transactions.
 *
 * Runs once per `npm run test:integration` invocation. Workers inherit
 * the env vars set here.
 */

import { MongoMemoryReplSet } from "mongodb-memory-server";

let replSet: MongoMemoryReplSet | null = null;

export async function setup(): Promise<void> {
  // A 1-node replica set is the minimum required for transaction support
  // in MongoDB. Cheap to spin up locally.
  replSet = await MongoMemoryReplSet.create({
    replSet: { count: 1, storageEngine: "wiredTiger" },
    // Bump the per-transaction lock acquisition timeout. The mongod
    // default is 5 ms which is too tight when the test's afterEach
    // is still flushing prior writes as the next test starts its
    // transaction. The production fix is `Session.withTransaction`
    // (auto-retry on TransientTransactionError) — TODO for a later
    // resilience pass.
    instanceOpts: [
      {
        args: [
          "--setParameter",
          "maxTransactionLockRequestTimeoutMillis=5000",
        ],
      },
    ],
  });
  const uri = replSet.getUri();
  process.env.MONGODB_URI = uri;
  process.env.AUTH_SECRET =
    "test-auth-secret-padded-to-at-least-thirty-two-chars";
  // `process.env.NODE_ENV` is declared readonly in @types/node; bypass
  // via Object.assign so tests can mark the runtime as test.
  Object.assign(process.env, { NODE_ENV: "test" });
  // Print so it's obvious which URI tests are using.
  // eslint-disable-next-line no-console
  console.log(`[integration] Mongo replSet up at ${uri}`);
}

export async function teardown(): Promise<void> {
  if (replSet) {
    await replSet.stop();
    replSet = null;
  }
}
