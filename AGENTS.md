# gstack — AI Engineering Workflow

gstack is a collection of SKILL.md files that give AI agents structured roles for
software development. Each skill is a specialist: CEO reviewer, eng manager,
designer, QA lead, release engineer, debugger, and more.

## Available skills

Skills live in `.agents/skills/` (or `~/.claude/skills/gstack/` on Claude Code).
Invoke them by name (e.g., `/office-hours`).

### Plan-mode reviews

| Skill | What it does |
|-------|-------------|
| `/office-hours` | Start here. Reframes your product idea before you write code. |
| `/plan-ceo-review` | CEO-level review: find the 10-star product in the request. |
| `/plan-eng-review` | Lock architecture, data flow, edge cases, and tests. |
| `/plan-design-review` | Rate each design dimension 0-10, explain what a 10 looks like. |
| `/plan-devex-review` | DX-mode review: TTHW, magical moments, friction points, persona traces. |
| `/plan-tune` | Self-tune AskUserQuestion sensitivity per question. |
| `/autoplan` | One command runs CEO → design → eng → DX review. |
| `/design-consultation` | Build a complete design system from scratch. |
| `/spec` | Turn vague intent into a precise, executable spec in five phases. Files a GitHub issue, optionally spawns a Claude Code agent in a fresh worktree, and lets `/ship` close the source issue on merge. |

### Implementation + review

| Skill | What it does |
|-------|-------------|
| `/review` | Pre-landing PR review. Finds bugs that pass CI but break in prod. |
| `/codex` | Second opinion via OpenAI Codex. Review, challenge, or consult modes. |
| `/investigate` | Systematic root-cause debugging. No fixes without investigation. |
| `/design-review` | Live-site visual audit + fix loop with atomic commits. |
| `/design-shotgun` | Generate multiple AI design variants, comparison board, iterate. |
| `/design-html` | Generate production-quality Pretext-native HTML/CSS. |
| `/devex-review` | Live developer experience audit (TTHW measured against the real flow). |
| `/qa` | Open a real browser, find bugs, fix them, re-verify. |
| `/qa-only` | Same methodology as /qa but report only — no code changes. |
| `/scrape` | Pull data from a web page. First call prototypes; codified call runs in ~200ms. |
| `/skillify` | Codify the most recent successful `/scrape` flow into a permanent browser-skill. |

### Release + deploy

| Skill | What it does |
|-------|-------------|
| `/ship` | Run tests, review, push, open PR. Workspace-aware version queue. |
| `/land-and-deploy` | Merge the PR, wait for CI and deploy, verify production health. |
| `/canary` | Post-deploy monitoring loop using the browse daemon. |
| `/landing-report` | Read-only dashboard for the workspace-aware ship queue. |
| `/document-release` | Update all docs to match what you just shipped. |
| `/document-generate` | Generate Diataxis docs (tutorial / how-to / reference / explanation) from code. |
| `/setup-deploy` | One-time deploy config detection (Fly.io, Render, Vercel, etc.). |
| `/gstack-upgrade` | Update gstack to the latest version. |

### Operational + memory

| Skill | What it does |
|-------|-------------|
| `/context-save` | Save working context (git state, decisions, remaining work). |
| `/context-restore` | Resume from a saved context, even across Conductor workspaces. |
| `/learn` | Manage what gstack learned across sessions. |
| `/retro` | Weekly retro with per-person breakdowns and shipping streaks. |
| `/health` | Code quality dashboard (type checker, linter, tests, dead code). |
| `/benchmark` | Performance regression detection (page load, Core Web Vitals). |
| `/benchmark-models` | Cross-model benchmark for skills (Claude, GPT, Gemini side-by-side). |
| `/cso` | OWASP Top 10 + STRIDE security audit. |
| `/setup-gbrain` | Set up gbrain for cross-machine session memory sync. |
| `/sync-gbrain` | Keep gbrain current with this repo's code; refresh agent search guidance in CLAUDE.md. |

### Browser + agent integration

