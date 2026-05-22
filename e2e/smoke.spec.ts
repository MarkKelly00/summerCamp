/**
 * Phase 9 E2E smoke — boots the dev server, hits the public surfaces,
 * and walks the unauthenticated-redirect contract for the camper +
 * parent + admin routes.
 *
 * Full happy-path tests (Dean completes a Number Muncher lesson; Mark
 * approves a reward) require deterministic seeded test fixtures and a
 * way to mint a session cookie from the test process. Both land in a
 * follow-up after a test-only `/api/test/login` helper is added.
 */

import { expect, test } from "@playwright/test";

test.describe("public surfaces", () => {
  test("home renders the camp landing", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /trail is open/i }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /sign in/i })).toBeVisible();
  });

  test("login page renders the form with proper labels", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
  });

  test("health endpoint returns OK + connected DB", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.db).toBe("connected");
  });
});

test.describe("auth redirects", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  const protectedRoutes = [
    "/student/dashboard",
    "/student/mini-games",
    "/student/rewards",
    "/student/lesson/dean-w1-d1-place-value",
    "/parent/dashboard",
    "/parent/approvals",
    "/admin",
    "/admin/lessons",
    "/admin/rewards",
  ];

  for (const path of protectedRoutes) {
    test(`unauthenticated ${path} bounces to /login`, async ({ page }) => {
      // Use `waitUntil: 'domcontentloaded'` so we land on the actual
      // /login page rather than waiting for full network idle.
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(/\/login\?next=/);
    });
  }
});
