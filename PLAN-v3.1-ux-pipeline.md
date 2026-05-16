# hstack v3.1 — UX Pipeline (Stakeholder-Validated Design Before Implementation)

**Branch:** main
**Date:** 2026-05-16
**Author:** atlonxp (with Claude)
**Status:** PROPOSAL — awaiting prioritization for v3.1 build
**Companion docs:** `PLAN-v3-roadmap.md` (v3 baseline), `MOCKUP-ARCHITECTURE.md` (mockup layering + build pipeline)

---

## Vision

hstack v3 made Hall's nine hats one-command workflows. It did **not** solve the customer-facing UX gap: every project still launches into implementation with stakeholders never seeing more than a static `DESIGN.md` and a one-shot `preview.html`. When clients, executives, or design reviewers ask "what does the experience actually look like for an admin / a patient / a provider?", the honest answer today is "you'll see when we ship."

v3.1 closes that gap with an **iterative UX pipeline** that produces a clickable, role-based, multi-screen mockup before any production code is written. The pipeline:

- Starts from the product (already discovered via `/office-hours`).
- Derives brand values and design tokens from the product (transparency → blue, trust → gold) rather than asking for a separate "philosophy" input.
- Discovers stakeholders and their workflows.
- Drafts a design system, generates per-screen mockups, wires interactions.
- **Loops** — every step re-checks upstream artifacts for drift and re-questions until gaps close.

The architectural backbone is `MOCKUP-ARCHITECTURE.md`: tokens → utilities → screens → pages → gallery, with a tiny include-resolver build step that keeps per-edit token cost bounded even after dozens of stakeholder iterations.

The outcome: hstack ships a **stakeholder-ready interactive mockup at the planning stage**, not after the first sprint. Implementation begins only after the mockup has been validated by the people who will use the product.

---

## The problem this solves

| Today | With v3.1 |
|---|---|
| `/design-consultation` is one-shot, runs early, asks for inputs in a single batch. | Iterative: each input gets validated against upstream artifacts; loops until gaps closed. |
| `DESIGN.md` is the output — readable to engineers, not to customers. | `DESIGN.md` stays for engineers; **role-based clickable mockup** is added for stakeholders. |
| `preview.html` shows the design system as a gallery — components on a page. | Per-persona tour pages show the *product* as the stakeholder will experience it. |
| No clickable navigation between screens. | Full inter-screen + cross-persona navigation; modal/dropdown/form behavior wired. |
| Stakeholder feedback ("the blue feels cold") forces a full re-read of monolithic files. | Tokens edited in 1 line; components in ~30 lines; screens in ~300 lines (per `MOCKUP-ARCHITECTURE.md`). |
| Brand values are an unspecified input. | `/product-ci` derives them from the product and maps to design tokens explicitly. |
| Workflows are inferred ad-hoc inside `/design-consultation`. | `/ux-workflows` produces an explicit `docs/WORKFLOWS.md`; design and mockup skills consume it. |

---

## Pipeline shape

```
   ┌──────────────┐     ┌────────────────────┐     ┌──────────────┐
   │ /office-hours│  →  │ /discover-personas │  →  │ /product-ci  │
   │   product    │     │  docs/PERSONAS.md  │     │  derives     │
   │   intel      │     │                    │     │  values →    │
   └──────────────┘     └────────────────────┘     │  tokens      │
                                                   └──────────────┘
                                                          │
                                                          ▼
   ┌────────────────────┐     ┌─────────────────────────┐
   │  /ux-workflows     │  →  │ /design-consultation    │
   │  docs/WORKFLOWS.md │     │  iterative form         │
   │  (per persona)     │     │  DESIGN.md + Layer 2    │
   └────────────────────┘     └─────────────────────────┘
                                          │
                                          ▼
   ┌──────────────┐     ┌─────────────────────────┐     ┌──────────────────────┐
   │  /mockup     │  →  │  /interactive-mockup    │  →  │  /plan-design-review │
   │  screens/    │     │  interactions.js +      │     │  /plan-ux-review     │
   │  pages/      │     │  data-action hooks      │     │  validate + iterate  │
   └──────────────┘     └─────────────────────────┘     └──────────────────────┘
                                          │
                                          ▼
                              ┌──────────────────────────┐
                              │  /ux-pipeline            │
                              │  orchestrates all above  │
                              │  with gap-detection loop │
                              │  until "no open gaps"    │
                              └──────────────────────────┘
```

