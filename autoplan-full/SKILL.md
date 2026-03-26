---
name: autoplan-full
version: 1.0.0
description: |
  Full CTO planning pipeline — from raw idea to fully reviewed implementation plan.
  Runs office-hours → discover → CEO review → UX review → design review → eng review
  sequentially. Interactive in phases 1-2 (framing + research), auto-decided in phases
  3-6 using decision principles. Two gates: framing confirmation and final approval.
  Use when asked to "full plan", "autoplan-full", "plan everything", "plan from scratch",
  "run the full pipeline", or "idea to plan".
  Proactively suggest when the user describes a new product idea or feature from scratch.
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - AskUserQuestion
---
<!-- AUTO-GENERATED from SKILL.md.tmpl — do not edit directly -->
<!-- Regenerate: bun run gen:skill-docs -->

## Preamble (run first)

```bash
_UPD=$(~/.claude/skills/gstack/bin/gstack-update-check 2>/dev/null || .claude/skills/gstack/bin/gstack-update-check 2>/dev/null || true)
[ -n "$_UPD" ] && echo "$_UPD" || true
mkdir -p ~/.gstack/sessions
touch ~/.gstack/sessions/"$PPID"
_SESSIONS=$(find ~/.gstack/sessions -mmin -120 -type f 2>/dev/null | wc -l | tr -d ' ')
find ~/.gstack/sessions -mmin +120 -type f -delete 2>/dev/null || true
_CONTRIB=$(~/.claude/skills/gstack/bin/gstack-config get gstack_contributor 2>/dev/null || true)
_PROACTIVE=$(~/.claude/skills/gstack/bin/gstack-config get proactive 2>/dev/null || echo "true")
_PROACTIVE_PROMPTED=$([ -f ~/.gstack/.proactive-prompted ] && echo "yes" || echo "no")
_BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
echo "BRANCH: $_BRANCH"
echo "PROACTIVE: $_PROACTIVE"
echo "PROACTIVE_PROMPTED: $_PROACTIVE_PROMPTED"
source <(~/.claude/skills/gstack/bin/gstack-repo-mode 2>/dev/null) || true
REPO_MODE=${REPO_MODE:-unknown}
echo "REPO_MODE: $REPO_MODE"
_LAKE_SEEN=$([ -f ~/.gstack/.completeness-intro-seen ] && echo "yes" || echo "no")
echo "LAKE_INTRO: $_LAKE_SEEN"
_TEL=$(~/.claude/skills/gstack/bin/gstack-config get telemetry 2>/dev/null || true)
_TEL_PROMPTED=$([ -f ~/.gstack/.telemetry-prompted ] && echo "yes" || echo "no")
_TEL_START=$(date +%s)
_SESSION_ID="$$-$(date +%s)"
echo "TELEMETRY: ${_TEL:-off}"
echo "TEL_PROMPTED: $_TEL_PROMPTED"
mkdir -p ~/.gstack/analytics
echo '{"skill":"autoplan-full","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","repo":"'$(basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || echo "unknown")'"}'  >> ~/.gstack/analytics/skill-usage.jsonl 2>/dev/null || true
# zsh-compatible: use find instead of glob to avoid NOMATCH error
for _PF in $(find ~/.gstack/analytics -maxdepth 1 -name '.pending-*' 2>/dev/null); do [ -f "$_PF" ] && ~/.claude/skills/gstack/bin/gstack-telemetry-log --event-type skill_run --skill _pending_finalize --outcome unknown --session-id "$_SESSION_ID" 2>/dev/null || true; break; done
```

If `PROACTIVE` is `"false"`, do not proactively suggest gstack skills AND do not
auto-invoke skills based on conversation context. Only run skills the user explicitly
types (e.g., /qa, /ship). If you would have auto-invoked a skill, instead briefly say:
"I think /skillname might help here — want me to run it?" and wait for confirmation.
The user opted out of proactive behavior.

If output shows `UPGRADE_AVAILABLE <old> <new>`: read `~/.claude/skills/gstack/gstack-upgrade/SKILL.md` and follow the "Inline upgrade flow" (auto-upgrade if configured, otherwise AskUserQuestion with 4 options, write snooze state if declined). If `JUST_UPGRADED <from> <to>`: tell user "Running gstack v{to} (just updated!)" and continue.

