"use server";

/**
 * Auth Server Actions: loginAction, logoutAction.
 *
 * Registration is parent-gated and lands in a follow-up of Phase 2 — for
 * Summer 2026 the kids' accounts already exist in the legacy DB and Mark
 * upgrades them via the migration script, not via a public signup form.
 */

import { redirect } from "next/navigation";

import { setSession, clearSession } from "@/lib/auth/cookies";
import { connectToDatabase } from "@/lib/db/mongoose";
import { User } from "@/lib/db/models/User";
import { LoginSchema } from "@/lib/schemas/auth";

export interface LoginActionState {
  ok: boolean;
  error?: string;
}

const GENERIC_LOGIN_ERROR = "Invalid username or password.";

export async function loginAction(
  _previous: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const parsed = LoginSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    // Don't echo Zod's per-field errors verbatim — keep the failure surface
    // generic so bots can't probe for valid usernames.
    return { ok: false, error: GENERIC_LOGIN_ERROR };
  }

  await connectToDatabase();
  const user = await User.findOne({ username: parsed.data.username });
  if (!user) {
    return { ok: false, error: GENERIC_LOGIN_ERROR };
  }

  const valid = await user.comparePassword(parsed.data.password);
  if (!valid) {
    return { ok: false, error: GENERIC_LOGIN_ERROR };
  }

  await setSession({
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  });

  // Redirect into the role's home. `redirect()` throws a special
  // NEXT_REDIRECT error that Next's runtime intercepts — control does not
  // return to this function.
  if (user.role === "student") {
    redirect("/student/dashboard");
  }
  redirect("/parent/dashboard");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/login");
}
