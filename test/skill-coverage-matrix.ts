/**
 * Skill coverage matrix (v1.45.0.0 T1, cathedral Phase 0).
 *
 * Single source of truth mapping each gstack skill to its E2E test files.
 * The CI gate at test/skill-coverage-matrix.test.ts fails if a skill has
 * no gate-tier entry, ensuring the eval-first foundation holds: every
 * skill has at least one CI-blocking check that asserts must-have
 * behavior.
 *
 * Two tiers per entry:
 *   gate     CI-blocking, runs on every PR, target <$0.50/test or free.
 *   periodic Weekly cron, deeper coverage, can cost ~$1-$3/test.
 *
 * The 'floor' entry refers to test/skill-coverage-floor.test.ts —
 * a structural-compliance smoke test that covers every skill with
 * file-IO checks (free, no LLM cost). When a skill has only 'floor'
 * coverage, that's the eval-first minimum; future work can layer
 * behavioral checks on top.
 */

export interface SkillCoverage {
  /** Gate-tier test file paths (relative to repo root). At least one required per skill. */
  gate: string[];
  /** Periodic-tier test file paths. Optional but recommended. */
  periodic: string[];
  /** Brief note on why this coverage is the right shape for this skill. */
  rationale?: string;
}

/**
 * Per-skill coverage. Keys MUST match the top-level skill directory name.
 * The CI test asserts every skill in the repo has an entry here AND that
 * gate[] is non-empty.
 *
 * Adding a new skill: add an entry here AND either reference an existing
 * test that covers it OR add 'test/skill-coverage-floor.test.ts' as the
 * minimum gate-tier check.
 */
