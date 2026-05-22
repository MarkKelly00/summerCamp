# Summer Camp 2026 — Deploy Guide

Target platform: **Vercel** + **MongoDB Atlas**.

This guide assumes the legacy Heroku app is still running on
`summer-camp-764ef7b73bd1.herokuapp.com` and that you want to bring up
the Next.js 16 app alongside it before cutting over.

---

## 1. Pre-flight checklist

Run these locally before pushing:

```bash
npm install
npx tsc --noEmit          # → clean
npm test                  # → 29/29 unit tests passing
npm run test:integration  # → 11/11 integration tests passing (≈5s incl. mongo boot)
npm run build             # → 18 routes register, all dynamic routes correctly marked ƒ
```

If any of those fail, do **not** deploy.

---

## 2. MongoDB Atlas

You're already using Atlas (the legacy app connects there). The new
Next.js app can share the same database — both stacks coexist during
the migration window.

### Network access

Vercel issues lambdas from dynamic IPs that change. Either:

- **Recommended (private family app)**: Allow `0.0.0.0/0` in Atlas
  **Network Access**. Connection security comes from the long random
  password in the connection string + SCRAM auth. Document this choice
  in your Atlas access log.
- **Alternative (if you ever want to tighten)**: enable Vercel's
  static-IP add-on or run an intermediary, then narrow the allowlist.
  Don't bother unless you have a specific reason.

### Connection string

In Atlas → Database → Connect → Drivers, copy the SRV string. It looks
like:

```
mongodb+srv://USER:PASSWORD@cluster.xxxxx.mongodb.net/summercamp?retryWrites=true&w=majority&appName=SummerCamp
```

Use a **dedicated user** for the new app (separate from the legacy
Heroku user) so credentials can be rotated independently. Grant
`readWrite` on the `summercamp` database only.

### Transactions

Atlas replica sets support transactions out of the box. The new app
uses them in every money-path Server Action via `lib/db/transaction.ts`.
No extra config needed.

---

## 3. Vercel project

### Initial linking

1. Create a Vercel account (or sign in) at <https://vercel.com>.
2. Import the GitHub repo: `MarkKelly00/summerCamp`.
3. **Framework Preset**: Next.js (auto-detected).
4. **Root Directory**: leave at repo root.
5. **Build Command**: `npm run build` (default).
6. **Output Directory**: `.next` (default).
7. **Install Command**: `npm install` (default).
8. **Node.js Version**: 20.x or higher (matches `package.json` engines).

### Environment variables

Add the following in **Project → Settings → Environment Variables**.
Set them for **Production**, **Preview**, and (optionally)
**Development**. The dev set is only used by `vercel dev`, which we
don't currently rely on.

| Name | Example | Notes |
|---|---|---|
| `MONGODB_URI` | `mongodb+srv://summer-camp-app:PASS@cluster.xxxxx.mongodb.net/summercamp?retryWrites=true&w=majority` | Use a dedicated DB user. |
| `AUTH_SECRET` | `openssl rand -base64 48` output | Long random string. Different per environment is fine but the kids will need to re-login if you rotate prod. |
| `NEXT_PUBLIC_APP_URL` | `https://summercamp.kelly.family` (or the `vercel.app` URL until you point your domain) | Used in absolute links. |

Do **not** set `NODE_ENV`. Vercel sets it automatically (`production`
for prod, `development` for `vercel dev`).

The legacy server reads `JWT_SECRET` and `PORT` — those stay on Heroku.
You don't need them on Vercel.

### Domain (optional)

If you want a custom domain (e.g. `summercamp.kelly.family`):

1. Vercel → Project → Settings → Domains → Add.
2. Add the CNAME / A records they show you in your DNS provider.
3. Vercel auto-issues a TLS certificate.

Update `NEXT_PUBLIC_APP_URL` to the new domain once it resolves.

### Deploy

- **Production deploys** trigger on push to `main`.
- **Preview deploys** trigger on every PR.
- The first prod deploy is manual via the Vercel dashboard ("Deploy" on
  the project page) after env vars are set.

---

## 4. Post-deploy smoke tests

Run through these in the production URL after the first deploy:

1. `GET /api/health` → `{ "ok": true, "db": "connected", "latencyMs": <number> }`.
2. `GET /` → camp landing page renders with the right theme.
3. Visit `/student/dashboard` while signed out → bounces to
   `/login?next=/student/dashboard`.
4. Sign in as **Mark** (`admin`):
   - Parent dashboard shows both kids' cards with stats + heatmaps.
   - `/admin/lessons` lists every lesson, filters work.
   - `/admin/rewards` lists the catalog.
   - `/api/admin/lessons/export` downloads a JSON file.
   - Theme switcher in the header changes the palette + persists on reload.