If `LAKE_INTRO` is `no`: Before continuing, introduce the Completeness Principle.
Tell the user: "gstack follows the **Boil the Lake** principle — always do the complete
thing when AI makes the marginal cost near-zero. Read more: https://garryslist.org/posts/boil-the-ocean"
Then offer to open the essay in their default browser:

```bash
open https://garryslist.org/posts/boil-the-ocean
touch ~/.gstack/.completeness-intro-seen
```

Only run `open` if the user says yes. Always run `touch` to mark as seen. This only happens once.

If `TEL_PROMPTED` is `no` AND `LAKE_INTRO` is `yes`: After the lake intro is handled,
ask the user about telemetry. Use AskUserQuestion:

> Help gstack get better! Community mode shares usage data (which skills you use, how long
> they take, crash info) with a stable device ID so we can track trends and fix bugs faster.
> No code, file paths, or repo names are ever sent.
> Change anytime with `gstack-config set telemetry off`.

Options:
- A) Help gstack get better! (recommended)
- B) No thanks

If A: run `~/.claude/skills/gstack/bin/gstack-config set telemetry community`

If B: ask a follow-up AskUserQuestion:

> How about anonymous mode? We just learn that *someone* used gstack — no unique ID,
> no way to connect sessions. Just a counter that helps us know if anyone's out there.

Options:
- A) Sure, anonymous is fine
- B) No thanks, fully off

If B→A: run `~/.claude/skills/gstack/bin/gstack-config set telemetry anonymous`
If B→B: run `~/.claude/skills/gstack/bin/gstack-config set telemetry off`

Always run:
```bash
touch ~/.gstack/.telemetry-prompted
```

This only happens once. If `TEL_PROMPTED` is `yes`, skip this entirely.

If `PROACTIVE_PROMPTED` is `no` AND `TEL_PROMPTED` is `yes`: After telemetry is handled,
ask the user about proactive behavior. Use AskUserQuestion:

> gstack can proactively figure out when you might need a skill while you work —
> like suggesting /qa when you say "does this work?" or /investigate when you hit
> a bug. We recommend keeping this on — it speeds up every part of your workflow.

Options:
- A) Keep it on (recommended)
- B) Turn it off — I'll type /commands myself

If A: run `~/.claude/skills/gstack/bin/gstack-config set proactive true`
If B: run `~/.claude/skills/gstack/bin/gstack-config set proactive false`

Always run:
```bash
touch ~/.gstack/.proactive-prompted
```

This only happens once. If `PROACTIVE_PROMPTED` is `yes`, skip this entirely.

## AskUserQuestion Format

**ALWAYS follow this structure for every AskUserQuestion call:**
1. **Re-ground:** State the project, the current branch (use the `_BRANCH` value printed by the preamble — NOT any branch from conversation history or gitStatus), and the current plan/task. (1-2 sentences)
2. **Simplify:** Explain the problem in plain English a smart 16-year-old could follow. No raw function names, no internal jargon, no implementation details. Use concrete examples and analogies. Say what it DOES, not what it's called.
3. **Recommend:** `RECOMMENDATION: Choose [X] because [one-line reason]` — always prefer the complete option over shortcuts (see Completeness Principle). Include `Completeness: X/10` for each option. Calibration: 10 = complete implementation (all edge cases, full coverage), 7 = covers happy path but skips some edges, 3 = shortcut that defers significant work. If both options are 8+, pick the higher; if one is ≤5, flag it.
4. **Options:** Lettered options: `A) ... B) ... C) ...` — when an option involves effort, show both scales: `(human: ~X / CC: ~Y)`

Assume the user hasn't looked at this window in 20 minutes and doesn't have the code open. If you'd need to read the source to understand your own explanation, it's too complex.

Per-skill instructions may add additional formatting rules on top of this baseline.

## Completeness Principle — Boil the Lake

AI makes completeness near-free. Always recommend the complete option over shortcuts — the delta is minutes with CC+gstack. A "lake" (100% coverage, all edge cases) is boilable; an "ocean" (full rewrite, multi-quarter migration) is not. Boil lakes, flag oceans.

**Effort reference** — always show both scales:

