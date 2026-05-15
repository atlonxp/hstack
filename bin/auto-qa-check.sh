#!/usr/bin/env bash
# auto-qa-check.sh — Post-push QA trigger (hstack /auto-guard hook)
#
# Purpose: After a push completes, kick off a lightweight /qa-only run on the
# affected areas. This is ASYNC — it never blocks the developer's next action.
# Result is written to ~/.gstack/projects/{slug}/auto-guard.log and to a
# per-run report under .gstack/qa-reports/.
#
# Why async: a full QA pass can take 30-90s. Blocking on it after every push
# trains developers to disable the hook. Instead we fire-and-forget and the
# developer reads the result when they're ready.
#
# How it runs:
#   - The hook spawns this script with nohup + disown
#   - We re-exec ourselves into the background if invoked synchronously
#   - We write a marker file so the developer can find the latest run
#
# Exit codes (only meaningful in synchronous mode):
#   0 — launched (or skipped); never blocks
#   2 — internal error; we still don't block

set -euo pipefail

# ---------- configuration ----------
QA_TIMEOUT_SECONDS="${GSTACK_AUTOGUARD_QA_TIMEOUT:-120}"
SKIP_IF_NO_BROWSE="${GSTACK_AUTOGUARD_QA_REQUIRE_BROWSE:-1}"

SLUG="$(basename "$(git rev-parse --show-toplevel 2>/dev/null || echo default)")"
LOG_DIR="${HOME}/.gstack/projects/${SLUG}"
LOG_FILE="${LOG_DIR}/auto-guard.log"
MARKER_FILE="${LOG_DIR}/auto-qa-latest.txt"
mkdir -p "$LOG_DIR" 2>/dev/null || true

log() {
  printf '[%s] auto-qa-check: %s\n' "$(date +%Y-%m-%dT%H:%M:%S)" "$*" >> "$LOG_FILE" 2>/dev/null || true
}

# ---------- precondition checks ----------
if [ "${GSTACK_AUTOGUARD_OFF:-0}" = "1" ]; then
  log "GSTACK_AUTOGUARD_OFF=1 - skip"
  exit 0
fi

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  log "not a git repo - skip"
  exit 0
fi

# Detect what changed since the previous push. Best-effort.
#   - Use the upstream ref if available
#   - Fall back to last commit
BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo unknown)"
UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>/dev/null || echo "")"

if [ -n "$UPSTREAM" ]; then
  RANGE="${UPSTREAM}..HEAD"
else
  RANGE="HEAD~1..HEAD"
fi

CHANGED_FILES="$(git diff --name-only "$RANGE" 2>/dev/null || true)"

# ---------- async re-exec ----------
# If invoked in foreground (no AUTO_QA_BG flag), fork ourselves to background
# and exit 0 immediately so git push returns control to the developer.
if [ "${AUTO_QA_BG:-0}" != "1" ]; then
  log "scheduling background QA for branch=$BRANCH range=$RANGE"
  AUTO_QA_BG=1 nohup "$0" "$@" </dev/null >>"$LOG_FILE" 2>&1 &
  disown 2>/dev/null || true
  printf '[auto-guard] QA scheduled in background. Tail: %s\n' "$LOG_FILE" >&2
  exit 0
fi

# ---------- background body ----------
log "background QA started (pid=$$)"

# Locate the browse binary if available. We don't strictly need it for the
# trigger, but the user-facing /qa skill does — surface the missing dep early.
BROWSE_BIN=""
if command -v browse >/dev/null 2>&1; then
  BROWSE_BIN="$(command -v browse)"
elif [ -x "${HOME}/.claude/skills/gstack/browse/dist/browse" ]; then
  BROWSE_BIN="${HOME}/.claude/skills/gstack/browse/dist/browse"
fi

if [ -z "$BROWSE_BIN" ] && [ "$SKIP_IF_NO_BROWSE" = "1" ]; then
  log "browse binary not found - skip (set GSTACK_AUTOGUARD_QA_REQUIRE_BROWSE=0 to run anyway)"
  printf 'skipped: browse binary not found at %s\n' "$(date)" > "$MARKER_FILE" 2>/dev/null || true
  exit 0
fi

# Detect target URL from common dev-server conventions.
# Order: env var, .gstack/qa-target, CLAUDE.md hint, fallback.
TARGET_URL="${GSTACK_QA_URL:-}"
if [ -z "$TARGET_URL" ] && [ -f ".gstack/qa-target" ]; then
  TARGET_URL="$(head -1 .gstack/qa-target 2>/dev/null || echo "")"
fi
if [ -z "$TARGET_URL" ] && [ -f "CLAUDE.md" ]; then
  TARGET_URL="$(grep -oE 'http://localhost:[0-9]+' CLAUDE.md 2>/dev/null | head -1 || echo "")"
fi

if [ -z "$TARGET_URL" ]; then
  log "no QA target URL - skip (set GSTACK_QA_URL or .gstack/qa-target)"
  printf 'skipped: no target URL at %s\n' "$(date)" > "$MARKER_FILE" 2>/dev/null || true
  exit 0
fi

REPORT_DIR=".gstack/qa-reports"
mkdir -p "$REPORT_DIR" 2>/dev/null || true
STAMP="$(date +%Y%m%d-%H%M%S)"
REPORT_FILE="${REPORT_DIR}/auto-qa-${STAMP}.md"

# Lightweight smoke test via browse: load page, capture screenshot, check status.
# A full /qa run requires Claude — this script only does the safe automated part.
log "running smoke QA against $TARGET_URL"

(
  # Self-timeout: kill our own work if it exceeds QA_TIMEOUT_SECONDS.
  (
    sleep "$QA_TIMEOUT_SECONDS"
    kill -TERM "$$" 2>/dev/null || true
  ) &
  WATCHDOG=$!

  trap 'kill $WATCHDOG 2>/dev/null || true' EXIT
  trap 'log "QA budget exceeded - aborting"; exit 0' TERM

  {
    printf '# Auto-QA smoke report\n\n'
    printf '- **Date:** %s\n' "$(date)"
    printf '- **Branch:** %s\n' "$BRANCH"
    printf '- **Range:** %s\n' "$RANGE"
    printf '- **Target:** %s\n\n' "$TARGET_URL"
    printf '## Changed files\n\n'
    if [ -n "$CHANGED_FILES" ]; then
      printf '```\n%s\n```\n\n' "$CHANGED_FILES"
    else
      printf '_None detected._\n\n'
    fi
    printf '## Smoke test\n\n'

    if [ -n "$BROWSE_BIN" ]; then
      # Use browse goto + a short screenshot. browse returns non-zero on
      # navigation failure; we capture it without crashing the script.
      if "$BROWSE_BIN" goto "$TARGET_URL" >/tmp/auto-qa-goto.log 2>&1; then
        printf -- '- goto: PASS\n'
      else
        printf -- '- goto: FAIL\n'
        printf '\n```\n'
        head -50 /tmp/auto-qa-goto.log 2>/dev/null || true
        printf '\n```\n'
      fi
      rm -f /tmp/auto-qa-goto.log
    else
      printf -- '- skipped (no browse binary)\n'
    fi

    printf '\n## Next steps\n\n'
    printf 'For a full QA run with bug discovery + repro steps, invoke `/qa-only` interactively.\n'
  } > "$REPORT_FILE"
) || true

log "QA smoke complete: $REPORT_FILE"
printf '%s\n' "$REPORT_FILE" > "$MARKER_FILE" 2>/dev/null || true

exit 0