5. Sign in as **Addie** (or **Dean**):
   - Student dashboard shows their adventure map.
   - "Play a mini-game" → lists the right games for their track.
   - **Play Number Muncher / Knoword and reach mastery** — verify
     XP, Fun Money, and Level update.
   - Replay the same game — Fun Money does **not** increase a second
     time (idempotency on `MiniGameAttempt.isFirstMastery`).
   - Open `/student/lesson/<some-slug>` and walk the player end-to-end.
     Verify the result screen shows XP/Fun Money/streak.
6. Sign in as Mark and visit `/parent/approvals`:
   - Any redemption requests from the kids appear with Approve/Reject.
   - **Reject one** — Fun Money refunds back to the kid's wallet.

If any of the above fails, see the Rollback section.

---

## 5. Data setup on a fresh DB

If you ever stand up a new Atlas cluster (or a staging cluster), seed
it in this order:

```bash
# 1. Set MONGODB_URI to the target cluster (in your local .env.local).

# 2. (If migrating from a legacy DB) run the additive migrations:
npx tsx scripts/migrations/2026-01-add-parent-role.ts
npx tsx scripts/migrations/2026-02-extend-schemas.ts

# 3. Seed Summer 2026 curriculum (idempotent — safe to re-run):
npm run seed:2026

# 4. Verify counts match expected:
npx tsx scripts/verify-phase-3.ts
npx tsx scripts/verify-phase-4.ts
```

Existing legacy data (users, progress) is preserved by step 2; step 3
only adds the new 80 lessons + 13 mini-games + 18 badges + 10 rewards.

---

## 6. Rollback procedure

The legacy Heroku app remains live until you explicitly retire it.
If the Next.js deploy has issues:

1. **Vercel dashboard** → Project → Deployments → click the previous
   green deploy → "Promote to Production". Instant.
2. If the new app is fundamentally broken (e.g. money path bug found
   in prod), temporarily point users at the legacy URL while you fix.
3. The legacy app keeps reading the same Atlas database, so existing
   user accounts and progress remain accessible.

Database rollback is more careful — see the Heroku decommission doc.

---

## 7. Heroku decommission

**Do not turn off Heroku immediately.** Run both stacks in parallel for
**at least one week** of normal use to confirm parity. See
[`docs/heroku-decommission.md`](docs/heroku-decommission.md) for the
exact runbook.

---

## 8. Operational notes

### Cold starts

The cached Mongoose connection in `lib/db/mongoose.ts` keeps the
warm-start path fast (<50 ms). Cold starts include the Atlas TLS
handshake, typically 1.5–3 s. Acceptable for a family app.

### Logs

- Vercel → Project → Logs → filter by Function path.
- The Server Actions log structured errors with the action prefix:
  `[awardLessonCompletion] failed:`, `[requestRedemption] failed:`, etc.
- Mongo connection errors surface in `/api/health` with `ok: false`.

### Sessions

- Cookie name: `summer-camp-session`.
- 7-day expiry, httpOnly, SameSite=Lax, Secure in production.
- Rotating `AUTH_SECRET` invalidates all sessions — everyone re-logs in.

### Backups

- Atlas: enable continuous cloud backups in the cluster settings (free
  on M0, paid on dedicated tiers). Restore from there in a disaster.
- Lesson catalog: download
  `GET /api/admin/lessons/export` weekly as a poor-person's git-able
  JSON snapshot. The file is also included in any Atlas backup.

---

## 9. Troubleshooting

### "MONGODB_URI is not set" on /api/health

Vercel env vars not configured. Set them in the project settings and
**redeploy** (env var changes need a new build).

### "AUTH_SECRET must be set to a long random string (32+ chars)"

Same — set the env var and redeploy.

### Login form submits but nothing happens / hangs

- Check Vercel Function logs for the login Server Action.
- Most common cause: `AUTH_SECRET` is missing or too short, so
  `signSession` throws. The form swallows that into a generic error.

### Sessions don't persist across requests

- Verify cookies are being set: open devtools → Application → Cookies →
  look for `summer-camp-session`. If absent, the Server Action likely
  errored before setting it.
- In Safari, third-party cookies are blocked aggressively. The app is
  first-party so this shouldn't matter — but if you embed in an iframe
  somewhere, it would.

### "MongoServerError: Authentication failed"

Wrong username/password in `MONGODB_URI`. Atlas → Database Access →
verify the user exists with the right role.

### Lessons don't show on the student dashboard

- Verify lessons have `published: true` (or unset → defaults to true).
- Verify lessons have `learningTrack` set to match the student's track.
- Verify slugs start with the student's prefix
  (`dean-` for entering-3rd, `addie-` for entering-5th). Run
  `scripts/verify-phase-4.ts` to spot-check.

### Redemption stuck pending

- Mark must sign in as the **admin** account and visit
  `/parent/approvals` to approve. The kid can't self-approve.
- If the queue is empty when it shouldn't be, check the family link:
  the redemption's `userId` must reference a kid whose `familyId`
  matches Mark's `familyId`. Run `scripts/verify-phase-3.ts`.