| Skill | What it does |
|-------|-------------|
| `/browse` | Headless browser — real Chromium, real clicks, ~100ms/command. |
| `/open-gstack-browser` | Launch the visible GStack Browser with sidebar + stealth. |
| `/setup-browser-cookies` | Import cookies from your real browser for authenticated testing. |
| `/pair-agent` | Pair a remote AI agent (OpenClaw, Codex, etc.) with your browser. |

### iOS QA — drive real iPhones over USB or Tailscale (v1.43.0.0+)

| Skill | What it does |
|-------|-------------|
| `/ios-qa` | Live-device iOS QA via USB CoreDevice tunnel + embedded StateServer. Optionally exposes the device over Tailscale so remote agents can drive it. |
| `/ios-fix` | Autonomous iOS bug fixer with regression snapshot capture. |
| `/ios-design-review` | Designer's-eye QA on a real iPhone — 10-dimension Apple HIG rubric. |
| `/ios-clean` | Convenience: strip DebugBridge + #if DEBUG wiring before a Release build. |
| `/ios-sync` | Regenerate the iOS debug bridge against the latest upstream templates. |

Companion CLIs (run on the Mac that's plugged into the device):

| Command | What it does |
|---------|-------------|
| `gstack-ios-qa-daemon` | Mac-side broker. Loopback by default; `--tailnet` adds a Tailscale-facing listener with capability tiers and audit logging. |
| `gstack-ios-qa-mint` | Owner-grant CLI for the tailnet allowlist (`grant`/`revoke`/`list`). |

End-to-end walkthrough: [docs/howto-ios-testing-with-gstack.md](docs/howto-ios-testing-with-gstack.md).

### Safety + scoping

| Skill | What it does |
|-------|-------------|
| `/careful` | Warn before destructive commands (rm -rf, DROP TABLE, force-push). |
| `/freeze` | Lock edits to one directory. Hard block, not just a warning. |
| `/guard` | Activate both careful + freeze at once. |
| `/unfreeze` | Remove directory edit restrictions. |
| `/make-pdf` | Turn any markdown file into a publication-quality PDF. |

## Build commands

```bash
bun install              # install dependencies
bun test                 # run free tests (no API spend)
bun run test:windows     # curated Windows-safe subset (runs on windows-latest)
bun run build            # generate docs + compile binaries
bun run gen:skill-docs   # regenerate SKILL.md files from templates
bun run skill:check      # health dashboard for all skills
```

## Platform support

- **macOS** + **Linux**: full test suite supported.
- **Windows**: curated Windows-safe subset runs on `windows-latest` via the
  `windows-free-tests` CI job. Setup script (`./setup`) requires Git Bash or
  MSYS today; native PowerShell support is a future expansion. The `bin/gstack-paths`
  helper resolves state roots through `CLAUDE_PLUGIN_DATA` / `GSTACK_HOME` so plugin
  installs work on every platform.

## Key conventions

- SKILL.md files are **generated** from `.tmpl` templates. Edit the template, not the output.
- Run `bun run gen:skill-docs --host codex` to regenerate Codex-specific output.
- The browse binary provides headless browser access. Use `$B <command>` in skills.
- Safety skills (careful, freeze, guard) use inline advisory prose — always confirm before destructive operations.
- State paths resolve via `bin/gstack-paths` (sourced via `eval "$(...)"`). Honors `GSTACK_HOME`, `CLAUDE_PLUGIN_DATA`, `CLAUDE_PLANS_DIR`.
- The `claude` CLI binary resolves via `browse/src/claude-bin.ts` (`Bun.which()` + `GSTACK_CLAUDE_BIN` override). Set `GSTACK_CLAUDE_BIN=wsl` plus `GSTACK_CLAUDE_BIN_ARGS='["claude"]'` to run Claude through WSL on Windows.

### hstack-only skills

| Skill | What it does |
|-------|-------------|
| `/discover` | CTO-mode product/tech intelligence: scans competitors, scouts emerging tech, finds market gaps. |
| `/discover-personas` | Persona discovery for UX/feature pipelines. |
| `/define-workflows` | Map persona workflows end-to-end before building. |
| `/gap-analysis` | Per-persona feature gap analysis. |
| `/feature-build` | Build a single feature with persona-aware planning + verification. |
| `/auto-feature-build` | Per-persona auto feature pipeline with gap-fill + build + audit. |
| `/auto-feature-build-full` | Cross-persona feature gap-fill + build + audit across ALL personas. |
| `/ux-audit` | Persona-driven UX workflow audit on a live site. |
| `/auto-ux-audit` | Single-persona UX audit with auto-fix loop. |
| `/auto-ux-audit-full` | Full UX audit across ALL personas with auto-fix + cross-persona regression detection. |
| `/plan-ux-review` | UX researcher plan review: stakeholder workflows, persona journeys. |
| `/intel` | Project intelligence briefing — cross-session memory of recurring patterns. |
| `/investigate-workflow` | Post-implementation workflow completeness investigator. |
| `/verify-loop` | Post-build verification loop. |
| `/autoplan-full` | Full CTO planning pipeline (office-hours → discover → CEO/UX/DX/design/eng review). |
| `/autobuild` | Autonomous implementation from an approved plan. |
| `/autoaudit` | Post-build verification: security audit + code review. |
| `/check-ci` | One-shot CI status check (GitHub Actions / GitLab CI). |
| `/check-deps` | Dependency staleness + vulnerability check. |
| `/check-issues` | Open-issues triage for the current repo. |

### hstack extended skills (v3 multi-hat expansion)

| Skill | What it does |
|-------|-------------|
| `/accessibility-audit` | WCAG 2.2 AA conformance audit augmented with assistive-tech behavioral testing. |
| `/adr` | Architecture Decision Record generator + linter (Michael Nygard format). |
| `/agent-design` | Designs an LLM agent as a typed state machine, not an ad-hoc while-loop. |
| `/agent-ux-review` | Reviews an AI feature's interaction flow against agent-UX principles — predictability, repair, attention budget, surfaced uncertainty, escape hatches, mode visibility. |
| `/api-contract-test` | Generate consumer-driven contract tests (Pact, or equivalent) from an OpenAPI / GraphQL / Protobuf spec, wire them into CI for both producer and consumer sides, and maintain a... |
| `/api-design` | Design or audit an API surface. |
| `/aso` | App Store Optimization. |
| `/auto-guard` | Automatic security + QA hooks for git events. |
| `/avatar-design` | Full avatar architecture designer. |
| `/avatar-sign` | Sign-language-performing avatar pipeline. |
| `/backtest` | Point-in-time, look-ahead-free backtest harness for algorithmic strategies. |
| `/behavioral-experiment` | Design a behavioral A/B / multi-arm experiment with proper power analysis, randomization strategy, primary + guardrail metrics, **pre- registered analysis plan**... |
| `/biases-audit` | Defensive cognitive-bias audit. |
| `/blueprint` | Structured study of an external target (product, paper, codebase, app, or SDK/API) that produces a domain-agnostic BLUEPRINT.md plus |
| `/board-deck` | Board deck generator following the YC-style template — Traction, Financials, Product, Team, Risks, Asks. |
| `/bug-bounty-triage` | Bug-bounty report triage pipeline. |
| `/buy-vs-build` | Vendor-vs-build scorecard. |
| `/c4-diagram` | Generates the four C4 model levels (System Context, Container, Component, Code) from the actual codebase, not whiteboard memory. |
| `/chaos` | Design and run chaos engineering experiments per dependency-graph node. |
| `/clone-and-twist` | Build the transposed version of a studied mechanism. |
| `/cognitive-load-audit` | Quantifies cognitive load on a surface using Sweller's intrinsic / extraneous / germane split. |
| `/collaboration-pattern` | Picks the right human-AI collaboration pattern (pair, supervised, delegated, autonomous) for a given task, with rationale across skill-level fit, error cost,... |
| `/compliance-audit` | Framework-aware compliance audit (SOC 2 Type II / ISO 27001 / HIPAA / PCI-DSS v4 / GDPR / CCPA). |
| `/cost-optimize` | FinOps analysis for AWS, GCP, and Azure. |
| `/counterfactual` | Counterfactual analysis framework for economic simulators. |
| `/cross-repo-pr` | Atomic PR trains across N repos that must merge in lockstep. |
| `/customer-interview` | Customer interview workflow — two modes. |
| `/dashboard` | Multi-agent dashboard for hstack. |
| `/db-design` | Design a new database schema or audit an existing one. |
| `/db-migration` | Zero-downtime database migration planner. |
| `/db-perf` | EXPLAIN-driven slow-query diagnosis and index advisor. |
| `/dep-graph` | Builds a cross-service dependency graph from imports, route calls, and IaC topology. |
| `/detect-engineering` | Detection rule engineering. |
| `/econ-sim` | Designs a runnable economic simulator from a research question. |
| `/eval-harness` | Generates a per-feature eval harness (dataset, metrics, baselines, CI hook) for any LLM/AI feature. |
| `/event-design` | Design event/message schemas with explicit versioning and compatibility policy for Kafka, NATS, EventBridge, SQS, RabbitMQ, or Pub/Sub. |
| `/event-stream` | Designs a real-world event ingestion pipeline for an economic simulator with observability-time modeling — agents react to events when the information would have been... |
| `/explanation-design` | Designs explanation surfaces for AI features with the goal of trust calibration, not tutorial. |
| `/exploit-dev` | Scaffolds an authorized exploit-development project (CTF or engagement) for binary pwn, web, mobile, or IoT firmware targets. |
| `/expression-synth` | Facial expression synthesis designer. |
| `/finetune` | Generates a fine-tuning project — data prep, format conversion (sharegpt/alpaca/dpo), recipe config (LoRA / QLoRA / full / DPO / ORPO), eval baseline before+after,... |
| `/forensics` | DFIR (digital forensics + incident response). |
| `/game-theory-analysis` | Model a strategic situation as a formal game (normal form for one-shot, extensive form for sequential). |
| `/gesture-synth` | Speech-to-gesture synthesis designer. |
| `/hiring-loop` | Full hiring kit generator from a role description. |
| `/honeypot` | Deception deployment. |
| `/iac-review` | Pre-apply review of Terraform / Pulumi / AWS CDK diffs. |
| `/incentive-design` | Design an incentive system (pricing tier, referral program, growth loop, OKR / commission plan, in-app reward) using mechanism design plus behavioral economics —... |
| `/incident-response` | Generates an incident response runbook tuned to Hall's stack (web / mobile / API), and runs in live war-room mode during an actual incident. |
| `/indoor-nav` | Indoor positioning + accessibility-aware routing design. |
| `/interactive-mockup` | Wire the static mockup into a clickable interactive prototype. |
| `/investor-update` | Monthly investor update generator. |
| `/k8s-design` | Generate production-grade Kubernetes manifests, Helm charts, or Kustomize overlays for a workload. |
| `/kpi-dashboard` | KPI dashboard with weekly cadence. |
| `/lip-sync` | Lip-sync model selection + training/inference pipeline designer. |
| `/log-analyze` | Large-log triage with polars-backed analysis. |
| `/mental-model-trace` | Diffs the user's mental model of a feature against the real system model. |
| `/migration-plan` | Given a from→to migration (DB engine swap, framework upgrade, language port, region move, monolith→services), picks the safest pattern (strangler fig, parallel run, blue-green,... |
| `/mobile-build` | Mobile feature scaffolding across React Native, Flutter, native iOS (Swift), and native Android (Kotlin). |
| `/mobile-perf` | Mobile performance profiling: cold-start time, time-to-interactive, FPS during scrolling, jank rate, memory under load. |
| `/mobile-qa` | Mobile QA flow generation + execution across Maestro, Detox, XCUITest, and Espresso. |
| `/mobile-release` | End-to-end TestFlight / Play Internal release pipeline. |
| `/mockup` | Generate role-based, multi-screen, clickable mockup pages from docs/WORKFLOWS.md. |
| `/monorepo-graph` | Unified projection of a monorepo's project graph. |
| `/multi-repo-refactor` | Coordinated refactor across N repos. |
| `/multi-sign` | Multi-sign-language platform architecture. |
| `/observability` | Generate an OpenTelemetry-first observability stack: per-language SDK setup, exporters (Prometheus + Tempo + Loki, or Datadog/Honeycomb/New Relic), trace propagation, log-trace... |
| `/optimize-decision` | Formulate a decision as a Linear Program (LP), Mixed-Integer Program (MIP), or Constraint Program (CP-SAT) using OR-Tools or Pyomo. |
| `/paper-pipeline` | Reproducible research-paper scaffold for NeurIPS / ACL / IEEE (and friends). |
| `/paper-trade` | Realistic-execution paper-trading harness. |
| `/postmortem` | Blameless postmortem facilitator. |
| `/pricing-experiment` | Pricing experiment designer. |
| `/product-ci` | Derive brand values from the product and map them to design tokens (colors, typography, motion, spacing). |
| `/prompt-engineering` | Systematic prompt engineering: from a task spec, generates 6-8 prompt variants spanning CoT / few-shot / role-play / structured-output / decomposition / self-critique,... |
| `/prosody-control` | Expression / tone / accent / cadence control surface for a TTS system. |
| `/purple-exercise` | Purple-team exercise orchestrator. |
| `/rag-design` | End-to-end RAG design: data-source survey, chunking strategy, embedding model, vector store, retrieval algorithm, reranker, eval plan. |
| `/recipe` | Document YOUR built thing as a reproducible cookbook: INGREDIENTS.md, STEPS.md, TECHNIQUES.md, PLATING.md. |
| `/recon` | Passive-then-active reconnaissance orchestrator for AUTHORIZED engagements only. |
| `/redteam-c2` | Short-lived, scope-gated C2 infrastructure provisioning for AUTHORIZED red-team engagements only. |
| `/reverse-engineer` | Authorized adversarial RE. |
| `/risk-engine` | Risk engine designer for algorithmic strategies. |
| `/runway` | Burn + runway + hire-cost scenario modeler. |
| `/security-training` | Project-specific security training generator. |
| `/service-catalog` | One-time scaffolding of a Backstage-style service catalog in markdown. |
| `/service-mesh` | Decide whether a service mesh actually helps, and if so, generate config for Istio, Linkerd, or Consul Connect. |
| `/shared-lib-bump` | Cascading version-bump PRs across every detected consumer of a shared lib. |
| `/siem-tune` | SIEM rule fidelity tuning. |
| `/sign-linguistics` | Per-sign-language linguistic catalog compiler. |
| `/sign-text` | Bidirectional text↔sign translation pipeline design. |
| `/sim-calibrate` | Calibration workflow for economic simulators. |
| `/simulate` | Build a discrete-event or Monte-Carlo simulation of a system from a description. |
| `/soar-playbook` | SOAR playbook generation. |
| `/sre-slo` | Define SLIs, SLOs, and error budgets per service — as engineering contracts, not marketing copy. |
| `/strategy-design` | Strategy design framework for algorithmic trading. |
| `/strategy-eval` | Multi-metric strategy evaluation scorecard. |
| `/team-velocity` | Throughput, cycle-time, review-latency, and bug-rate trend report for the last 12 weeks. |
| `/tech-debt-register` | ROI-sorted tech-debt register. |
| `/threat-hunt` | Hypothesis-driven threat hunting. |
| `/threat-intel` | Threat intelligence ingestion + relevance filter. |
| `/threat-model-evolve` | Living STRIDE threat model that updates on /ship. |
| `/transpose` | Interactive bridge-planning skill. |
| `/tts-design` | TTS architecture + training plan. |
| `/ux-pipeline` | End-to-end stakeholder-validated UX/UI pipeline. |
| `/ux-workflows` | Produce docs/WORKFLOWS.md — one section per persona, each with entry points, 3-7 core end-to-end workflows (action→screen→outcome tuples), cross-persona |
| `/vendor-risk` | Third-party risk inventory + scoring. |
| `/vendor-score` | Deep single-vendor evaluation across 12 dimensions: security posture, SLA, pricing, API quality, DX, data portability, support, ecosystem, financial health, compliance, roadmap... |
| `/voice-clone` | End-to-end voice cloning workflow with consent + watermark guardrails. |
| `/voice-eval` | Multi-metric TTS / voice-clone eval harness. |
| `/workspace-sync` | Sync shared workspace configs (tsconfig, eslint, prettier, Renovate, GH Actions, .editorconfig, .nvmrc) across consuming repos via Renovate-style PRs. |
