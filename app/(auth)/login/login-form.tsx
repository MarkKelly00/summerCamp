"use client";

/**
 * Client-side login form. Wraps the loginAction Server Action with
 * `useActionState` so we can render server-returned errors inline without
 * losing the user's typed username on a failed submit.
 *
 * Accessibility:
 *   - Each input has an associated <label>.
 *   - Error region uses role="alert" and aria-live="assertive".
 *   - Submit button shows a pending state via useFormStatus.
 *   - All inputs are keyboard-navigable; focus ring is visible.
 */

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { loginAction, type LoginActionState } from "@/lib/actions/auth";

const INITIAL_STATE: LoginActionState = { ok: true };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center rounded-lg bg-[var(--camp-accent)] px-4 py-2.5 text-sm font-bold text-[var(--camp-surface-strong)] shadow-camp-glow transition hover:bg-[var(--camp-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, INITIAL_STATE);

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-camp-ink"
        >
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          maxLength={30}
          aria-invalid={!state.ok}
          className="mt-1 block w-full rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-2 text-sm text-camp-ink placeholder:text-camp-ink-muted/60 focus:border-[var(--camp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--camp-accent)]"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-camp-ink"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          minLength={6}
          aria-invalid={!state.ok}
          className="mt-1 block w-full rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-2 text-sm text-camp-ink placeholder:text-camp-ink-muted/60 focus:border-[var(--camp-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--camp-accent)]"
        />
      </div>

      {state.error ? (
        <p
          role="alert"
          aria-live="assertive"
          className="rounded-md border border-[var(--camp-danger)]/50 bg-[var(--camp-danger)]/15 px-3 py-2 text-sm text-camp-ink"
        >
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
