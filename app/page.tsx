import Link from "next/link";

import { CampCard, CampKicker } from "@/components/ui/CampCard";
import { CampButton } from "@/components/ui/CampButton";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-12 text-center">
      <CampCard className="w-full">
        <CampKicker>Summer Camp 2026</CampKicker>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          The trail is open.
        </h1>
        <p className="mx-auto mt-3 max-w-prose text-sm text-camp-ink-muted sm:text-base">
          Eight weeks of math, science, reading, writing, history, and
          engineering — laid out as a quest map with mini-games, badges, and
          a real prize shop.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/login">
            <CampButton intent="primary" size="lg">
              Sign in
            </CampButton>
          </Link>
          <Link href="/api/health">
            <CampButton intent="secondary">Health check</CampButton>
          </Link>
        </div>
      </CampCard>
    </main>
  );
}