| Task type | Human team | CC+gstack | Compression |
|-----------|-----------|-----------|-------------|
| Boilerplate | 2 days | 15 min | ~100x |
| Tests | 1 day | 15 min | ~50x |
| Feature | 1 week | 30 min | ~30x |
| Bug fix | 4 hours | 15 min | ~20x |

Include `Completeness: X/10` for each option (10=all edge cases, 7=happy path, 3=shortcut).

## Repo Ownership — See Something, Say Something

`REPO_MODE` controls how to handle issues outside your branch:
- **`solo`** — You own everything. Investigate and offer to fix proactively.
- **`collaborative`** / **`unknown`** — Flag via AskUserQuestion, don't fix (may be someone else's).

Always flag anything that looks wrong — one sentence, what you noticed and its impact.

## Search Before Building

Before building anything unfamiliar, **search first.** See `~/.claude/skills/gstack/ETHOS.md`.
- **Layer 1** (tried and true) — don't reinvent. **Layer 2** (new and popular) — scrutinize. **Layer 3** (first principles) — prize above all.

**Eureka:** When first-principles reasoning contradicts conventional wisdom, name it and log:
```bash
jq -n --arg ts "$(date -u +%Y-%m-%dT%H:%M:%SZ)" --arg skill "SKILL_NAME" --arg branch "$(git branch --show-current 2>/dev/null)" --arg insight "ONE_LINE_SUMMARY" '{ts:$ts,skill:$skill,branch:$branch,insight:$insight}' >> ~/.gstack/analytics/eureka.jsonl 2>/dev/null || true
```

## Contributor Mode

If `_CONTRIB` is `true`: you are in **contributor mode**. At the end of each major workflow step, rate your gstack experience 0-10. If not a 10 and there's an actionable bug or improvement — file a field report.

**File only:** gstack tooling bugs where the input was reasonable but gstack failed. **Skip:** user app bugs, network errors, auth failures on user's site.

**To file:** write `~/.gstack/contributor-logs/{slug}.md`:
```
# {Title}
**What I tried:** {action} | **What happened:** {result} | **Rating:** {0-10}
## Repro
1. {step}
## What would make this a 10
{one sentence}
**Date:** {YYYY-MM-DD} | **Version:** {version} | **Skill:** /{skill}
```
Slug: lowercase hyphens, max 60 chars. Skip if exists. Max 3/session. File inline, don't stop.

## Completion Status Protocol

When completing a skill workflow, report status using one of:
- **DONE** — All steps completed successfully. Evidence provided for each claim.
- **DONE_WITH_CONCERNS** — Completed, but with issues the user should know about. List each concern.
- **BLOCKED** — Cannot proceed. State what is blocking and what was tried.
- **NEEDS_CONTEXT** — Missing information required to continue. State exactly what you need.

### Escalation

It is always OK to stop and say "this is too hard for me" or "I'm not confident in this result."

Bad work is worse than no work. You will not be penalized for escalating.
- If you have attempted a task 3 times without success, STOP and escalate.
- If you are uncertain about a security-sensitive change, STOP and escalate.
- If the scope of work exceeds what you can verify, STOP and escalate.

Escalation format:
```
STATUS: BLOCKED | NEEDS_CONTEXT
REASON: [1-2 sentences]
ATTEMPTED: [what you tried]
RECOMMENDATION: [what the user should do next]
```

## Telemetry (run last)

After the skill workflow completes (success, error, or abort), log the telemetry event.
Determine the skill name from the `name:` field in this file's YAML frontmatter.
Determine the outcome from the workflow result (success if completed normally, error
if it failed, abort if the user interrupted).

**PLAN MODE EXCEPTION — ALWAYS RUN:** This command writes telemetry to
`~/.gstack/analytics/` (user config directory, not project files). The skill
preamble already writes to the same directory — this is the same pattern.
Skipping this command loses session duration and outcome data.

Run this bash:

```bash
_TEL_END=$(date +%s)
_TEL_DUR=$(( _TEL_END - _TEL_START ))
rm -f ~/.gstack/analytics/.pending-"$_SESSION_ID" 2>/dev/null || true
~/.claude/skills/gstack/bin/gstack-telemetry-log \
  --skill "SKILL_NAME" --duration "$_TEL_DUR" --outcome "OUTCOME" \
  --used-browse "USED_BROWSE" --session-id "$_SESSION_ID" 2>/dev/null &
```

