# Mockup Architecture — Token-Efficient, Iteration-Friendly Interactive Mockups

**Branch:** main
**Date:** 2026-05-16
**Author:** atlonxp (with Claude)
**Status:** DESIGN — pre-implementation reference for `PLAN-v3.1-ux-pipeline.md`
**Companion docs:** `PLAN-v3.1-ux-pipeline.md` (skill pipeline that produces and edits these mockups)

---

## Why this document exists

hstack's current design flow (`/design-consultation` → `/plan-design-review`) lands in a single `DESIGN.md` plus a monolithic `preview.html`. That works for engineers but fails two real-world needs:

1. **Stakeholders want something clickable.** A static gallery does not answer "what does the *experience* look like?" Customers, executives, and design reviewers want to navigate role-based screens before commits land.
2. **Iteration burns tokens.** A 6000-line `preview.html` cannot be edited cheaply. Even splitting by persona (the next obvious step) leaves each persona file at 4000–6000 lines because all archetype screens are inlined. Every visual tweak forces a full re-read and re-write.

This document specifies a layered mockup architecture where:

- **Every edit type targets its smallest possible file.** Token changes touch ~10-line files; component changes touch ~30-line files; screen changes touch ~300-line files. No edit ever requires reading a 6000-line file.
- **Mockup output is multi-page, navigable, and interactive.** Stakeholders open one URL and click through a real-feeling product before any production code exists.
- **The hstack skill pipeline maps cleanly onto layers.** Each skill in `PLAN-v3.1-ux-pipeline.md` owns one layer and never reads the others, so per-skill context is bounded.

