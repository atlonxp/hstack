/**
 * Static validation + fixture parsing tests for the /feature-build skill family.
 *
 * Covers:
 *   - All three tier templates exist + generate valid SKILL.md
 *   - Required frontmatter fields present (name, description)
 *   - Required phase headers present
 *   - Persona registry fixture parses
 *   - Gap report fixture parses (FEATURE rows, completeness rubric)
 *   - Queue file fixture parses + resume logic computes correct next action
 */

import { describe, test, expect } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(import.meta.dir, '..');
const FIX = path.join(ROOT, 'test', 'fixtures', 'feature-build');

const TIERS = [
  { dir: 'feature-build', name: 'feature-build' },
  { dir: 'auto-feature-build', name: 'auto-feature-build' },
  { dir: 'auto-feature-build-full', name: 'auto-feature-build-full' },
] as const;

// ─── Frontmatter parsing ────────────────────────────────────────────

interface Frontmatter {
  name?: string;
  description?: string;
  raw: string;
  body: string;
}

function parseFrontmatter(content: string): Frontmatter {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { raw: '', body: content };
  const raw = match[1];
  const body = match[2];
  const result: Frontmatter = { raw, body };
  // Handle both `name: foo` and multi-line `description: |` blocks
  const nameMatch = raw.match(/^name:\s*(.+)$/m);
  if (nameMatch) result.name = nameMatch[1].trim();
  const descMatch = raw.match(/description:\s*\|\n([\s\S]*?)(?=\n\S|\nallowed-tools:|\nversion:|\nbenefits-from:|\nvoice-triggers:|\npreamble-tier:|$)/);
  if (descMatch) result.description = descMatch[1].trim();
  else {
    const oneLine = raw.match(/^description:\s*(.+)$/m);
    if (oneLine) result.description = oneLine[1].trim();
  }
  return result;
}

// ─── Tier 1: Template existence + frontmatter ──────────────────────

describe('feature-build skill templates exist', () => {
  for (const tier of TIERS) {
    test(`${tier.dir}/SKILL.md.tmpl exists`, () => {
      const tmpl = path.join(ROOT, tier.dir, 'SKILL.md.tmpl');
      expect(fs.existsSync(tmpl)).toBe(true);
    });

    test(`${tier.dir}/SKILL.md.tmpl has frontmatter with name and description`, () => {
      const tmpl = path.join(ROOT, tier.dir, 'SKILL.md.tmpl');
      const content = fs.readFileSync(tmpl, 'utf-8');
      const fm = parseFrontmatter(content);
      expect(fm.name).toBe(tier.name);
      expect(fm.description).toBeDefined();
      expect(fm.description!.length).toBeGreaterThan(20);
    });
  }
});

// ─── Tier 2: Required phase headers ─────────────────────────────────

describe('feature-build Tier 2 template has required phase headers', () => {
  const tmpl = path.join(ROOT, 'auto-feature-build', 'SKILL.md.tmpl');

  const REQUIRED_HEADERS = [
    '## Phase 0',
    '## Phase 1',
    '## Phase 2',
    '## Phase 3',
    '## Phase 4',
    '## Phase 5',
    '## Phase 6',
    '## Phase 7',
    '## Phase 8',
    'GATE 1',
  ];

  for (const h of REQUIRED_HEADERS) {
    test(`contains "${h}"`, () => {
      const content = fs.readFileSync(tmpl, 'utf-8');
      expect(content).toContain(h);
    });
  }
});

describe('feature-build Tier 3 template has cross-persona phases', () => {
  const tmpl = path.join(ROOT, 'auto-feature-build-full', 'SKILL.md.tmpl');

  const REQUIRED = [
    'cross-persona',
    'Phase 3.5',
    'Phase 6.5',
    'dedup',
  ];
  for (const h of REQUIRED) {
    test(`contains "${h}"`, () => {
      const content = fs.readFileSync(tmpl, 'utf-8');
      expect(content.toLowerCase()).toContain(h.toLowerCase());
    });
  }
});