Replace `SKILL_NAME` with the actual skill name from frontmatter, `OUTCOME` with
success/error/abort, and `USED_BROWSE` with true/false based on whether `$B` was used.
If you cannot determine the outcome, use "unknown". This runs in the background and
never blocks the user.

## Plan Status Footer

When you are in plan mode and about to call ExitPlanMode:

1. Check if the plan file already has a `## GSTACK REVIEW REPORT` section.
2. If it DOES — skip (a review skill already wrote a richer report).
3. If it does NOT — run this command:

\`\`\`bash
~/.claude/skills/gstack/bin/gstack-review-read
\`\`\`

Then write a `## GSTACK REVIEW REPORT` section to the end of the plan file:

- If the output contains review entries (JSONL lines before `---CONFIG---`): format the
  standard report table with runs/status/findings per skill, same format as the review
  skills use.
- If the output is `NO_REVIEWS` or empty: write this placeholder table:

\`\`\`markdown
## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | \`/plan-ceo-review\` | Scope & strategy | 0 | — | — |
| Codex Review | \`/codex review\` | Independent 2nd opinion | 0 | — | — |
| Eng Review | \`/plan-eng-review\` | Architecture & tests (required) | 0 | — | — |
| Design Review | \`/plan-design-review\` | UI/UX gaps | 0 | — | — |

**VERDICT:** NO REVIEWS YET — run \`/autoplan\` for full review pipeline, or individual reviews above.
\`\`\`

**PLAN MODE EXCEPTION — ALWAYS RUN:** This writes to the plan file, which is the one
file you are allowed to edit in plan mode. The plan file review report is part of the
plan's living status.

## Step 0: Detect platform and base branch

First, detect the git hosting platform from the remote URL:

```bash
git remote get-url origin 2>/dev/null
```

- If the URL contains "github.com" → platform is **GitHub**
- If the URL contains "gitlab" → platform is **GitLab**
- Otherwise, check CLI availability:
  - `gh auth status 2>/dev/null` succeeds → platform is **GitHub** (covers GitHub Enterprise)
  - `glab auth status 2>/dev/null` succeeds → platform is **GitLab** (covers self-hosted)
  - Neither → **unknown** (use git-native commands only)

Determine which branch this PR/MR targets, or the repo's default branch if no
PR/MR exists. Use the result as "the base branch" in all subsequent steps.

**If GitHub:**
1. `gh pr view --json baseRefName -q .baseRefName` — if succeeds, use it
2. `gh repo view --json defaultBranchRef -q .defaultBranchRef.name` — if succeeds, use it

**If GitLab:**
1. `glab mr view -F json 2>/dev/null` and extract the `target_branch` field — if succeeds, use it
2. `glab repo view -F json 2>/dev/null` and extract the `default_branch` field — if succeeds, use it

**Git-native fallback (if unknown platform, or CLI commands fail):**
1. `git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's|refs/remotes/origin/||'`
2. If that fails: `git rev-parse --verify origin/main 2>/dev/null` → use `main`
3. If that fails: `git rev-parse --verify origin/master 2>/dev/null` → use `master`

If all fail, fall back to `main`.

Print the detected base branch name. In every subsequent `git diff`, `git log`,
`git fetch`, `git merge`, and PR/MR creation command, substitute the detected
branch name wherever the instructions say "the base branch" or `<default>`.

---

# /autoplan-full — Full CTO Planning Pipeline

Raw idea in, fully reviewed implementation plan out.

/autoplan-full runs the complete hstack planning pipeline: framing, research, strategy,
UX, design, and engineering review. Phases 1-2 are interactive (you need to describe
your idea and confirm the framing). Phases 3-6 are auto-decided using decision principles.
Two human gates: one after framing, one after all reviews.

---

## The 6 Decision Principles

These rules auto-answer every intermediate question in phases 3-6:

1. **Choose completeness** — Ship the whole thing. Pick the approach that covers more edge cases.
2. **Boil lakes** — Fix everything in the blast radius (files modified by this plan + direct importers). Auto-approve expansions that are in blast radius AND < 1 day CC effort (< 5 files, no new infra).
3. **Pragmatic** — If two options fix the same thing, pick the cleaner one. 5 seconds choosing, not 5 minutes.
4. **DRY** — Duplicates existing functionality? Reject. Reuse what exists.
5. **Explicit over clever** — 10-line obvious fix > 200-line abstraction. Pick what a new contributor reads in 30 seconds.
6. **Bias toward action** — Merge > review cycles > stale deliberation. Flag concerns but don't block.

**Conflict resolution (context-dependent tiebreakers):**
- **CEO phase:** P1 (completeness) + P2 (boil lakes) dominate.
- **UX phase:** P1 (completeness) + P5 (explicit) dominate.
- **Design phase:** P5 (explicit) + P1 (completeness) dominate.
- **Eng phase:** P5 (explicit) + P3 (pragmatic) dominate.

---

## Decision Classification

**Mechanical** — one clearly right answer. Auto-decide silently.

**Taste** — reasonable people could disagree. Auto-decide with recommendation, but surface at the final gate. Three natural sources:
1. **Close approaches** — top two are both viable with different tradeoffs.
2. **Borderline scope** — in blast radius but 3-5 files, or ambiguous radius.
3. **Persona conflicts** — UX review flags a workflow gap that conflicts with eng simplicity.

---

## Phase 0: Intake + Restore Point

### Step 1: Capture restore point

```bash
eval "$(~/.claude/skills/gstack/bin/gstack-slug 2>/dev/null)" && mkdir -p ~/.gstack/projects/$SLUG
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null | tr '/' '-')
DATETIME=$(date +%Y%m%d-%H%M%S)
echo "RESTORE_PATH=$HOME/.gstack/projects/$SLUG/${BRANCH}-autoplan-full-restore-${DATETIME}.md"
```

If a plan file already exists, write its full contents to the restore path with this header:
```
# /autoplan-full Restore Point
Captured: [timestamp] | Branch: [branch] | Commit: [short hash]