Reference implementation pattern (what we're refining, not replacing): `/Users/atlonxp/workspaces/arokago-v3/docs/design/` — used CSS-var token sheet + per-persona pages successfully, but each persona page bloated to 4000–6000 lines because screens were inlined. The fix is one more layer of decomposition plus a small build step.

---

## The layered architecture

```
   Layer 5 — Gallery navigator         index.html              ~250 lines
        │
        ▼
   Layer 4 — Per-persona tour pages    pages/{persona}.html    ~100 lines (assembly only)
        │ {{include screens/...}}
        ▼
   Layer 3 — Per-screen partials       screens/{persona}/{screen}.html   ~200–400 lines each
        │ uses utility classes + components
        ▼
   Layer 2 — Utilities + components    styles.css (.btn, .card, .nav, etc.)   ~500 lines total
        │ uses CSS vars
        ▼
   Layer 1 — Design tokens             styles.css :root { --c-primary: ... }   ~80 lines
```

Each layer has exactly one responsibility, edited by exactly one skill, and never reads its peers above it. The build step assembles Layer 4 by resolving `{{include}}` directives that pull from Layer 3.

---

## Directory structure

```
mockup/                        # source (edited by skills)
├── styles.css                 # Layers 1 + 2: tokens + utilities/components
├── interactions.js            # Layer 6: interactivity (one file)
├── index.html                 # Layer 5: gallery navigator (small, hand-edited)
├── pages/                     # Layer 4: per-persona tour pages (assembly only)
│   ├── marketing.html         #   ~100 lines: <head> + {{include}} list
│   ├── patient.html
│   ├── provider.html
│   ├── admin.html
│   └── mobile.html
├── screens/                   # Layer 3: per-screen partials (edited individually)
│   ├── _components/           #   shared partials reused across personas
│   │   ├── topnav.html
│   │   ├── footer.html
│   │   └── empty-state.html
│   ├── marketing/
│   │   ├── home.html          #   ~300 lines max
│   │   ├── ai-search.html
│   │   ├── provider-profile.html
│   │   └── ...                #   one file per archetype screen
│   ├── patient/
│   │   ├── dashboard.html
│   │   ├── quotations.html
│   │   └── ...
│   ├── provider/
│   ├── admin/
│   ├── mobile/
│   └── states/                #   empty / 404 / 503 / offline / suspended / legal
└── data/                      # mock data per persona (powers the interactive layer)
    ├── persona-patient.json
    ├── persona-provider.json
    └── persona-admin.json

mockup-dist/                   # build output (never hand-edited, gitignored)
├── styles.css                 # copied through (or post-processed)
├── interactions.js            # copied through
├── index.html                 # copied through
├── marketing.html             # assembled from pages/marketing.html + screen partials
├── patient.html
├── provider.html
├── admin.html
└── mobile.html
```

**Hard rule:** skills only ever edit files under `mockup/`. `mockup-dist/` is build output; the agent never reads or writes it directly.

---

## Build pipeline

A ~50-line bun script at `scripts/build-mockup.ts` resolves a single directive: `{{include path/to/file.html}}`. No other templating, no expression language, no front-matter. Recursive resolution (a screen partial can include `_components/topnav.html`). Output is flat self-contained HTML in `mockup-dist/`.

Pseudocode:

```ts
function build(srcRoot: string, distRoot: string) {
  const includeRe = /\{\{include\s+([^\s}]+)\s*\}\}/g;
  for (const page of glob(`${srcRoot}/pages/*.html`).concat(`${srcRoot}/index.html`)) {
    let html = read(page);
    while (includeRe.test(html)) {
      html = html.replace(includeRe, (_, p) => read(join(srcRoot, p)));
    }
    write(join(distRoot, basename(page)), html);
  }
  copy(`${srcRoot}/styles.css`, `${distRoot}/styles.css`);
  copy(`${srcRoot}/interactions.js`, `${distRoot}/interactions.js`);
}
```

Run modes:

- `bun run mockup:build` — one-shot rebuild.
- `bun run mockup:watch` — chokidar-watched rebuild on source change.
- `bun run mockup:serve` — serves `mockup-dist/` via `browse/server.ts` (already exists), optionally with ngrok tunnel for stakeholder review.

The build is fast (no Astro/11ty/webpack), idempotent, and produces output that opens directly in any browser without a dev server.

---

## Per-layer rules and edit costs

### Layer 1 — Design tokens (`styles.css :root`)

**Contents:** CSS custom properties only. Colors (brand voltage + surfaces + ink + semantic), typography (font families, scales, weights), radius, spacing, shadows.

**File size budget:** ~80 lines. If it grows beyond 150, the token system has too many ad-hoc additions and needs consolidation.

**Edited by:** `/product-ci` only. The values are derived from product values (transparency → blue, trust → gold), so the skill that maps values to tokens owns this layer end-to-end.

**Edit cost example:**

| Edit | Lines touched | Pages affected |
|---|---|---|
| Change brand primary `#3fbdbd` → `#2563eb` | 1 token line | All 5 persona pages, index, all 80+ screens |
| Add a new semantic color `--c-attention` | 2 lines (token + soft variant) | Wherever the new class is used |
| Adjust dark-mode override | 1–5 token lines under `[data-theme="dark"]` | All pages |

### Layer 2 — Utilities and components (`styles.css` below `:root`)

**Contents:** Class-based primitives. `.btn`, `.btn-primary`, `.card`, `.nav`, `.input`, `.swatch`, layout helpers (`.row`, `.col`, `.stack`), spacing utilities (`.mt-md`, `.gap-lg`). Reset + base typography also live here.

**File size budget:** ~500 lines for `styles.css` as a whole (Layers 1 + 2). The arokago-v3 reference is 484 lines, which is well-sized for a complete system.

**Edited by:** `/design-consultation` (iterative form). The skill consumes `PRODUCT_CI.md` + `WORKFLOWS.md` and writes utility classes that screens then reference.

**Edit cost example:**

| Edit | Lines touched | Pages affected |
|---|---|---|
| Tweak `.btn-primary` border-radius | 1 line | All screens with primary buttons |
| Add new utility `.text-meta` | 4 lines | Wherever applied |
| Restyle `.card` shadow | 1–2 lines | All screens with cards |

**Critical rule:** screens should reference utility classes, not inline `style="..."` attributes. Inline styles defeat the cascade and bloat screen files. The arokago-v3 reference repeated `style="font-family: var(--font-mono); font-size: 12px; color: var(--c-muted)"` across dozens of places; that becomes `.text-meta` once and screens shrink by ~30–40%.

### Layer 3 — Per-screen partials (`screens/{persona}/{screen}.html`)

**Contents:** Just the HTML for one archetype screen. No `<html>`, `<head>`, or `<body>` tags — these are fragments. Uses Layer 2 utility classes for styling. Embeds `{{include screens/_components/topnav.html}}` for shared chrome.

**File size budget:** ~200–400 lines per screen. Above 500 lines, the screen should split into sub-partials (e.g., a complex dashboard splits into `dashboard.html` + `dashboard-kpi-row.html` + `dashboard-recent-activity.html`).

**Edited by:** `/mockup`. The skill is given a persona + workflow step and produces one screen file at a time. Never opens another persona's screen.

**Edit cost example:**

| Edit | Lines touched | Pages affected |
|---|---|---|
| Reword dashboard hero copy | 1–3 lines in `screens/patient/dashboard.html` | Just patient.html after rebuild |
| Add a new section to the home page | ~50 lines in `screens/marketing/home.html` | Just marketing.html |
| Add a new screen | New file ~300 lines + 1 line in `pages/{persona}.html` | One persona |

### Layer 4 — Per-persona tour pages (`pages/{persona}.html`)

**Contents:** A thin assembly — `<html>` shell, `<head>` with stylesheet link, `<body>` containing only `{{include}}` directives that list the screens in tour order. ~100 lines total.

**File size budget:** Hard cap 200 lines. Anything more means logic is leaking out of `screens/` into the page.

**Edited by:** `/mockup` (when adding/removing/reordering screens). Edits are mostly one-line `{{include}}` additions.

**Example `pages/marketing.html`:**

```html
<!doctype html>
<html lang="en" data-mode="marketing" data-theme="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{Product} — Marketing tour</title>
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  {{include screens/_components/topnav.html}}
  {{include screens/marketing/home.html}}
  {{include screens/marketing/ai-search.html}}
  {{include screens/marketing/deep-search.html}}
  {{include screens/marketing/provider-profile.html}}
  {{include screens/marketing/onboarding.html}}
  {{include screens/marketing/pricing.html}}
  {{include screens/_components/footer.html}}
  <script src="./interactions.js"></script>
</body>
</html>
```

### Layer 5 — Gallery navigator (`index.html`)

**Contents:** Section cards linking to each per-persona tour page, plus a token preview (swatches, type scale, spacing scale, shadow elevation). Public entry point for stakeholders.

**File size budget:** ~250 lines. Hand-edited; not assembled from partials because the content is bespoke.

**Edited by:** `/mockup` only when personas are added/removed. Token preview section is regenerated automatically from `styles.css :root`.

### Layer 6 — Interactivity (`interactions.js`)

**Contents:** All JavaScript behavior in one file. Navigation, form fake-submit, modal/dropdown toggles, mock multi-step flow state machines, hover-state tweaks.

**File size budget:** ~300–600 lines depending on flow complexity. If it grows past 800, split by surface (`interactions-nav.js`, `interactions-forms.js`).

**Edited by:** `/interactive-mockup`. The skill reads workflow definitions from `data/persona-*.json` and wires the click flow to match. Adds `data-action="..."` hooks to screen partials and corresponding handlers in `interactions.js`.

**No framework.** Vanilla DOM API. Maybe `htmx` if a workflow genuinely benefits from declarative server-fetched fragments (rare for mockups).

---

## Mock data layer

Stakeholder demos look fake when every dashboard says "User 1 / User 2 / Lorem ipsum." `data/persona-{name}.json` holds realistic-looking mock content per persona:

```json
{
  "persona": "patient",
  "name": "Mariam K.",
  "avatar": "MK",
  "stats": {"upcoming": 2, "quotations": 5, "messages": 3},
  "recentActivity": [
    {"type": "quotation", "title": "Dental implant — Bangkok Smile Clinic", "ago": "2h"},
    {"type": "message", "title": "Dr. Sasithon replied", "ago": "yesterday"}
  ]
}
```

Screens reference data via `data-bind="patient.stats.upcoming"`, and `interactions.js` populates on load. This keeps screen HTML free of mock content and lets `/mockup` regenerate just the JSON when personas change.

---

## The interactive layer (Figma-alike experience)

Stakeholders should be able to:

1. **Open `index.html`**, see the section navigator, click into a persona.
2. **Navigate between screens within a persona** via in-app nav (the per-persona page is one long scroll OR a screen-switching UI controlled by `interactions.js`).
3. **Click navigation links across personas** (patient → marketing landing, admin → provider profile).
4. **Fill forms and see fake success states** (`onsubmit="return false"` + state update).
5. **Open modals, expand dropdowns, switch tabs** — all via `data-action` attributes that `interactions.js` listens for.
6. **Follow multi-step flows** (booking → checkout → confirmation) via tiny state machines in `interactions.js` reading from `data/*.json`.

What we do **not** build for v1:

- Real form persistence (no localStorage, no backend).
- Real auth (no login flows, just fake "you're signed in" state).
- Real network requests (no fetch, no WebSocket).
- Component-level reactivity (no React, no Vue, no Alpine).

If a stakeholder needs one of these to validate a flow, the mockup has done its job and the next step is implementation, not deeper mockup work.

---

## Skill-to-layer mapping

Each skill in `PLAN-v3.1-ux-pipeline.md` owns specific layers and is forbidden from reading others:

| Skill | Edits | Reads (input) | Never touches |
|---|---|---|---|
| `/product-ci` | Layer 1 (`styles.css :root` block) + `docs/PRODUCT_CI.md` | `docs/PERSONAS.md`, `/office-hours` output | Layers 2–6 |
| `/design-consultation` (iterative) | Layer 2 (`styles.css` utilities/components) + `DESIGN.md` | Layers 1, `docs/WORKFLOWS.md` | Layers 3–6 |
| `/ux-workflows` | `docs/WORKFLOWS.md` only | `docs/PERSONAS.md` | All mockup layers |
| `/mockup` | Layer 3 + Layer 4 + Layer 5 + `data/*.json` | Layers 1, 2, `docs/WORKFLOWS.md` | Layer 6 (`interactions.js`) |
| `/interactive-mockup` | Layer 6 (`interactions.js`) only, adds `data-*` hooks to Layer 3 | All layers (read-only except its own) | Layer 1 tokens |
| `/ux-pipeline` (orchestrator) | None directly — dispatches sub-skills | All artifacts for gap detection | Mockup files (delegated) |

The strict read/write boundaries are what make per-skill context bounded. `/mockup` never reads `styles.css` (it only references utility class names by convention) so its context stays under a few hundred KB even on a 100-screen mockup.

---

## Worked example: a real iteration round

Scenario: stakeholder reviews the mockup and asks for three changes.

1. **"The blue is too cold — make it warmer."**
   - `/product-ci` re-runs, asks for the new value emphasis, updates `--c-primary` token.
   - One line changes in `styles.css`. Rebuild. All 5 pages + index reflect the new color.
   - Tokens read by skill: ~80 lines (Layer 1 only).

2. **"The patient dashboard feels cramped — give it more breathing room."**
   - `/mockup` reads `screens/patient/dashboard.html` (~350 lines).
   - Adjusts spacing utility classes on a few sections (e.g., `.mt-md` → `.mt-xl`).
   - One file edited, ~10 lines changed.
   - No other persona's screen touched, no token changes.

3. **"When admins click 'Approve verification' I want a confirmation modal before it goes through."**
   - `/interactive-mockup` opens `interactions.js`, adds a new handler for `data-action="approve-verification"`.
   - Edits `screens/admin/verification-queue.html` to add the `data-action` attribute and a hidden `<dialog>` element.
   - Two files touched: one screen (~5 line change), `interactions.js` (~30 line addition).

Total tokens consumed across this iteration round: roughly the cost of reading 4 small files (~1000 lines total) and writing diffs to 4 files. On the monolithic pattern, the same round would have re-read and re-written 15,000+ lines of `preview.html` or persona files.

---

## Migration from the arokago-v3 pattern

If a project already has the arokago-v3 layout (token sheet good, persona pages bloated), migrate in three passes:

1. **Extract `_components` first.** `topnav`, `footer`, `empty-state`, `kpi-card`, `swatch-grid` — copy them to `screens/_components/` and replace the inlined copies in persona pages with `{{include}}` directives.
2. **Extract screens by section.** Walk `marketing.html` from top to bottom; every `<section>` or major surface that's an "archetype screen" goes into `screens/marketing/{slug}.html`. The persona page is replaced with `{{include}}` lines.
3. **De-inline styles.** Run a sweep to find repeated inline `style="..."` patterns; promote to utility classes in `styles.css`. The first sweep typically catches `text-meta`, `tag`, `caption`, and 5–10 spacing helpers and shrinks every screen file ~30%.

The migration is mechanical and can be scripted; it does not require regenerating any design decisions.

---

## Open questions

1. **CSS authoring style** — hand-written CSS (current arokago-v3 pattern) vs. utility-first (Tailwind-like). Hand-written keeps the system small and readable; utility-first lets the agent compose styles inline without growing `styles.css`. Recommendation: hand-written, with a small set of utility helpers. Revisit if `styles.css` exceeds 1000 lines.
2. **Component partials granularity** — single-element components (`button.html`) vs. composite components (`card-with-actions.html`). Recommendation: start with composites at the screen level (i.e., screens *are* the composition unit); only extract to `_components/` when the same block appears in three or more screens.
3. **Tour vs. switcher UX for per-persona pages** — long scroll through all archetype screens (arokago-v3 pattern) vs. screen-switcher with prev/next nav (more app-like). Recommendation: ship long-scroll for v1 (zero JS needed); `/interactive-mockup` upgrades to switcher if a workflow needs sequential focus.
4. **Where dark-mode lives** — class on `<html>` toggled by `interactions.js`, or always-light for v1. Recommendation: always-light v1; dark-mode swatch in token preview shows the system supports it but no toggle on the mockup itself.
5. **Mobile rendering** — separate `screens/mobile/*` files (arokago-v3) vs. responsive screens that render at any viewport. Recommendation: responsive by default for most screens; `screens/mobile/` for PWA-shaped screens that genuinely diverge (bottom nav, full-screen modals).

---

## What this architecture is *not*

- **Not a design system framework.** No build-time component library, no Storybook, no React-DSL. The system is the CSS file + the convention. If you outgrow this, you're past mockup-stage and ready to build.
- **Not a Figma replacement.** Figma's vector tooling, comments, and collaboration are not replicated. This is "Figma-alike" only in the sense that stakeholders get a clickable product preview before implementation.
- **Not the production app.** No skill in the v3.1 pipeline carries these files into `src/`. The mockup is a *contract*; implementation rebuilds it against the same `DESIGN.md` tokens using whatever real framework the project uses.
