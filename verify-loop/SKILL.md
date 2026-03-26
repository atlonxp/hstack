---
name: verify-loop
preamble-tier: 2
version: 1.0.0
description: |
  Self-healing verification loop. Runs /investigate-workflow logic on built features,
  auto-fixes BROKEN items, presents INCOMPLETE items to user, re-verifies up to 3
  iterations, and detects regressions (fix breaks something new -> STOP).
  Two entry points: automatic via /autobuild Phase 2.5, or standalone via /verify-loop.
  Use when asked to "verify the build", "check completeness", "verify-loop",
  "self-heal", or "fix what's broken".
  Proactively suggest after /autobuild or after a large implementation session.
benefits-from: [autobuild, investigate-workflow]
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
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
echo '{"skill":"verify-loop","ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","repo":"'$(basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || echo "unknown")'"}'  >> ~/.gstack/analytics/skill-usage.jsonl 2>/dev/null || true
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

## Intelligence Logging

When this skill produces findings (security issues, broken workflows, code quality
problems, missing coverage, etc.), log each significant finding to the project
intelligence file. This builds cross-session memory that `/context` reads.

**When to log:** After producing any finding with a severity level (BROKEN, INCOMPLETE,
MISSING, ORPHANED, FRAGILE, CRITICAL, HIGH, MEDIUM) or a significant discovery.

**How to log:** Run in the background (never block the user):

```bash
~/.claude/skills/gstack/bin/gstack-intel-append '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"verify-loop","event":"finding","severity":"SEVERITY","area":"AREA","file":"FILE_PATH","commit":"'$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")'"}' &
```

Replace SEVERITY, AREA (short label like "auth", "billing", "api"), and FILE_PATH
with actual values. Only log findings with concrete file references — skip vague
observations without evidence.

**Do not log:** informational messages, successful checks with no findings, or
findings below MEDIUM severity. Keep the signal-to-noise ratio high.

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

## Prerequisite Skill Offer

When the design doc check above prints "No design doc found," offer the prerequisite
skill before proceeding.

Say to the user via AskUserQuestion:

> "No design doc found for this branch. `/autobuild` or `/investigate-workflow` produces a structured problem
> statement, premise challenge, and explored alternatives — it gives this review much
> sharper input to work with. Takes about 10 minutes. The design doc is per-feature,
> not per-product — it captures the thinking behind this specific change."

Options:
- A) Run /autobuild now (we'll pick up the review right after)
- B) Skip — proceed with standard review

If they skip: "No worries — standard review. If you ever want sharper input, try
/autobuild first next time." Then proceed normally. Do not re-offer later in the session.

If they choose A:

Say: "Running /autobuild inline. Once the design doc is ready, I'll pick up
the review right where we left off."

Read the autobuild skill file from disk using the Read tool:
`~/.claude/skills/gstack/autobuild/SKILL.md`

Follow it inline, **skipping these sections** (already handled by the parent skill):
- Preamble (run first)
- AskUserQuestion Format
- Completeness Principle — Boil the Lake
- Search Before Building
- Contributor Mode
- Completion Status Protocol
- Telemetry (run last)

If the Read fails (file not found), say:
"Could not load /autobuild — proceeding with standard review."

After /autobuild completes, re-run the design doc check:
```bash
SLUG=$(~/.claude/skills/gstack/browse/bin/remote-slug 2>/dev/null || basename "$(git rev-parse --show-toplevel 2>/dev/null || pwd)")
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null | tr '/' '-' || echo 'no-branch')
DESIGN=$(ls -t ~/.gstack/projects/$SLUG/*-$BRANCH-design-*.md 2>/dev/null | head -1)
[ -z "$DESIGN" ] && DESIGN=$(ls -t ~/.gstack/projects/$SLUG/*-design-*.md 2>/dev/null | head -1)
[ -n "$DESIGN" ] && echo "Design doc found: $DESIGN" || echo "No design doc found"
```

If a design doc is now found, read it and continue the review.
If none was produced (user may have cancelled), proceed with standard review.

# /verify-loop — Self-Healing Verification Loop

Built something? Let's make sure every path works — and fix what doesn't.

/verify-loop runs /investigate-workflow logic on your build, auto-fixes BROKEN items,
presents INCOMPLETE items for your decision, then re-verifies. Max 3 iterations.
If a fix introduces a regression (new finding not in the original set), it stops
immediately and reports the regression.

---

## Phase 0: Scope Detection

### Step 1: Determine scope

```bash
eval "$(~/.claude/skills/gstack/bin/gstack-slug 2>/dev/null)" && mkdir -p ~/.gstack/projects/$SLUG
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
echo "Branch: $BRANCH"
```

Determine what to verify:

1. If invoked from /autobuild Phase 2.5: scope is already set — use the files from
   the build session. Run `git diff --stat HEAD~N` where N is the number of commits
   from this build session (check git log for commits by the current session).

2. If invoked standalone: detect scope from recent changes.
   ```bash
   git diff --stat HEAD~5
   git log --oneline -10
   ```
   Use AskUserQuestion if the scope is ambiguous: "Which area should I verify?
   A) All recent changes ([N] files)
   B) Specific directory — tell me which
   C) Specific feature — describe it"

### Step 2: Collect target files

```bash
git diff --name-only HEAD~N | head -50
```

These files define the blast radius for investigation. Only trace workflows that
touch these files — do not investigate the entire codebase.

---

## Phase 1: Initial Investigation

Run the /investigate-workflow logic on the scoped files. For each file in scope:

