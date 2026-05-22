/**
 * Shared transaction helper.
 *
 * Wraps Mongoose's `session.withTransaction` so callers get automatic
 * retry on `TransientTransactionError` (catalog changes, lock timeouts,
 * write conflicts on retry-eligible operations).
 *
 * Callback contract:
 *   - Use the provided `ClientSession` on every read/write so writes
 *     join the transaction.
 *   - Throw to abort. The thrown error propagates out of `runInTx`.
 *   - Return any value to commit; that value is the return of `runInTx`.
 *
 * Used by every money-path Server Action.
 */

import mongoose, { type ClientSession } from "mongoose";

export async function runInTx<T>(
  fn: (session: ClientSession) => Promise<T>,
): Promise<T> {
  const session = await mongoose.startSession();
  try {
    let result!: T;
    await session.withTransaction(async () => {
      result = await fn(session);
    });
    return result;
  } finally {
    await session.endSession();
  }
}

/**
 * Sentinel error used to signal "the transaction succeeded as-far-as
 * we got, but the caller should treat this as a graceful refusal rather
 * than a server failure." Catch in the action and return ok:false.
 */
export class GracefulAbortError extends Error {
  constructor(public reason: string) {
    super(reason);
    this.name = "GracefulAbortError";
  }
}
