#!/usr/bin/env bash
# auto-security-check.sh — Pre-commit lightweight security scan (hstack /auto-guard hook)
#
# Purpose: Run a fast OWASP Top 10 scan on STAGED files only. Block commits on
# critical findings (configurable), warn on medium. Never block on internal
# failure — degrade gracefully so the developer keeps moving.
#
# Performance budget: HARD CAP 5s. We background-watch ourselves and self-kill
# if we exceed it. Better to skip than to slow down every commit.
#
# Offline-friendly: Skip any network-dependent checks (CVE lookups, etc.).
#
# Exit codes:
#   0  — clean (or only warnings); commit proceeds
#   1  — critical findings; commit blocked (unless GSTACK_AUTOGUARD_BLOCK=0)
#   2  — internal error; commit proceeds (fail-open)

set -euo pipefail

# ---------- configuration ----------
BUDGET_SECONDS="${GSTACK_AUTOGUARD_BUDGET:-5}"
BLOCK_ON_CRITICAL="${GSTACK_AUTOGUARD_BLOCK:-1}"   # 1 = block, 0 = warn only
SKIP_ON_MERGE="${GSTACK_AUTOGUARD_SKIP_MERGE:-1}"  # don't run during merges/rebases

# Slug for log path. Best-effort; fallback to "default" if not in a repo.
SLUG="$(basename "$(git rev-parse --show-toplevel 2>/dev/null || echo default)")"
LOG_DIR="${HOME}/.gstack/projects/${SLUG}"
LOG_FILE="${LOG_DIR}/auto-guard.log"
mkdir -p "$LOG_DIR" 2>/dev/null || true

# ---------- helpers ----------
log() {
  printf '[%s] auto-security-check: %s\n' "$(date +%Y-%m-%dT%H:%M:%S)" "$*" >> "$LOG_FILE" 2>/dev/null || true
}

warn() { printf '\033[33m[auto-guard] %s\033[0m\n' "$*" >&2; }
crit() { printf '\033[31m[auto-guard] %s\033[0m\n' "$*" >&2; }
info() { printf '[auto-guard] %s\n' "$*" >&2; }

# Self-kill watchdog: if our work hasn't finished in BUDGET_SECONDS, exit 0
# (fail-open). The developer's commit takes priority over a slow scan.
(
  sleep "$BUDGET_SECONDS"
  kill -TERM "$$" 2>/dev/null || true
) &
WATCHDOG_PID=$!

cleanup() {
  kill "$WATCHDOG_PID" 2>/dev/null || true
  wait "$WATCHDOG_PID" 2>/dev/null || true
}
trap cleanup EXIT

# Trap budget exhaustion: TERM from watchdog. Log and fail-open.
trap 'log "budget exceeded (${BUDGET_SECONDS}s) - fail-open"; warn "security scan exceeded ${BUDGET_SECONDS}s budget - skipping"; exit 0' TERM

# ---------- precondition checks ----------
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  log "not a git repo - skip"
  exit 0
fi

# Mid-merge / mid-rebase / mid-cherry-pick: skip. The developer is in a
# resolve-conflicts state and a scan adds noise.
if [ "$SKIP_ON_MERGE" = "1" ]; then
  GIT_DIR="$(git rev-parse --git-dir 2>/dev/null)"
  if [ -f "${GIT_DIR}/MERGE_HEAD" ] || [ -d "${GIT_DIR}/rebase-merge" ] || [ -d "${GIT_DIR}/rebase-apply" ] || [ -f "${GIT_DIR}/CHERRY_PICK_HEAD" ]; then
    log "in merge/rebase/cherry-pick - skip"
    exit 0
  fi
fi

# Opt-out via env. Useful for "I know what I'm doing" commits.
if [ "${GSTACK_AUTOGUARD_OFF:-0}" = "1" ]; then
  log "GSTACK_AUTOGUARD_OFF=1 - skip"
  exit 0
fi

