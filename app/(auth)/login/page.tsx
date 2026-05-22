import { LoginForm } from "./login-form";
import { CampCard, CampKicker } from "@/components/ui/CampCard";

export const metadata = {
  title: "Sign in — Summer Camp 2026",
};

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6 py-12">
      <CampCard>
        <CampKicker>Summer Camp 2026</CampKicker>
        <h1 className="mt-2 text-2xl font-bold">Welcome back, camper.</h1>
        <p className="mt-1 text-sm text-camp-ink-muted">
          Sign in to keep your streak going.
        </p>
        <LoginForm />
      </CampCard>
      <p className="mt-3 text-center text-[0.7rem] text-camp-ink-muted/80">
        For the Kelly family · Addie &amp; Dean
      </p>
    </main>
  );
}