Each box is a skill. Solid arrows are data dependencies (downstream consumes upstream). The orchestrator `/ux-pipeline` walks the chain, runs gap detection between every pair, and loops back when an upstream artifact changes.

---

## Family M — UX Pipeline

**Distinction from existing Design / UX Audit families:**

- **Design family** (existing) produces a design system in one shot for engineers (`DESIGN.md`, gallery `preview.html`). v3.1 extends `/design-consultation` to be iterative but keeps the family.
- **UX Audit family** (existing) tests a *live, implemented* site against persona workflows. v3.1 runs *before* implementation, on a mockup.
- **UX Pipeline family** (new) is pre-implementation, stakeholder-facing, iterative, and produces a clickable artifact.

**Output artifacts (across all v3.1 skills):**

- `docs/PRODUCT_CI.md` — values + token mapping rationale
- `docs/PERSONAS.md` — already produced by `/discover-personas`
- `docs/WORKFLOWS.md` — per-persona end-to-end journeys with screen lists
- `DESIGN.md` — already exists; v3.1 makes it iteration-friendly
- `mockup/` directory — full source per `MOCKUP-ARCHITECTURE.md`
- `mockup-dist/` directory — build output, stakeholder URL target

### `/product-ci`

**Problem:** Brand identity today is either skipped (skills assume a system or accept arbitrary inputs) or set by a separate `--design-spec` flag. In practice, the values that should drive design tokens (transparency, trust, speed, warmth) are *derivable from the product itself*. A medical-tourism platform implies trust + safety; a children's reading app implies warmth + playfulness; a trading terminal implies precision + authority. Asking the user "what are your values?" is the wrong question — the right one is "what does your product *do*, and what must users feel to act?"

**Solution:** Reads `/office-hours` output + `docs/PERSONAS.md` and proposes a values-to-tokens mapping. AskUserQuestion confirms each value before locking it. For each confirmed value:

1. **Value statement** — one sentence describing what users must feel.
2. **Color semantics** — primary, trust-accent, danger, success. Each picked with reasoning (e.g., "trust → warm gold #c8a86d because the audience associates institutional reliability with traditional fiduciary visual language, not cold corporate blue").
3. **Typography voice** — display family (authoritative vs. friendly vs. technical), body family, mono usage.
4. **Motion personality** — calm vs. snappy vs. precise vs. playful, mapped to ease curves and durations.
5. **Spacing rhythm** — tight (data-dense) vs. generous (consumer-facing).

Output writes Layer 1 of `MOCKUP-ARCHITECTURE.md` (`styles.css :root` block) plus `docs/PRODUCT_CI.md` documenting why each token has its value. Re-run anytime values shift — the doc tracks revision history.

**Inputs:** `docs/PERSONAS.md`, `/office-hours` output (or equivalent product intel), optional `--values` flag to pre-seed.
**Outputs:** `docs/PRODUCT_CI.md`, `mockup/styles.css :root` block (Layer 1 only), revision-history log.
**Dependencies:** `/office-hours` (product intel), `/discover-personas`. Hooks `/plan-design-review` for validation if the values changed materially.

### `/ux-workflows`

**Problem:** Workflows today are implicit. `/discover-personas` produces roles; `/define-workflows` (existing v3 skill) produces formal definitions but lives inside the UX-audit pipeline and assumes a built app. For mockup-stage work, a stakeholder asks "show me what an admin does" and the team improvises. Without a written workflow per persona, screen lists drift, hand-offs get missed, and mockups under-represent reality.

