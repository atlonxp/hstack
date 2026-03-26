# hstack (Hall Stack)

**A CTO's software factory for Claude Code** — derived from [garrytan/gstack](https://github.com/garrytan/gstack), extended with research-grade intelligence.

Hi, I'm [Hall](https://x.com/atlonxp). I'm a CTO building AI products — from computer vision to financial ML to multiagent systems — and right now I am in the middle of something that feels like a new era entirely.

I forked [Garry Tan's gstack](https://github.com/garrytan/gstack) — his open source software factory that turns Claude Code into a virtual engineering team — and I'm making it better. Not because gstack was broken, but because a CTO who has spent years building AI systems sees gaps that a general-purpose toolkit doesn't cover. Stakeholder workflows that span multiple personas. Technology landscape intelligence that recommends with conviction, not menus. The kind of thinking a research-trained technologist brings to product development.

**What hstack adds on top of gstack:**

- **`/plan-ux-review`** — UX researcher-mode plan review. Maps multi-persona workflows, handoff points, business process state machines, and permission divergence. Seven passes, each rated 0-10. Catches the gaps that single-user reviews miss: what happens when the approver is on vacation? What does the admin see vs the end user? Where do workflows break between personas?

- **`/discover`** — CTO-mode technology & product intelligence. Scans competitors, scouts emerging tech, finds market gaps, delivers build-vs-buy analysis with Wardley mapping. Not a report generator — a visionary CTO who synthesizes and recommends with conviction. Every recommendation includes a 30-minute proof-of-concept plan.

- **`/autoplan-full`** — The complete CTO planning pipeline in one command. Runs office-hours → discover → CEO → UX → design → eng review. Interactive for framing (phases 1-2), auto-decided for reviews (phases 3-6). Two human gates: confirm framing, approve final plan.

- **`/autobuild`** — Autonomous implementation from an approved plan. Reads the plan, extracts implementation steps, builds everything with full autonomy. Optional checkpoints for review between components.

- **`/autoaudit`** — Post-build verification. Runs security audit (CSO) then code review (review + codex). Auto-fixes obvious issues, flags ambiguous ones. Clear pass/fail verdict. No shipping — that's your call.

- **`/verify-loop`** — Self-healing verification loop. After building, traces every code path, auto-fixes BROKEN items, presents INCOMPLETE items for your decision. Max 3 iterations with regression detection — if a fix breaks something new, it stops immediately.

- **`/context`** — Project intelligence briefing. Reads cross-session memory from findings logged by review, CSO, and investigate skills. Shows hotspot files, recurring patterns, and trends. Run at session start to get up to speed.

- **`/check-ci`**, **`/check-deps`**, **`/check-issues`** — One-shot status checks. CI status via `gh`/`glab`, dependency audit via `npm audit`/`pip audit`/etc., issue triage with priority categorization. No daemons — run when you need them.

**hstack is gstack + a CTO's lens.** Same foundation. Same MIT license. All the upstream specialists plus five new ones that make the team complete. Built on the shoulders of a giant — credit where it's due.

Fork it. Improve it. Make it yours.

**Who this is for:**
- **Founders and CEOs** — especially technical ones who still want to ship
- **First-time Claude Code users** — structured roles instead of a blank prompt
- **Tech leads and staff engineers** — rigorous review, QA, and release automation on every PR

## Quick start

1. Install hstack (30 seconds — see below)
2. Run `/autoplan-full` — describe your idea, get a fully reviewed plan (now with task checkboxes)
3. Run `/autobuild` — implement the plan (now with self-healing verify loop)
4. Run `/autoaudit` — verify security + code quality
5. Run `/ship` — when you're ready

Or go manual: `/office-hours` → `/discover` → `/plan-ceo-review` → `/plan-ux-review` → `/plan-design-review` → `/plan-eng-review` → build → `/review` → `/cso` → `/qa` → `/ship`.

## Install — 30 seconds

**Requirements:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Bun](https://bun.sh/) v1.0+, [Node.js](https://nodejs.org/) (Windows only)

### Step 1: Install on your machine

Open Claude Code and paste this. Claude does the rest.

> Install hstack: run **`git clone https://github.com/atlonxp/hstack.git ~/.claude/skills/hstack && cd ~/.claude/skills/hstack && ./setup`** then add an "hstack" section to CLAUDE.md that says to use the /browse skill from hstack for all web browsing, never use mcp\_\_claude-in-chrome\_\_\* tools, and lists the available skills: /office-hours, /discover, /plan-ceo-review, /plan-eng-review, /plan-design-review, /plan-ux-review, /design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /autoplan-full, /autobuild, /autoaudit, /verify-loop, /context, /check-ci, /check-deps, /check-issues, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade. Then ask the user if they also want to add hstack to the current project so teammates get it.

### Step 2: Add to your repo so teammates get it (optional)

> Add hstack to this project: run **`cp -Rf ~/.claude/skills/hstack .claude/skills/hstack && rm -rf .claude/skills/hstack/.git && cd .claude/skills/hstack && ./setup`** then add an "hstack" section to this project's CLAUDE.md that says to use the /browse skill from hstack for all web browsing, never use mcp\_\_claude-in-chrome\_\_\* tools, lists the available skills: /office-hours, /discover, /plan-ceo-review, /plan-eng-review, /plan-design-review, /plan-ux-review, /design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /verify-loop, /context, /check-ci, /check-deps, /check-issues, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, and tells Claude that if hstack skills aren't working, run `cd .claude/skills/hstack && ./setup` to build the binary and register skills.

Real files get committed to your repo (not a submodule), so `git clone` just works. Everything lives inside `.claude/`. Nothing touches your PATH or runs in the background.

### Codex, Gemini CLI, or Cursor

hstack works on any agent that supports the [SKILL.md standard](https://github.com/anthropics/claude-code). Skills live in `.agents/skills/` and are discovered automatically.

Install to one repo:

```bash
git clone https://github.com/atlonxp/hstack.git .agents/skills/hstack
cd .agents/skills/hstack && ./setup --host codex
```

Install once for your user account:

```bash
git clone https://github.com/atlonxp/hstack.git ~/hstack
cd ~/hstack && ./setup --host codex
```

Or let setup auto-detect which agents you have installed:

```bash
git clone https://github.com/atlonxp/hstack.git ~/hstack
cd ~/hstack && ./setup --host auto
```

## Zero to MVP — the full journey

This is what a complete product cycle looks like with hstack. Every skill feeds into the next. Nothing falls through the cracks because every step knows what came before it.

### Phase 1: Think — define the problem before you solve it

```
You:    /office-hours
        "I want to build a daily briefing app for my calendar."

Claude: I'm going to push back on the framing. You said "daily briefing
        app." But what you actually described is a personal chief of staff AI.
        [six forcing questions — extracts the real pain]
        [challenges 4 premises — you agree, disagree, or adjust]
        [generates 3 implementation approaches with effort estimates]
        → writes design doc that feeds into every downstream skill
```

### Phase 2: Discover — research the landscape before you design

```
You:    /discover
        [reads your design doc from /office-hours]
        [scans competitors, scouts emerging tech, finds market gaps]
        [delivers build-vs-buy analysis with Wardley mapping]
        → writes research brief: "Use X for auth, build Y yourself, skip Z — here's why"
        → each recommendation includes a 30-minute proof-of-concept plan
```

### Phase 3: Plan — review from every angle before you write code

You can run each review manually for full control, or use `/autoplan` to run them all automatically.

**Manual approach** (recommended when you want to make decisions at each step):

```
You:    /plan-ceo-review       → challenges scope, finds the 10-star product
You:    /plan-design-review    → rates every design dimension 0-10, catches AI slop
You:    /plan-ux-review        → maps multi-persona workflows, catches handoff gaps
You:    /plan-eng-review       → locks architecture, data flow, edge cases, test plan
```

**Fast approach** (when you trust the process):

```
You:    /autoplan              → runs CEO → design → eng review automatically
                                  surfaces only taste decisions for your approval
```

**Full autopilot** (hstack exclusive — idea to reviewed plan in one command):

```
You:    /autoplan-full         → runs office-hours → discover → CEO → UX → design → eng
                                  interactive for framing, auto-decided for reviews
                                  two gates: confirm framing, approve final plan
```

### Phase 4: Build — approve the plan and let Claude write the code

```
You:    /autobuild             → reads the plan, builds everything autonomously
Claude: [implements component by component, tests alongside each one]
        [2,400 lines across 11 files, 9 new tests. ~8 minutes.]
```

Or manually: "Approve plan. Exit plan mode." and let Claude build.

### Phase 5: Review + Secure — verify what was built

```
You:    /autoaudit             → runs CSO + review in one command
Claude: [security: 2 critical findings auto-fixed, 1 flagged]
        [review: 3 issues auto-fixed, race condition flagged]
        [verdict: PASS WITH NOTES — check flagged items]
```

Or manually:

```
You:    /review
Claude: [AUTO-FIXED] 2 issues. [ASK] Race condition → you approve fix.

You:    /cso
Claude: [OWASP Top 10 + STRIDE threat model]
        [2 findings at 9/10 confidence — SQL injection in search endpoint,
         missing CSRF token on form submit]

You:    /codex                 → optional: independent second opinion from another AI
```

### Phase 6: Test — open a real browser and find what humans find

```
You:    /qa https://staging.myapp.com
Claude: [opens real Chromium browser, clicks through every flow]
        [finds a bug: "Add to Cart" button doesn't disable during submit]
        [fixes it, generates regression test, re-verifies with screenshot]

You:    /benchmark
Claude: [baselines page load times, Core Web Vitals, resource sizes]
        [flags: hero image is 2.4MB unoptimized → compressed to 180KB]
```

### Phase 7: Ship — one command from "ready" to "PR created"

```
You:    /ship
Claude: Syncs main, runs tests (42 → 51, +9 new), audits coverage,
        pushes branch, opens PR. → github.com/you/app/pull/42
```

### Phase 8: Deploy + Verify — from "approved" to "verified in production"

```
You:    /land-and-deploy
Claude: Merges PR, waits for CI + deploy, verifies production health.

You:    /canary
Claude: [monitors for 15 minutes — console errors, perf regressions, page failures]
        All clear. No regressions detected.
```

### Phase 9: Reflect — update docs and learn from the sprint

```
You:    /document-release
Claude: [reads every doc file, cross-references the diff]
        [updates README, ARCHITECTURE, CHANGELOG — catches stale docs automatically]

You:    /retro
Claude: [per-person breakdowns, shipping streaks, test health trends]
        [growth opportunities, what went well, what to improve]
```

**That's the full cycle.** Idea → research → plan → build → review → secure → test → ship → deploy → verify → document → reflect. One person. One tool. Production-ready MVP.

## Which skill do I use?

| I want to... | Run this |
|--------------|----------|
| Go from idea to MVP (full autopilot) | `/autoplan-full` → `/autobuild` → `/autoaudit` → `/qa` → `/ship` |
| Start a new project or feature (manual) | `/office-hours` → `/discover` → plan reviews → build |
| Get a fully reviewed plan fast | `/autoplan-full` (idea → plan) or `/autoplan` (plan → reviewed plan) |
| Review each plan step with full control | `/plan-ceo-review` → `/plan-design-review` → `/plan-ux-review` → `/plan-eng-review` |
| Build from an approved plan | `/autobuild` |
| Verify code after building | `/autoaudit` (CSO + review in one command) |
| Build a design system from scratch | `/design-consultation` |
| Review code before shipping | `/review` (+ `/codex` for second opinion) |
| Audit security | `/cso` |
| Find and fix bugs on a live site | `/qa` (or `/qa-only` for report without fixes) |
| Debug a specific issue | `/investigate` |
| Ship a PR | `/ship` |
| Deploy and verify production | `/land-and-deploy` → `/canary` |
| Measure performance | `/benchmark` |
| Update docs after shipping | `/document-release` |
| Run a team retrospective | `/retro` (or `/retro global` for cross-project) |
| Browse a site with real eyes | `/browse` |
| Test authenticated pages | `/setup-browser-cookies` → `/qa` |
| Protect against destructive commands | `/careful` or `/guard` (= careful + freeze) |
| Lock edits to one directory | `/freeze` (undo with `/unfreeze`) |
| Verify build completeness | `/verify-loop` |
| Get project context at session start | `/context` |
| Check CI status | `/check-ci` |
| Audit dependencies | `/check-deps` |
| Triage open issues | `/check-issues` |
| Upgrade hstack | `/gstack-upgrade` |

## The sprint

hstack is a process, not a collection of tools. The skills run in the order a sprint runs:

**Think → Discover → Plan → Build → Review → Secure → Test → Ship → Deploy → Reflect**

```
/office-hours ──→ /discover ──→ /plan-ceo-review ──→ /plan-ux-review
                                                            │
    ┌───────────────────────────────────────────────────────┘
    ▼
/plan-design-review ──→ /plan-eng-review ──→ [build] ──→ /review ──→ /cso
                                                                       │
    ┌──────────────────────────────────────────────────────────────────┘
    ▼
/qa ──→ /benchmark ──→ /ship ──→ /land-and-deploy ──→ /canary
                                                          │
    ┌─────────────────────────────────────────────────────┘
    ▼
/document-release ──→ /retro

Shortcuts:
  /autoplan-full  = office-hours → discover → CEO → UX → design → eng (idea to plan)
  /autoplan       = CEO → design → eng (existing plan to reviewed plan)
  /autobuild      = plan → implemented code (includes verify loop)
  /autoaudit      = CSO + review (verify after build)
  /verify-loop    = post-build self-healing (standalone or via /autobuild)
```

| Skill | Your specialist | What they do |
|-------|----------------|--------------|
| `/office-hours` | **YC Office Hours** | Start here. Six forcing questions that reframe your product before you write code. Pushes back on your framing, challenges premises, generates implementation alternatives. Design doc feeds into every downstream skill. |
| `/discover` | **Visionary CTO** | Technology & product intelligence. Scans competitors, scouts emerging tech, finds market gaps, delivers build-vs-buy analysis. Opinionated recommendations with 30-minute proof-of-concept plans. |
| `/plan-ceo-review` | **CEO / Founder** | Rethink the problem. Find the 10-star product hiding inside the request. Four modes: Expansion, Selective Expansion, Hold Scope, Reduction. |
| `/plan-design-review` | **Senior Designer** | Rates each design dimension 0-10, explains what a 10 looks like, then edits the plan to get there. AI Slop detection. Interactive — one AskUserQuestion per design choice. |
| `/plan-ux-review` | **UX Researcher** | Maps stakeholder workflows, persona journeys, handoff points, and cross-feature flows. 7 passes with 0-10 ratings. Catches multi-persona gaps that single-user reviews miss. |
| `/plan-eng-review` | **Eng Manager** | Lock in architecture, data flow, diagrams, edge cases, and tests. Forces hidden assumptions into the open. |
| `/autoplan` | **Review Pipeline** | One command, fully reviewed plan. Runs CEO → design → eng review automatically with encoded decision principles. Surfaces only taste decisions for your approval. |
| `/autoplan-full` | **Full CTO Pipeline** | Idea to fully reviewed plan. Runs office-hours → discover → CEO → UX → design → eng. Interactive for framing, auto-decided for reviews. Two gates: confirm framing, approve final plan. |
| `/autobuild` | **Autonomous Builder** | Plan to implemented code. Reads the approved plan, builds component by component, writes tests alongside. Optional checkpoints between components. |
| `/autoaudit` | **Verification Pipeline** | Post-build security + quality check. Runs CSO then review + codex. Auto-fixes obvious issues, flags ambiguous ones. Pass/fail verdict without shipping. |
| `/verify-loop` | **Build Inspector** | Self-healing verification loop. Traces code paths, auto-fixes BROKEN items, presents INCOMPLETE items. Max 3 iterations with regression detection. |
| `/context` | **Project Memory** | Cross-session intelligence briefing. Reads findings from all skills, shows hotspots, recurring patterns, and trends. |
| `/check-ci` | **CI Monitor** | One-shot CI status check via `gh`/`glab`. Reports pass/fail with failure details. |
| `/check-deps` | **Dependency Auditor** | One-shot dependency security audit. Detects package manager, reports vulnerabilities by severity. |
| `/check-issues` | **Issue Triager** | One-shot issue triage. Categorizes by priority, suggests what to work on next. |
| `/design-consultation` | **Design Partner** | Build a complete design system from scratch. Researches the landscape, proposes creative risks, generates realistic product mockups. |
| `/review` | **Staff Engineer** | Find the bugs that pass CI but blow up in production. Auto-fixes the obvious ones. Flags completeness gaps. |
| `/cso` | **Chief Security Officer** | OWASP Top 10 + STRIDE threat model. Zero-noise: 17 false positive exclusions, 8/10+ confidence gate. Each finding includes a concrete exploit scenario. |
| `/codex` | **Second Opinion** | Independent code review from OpenAI Codex CLI. Three modes: review (pass/fail gate), adversarial challenge, and open consultation. |
| `/investigate` | **Debugger** | Systematic root-cause debugging. Iron Law: no fixes without investigation. Traces data flow, tests hypotheses, stops after 3 failed fixes. |
| `/design-review` | **Designer Who Codes** | Same audit as /plan-design-review, then fixes what it finds. Atomic commits, before/after screenshots. |
| `/qa` | **QA Lead** | Test your app, find bugs, fix them with atomic commits, re-verify. Auto-generates regression tests for every fix. |
| `/qa-only` | **QA Reporter** | Same methodology as /qa but report only. Pure bug report without code changes. |
| `/benchmark` | **Performance Engineer** | Baseline page load times, Core Web Vitals, and resource sizes. Compare before/after on every PR. |
| `/ship` | **Release Engineer** | Sync main, run tests, audit coverage, push, open PR. Bootstraps test frameworks if you don't have one. |
| `/land-and-deploy` | **Release Engineer** | Merge the PR, wait for CI and deploy, verify production health. One command from "approved" to "verified in production." |
| `/canary` | **SRE** | Post-deploy monitoring loop. Watches for console errors, performance regressions, and page failures. |
| `/document-release` | **Technical Writer** | Update all project docs to match what you just shipped. Catches stale READMEs automatically. |
| `/retro` | **Eng Manager** | Team-aware weekly retro. Per-person breakdowns, shipping streaks, test health trends, growth opportunities. `/retro global` runs across all your projects and AI tools (Claude Code, Codex, Gemini). |
| `/browse` | **QA Engineer** | Give the agent eyes. Real Chromium browser, real clicks, real screenshots. ~100ms per command. `$B connect` launches your real Chrome as a headed window — watch every action live. |
| `/setup-browser-cookies` | **Session Manager** | Import cookies from your real browser (Chrome, Arc, Brave, Edge) into the headless session. Test authenticated pages. |

### Power tools

| Skill | What it does |
|-------|-------------|
| `/careful` | **Safety Guardrails** — warns before destructive commands (rm -rf, DROP TABLE, force-push). Say "be careful" to activate. Override any warning. |
| `/freeze` | **Edit Lock** — restrict file edits to one directory. Prevents accidental changes outside scope while debugging. |
| `/guard` | **Full Safety** — `/careful` + `/freeze` in one command. Maximum safety for prod work. |
| `/unfreeze` | **Unlock** — remove the `/freeze` boundary. |
| `/setup-deploy` | **Deploy Configurator** — one-time setup for `/land-and-deploy`. Detects your platform, production URL, and deploy commands. |
| `/gstack-upgrade` | **Self-Updater** — upgrade to latest. Detects global vs vendored install, syncs both, shows what changed. |

**[Deep dives with examples and philosophy for every skill →](docs/skills.md)**

## Parallel sprints

hstack works well with one sprint. It gets interesting with ten running at once.

**Design is at the heart.** `/design-consultation` doesn't just pick fonts. It researches what's out there in your space, proposes safe choices AND creative risks, generates realistic mockups of your actual product, and writes `DESIGN.md` — and then `/design-review` and `/plan-eng-review` read what you chose. Design decisions flow through the whole system.

**`/qa` was a massive unlock.** It let me go from 6 to 12 parallel workers. Claude Code saying *"I SEE THE ISSUE"* and then actually fixing it, generating a regression test, and verifying the fix — that changed how I work. The agent has eyes now.

**Smart review routing.** Just like at a well-run startup: CEO doesn't have to look at infra bug fixes, design review isn't needed for backend changes. gstack tracks what reviews are run, figures out what's appropriate, and just does the smart thing. The Review Readiness Dashboard tells you where you stand before you ship.

**Test everything.** `/ship` bootstraps test frameworks from scratch if your project doesn't have one. Every `/ship` run produces a coverage audit. Every `/qa` bug fix generates a regression test. 100% test coverage is the goal — tests make vibe coding safe instead of yolo coding.

**`/document-release` is the engineer you never had.** It reads every doc file in your project, cross-references the diff, and updates everything that drifted. README, ARCHITECTURE, CONTRIBUTING, CLAUDE.md, TODOS — all kept current automatically. And now `/ship` auto-invokes it — docs stay current without an extra command.

**Real browser mode.** `$B connect` launches your actual Chrome as a headed window controlled by Playwright. You watch Claude click, fill, and navigate in real time — same window, same screen. A subtle green shimmer at the top edge tells you which Chrome window gstack controls. All existing browse commands work unchanged. `$B disconnect` returns to headless. A Chrome extension Side Panel shows a live activity feed of every command and a chat sidebar where you can direct Claude. This is co-presence — Claude isn't remote-controlling a hidden browser, it's sitting next to you in the same cockpit.

**Sidebar agent — your AI browser assistant.** Type natural language instructions in the Chrome side panel and a child Claude instance executes them. "Navigate to the settings page and screenshot it." "Fill out this form with test data." "Go through every item in this list and extract the prices." Each task gets up to 5 minutes. The sidebar agent runs in an isolated session, so it won't interfere with your main Claude Code window. It's like having a second pair of hands in the browser.

**Personal automation.** The sidebar agent isn't just for dev workflows. Example: "Browse my kid's school parent portal and add all the other parents' names, phone numbers, and photos to my Google Contacts." Two ways to get authenticated: (1) log in once in the headed browser — your session persists, or (2) run `/setup-browser-cookies` to import cookies from your real Chrome. Once authenticated, Claude navigates the directory, extracts the data, and creates the contacts.

**Browser handoff when the AI gets stuck.** Hit a CAPTCHA, auth wall, or MFA prompt? `$B handoff` opens a visible Chrome at the exact same page with all your cookies and tabs intact. Solve the problem, tell Claude you're done, `$B resume` picks up right where it left off. The agent even suggests it automatically after 3 consecutive failures.

**Multi-AI second opinion.** `/codex` gets an independent review from OpenAI's Codex CLI — a completely different AI looking at the same diff. Three modes: code review with a pass/fail gate, adversarial challenge that actively tries to break your code, and open consultation with session continuity. When both `/review` (Claude) and `/codex` (OpenAI) have reviewed the same branch, you get a cross-model analysis showing which findings overlap and which are unique to each.

**Safety guardrails on demand.** Say "be careful" and `/careful` warns before any destructive command — rm -rf, DROP TABLE, force-push, git reset --hard. `/freeze` locks edits to one directory while debugging so Claude can't accidentally "fix" unrelated code. `/guard` activates both. `/investigate` auto-freezes to the module being investigated.

**Proactive skill suggestions.** gstack notices what stage you're in — brainstorming, reviewing, debugging, testing — and suggests the right skill. Don't like it? Say "stop suggesting" and it remembers across sessions.

## 10-15 parallel sprints

gstack is powerful with one sprint. It is transformative with ten running at once.

[Conductor](https://conductor.build) runs multiple Claude Code sessions in parallel — each in its own isolated workspace. One session running `/office-hours` on a new idea, another doing `/review` on a PR, a third implementing a feature, a fourth running `/qa` on staging, and six more on other branches. All at the same time. I regularly run 10-15 parallel sprints — that's the practical max right now.

The sprint structure is what makes parallelism work. Without a process, ten agents is ten sources of chaos. With a process — think, plan, build, review, test, ship — each agent knows exactly what to do and when to stop. You manage them the way a CEO manages a team: check in on the decisions that matter, let the rest run.

---

Free, MIT licensed, open source. No premium tier, no waitlist.

I open sourced how I build software. You can fork it and make it your own.

> **Upstream:** hstack is derived from [garrytan/gstack](https://github.com/garrytan/gstack) with `/plan-ux-review`, `/discover`, `/autoplan-full`, `/autobuild`, `/autoaudit`, `/verify-loop`, `/context`, `/check-ci`, `/check-deps`, and `/check-issues` added.
> Pull from upstream regularly to stay current. Contributions welcome.

## Docs

| Doc | What it covers |
|-----|---------------|
| [Skill Deep Dives](docs/skills.md) | Philosophy, examples, and workflow for every skill (includes Greptile integration) |
| [Builder Ethos](ETHOS.md) | Builder philosophy: Boil the Lake, Search Before Building, three layers of knowledge |
| [Architecture](ARCHITECTURE.md) | Design decisions and system internals |
| [Browser Reference](BROWSER.md) | Full command reference for `/browse` |
| [Contributing](CONTRIBUTING.md) | Dev setup, testing, contributor mode, and dev mode |
| [Changelog](CHANGELOG.md) | What's new in every version |

## Privacy & Telemetry

hstack includes **opt-in** usage telemetry (inherited from gstack) to help improve the project. Here's exactly what happens:

- **Default is off.** Nothing is sent anywhere unless you explicitly say yes.
- **On first run,** it asks if you want to share anonymous usage data. You can say no.
- **What's sent (if you opt in):** skill name, duration, success/fail, version, OS. That's it.
- **What's never sent:** code, file paths, repo names, branch names, prompts, or any user-generated content.
- **Change anytime:** `gstack-config set telemetry off` disables everything instantly.

Data is stored in [Supabase](https://supabase.com) (open source Firebase alternative). The schema is in [`supabase/migrations/`](supabase/migrations/) — you can verify exactly what's collected. The Supabase publishable key in the repo is a public key (like a Firebase API key) — row-level security policies deny all direct access. Telemetry flows through validated edge functions that enforce schema checks, event type allowlists, and field length limits.

**Local analytics are always available.** Run `gstack-analytics` to see your personal usage dashboard from the local JSONL file — no remote data needed.

## Troubleshooting

**Skill not showing up?** `cd ~/.claude/skills/hstack && ./setup`

**`/browse` fails?** `cd ~/.claude/skills/hstack && bun install && bun run build`

**Stale install?** Run `/gstack-upgrade` — or set `auto_upgrade: true` in `~/.gstack/config.yaml`

**Codex says "Skipped loading skill(s) due to invalid SKILL.md"?** Your Codex skill descriptions are stale. Fix: `cd ~/.codex/skills/gstack && git pull && ./setup --host codex` — or for repo-local installs: `cd "$(readlink -f .agents/skills/gstack)" && git pull && ./setup --host codex`

**Windows users:** gstack works on Windows 11 via Git Bash or WSL. Node.js is required in addition to Bun — Bun has a known bug with Playwright's pipe transport on Windows ([bun#4253](https://github.com/oven-sh/bun/issues/4253)). The browse server automatically falls back to Node.js. Make sure both `bun` and `node` are on your PATH.

**Claude says it can't see the skills?** Make sure your project's `CLAUDE.md` has an hstack section. Add this:

```
## hstack
Use /browse from hstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /discover, /plan-ceo-review, /plan-eng-review,
/plan-design-review, /plan-ux-review, /design-consultation, /review, /ship,
/land-and-deploy, /canary, /benchmark, /browse, /qa, /qa-only, /design-review,
/setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release,
/codex, /cso, /autoplan, /autoplan-full, /autobuild, /autoaudit, /verify-loop, /context,
/check-ci, /check-deps, /check-issues, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade.
```

## License

MIT. Free forever. Go build something.
