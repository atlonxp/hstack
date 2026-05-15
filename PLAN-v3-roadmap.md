# hstack v3 Roadmap — Hall's Multi-Hat Force Multiplier

**Branch:** main
**Date:** 2026-05-16
**Author:** atlonxp (with Claude)
**Status:** PROPOSAL — awaiting prioritization for Wave 1 build
**Companion docs:** `PLAN-v2-roadmap.md` (v2 status below)

---

## Vision

Hall wears five executive hats — **CEO, CTO, CISO, Chief Architect (CA), Senior Engineer (Full-Stack / Mobile / Cloud-Native)** — and brings four practitioner specialties: **CPENT + CEH-grade red team & reverse engineering, AI engineering & research, cognitive computing & human-machine collaboration, and Operations Research with an applied-psychology bent.**

hstack v2 made the developer-engineer hat fast. v3 compresses the four executive hats *and* the four practitioner specialties down to one-command workflows. The unifying observation: **Hall thinks breadth-first** — security informs UX, OR informs eval harnesses, psychology informs incentive design. v3 skills should connect those domains rather than silo them.

The thesis is the same as v2: hstack's moat is *workflow intelligence*, not skill count. v3 widens that moat to roles where there is no equivalent tooling and where Hall is the only person doing the work, so leverage compounds the fastest.

---

## All-skills index (existing 65 + new 72 = 137)

Every skill prefixed with its family tag. Existing skills (gstack-derived + hstack-extensions) get retroactive family names that don't overlap with v3's A-J letters; new v3 skills keep their A-J family names.

### Existing skills (65)

**[Planning & Review]** — interactive plan reviews
- `/office-hours [Planning & Review]` YC-style brainstorm + builder mode
- `/plan-ceo-review [Planning & Review]` strategy/scope rethink (4 modes)
- `/plan-eng-review [Planning & Review]` architecture + data-flow lock-in
- `/plan-design-review [Planning & Review]` designer's-eye plan review
- `/plan-ux-review [Planning & Review]` stakeholder workflow + persona journeys
- `/plan-devex-review [Planning & Review]` developer-experience plan review
- `/plan-tune [Planning & Review]` plan-quality fine-tuner

**[Code Review]** — post-write review
- `/review [Code Review]` pre-landing PR review (SQL, LLM, side-effects)
- `/codex [Code Review]` multi-AI second opinion via OpenAI Codex CLI
- `/autoaudit [Code Review]` post-build verification (cso + review + codex)
- `/autoplan [Code Review]` auto-review pipeline (CEO + design + eng)
- `/autoplan-full [Code Review]` full pipeline from idea to plan

**[Build & Autonomy]** — autonomous loops
- `/autobuild [Build & Autonomy]` autonomous implementation from plan
- `/feature-build [Build & Autonomy]` single-feature build
- `/auto-feature-build [Build & Autonomy]` persona-aware feature build
- `/auto-feature-build-full [Build & Autonomy]` all-personas feature gap-fill
- `/verify-loop [Build & Autonomy]` self-healing verification after build
- `/careful [Build & Autonomy]` extra-careful mode for fragile work
- `/freeze [Build & Autonomy]` freeze a working state before risky change
- `/unfreeze [Build & Autonomy]` thaw a frozen state
- `/guard [Build & Autonomy]` guard rails for autonomous runs

**[QA & Bugs]** — testing surfaces
- `/qa [QA & Bugs]` find bugs + fix loop (Quick/Standard/Exhaustive)
- `/qa-only [QA & Bugs]` report-only QA, no fixes

**[Design]** — design-time work
- `/design-consultation [Design]` design system from scratch
- `/design-shotgun [Design]` visual design exploration (multiple variants)
- `/design-review [Design]` designer's-eye QA + fix loop
- `/design-html [Design]` finalize designs into production HTML/CSS

**[UX Audit]** — persona-driven UX
- `/ux-audit [UX Audit]` persona-workflow audit on live site
- `/auto-ux-audit [UX Audit]` single-persona audit + fix
- `/auto-ux-audit-full [UX Audit]` all-personas audit + fix
- `/discover-personas [UX Audit]` infer stakeholder personas
- `/define-workflows [UX Audit]` formalize persona workflows
- `/gap-analysis [UX Audit]` feature gap analysis per persona
- `/devex-review [UX Audit]` developer-experience audit

**[Ship & Release]** — release engineering
- `/ship [Ship & Release]` sync, test, audit, push, PR
- `/land-and-deploy [Ship & Release]` merge → deploy → verify
- `/canary [Ship & Release]` post-deploy monitoring loop
- `/benchmark [Ship & Release]` performance regression detection
- `/benchmark-models [Ship & Release]` AI-model benchmark suite
- `/document-release [Ship & Release]` doc updates + Diataxis coverage map
- `/document-generate [Ship & Release]` generate missing docs (Diataxis)

**[Browser & Web]** — browser automation
- `/browse [Browser & Web]` fast headless Chromium for QA + dogfooding
- `/open-gstack-browser [Browser & Web]` launch hstack browser
- `/pair-agent [Browser & Web]` pair remote agent with browser session
- `/scrape [Browser & Web]` scrape pages within terms
- `/setup-browser-cookies [Browser & Web]` import cookies for auth'd pages

**[Intelligence & Memory]** — cross-session knowledge
- `/intel [Intelligence & Memory]` project intelligence briefing
- `/context-save [Intelligence & Memory]` save session context
- `/context-restore [Intelligence & Memory]` resume session context
- `/retro [Intelligence & Memory]` team retrospective (per-person, streaks)
- `/learn [Intelligence & Memory]` learn from this session
- `/sync-gbrain [Intelligence & Memory]` sync project artifacts to gbrain
- `/setup-gbrain [Intelligence & Memory]` one-time gbrain provisioning
- `/skillify [Intelligence & Memory]` turn a workflow into a skill

**[Investigate & Security]** — root cause + security
- `/investigate [Investigate & Security]` systematic root-cause debugging
- `/investigate-workflow [Investigate & Security]` post-impl workflow check
- `/cso [Investigate & Security]` OWASP Top 10 + STRIDE audit
- `/check-ci [Investigate & Security]` CI failure investigation
- `/check-deps [Investigate & Security]` dependency vulnerability watch
- `/check-issues [Investigate & Security]` GitHub issue triage

**[CTO Discovery]** — market/tech intelligence
- `/discover [CTO Discovery]` competitive + tech-scout briefings

**[Tools]** — utility skills
- `/make-pdf [Tools]` markdown → publication-quality PDF
- `/landing-report [Tools]` landing-page diagnostics
- `/setup-deploy [Tools]` one-time deploy config
- `/gstack-upgrade [Tools]` upgrade hstack install + run migrations
- `/health [Tools]` health-check across hstack components

### New v3 skills (72)

**[CEO Cockpit]** — fundraising, board, customers, runway, KPIs
- `/investor-update [CEO Cockpit]` monthly investor update from activity + metrics
- `/board-deck [CEO Cockpit]` board deck generator (traction, financials, asks)
- `/runway [CEO Cockpit]` burn + runway + hire-cost scenarios
- `/customer-interview [CEO Cockpit]` JTBD prep + transcript synthesis
- `/pricing-experiment [CEO Cockpit]` pricing tier design + A/B plan
- `/kpi-dashboard [CEO Cockpit]` north-star + supporting KPIs, weekly cadence

**[CTO Strategy]** — tech strategy, vendors, hiring, debt
- `/adr [CTO Strategy]` Architecture Decision Record generator + linter
- `/buy-vs-build [CTO Strategy]` vendor-vs-build scorecard (cost, lock-in, fit)
- `/vendor-score [CTO Strategy]` deep single-vendor evaluation (12 dims)
- `/tech-debt-register [CTO Strategy]` ROI-sorted debt register
- `/hiring-loop [CTO Strategy]` JD + screen + interview kit + scorecard
- `/team-velocity [CTO Strategy]` throughput + cycle-time + bug-rate trends

**[CISO Compliance + IR]** — frameworks, incident response, threat models
- `/compliance-audit [CISO Compliance + IR]` SOC2/ISO27001/HIPAA/PCI/GDPR audit
- `/incident-response [CISO Compliance + IR]` IR runbook + live war-room mode
- `/postmortem [CISO Compliance + IR]` blameless postmortem (5-whys + actions)
- `/vendor-risk [CISO Compliance + IR]` third-party risk inventory + scoring
- `/security-training [CISO Compliance + IR]` project-specific training generator
- `/threat-model-evolve [CISO Compliance + IR]` living STRIDE doc

**[Chief Architect]** — system design, IaC, FinOps, migrations
- `/c4-diagram [Chief Architect]` C4 model extraction from code
- `/iac-review [Chief Architect]` Terraform/Pulumi/CDK pre-apply review
- `/cost-optimize [Chief Architect]` AWS/GCP/Azure FinOps analysis
- `/migration-plan [Chief Architect]` strangler/blue-green/canary patterns
- `/dep-graph [Chief Architect]` cross-service dependency graph + blast radius
- `/service-catalog [Chief Architect]` Backstage-style markdown service registry

**[Mobile]** — iOS/Android/RN/Flutter
- `/mobile-build [Mobile]` RN/Flutter/iOS/Android feature scaffold
- `/mobile-qa [Mobile]` Maestro/Detox/XCUITest flow generation + run
- `/aso [Mobile]` App Store/Play Store metadata + screenshot iteration
- `/mobile-release [Mobile]` TestFlight/Internal Track release pipeline
- `/mobile-perf [Mobile]` cold-start, FPS, jank, memory profiling

**[API/DB]** — API design, DB design, contracts, events
- `/api-design [API/DB]` REST/GraphQL/gRPC + OpenAPI spec gen + audit
- `/api-contract-test [API/DB]` Pact contract tests + compat matrix
- `/db-design [API/DB]` schema + migration safety + index choice
- `/db-perf [API/DB]` EXPLAIN-based slow-query + index advisor
- `/event-design [API/DB]` Kafka/NATS/EventBridge schema + compat policy
- `/db-migration [API/DB]` zero-downtime expand/migrate/contract

**[Cloud-Native]** — K8s, mesh, observability, SRE, chaos
- `/k8s-design [Cloud-Native]` production-grade manifests/Helm/Kustomize
- `/service-mesh [Cloud-Native]` Istio/Linkerd traffic policy + mTLS
- `/observability [Cloud-Native]` OTel + Prom/Grafana baseline
- `/sre-slo [Cloud-Native]` SLI/SLO + error-budget definitions
- `/chaos [Cloud-Native]` Litmus/Chaos Mesh experiments

**[Multi-Repo]** — coordinated cross-repo work
- `/multi-repo-refactor [Multi-Repo]` coordinated refactor across N repos
- `/monorepo-graph [Multi-Repo]` unified projection across Nx/Turbo/Bazel
- `/cross-repo-pr [Multi-Repo]` atomic PR trains across repos
- `/workspace-sync [Multi-Repo]` sync shared configs across consumers
- `/shared-lib-bump [Multi-Repo]` cascading version-bump PRs

**[Red Team / RE]** — authorized offensive security
- `/recon [Red Team / RE]` passive→active recon orchestrator
- `/exploit-dev [Red Team / RE]` CTF/engagement exploit scaffold
- `/reverse-engineer [Red Team / RE]` Ghidra/Cutter headless RE
- `/redteam-c2 [Red Team / RE]` short-lived Sliver/Mythic/Havoc + teardown
- `/purple-exercise [Red Team / RE]` ATT&CK technique + detection coverage
- `/bug-bounty-triage [Red Team / RE]` reproduce, score, dedup bug reports

**[AI Engineering / Research]** — eval, RAG, agents, fine-tune, papers, prompts
- `/eval-harness [AI Engineering / Research]` per-feature eval scaffolding
- `/rag-design [AI Engineering / Research]` end-to-end RAG with eval-gated decisions
- `/agent-design [AI Engineering / Research]` typed-state-machine agents
- `/finetune [AI Engineering / Research]` LoRA/QLoRA/DPO recipe + eval
- `/paper-pipeline [AI Engineering / Research]` reproducible paper skeleton + ablation runner
- `/prompt-engineering [AI Engineering / Research]` variant gen + Pareto winner

**[Cognitive Computing / HMC]** — agent UX, mental models, explanations
- `/agent-ux-review [Cognitive Computing / HMC]` AI-feature interaction review
- `/mental-model-trace [Cognitive Computing / HMC]` user-vs-system mental-model diff
- `/collaboration-pattern [Cognitive Computing / HMC]` pair/supervised/delegated/autonomous picker
- `/cognitive-load-audit [Cognitive Computing / HMC]` Sweller intrinsic/extraneous/germane
- `/explanation-design [Cognitive Computing / HMC]` trust-calibrated explanation surfaces

**[Operations Research / Behavioral]** — optimization, simulation, incentives, biases
- `/optimize-decision [Operations Research / Behavioral]` LP/MIP/CP formulation + sensitivity
- `/simulate [Operations Research / Behavioral]` discrete-event/Monte-Carlo via SimPy
- `/incentive-design [Operations Research / Behavioral]` mechanism design + behavioral failure modes
- `/behavioral-experiment [Operations Research / Behavioral]` power-calc'd intervention design
- `/game-theory-analysis [Operations Research / Behavioral]` payoff matrix + equilibrium
- `/biases-audit [Operations Research / Behavioral]` defensive bias detection on decisions/UX

**[Product Transposition]** — constructive RE pipeline
- `/blueprint [Product Transposition]` study target (product/paper/code/app/api) → BLUEPRINT.md
- `/transpose [Product Transposition]` interactive bridge-planning (source→target domain)
- `/clone-and-twist [Product Transposition]` build the transposed version via /autobuild
- `/recipe [Product Transposition]` document YOUR built thing (paper/blog/onboarding/replay)

**[Blue Team / Defensive]** — detection, hunt, response, deception, forensics
- `/detect-engineering [Blue Team / Defensive]` write Sigma/KQL/SPL/YARA from threat indicators
- `/threat-hunt [Blue Team / Defensive]` hypothesis-driven hunting campaigns
- `/siem-tune [Blue Team / Defensive]` false-positive reduction + rule fidelity scoring
- `/log-analyze [Blue Team / Defensive]` large-log triage, anomaly surfacing, timeline, IoC pivots
- `/honeypot [Blue Team / Defensive]` canary tokens + honeypages + full honeypots, deploy + monitor
- `/soar-playbook [Blue Team / Defensive]` automated IR playbooks (XSOAR/Tines/TheHive)
- `/threat-intel [Blue Team / Defensive]` MISP/OpenCTI ingestion, stack-relevance filter, IoC store
- `/forensics [Blue Team / Defensive]` DFIR — disk/memory image, timeline, IoC extraction

**[Speech & Voice AI]** — TTS-primary, expression + accent + tone + multilingual
- `/tts-design [Speech & Voice AI]` TTS architecture + training plan (VITS/StyleTTS2/XTTSv2/etc.)
- `/voice-clone [Speech & Voice AI]` voice cloning with consent + watermark + attribution tests
- `/prosody-control [Speech & Voice AI]` expression/tone/accent control surfaces (GST + SSML)
- `/voice-eval [Speech & Voice AI]` MOS + speaker-sim + WER + prosody scorecard

**[Accessibility AI]** — indoor nav (PhD area) + sign language pipelines
- `/indoor-nav [Accessibility AI]` indoor positioning + accessibility-aware routing
- `/sign-text [Accessibility AI]` bidirectional text↔sign translation pipeline
- `/sign-linguistics [Accessibility AI]` per-language handshape/location/movement/non-manual catalog
- `/accessibility-audit [Accessibility AI]` WCAG 2.2 + assistive-tech behavioral testing
- `/multi-sign [Accessibility AI]` multi-sign-language platform (ASL/BSL/TSL/JSL + plugin interface)

