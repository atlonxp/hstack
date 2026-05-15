# hstack v2 Roadmap — From Reactive Skills to Autonomous Workflows

**Branch:** main
**Date:** 2026-03-27
**Research:** ~/.gstack/projects/hstack/atlonxp-main-research-20260327-021500.md
**Status:** PLANNING

## Vision

Transform hstack from a collection of manually-invoked skills into an autonomous
development platform where skills self-trigger, verify their own work, and learn
from project history. The moat is workflow intelligence, not skill count.

## Problem Statement

hstack has 35+ skills but they all require manual invocation. Developers forget to
run /cso before committing, don't verify builds with /investigate-workflow, and lose
context between sessions. Meanwhile competitors (Codex CLI, Everything-CC) are shipping
self-healing loops, background automations, and cross-session learning.

The gap: hstack has the richest skill library → but the poorest orchestration layer.

---

## Feature 1: Auto-Trigger Security + QA (Priority #7)

**Effort:** ~1hr CC | **Impact:** Quick win — make /cso automatic

### What
Hook hstack skills into git events using Claude Code hooks:
- Pre-commit: lightweight /cso scan on staged files
- Post-push: /qa-only on affected areas
- Pre-PR: /review on the diff

### How
Use Claude Code's `settings.json` hooks system:
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{
          "type": "command",
          "command": "bash ~/.claude/skills/hstack/bin/auto-security-check.sh",
          "statusMessage": "Running security scan..."
        }]
      }
    ]
  }
}
```

Create `bin/auto-security-check.sh` that:
1. Detects if this is a git commit operation
2. Runs a lightweight /cso scan (OWASP Top 10 only, skip STRIDE)
3. Reports critical findings, warns on medium
4. Blocks commit only for critical (configurable)

### Files to Create/Modify
- `bin/auto-security-check.sh` — the hook script
- `bin/auto-qa-check.sh` — post-push QA trigger
- Example `settings.json` snippet for user setup
- `/setup` — add hook installation step
- Documentation in SKILL.md for `/careful` or new `/auto-guard` skill

### Edge Cases
- Hook must be fast (<5s) or developers disable it
- Must work offline (skip network-dependent checks)
- Must not double-run if user manually invoked /cso
- Must handle monorepos (scope scan to changed files)

---

## Feature 2: Spec-Driven Development Flow (Priority #4)

**Effort:** ~1hr CC | **Impact:** Formalize /autoplan output

### What
Make /autoplan-full produce three structured files instead of one monolithic plan:
- `REQUIREMENTS.md` — user stories + acceptance criteria (EARS format, like Kiro)
- `DESIGN.md` — architecture, data flow, component design
- `TASKS.md` — checkboxed implementation steps with dependencies

### How
Modify `/autoplan-full` output phase to split the plan into three files.
`/autobuild` reads `TASKS.md` and checks off items as it implements them.
Status tracking: each task has `[ ]` (pending), `[x]` (done), `[!]` (blocked).

### Files to Create/Modify
- `autoplan-full/SKILL.md.tmpl` — modify output section
- `autobuild/SKILL.md.tmpl` — read TASKS.md, check off items
- Template files for REQUIREMENTS.md, DESIGN.md, TASKS.md format
- `scripts/gen-skill-docs.ts` — if new template vars needed

### Edge Cases
- Backward compatibility: existing single-file plans still work
- TASKS.md ordering: dependencies must be respected
- What if a task is partially done? Need `[~]` state?
- Cross-feature dependencies between tasks

---

## Feature 3: Self-Healing Verification Loop (Priority #1)

**Effort:** ~2hr CC | **Impact:** Highest — closes the 66% productivity tax gap

### What
New `/verify-loop` skill that runs after `/autobuild`:
1. Run `/investigate-workflow` on the built feature
2. If BROKEN or INCOMPLETE items found → fix them
3. Re-run investigation
4. Repeat until clean or max 3 iterations
5. Optionally run `/qa` for browser-based verification

### How
Create `verify-loop/SKILL.md.tmpl` that:
- Reads the plan file or TASKS.md to know what was built
- Invokes `/investigate-workflow` logic (code path tracing)
- For each finding: auto-fix if severity is BROKEN/INCOMPLETE
- Re-verify after each fix batch
- Report final completeness score

### Files to Create/Modify
- `verify-loop/SKILL.md.tmpl` — new skill template
- `verify-loop/SKILL.md` — generated
- Update `/autobuild` to suggest `/verify-loop` after completion
- Update `/autoaudit` to include `/verify-loop` in its pipeline

### Edge Cases
- Infinite loop prevention: hard cap at 3 iterations
- Fix introduces new break: must detect regression
- Large codebases: scope to changed files only
- No plan file available: must work with just a feature area description

### Architecture
```
  /autobuild ──→ /verify-loop ──→ /investigate-workflow ──→ findings
                      ↑                                        │
                      │         fix BROKEN items               │
                      └────────────────────────────────────────┘
                      (max 3 iterations)
                      │
                      ↓
                 /qa (optional browser verification)
                      │
                      ↓
                 COMPLETENESS REPORT