export const SKILL_COVERAGE: Record<string, SkillCoverage> = {
  // ─── Core loop ──────────────────────────────────────────────
  ship: {
    gate: ['test/skill-e2e-ship-idempotency.test.ts', 'test/skill-coverage-floor.test.ts'],
    periodic: ['test/skill-e2e-workflow.test.ts'],
  },
  review: {
    gate: ['test/skill-e2e-review.test.ts', 'test/skill-coverage-floor.test.ts'],
    periodic: ['test/skill-e2e-review-army.test.ts', 'test/regression-1539-review-self-verify.test.ts'],
  },
  qa: {
    gate: ['test/skill-e2e-qa-workflow.test.ts', 'test/skill-coverage-floor.test.ts'],
    periodic: ['test/skill-e2e-qa-bugs.test.ts'],
  },
  'qa-only': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'qa-only is qa with --report-only; behavior tested via /qa coverage.',
  },
  investigate: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
  },
  browse: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'browse binary has its own integration suite under browse/test/.',
  },
  spec: {
    gate: [
      'test/spec-template-invariants.test.ts',
      'test/spec-template-sync.test.ts',
      'test/skill-coverage-floor.test.ts',
    ],
    periodic: [
      'test/skill-e2e-spec-execute.test.ts',
      'test/skill-llm-eval-spec.test.ts',
    ],
    rationale: '37 deterministic invariants pin Phase 1/3 gating, --execute race/security hardening, quality-gate redaction, archive contract, plan-mode-aware Phase 5. Periodic adds full PTY pipeline + LLM-judge.',
  },

  // ─── Plan triad ─────────────────────────────────────────────
  'plan-ceo-review': {
    gate: [
      'test/skill-e2e-plan-ceo-finding-floor.test.ts',
      'test/skill-e2e-plan-ceo-plan-mode.test.ts',
      'test/skill-coverage-floor.test.ts',
    ],
    periodic: [
      'test/skill-e2e-plan-ceo-finding-count.test.ts',
      'test/skill-e2e-plan-ceo-mode-routing.test.ts',
    ],
  },
  'plan-eng-review': {
    gate: [
      'test/skill-e2e-plan-eng-finding-floor.test.ts',
      'test/skill-e2e-plan-eng-plan-mode.test.ts',
      'test/skill-coverage-floor.test.ts',
    ],
    periodic: [
      'test/skill-e2e-plan-eng-finding-count.test.ts',
      'test/skill-e2e-plan-eng-multi-finding-batching.test.ts',
    ],
  },
  'plan-design-review': {
    gate: [
      'test/skill-e2e-plan-design-finding-floor.test.ts',
      'test/skill-e2e-plan-design-plan-mode.test.ts',
      'test/skill-e2e-plan-design-with-ui.test.ts',
      'test/skill-coverage-floor.test.ts',
    ],
    periodic: ['test/skill-e2e-plan-design-finding-count.test.ts'],
  },
  'plan-devex-review': {
    gate: [
      'test/skill-e2e-plan-devex-finding-floor.test.ts',
      'test/skill-e2e-plan-devex-plan-mode.test.ts',
      'test/skill-coverage-floor.test.ts',
    ],
    periodic: ['test/skill-e2e-plan-devex-finding-count.test.ts'],
  },
  autoplan: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: ['test/skill-e2e-autoplan-chain.test.ts', 'test/skill-e2e-autoplan-dual-voice.test.ts'],
  },
  'office-hours': {
    gate: ['test/skill-e2e-office-hours.test.ts', 'test/skill-coverage-floor.test.ts'],
    periodic: ['test/skill-e2e-office-hours-auto-mode.test.ts', 'test/skill-e2e-office-hours-phase4.test.ts'],
  },

  // ─── Polish + design ────────────────────────────────────────
  'design-review': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'design-consultation': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'design-shotgun': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'design-html': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  cso: {
    gate: ['test/skill-e2e-cso.test.ts', 'test/cso-preserved.test.ts', 'test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'cso-preserved.test.ts pins must-not-strip security guidance phrases.',
  },
  'document-release': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'document-generate': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },

  // ─── Ops + integrations ─────────────────────────────────────
  'land-and-deploy': { gate: ['test/skill-e2e-deploy.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },
  canary: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  benchmark: { gate: ['test/skill-e2e-benchmark-providers.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },
  'benchmark-models': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  codex: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  retro: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: ['test/regression-1624-retro-stale-base.test.ts'],
  },
  'gstack-upgrade': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'context-save': { gate: ['test/skill-e2e-context-skills.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },
  'context-restore': { gate: ['test/skill-e2e-context-skills.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },
  'setup-deploy': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'setup-browser-cookies': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'setup-gbrain': {
    gate: [
      'test/skill-e2e-setup-gbrain-bad-token.test.ts',
      'test/skill-e2e-setup-gbrain-path4-local-pglite.test.ts',
      'test/skill-e2e-setup-gbrain-remote.test.ts',
      'test/skill-coverage-floor.test.ts',
    ],
    periodic: [],
  },
  'sync-gbrain': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: ['test/regression-1611-gbrain-sync-resume.test.ts'],
  },
  'open-gstack-browser': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'pair-agent': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  scrape: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  skillify: { gate: ['test/skill-e2e-skillify.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },
  learn: { gate: ['test/skill-e2e-learnings.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },
  'plan-tune': { gate: ['test/skill-e2e-plan-tune.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: [] },

  // ─── iOS family ─────────────────────────────────────────────
  'ios-qa': { gate: ['test/skill-e2e-ios.test.ts', 'test/skill-coverage-floor.test.ts'], periodic: ['test/skill-e2e-ios-device.test.ts', 'test/skill-e2e-ios-swift-build.test.ts'] },
  'ios-fix': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'ios-clean': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'ios-sync': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'ios-design-review': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },

  // ─── Safety / housekeeping ──────────────────────────────────
  careful: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  freeze: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  unfreeze: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  guard: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'landing-report': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  health: { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'make-pdf': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },
  'devex-review': { gate: ['test/skill-coverage-floor.test.ts'], periodic: [] },

  // ─── hstack-added skills (v1.55.0.1 merge: floor coverage) ──────────
  'accessibility-audit': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  adr: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'agent-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'agent-ux-review': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'api-contract-test': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'api-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  aso: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'auto-feature-build': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'auto-feature-build-full': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'auto-guard': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'auto-ux-audit': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'auto-ux-audit-full': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  autoaudit: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  autobuild: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'autoplan-full': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'avatar-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'avatar-sign': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  backtest: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'behavioral-experiment': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'biases-audit': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  blueprint: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'board-deck': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'bug-bounty-triage': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'buy-vs-build': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'c4-diagram': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  chaos: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'check-ci': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'check-deps': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'check-issues': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'clone-and-twist': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'cognitive-load-audit': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'collaboration-pattern': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'compliance-audit': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'cost-optimize': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  counterfactual: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'cross-repo-pr': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'customer-interview': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  dashboard: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'db-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'db-migration': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'db-perf': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'define-workflows': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'dep-graph': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'detect-engineering': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  discover: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'discover-personas': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'econ-sim': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'eval-harness': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'event-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'event-stream': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'explanation-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'exploit-dev': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'expression-synth': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'feature-build': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  finetune: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  forensics: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'game-theory-analysis': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'gap-analysis': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'gesture-synth': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'hiring-loop': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  honeypot: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'iac-review': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'incentive-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'incident-response': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'indoor-nav': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  intel: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'interactive-mockup': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'investigate-workflow': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'investor-update': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'k8s-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'kpi-dashboard': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'lip-sync': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'log-analyze': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'mental-model-trace': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'migration-plan': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'mobile-build': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'mobile-perf': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'mobile-qa': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'mobile-release': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  mockup: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'monorepo-graph': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'multi-repo-refactor': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'multi-sign': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  observability: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'optimize-decision': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'paper-pipeline': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'paper-trade': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'plan-ux-review': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  postmortem: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'pricing-experiment': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'product-ci': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'prompt-engineering': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'prosody-control': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'purple-exercise': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'rag-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  recipe: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  recon: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'redteam-c2': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'reverse-engineer': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'risk-engine': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  runway: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'security-training': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'service-catalog': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'service-mesh': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'shared-lib-bump': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'siem-tune': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'sign-linguistics': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'sign-text': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'sim-calibrate': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  simulate: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'soar-playbook': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'sre-slo': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'strategy-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'strategy-eval': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'team-velocity': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'tech-debt-register': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'threat-hunt': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'threat-intel': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'threat-model-evolve': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  transpose: {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'tts-design': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'ux-audit': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'ux-pipeline': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'ux-workflows': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'vendor-risk': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'vendor-score': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'verify-loop': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'voice-clone': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'voice-eval': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
  'workspace-sync': {
    gate: ['test/skill-coverage-floor.test.ts'],
    periodic: [],
    rationale: 'Structural floor coverage; hstack-added skill (v1.55.0.1 merge rebaseline).',
  },
};