// ─── Tier 3: Placeholders resolve ──────────────────────────────────

describe('feature-build templates reference only known placeholders', () => {
  // Known placeholders from scripts/resolvers/index.ts
  const KNOWN = new Set([
    'PREAMBLE', 'BROWSE_SETUP', 'BASE_BRANCH_DETECT', 'SLUG_SETUP',
    'LEARNINGS_LOG', 'LEARNINGS_SEARCH', 'CONFIDENCE_CALIBRATION',
    'BENEFITS_FROM', 'INTEL_LOGGING', 'DESIGN_METHODOLOGY',
    'DESIGN_HARD_RULES', 'AI_SLOP_BLACKLIST', 'SKILL_DISCOVERY',
    'HOST_PATHS', 'ASK_USER_QUESTION_FORMAT', 'TELEMETRY',
    'COMPLETENESS_PRINCIPLE', 'SEARCH_BEFORE_BUILDING',
    'COMPLETION_STATUS_PROTOCOL', 'OUTSIDE_VOICE',
    'DESIGN_OUTSIDE_VOICES', 'CONTRIBUTOR_MODE',
    'PLAN_FILE_REVIEW_REPORT', 'REVIEW_READINESS_DASHBOARD',
    'PLAN_COMPLETION_AUDIT_SHIP', 'PLAN_COMPLETION_AUDIT_REVIEW',
    'PLAN_VERIFICATION_EXEC',
  ]);

  for (const tier of TIERS) {
    test(`${tier.dir}/SKILL.md.tmpl placeholders are all known`, () => {
      const tmpl = path.join(ROOT, tier.dir, 'SKILL.md.tmpl');
      const content = fs.readFileSync(tmpl, 'utf-8');
      const placeholders = [...content.matchAll(/\{\{([A-Z_]+)\}\}/g)].map(m => m[1]);
      const unknown = placeholders.filter(p => !KNOWN.has(p));
      expect(unknown).toEqual([]);
    });
  }
});

// ─── Fixture: personas.md ──────────────────────────────────────────

describe('persona registry fixture parses', () => {
  const content = fs.readFileSync(path.join(FIX, 'personas.md'), 'utf-8');

  test('contains P1 and P2 entries', () => {
    expect(content).toContain('ID: P1');
    expect(content).toContain('ID: P2');
  });

  test('each persona has Role, Goal, Auth, Entry point, Frequency, Permissions', () => {
    const p1Block = content.match(/ID: P1\n([\s\S]*?)(?=\nID: |$)/);
    expect(p1Block).toBeTruthy();
    const block = p1Block![1];
    expect(block).toContain('Role:');
    expect(block).toContain('Goal:');
    expect(block).toContain('Auth:');
    expect(block).toContain('Entry point:');
    expect(block).toContain('Frequency:');
    expect(block).toContain('Permissions:');
  });
});

// ─── Fixture: gap-report-P1.md ─────────────────────────────────────