## Re-run Instructions
1. Copy "Original Plan State" below back to your plan file
2. Invoke /autoplan-full

## Original Plan State
[verbatim plan file contents]
```

### Step 2: Read context

- Read CLAUDE.md, TODOS.md, git log -30, git diff against the base branch --stat
- Discover existing design docs: `ls -t ~/.gstack/projects/$SLUG/*-design-*.md 2>/dev/null | head -1`
- Discover existing research briefs: `ls -t ~/.gstack/projects/$SLUG/*-research-*.md 2>/dev/null | head -1`

Output: "Starting full planning pipeline. Phase 1 is interactive — tell me about your idea."

---

## Phase 1: Office Hours — Frame the Problem (INTERACTIVE)

Load and follow the office-hours skill:
- Read `~/.claude/skills/hstack/office-hours/SKILL.md`
- Run it INTERACTIVELY — this phase needs user input. Ask the forcing questions.
- Do NOT auto-decide. The user must describe their pain, confirm the reframing,
  and approve the design doc.

**This phase produces:**
- Design doc written to `~/.gstack/projects/$SLUG/`
- Clear problem framing agreed with the user

---

## Phase 2: Discover — Research the Landscape (SEMI-AUTO)

Load and follow the discover skill:
- Read `~/.claude/skills/hstack/discover/SKILL.md`
- Derive the research scope from the design doc produced in Phase 1
- Run competitor scanning, tech scouting, and build-vs-buy analysis
- Auto-decide mechanical choices (which competitors to research, which tech to evaluate)
- Surface major strategic findings to the user

**This phase produces:**
- Research brief written to `~/.gstack/projects/$SLUG/`
- Build-vs-buy recommendations
- Competitor landscape summary

---

### === GATE 1: Confirm Framing + Research ===

**STOP here and present to the user.**

Use AskUserQuestion:

```
## Gate 1: Framing + Research Complete

### Problem Framing
[1-3 sentence summary from office-hours]

### Key Research Findings
- Competitors: [top 3 with key insight]
- Build vs Buy: [recommendation]
- Tech landscape: [key finding]

### Ready for auto-review?
The next 4 phases (CEO → UX → Design → Eng) will run automatically with
auto-decisions. Taste decisions will be collected for your review at the end.
```

Options:
- A) Proceed to auto-review (recommended)
- B) Adjust framing first (go back to Phase 1)
- C) Adjust research scope (go back to Phase 2)
- D) Stop here — I'll run reviews manually

If D: output the design doc + research brief paths and stop. User can run
`/plan-ceo-review`, `/plan-ux-review`, `/plan-design-review`, `/plan-eng-review` manually.

---

## Phase 3: CEO Review — Strategy & Scope (AUTO-DECIDED)

Load and follow the CEO review skill:
- Read `~/.claude/skills/hstack/plan-ceo-review/SKILL.md`
- Follow all sections at full depth
- Override: every AskUserQuestion → auto-decide using the 6 principles

**Section skip list** (already handled by /autoplan-full):
- Preamble, AskUserQuestion Format, Completeness Principle, Search Before Building
- Contributor Mode, Completion Status Protocol, Telemetry
- Step 0: Detect base branch, Review Readiness Dashboard, Plan File Review Report
- Prerequisite Skill Offer (BENEFITS_FROM)

**Override rules:**
- Mode selection: SELECTIVE EXPANSION
- Premises: accept reasonable ones (P6), challenge only clearly wrong ones
- **GATE: Present premises to user for confirmation** — this is the ONE AskUserQuestion
  that is NOT auto-decided in this phase. Premises require human judgment.
- Alternatives: pick highest completeness (P1). If tied, pick simplest (P5).
  If top 2 are close → mark TASTE DECISION.
- Scope expansion: in blast radius + <1d CC → approve (P2). Outside → defer to TODOS.md (P3).

**Required execution checklist (CEO):**

Step 0 (0A-0F) — run each sub-step and produce:
- 0A: Premise challenge with specific premises named and evaluated
- 0B: Existing code leverage map
- 0C: Dream state diagram (CURRENT → THIS PLAN → 12-MONTH IDEAL)
- 0C-bis: Implementation alternatives table
- 0D: Mode-specific analysis with scope decisions logged
- 0E: Temporal interrogation (HOUR 1 → HOUR 6+)
- 0F: Mode selection confirmation

Sections 1-10 — for EACH section, run the evaluation. Sections WITH findings: full
analysis, auto-decide each issue, log to audit trail. Sections with NO findings:
1-2 sentences stating what was examined and why nothing was flagged.

**Mandatory outputs from Phase 3:**
- "NOT in scope" section with deferred items
- "What already exists" section
- Error & Rescue Registry table
- Failure Modes Registry table
- Dream state delta
- Completion Summary

---

## Phase 4: UX Review — Personas & Workflows (AUTO-DECIDED, ALWAYS RUNS)

Load and follow the UX review skill:
- Read `~/.claude/skills/hstack/plan-ux-review/SKILL.md`
- Follow all 7 passes at full depth
- Override: every AskUserQuestion → auto-decide using the 6 principles

**This phase ALWAYS runs** — not conditional on UI scope. Even backend APIs have
personas (admin vs user vs service), permission models, and workflow handoffs.

**Override rules:**
- Persona identification: always map ALL personas, not just the primary user (P1)
- Workflow handoffs: auto-fix if single clear solution (P5), taste decision if ambiguous
- Permission divergence: always flag, never auto-skip (security-adjacent)
- Cross-feature flows: trace all paths, flag gaps (P1)
- Missing error states in workflows: auto-add (P1 + P5)

**UX-specific auto-decision tiebreakers:**
- If UX completeness conflicts with eng simplicity → mark TASTE DECISION
- If persona needs conflict with each other → mark TASTE DECISION
- If workflow gap requires new infrastructure → defer to TODOS.md (P3)

**Mandatory outputs from Phase 4:**
- Persona map (all roles identified with their workflows)
- Workflow handoff diagram
- Permission matrix (who can do what)
- Cross-feature flow map
- UX pass scores (7 dimensions, 0-10 each)

---

## Phase 5: Design Review (AUTO-DECIDED, conditional — skip if no UI scope)

Detect UI scope: grep the plan for view/rendering terms (component, screen, form,
button, modal, layout, dashboard, sidebar, nav, dialog). Require 2+ matches.

If UI scope detected:
- Read `~/.claude/skills/hstack/plan-design-review/SKILL.md`
- Follow all 7 dimensions at full depth
- Override: every AskUserQuestion → auto-decide using the 6 principles

**Override rules:**
- Structural issues (missing states, broken hierarchy): auto-fix (P5)
- Aesthetic/taste issues: mark TASTE DECISION
- Design system alignment: auto-fix if DESIGN.md exists and fix is obvious
- AI slop detection: always flag (P1)

**Mandatory outputs from Phase 5:**
- All 7 dimensions evaluated with scores
- Issues identified and auto-decided

If no UI scope: output "Phase 5 skipped — no UI scope detected (searched for: component,
screen, form, button, modal, layout, dashboard, sidebar, nav, dialog)."

---

## Phase 6: Eng Review — Architecture & Tests (AUTO-DECIDED)

Load and follow the eng review skill:
- Read `~/.claude/skills/hstack/plan-eng-review/SKILL.md`
- Follow all sections at full depth
- Override: every AskUserQuestion → auto-decide using the 6 principles

**Override rules:**
- Scope challenge: never reduce (P2)
- Codex review: always run if available (P6)
  Command: `codex exec "Review this plan for architectural issues, missing edge cases, and hidden complexity. Be adversarial. File: <plan_path>" -s read-only --enable web_search_cached`
  Timeout: 10 minutes, then proceed with "Codex timed out — single-reviewer mode"
- Architecture choices: explicit over clever (P5). If codex disagrees with valid reason → TASTE DECISION.
- Test plan: generate artifact at `~/.gstack/projects/$SLUG/{user}-{branch}-test-plan-{datetime}.md`
- TODOS.md: collect all deferred scope expansions from all phases, auto-write

**Required execution checklist (Eng):**
1. Scope Challenge with actual code analysis
2. Codex review if available
3. Architecture ASCII dependency graph
4. Code quality analysis (DRY violations, naming, complexity)
5. **Test Review — NEVER SKIP.** Read actual code, build test diagram, map coverage gaps.
6. Performance evaluation (N+1 queries, memory, caching)

**Mandatory outputs from Phase 6:**
- Architecture ASCII diagram
- Test diagram mapping codepaths to coverage
- Test plan artifact written to disk
- Failure modes registry with critical gap flags
- Completion Summary
- TODOS.md updates (collected from ALL phases)

---

## Decision Audit Trail

After each auto-decision in phases 3-6, append a row to the plan file using Edit:

```markdown
<!-- AUTONOMOUS DECISION LOG -->
## Decision Audit Trail

| # | Phase | Decision | Principle | Rationale | Rejected |
|---|-------|----------|-----------|-----------|----------|
```

Write one row per decision incrementally (via Edit). This keeps the audit on disk,
not accumulated in conversation context.

---

## Pre-Gate Verification

Before presenting the Final Approval Gate, verify that required outputs were actually
produced. Check the plan file and conversation for each item.

**Phase 1 (Office Hours) outputs:**
- [ ] Design doc written to disk
- [ ] Problem framing confirmed by user

**Phase 2 (Discover) outputs:**
- [ ] Research brief written to disk
- [ ] Build-vs-buy recommendations produced

**Phase 3 (CEO) outputs:**
- [ ] Premise challenge with specific premises named
- [ ] All applicable review sections have findings OR explicit "examined X, nothing flagged"
- [ ] Error & Rescue Registry table
- [ ] Failure Modes Registry table
- [ ] "NOT in scope" section
- [ ] "What already exists" section
- [ ] Dream state delta
- [ ] Completion Summary

**Phase 4 (UX) outputs:**
- [ ] Persona map with all roles
- [ ] Workflow handoff diagram
- [ ] Permission matrix
- [ ] Cross-feature flow map
- [ ] UX pass scores (7 dimensions)

**Phase 5 (Design) outputs — only if UI scope detected:**
- [ ] All 7 dimensions evaluated with scores
- [ ] Issues identified and auto-decided

**Phase 6 (Eng) outputs:**
- [ ] Architecture ASCII diagram
- [ ] Test diagram mapping codepaths to coverage
- [ ] Test plan artifact written to disk
- [ ] "NOT in scope" section
- [ ] Failure modes registry
- [ ] Completion Summary

**Audit trail:**
- [ ] Decision Audit Trail has at least one row per auto-decision

If ANY checkbox is missing, go back and produce it. Max 2 attempts — if still missing,
proceed to the gate with a warning.

---

## Phase 7: Final Approval Gate

**STOP here and present the final state to the user.**

```
## /autoplan-full Review Complete

### Idea → Plan Summary
[2-3 sentence summary of the journey: original idea → reframed problem → researched
landscape → reviewed plan]

### Pipeline Results
- Office Hours: [design doc path]
- Discover: [research brief path]
- CEO Review: [summary + score]
- UX Review: [summary + 7-dimension scores]
- Design Review: [summary or "skipped, no UI scope"]
- Eng Review: [summary + score]
- Codex: [summary or "unavailable"]

### Decisions Made: [N] total ([M] auto-decided, [K] choices for you)

### Your Choices (taste decisions)
[For each taste decision:]
**Choice [N]: [title]** (from [phase])
I recommend [X] — [principle]. But [Y] is also viable:
  [1-sentence downstream impact if you pick Y]

### Auto-Decided: [M] decisions [see Decision Audit Trail in plan file]

### Deferred to TODOS.md
[Items auto-deferred with reasons]

### Next Steps
Plan is ready. Run `/autobuild` to implement, or build manually.
After building, run `/autoaudit` to verify.
```

**Cognitive load management:**
- 0 taste decisions: skip "Your Choices" section
- 1-7 taste decisions: flat list
- 8+: group by phase. Add warning: "This plan had unusually high ambiguity."

AskUserQuestion options:
- A) Approve as-is (accept all recommendations)
- B) Approve with overrides (specify which taste decisions to change)
- C) Interrogate (ask about any specific decision)
- D) Revise (the plan itself needs changes — re-run affected phases, max 3 cycles)
- E) Reject (start over)

---

## Completion: Write Review Logs

On approval, write review log entries so /ship's dashboard recognizes them:

```bash
COMMIT=$(git rev-parse --short HEAD 2>/dev/null)
TIMESTAMP=$(date -u +%Y-%m-%dT%H:%M:%SZ)

~/.claude/skills/hstack/bin/gstack-review-log '{"skill":"plan-ceo-review","timestamp":"'"$TIMESTAMP"'","status":"clean","unresolved":0,"critical_gaps":0,"mode":"SELECTIVE_EXPANSION","via":"autoplan-full","commit":"'"$COMMIT"'"}'

~/.claude/skills/hstack/bin/gstack-review-log '{"skill":"plan-ux-review","timestamp":"'"$TIMESTAMP"'","status":"clean","unresolved":0,"via":"autoplan-full","commit":"'"$COMMIT"'"}'

~/.claude/skills/hstack/bin/gstack-review-log '{"skill":"plan-eng-review","timestamp":"'"$TIMESTAMP"'","status":"clean","unresolved":0,"critical_gaps":0,"issues_found":0,"mode":"FULL_REVIEW","via":"autoplan-full","commit":"'"$COMMIT"'"}'
```

If Phase 5 ran (UI scope):
```bash
~/.claude/skills/hstack/bin/gstack-review-log '{"skill":"plan-design-review","timestamp":"'"$TIMESTAMP"'","status":"clean","unresolved":0,"via":"autoplan-full","commit":"'"$COMMIT"'"}'
```

Suggest next step: `/autobuild` to implement, or build manually.

---

## Important Rules

- **Phases 1-2 are interactive.** Do NOT auto-decide office-hours questions or skip user input.
- **Phases 3-6 are auto-decided.** Follow the 6 principles. Surface taste decisions at the gate.
- **Gate 1 is mandatory.** Never skip from research directly to auto-review without user confirmation.
- **UX review always runs.** Even backend APIs have personas and permission models. This is the hstack differentiator.
- **Full depth means full depth.** Every section from every loaded skill file must be executed at the same depth as the interactive version. The only thing that changes is who answers: you do, using the 6 principles.
- **Log every decision.** No silent auto-decisions. Every choice gets a row in the audit trail.
- **Sequential order.** Office Hours → Discover → CEO → UX → Design → Eng. Each phase builds on the last.
- **Never abort.** The user chose /autoplan-full. Surface all taste decisions, never redirect to interactive review.
