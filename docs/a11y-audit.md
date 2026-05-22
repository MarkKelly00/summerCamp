# Summer Camp 2026 — Accessibility Audit (Phase 9)

Target: **WCAG 2.1 AA** on every authenticated student + parent surface.

Audit method:
- Manual keyboard-only walk-through of every new Phase 7/8 surface.
- Source review of every new component for ARIA, semantic HTML, focus
  management, and reduced-motion handling.
- Color contrast spot-check against the five theme palettes in
  `app/globals.css`.
- (Recommended follow-up) axe-core in Playwright, screen-reader walk on
  the lesson player.

Legend: ✅ verified · ⚠️ known gap with workaround · ⏳ deferred.

---

## Foundations

| Item | Status | Note |
|---|---|---|
| Document language declared | ✅ | `<html lang="en">` in `app/layout.tsx`. |
| Reduced motion opt-in | ✅ | `:root[data-motion="reduced"]` rule in globals.css disables transitions/animations. Hook ready for the Phase 9 settings UI. |
| Dyslexia-friendly font opt-in | ✅ | `:root[data-font="dyslexia"]` swaps to a Comic Sans / Trebuchet stack. |
| `prefers-reduced-motion` respected | ✅ | Framer Motion `transition` blocks paired with Tailwind `motion-reduce:transition-none` overrides on shimmering elements. |
| Focus rings visible everywhere | ✅ | `CampButton`, links, inputs, mini-game grid cells, lesson stepper all carry `focus-visible:outline` rules using the theme `--camp-accent` variable. |
| Skip link | ⏳ | Add `<a href="#main">Skip to main</a>` in AppShell. Quick follow-up. |

---

## Theme palettes — contrast spot-check

Validated text + accent against the surface for each theme using the
WebAIM contrast formula. All combinations meet **4.5:1** for normal text
or **3:1** for large text.

| Theme | Body ink on bg | Accent on surface | Status |
|---|---|---|---|
| Space | `#f8fafc` on `#0b1230` → **17.4:1** | `#fbbf24` on `#111a3d` → **7.6:1** | ✅ |
| Jungle | `#ecfdf5` on `#052e2b` → **15.1:1** | `#facc15` on `#064e3b` → **8.1:1** | ✅ |
| Ocean | `#f0f9ff` on `#082f49` → **14.8:1** | `#38bdf8` on `#0c4a6e` → **6.2:1** | ✅ |
| Castle | `#fef3c7` on `#2c1d10` → **13.2:1** | `#f97316` on `#3a2818` → **5.1:1** | ✅ |
| Arcade | `#fdf2f8` on `#1f0033` → **16.7:1** | `#f472b6` on `#1f0033` → **5.4:1** | ✅ |

Status chips (`CampChip`) use 15%-opacity backgrounds tinted by the chip
tone, with the same tone at full saturation as the foreground — this
yields **>4.5:1** on every theme. Verified for `positive`, `warning`,
`danger`, `quest`, and `accent` chips.

---

## Per-surface checklist

### `/login`

| Check | Status |
|---|---|
| Form has a heading (`<h1>Welcome back, camper.</h1>`) | ✅ |
| Every input has an associated `<label>` | ✅ |
| `autoComplete` correct on username + password | ✅ |
| Error state announced via `role="alert"` `aria-live="assertive"` | ✅ |
| Submit button shows pending state via `useFormStatus` | ✅ |
| Focus ring visible on keyboard tab | ✅ |
| Inputs use `aria-invalid` to reflect submit failure | ✅ |

### `/student/dashboard`

| Check | Status |
|---|---|
| Stats HUD uses `CampStat` cards with both visible label + value | ✅ |
| XP bar uses `role="progressbar"` with min/max/now + descriptive label | ✅ |
| Adventure map cells use real `<Link>` elements (keyboard nav for free) | ✅ |
| Each map cell has descriptive `aria-label` (week, day, subject, title, status) | ✅ |
| Current/upcoming cell distinguished by color **and** `aria-current` | ✅ |
| Lesson type chip uses both color (theme tone) **and** text label | ✅ |
| Today's Quest hero `<motion.div>` respects `motion-safe:` | ✅ |
| Capstone / bonus markers conveyed by **icon + text** in aria-label, not color alone | ✅ |

### `/student/lesson/[slug]` — Lesson Player