**Solution:** Reads `docs/PERSONAS.md` and produces `docs/WORKFLOWS.md` — one section per persona, each with:

- **Entry points** — how the persona arrives (marketing site, direct dashboard link, deep link from notification, etc.).
- **Core workflows** — 3–7 end-to-end journeys per persona. Each workflow is a sequence of (action, screen, outcome) tuples.
- **Cross-persona hand-offs** — explicit moments where one persona's action triggers another's task (patient submits review → provider notified → admin moderates).
- **Edge / error workflows** — empty states, permission denials, partial failures.
- **Out-of-scope statement** — flows we are *not* mocking in v1 (with rationale, so stakeholder review doesn't try to chase them).

Interactive: AskUserQuestion walks through each persona, asks "what are the 3–7 most important things this persona does end-to-end?" then reflects back a draft for confirmation. Cross-persona hand-offs are auto-discovered when two persona drafts reference the same artifact (a quotation, a verification, a message thread).

**Inputs:** `docs/PERSONAS.md`, optional `/office-hours` notes for product intent.
**Outputs:** `docs/WORKFLOWS.md` with one section per persona, plus a `hand-offs.md` matrix.
**Dependencies:** `/discover-personas`. Mockup screen list (`/mockup`) is generated directly from workflows.

### `/design-consultation` (iterative form)

**Problem:** Today `/design-consultation` runs once, asks all questions in one go, produces `DESIGN.md` + `preview.html`, and is done. Real stakeholder iteration ("more whitespace", "softer corners", "the trust-gold is too brown") requires re-running the whole thing or editing the monolithic preview by hand. The skill is the right idea executed at the wrong cadence.

**Solution:** Refactor to **idempotent + iteration-aware**. Detects existing `mockup/styles.css` + `DESIGN.md` + `docs/PRODUCT_CI.md`. If they exist, treats them as state and proposes diffs rather than rewrites. Specifically:

- **Reads** Layer 1 tokens from `/product-ci`. Does not change tokens; only consumes them.
- **Writes** Layer 2 of `MOCKUP-ARCHITECTURE.md` — utility classes, component primitives, base typography.
- **Iteration mode** — when re-invoked, surfaces a diff: "you have `.btn-primary` with radius 14px; want to change to 8px?" Accepts targeted edits via AskUserQuestion or `--patch "btn-primary.radius=8px"`.
- **Drift detection** — if Layer 1 tokens changed (because `/product-ci` re-ran), automatically recomputes any utility class that referenced the changed token.

Output is still `DESIGN.md` (engineer-facing reference) + `mockup/styles.css` (Layers 1 + 2). The "complete preview" gallery (`mockup/index.html`) is regenerated by `/mockup`, not this skill.

**Inputs:** `docs/PRODUCT_CI.md`, `docs/WORKFLOWS.md`, existing `DESIGN.md` + `mockup/styles.css` (if present).
**Outputs:** `DESIGN.md` (updated), `mockup/styles.css` Layer 2 (utilities + components).
**Dependencies:** `/product-ci`, `/ux-workflows`. Re-runs trigger `/mockup` to refresh dependent screens.

### `/mockup`

**Problem:** No skill in v3 produces a clickable, multi-screen, role-based mockup. `preview.html` shows components on one page; it does not show the product. Building a mockup by hand is the 4000–6000-line bloat problem documented in `MOCKUP-ARCHITECTURE.md`.

**Solution:** Reads `docs/WORKFLOWS.md` and produces Layers 3, 4, 5 of `MOCKUP-ARCHITECTURE.md`:

- For each persona, generates one `mockup/pages/{persona}.html` (thin assembly, ~100 lines).
- For each archetype screen named in `WORKFLOWS.md`, generates one `mockup/screens/{persona}/{screen}.html` (~200–400 lines, uses Layer 2 utility classes, no inline styles).
- Generates shared partials under `mockup/screens/_components/` (topnav, footer, empty-state, etc.) — extracted automatically when the same block appears in 3+ screens.
- Generates `mockup/index.html` — gallery navigator with section cards linking to each per-persona page + token preview.
- Writes `mockup/data/persona-{slug}.json` with realistic-looking mock content.

Iteration mode: AskUserQuestion targets specific screens ("the patient dashboard feels cramped — what changes?"). Edits are bounded to one screen file at a time per the architecture doc's read/write rules. Stakeholder-driven changes ("show me a version with cards instead of rows") fork the screen into A/B variants under `screens/{persona}/{screen}.A.html` + `.B.html`.

**Inputs:** `docs/WORKFLOWS.md`, `mockup/styles.css` (Layers 1+2), `docs/PERSONAS.md`.
**Outputs:** `mockup/screens/`, `mockup/pages/`, `mockup/index.html`, `mockup/data/*.json`.
**Dependencies:** `/product-ci`, `/design-consultation`, `/ux-workflows`. Build step in `scripts/build-mockup.ts` produces `mockup-dist/`. Hooks `/plan-design-review` + `/plan-ux-review` for validation.

### `/interactive-mockup`

**Problem:** Static mockup pages let stakeholders see screens but not feel the experience. Real validation needs: clicking through nav, submitting forms (with fake success), opening modals, expanding dropdowns, switching tabs, following multi-step flows (booking → checkout → confirmation), navigating cross-persona (patient sees provider profile). Building all this by hand for every mockup is high-effort and gets cut from scope; with no JS layer, the mockup is a slideshow.

**Solution:** Reads `docs/WORKFLOWS.md` and `mockup/screens/`, adds `data-action="..."` attributes to relevant elements (buttons, form submits, nav links, tab triggers), and writes one `mockup/interactions.js` file with handlers for each action:

- **Navigation** — every nav link points at a real screen URL; no broken hrefs.
- **Forms** — `onsubmit="return false"` + UI flips to a fake success state defined per form in `data/persona-{slug}.json`.
- **Modals + dropdowns** — vanilla `<dialog>` and `<details>`, no library.
- **Multi-step flows** — tiny state machine in `interactions.js` reading flow definitions from `data/`.
- **Cross-persona linking** — `<a href="../{persona}.html#screen-id">` works because pages are flat HTML.
- **Mock data binding** — elements with `data-bind="patient.stats.upcoming"` populated on load from JSON.

Iteration mode: when a stakeholder says "I want a confirmation modal before approving a verification," skill adds `data-action="approve-verification"` to the relevant button in `screens/admin/verification-queue.html` and a corresponding handler in `interactions.js`. Two files touched, ~30 lines added total.

**Inputs:** `mockup/screens/`, `docs/WORKFLOWS.md`, `mockup/data/*.json`.
**Outputs:** `mockup/interactions.js`, `data-action` attribute additions to screen partials.
**Dependencies:** `/mockup`. Build step bundles `interactions.js` into `mockup-dist/` unmodified.

### `/ux-pipeline` (orchestrator)

**Problem:** Five skills running in sequence is friction; remembering which to run when an upstream artifact changes is a state-tracking burden the user shouldn't carry. v3 has the same problem in other families and solved it with `auto-*` orchestrators (`/auto-feature-build`, `/auto-ux-audit-full`). v3.1 needs the same pattern.

**Solution:** A meta-skill that runs the chain end-to-end with **gap detection between each step** and an **iteration loop until no gaps remain**. Flow:

1. **Detect entry state.** Check for existing `docs/PERSONAS.md`, `docs/PRODUCT_CI.md`, `docs/WORKFLOWS.md`, `DESIGN.md`, `mockup/`. Each missing artifact triggers the producing skill; each present artifact gets a freshness check ("upstream changed since this was written? offer to refresh").
2. **Gap pass per step.** After each skill, run a gap-check: are there persona-workflow combinations with no screens? Tokens referenced by utility classes that don't exist? Mockup screens whose actions have no `data-action` handler?
3. **AskUserQuestion at every gap.** Surface the gap, propose a fix, get explicit approval. Auto-detected drift (e.g., `/product-ci` re-ran and changed primary color) is offered as a one-click propagation through dependent layers.
4. **Loop.** After all six skills complete, re-run gap detection from step 1. If any new gaps emerged (often: stakeholder review added a workflow), loop. Exit only when "no open gaps" is true.
5. **Build + serve.** On clean exit, run `bun run mockup:build` and `bun run mockup:serve` (or open ngrok tunnel if `--share` flag). Hands stakeholder a URL.

Resume-safe: state lives in artifacts on disk. If interrupted mid-loop, re-running picks up where it left off.

**Inputs:** Either nothing (cold start: kicks off `/office-hours` then runs forward) or any subset of existing artifacts (warm start: detects state, runs only what's needed).
**Outputs:** Same as the six sub-skills, plus an orchestration log at `.gstack/ux-pipeline/run-{timestamp}.md` showing what was generated, what gaps were closed, and how many loops it took.
**Dependencies:** All six skills in this family. Optional integration with `/plan-design-review` + `/plan-ux-review` (per-loop validation rounds) and `/ship` (publishes the mockup to a stable URL).

### Modifications to existing skills

The pipeline does not require new versions of existing skills, but two get small additions:

- **`/discover-personas`** — output schema gains a `workflows-hint` field so `/ux-workflows` can pre-seed its draft. Backward compatible (field is optional).
- **`/plan-design-review`** — gains a `--mockup` mode that reviews the rendered `mockup-dist/` instead of the plan text. Same 0–10 rubric, applied to screens instead of plan sections.
- **`/plan-ux-review`** — gains a `--mockup` mode that walks each persona's workflow through the mockup, surfacing dead-end clicks and missing affordances. Effectively pre-implementation `/ux-audit`.

---

## Iterative gap-loop semantics

The loop is what makes v3.1 different from "just chain the skills." Each artifact has explicit invariants; every loop iteration validates them.

**Invariants checked between steps:**

| Pair | Invariant |
|---|---|
| Personas → Workflows | Every persona has at least one workflow. Every workflow names exactly one owning persona. |
| Workflows → Mockup | Every workflow step is either a screen in `mockup/screens/` or explicitly marked `out-of-scope`. |
| Tokens (Layer 1) → Utilities (Layer 2) | Every utility class that references a CSS var refers to one that exists in `:root`. |
| Utilities → Screens (Layer 3) | Every utility class used in a screen file is defined in `styles.css` (no orphan class names). |
| Screens → Interactions (Layer 6) | Every `data-action` attribute has a handler in `interactions.js`. Every handler is reachable from some screen. |
| Workflows → Interactions | Every multi-step workflow has a state machine in `data/*.json` referenced by `interactions.js`. |

**Loop exit condition:** all invariants pass AND `/ux-pipeline` AskUserQuestion "any open feedback from stakeholders?" gets a "no."

**Drift propagation:** when `/product-ci` re-runs and a token changes, the orchestrator marks every downstream artifact as "potentially stale" and re-runs each in dependency order. Hall sees a single approval question ("primary color changed; refresh utilities + screens?") rather than five.

---

## Sequencing

**Wave 1 (foundational, ship together):**

1. `MOCKUP-ARCHITECTURE.md` (this doc's companion) — written. ✓
2. `scripts/build-mockup.ts` — the include-resolver build script. Standalone, testable.
3. `/product-ci` — Layer 1 skill. Smallest, highest leverage.
4. `/ux-workflows` — `WORKFLOWS.md` producer. Pure documentation skill, no mockup output yet.

Wave 1 alone gives Hall a complete written design system + workflow doc, even before mockups exist.

**Wave 2 (the visible payoff):**

5. `/design-consultation` (iterative refactor) — extends existing skill.
6. `/mockup` — Layer 3/4/5 generator. Biggest single skill; produces the static mockup pages.

After Wave 2, stakeholders have something clickable (static nav between screens) even without interactivity.

**Wave 3 (interactivity + orchestration):**

7. `/interactive-mockup` — Layer 6.
8. `/ux-pipeline` — orchestrator. Adds gap-loop semantics on top of the existing skills.

**Wave 4 (validation hooks):**

9. `/plan-design-review --mockup` mode.
10. `/plan-ux-review --mockup` mode.
11. `/ship` integration — publishes `mockup-dist/` to a stable URL (ngrok-pinned or GitHub Pages) so stakeholder review URLs survive sessions.

Each wave is independently shippable. Wave 1 alone is a productivity win for engineering even with no stakeholder mockup. Wave 2 is the customer-visible launch.

---

## Cross-family integrations

| With family | Integration |
|---|---|
| **Design (existing)** | `/design-shotgun` can fork at Layer 1 + 2 (multiple `styles.css` variants) and let stakeholders pick before the mockup explodes into screens. |
| **UX Audit (existing)** | `/ux-audit` runs on the live implementation; v3.1 runs on the mockup. They share `docs/PERSONAS.md` + `docs/WORKFLOWS.md` formats so audits are continuous from mockup to production. |
| **Family A (CEO Cockpit)** | `/investor-update` can pull screenshots from `mockup-dist/` for demo decks before the product exists. |
| **Family H (Cognitive Computing / HMC)** | `/agent-ux-review` runs on AI-feature mockups before implementation, catching predictability/repair issues at zero cost. |
| **Family I (Operations Research)** | Workflow definitions in `docs/WORKFLOWS.md` are the input for funnel/throughput simulation skills — mockup-stage flow modeling before any user touches the product. |
| **Family J (Product Transposition)** | `/blueprint` + `/transpose` produce a transposition plan that `/ux-pipeline` can directly consume — study a product, derive its mockup, validate the bridge with stakeholders. |

---

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| Mockup quality plateaus below stakeholder expectations; they want "real-looking" not "wireframe-looking." | `/product-ci` derives token values with reasoning, `/mockup` uses realistic mock data per persona (not lorem ipsum), `/interactive-mockup` wires real form behavior. Quality bar is "could pass for a Figma high-fidelity prototype to someone glancing at it." |
| Iteration loops never converge — stakeholder feedback keeps reopening. | Hard cap of 5 loops per `/ux-pipeline` run, with explicit "park this for v2" workflow when a request blocks closure. The doc trail in `.gstack/ux-pipeline/run-*.md` makes parked items reviewable. |
| Build script complexity creeps (templating language, expression eval, custom directives). | One directive only: `{{include path}}`. Anything more lives in skills, not in the build. PR rejection criterion. |
| `/mockup` produces inconsistent screens (different personas use different patterns for the same UI element). | `_components/` partials extracted aggressively; cross-persona consistency check runs as a final gap before loop exit. |
| Stakeholders mistake the mockup for production. | Banner watermark on every `mockup-dist/` page reading "Mockup — not implemented." Toggleable via flag for clean demo screenshots. |
| Mockup files diverge from `DESIGN.md` over many iterations. | `DESIGN.md` is the source of truth for engineers, regenerated from `mockup/styles.css :root` + Layer 2 comments at every `/design-consultation` run. Drift between `DESIGN.md` and `styles.css` is a CI lint. |

---

## Shared infrastructure (new in v3.1)

| Item | Purpose | Lives at |
|---|---|---|
| **M1: Include resolver build script** | Resolves `{{include path}}` recursively, copies static assets, writes `mockup-dist/`. ~50 lines bun script. | `scripts/build-mockup.ts` |
| **M2: Mockup serve + tunnel** | Serves `mockup-dist/` via `browse/server.ts`, optional ngrok tunnel for stakeholder URLs. | `scripts/serve-mockup.ts` |
| **M3: Workflow schema** | YAML/JSON schema for `docs/WORKFLOWS.md` parseable sections. Enables cross-skill consumption. | `lib/schemas/workflow.schema.json` |
| **M4: Persona-workflow matrix gap report** | Util that reads `PERSONAS.md` + `WORKFLOWS.md` and prints missing combinations. Used by `/ux-pipeline` gap pass. | `lib/ux-pipeline/gap-detect.ts` |
| **M5: Mockup screenshot capture** | Headless Playwright job that captures every screen in `mockup-dist/` as PNG + names them per workflow. Enables `/investor-update` integration and per-loop visual diffs. | `lib/mockup/screenshot.ts` |
| **M6: Stakeholder-feedback ledger** | Append-only log of stakeholder comments tied to specific screens. Inputs to `/ux-pipeline` AskUserQuestion next loop. | `.gstack/ux-pipeline/feedback.jsonl` |

---

## Open questions for v3.1 kickoff

1. **Mockup hosting URL strategy** — ngrok tunnel (ephemeral, per-session) vs. GitHub Pages (stable, public) vs. a dedicated mockup-hosting subdomain on hstack infra. Stable URLs aid stakeholder review but require auth (mockups may contain unreleased product info).
2. **Variant tracking** — when `/mockup` forks an A/B variant of a screen, how do stakeholders compare? Side-by-side rendering in `index.html`? Separate sub-pages? Annotated in the screenshot capture? Likely picked when first real A/B request lands.
3. **Mock-data realism floor** — auto-generated names/avatars (Faker.js shaped) vs. project-supplied realistic content. Recommend Faker for v1 with clean override path via `data/*.json` hand-edits.
4. **Wave 1 first build target** — pick a real project to run `/product-ci` + `/ux-workflows` against on the first wave-1 ship, to surface unknowns before the visible-payoff Wave 2 ships. arokago-v3, supertonic-v3, or a new project.
5. **`MOCKUP-ARCHITECTURE.md` open questions** — five open questions in that doc (CSS authoring style, component partial granularity, tour vs. switcher UX, dark-mode handling, mobile rendering). Each gets answered when Wave 2 starts and the first concrete decision is forced.
6. **Migration of existing `preview.html` projects** — arokago-v3 already has the bloated pattern. Does Wave 1 include a `/mockup-migrate` skill that runs the three-pass migration described in `MOCKUP-ARCHITECTURE.md`, or is that hand-done per project?

---

## What this v3.1 is *not*

- **Not a replacement for Figma.** Designers who prefer vector-first tools should still use them. v3.1 generates a code-native mockup that engineers can extend into production directly; it competes with "wireframe then rebuild" workflows, not with serious design tooling.
- **Not a component library.** Mockup components live in `mockup/screens/_components/`. They are not portable, not versioned, not published. They exist to keep iteration cheap and may be discarded entirely when implementation rebuilds against `DESIGN.md`.
- **Not a UX research tool.** v3.1 produces a clickable artifact for stakeholder review. It does not analyze stakeholder behavior, log interactions, or A/B test variants in a measurable way. That belongs in production analytics, not mockup-stage skills.
- **Not a substitute for `/ux-audit`.** Mockup review catches missing screens and UX gaps in *intent*; `/ux-audit` catches gaps in *implementation*. v3.1 makes the first audit cheaper; it does not eliminate the second.

---

## Day-one usage scenarios

When v3.1 Wave 1 ships, three real projects can use it immediately:

1. **arokago-v3** — migrate the existing `docs/design/` to the layered architecture, then resume iteration with stakeholders at ~10x lower per-edit token cost. Per `MOCKUP-ARCHITECTURE.md` migration section.
2. **A new client project** — runs the full `/ux-pipeline` from `/office-hours` through stakeholder review before any production code. The first end-to-end validation of the pipeline.
3. **supertonic-v3** — does not need a mockup (research/CLI product) but the `/ux-workflows` skill applied to its developer-experience surface is still useful for the eventual SDK API design.
