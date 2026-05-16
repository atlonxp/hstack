#!/usr/bin/env bun
/**
 * Build mockup: resolves {{include path/to/file.html}} directives recursively.
 *
 * Reads from ./mockup, writes to ./mockup-dist. The single directive is path
 * relative to the source root. Static assets (styles.css, interactions.js,
 * data/*.json) pass through unchanged.
 *
 * Usage:
 *   bun run scripts/build-mockup.ts [--src ./mockup] [--out ./mockup-dist] [--watch]
 */

import * as fs from 'fs';
import * as path from 'path';

const INCLUDE_RE = /\{\{include\s+([^\s}]+)\s*\}\}/g;
const MAX_DEPTH = 16;

interface Args {
  src: string;
  out: string;
  watch: boolean;
}

function parseArgs(): Args {
  const a = process.argv.slice(2);
  const args: Args = { src: './mockup', out: './mockup-dist', watch: false };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--src' && a[i + 1]) args.src = a[++i];
    else if (a[i] === '--out' && a[i + 1]) args.out = a[++i];
    else if (a[i] === '--watch') args.watch = true;
    else if (a[i] === '--help' || a[i] === '-h') {
      console.log('Usage: build-mockup [--src <dir>] [--out <dir>] [--watch]');
      process.exit(0);
    }
  }
  return args;
}

function resolveIncludes(filePath: string, srcRoot: string, stack: string[] = []): string {
  if (stack.length > MAX_DEPTH) {
    throw new Error(`include depth exceeded ${MAX_DEPTH} at ${filePath}\n  stack: ${stack.join(' -> ')}`);
  }
  if (stack.includes(filePath)) {
    throw new Error(`include cycle detected: ${[...stack, filePath].join(' -> ')}`);
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`include target not found: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n');
  return raw.replace(INCLUDE_RE, (match, rel: string) => {
    const lineIdx = lines.findIndex(l => l.includes(match));
    const target = path.resolve(srcRoot, rel);
    try {
      return resolveIncludes(target, srcRoot, [...stack, filePath]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new Error(`${filePath}:${lineIdx + 1}: ${msg}`);
    }
  });
}

function copyThrough(srcRoot: string, distRoot: string, rel: string): boolean {
  const src = path.join(srcRoot, rel);
  if (!fs.existsSync(src)) return false;
  const dst = path.join(distRoot, rel);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  return true;
}

function copyDataDir(srcRoot: string, distRoot: string): number {
  const dataSrc = path.join(srcRoot, 'data');
  if (!fs.existsSync(dataSrc)) return 0;
  const dataDst = path.join(distRoot, 'data');
  fs.mkdirSync(dataDst, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(dataSrc)) {
    if (!f.endsWith('.json')) continue;
    fs.copyFileSync(path.join(dataSrc, f), path.join(dataDst, f));
    n++;
  }
  return n;
}

function build(srcRoot: string, distRoot: string): { pages: number; ms: number } {
  const t0 = Date.now();
  if (!fs.existsSync(srcRoot)) {
    throw new Error(`source directory not found: ${srcRoot}`);
  }
  fs.mkdirSync(distRoot, { recursive: true });

  const pageFiles: string[] = [];
  const indexPath = path.join(srcRoot, 'index.html');
  if (fs.existsSync(indexPath)) pageFiles.push(indexPath);
  const pagesDir = path.join(srcRoot, 'pages');
  if (fs.existsSync(pagesDir)) {
    for (const f of fs.readdirSync(pagesDir)) {
      if (f.endsWith('.html')) pageFiles.push(path.join(pagesDir, f));
    }
  }

  for (const page of pageFiles) {
    const html = resolveIncludes(page, srcRoot);
    fs.writeFileSync(path.join(distRoot, path.basename(page)), html);
  }

  copyThrough(srcRoot, distRoot, 'styles.css');
  copyThrough(srcRoot, distRoot, 'interactions.js');
  copyDataDir(srcRoot, distRoot);

  return { pages: pageFiles.length, ms: Date.now() - t0 };
}

function watchRecursive(dir: string, onChange: (fp: string) => void): void {
  if (process.platform === 'darwin' || process.platform === 'win32') {
    fs.watch(dir, { recursive: true }, (_, fname) => {
      if (fname) onChange(path.join(dir, fname));
    });
    return;
  }
  // Linux: fs.watch recursive is not supported — walk and watch each subdir.
  const watch = (d: string) => {
    fs.watch(d, (_, fname) => {
      if (!fname) return;
      const fp = path.join(d, fname);
      onChange(fp);
      try {
        if (fs.statSync(fp).isDirectory()) watch(fp);
      } catch {}
    });
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      if (entry.isDirectory()) watch(path.join(d, entry.name));
    }
  };
  watch(dir);
}

function runBuild(src: string, out: string): boolean {
  try {
    const { pages, ms } = build(src, out);
    console.log(`Built ${pages} pages in ${ms}ms`);
    return true;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`build failed: ${msg}`);
    return false;
  }
}

const args = parseArgs();
const ok = runBuild(args.src, args.out);

if (args.watch) {
  console.log(`Watching ${args.src} for changes...`);
  let pending: ReturnType<typeof setTimeout> | null = null;
  watchRecursive(args.src, () => {
    if (pending) clearTimeout(pending);
    pending = setTimeout(() => {
      pending = null;
      runBuild(args.src, args.out);
    }, 50);
  });
  process.on('SIGINT', () => { console.log('\nwatch stopped'); process.exit(0); });
} else if (!ok) {
  process.exit(1);
}