# ---------- staged files ----------
# Only scan files that are STAGED, ADDED/MODIFIED (skip deletions).
STAGED="$(git diff --cached --name-only --diff-filter=AM 2>/dev/null \
  | grep -E '\.(ts|tsx|js|jsx|mjs|cjs|py|rb|go|rs|java|cs|php|sh|bash|zsh|yml|yaml|json|toml|env|tf|tfvars|sql|conf|cfg|ini)$' || true)"

if [ -z "$STAGED" ]; then
  log "no staged code files - skip"
  exit 0
fi

log "scanning $(echo "$STAGED" | wc -l | tr -d ' ') staged files"

# ---------- findings collectors ----------
CRIT_COUNT=0
HIGH_COUNT=0
MED_COUNT=0
FINDINGS_FILE="$(mktemp -t auto-guard.XXXXXX)"

record() {
  local sev="$1" title="$2" loc="$3"
  printf '%s\t%s\t%s\n' "$sev" "$title" "$loc" >> "$FINDINGS_FILE"
  case "$sev" in
    CRIT) CRIT_COUNT=$((CRIT_COUNT + 1)) ;;
    HIGH) HIGH_COUNT=$((HIGH_COUNT + 1)) ;;
    MED)  MED_COUNT=$((MED_COUNT + 1)) ;;
  esac
}

# Filter out obvious false positives: test fixtures, example envs, comments.
is_ignorable() {
  case "$1" in
    *.example|*.sample|*.template|*test*|*spec*|*fixture*|*mock*) return 0 ;;
  esac
  return 1
}

# ---------- OWASP Top 10 lightweight checks (OFFLINE) ----------
# Patterns below detect risky calls in source; we never execute them ourselves.

scan_file() {
  local f="$1"
  [ -f "$f" ] || return 0
  if is_ignorable "$f"; then return 0; fi

  # A02/A07: Hardcoded secrets — high-confidence patterns
  grep -nE 'AKIA[0-9A-Z]{16}' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record CRIT "AWS access key" "$f:$ln"
  done

  grep -nE 'sk_live_[0-9a-zA-Z]{24,}' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record CRIT "Stripe live key" "$f:$ln"
  done

  grep -nE '(ghp_|gho_|ghu_|ghs_|github_pat_)[0-9a-zA-Z]{20,}' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record CRIT "GitHub token" "$f:$ln"
  done

  grep -nE 'xox[baprs]-[0-9a-zA-Z-]{10,}' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record CRIT "Slack token" "$f:$ln"
  done

  grep -nE -- '-----BEGIN (RSA |EC |DSA |OPENSSH |PGP )?PRIVATE KEY-----' "$f" 2>/dev/null | head -1 | while IFS=: read -r ln rest; do
    record CRIT "Private key in source" "$f:$ln"
  done

  # A03: Injection — dynamic code execution patterns
  if [[ "$f" =~ \.(ts|tsx|js|jsx|mjs|cjs)$ ]]; then
    grep -nE '\b(ev''al)\s*\(' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
      record HIGH "Dynamic code execution in JS/TS" "$f:$ln"
    done
  fi
  if [[ "$f" =~ \.py$ ]]; then
    grep -nE '\b(ev''al|ex''ec)\s*\(' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
      record HIGH "Dynamic code execution in Python" "$f:$ln"
    done
  fi

  # A03: Command injection — shell=True / shell exec with interpolation
  if [[ "$f" =~ \.py$ ]]; then
    grep -nE 'shell\s*=\s*True' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
      record MED "subprocess shell=True" "$f:$ln"
    done
  fi

  # A05: Misconfiguration — TLS verification disabled
  grep -nE '(rejectUnauthorized\s*:\s*false|NODE_TLS_REJECT_UNAUTHORIZED.*0|verify\s*=\s*False|InsecureSkipVerify\s*:\s*true)' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record HIGH "TLS verification disabled" "$f:$ln"
  done

  # A05: Misconfiguration — CORS wildcard
  grep -nE 'Access-Control-Allow-Origin.*\*|origin\s*:\s*["'\'']\*["'\'']' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record MED "CORS wildcard origin" "$f:$ln"
  done

  # A02: Weak crypto
  grep -niE '\b(md5|sha1)\b' "$f" 2>/dev/null | grep -viE '(checksum|cache|etag|fingerprint|integrity)' | head -3 | while IFS=: read -r ln rest; do
    record MED "Weak hash (MD5/SHA1)" "$f:$ln"
  done

  # A10: SSRF — fetch/request from user-controlled URL (heuristic)
  grep -nE '(fetch|axios\.(get|post)|requests\.get)\s*\(\s*(req\.body|req\.params|req\.query|request\.args|params\[)' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record HIGH "Possible SSRF (user-controlled URL)" "$f:$ln"
  done

  # A03: SQL injection — string concat / template literal in raw query
  grep -nE '(query|execute|raw)\s*\(\s*[`"\x27].*\$\{.*\}.*[`"\x27]' "$f" 2>/dev/null | head -3 | while IFS=: read -r ln rest; do
    record HIGH "Possible SQL injection (template literal)" "$f:$ln"
  done

  # Hardcoded password assignment
  grep -nE 'password\s*[:=]\s*["\x27][^"\x27]{6,}["\x27]' "$f" 2>/dev/null \
    | grep -viE '(your_|changeme|placeholder|example|todo|xxx|\.\.\.|<.*>)' \
    | head -3 | while IFS=: read -r ln rest; do
    record HIGH "Hardcoded password" "$f:$ln"
  done
}