**[Avatar & Embodiment]** — virtual avatars (Hall's mixed track)
- `/avatar-design [Avatar & Embodiment]` full architecture (face + body + voice + animation)
- `/lip-sync [Avatar & Embodiment]` Wav2Lip/SadTalker/MuseTalk/EMO selection + viseme map
- `/gesture-synth [Avatar & Embodiment]` speech-to-gesture (co-speech beats/deictics/iconic)
- `/expression-synth [Avatar & Embodiment]` valence-arousal + beat cues + FACS action units
- `/avatar-sign [Avatar & Embodiment]` sign-language-performing avatar (cross with Accessibility)

**[FinTech / Algorithmic Trading]** — strategies, backtests, risk, paper, eval
- `/strategy-design [FinTech / Algorithmic Trading]` edge hypothesis + class + signal + sizing + risk
- `/backtest [FinTech / Algorithmic Trading]` PIT-aware backtest with realistic costs + walk-forward
- `/risk-engine [FinTech / Algorithmic Trading]` sizing + drawdown + correlation + kill switch
- `/paper-trade [FinTech / Algorithmic Trading]` realistic-execution paper trading + divergence report
- `/strategy-eval [FinTech / Algorithmic Trading]` Sharpe/Sortino/Calmar + regime + capacity + tail

**[Economic Simulation]** — real + real-time event-aware simulation
- `/econ-sim [Economic Simulation]` ABM/SD/DSGE/hybrid simulation design
- `/event-stream [Economic Simulation]` real-world event ingestion with observability-time modeling
- `/counterfactual [Economic Simulation]` policy/shock injection + multi-seed ensemble
- `/sim-calibrate [Economic Simulation]` historical-data calibration with train/test discipline

---

## What's already done (v2 status)

| v2 feature | Status | Notes |
|---|---|---|
| #1 Self-healing verify loop | ✅ Shipped | `/verify-loop` skill |
| #2 Background watchers | ✅ Partial | `/check-ci`, `/check-deps`, `/check-issues` |
| #3 Persistent project intelligence | ✅ Shipped | `/intel` skill + `intelligence.jsonl` |
| #4 Spec-driven dev flow | ✅ Partial | Folded into `/autoplan-full` + `/autobuild` |
| #5 Multi-agent dashboard | ⏸ Deferred | Native Agent Teams not yet stable in CC |
| #7 Auto-trigger security + QA | ⏸ Deferred | Done manually via Claude Code hooks today |

Net of v2: the **autonomous developer loop** is live. The **executive layer** and the **non-web engineering surfaces** are untouched.

---

## Skill families overview

| Family | Hall hat | Skills (count) | Wave |
|---|---|---|---|
| A — CEO Cockpit | CEO | 6 | 1 + 2 + 3 + 4 |
| B — CTO Strategy | CTO | 6 | 1 + 3 + 4 |
| C — CISO Compliance + IR | CISO | 6 | 1 + 3 + 4 |
| D — Chief Architect | CA | 6 | 2 + 3 + 4 |
| E1 — Mobile | Senior Eng | 5 | 2 + 3 + 4 |
| E2 — API/DB | Senior Eng | 6 | 1 + 2 + 3 + 4 |
| E3 — Cloud-Native | Senior Eng | 5 | 4 |
| E4 — Multi-repo / Monorepo | Senior Eng | 5 | 3 + 4 |
| F — Red Team / Reverse Eng | CPENT/CEH | 6 | 2 + 3 + 4 |
| G — AI Engineering / Research | AI eng/research | 6 | 1 + 2 + 3 |
| H — Cognitive Computing / HMC | HCI / agent UX | 5 | 3 + 4 |
| I — Operations Research / Behavioral | OR + psychology | 6 | 2 + 3 + 4 |
| J — Product Transposition | constructive RE | 4 | 2 |
| K — Blue Team / Defensive Security | CPENT/CEH (defensive side) | 8 | 2 + 3 + 4 |
| L — Speech & Voice AI | AI vertical (TTS/ASR/voice) | 4 | 2 + 3 |
| O — Accessibility AI | AI vertical (PhD area: nav + sign) | 5 | 2 + 3 |
| P — Avatar & Embodiment | AI vertical (mixed-track) | 5 | 3 |
| Q — FinTech / Algorithmic Trading | AI vertical (algo trading) | 5 | 3 |
| R — Economic Simulation | AI vertical (real-time event-aware sim) | 4 | 3 + 4 |

**Total: 103 new skills across 4 waves.** Compare to existing 68 skills — v3 more than doubles the surface, all role-targeted.

**AI verticals note:** Families L, O, P, Q, R cover the domains Hall has actually built in. Generic NLP / CV / multimodal work is handled by existing Family G via `--domain` modes (e.g., `/eval-harness --domain nlp`, `/finetune --domain cv`, `/rag-design --domain multimodal`), not separate families. MarTech is covered by existing gstack marketing skills (`marketing-psychology`, `copywriting`, `ads`, `content-strategy`, `pricing`, `sales-enablement`, etc.) — no new family needed.

**Framework agnosticism (load-bearing design principle):** Every AI vertical skill is **stack-agnostic by design**. Skills name architectures (VITS, StyleTTS2, SMPL-X, NeRF, Gaussian Splatting, Mesa, Dynare, etc.) as *choices*, never mandates. They auto-detect or accept the user's stack (PyTorch / JAX / Flax / TensorFlow / ONNX / vLLM / SGLang / Triton / CUDA / MLX / etc.). `/blueprint` accepts five input modes (product / paper / code / app / api) so any source material — paper, repo, live product, mobile app, or SDK — feeds the same downstream pipeline.

**Research-to-product pipeline (the unifying workflow):** Whether the goal is a **POC, an academic paper / journal article, new ideas, or a new product**, the composition is the same — see the Research & Development Pipeline section below.

**Security symmetry:** Family F (offensive, scope-gated) ↔ Family K (defensive). `/purple-exercise` lives in F but inherently bridges both — every red-team technique tested in F should have a detection candidate landed in K.

**Mixed-track bridges:** Family P (Avatar) explicitly combines L (Speech) + Family G CV-mode + Family O (Accessibility) for sign-performing avatars. Designed for extension — the implied "many other things" Hall builds across domains plug in at family bridges.

---

## Family A — CEO Cockpit

### `/investor-update`
**Problem:** Monthly investor update is high-leverage but low-frequency; it falls off the calendar, then takes a full day to reconstruct.
**Solution:** Reads `git log`, `gh pr list`, Stripe/Plausible/PostHog metrics (via configured connectors), recent `/retro` outputs, and prior updates. Drafts the next update in Hall's voice with sections: Highlights, Lowlights, Metrics, Asks. Stops at AskUserQuestion gates for tone calibration and ask-list.
**Inputs:** `~/.gstack/config.yaml` connector keys, prior update file, current month.
**Outputs:** `updates/{YYYY-MM}.md` + optional email-ready HTML via `/design-html`.
**Dependencies:** None new. Reuses `/retro`, `/intel`, `/document-generate`.

### `/board-deck`
**Problem:** Pre-board prep is 2-3 days of slide-massaging from data that already exists in Linear, GitHub, Stripe, and prior decks.
**Solution:** Slide-by-slide generator following the YC-style board deck template (Traction, Financials, Product, Team, Risks, Asks). Each slide pulls from a named source; Hall reviews and edits the narrative, not the data.
**Outputs:** `board/{YYYY-QX}.md` then `/make-pdf` → polished deck.
**Dependencies:** `/make-pdf`, optional Stripe/HubSpot connectors. New: PPTX export via existing `pptx-posters` skill family.

### `/runway`
**Problem:** Runway model lives in a spreadsheet that's always 2 weeks stale and doesn't account for the hire Hall is considering.
**Solution:** Reads `bank_balance + monthly_burn + revenue` from a configured ledger source (Stripe + a CSV export from Mercury/Brex). Models scenarios: "if I hire X at $Y", "if revenue grows N% MoM", "if we cut Z". Outputs a one-page report + chart.
**Outputs:** `runway/{YYYY-MM-DD}.md` with scenario tables.
**Dependencies:** New `lib/runway-model.ts` (deterministic math, not LLM).

### `/customer-interview`
**Problem:** Customer-interview learnings live in notebooks/Notion and never make it back to product decisions.
**Solution:** Two modes. **Prep mode** generates JTBD-style question script for a target persona. **Synthesis mode** ingests transcripts (or recordings via `markitdown`), extracts pain points, segments by job-to-be-done, scores frequency × intensity, and proposes 3 product moves.
**Outputs:** `interviews/{customer-slug}.md` + aggregated `interviews/INSIGHTS.md`.
**Dependencies:** `markitdown` for audio. Reuses `/intel` for cross-interview pattern detection.

### `/pricing-experiment`
**Problem:** Pricing changes are made on gut feel because designing a proper A/B test takes a week.
**Solution:** Takes a hypothesis ("free tier hurts conversion"), proposes 2-3 alternative tier structures with concrete prices, predicts revenue impact from current cohort data, and outputs an experiment design (audience, duration, success metric, ramp-down trigger).
**Outputs:** `pricing/experiments/{slug}.md`.
**Dependencies:** None new.

### `/kpi-dashboard`
**Problem:** Hall tracks 15 KPIs in his head; only 3 actually matter; he can't remember which.
**Solution:** One-time setup picks the north-star metric and 4-6 supporting KPIs. Weekly cadence pulls current values, computes WoW/MoM delta, flags anomalies (>2σ), and emits a Slack-ready summary.
**Outputs:** `kpis/{YYYY-WW}.md` + JSON for downstream automation.
**Dependencies:** Connector keys in `~/.gstack/config.yaml`. New `lib/anomaly-detect.ts`.

---

## Family B — CTO Strategy

### `/adr`
**Problem:** Architectural decisions are made in Slack threads, in commit messages, and in Hall's head. Six months later nobody remembers why.
**Solution:** Generates ADR (Architecture Decision Record, Michael Nygard format) for a named decision: Context, Decision, Consequences, Status. Lints existing ADRs for staleness and conflict.
**Outputs:** `docs/adr/{NNNN}-{slug}.md`.
**Dependencies:** None new. Mirrors `/document-generate` structure.

### `/buy-vs-build`
**Problem:** "Should we use Stripe Billing or build our own?" — a 4-hour decision that often takes 4 days because nobody scopes it.
**Solution:** Structured scorecard. Hall inputs the capability needed; the skill researches 3-5 vendors via `/discover`, scores each on Cost / Lock-in / Fit / Risk / Time-to-value / Team capacity. Recommends with rationale and back-out plan.
**Outputs:** `decisions/buy-vs-build/{slug}.md`.
**Dependencies:** `/discover` (already shipped).

### `/vendor-score`
**Problem:** Once a vendor is shortlisted, evaluating it deeply (security posture, SLA, pricing, API quality, DX) takes another day.
**Solution:** Deep evaluation of a single vendor. Pulls SOC 2 report (if linked), reads API docs, tries the SDK, scores on 12 dimensions, flags red lines (data residency, source escrow, MFA support).
**Outputs:** `decisions/vendors/{vendor-slug}.md` + comparison row added to `vendor-matrix.md`.
**Dependencies:** `/browse`, `/cso` (for security posture).

### `/tech-debt-register`
**Problem:** Tech debt is everywhere and nowhere. No prioritization, no decay model, no link to features that hit it.
**Solution:** Scans codebase for debt markers (`TODO`, `FIXME`, `HACK`), correlates with `git blame` age and `/retro` outputs (recurring breakage in same area). Scores each by **impact × frequency / effort**. Outputs a register sorted by ROI.
**Outputs:** `docs/tech-debt-register.md` (auto-updated weekly).
**Dependencies:** Existing `intel.jsonl`.

### `/hiring-loop`
**Problem:** Hiring requires JD, screen, interview kit, scorecards — each a half-day, and they drift apart.
**Solution:** Generates the full kit from a role description: JD with leveling, async screen prompt, 4-stage interview kit (technical, system design, behavioral, founder-fit), per-stage scorecards. Mode flag for IC vs lead.
**Outputs:** `hiring/{role-slug}/JD.md`, `SCREEN.md`, `INTERVIEW.md`, `SCORECARD.md`.
**Dependencies:** None new.

### `/team-velocity`
**Problem:** "Are we slowing down?" — answered by gut feel, not data.
**Solution:** Pulls 12 weeks of commit/PR/issue data per contributor (or just Hall solo), computes throughput, cycle time, review latency, bug-rate trend. Surfaces inflection points and asks "what changed in week N?" with context.
**Outputs:** `metrics/velocity/{YYYY-WW}.md`.
**Dependencies:** `gh` CLI. New `lib/velocity-stats.ts`.

---

## Family C — CISO Compliance + IR

### `/compliance-audit`
**Problem:** Enterprise prospects ask for SOC 2 / HIPAA / GDPR. Hall has to read the framework, map controls, score gaps, and write evidence. Multi-week process.
**Solution:** Framework-aware audit: pick SOC 2 Type II / ISO 27001 / HIPAA / PCI-DSS v4 / GDPR / CCPA. The skill walks each control, asks Hall the right question (with the framework citation), maps to existing artifacts (CI configs, IAM policies, runbooks), scores Pass / Partial / Gap, and outputs a Plan-of-Action-and-Milestones (POA&M).
**Outputs:** `compliance/{framework}/{YYYY-MM-DD}.md` + evidence references.
**Dependencies:** `/cso` for technical controls. Static `compliance/frameworks/{name}.yaml` control lists.

### `/incident-response`
**Problem:** When something breaks in prod, the response is improvised. Logs are not collected, comms drift, postmortem inputs are lost.
**Solution:** Generates an IR runbook tuned to the stack (web / mobile / API). Includes war-room template, severity rubric, comms templates (customer, internal, status page), on-call rotation suggestions, post-incident hand-off to `/postmortem`. **Live mode** can be invoked during an incident: it walks the operator through declaration, triage, mitigation, comms, and resolution.
**Outputs:** `ops/runbooks/incident-response.md` (template) + `incidents/{YYYY-MM-DD-slug}/` (live).
**Dependencies:** `/postmortem`. Optional Slack/Discord webhook for comms.

### `/postmortem`
**Problem:** Blameless postmortems are skipped because the template is intimidating and the cause analysis is hard.
**Solution:** Walks Hall through: timeline reconstruction (paste/import from chat), 5-whys, contributing factors (people, process, tech), impact quantification, action items with owners, and detection-gap analysis. Output is publishable internally and externally.
**Outputs:** `incidents/{YYYY-MM-DD-slug}/postmortem.md`.
**Dependencies:** None new.

### `/vendor-risk`
**Problem:** Every third-party SaaS (Mailgun, Sentry, Mux, etc.) is a piece of your security perimeter. Nobody tracks them.
**Solution:** Inventories all third-party services from code (search SDK imports, `.env` keys, IaC), gathers what data each touches, pulls each vendor's SOC 2/ISO status, classifies by **data sensitivity × access scope**. Flags vendors that need DPA renewals or sub-processor disclosure.
**Outputs:** `compliance/vendors.md` (inventory) + `compliance/vendor-risk-{YYYY-Q}.md` (quarterly review).
**Dependencies:** `/cso`, `/dep-graph`.

### `/security-training`
**Problem:** Security training is generic, boring, and doesn't reflect the actual threats you face.
**Solution:** Generates project-specific training: phishing scenarios using real vendor names from the codebase, secure-coding examples pulled from actual diffs (good and bad), threat-model walkthrough of the team's own product. Output is markdown deck-able + quiz.
**Outputs:** `compliance/training/{topic}-{YYYY-MM}.md`.
**Dependencies:** `/cso`, `/threat-model-evolve`.

### `/threat-model-evolve`
**Problem:** Threat models are written once during launch and never updated. They go stale in 3 months.
**Solution:** Maintains a living STRIDE document. On each `/ship`, diffs the architecture against the last threat model, asks "did this PR introduce a new trust boundary / data flow / external dep?" and prompts for an update. The model itself is structured (assets, actors, flows, threats per STRIDE letter).
**Outputs:** `docs/threat-model.md` (canonical) + `docs/threat-model-changelog.md`.
**Dependencies:** Hook into `/ship`. New `lib/threat-model-schema.ts`.

---

## Family D — Chief Architect

### `/c4-diagram`
**Problem:** Architecture diagrams are stale the day they're drawn. Whiteboard photos don't help anyone.
**Solution:** Generates the four C4 levels (System Context, Container, Component, Code) from the actual codebase. Uses imports + service boundaries + IaC + OpenAPI specs as ground truth. Outputs Mermaid + structurizr-DSL.
**Outputs:** `docs/architecture/{level}.md` + rendered SVGs.
**Dependencies:** `/dep-graph`. New `lib/c4-extract.ts`. Optional structurizr CLI.

### `/iac-review`
**Problem:** Terraform/Pulumi/CDK diffs are 200 lines of resource-rename noise hiding 1 dangerous IAM grant.
**Solution:** Pre-apply diff review focused on **destructive changes, security drift, cost deltas, blast radius**. Knows Terraform plan format, Pulumi preview, AWS CDK diff. Calls out: deletes, IAM widenings, public exposure, instance-class upgrades >2x cost.
**Outputs:** `infra/reviews/{YYYY-MM-DD-hhmm}.md` posted as PR comment.
**Dependencies:** `gh`, parser libs per IaC tool. New `lib/iac-parse/{terraform,pulumi,cdk}.ts`.

### `/cost-optimize`
**Problem:** Cloud bill grows 8% MoM with no clear cause; rightsizing/reserved-instance/spot decisions are ignored.
**Solution:** Pulls AWS Cost Explorer / GCP Billing / Azure Cost Management. Highlights top 10 services by cost, identifies idle/oversized resources, reserved-instance vs Savings-Plan recommendation, spot-eligibility flags. Emits an action list with $/month savings per item.
**Outputs:** `infra/cost/{YYYY-MM}.md`.
**Dependencies:** Cloud read-only IAM keys in `~/.gstack/config.yaml`. New `lib/cloud-cost/{aws,gcp,azure}.ts`.

### `/migration-plan`
**Problem:** Big migrations (DB engine, framework, language, region) are scary because there's no de-risked plan.
**Solution:** Given a from→to migration, picks the safest pattern: **strangler fig, parallel run, blue-green, canary, dark launch**. Outputs a phased plan with cutover criteria, rollback triggers, observability requirements, and team-capacity check.
**Outputs:** `docs/migrations/{slug}.md` + companion `/autobuild`-compatible TASKS.md.
**Dependencies:** `/plan-eng-review`. None new.

### `/dep-graph`
**Problem:** "What does this change affect?" — no one can answer without reading half the repo.
**Solution:** Builds a dependency graph across services, packages, and runtime calls. Detects cycles, identifies bottleneck nodes, computes blast radius for any node. Stores graph in `~/.gstack/projects/{slug}/graph.json` for cross-skill use (e.g., `/migration-plan` uses it to pick boundaries).
**Outputs:** `docs/dep-graph.{md,svg,json}`.
**Dependencies:** `madge` / `dependency-cruiser` for JS, language-specific for others. New `lib/dep-graph.ts`.

### `/service-catalog`
**Problem:** "Who owns service X? What's its SLO? Where's the runbook?" — nobody knows.
**Solution:** One-time scaffolding of a service catalog (Backstage-style but markdown): per-service entry with owner, SLOs, runbook link, on-call rotation, dependencies, data classification. Skill keeps the catalog in sync with the codebase by detecting new services and deprecating gone ones.
**Outputs:** `docs/services/{service}.md` + `docs/services/INDEX.md`.
**Dependencies:** `/dep-graph`.

---

## Family E1 — Mobile

### `/mobile-build`
**Problem:** Mobile feature scaffolding is platform-specific (RN setup, Flutter widgets, iOS view controllers, Android activities) and no unified prompt covers it.
**Solution:** Detects the project's stack (RN / Flutter / Swift / Kotlin), generates a feature scaffold with screen + state + navigation + tests. Knows current platform idioms (RN's New Architecture, Flutter's Riverpod, SwiftUI + Observation, Jetpack Compose).
**Outputs:** Code files; `/feature-build`-style commit cadence.
**Dependencies:** None new. Hooks into `/feature-build`.

### `/mobile-qa`
**Problem:** Mobile QA loops (re-run on device, check three OS versions, check tablet) are manual and slow.
**Solution:** Generates Maestro / Detox / XCUITest / Espresso flows for a screen, runs them against simulators/emulators for current+1 and current-1 OS, captures screenshots+video on failure.
**Outputs:** `mobile/qa/flows/{screen}.yaml` + `mobile/qa/runs/{YYYY-MM-DD}/`.
**Dependencies:** Maestro CLI / Detox installed locally. New `bin/gstack-mobile-qa`.

### `/aso`
**Problem:** App Store / Play Store metadata (title, subtitle, keywords, screenshots) is set once and forgotten; competitors update theirs weekly.
**Solution:** Reads current store listing, analyzes top-10 competitor listings, suggests improvements to title/subtitle/keywords/promo-text + auto-generates updated screenshot variants via `/app-store-screenshots`.
**Outputs:** `mobile/aso/{YYYY-MM}.md` with proposed changes + diff against current.
**Dependencies:** `/app-store-screenshots`, `/scrape`, `/competitor-profiling`.

### `/mobile-release`
**Problem:** TestFlight / Play Internal release is 12 manual steps that drift between releases.
**Solution:** End-to-end release: bump version, build signed artifact, upload to TestFlight/Internal Track, draft release notes from `git log`, notify testers. Includes a rollback runbook.
**Outputs:** `mobile/releases/{version}.md`.
**Dependencies:** `fastlane` or `xcodebuild`/`gradle` directly. New `bin/gstack-mobile-release`.

### `/mobile-perf`
**Problem:** Cold-start times, FPS, memory regressions go unnoticed until a 1★ review surfaces them.
**Solution:** Profiling skill: cold-start, time-to-interactive, FPS during scrolling, memory under load. Compares to baseline (last release). Flags regressions over threshold. Uses Xcode Instruments / Android Profiler / Flipper.
**Outputs:** `mobile/perf/{YYYY-MM-DD}.md`.
**Dependencies:** Platform tools. Aligns with web `/benchmark` skill — both write to same baseline store.

---

## Family E2 — API/DB

### `/api-design`
**Problem:** APIs grow organically and end up inconsistent: some endpoints use snake_case, some PascalCase; some return `{data: ...}`, some return raw arrays.
**Solution:** Designs a new API surface or audits an existing one. Picks REST / GraphQL / gRPC based on use case. Generates OpenAPI 3.1 / GraphQL SDL / `.proto` and validates against style guide (Stripe API guide as the default). Reviewer mode catches breaking changes.
**Outputs:** `docs/api/{version}/openapi.yaml` (or `schema.graphql` / `.proto`) + `docs/api/style-guide.md`.
**Dependencies:** None new.

### `/api-contract-test`
**Problem:** Frontend ships expecting one shape; backend ships another. Integration tests catch it; consumers don't.
**Solution:** Generates Pact (or equivalent) contract tests from the OpenAPI/SDL. Runs them in CI for both producer and consumer. Reports compatibility matrix across services.
**Outputs:** `tests/contracts/{service}.test.ts` + `docs/api/compat-matrix.md`.
**Dependencies:** `pact-foundation/pact-js` or equivalent. Hooks into existing test harness.

### `/db-design`
**Problem:** Schema decisions are the highest-cost mistakes in the system; backfilling/renaming a column 6 months in is brutal.
**Solution:** Designs a new schema or audits an existing one. Knows: naming conventions, normalization, index choice, partitioning, soft-delete patterns, append-only vs mutable history, JSON-column tradeoffs. Outputs migration SQL + rollback. For audits, scores existing schema against the rules.
**Outputs:** `db/migrations/{NNNN}-{slug}.sql` + `docs/db/schema-review-{YYYY-MM-DD}.md`.
**Dependencies:** None new. Optional `sqlfluff` for linting.

### `/db-perf`
**Problem:** Slow queries are diagnosed reactively from p99 alerts; query plan reviews never happen until prod is on fire.
**Solution:** Connects to dev/staging DB (read-only), runs EXPLAIN on a candidate set of queries (extracted from app code + logs), spots seq scans, missing indexes, N+1 patterns, suboptimal joins. Suggests indexes with cost estimate.
**Outputs:** `db/perf/{YYYY-MM-DD}.md`.
**Dependencies:** DB read-only creds. New `lib/db-explain/{postgres,mysql,sqlite}.ts`.

### `/event-design`
**Problem:** Event schemas (Kafka, NATS, EventBridge, SQS) evolve without compatibility rules; consumers break silently.
**Solution:** Designs event schemas with versioning and backward-compat rules. Generates Avro / JSON-Schema / Protobuf with semantic version + compat policy (forward / backward / full). Audits existing topics for compat violations.
**Outputs:** `events/{topic}/v{N}.{avsc,json}` + `docs/events/registry.md`.
**Dependencies:** Optional schema registry CLI.

### `/db-migration`
**Problem:** "Add NOT NULL column to a 50M row table" — small change, terrifying execution. Locking, backfill, downtime — all easy to get wrong.
**Solution:** Given a migration intent, picks the safe pattern (expand-migrate-contract; online DDL; pt-osc/gh-ost for MySQL; CREATE INDEX CONCURRENTLY for Postgres). Generates phased migration scripts with locks-and-load analysis. Includes rollback at every phase.
**Outputs:** `db/migrations/safe/{NNNN}-{slug}/{phase}.sql`.
**Dependencies:** Knowledge of source DB engine. New `lib/db-migration-patterns.ts`.

---

## Family E3 — Cloud-Native

### `/k8s-design`
**Problem:** First-time k8s manifests are usually 80% right and 20% production-hostile (no resource limits, no PDB, wrong probe, no NetworkPolicy).
**Solution:** Generates production-ready Helm charts / Kustomize overlays / raw manifests for a workload. Knows: resource requests/limits, HPA/VPA, PDB, NetworkPolicy, ServiceAccount least-privilege, readiness vs liveness probes, topology spread, init containers, sidecars.
**Outputs:** `deploy/{workload}/{chart-or-manifest}/`.
**Dependencies:** None new. `helm` / `kustomize` CLI optional.

### `/service-mesh`
**Problem:** Adopting Istio / Linkerd / Consul-Connect is a multi-week experiment per team.
**Solution:** Audits whether a mesh helps; if yes, generates config for chosen mesh: traffic policies, mTLS, retries, timeouts, circuit breakers, canary routing, fault injection examples.
**Outputs:** `deploy/mesh/{config}.yaml` + `docs/mesh-decision.md`.
**Dependencies:** None new.

### `/observability`
**Problem:** Logs in CloudWatch, metrics in Prometheus, traces in Jaeger, dashboards in Grafana — no unified setup, missing correlation IDs.
**Solution:** Generates an OpenTelemetry-first observability stack: SDK setup per language, exporters (Prom/Tempo/Loki or Datadog/Honeycomb), trace propagation, log-trace correlation, baseline dashboards (RED/USE), alert rules.
**Outputs:** `deploy/observability/{otel,prom,grafana}/` + per-service SDK init code.
**Dependencies:** None new.

### `/sre-slo`
**Problem:** SLOs are aspirational marketing copy, not engineering contracts. No error budget, no enforcement.
**Solution:** Defines SLIs / SLOs / error budgets per service. Picks the right SLI shape (request-based, window-based, count-based) per workload. Outputs Prometheus recording + alerting rules and a quarterly review template.
**Outputs:** `docs/slos/{service}.md` + `deploy/prometheus/slo-rules.yaml`.
**Dependencies:** `/observability`.

### `/chaos`
**Problem:** Chaos engineering is talked about, not done. Engineers don't know what to break.
**Solution:** Recommends starting experiments per dependency graph node (kill a pod, fail a dep, slow a network link), generates Litmus / Chaos Mesh manifests, defines steady-state hypotheses, runs in staging, captures effect on SLOs.
**Outputs:** `chaos/experiments/{slug}.yaml` + `chaos/runs/{YYYY-MM-DD}.md`.
**Dependencies:** `/sre-slo`, `/dep-graph`.

---

## Family E4 — Multi-Repo / Monorepo

### `/multi-repo-refactor`
**Problem:** "Rename `User.email` to `User.primaryEmail` across 12 repos" — a week of coordinated PRs and broken consumers.
**Solution:** Given a refactor intent + list of repos, opens coordinated PRs with the same base commit, applies the change, runs each repo's tests, opens linked PRs and sets the merge order. Polls for green CI and lands them in dependency order.
**Outputs:** `refactors/{slug}.md` (plan + status table) + N PRs.
**Dependencies:** `gh`. New `bin/gstack-multi-repo`.

### `/monorepo-graph`
**Problem:** Nx / Turbo / Bazel / Lerna graphs are tool-specific; understanding "what does this change affect?" requires reading the tool's mental model.
**Solution:** Unified projection: detects the monorepo tool, projects the graph in a standard shape, supports queries like "what depends on package X?", "what's the longest build chain?", "which packages are unowned?".
**Outputs:** `docs/monorepo-graph.{md,svg,json}`.
**Dependencies:** Tool CLI present.

### `/cross-repo-pr`
**Problem:** Atomic multi-repo PRs aren't really atomic. They merge in some order; consumers break in between.
**Solution:** Manages a **train** of PRs across repos that must merge in lockstep. Defines a merge gate (all green, all approved). When the gate passes, lands them in order with retry on conflict. Reverts the whole train if any production check fails post-merge.
**Outputs:** `trains/{slug}.md` (status).
**Dependencies:** `gh`. New `lib/pr-train.ts`.

### `/workspace-sync`
**Problem:** Shared configs (tsconfig, eslint, prettier, Renovate, GH Actions) drift between repos. Same bug fix lands 4 times.
**Solution:** Pulls a canonical workspace template, diffs against each consuming repo, opens sync PRs. Renovate-style cadence; AskUserQuestion gates for breaking diffs.
**Outputs:** `workspace/template/` + sync PRs per repo.
**Dependencies:** `gh`. None new.

### `/shared-lib-bump`
**Problem:** Bumping a shared lib version cascades to N consumers; bump is easy, lockfile drift is not.
**Solution:** Given a shared lib + new version, opens version-bump PRs against every detected consumer, runs each test suite, files a single tracking issue with the merge plan.
**Outputs:** `bumps/{lib}-{version}.md`.
**Dependencies:** `/dep-graph` (cross-repo), `gh`.

---

## Family F — Red Team / Reverse Engineering

**Authorization context:** All Family F skills are for **authorized engagements only** — CTF, internal red-team, pentest with written scope, or research on Hall's own systems. Skills enforce a one-time scope declaration (`scope.yaml` per engagement) and refuse to operate outside it.

### `/recon`
**Problem:** Recon (passive + active) is a 4-hour grind of running `subfinder`, `amass`, `httpx`, `nuclei`, `shodan`, `crt.sh`, `wayback` and stitching the output.
**Solution:** Given a target in `scope.yaml`, orchestrates the standard passive→active recon chain, dedups, scores assets by attack surface (exposed admin, old TLS, leaked secrets), produces an attack-tree-ready inventory.
**Outputs:** `engagements/{slug}/recon.md` + machine-readable `recon.json`.
**Dependencies:** `subfinder`/`amass`/`httpx`/`nuclei`/`shodan-cli` installed. Refuses operation if target not in `scope.yaml`.

### `/exploit-dev`
**Problem:** Exploit development for CTFs / authorized engagements re-implements the same harness (pwntools setup, libc leak helpers, ROP chain template) every time.
**Solution:** Scaffolds an exploit project per target type (binary pwn, web, mobile, IoT firmware). Generates pwntools / angr / radare2 starter scripts, a Makefile, a journal template. Mode flag for **CTF** vs **engagement** (engagement requires written scope).
**Outputs:** `exploits/{slug}/{exploit.py,journal.md,README.md}`.
**Dependencies:** `pwntools`, `radare2`/`ghidra`, `angr` available. Authorization gate.

### `/reverse-engineer`
**Problem:** RE workflow is fragmented across Ghidra / IDA / Binary Ninja / Cutter. Notes live in screenshots.
**Solution:** Drives Ghidra headless analysis on a binary (or Cutter for license-free flow), extracts strings, functions, xrefs, suspicious calls, anti-debug, packer signatures. Generates an annotated `report.md` with hypotheses for next-step analysis. For mobile, runs `jadx` (Android) or `class-dump` + Hopper (iOS, if licensed).
**Outputs:** `re/{binary-hash}/{report.md,strings.txt,functions.json,disasm/}`.
**Dependencies:** Ghidra headless. Authorization gate.

### `/redteam-c2`
**Problem:** Setting up authorized C2 infrastructure (Sliver / Mythic / Havoc) for a red-team engagement is multi-day yak shave; tearing it down cleanly is its own problem.
**Solution:** Provisions a short-lived C2 stack from a hardened template (Sliver/Mythic/Havoc), generates implants for the agreed scope, configures redirectors, defines kill-switch and full teardown. **Refuses to run without `scope.yaml` containing client name + ROE + duration.**
**Outputs:** `engagements/{slug}/c2/{config.yaml,implants/,redirectors/,teardown.md}`.
**Dependencies:** Terraform/Pulumi, Sliver/Mythic/Havoc CLIs. **Strong authorization gate — refuses unscoped operation, logs every action to `engagements/{slug}/audit.log`.**

### `/purple-exercise`
**Problem:** Purple-team exercises drift into "did the SIEM catch this?" with no rigorous mapping back to detection coverage.
**Solution:** Picks an ATT&CK technique, generates an Atomic-Red-Team or Caldera test plan, runs it (or hands off to the blue team to detect blind), records what fired, what didn't, what should have. Outputs a MITRE-ATT&CK coverage delta.
**Outputs:** `purple/{YYYY-MM-DD-technique}.md` + ATT&CK navigator JSON.
**Dependencies:** Atomic Red Team / Caldera installed. Hooks into existing `/threat-model-evolve`.

### `/bug-bounty-triage`
**Problem:** Bug-bounty reports (HackerOne / Bugcrowd / direct) need quick triage: reproduce, score impact, dedup, prioritize fix.
**Solution:** Reads a triaged report, validates reproduction steps, runs the proof-of-concept in an isolated sandbox, scores severity (CVSS v4), checks for duplicate findings in `intel.jsonl`, drafts internal ticket + reply to reporter.
**Outputs:** `bounty/{report-id}.md`.
**Dependencies:** Sandbox runner (Docker/Firecracker). Hooks `/cso` + `/postmortem`.

---

## Family G — AI Engineering / Research

### `/eval-harness`
**Problem:** Every LLM/AI feature starts without an eval harness; quality regressions ship; "did it get better?" can't be answered.
**Solution:** Generates an eval harness for an AI feature: dataset structure (seed examples, edge cases, golden outputs), metric choice (accuracy / pairwise / Elo / rubric), regression baseline storage, CI integration. Knows pytest, deepeval, ragas, promptfoo conventions and picks the best fit.
**Outputs:** `evals/{feature}/{dataset.jsonl,run.py,baselines/}`.
**Dependencies:** None new. Aligns with existing `test/skill-llm-eval.test.ts` patterns.

### `/rag-design`
**Problem:** "Add RAG to this" is a 3-week design loop (chunking, embedding, retrieval, reranking, eval) that always picks the wrong defaults first.
**Solution:** Designs a RAG system end-to-end: data-source survey, chunking strategy (semantic vs structural vs hybrid), embedding model choice (OpenAI/Voyage/Cohere/local), vector store, retrieval algorithm, reranker, eval plan. Outputs a working scaffold + eval that proves the chunking decision.
**Outputs:** `rag/{namespace}/{ingest.py,retrieve.py,evals/,DESIGN.md}`.
**Dependencies:** `/eval-harness`. Vector-store SDKs (pgvector/Pinecone/Weaviate/Qdrant).

### `/agent-design`
**Problem:** Agent loops are designed ad-hoc; tool choice, observation, planning, reflection, and stopping criteria are tangled.
**Solution:** Designs an agent following a chosen pattern (ReAct, Plan-Solve, Reflexion, AutoGPT-style, Anthropic-style sub-agents). Outputs a typed state machine, tool definitions, prompt templates, eval plan. Audits an existing agent for failure modes (infinite loops, hallucinated tools, lost intent).
**Outputs:** `agents/{slug}/{state-machine.ts,tools.ts,prompts/,EVAL.md}`.
**Dependencies:** `/eval-harness`. Cross-references `/agent-browser` and `claude-api` skill patterns.

### `/finetune`
**Problem:** Fine-tuning a model (LoRA / QLoRA / full / RLHF / DPO) requires a stack (Axolotl, TRL, Unsloth) and dozens of hyperparams.
**Solution:** Given a task type (chat-style / classification / extraction / code), generates a fine-tune project: data preparation + cleaning, format conversion (sharegpt/alpaca/dpo), Axolotl/TRL config, eval baseline before+after, deployment plan. Knows current best-practice defaults per task.
**Outputs:** `finetune/{model-slug}/{prepare.py,config.yaml,evals/,RECIPE.md}`.
**Dependencies:** HuggingFace / Axolotl / TRL. Optional `huggingface-skills:hugging-face-model-trainer`.

### `/paper-pipeline`
**Problem:** Research papers (ML/security/HCI) require structured artifacts: experiment logs, ablation tables, figures, reproducible seeds.
**Solution:** Sets up a paper project skeleton with reproducibility built in: experiment runner, seeded configs, results store, figure generators, LaTeX skeleton (NeurIPS/ACL/IEEE), citation manager. On `/paper-pipeline run-ablation X`, runs the ablation and updates the table.
**Outputs:** `papers/{slug}/{paper.tex,experiments/,figs/,results.db}`.
**Dependencies:** LaTeX toolchain, citation manager. Hooks `huggingface-skills:hugging-face-paper-publisher`.

### `/prompt-engineering`
**Problem:** Prompts are tuned by trial-and-error; what works at 50 samples breaks at 5,000.
**Solution:** Systematic prompt engineering: starts from a clear task spec, generates 6-8 prompt variants spanning the proven techniques (CoT, few-shot, role-play, structured-output, decomposition, self-critique), runs them through `/eval-harness`, picks Pareto winners, documents *why* the winner won.
**Outputs:** `prompts/{task}/{variants/,winner.md,EVAL.md}`.
**Dependencies:** `/eval-harness`. `promptfoo` optional.

---

## Family H — Cognitive Computing / Human-Machine Collaboration

### `/agent-ux-review`
**Problem:** AI features feel awkward to use — too eager, too cautious, too verbose, unpredictable stopping. Standard UX review tools don't catch this.
**Solution:** Reviews an AI feature's interaction flow against principles for agent UX (predictability, repair, attention budget, surfaced uncertainty, escape hatches, mode visibility). Each principle rated 0-10 with concrete examples. Complements `/plan-ux-review` for non-AI flows.
**Outputs:** `ux/agent-review/{feature}-{YYYY-MM-DD}.md`.
**Dependencies:** `/plan-ux-review`. New `lib/agent-ux-principles.ts`.

### `/mental-model-trace`
**Problem:** Users build wrong mental models of how an AI feature works, then get confused when it behaves correctly per its real model.
**Solution:** Walks five user personas through the feature, traces what mental model each forms (extracted from think-aloud-style narration), diffs against the real system model, identifies the moments where the divergence is introduced and how to close it (label, hint, demonstration, friction).
**Outputs:** `ux/mental-models/{feature}.md`.
**Dependencies:** `discover-personas` (already shipped), `/ux-audit`.

### `/collaboration-pattern`
**Problem:** Human-AI collaboration patterns (pair, supervised, delegated, autonomous) are picked by accident; the wrong choice creates friction or risk.
**Solution:** Given a task, recommends the collaboration pattern with rationale: skill-level fit, error cost, observability requirement, user agency. Generates the prompt scaffolding + UI affordances for the chosen pattern. References Doug Engelbart, Lucy Suchman, recent HCAI literature.
**Outputs:** `ux/collaboration-patterns/{task}.md`.
**Dependencies:** None new.

### `/cognitive-load-audit`
**Problem:** "This dashboard / form / agent output feels heavy" — no rigor on *why*.
**Solution:** Quantifies cognitive load using Sweller's intrinsic/extraneous/germane split. Counts decisions per screen, working-memory chunks, novelty rate, choice overload. Suggests cuts based on which load type is dominant.
**Outputs:** `ux/cognitive-audit/{surface}.md`.
**Dependencies:** `/browse` (for live capture). New `lib/cognitive-load-heuristics.ts`.

### `/explanation-design`
**Problem:** AI-feature explanations either don't exist or are over-explained ("Here's a 6-paragraph essay about how the model works"). Users want enough trust to act, not a tutorial.
**Solution:** Designs explanation surfaces per **trust calibration** principles: confidence, alternatives, provenance, controllability, recourse. Picks the format (inline / on-demand / progressive) per user task. References Doshi-Velez & Kim, Miller, Lipton, Wachter recourse.
**Outputs:** `ux/explanations/{feature}.md` + component scaffolds.
**Dependencies:** None new.

---

## Family I — Operations Research / Behavioral Science

### `/optimize-decision`
**Problem:** "Which 3 features should we ship next?", "Which customers to call?", "Where to allocate engineering hours?" — Hall makes these by gut feel because formalizing them feels like overhead.
**Solution:** Formulates the decision as an optimization (LP / MIP / CP-SAT) using OR-Tools or Pyomo. Identifies decision variables, constraints, objective, and uncertainty. Solves it, surfaces shadow prices ("what would a one-unit relaxation buy you?"), generates a sensitivity table.
**Outputs:** `decisions/optimization/{slug}.{md,py,json}`.
**Dependencies:** Python with OR-Tools / Pyomo. New `lib/or-formulate.ts`.

### `/simulate`
**Problem:** Capacity / pricing / staffing / latency decisions need simulation, not back-of-envelope; nobody wires up SimPy because it takes a day.
**Solution:** Discrete-event or Monte-Carlo simulation from a system description. Auto-generates a SimPy or simmer model, runs scenarios, produces distribution outputs (p50/p95/p99), tornado plot for sensitivity. Reuses existing `simpy` skill in the stack.
**Outputs:** `simulations/{slug}/{model.py,results/,REPORT.md}`.
**Dependencies:** Existing `simpy` skill. Hooks `/sre-slo` (capacity planning).

### `/incentive-design`
**Problem:** Pricing tiers, referral programs, growth loops, internal OKRs — all incentive systems. Most are designed without thinking about what behavior they actually produce.
**Solution:** Designs an incentive system using mechanism design + behavioral econ. Inputs: actor, desired behavior, current behavior, constraints. Considers loss aversion, present bias, social proof, anchoring, Goodhart risk. Output is the incentive structure + a behavioral failure-mode list (gaming, perverse incentives, second-order effects).
**Outputs:** `incentives/{system}.md`.
**Dependencies:** Existing `pricing` skill, `marketing-psychology` skill — `/incentive-design` is the cross-domain orchestrator.

### `/behavioral-experiment`
**Problem:** Behavioral interventions (defaults, framing, social proof, friction) are A/B-tested ad hoc with no power calc; results are over-claimed.
**Solution:** Designs a behavioral experiment with proper power analysis, randomization strategy, primary + guardrail metrics, pre-registration of analysis plan, success/failure decision rule. Cites the underlying behavioral principle (anchoring, defaults, framing, salience).
**Outputs:** `experiments/behavioral/{slug}.md` + analysis-plan-ready notebook.
**Dependencies:** `statsmodels` skill (already shipped). Hooks `/ab-testing` skill.

### `/game-theory-analysis`
**Problem:** Competitive moves (pricing wars, feature races, public commitments) and negotiation prep are done without thinking about response curves.
**Solution:** Models the situation as a game (extensive form for sequential, normal form for one-shot). Identifies players, actions, payoffs, equilibrium concept (Nash, subgame-perfect, dominance). Generates the payoff matrix, computes equilibria, surfaces dominated strategies and credible threats.
**Outputs:** `decisions/game-theory/{slug}.md`.
**Dependencies:** `nashpy` / `gambit`. New `lib/game-theory.ts`.

### `/biases-audit`
**Problem:** UX, pricing, hiring, and product decisions are riddled with cognitive biases — confirmation, anchoring, sunk-cost, availability, in-group. Spotting them in your own work is hard.
**Solution:** Reviews a decision document or design surface for **target-specific** biases. For UX: anchoring/decoy/dark-pattern detection. For hiring: affinity/halo/anchoring. For pricing: anchoring/decoy/framing. For self-decisions: confirmation, sunk-cost, narrative fallacy. Pairs with `/marketing-psychology` skill but operates as a **defensive auditor**, not a persuasion tool.
**Outputs:** `audits/biases/{subject}-{YYYY-MM-DD}.md`.
**Dependencies:** Existing `marketing-psychology` skill — `/biases-audit` is its defensive twin.

---

## Family J — Product Transposition (constructive reverse engineering)

**Distinction from Family F:** Family F is *adversarial* RE on authorized targets (scope-gated). Family J is *constructive* RE for transformative work — studying products, papers, codebases, apps, and SDKs to extract their mechanism and rebuild it for Hall's domain with his proprietary IP layered in.

**IP posture:** Public material only. Transformative analysis, not derivative reproduction. Skills refuse to study material behind auth without explicit ownership declaration, and never copy verbatim text, images, code, or branding. Output is *new code that implements the studied mechanism in a different domain* — clean-room style.

**Canonical examples:**
1. **fingerspelling.xyz → TSL fingerspelling trainer** — product mode. Studied an ASL pedagogy product, transposed to Thai Sign Language phoneme inventory + hand-shape conventions, layered in Hall's proprietary TSL algorithms.
2. **supertonic-v3** — paper + code mode. Studied research paper(s) and inference source code, transposed inference → fine-tuning code path, layered in proprietary training strategy. Currently in testing.

**Pipeline shape:**

```
  ┌────────────┐    ┌────────────┐    ┌──────────────────┐    ┌──────────┐
  │ /blueprint │ →  │ /transpose │ →  │ /clone-and-twist │ →  │ /recipe  │
  │   study    │    │  plan the  │    │     build the    │    │ document │
  │   THEIRS   │    │   bridge   │    │     transposed   │    │   YOURS  │
  └────────────┘    └────────────┘    └──────────────────┘    └──────────┘
   BLUEPRINT.md     TRANSPOSITION.md   code + commits          INGREDIENTS.md
                                       (via /autobuild)        STEPS.md
                                                               TECHNIQUES.md
                                                               PLATING.md
```

### `/blueprint`
**Problem:** Studying a target (product, paper, codebase, app, SDK) for inspiration is a 1-3 day deep-dive that leaves no reusable artifact. Notes scatter across Notion, Obsidian, screenshots, and head. When you come back to build, you re-derive half of what you already learned. Each input type (live web app vs research paper vs OSS repo) has its own analyzer convention but no unified workflow.
**Solution:** Structured study skill with input-type adapters. Declared via `--mode`:
- `--mode product` — live web/SaaS product. Uses `/browse` to observe UX flow, probe behavior, read public docs. Refuses to operate behind auth without ownership declaration.
- `--mode paper` — research paper(s) via `markitdown` for PDF/arXiv ingestion. Extracts architecture, results, ablations, key design choices. Cites every claim back to a page/section.
- `--mode code` — open-source repo. Static analysis (imports, call graph, entry points, key abstractions). Reads README + ARCHITECTURE docs. Output cites file:line for each mechanism described.
- `--mode app` — mobile app via app store metadata + public API observation + manifest. No decompilation of proprietary binaries.
- `--mode api` — API/SDK via OpenAPI/SDL spec + behavioral probing on documented endpoints. Surfaces undocumented but observable behavior as hypotheses.

For each mode, the extractor produces a **domain-agnostic BLUEPRINT.md** with: mechanism description, data model, key algorithms, edge cases, non-obvious design choices, open questions about parts that couldn't be observed.

**Inputs:** Target identifier (URL / arXiv ID / repo URL / app ID / SDK spec), `--mode` flag, optional `--focus` areas to deepen, optional `--exclude` to skip known noise.
**Outputs:** `studies/{target-slug}/BLUEPRINT.md` + `studies/{target-slug}/{evidence/,notes/,questions.md,citations.md}`.
**Dependencies:** `/browse` (product/app/api modes), `markitdown` (paper mode), `/scrape` (within bounds), `huggingface-skills:hugging-face-paper-publisher` (paper-mode citation formatting). New `lib/study-extractors/{product,paper,code,app,api}.ts`.

### `/transpose`
**Problem:** Bridging a blueprint to a new domain (ASL → TSL, inference → fine-tuning, web → mobile, English → multilingual, single-tenant → multi-tenant) requires deciding what *stays* and what *changes*. Skip this step and you produce a literal clone that doesn't fit the new domain, or a creative rewrite that loses the original mechanism. The fingerspelling.xyz case needed an ASL-phoneme → TSL-phoneme map; the supertonic-v3 case needed an inference-pass → training-loop map. Same activity, different domain pairs.
**Solution:** Interactive bridge-planning skill (AskUserQuestion gates, in the `/plan-ceo-review` / `/plan-eng-review` family). Walks through:
1. **Source-domain inventory** — surfaces every mechanism element from BLUEPRINT.md and asks which to preserve.
2. **Target-domain spec** — Hall declares the new domain's invariants, vocabulary, constraints. Either interactively or via `--domain-spec file.yaml`.
3. **Stays vs adapts vs replaces** — line-by-line decision on each blueprint element. Three states: `STAY` (identical), `ADAPT` (same shape, new content), `REPLACE` (different mechanism entirely).
4. **Proprietary slot identification** — names exact insertion points for Hall's IP: model layer, dataset, algorithm, UX, eval. Each slot gets an interface spec.
5. **New-domain edge cases** — surfaces edge cases the target domain introduces that the source didn't have (e.g., TSL tone markers had no ASL analog; supertonic fine-tuning needed gradient-accumulation that inference didn't).

