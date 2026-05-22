/**
 * AppShell — consistent chrome around every authenticated page.
 *
 * Server Component so it can render the user's name + role chip without
 * an extra round-trip. The theme switcher + sign-out form are sub-client
 * components.
 */

import Link from "next/link";

import { logoutAction } from "@/lib/actions/auth";
import { SfxToggle } from "./SfxToggle";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface AppShellProps {
  children: React.ReactNode;
  /** Greeting shown to the user, e.g. "Camper Dean" or "Parent — Mark". */
  identity: { line1: string; line2?: string };
  /** Nav links shown on the right of the shell header. */
  nav?: { href: string; label: string }[];
}

export function AppShell({ children, identity, nav = [] }: AppShellProps) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col">
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 pb-4 pt-6 sm:px-8 sm:pt-8">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-camp-ink-muted">
            Summer Camp 2026
          </p>
          <h2 className="text-xl font-bold leading-tight">{identity.line1}</h2>
          {identity.line2 ? (
            <p className="text-xs text-camp-ink-muted">{identity.line2}</p>
          ) : null}
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-1.5 text-xs font-semibold text-camp-ink-muted transition hover:text-camp-ink hover:bg-[var(--camp-surface)]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)]"
            >
              {n.label}
            </Link>
          ))}
          <SfxToggle />
          <ThemeSwitcher />
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-[var(--camp-border)] bg-[var(--camp-surface-soft)] px-3 py-1.5 text-xs font-semibold text-camp-ink-muted transition hover:text-camp-ink hover:bg-[var(--camp-surface)]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--camp-accent)]"
            >
              Sign out
            </button>
          </form>
        </nav>
      </header>

      <main className="flex-1 px-4 pb-16 sm:px-8">{children}</main>

      <footer className="px-4 pb-6 pt-2 text-center text-xs text-camp-ink-muted/70 sm:px-8">
        Made for Addie and Dean · Summer Camp 2026
      </footer>
    </div>
  );
}
