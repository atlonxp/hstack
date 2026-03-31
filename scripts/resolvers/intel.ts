import type { TemplateContext } from './types';

/**
 * Intelligence logging resolver — adds cross-session finding logging
 * to finding-producing skills (review, cso, investigate-workflow, etc.).
 */
export function generateIntelLogging(ctx: TemplateContext): string {
  const binPath = ctx.paths.binDir;

  return [
    '## Intelligence Logging',
    '',
    'When this skill produces findings (security issues, broken workflows, code quality',
    'problems, missing coverage, etc.), log each significant finding to the project',
    'intelligence file. This builds cross-session memory that `/intel` reads.',
    '',
    '**When to log:** After producing any finding with a severity level (BROKEN, INCOMPLETE,',
    'MISSING, ORPHANED, FRAGILE, CRITICAL, HIGH, MEDIUM) or a significant discovery.',
    '',
    '**How to log:** Run in the background (never block the user):',
    '',
    '```bash',
    `${binPath}/gstack-intel-append '{"ts":"'\\$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"${ctx.skillName}","event":"finding","severity":"SEVERITY","area":"AREA","file":"FILE_PATH","commit":"'\\$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")'"}' &`,
    '```',
    '',
    'Replace SEVERITY, AREA (short label like "auth", "billing", "api"), and FILE_PATH',
    'with actual values. Only log findings with concrete file references — skip vague',
    'observations without evidence.',
    '',
    '**Do not log:** informational messages, successful checks with no findings, or',
    'findings below MEDIUM severity. Keep the signal-to-noise ratio high.',
  ].join('\n');
}