**Inputs:** `studies/{target-slug}/BLUEPRINT.md`, target-domain spec (interactive or `--domain-spec`).
**Outputs:** `studies/{target-slug}/TRANSPOSITION.md` — bridge plan with: source→target mapping table, proprietary slots list (with interface specs), new edge-cases section, build-order recommendations, eval-fidelity targets (which mechanism properties must be preserved post-transposition).
**Dependencies:** `/blueprint`. Reuses `/plan-eng-review` interactive review pattern. Optional `/plan-ux-review` if the transposition affects user-facing workflow.

### `/clone-and-twist`
**Problem:** Going from BLUEPRINT + TRANSPOSITION docs to running code is still a multi-week implementation. The temptation is to skip the structure and code-from-scratch, which loses careful mechanism preservation. Hall has now done this twice (fingerspelling + supertonic-v3) and each time wishes a skill had handed him a buildable plan with the proprietary slots pre-stubbed.
**Solution:** Reads BLUEPRINT.md + TRANSPOSITION.md, produces an `/autoplan-full`-compatible build plan structured as:
- **Core mechanism skeleton** — the parts marked `STAY` in TRANSPOSITION.md, scaffolded as concrete code with placeholder I/O.
- **Domain adapters** — the parts marked `ADAPT`, scaffolded as adapter modules with the new-domain interface.
- **Replacement modules** — the parts marked `REPLACE`, scaffolded as stub modules with clear "implement this for your domain" markers.
- **Proprietary slot stubs** — interface-only stubs at each slot from TRANSPOSITION.md. Hall fills these with his IP; the surrounding code doesn't change.
- **Mechanism-fidelity tests** — `/eval-harness`-compatible tests that verify the *original mechanism property* is preserved post-transposition (e.g., for supertonic-v3: "the fine-tuned model on a held-out inference task still passes the inference-only eval").

