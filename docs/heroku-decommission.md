# Heroku decommission runbook

**Do not execute this until** the Vercel-hosted Next.js app has been
running cleanly in production for at least one week of normal family
use, and you've confirmed every item in the "Post-deploy smoke" section
of [DEPLOY.md](../DEPLOY.md).

---

## Pre-decommission readiness gate

| Check | How to verify | Status |
|---|---|:---:|
| Mark, Addie, Dean have each completed at least one lesson on the new app | Sign in as each, open `/student/dashboard`, see at least one mastered cell | ☐ |
| At least one reward has been requested + approved + fulfilled via the new app | `/parent/approvals` history shows a fulfilled entry | ☐ |
| Lesson + reward authoring tested in admin UI | Create a draft lesson, publish, preview, delete | ☐ |
| `/api/health` has returned ok for >7 days continuously | Vercel logs / your manual checks | ☐ |
| No `console.error` logs reference money-path actions in the last 7 days | `vercel logs --grep="(awardLesson|submitMiniGame|requestRedemption)"` should be empty | ☐ |
| Atlas backups confirmed working (point-in-time restore is available) | Atlas → Cluster → Backups | ☐ |
| You have a fresh download of `/api/admin/lessons/export` | Local file dated within the past week | ☐ |

When all rows are checked, proceed.

---

## Decommission steps

### 1. Disable Heroku auto-deploys

```bash
heroku pipelines:list
# If the legacy app is in a pipeline with GitHub auto-deploy, disconnect:
heroku pipelines:disconnect summer-camp -a summer-camp-764ef7b73bd1
```

Or via the Heroku dashboard: app → Deploy → Disconnect from GitHub.

### 2. Stop the legacy server but keep the app definition

Putting the dyno to sleep is reversible. Don't delete yet.

```bash
heroku ps:scale web=0 -a summer-camp-764ef7b73bd1
```

The app definition, env vars, and add-ons stay. Reverting is one
command (`heroku ps:scale web=1 ...`).

### 3. Observe for 24 hours

With Heroku off and Vercel serving:

- Sign in as each family member; complete a small flow.
- Check `/api/health` periodically.
- Watch Vercel logs for any error spikes.

If anything breaks:

```bash
# Roll back fast.
heroku ps:scale web=1 -a summer-camp-764ef7b73bd1
```

### 4. Update DNS (only if you used a custom domain on Heroku)

Re-point your apex / `www` records to Vercel. If you only used the
`*.herokuapp.com` URL, no DNS change is needed.

### 5. Snapshot then delete the Heroku app

```bash
# Final db dump from Atlas-via-Heroku for archival (skip if Atlas is
# the same cluster the new app uses — it already has the data).
heroku config:get MONGODB_URI -a summer-camp-764ef7b73bd1
# (use mongodump separately if you want a file-on-disk snapshot)

# Confirm env vars are still recoverable (write them down or export).
heroku config -a summer-camp-764ef7b73bd1 > heroku-env-backup.txt

# Delete the app.
heroku apps:destroy summer-camp-764ef7b73bd1 --confirm summer-camp-764ef7b73bd1
```

### 6. Remove the legacy stack from the repo (optional cleanup)

The `client/` and `server/` directories remain in git history forever
regardless. If you want them out of `main`:

```bash
git rm -r client/ server/ Procfile
git rm package-lock.json  # if it still has client+server deps from the
                          # last legacy install (re-install for the new
                          # app should regenerate it cleanly)

# Remove the legacy npm scripts:
#   "dev:legacy", "dev:legacy:server", "dev:legacy:client",
#   "build:legacy", "start:legacy", "seed:legacy"
# (edit package.json by hand)

# Remove legacy CORS hardcode if you ever look at it again
# (lives in server/src/server.ts:25-27 — but that file is gone now).

git commit -m "remove legacy CRA + Express stack"
git push
```

You can also keep them in `main` indefinitely — they don't deploy to
Vercel (the Next config + tsconfig exclude `client/` and `server/`).
Storage cost is zero, and you preserve a reference for git blame.

---

## Heroku account

If `summer-camp-764ef7b73bd1` was the only app on the account, you can
let the Heroku account go inactive — they don't charge for an empty
account.

---

## What the Atlas database now looks like

Same Atlas cluster, same `summercamp` database, same collections. The
Next.js app uses every collection the legacy app did, plus three new
ones (`families`, `minigames`, `minigameattempts`). Nothing about Atlas
needs to change when Heroku goes away.

If you ever want to renumber or split the Atlas cluster (e.g. a
separate prod cluster), DEPLOY.md section 5 covers the fresh-DB
bootstrap.

---

## Rollback (if you have to bring Heroku back)

```bash
heroku ps:scale web=1 -a summer-camp-764ef7b73bd1
```

If you've already deleted the app (step 5), you'd need to redeploy
from git history:

```bash
git checkout <commit-before-removal>
heroku create summer-camp-recovery
heroku config:set MONGODB_URI=... JWT_SECRET=... NODE_ENV=production \
  -a summer-camp-recovery
git push heroku HEAD:main
```

This is why the readiness gate at the top of this doc exists. Confirm
parity *before* deleting anything.
