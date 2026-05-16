#!/usr/bin/env bun
/**
 * Serve mockup-dist/ as a static HTTP server.
 *
 * Runs build-mockup.ts once, then serves the output. With --watch, the build
 * script stays running and rebuilds on source change.
 *
 * Usage:
 *   bun run scripts/serve-mockup.ts [--port 4321] [--watch] [--share]
 */

import { spawn, spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

interface Args {
  port: number;
  watch: boolean;
  share: boolean;
  src: string;
  out: string;
}

function parseArgs(): Args {
  const a = process.argv.slice(2);
  const args: Args = { port: 4321, watch: false, share: false, src: './mockup', out: './mockup-dist' };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === '--port' && a[i + 1]) args.port = parseInt(a[++i], 10);
    else if (a[i] === '--watch') args.watch = true;
    else if (a[i] === '--share') args.share = true;
    else if (a[i] === '--src' && a[i + 1]) args.src = a[++i];
    else if (a[i] === '--out' && a[i + 1]) args.out = a[++i];
  }
  return args;
}

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const args = parseArgs();
const buildScript = path.resolve(import.meta.dir, 'build-mockup.ts');

if (args.watch) {
  const child = spawn('bun', ['run', buildScript, '--watch', '--src', args.src, '--out', args.out], { stdio: 'inherit' });
  process.on('SIGINT', () => { child.kill('SIGINT'); process.exit(0); });
} else {
  const r = spawnSync('bun', ['run', buildScript, '--src', args.src, '--out', args.out], { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

const outRoot = path.resolve(args.out);

const server = Bun.serve({
  port: args.port,
  async fetch(req) {
    const url = new URL(req.url);
    let rel = decodeURIComponent(url.pathname);
    if (rel === '/' || rel === '') rel = '/index.html';
    const resolved = path.resolve(outRoot, '.' + rel);
    if (!resolved.startsWith(outRoot)) return new Response('forbidden', { status: 403 });
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
      return new Response('not found', { status: 404 });
    }
    const ext = path.extname(resolved).toLowerCase();
    return new Response(Bun.file(resolved), { headers: { 'content-type': MIME[ext] ?? 'application/octet-stream' } });
  },
});

console.log(`Serving ${outRoot} at http://localhost:${server.port}`);
if (args.share) {
  console.log(`\nTo share over ngrok, run in another terminal:\n  ngrok http ${server.port}\n`);
}

process.on('SIGINT', () => { console.log('\nserver stopped'); server.stop(); process.exit(0); });