Hands off to `/autobuild` for execution. Maintains a `BUILD-LOG.md` linking each commit back to its blueprint section + transposition decision.

**Inputs:** `studies/{target-slug}/BLUEPRINT.md` + `studies/{target-slug}/TRANSPOSITION.md` from the same study slug.
**Outputs:** Code + commits (via `/autobuild`), `studies/{target-slug}/BUILD-LOG.md` (commit → blueprint section linkage), `studies/{target-slug}/FIDELITY-EVAL.md` (which mechanism properties were preserved + measured).
**Dependencies:** `/autoplan-full`, `/autobuild`, `/eval-harness` (mechanism-fidelity tests). Hooks `/verify-loop` after build to catch transposition gaps.

### `/recipe`
**Problem:** After `/clone-and-twist` ships (or any meaningful build), institutional knowledge of "how did we actually do this" lives in commit history and your head. Future-you, your first hire, your paper supplement, your blog readers — they all want a reproducible cookbook, not a git log. Today Hall has working code for supertonic-v3 fine-tuning and fingerspelling-TSL, and no consolidated recipe for either.
**Solution:** Reads a built project (with or without prior BLUEPRINT / TRANSPOSITION docs) and extracts a reproducible recipe in four sections:
- **INGREDIENTS.md** — runtime + framework versions, dependencies (pinned), services, datasets (with provenance), models (with weights provenance), env vars, secrets shape (not values).
- **STEPS.md** — build order with prerequisites for each step. Strict enough that a hire could follow it without asking Hall.
- **TECHNIQUES.md** — key algorithms with citations to YOUR design choices. Explains *why* each non-obvious choice was made (cross-referenced with `/adr` and TRANSPOSITION.md if available).
- **PLATING.md** — final assembly: deployment topology, UX surfaces, integration points, "running the dish" instructions.