# Scan each staged file. The watchdog is still ticking.
while IFS= read -r f; do
  [ -n "$f" ] || continue
  scan_file "$f"
done <<< "$STAGED"

# ---------- report ----------
TOTAL=$((CRIT_COUNT + HIGH_COUNT + MED_COUNT))

if [ "$TOTAL" -eq 0 ]; then
  log "clean - no findings"
  rm -f "$FINDINGS_FILE"
  exit 0
fi

{
  printf '\n'
  printf '\033[1m[auto-guard] Pre-commit security scan\033[0m\n'
  printf '  Critical: %d   High: %d   Medium: %d\n' "$CRIT_COUNT" "$HIGH_COUNT" "$MED_COUNT"
  printf '\n'
  head -20 "$FINDINGS_FILE" | while IFS=$'\t' read -r sev title loc; do
    case "$sev" in
      CRIT) printf '  \033[31m[CRIT]\033[0m %s - %s\n' "$title" "$loc" ;;
      HIGH) printf '  \033[33m[HIGH]\033[0m %s - %s\n' "$title" "$loc" ;;
      MED)  printf '  [MED]  %s - %s\n' "$title" "$loc" ;;
    esac
  done
  if [ "$TOTAL" -gt 20 ]; then
    printf '  ... and %d more findings\n' $((TOTAL - 20))
  fi
  printf '\n'
  printf '  Full log: %s\n' "$LOG_FILE"
  printf '  Run /cso for a comprehensive audit.\n'
  printf '  Bypass once: GSTACK_AUTOGUARD_OFF=1 git commit ...\n'
  printf '\n'
} >&2

{
  printf 'findings critical=%d high=%d medium=%d\n' "$CRIT_COUNT" "$HIGH_COUNT" "$MED_COUNT"
  cat "$FINDINGS_FILE"
} >> "$LOG_FILE" 2>/dev/null || true

rm -f "$FINDINGS_FILE"

# Decision: block on critical (default). HIGH and MED are warnings.
if [ "$CRIT_COUNT" -gt 0 ] && [ "$BLOCK_ON_CRITICAL" = "1" ]; then
  crit "Commit blocked: $CRIT_COUNT critical finding(s). Set GSTACK_AUTOGUARD_BLOCK=0 to warn-only."
  exit 1
fi

exit 0