```

---

## Feature 4: Multi-Agent Dashboard (Priority #5)

**Effort:** ~3hr CC | **Impact:** Parallel skill visibility

### What
New `/dashboard` skill that launches multiple skills in parallel and shows
live progress in the terminal:
```
  ┌─────────────────────────────────────────────────┐
  │         hstack PARALLEL REVIEW DASHBOARD         │
  ├──────────────┬────────┬─────────┬───────────────┤
  │ Skill        │ Status │ Score   │ Findings      │
  ├──────────────┼────────┼─────────┼───────────────┤
  │ /cso         │ ██████ │ 8/10    │ 2 medium      │
  │ /review      │ ███░░░ │ ...     │ running...    │
  │ /qa-only     │ ░░░░░░ │ ...     │ queued        │
  └──────────────┴────────┴─────────┴───────────────┘
```

### How
Use Claude Code Agent Teams to spawn parallel subagents:
- Each subagent runs one skill
- Main agent polls status and renders progress
- Results collected and merged into a unified report

### Files to Create/Modify
- `dashboard/SKILL.md.tmpl` — new skill template
- `dashboard/SKILL.md` — generated
- Preset configurations: "review" (cso + review + codex), "qa" (qa + design-review), "full" (all)

### Edge Cases
- Agent Teams availability: fall back to sequential if not supported
- Resource limits: max 3 parallel agents (CC limit is 10, but stay conservative)
- Result aggregation: unified scoring across different skill output formats
- Failure handling: one skill crashes, others continue

---

## Feature 5: Persistent Project Intelligence (Priority #3)

**Effort:** ~3hr CC | **Impact:** Cross-session context

### What
A project intelligence layer that accumulates knowledge across sessions:
- What was built, what patterns work, what broke
- Common failure modes for THIS repo
- Which skills are most useful for THIS project
- Historical review scores and trends

### How
Create `~/.gstack/projects/{slug}/intelligence.jsonl` that skills append to:
```json
{"ts":"...","skill":"investigate-workflow","event":"finding","data":{"severity":"BROKEN","area":"auth","pattern":"missing-error-handler"}}
{"ts":"...","skill":"qa","event":"bug","data":{"type":"form-validation","page":"/settings","recurrence":3}}
{"ts":"...","skill":"cso","event":"vulnerability","data":{"type":"sql-injection","file":"api/users.ts","fixed":true}}
```

New `/context` skill that reads this at session start and provides a briefing:
"This repo has recurring auth issues (3 findings in last 5 sessions). The settings
page has had form validation bugs twice. Last /cso found and fixed an SQL injection."

### Files to Create/Modify
- `bin/gstack-intel-append` — CLI to append intelligence entries
- Modify all skills to call `gstack-intel-append` after completing
- `context/SKILL.md.tmpl` — new skill for session start briefing
- `context/SKILL.md` — generated

### Edge Cases
- Data growth: rotate/compact intelligence.jsonl after 1000 entries
- Privacy: intelligence stays local, never sent anywhere
- Stale data: entries older than 90 days get reduced weight
- Multi-branch: intelligence is per-project, not per-branch

---

## Feature 6: Background Watchers (Priority #2)

**Effort:** ~4hr CC | **Impact:** Biggest ceiling — agents working unprompted

### What
Agents that monitor and act without being invoked:
- `/watch-ci` — polls `gh run list`, auto-investigates failures
- `/watch-deps` — monitors dependency vulnerabilities
- `/watch-issues` — triages new GitHub issues
- `/watch-pr` — monitors PR review comments and responds

### How
Use Claude Code's `/loop` skill or custom polling mechanism:
- Each watcher runs on an interval (configurable, default 5-10 min)
- Watchers post findings as GitHub comments or local reports
- Configurable: which watchers are active, polling interval, action level

### Files to Create/Modify
- `watch-ci/SKILL.md.tmpl` — CI failure watcher
- `watch-deps/SKILL.md.tmpl` — dependency vulnerability watcher
- `watch-issues/SKILL.md.tmpl` — issue triage watcher
- `watch-pr/SKILL.md.tmpl` — PR comment responder
- `bin/gstack-watcher` — daemon/polling infrastructure
- Configuration in `~/.gstack/config` for watcher settings

### Architecture
```
  ┌──────────────────────────────────────────────┐
  │              WATCHER DAEMON                   │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
  │  │ watch-ci │  │watch-deps│  │watch-iss │   │
  │  │ (5 min)  │  │ (1 hour) │  │ (10 min) │   │
  │  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
  │       │              │              │         │
  │       ↓              ↓              ↓         │
  │  /investigate   WebSearch     /office-hours   │
  │       │              │              │         │
  │       ↓              ↓              ↓         │
  │  gh pr comment  local report  gh issue comment│
  └──────────────────────────────────────────────┘
```

### Edge Cases
- Rate limits: respect GitHub API limits
- Noise: configurable threshold (only act on critical/high)
- Overlap: don't investigate the same failure twice
- Cost: watchers use tokens — need budget awareness
- Security: watchers should not auto-fix, only report + recommend

---

## Implementation Sequence

```
  Week 1 (Quick Wins):
    #7 Auto-Trigger Security+QA ──→ #4 Spec-Driven Dev Flow

  Week 2 (Core):
    #1 Self-Healing Verification Loop

  Week 3 (Platform):
    #5 Multi-Agent Dashboard ──→ #3 Persistent Project Intelligence

  Week 4 (Advanced):
    #2 Background Watchers
```

## Dependencies

```
  #7 (Auto-Trigger) ← independent
  #4 (Spec-Driven) ← independent
  #1 (Verify Loop) ← depends on /investigate-workflow (already built)
  #5 (Dashboard) ← depends on Agent Teams (native CC feature)
  #3 (Intelligence) ← benefits from #1 (verify loop generates data)
  #2 (Watchers) ← benefits from #3 (intelligence layer for dedup)
```