Output mode controls how the recipe is rendered:
- `--for paper` — formatted as paper supplementary material (anonymized for review if `--anonymize`).
- `--for blog` — narrative blog-post draft, in Hall's voice.
- `--for onboarding` — new-hire walkthrough with "do this exercise" checkpoints.
- `--for replay` — strict reproducibility bundle (Dockerfile, seeded configs, env pins, golden outputs).

**Inputs:** Project root (or `studies/{target-slug}/` for transposition cases), `--for` mode. Optional `--exclude` for sensitive sections, optional `--audience` for tone adjustment.
**Outputs:** `recipes/{project-slug}/{INGREDIENTS.md,STEPS.md,TECHNIQUES.md,PLATING.md}` + mode-specific export (e.g., `paper-supplement.tex`, `blog-draft.md`, `onboarding/{step-NN}.md`, `replay/Dockerfile`).
**Dependencies:** `/document-generate` (Diataxis-aware rendering), `/paper-pipeline` (paper mode), `/onboarding` (onboarding mode). Hooks `/intel` for cross-project recipe-pattern learning (recipes themselves become future-blueprint reference material).

---

## Family K — Blue Team / Defensive Security

**Symmetry with Family F:** Red Team (F) probes; Blue Team (K) detects, responds, and learns. Hall's CPENT + CEH muscle informs both sides. The two families meet at `/purple-exercise` (lives in F but inherently bridges) — every red-team technique landed in F should produce a detection candidate in K, every detection rule shipped in K should be tested by F.

**Scope posture:** Family K skills operate on Hall's own systems (or systems Hall has incident-response authorization on). Unlike Family F's `scope.yaml` engagement gate, Family K's gate is *ownership* — declared once per project via `~/.gstack/projects/{slug}/security-ownership.yaml`.

### `/detect-engineering`
**Problem:** Writing detection rules (Sigma, KQL, SPL, YARA, Suricata, Zeek) is a craft skill — most rules out there are either too noisy (false-positive floods) or too narrow (miss the variant). And every SIEM speaks a different dialect.
**Solution:** Given a threat indicator (ATT&CK technique, malware family, IoC set, behavioral pattern), generates detection rules in the requested language. Knows: Sigma → universal source, Microsoft Defender KQL, Splunk SPL, Elastic EQL, CrowdStrike's logscale, YARA for files, Suricata for network. Outputs **one rule per detection language** for the same threat, with FP-reduction modifiers and test cases.
**Inputs:** Threat description (free text, MITRE ATT&CK ID, or IoC bundle), target language(s).
**Outputs:** `detections/{technique-id}/{language}.{rule-ext}` + `detections/{technique-id}/TESTS.md`.
**Dependencies:** Sigma library, language-specific linters (e.g., `splunk` CLI, `kqlmagic`). Hooks `/threat-hunt` for hypothesis validation before rule landing.

### `/threat-hunt`
**Problem:** Threat hunting often degenerates into "search the logs for known bads" — which detection rules already handle. The hard part is hypothesizing *new* adversary behavior and proving/disproving it from data.
**Solution:** Hypothesis-driven hunting framework. Generates a hunt hypothesis from a threat profile (e.g., "an attacker with foothold X would do behavior Y to achieve objective Z"), translates it to queries against available logs (cloud trail, EDR telemetry, DNS, identity, process), executes the queries, scores result confidence, declares hunt outcome (found / not found / inconclusive), proposes detection-engineering candidates for confirmed patterns.
**Inputs:** Threat profile or hypothesis (interactive AskUserQuestion), available log sources from `security-ownership.yaml`.
**Outputs:** `hunts/{YYYY-MM-DD-slug}/{HYPOTHESIS.md,QUERIES/,RESULTS.md,FINDINGS.md}`.
**Dependencies:** Log-source connectors (CloudWatch / Splunk / Elastic / Sentinel / Loki). Hooks `/detect-engineering` for converting confirmed hunts into permanent rules.

### `/siem-tune`
**Problem:** SIEMs ship with hundreds of out-of-the-box rules; most fire false positives, drown the on-call, and erode trust in the signal. Tuning is an ongoing tax that nobody owns.
**Solution:** Audits current SIEM rule set against actual alert volume + analyst dispositions (TP / FP / benign). Scores each rule on **precision × business impact × adversary plausibility**. Proposes: which rules to retire, which to tune (suppression conditions, threshold changes), which gaps need new rules (gaps surfaced from `/threat-hunt` outputs). Mode flag for read-only audit vs apply.
**Inputs:** SIEM API credentials (read-only by default), alert history.
**Outputs:** `siem/tune/{YYYY-MM-DD}/{AUDIT.md,RETIRE.yaml,TUNE.yaml,NEW.yaml}`.
**Dependencies:** SIEM-specific SDK. Hooks `/detect-engineering` for new-rule authoring.

### `/log-analyze`
**Problem:** A 4-million-line log dump or a noisy CloudTrail bucket needs triage now (incident, breach response, forensics). Manual grep is hopeless; ad-hoc parsing scripts get thrown away.
**Solution:** Structured log triage skill: detects log format(s) automatically (JSON / syslog / CEF / CloudTrail / IIS / nginx / app), normalizes to a common schema, surfaces statistical anomalies (rare user agents, unusual time-of-day, geographic outliers, frequency spikes), proposes IoCs to pivot on, generates a timeline of suspicious activity. Persistable as a "case file" that other skills (e.g., `/forensics`, `/postmortem`) read.
**Inputs:** Log file path(s) or stream URL, optional time window, optional pivot IoC.
**Outputs:** `cases/{slug}/{NORMALIZED.jsonl,TIMELINE.md,ANOMALIES.md,PIVOTS.md}`.
**Dependencies:** `polars` for fast tabular ops, format-specific parsers. New `lib/log-detect.ts`. Hooks `/forensics` for case-file handoff.

### `/honeypot`
**Problem:** Detection-first defense misses attackers who avoid known IoCs. Deception (canary tokens, honeypots, honeypages, honey-credentials) generates **high-fidelity, near-zero-FP signal** but nobody deploys it because the setup work is fragmented.
**Solution:** Deploys a chosen deception tier: (1) canary tokens (AWS keys, AWS IAM users, fake env files, watermarked docs) via `canarytokens.org` or self-hosted; (2) honeypages (fake admin panels, fake API keys in code) seeded in expected attacker discovery paths; (3) full honeypots via T-Pot or Thinkst Canary. Monitors triggers, alerts on hit, suggests follow-up (block IP, rotate adjacent real creds, escalate to IR).
**Inputs:** Deception tier choice, deployment target (cloud account / repo / network segment).
**Outputs:** `deception/{tier}/deployments.yaml` + ongoing `deception/triggers.jsonl`. Trigger fires Slack/PagerDuty alert.
**Dependencies:** Canarytokens API or T-Pot/Thinkst integration. New `lib/deception-deploy.ts`.

### `/soar-playbook`
**Problem:** Incident response runs on tribal knowledge: which logs to pull, who to notify, which evidence to preserve, which response actions are pre-authorized. Repeatability is zero.
**Solution:** Generates SOAR playbooks (XSOAR / Tines / TheHive / Shuffle / n8n) for common incident types: phishing, credential-stuffed account, ransomware indicator, public-facing-app exploit, insider data exfil. Each playbook: triage steps, evidence collection, containment options (require human approval), comms templates, IR-handoff. Codified as YAML/JSON the SOAR platform imports.
**Inputs:** Incident class + target SOAR platform.
**Outputs:** `playbooks/{platform}/{incident-class}.{yaml,json}` + `playbooks/{incident-class}/RUNBOOK.md` (human-readable companion).
**Dependencies:** Platform-specific SDK or import format. Hooks `/incident-response` from Family C (the human runbook side).

### `/threat-intel`
**Problem:** Threat-intel feeds (MISP, OpenCTI, commercial vendors, OSINT) produce far more IoCs and reports than any one operator can process. 99% is noise to your stack; the 1% that matters drowns.
**Solution:** Ingests selected feeds, filters to indicators relevant to **Hall's stack** (declared in `security-ownership.yaml` — cloud, languages, frameworks, vendors used), enriches with confidence + sightings, dedups, prioritizes by adversary relevance. Output is a daily/weekly briefing + a structured IoC store consumable by `/detect-engineering` and `/threat-hunt`.
**Inputs:** Feed list (configured once), filter spec.
**Outputs:** `intel/feeds/{YYYY-MM-DD}/BRIEFING.md` + `intel/iocs.jsonl` (typed, deduped store).
**Dependencies:** MISP / OpenCTI API. New `lib/intel-correlate.ts`.

### `/forensics`
**Problem:** DFIR after an incident is improvised: disk acquisition, memory capture, timeline reconstruction, IoC extraction — all done by hand under stress. Evidence chain-of-custody is brittle.
**Solution:** Walks a forensics case: image acquisition (dd / FTK / Velociraptor agent), memory capture (Volatility), filesystem timeline (Plaso / log2timeline), browser-artifact extraction, process-tree reconstruction. Produces chain-of-custody log, structured findings, IoC handoff to `/threat-intel` + `/detect-engineering`. Strict read-only on evidence; mutations only in working-copy.
**Inputs:** Evidence path or live system (with ownership declaration), case slug.
**Outputs:** `cases/{slug}/{ACQUISITION.md,TIMELINE.md,FINDINGS.md,IOCS.jsonl,CHAIN-OF-CUSTODY.log}`.
**Dependencies:** Volatility, Plaso, Velociraptor (optional). Hooks `/postmortem` (Family C) and `/log-analyze`.

---

## Family L — Speech & Voice AI

Hall's goal: **voice AI with expression + accent + tone + multilingual**. Family L is TTS-primary with ASR coverage. Architecture-aware (VITS, Tacotron, StyleTTS2, XTTSv2, Bark, Tortoise, Coqui, Whisper, wav2vec2, Conformer) — picks the right backbone for the use case, not blanket recommendations.

### `/tts-design`
**Problem:** Picking a TTS stack is a 1-2 week eval: VITS for speed? StyleTTS2 for quality? XTTSv2 for multilingual zero-shot? Each has different training data needs, hardware, license posture, and quality ceiling. Most teams pick wrong and rebuild 6 months in.
**Solution:** Given target spec (languages, voice count, latency budget, expression/prosody requirements, deployment constraints), recommends architecture + training plan with rationale. Outputs an `/autoplan-full`-compatible build plan with data-prep, training, eval, and deployment phases.
**Inputs:** TTS requirements spec (interactive or `--spec spec.yaml`), target languages, target voices, latency + quality + license constraints.
**Outputs:** `tts/{slug}/{ARCHITECTURE.md,TRAIN-PLAN.md,DATA-PLAN.md,EVAL-PLAN.md}`.
**Dependencies:** `/eval-harness --domain speech-tts`, `/finetune --domain speech-tts`. Knowledge base of current TTS state-of-the-art (refreshed via `/discover`).