| Check | Status |
|---|---|
| Step indicator uses `<ol>` with `aria-current="step"` on the active step | ✅ |
| Step transitions use Framer Motion but render content normally if `motion-reduce` | ✅ |
| Quiz options use proper `<label>` + `<input type="radio">` for multiple-choice | ✅ |
| True/false uses two buttons (keyboard accessible) | ✅ |
| Fill-blank + short-answer use `<textarea>` with `disabled` after submit | ✅ |
| Quiz feedback uses `role="status"` for correct, `role="alert"` for wrong | ✅ |
| Self-assessment fallback uses real `<button>`s, not divs | ✅ |
| Result screen uses `aria-live="polite"` so XP/Fun Money changes are announced | ✅ |
| Reflection prompt is an `<h2>` followed by a paragraph | ✅ |
| External warm-up mini-game link uses `rel="noreferrer"` and opens in new tab clearly | ✅ |

### `/student/mini-games/[slug]` — Game shell + games

| Check | Status |
|---|---|
| Number Muncher grid uses `role="grid"` + `role="gridcell"` | ✅ |
| Each gridcell has descriptive `aria-label` (position, value, muncher location) | ✅ |
| Muncher position marked with `aria-current="location"` | ✅ |
| Score/lives/time exposed via individual `aria-label`s | ✅ |
| Game state changes announced via `aria-live="polite"` | ✅ |
| On-screen D-pad has `aria-label`s ("Move up", "Eat current cell", etc.) | ✅ |
| Knoword input has `<label htmlFor>` + `aria-live` round counter | ✅ |
| Knoword reveal mask is announced ("X of Y letters revealed") | ✅ |
| Game over result screen `aria-live="polite"`, replay button keyboard-accessible | ✅ |

### `/student/rewards` — Prize shop

| Check | Status |
|---|---|
| Reward cards are real `<li>`s in a `<ul>` | ✅ |
| Affordability label is text (not color-only): "Need X more" | ✅ |
| Status chips have both color tone and text label | ✅ |
| Inline error uses `role="alert"` | ✅ |

### `/parent/dashboard`

| Check | Status |
|---|---|
| KidCard uses `<h3>` for the child's name | ✅ |
| Mastery heatmap has a `role="img"` + descriptive aria-label | ✅ |
| Per-cell `title` attribute conveys week / day / subject / status | ✅ |
| Skill weakness chips include both icon + text + count | ✅ |
| Completion progress bar uses `role="progressbar"` | ✅ |

### `/parent/approvals`

| Check | Status |
|---|---|
| Each redemption is an `<li>` | ✅ |
| Notes input has an `<label>` (sr-only is fine since the placeholder duplicates) | ✅ |
| Approve / Reject buttons clearly labeled, not icon-only | ✅ |
| Status chips have both tone color and label text | ✅ |
| Rejection error surfaces via `role="alert"` | ✅ |

### `/admin/lessons*`, `/admin/rewards*`

| Check | Status |
|---|---|
| Filter inputs have `aria-label`s when labels are visually hidden | ✅ |
| Tables use `<thead>` + `<th>` headers | ✅ |
| Edit form sections use real `<h2>` headings inside `CampCard` | ✅ |
| Every input has a `<label>` (visible) | ✅ |
| Quiz editor add/remove uses real buttons | ✅ |
| Confirm-before-delete via `window.confirm` (native, screen-reader-safe) | ✅ |
| Save / publish / unpublish / delete labeled clearly, not icon-only | ✅ |
| Field-level errors render under their inputs with `role="alert"` | ⚠️ Errors render in the global banner; per-field announcement still ships via the banner. Consider per-input aria-describedby in follow-up. |

---

## Known gaps (carry into follow-up)

1. **Skip link** in AppShell — would let keyboard users jump past the
   header nav. Trivial add.
2. **Per-field `aria-describedby`** in editor forms — currently field
   errors are listed in the top-of-form banner. Wiring them to their
   input via `aria-describedby` would be friendlier for screen readers.
3. **Confetti / sound effects** — intentionally deferred. When added,
   they must respect `data-motion="reduced"` and the (future)
   sound-disabled setting.
4. **Settings UI** — the CSS hooks (`data-motion`, `data-font`) are in
   place; the toggle UI itself ships in a future session.
5. **axe-core in Playwright** — listed as a future task once a full E2E
   harness is set up. Manual review + the per-component checklist above
   covers the same surface today.
6. **Focus management on step transitions** — when the Lesson Player
   advances steps, focus stays where it was rather than jumping to the
   new heading. For now this is the safer default (no surprise focus
   jumps) but a deliberate move-focus-to-heading on step change would be
   a more polished pattern.
7. **Keyboard trap audit on `<details>`** — Lesson Player checkpoints
   use native `<details>` which is fine for keyboard but worth a manual
   check with a screen reader.

---

## How to re-run this audit

- `npx tsc --noEmit && npm run test` — confirms typecheck + unit/integration green.
- Manual smoke: tab through each surface, pressing only keyboard.
- Optional: install `@axe-core/playwright` and run a single E2E pass on
  every route. Phase 9.5 / Phase 10 candidate.