1. **Trace entry points** — find routes, handlers, API endpoints, event listeners
   that touch the changed files
2. **Follow code paths** — trace from entry to outcome, reading each file in the chain
3. **Check completeness** — happy path, error paths, edge cases
4. **Categorize findings** using the severity levels:
   - **BROKEN** — wired but produces wrong results, crashes, or silently fails
   - **INCOMPLETE** — starts but doesn't finish (empty handler, TODO function, missing save)
   - **MISSING** — expected path doesn't exist at all
   - **ORPHANED** — code exists but nothing triggers it
   - **FRAGILE** — works now but will break easily

### Snapshot findings

After investigation, record the complete findings list. This snapshot is used for
regression detection in later iterations.

```
FINDINGS SNAPSHOT (Iteration 0)
================================
BROKEN:
  1. [description] — [file:line]
  2. ...
INCOMPLETE:
  1. [description] — [file:line]
  2. ...
MISSING: ...
ORPHANED: ...
FRAGILE: ...
================================
Total: [N] findings
```

---

## Phase 2: Fix Loop (max 3 iterations)

### For each iteration (1 through 3):

#### Step 2A: Auto-fix BROKEN items only

BROKEN items are definitively wrong — auto-fix them without asking. For each BROKEN finding:

1. Read the file at the reported location
2. Understand the intended behavior from surrounding code and the workflow trace
3. Write the minimal fix — no refactoring, no gold plating
4. Run relevant tests if the project has them

Report each fix:
```
FIX #[N]: [description]
  File: [file:line]
  Change: [what was changed and why]
  Tests: [pass/fail or "no tests"]
```

#### Step 2B: Present INCOMPLETE items to user

INCOMPLETE items may be intentional (deferred scope). Present them via AskUserQuestion:

```
## Verification: INCOMPLETE Items Found

[N] items appear incomplete — they may be intentional deferrals or genuine gaps.

[For each INCOMPLETE item:]
[N]. [description] — [file:line]
    Impact: [what the user experiences]

RECOMMENDATION: Review these — some may be intentional. Choose A to fix all.

A) Fix all INCOMPLETE items
B) Fix specific items — tell me which numbers
C) Skip all — these are intentional deferrals
```

If the user chooses to fix some/all, apply fixes the same way as BROKEN items.

#### Step 2C: Re-investigate (regression detection)

After fixes are applied, re-run the investigation on the same scope.

**Regression detection algorithm:**
1. Compare new findings against the Iteration 0 snapshot
2. A finding is NEW if it was not present in any previous snapshot
3. If ANY new finding appears that was not in the original set:

```
REGRESSION DETECTED — STOPPING
================================
Fix for: [which BROKEN item was being fixed]
Caused:  [new finding description] — [file:line]
================================
The fix introduced a new problem. Reverting the last fix and stopping.
Review manually.
```

**STOP the loop immediately.** Revert the last fix (`git checkout -- [file]`).
Present the regression to the user. Do not attempt to fix the regression.

#### Step 2D: Check if done

If re-investigation finds:
- Zero BROKEN items remaining → exit the loop (success)
- Same or fewer findings → continue to next iteration
- New findings → STOP (regression, handled in Step 2C)

If iteration 3 completes and BROKEN items remain:

```
VERIFICATION CAPPED — 3 iterations reached
==========================================
Remaining BROKEN: [N]
[List each with file:line]
==========================================
These need manual attention. The loop auto-fixed [M] items across 3 iterations.
```

---

## Phase 3: Verification Report

Present the final report:

```
VERIFY-LOOP REPORT
════════════════════════════════════════════════════════════════
Scope:           [N] files from [branch] build session
Iterations:      [N] of 3
════════════════════════════════════════════════════════════════

AUTO-FIXED ([N] items)
──────────────────────
[For each fix:]
  [N]. [description] — [file:line]

USER-DEFERRED ([N] items)
─────────────────────────
[INCOMPLETE items the user chose to skip]

REMAINING ([N] items)
─────────────────────
[Any BROKEN/INCOMPLETE items still open after 3 iterations]

INFORMATIONAL
─────────────
[MISSING, ORPHANED, FRAGILE items — reported but not auto-fixed]

════════════════════════════════════════════════════════════════
VERDICT: [CLEAN | FIXED | NEEDS_ATTENTION | REGRESSION_DETECTED]
════════════════════════════════════════════════════════════════
```

Verdict logic:
- **CLEAN** — zero findings from the start. Everything works.
- **FIXED** — all BROKEN items resolved, no regressions.
- **NEEDS_ATTENTION** — BROKEN items remain after 3 iterations.
- **REGRESSION_DETECTED** — a fix caused a new problem. Manual review needed.

---

## Important Rules

- **BROKEN only for auto-fix.** Never auto-fix INCOMPLETE, MISSING, ORPHANED, or FRAGILE.
  INCOMPLETE items may be intentional. Present them to the user.
- **Max 3 iterations.** Not configurable. Prevents infinite loops.
- **Regression = STOP.** If a fix introduces a new finding, stop immediately. Do not
  try to fix the regression — that's a human decision.
- **Scope to build session files.** Only investigate files changed in the build session.
  Do not expand scope to the entire codebase.
- **Minimal fixes.** Fix the specific issue. No refactoring, no cleanup, no improvements.
- **Evidence for every finding.** Every finding must have a file:line reference.
- **Snapshot before fixing.** Always record the findings snapshot before applying fixes.
  This is the baseline for regression detection.