describe('gap report fixture parses', () => {
  const content = fs.readFileSync(path.join(FIX, 'gap-report-P1.md'), 'utf-8');

  test('contains 4 FEATURE rows', () => {
    const matches = content.match(/^FEATURE: F-P1-\d+$/gm) || [];
    expect(matches.length).toBe(4);
  });

  test('each FEATURE row has required fields', () => {
    const required = ['Name:', 'Persona:', 'Completeness:', 'Verdict:', 'Priority:', 'Dependencies:', 'Acceptance criteria:'];
    for (const field of required) {
      const count = (content.match(new RegExp(`^${field.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gm')) || []).length;
      expect(count).toBeGreaterThanOrEqual(4);
    }
  });

  test('completeness rubric format is N/5 with 5 signals', () => {
    const rubric = content.match(/Completeness: (\d)\/5 \(route=(\d), form=(\d), handler=(\d), persist=(\d), feedback=(\d)\)/g);
    expect(rubric).toBeTruthy();
    expect(rubric!.length).toBe(4);
  });

  test('F-P1-002 depends on F-P1-001', () => {
    const block = content.match(/FEATURE: F-P1-002[\s\S]*?Dependencies: \[([^\]]*)\]/);
    expect(block).toBeTruthy();
    expect(block![1]).toContain('F-P1-001');
  });
});

// ─── Fixture: queue resume logic ───────────────────────────────────

interface QueueRow {
  idx: number;
  featureId: string;
  status: 'pending' | 'planning' | 'building' | 'built' | 'verified' | 'failed';
  planFile: string;
  buildStart: string;
  buildEnd: string;
  verify: string;
  notes: string;
}

function parseQueue(content: string): QueueRow[] {
  const rows: QueueRow[] = [];
  const lines = content.split('\n');
  for (const line of lines) {
    // Match table rows that start with `|` and have a numeric first cell
    const m = line.match(/^\|\s*(\d+)\s*\|\s*(F-[A-Z0-9\-]+)\s*\|\s*(\w+)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|\s*([^|]*?)\s*\|/);
    if (!m) continue;
    rows.push({
      idx: parseInt(m[1], 10),
      featureId: m[2],
      status: m[3] as QueueRow['status'],
      planFile: m[4].trim(),
      buildStart: m[5].trim(),
      buildEnd: m[6].trim(),
      verify: m[7].trim(),
      notes: m[8].trim(),
    });
  }
  return rows;
}

function nextResumeAction(rows: QueueRow[]): { row: number; action: string } | null {
  for (const row of rows) {
    if (row.status === 'verified' || row.status === 'built') continue;
    if (row.status === 'failed') return null; // aborted — do not auto-resume
    if (row.status === 'building') return { row: row.idx, action: 'check-autobuild-status' };
    if (row.status === 'planning') return { row: row.idx, action: 'resume-autoplan' };
    if (row.status === 'pending') return { row: row.idx, action: 'start-planning' };
  }
  return null;
}

describe('queue file fixture + resume logic', () => {
  const content = fs.readFileSync(path.join(FIX, 'feature-queue-mid-session.md'), 'utf-8');
  const rows = parseQueue(content);

  test('parses all 5 rows', () => {
    expect(rows.length).toBe(5);
  });

  test('row 1 is verified (F-P1-001)', () => {
    expect(rows[0].featureId).toBe('F-P1-001');
    expect(rows[0].status).toBe('verified');
  });

  test('row 2 is verified (F-P1-002)', () => {
    expect(rows[1].featureId).toBe('F-P1-002');
    expect(rows[1].status).toBe('verified');
  });

  test('row 3 is building (F-P1-003)', () => {
    expect(rows[2].featureId).toBe('F-P1-003');
    expect(rows[2].status).toBe('building');
  });

  test('rows 4,5 are pending', () => {
    expect(rows[3].status).toBe('pending');
    expect(rows[4].status).toBe('pending');
  });

  test('resume action is check-autobuild-status on row 3', () => {
    const action = nextResumeAction(rows);
    expect(action).toEqual({ row: 3, action: 'check-autobuild-status' });
  });
});

// ─── Standalone helper skills ──────────────────────────────────────

describe('standalone helper skill templates exist', () => {
  const HELPERS = ['discover-personas', 'define-workflows', 'gap-analysis'];
  for (const h of HELPERS) {
    test(`${h}/SKILL.md.tmpl exists with frontmatter`, () => {
      const tmpl = path.join(ROOT, h, 'SKILL.md.tmpl');
      expect(fs.existsSync(tmpl)).toBe(true);
      const content = fs.readFileSync(tmpl, 'utf-8');
      const fm = parseFrontmatter(content);
      expect(fm.name).toBe(h);
      expect(fm.description).toBeDefined();
    });
  }
});