### `/voice-clone`
**Problem:** Voice cloning workflows scatter across zero-shot (XTTS, Tortoise) vs few-shot (StyleTTS2 fine-tune) vs full fine-tune (VITS). Quality gates, IP/consent posture, and watermarking are usually afterthoughts that bite at deployment.
**Solution:** End-to-end voice-cloning skill with consent-and-watermark guardrails. Picks the right tier (zero/few/full) per requirements, generates the data-prep + training + watermark + eval pipeline, includes a **synthetic-voice attribution test** (proves your output is your output, not someone else's voice).
**Inputs:** Voice samples (with consent declaration), target quality tier, deployment use case (own voice / licensed actor / synthetic persona).
**Outputs:** `voices/{voice-slug}/{CONSENT.md,clone-config.yaml,watermark-keys.bin,EVAL.md}` + trained model.
**Dependencies:** XTTSv2 / Tortoise / StyleTTS2. New `lib/voice-watermark.ts`. Hooks `/eval-harness --domain speech-tts`.

### `/prosody-control`
**Problem:** Out-of-the-box TTS sounds flat. Expression, tone, accent, and emotional control require either hand-tuned reference audio or learned style vectors — and the techniques don't compose cleanly. The fingerspelling.xyz → TSL case needed *Thai-accented English* with *teaching-cadence prosody*; no off-the-shelf model does this.
**Solution:** Designs the prosody-control surface for a TTS system: reference-audio conditioning, learned style tokens (GST), explicit prosody tags (SSML extensions, IPA + tone marks), per-sentence style embeddings, multi-speaker mixing. Picks the technique stack per use case, generates the training-data augmentation strategy.
**Inputs:** Base TTS model, prosody requirements (expression set, accents, tone variants), available reference audio.
**Outputs:** `tts/{slug}/PROSODY/{CONTROL-SURFACE.md,STYLE-DATA-PLAN.md,EVAL-PERCEPT.md}`.
**Dependencies:** `/tts-design`, `/eval-harness --domain speech-tts`. Hooks `/voice-eval` for perceptual scoring.

### `/voice-eval`
**Problem:** TTS evaluation is mostly "does it sound good?" — qualitative and unrepeatable. Real eval needs MOS, speaker similarity, prosody fidelity, intelligibility (WER on the synthesized audio), and emotion-recognition accuracy if expression is in scope.
**Solution:** Per-task TTS/ASR eval harness with multi-metric scoring: MOS (or MOSNet predicted MOS), speaker similarity (ECAPA-TDNN embeddings), WER via Whisper-back-transcription, prosody distance (F0/duration), emotion-classifier accuracy. Stores baselines for regression detection. Produces a perceptual scorecard.
**Inputs:** Generated audio samples + reference text + (optional) reference audio.
**Outputs:** `tts/{slug}/EVAL/{YYYY-MM-DD}/{SCORECARD.md,metrics.jsonl}`.
**Dependencies:** `/eval-harness` (writes to shared eval store, S9). Whisper, ECAPA-TDNN, MOSNet models.

---

## Family O — Accessibility AI

Hall's PhD area (indoor navigation) and sign-language work (text-to-sign + sign-to-text). The accessibility domain has deep linguistic and sensor-fusion specifics that don't reduce to generic vision/speech skills.

### `/indoor-nav`
**Problem:** Indoor navigation needs sensor fusion (Wi-Fi RTT, BLE beacons, IMU dead-reckoning, magnetic anomaly, visual SLAM), localization techniques (particle filter, Kalman, factor graph), and routing on indoor maps with accessibility constraints (elevator preference, no stairs, wheelchair width). Generic SLAM toolkits miss the accessibility layer.
**Solution:** Designs an indoor-nav system: picks the sensor stack per venue type (mall / hospital / campus), the localization algorithm, the map data model (with accessibility annotations), routing constraints, and the user-facing turn-by-turn UX. Optional: building-map ingestion from CAD/BIM.
**Inputs:** Venue type, sensor stack available, accessibility requirements, target accuracy.
**Outputs:** `nav/{venue-slug}/{ARCHITECTURE.md,SENSOR-FUSION.md,MAP-MODEL.md,ROUTING-RULES.md,UX-FLOW.md}`.
**Dependencies:** Hall's PhD thesis as canonical reference (link in S4 decision store). New `lib/indoor-nav-models.ts` if SLAM components needed.

### `/sign-text`
**Problem:** Sign-language↔text translation is bidirectional (text→sign for production, sign→text for understanding) and **not** equivalent to spoken-language MT. Signs have parameters (handshape, location, movement, orientation, non-manual features). Glossing conventions differ per language (ASL gloss ≠ TSL gloss). Off-the-shelf NMT fails.
**Solution:** Designs bidirectional sign↔text pipelines per target sign language. **text→sign**: text normalization, gloss generation, sign-parameter sequence, render-target (animated avatar from Family P, video synthesis, or annotated gloss output). **sign→text**: video preprocessing, pose extraction (MediaPipe Holistic / Sapiens), sign segmentation, gloss recognition, text generation.
**Inputs:** Target sign language (ASL/BSL/TSL/JSL/etc.), direction (text→sign / sign→text / both), output modality.
**Outputs:** `sign/{language}/{ARCHITECTURE.md,PARAM-SCHEMA.md,GLOSS-GUIDE.md,DATA-PLAN.md,EVAL.md}`.
**Dependencies:** `/sign-linguistics`, MediaPipe / Sapiens for pose, `/eval-harness --domain sign`. Hooks Family P for avatar rendering.

### `/sign-linguistics`
**Problem:** Sign-language linguistic resources (phoneme inventory, handshape catalogs, location grids, non-manual markers, prosody) are scattered across academic literature and dataset documentation. Building a TSL or BSL system needs all of this stitched together.
**Solution:** Per-sign-language linguistic resource compiler: handshape inventory (with HamNoSys / SignWriting / SLPA encoding), location grid, movement primitives, non-manual marker conventions, prosody features (intensity, repetition, hold). Cites primary linguistic sources. Output is a structured YAML consumed by `/sign-text` and `/avatar-sign`.
**Inputs:** Target sign language, scope (full vs subset).
**Outputs:** `sign/{language}/linguistics/{HANDSHAPES.yaml,LOCATIONS.yaml,MOVEMENTS.yaml,NON-MANUAL.yaml,PROSODY.yaml,BIBLIOGRAPHY.md}`.
**Dependencies:** Literature search via `/scrape` + `markitdown`. Optional integration with Sign Language Phonology Annotation tool.

### `/accessibility-audit`
**Problem:** Accessibility audits are usually WCAG 2.x box-checking ("does it have alt text?") that pass while the experience for assistive-tech users is still broken (focus order chaos, ARIA-roles wrong, dynamic content not announced).
**Solution:** WCAG 2.2 audit augmented with assistive-tech behavioral testing (VoiceOver / TalkBack / NVDA / JAWS via `/browse` automation), keyboard-only flow validation, color-contrast + cognitive-load checks (Family H bridge), and audit against accessibility user-personas (blind, low-vision, deaf, motor-impaired, cognitive). Outputs WCAG conformance level + an assistive-tech experience score.
**Inputs:** Target URL or app, personas to evaluate, WCAG version (default 2.2 AA).
**Outputs:** `accessibility/audits/{YYYY-MM-DD}/{WCAG-CONFORMANCE.md,AT-EXPERIENCE.md,REMEDIATION.md}`.
**Dependencies:** `/browse`, `/ux-audit`, screen-reader automation. Hooks `/cognitive-load-audit` (Family H).

### `/multi-sign`
**Problem:** Multi-sign-language systems (ASL + BSL + TSL + JSL) need shared infrastructure (rendering, pose extraction, eval harness) but language-specific linguistic resources. Building each language as a silo wastes effort; over-generalizing loses linguistic fidelity.
**Solution:** Designs a multi-sign-language platform: shared infrastructure layer (avatar rendering, video preprocessing, eval framework), per-language `/sign-linguistics` plug-ins, code-switching support, language-detection at input. Generates the deployment architecture and the per-language plug-in interface.
**Inputs:** Target sign-language list, shared-component scope.
**Outputs:** `sign/platform/{ARCHITECTURE.md,SHARED-INFRA.md,PLUGIN-INTERFACE.md,LANGUAGE-SUPPORT-MATRIX.md}`.
**Dependencies:** `/sign-text`, `/sign-linguistics` (one per language).

---

## Family P — Avatar & Embodiment (mixed-track)

This is **Hall's mixed track**: virtual avatars that **move + speak + express** (and optionally **perform sign language**). Family P combines Family L (Speech) + Family G with `--domain cv` + Family O (Accessibility) into a coherent embodied-AI workflow.

### `/avatar-design`
**Problem:** Full avatar systems (face + body + voice + animation + emotional expression) span 5+ subsystems with no canonical architecture. Stitching together a TTS + lip-sync + facial-expression + body-gesture + neural-rendering stack is a multi-month integration project.
**Solution:** Designs full avatar architecture given use case (real-time conversational / pre-rendered cinematic / sign-language performer / scripted explainer). Picks: face model (NeRF / Gaussian Splatting / 3DMM / 2D), body model (SMPL-X / VR avatar / 2D), animation driver (audio-driven / motion-capture / hybrid), expression vocabulary, voice (from Family L), integration layer. Outputs build-ready architecture + eval harness for perceived humanness, lip-sync quality, and gesture appropriateness.
**Inputs:** Use case spec, real-time vs offline constraint, target hardware, voice spec, expressivity requirements.
**Outputs:** `avatars/{slug}/{ARCHITECTURE.md,SUBSYSTEMS.md,INTEGRATION.md,EVAL-HUMANNESS.md}`.
**Dependencies:** `/tts-design`, `/lip-sync`, `/gesture-synth`, `/expression-synth`. Optional `/avatar-sign` for sign-performing variants.

### `/lip-sync`
**Problem:** Lip-sync quality determines whether an avatar feels alive or uncanny. Off-the-shelf solutions (Wav2Lip, SadTalker, MuseTalk, EMO) have different strengths (real-time vs quality, speaker-dependent vs zero-shot, English-only vs multilingual). Picking wrong wastes weeks.
**Solution:** Lip-sync model selection + training/inference pipeline per use case. For real-time: MuseTalk or audio2lip with low-latency optimization. For quality: EMO / latentSync. For multilingual: SadTalker tuned per language. Handles phoneme-to-viseme mapping per language (different from English visemes).
**Inputs:** Avatar face model, target latency, target languages, training-data availability.
**Outputs:** `avatars/{slug}/lip-sync/{MODEL-CHOICE.md,VISEME-MAP.yaml,TRAIN-PLAN.md,EVAL.md}`.
**Dependencies:** Wav2Lip / SadTalker / MuseTalk / EMO checkpoints. Hooks `/voice-eval` for cross-modal sync evaluation.

### `/gesture-synth`
**Problem:** Speech-to-gesture synthesis (co-speech gestures: beats, deictics, iconic, metaphoric) is its own discipline. Without it, avatars feel like talking heads. Off-the-shelf models (GENEA, Audio2Gestures, GestureDiffusion) need careful selection per use case.
**Solution:** Gesture-synthesis pipeline per use case (conversational / presenter / character). Picks model + cultural-gesture vocabulary + style adaptation strategy. Knows: GENEA challenge SOTA, retargeting from MoCap, beat-extraction from audio.
**Inputs:** Avatar body rig, speech + transcript, cultural context, gesture style.
**Outputs:** `avatars/{slug}/gestures/{MODEL.md,VOCAB.yaml,STYLE.md,EVAL.md}`.
**Dependencies:** GENEA-style models. New `lib/gesture-retarget.ts`. Hooks `/cognitive-load-audit` (gestures that compete with speech load are bad).

### `/expression-synth`
**Problem:** Facial expression generation tied to emotional state, intent, and conversational beat (turn-taking, agreement, surprise) is the difference between an avatar that listens and one that stares. Discrete-emotion models (Ekman) miss subtlety; continuous valence-arousal misses intent.
**Solution:** Designs an expression-synthesis surface combining: continuous valence-arousal, conversational-beat markers (back-channels, turn-take cues), intent-driven micro-expressions (curiosity, doubt, recognition), and FACS-based action unit composition. Generates the control surface + training-data augmentation strategy.
**Inputs:** Avatar face rig, expression vocabulary, conversational context model.
**Outputs:** `avatars/{slug}/expression/{CONTROL-SURFACE.md,EMOTION-MODEL.md,BEAT-CUES.md,FACS-MAP.yaml,EVAL.md}`.
**Dependencies:** EMOCA / DECA / FACSHuman. Hooks `/agent-ux-review` (Family H) for trust-calibration in expressed uncertainty.

### `/avatar-sign`
**Problem:** Sign-language-performing avatars need everything `/avatar-design` covers **plus** linguistically accurate handshapes, locations, movements, non-manual features, and prosody — all driven from gloss or directly from text. Most sign avatars look robotic because they treat signs as keyframe animations, ignoring sign-language phonology.
**Solution:** Sign-performing avatar pipeline: ingests gloss or text (via `/sign-text`), maps to sign parameters (via `/sign-linguistics`), animates the avatar with proper handshape + location + movement + non-manual coordination, includes prosodic intensity and repetition. Optional native-deaf reviewer loop for fluency check.
**Inputs:** Avatar rig (must have hand articulation), source sign language, source text or gloss.
**Outputs:** `avatars/{slug}/sign/{PARAM-MAPPER.md,ANIMATION-PIPELINE.md,FLUENCY-EVAL.md}` + rendered video.
**Dependencies:** `/avatar-design`, `/sign-text`, `/sign-linguistics`. Cross-family bridge between J + L + O + G.

---

## Family Q — FinTech / Algorithmic Trading

Algorithmic trading has unique workflow concerns (look-ahead bias, point-in-time data, regime detection, kill switches) that generic AI/eng skills miss. Family Q codifies what Hall has learned building algo systems.

### `/strategy-design`
**Problem:** Algorithmic strategy design slides into anecdote-driven hyperparameter tuning. Without a strategy class taxonomy (mean-reversion / momentum / stat-arb / market-making / ML) and edge-source analysis ("where does the edge come from?"), most strategies are over-fit fantasies.
**Solution:** Strategy design framework: declare the edge hypothesis (microstructure / behavioral / informational / latency), pick strategy class, specify signal generation, position sizing rule, entry/exit logic, risk-side constraints. Outputs a fully-specified strategy doc that's testable.
**Inputs:** Edge hypothesis, market(s), capital scale, holding period.
**Outputs:** `strategies/{slug}/{STRATEGY.md,EDGE-HYPOTHESIS.md,SIGNAL.md,SIZING.md,RISK.md}`.
**Dependencies:** None new. Hooks `/optimize-decision` (Family I) for parameter optimization.

### `/backtest`
**Problem:** Backtesting in practice has more landmines than craters: look-ahead bias, survivorship bias, point-in-time data violations, unrealistic fills, missing slippage, missing borrow costs, regime-bound calibration. Backtests look amazing; live trades lose money.
**Solution:** Backtest harness that enforces: point-in-time data only (PIT-aware), realistic transaction costs (commissions + slippage + market impact), realistic fills (limit-order book if available, else queue position model), borrow costs for shorts, survivorship-corrected universe, walk-forward instead of in-sample/out-of-sample split. Emits a backtest report with the standard set of metrics PLUS regime breakdowns.
**Inputs:** Strategy spec (from `/strategy-design`), market data path, date range.
**Outputs:** `backtests/{strategy-slug}/{YYYY-MM-DD-hhmm}/{REPORT.md,equity-curve.csv,trades.csv,regime-breakdown.md}`.
**Dependencies:** Market-data pipeline (S16 below). New `lib/backtest-pit-engine.ts`. Hooks `/strategy-eval`.

### `/risk-engine`
**Problem:** Risk management retrofitted onto a strategy is too late. Position sizing, drawdown limits, correlation caps, kill switches, and circuit breakers belong in the design from day one.
**Solution:** Designs a risk engine for a strategy: Kelly / fractional Kelly / risk-parity / vol-targeted position sizing, max position per asset, max correlated exposure, max daily/weekly/monthly drawdown trigger, kill-switch criteria, manual-override interlock. Backtests the strategy *with* the risk engine layered in. Emits a risk-decision log.
**Inputs:** Strategy spec, capital, risk tolerance, regulatory constraints.
**Outputs:** `strategies/{slug}/risk/{SIZING-RULE.md,LIMITS.md,KILL-SWITCH.md,RISK-DECISION-LOG.csv}`.
**Dependencies:** `/backtest` (for layered backtest). New `lib/risk-engine.ts`.

### `/paper-trade`
**Problem:** Paper trading often skips realistic execution — fills happen at theoretical mid-price, no slippage, no rejection. The paper P&L diverges wildly from what live trading would have produced.
**Solution:** Paper-trading harness with **realistic execution simulation**: order-book-aware fills, latency simulation, partial fills, rejections, exchange downtime. Lives between backtest and live trading. Generates discrepancy reports (paper vs idealized backtest) so divergence is visible before risking real capital.
**Inputs:** Strategy + risk engine, target broker for live (used for latency profile).
**Outputs:** `paper-trades/{strategy-slug}/{YYYY-MM-DD}/{TRADES.csv,FILL-QUALITY.md,DIVERGENCE-REPORT.md}`.
**Dependencies:** Live market data feed (read-only). New `lib/execution-sim.ts`. Hooks `/strategy-eval`.

### `/strategy-eval`
**Problem:** Strategy evaluation often stops at Sharpe ratio. But Sharpe assumes normal returns, hides tail risk, and doesn't decompose performance by regime.
**Solution:** Multi-metric strategy eval: Sharpe + Sortino + Calmar + max drawdown + tail metrics (CVaR, expected shortfall), regime-conditional performance (bull / bear / sideways / high-vol / low-vol), capacity estimate (at what AUM does the strategy break?), drawdown recovery analysis. Compares against benchmark and against the strategy's *own backtest projection* — flags when live ≠ backtest beyond noise.
**Inputs:** Trade history (backtest, paper, or live).
**Outputs:** `strategies/{slug}/eval/{YYYY-MM-DD}/{SCORECARD.md,REGIME-BREAKDOWN.md,CAPACITY.md,DIVERGENCE.md}`.
**Dependencies:** `statsmodels` skill. Hooks `/optimize-decision` for parameter sensitivity.

---

## Family R — Economic Simulation

Hall's goal: **economic simulation with real + real-time events + situation**. Family R covers agent-based and system-dynamics simulation with live-event ingestion.

### `/econ-sim`
**Problem:** Economic simulation papers exist; reproducible runnable economic simulators don't. Building one needs: choice of paradigm (agent-based / system dynamics / DSGE / hybrid), agent population design, market clearing mechanism, time-step discipline, behavioral rules.
**Solution:** Designs an economic simulation given research question. Picks paradigm: **ABM** (Mesa / Agents.jl) for heterogeneous agents and emergent behavior; **system dynamics** (PySD) for aggregate stock-flow; **DSGE** (Dynare) for general-equilibrium policy analysis; **hybrid** for cross-scale. Specifies agent types (households / firms / banks / govt / external), interaction protocol, time discretization, market clearing.
**Inputs:** Research question, paradigm (or `auto` for recommendation), scale (single-country / multi-country / global), agent classes desired.
**Outputs:** `econ-sims/{slug}/{PARADIGM-CHOICE.md,AGENT-CLASSES.md,INTERACTION.md,TIME-MODEL.md,IMPLEMENTATION-PLAN.md}`.
**Dependencies:** Mesa / Agents.jl / PySD / Dynare. Hooks `simpy` skill for discrete-event flows.

### `/event-stream`
**Problem:** Real-world event ingestion (news, social sentiment, macro indicators, market prices, policy announcements) into a sim is the hard part. Generic ETL pipelines don't model **information arrival** correctly — agents in the sim should react to events at the time they would have been observable, not at publication time.
**Solution:** Event-stream design for an econ sim: source selection (news APIs, FRED for macro, social platforms, market data), normalization to event schema, **observability-time** modeling (when would a given agent class have known about this event?), event-injection into the sim time-line, replay vs live-fire modes.
**Inputs:** Event sources, target sim's time discretization, agent observability rules.
**Outputs:** `econ-sims/{slug}/events/{SOURCES.yaml,NORMALIZED-SCHEMA.md,OBSERVABILITY-MAP.md,INGESTION.md}`.
**Dependencies:** `fred-economic-data`, `alpha-vantage`, `parallel-web`, news APIs. New `lib/event-observability.ts`.

### `/counterfactual`
**Problem:** Policy/shock analysis ("what if the central bank had raised rates 6 months earlier?") requires running the sim with and without the intervention, controlling for confounds, and bounding the answer with uncertainty. Most counterfactual claims are hand-waving.
**Solution:** Counterfactual analysis framework: paired runs (with/without intervention), multi-seed ensemble for uncertainty quantification, sensitivity analysis on key parameters, robustness check across model variants. Outputs a structured counterfactual report with confidence bands.
**Inputs:** Baseline sim spec, intervention/shock definition, target outcome metric, time window.
**Outputs:** `econ-sims/{slug}/counterfactuals/{slug-of-intervention}/{HYPOTHESIS.md,RUNS.md,RESULTS.md,SENSITIVITY.md,REPORT.md}`.
**Dependencies:** `/econ-sim`, `/simulate` (Family I). Hooks `/eval-harness`.

### `/sim-calibrate`
**Problem:** A simulation that doesn't match historical data is fiction. Calibration (matching real outcomes via parameter tuning) needs proper statistical discipline — minimize distance metric, but don't overfit, and don't tune on the same data you'll evaluate on.
**Solution:** Calibration workflow: pick calibration target (moments, time series, distributions), distance metric (MSD, KL divergence, Wasserstein, indirect inference), parameter search (Bayesian / grid / surrogate-model-guided), train/test split discipline, post-calibration validation against held-out events.
**Inputs:** Sim spec, historical data, calibration target.
**Outputs:** `econ-sims/{slug}/calibration/{TARGET.md,SEARCH.md,POSTERIOR.md,VALIDATION.md}`.
**Dependencies:** `pymc` (Bayesian), `scikit-learn` (surrogate). Hooks `/optimize-decision`.

---

## Sequencing

Numbering is continuous across waves so the order is unambiguous. Each item groups skills that ship together as a coherent set.

### Wave 1 — Highest urgency, smallest scope (~2 weeks)

The skills Hall will use *every week* and that unblock revenue or research velocity:

1. **`/adr`** — every decision logged from day one
2. **`/postmortem`** — first incident gets a real debrief
3. **`/compliance-audit`** — SOC 2 / HIPAA are enterprise-sales blockers
4. **`/api-design`** — every backend feature starts here
5. **`/investor-update`** — monthly forcing function
6. **`/eval-harness`** — every AI feature ships with an eval, period

### Wave 2 — High-leverage workflows (~3 weeks)

Workflows that recur and cost half-days each time:

7. **`/tech-debt-register`** — recurring unplanned-work source
8. **`/cost-optimize`** — finance-visible savings
9. **`/db-design`** — highest-cost-of-mistake surface
10. **`/db-migration`** — pairs with `/db-design`
11. **`/mobile-build`** — opens whole new app surface
12. **`/runway`** — kills the spreadsheet
13. **`/c4-diagram`** — onboarding + architecture review accelerant
14. **`/recon`** — passive→active recon orchestrator (red team)
15. **`/rag-design`** — RAG end-to-end with eval-gated chunking
16. **`/agent-design`** — typed state-machine agents
17. **`/optimize-decision`** — formalize feature/customer/hours allocation
18. **`/biases-audit`** — defensive self-review on UX/pricing/hiring docs
19. **`/blueprint`** + **`/transpose`** + **`/clone-and-twist`** + **`/recipe`** — full Family J pipeline (constructive RE). Real day-one usage: supertonic-v3 recipe + TSL fingerspelling transposition.
20. **`/detect-engineering`** + **`/threat-hunt`** + **`/log-analyze`** — Blue Team core (Family K). Pairs with `/cso` and `/incident-response`. Closes the F↔K loop.
21. **`/tts-design`** + **`/voice-eval`** — Speech & Voice AI foundation. Anchors expressive-voice work for every downstream product (Family L).
22. **`/indoor-nav`** — Hall's PhD area gets formalized into a reproducible skill (Family O).
23. **`/sign-text`** + **`/sign-linguistics`** — bidirectional text↔sign pipeline + linguistic resources, for TSL + future sign languages (Family O).

### Wave 3 — Force multipliers (~4 weeks)

Higher-touch but compounding. Multi-skill groupings ship together because the skills only work as a stack.

24. **`/board-deck`** + **`/pricing-experiment`** + **`/customer-interview`** (CEO depth)
25. **`/buy-vs-build`** + **`/hiring-loop`** (CTO depth)
26. **`/incident-response`** + **`/vendor-risk`** + **`/threat-model-evolve`** (CISO depth)
27. **`/iac-review`** + **`/migration-plan`** (Chief Architect depth)
28. **`/mobile-qa`** + **`/mobile-release`** + **`/aso`** (Mobile depth)
29. **`/db-perf`** + **`/event-design`** + **`/api-contract-test`** (API/DB depth)
30. **`/multi-repo-refactor`** + **`/monorepo-graph`** (Multi-repo)
31. **`/exploit-dev`** + **`/reverse-engineer`** + **`/purple-exercise`** (Red Team depth)
32. **`/finetune`** + **`/paper-pipeline`** + **`/prompt-engineering`** (AI Research depth)
33. **`/agent-ux-review`** + **`/mental-model-trace`** + **`/explanation-design`** (Cognitive Computing / HMC)
34. **`/simulate`** + **`/incentive-design`** + **`/behavioral-experiment`** (Operations Research / Behavioral)
35. **`/siem-tune`** + **`/honeypot`** + **`/soar-playbook`** + **`/threat-intel`** (Blue Team depth)
36. **`/voice-clone`** + **`/prosody-control`** (Speech depth — multilingual + expressive)
37. **`/accessibility-audit`** + **`/multi-sign`** (Accessibility AI depth)
38. **`/avatar-design`** + **`/lip-sync`** + **`/gesture-synth`** + **`/expression-synth`** + **`/avatar-sign`** (full Avatar & Embodiment stack — Hall's mixed track)
39. **`/strategy-design`** + **`/backtest`** + **`/risk-engine`** (FinTech / Algo Trading core)
40. **`/econ-sim`** + **`/event-stream`** (Economic Simulation foundation)

### Wave 4 — Depth + specialization (~ongoing)

41. **`/vendor-score`** + **`/team-velocity`** + **`/kpi-dashboard`** (executive depth)
42. **`/security-training`** (CISO depth)
43. **`/dep-graph`** + **`/service-catalog`** (Chief Architect depth)
44. **`/mobile-perf`** (Mobile depth)
45. **`/k8s-design`** + **`/service-mesh`** + **`/observability`** + **`/sre-slo`** + **`/chaos`** (Cloud-Native — all)
46. **`/cross-repo-pr`** + **`/workspace-sync`** + **`/shared-lib-bump`** (Multi-repo depth)
47. **`/redteam-c2`** + **`/bug-bounty-triage`** (Red Team depth — strict auth gates)
48. **`/collaboration-pattern`** + **`/cognitive-load-audit`** (HMC depth)
49. **`/game-theory-analysis`** (OR depth — competitive moves + negotiation prep)
50. **`/forensics`** (Blue Team DFIR — used reactively post-incident)
51. **`/paper-trade`** + **`/strategy-eval`** (FinTech depth — live-realistic execution + regime-aware eval)
52. **`/counterfactual`** + **`/sim-calibrate`** (Economic Sim depth — policy analysis + historical fit)

---

## Research & Development Pipeline (the unifying workflow)

**The single composition that drives all of Hall's research/dev/publish work.** Whether you have source code, a research paper, a live product, an app, or just an idea, the pipeline is the same. Outputs branch into POC, academic paper / journal article, or product — without rebuilding the stack.

```
INPUT (any source)              STUDY + RESEARCH               DEVELOP + VALIDATE              OUTPUT
─────────────────────           ──────────────────              ──────────────────              ───────────────────
source code (--mode code)  ──┐                                                                  ┌──→ /paper-pipeline
research paper (--mode paper)├──→ /blueprint  ──→ /transpose ──→ /clone-and-twist  ──┐         │      (paper / journal /
live product (--mode product)│                        │            (Family J)         │         │       conference / arXiv)
mobile app   (--mode app)    │                        ↓                                │         │
SaaS / SDK   (--mode api)  ──┘                  NEW IDEAS                              │         │
                                                (transposition is where                │         │
                                                 novelty enters)                       │         │
                                                        ↓                              │         │
                                                  /eval-harness                        │         │
                                                  + domain eval                        ├──→ /recipe
                                                    (/voice-eval,                      │      (paper supplement /
                                                     /strategy-eval,                   │       blog post draft /
                                                     /sim-calibrate,                   │       onboarding deck /
                                                     /fidelity-eval,                   │       reproducibility bundle)
                                                     etc.)                             │
                                                        ↓                              │
                                                  /autobuild +                         │
                                                  /verify-loop  ────────────────────────┤
                                                                                        │
                                                                                        │
                                                                                        └──→ /ship → product launch
                                                                                              + /document-release
                                                                                              + /canary
```

### Three concrete instantiations of this pipeline

**A. POC + paper from a research paper (Hall's supertonic-v3 pattern):**
`/blueprint --mode paper` (study the paper) → `/transpose` (figure out what you'll do differently) → `/clone-and-twist` (build fine-tuning code) → `/eval-harness --domain speech-tts` + `/voice-eval` (validate fidelity) → `/recipe --for paper` (supplementary material) → `/paper-pipeline` (full paper with ablation tables).

**B. Product from competitor study (the fingerspelling.xyz → TSL pattern):**
`/blueprint --mode product` (study the live product) → `/transpose` (TSL-specific transposition with proprietary slots) → `/clone-and-twist` (build the TSL app) → `/eval-harness` + `/auto-ux-audit` (validate it works) → `/recipe --for blog` (launch post) → `/ship` (deploy product).

**C. New idea from existing internal code (Hall's "I have source code, want to come up with new ideas"):**
`/blueprint --mode code` (study your own old code) → `/transpose` (apply to a new domain — same mechanism, new problem) → optional `/office-hours` (frame the new product) → `/clone-and-twist` (build the new POC) → branches to either `/paper-pipeline` (publish) or `/ship` (launch).

### Why this matters

The pipeline is **input-source-agnostic, output-target-agnostic, and framework-agnostic**. The same v3 skills cover:
- POC for personal experimentation
- Academic paper for top-venue submission
- Journal article for slower / more rigorous publication
- New product launch
- Internal idea pitch to investors / hires
- Teaching material for onboarding

You don't pick a different pipeline per output goal; you pick a different `/recipe --for {paper,blog,onboarding,replay}` mode at the end.

---

## Cross-family integrations (the breadth-first moves)

These are the connective skills that exploit Hall's multi-domain stance. They aren't standalone — they wire two families together for compound leverage.

| Integration | Bridges | Payoff |
|---|---|---|
| `/recon` → `/cso` → `/compliance-audit` | F + C | Offensive findings auto-map to SOC 2 / HIPAA gaps and drive remediation. |
| `/eval-harness` → `/biases-audit` → `/agent-ux-review` | G + I + H | AI quality, persuasion-vs-manipulation check, and interaction polish in one gate. |
| `/incentive-design` → `/pricing-experiment` → `/behavioral-experiment` | I + A | Pricing decisions backed by mechanism design + power-calc'd experiments. |
| `/threat-model-evolve` → `/purple-exercise` → `/game-theory-analysis` | C + F + I | STRIDE → adversary simulation → adversary's rational response model. |
| `/simulate` → `/sre-slo` → `/cost-optimize` | I + E3 + D | Capacity simulation drives error-budget definition drives rightsizing. |
| `/reverse-engineer` → `/paper-pipeline` | F + G | RE findings get the research-grade write-up they deserve. |
| `/mental-model-trace` → `/explanation-design` → `/biases-audit` | H + I | User mental models, the explanations that shape them, and the biases those explanations risk exploiting — closed loop. |
| `/blueprint` → `/transpose` → `/clone-and-twist` → `/recipe` → `/paper-pipeline` | J + G | Full research-to-publication loop: study → bridge → build → document → publish. The supertonic-v3 pattern end-to-end. |
| `/blueprint --mode product` → `/competitor-profiling` → `/transpose` → `/clone-and-twist` | J + B | Competitive product transposition: study a competitor's mechanism, frame the strategic positioning, transpose to your domain. Hall's fingerspelling.xyz → TSL pattern. |
| `/blueprint --mode paper` → `/eval-harness` → `/clone-and-twist` → `/recipe --for paper` | J + G | Paper-replication-with-a-twist: study the paper, set up evals that prove mechanism preservation, build the twist, write the supplementary recipe. Standard AI-research workflow. |
| `/blueprint --mode code` → `/dep-graph` → `/transpose` → `/migration-plan` → `/clone-and-twist` | J + D | OSS-pattern-to-internal-system: study an OSS reference implementation, map its dependency graph, plan the transposition to your stack, execute as a migration. |
| `/recon` → `/threat-intel` → `/detect-engineering` → `/purple-exercise` → `/siem-tune` | F + K | The full **red→blue→purple loop**: offensive recon surfaces TTPs, intel enriches them, detection rules land, red-team validates the rules fire, SIEM tuning removes false positives. Closes the security-symmetry loop. |
| `/threat-model-evolve` → `/detect-engineering` → `/honeypot` | C + K | STRIDE-identified threats automatically generate detection-rule candidates AND deception placements at the trust boundary. Threat model becomes operational, not just documented. |
| `/log-analyze` → `/forensics` → `/postmortem` → `/detect-engineering` | K + C + K | Incident-response forensic loop: triage logs → forensic deep-dive → blameless postmortem → land a detection rule so the same class of incident is caught next time. |
| `/vendor-risk` → `/threat-intel` → `/honeypot` | C + K | Third-party vendor risk gets paired with vendor-specific threat intel AND deception placements that fire if a vendor's perimeter is breached and leveraged against you. |
| `/tts-design` → `/voice-clone` → `/prosody-control` → `/lip-sync` → `/avatar-design` | L + P | Hall's voice-AI goal end-to-end: pick TTS stack, clone target voice, design expression control, sync to a face, embody in a full avatar. |
| `/sign-linguistics` → `/sign-text` → `/avatar-sign` | O + P | Sign-performing-avatar pipeline: linguistic resources → translation → animation. Native-deaf reviewer loop is the gate. |
| `/indoor-nav` → `/accessibility-audit` → `/agent-ux-review` | O + H | Indoor-nav app gets WCAG + AT-experience audit + agent-UX review for any AI assistance layer. Hall's PhD work productionized end-to-end. |
| `/strategy-design` → `/backtest` → `/risk-engine` → `/paper-trade` → `/strategy-eval` | Q full pipeline | Algorithmic trading from edge hypothesis to live-realistic eval. Each stage gates the next. |
| `/event-stream` → `/econ-sim` → `/counterfactual` → `/sim-calibrate` | R full pipeline | Real-time event-aware economic simulation that can be calibrated and asked "what if". |
| `/econ-sim` → `/strategy-design` → `/backtest` | R + Q | Trade strategies *against your own simulated economy* — proves the strategy against regime shifts the historical record never produced. Hall's two AI tracks (FinTech + EconSim) collide here. |
| `/blueprint --mode paper` → `/tts-design` → `/finetune --domain speech-tts` → `/voice-eval` | J + L + G | Standard speech-research pipeline: read a paper, transpose to your TTS stack, fine-tune, eval. The supertonic-v3 path generalized. |
| `/blueprint --mode product` → `/transpose` → `/avatar-design` → `/avatar-sign` | J + P + O | The fingerspelling.xyz → TSL avatar path: study the pedagogy product, transpose to TSL, embody in a sign-performing avatar. End-to-end Hall's two flagship transposition cases. |
| `/recon` → `/strategy-design` → `/backtest` | F + Q | Adversarial market intelligence: use red-team-grade recon to find market-microstructure edges other traders missed (authorized data sources only). |

---

## Shared infrastructure

These cross-cutting pieces unblock multiple skills. Build before / alongside Wave 1.

### S1 — Hall-mode preamble resolver
`scripts/resolvers/hall-context.ts` — injects "Hall is the founder; he wears N hats; assume founder-mode constraints (cost, leverage, no team)" into every Family A/B/C/D skill. Mirrors `preamble.ts` pattern.

### S2 — Connector secrets layer
`~/.gstack/config.yaml` gets a `connectors:` section (Stripe, HubSpot, AWS, GCP, Azure, GitHub, Linear, Slack). Skills declare `requires: [stripe, aws]`. Setup prompts only for what's needed. Keys live in OS keychain, not the yaml.

### S3 — Persona registry (Hall + project personas)
Today `discover-personas` is per-project. Extend with Hall's own role personas (`hall-ceo`, `hall-cto`, `hall-ciso`, `hall-ca`, `hall-eng`). Each skill declares which Hall persona it operates as → preamble adjusts.

### S4 — Decision Record store
`docs/decisions/{adr,vendors,buy-vs-build,migrations}/` standard. Both `/adr` and downstream skills read/write here. Cross-referenced from `intel.jsonl`.

### S5 — Cloud read-only credential profile
Single `~/.aws/credentials` profile `hstack-readonly` (and equivalents for GCP/Azure). Used by `/cost-optimize`, `/iac-review`, `/vendor-risk`, `/k8s-design`. One-time setup, every cloud-touching skill reuses.

### S6 — Anomaly + trend utility
`lib/anomaly-detect.ts` — used by `/kpi-dashboard`, `/team-velocity`, `/cost-optimize`, `/mobile-perf`. Z-score + simple seasonality.

### S7 — `/intel` schema v2
Today `intel.jsonl` is freeform. Add a typed schema for cross-skill consumption: `event_type`, `actor_skill`, `subject` (file/service/vendor/customer), `severity`, `payload`. Lets `/tech-debt-register`, `/threat-model-evolve`, `/team-velocity` consume each others' outputs.

### S8 — Engagement-scope gate (`scope.yaml`)
Family F skills require an `engagements/{slug}/scope.yaml` file declaring **client, ROE (rules of engagement), target list (CIDRs / domains / binaries / app IDs), authorized techniques, duration, contacts**. Skills load this file, verify the target is in scope, and **append every action to `audit.log`** (timestamped, scoped, signed with a per-engagement key). No `scope.yaml` → skill refuses. Out-of-scope target → skill refuses + logs the attempt.

### S9 — Eval-store schema
`evals/baselines/` becomes a typed store consumed by `/eval-harness`, `/rag-design`, `/agent-design`, `/finetune`, `/prompt-engineering`. Schema: `task_id`, `model`, `dataset_hash`, `metric`, `value`, `ci`, `run_id`, `ts`. Cross-skill comparison ("is the new agent better than the old RAG?") becomes a SELECT.

### S10 — Decision math primitives
`lib/decision-math/` — shared utilities: power calc, sample size, CI, Bayesian update, simple MIP wrapper, equilibrium solver, sensitivity tornado. Used by `/optimize-decision`, `/simulate`, `/behavioral-experiment`, `/game-theory-analysis`, `/pricing-experiment`, `/runway`.

### S11 — Authorization log
Every Family F skill action and every cross-cloud mutation (Family D) writes to `~/.gstack/projects/{slug}/audit.log` with `who, what, scope, signature`. Hash-chained for tamper-evidence. Surfaces via `/cso` audit.

### S12 — Study artifact format
Family J skills share a canonical artifact layout under `studies/{target-slug}/`: `BLUEPRINT.md`, `TRANSPOSITION.md`, `BUILD-LOG.md`, `FIDELITY-EVAL.md`, `evidence/`, `notes/`, `questions.md`, `citations.md`. Every artifact is YAML-front-mattered with `target`, `mode`, `version`, `derived_from` so cross-skill consumption is typed (e.g., `/recipe` reads `derived_from` to chain back to the original blueprint). Recipes themselves get a sibling `recipes/{project-slug}/` layout with `INGREDIENTS.md`, `STEPS.md`, `TECHNIQUES.md`, `PLATING.md`. Shared parser in `lib/study-artifacts.ts`.

### S13 — Mechanism-fidelity test contract
Family J's mechanism-preservation tests (output of `/clone-and-twist`) write to a shared `evals/fidelity/{study-slug}.jsonl` consumed by `/eval-harness`. Each entry: `mechanism_property`, `source_evidence` (page/file:line in original), `target_test_id`, `pass_threshold`, `current_value`. Lets `/recipe --for paper` cite which mechanism properties were preserved with measured fidelity.

### S14 — Security-ownership gate (`security-ownership.yaml`)
Family K skills operate on systems Hall owns or has IR authorization on. Project-level file `~/.gstack/projects/{slug}/security-ownership.yaml` declares: **owned systems, log sources (cloud trail / EDR / SIEM endpoints), SIEM platform, deception-allowed paths, IR authority** (who can authorize what). Skills load this file, verify the target system is in scope, and refuse to operate on out-of-scope systems. Mirrors Family F's `scope.yaml` but for defensive operations on your own infrastructure. Hash-chained into the same `audit.log` as Family F.

### S15 — IoC schema (cross-family)
Shared `intel/iocs.jsonl` typed store consumed by `/threat-intel` (writer), `/detect-engineering` (rule input), `/threat-hunt` (hypothesis input), `/log-analyze` (pivot input), `/forensics` (extraction output), `/honeypot` (trigger evidence), and Family F's `/recon` (offensive correlation). Schema: `ioc_type` (IP/domain/hash/email/cert/yara/sigma), `value`, `confidence`, `tags` (ATT&CK techniques, campaign names), `sightings[]`, `first_seen`, `last_seen`, `relevant_to` (which parts of Hall's stack). Cross-family IoC consumption is what makes the F↔K loop coherent.

---

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| 45 skills is a lot; quality slips | Wave-gated. Each wave must pass its own gate-tier E2E tests before next wave starts. |
| Connector keys leak in commits | Keychain-only storage. Skills never echo a key. Gate test: grep transcripts for known token prefixes. |
| Compliance / IR skills give wrong answer | Each compliance framework gets a static control YAML reviewed by Hall once; the skill cites the control, doesn't invent it. |
| Cloud-cost / IaC skills make destructive change | Default mode is read-only / dry-run / suggest-only. Mutations require explicit `--apply` and AskUserQuestion confirmation. |
| Mobile skills bloat the repo (`fastlane`, sims) | Mobile family lives in `mobile/` subtree; not installed unless the host project is mobile. |
| Multi-repo skills crash on partial-permission GH tokens | Pre-flight: each skill checks scopes against the operation it'll perform; aborts clearly. |
| Skill drift from upstream gstack | hstack-only families live in their own directories; upstream merges never touch them. Already proven through v1.27.1.1 and v1.39.1.1 merges. |
| Family F (red team) misuse | Hard scope gate via `scope.yaml`. No skill runs without it. Out-of-scope targets refused + logged. `/redteam-c2` has the strictest gate — client name, ROE doc, duration, contacts all required. Audit log hash-chained. |
| Family I (`/incentive-design`, `/biases-audit`) used for dark patterns | Skills explicitly call out manipulation risk. `/biases-audit` is positioned as the *defensive* twin to `marketing-psychology` and is recommended on every incentive/UX/pricing design output. Documentation emphasizes ethical mechanism design over coercion. |
| AI eval skills (G) produce reassuring but wrong baselines | `/eval-harness` requires Hall to declare the **failure mode being protected against**, not just an accuracy number. Baselines store both the metric and the failure-mode hypothesis. |
| Cognitive load skills (H) become opinionated UX dogma | Family H skills cite primary sources (Sweller, Miller, Doshi-Velez, Suchman) and present principles as *tradeoffs*, not rules. They surface tension, don't enforce style. |
| Family J slides from *constructive* RE into derivative-work territory | `/blueprint` refuses to study material behind auth (without ownership declaration), never extracts verbatim text/code/images, always produces a domain-agnostic spec (not a 1:1 clone). `/clone-and-twist` *requires* a TRANSPOSITION.md with a non-trivial domain shift and at least one proprietary slot — refuses to operate on a study that would produce a literal clone. Output cites every mechanism back to its source for legal review if ever challenged. |
| Family J recipes (`/recipe`) leak proprietary IP via the published recipe | `/recipe --for paper` and `--for blog` modes default to `--exclude proprietary` which redacts marked sections. Hall opts in per section if he wants to publish a slot's contents. Replay mode (`--for replay`) defaults to a private bundle, not committed to a public repo unless flagged. |
| Family K skills operate on systems Hall doesn't own | Hard ownership gate via `security-ownership.yaml` (S14). No Family K skill runs without ownership declaration. Out-of-scope targets refused + logged to `audit.log`. `/forensics` is read-only on evidence — mutations only in working-copy. `/honeypot` deployment requires explicit cloud-account + IAM scope declaration. |
| Family K detection rules tuned for one environment break on others | `/detect-engineering` outputs are environment-tagged (cloud / SIEM / language stack) and tested against `/threat-hunt` hypotheses before landing. `/siem-tune` requires before+after metric capture so rule changes are reversible. Rules ship to a `detections/staging/` directory and promote to `detections/production/` only after a `/purple-exercise` validates them. |

---

## Open questions for Wave 1 kickoff

These need answers before the first skill ships, not now. Tracking here so they don't get lost.

- **Which framework does Hall hit first with `/compliance-audit`?** (SOC 2 is the default guess; HIPAA if any current customer is healthcare-adjacent.)
- **Which mobile stack is current?** (RN / Flutter / native — affects `/mobile-build` scaffolding.)
- **Which cloud is primary?** (AWS / GCP / Azure / multi — affects `/cost-optimize` and `/iac-review`.)
- **Stripe is assumed for `/investor-update` + `/runway`** — confirm or swap.
- **Which DB engines must `/db-design` and `/db-perf` support at GA?** (Postgres + SQLite minimum; MySQL if any existing project.)
- **Is there an existing `decisions/` or `docs/adr/` convention?** If so, `/adr` adopts it.
- **Family F authorization defaults:** Are these skills for Hall's own CTFs / research / personal red-team practice only, or also for client engagements? Default for v3 is **personal + CTF first**; client-engagement mode lands in Wave 4 with stricter audit.
- **Which AI/ML stack does Hall use primarily?** PyTorch / JAX / HuggingFace Transformers / vLLM / SGLang — affects `/finetune` and `/eval-harness` scaffolding.
- **Behavioral-science evidence bar:** does Hall want skills citing primary literature (heavier output, defensible) or shortened-form references (faster output, requires trust)?
- **Family J first targets to validate the skill on:** supertonic-v3 (already in testing — perfect for retroactive `/recipe`) and fingerspelling.xyz → TSL (perfect for forward `/blueprint → /transpose → /clone-and-twist`). Any third target you'd run on day one?
- **`/recipe` audience defaults:** which `--for` mode is the most common for Hall — paper, blog, onboarding, or replay? That mode gets the most polish at v1.

---

## What this roadmap is *not*

- **Not a competitive feature list.** None of these copy a Codex / Cursor / Cline feature. They're built for Hall's specific multi-hat operating model.
- **Not a v2-replacement.** v2's autonomous-loop work (verify, intel, watchers) keeps running. v3 sits on top.
- **Not all 45 skills are equally important.** Wave 4 may never ship if Wave 1-3 stabilize the operating model first.
- **Not a deadline.** No promised dates. Quality of each skill ≫ quantity shipped. Wave-gated cadence prevents quality drift.
