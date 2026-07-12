import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, basename } from "node:path";

// Gzip size budget for the app bundle. Baselined against the current dist on
// 2026-07-12: app-*.js ≈ 342.5 KB gz + app-*.css ≈ 103.8 KB gz ≈ 446.3 KB gz
// total. `MAX_GZIP_KB` is that measured floor plus ~15% headroom, so today's
// build passes while a real bundle regression (a heavy new dep, an un-split
// chunk) trips the gate. Re-baseline this number deliberately when the bundle
// legitimately grows.
const MAX_GZIP_KB = 515;

const ASSETS = resolve("dist/assets");
const fmt = (b) => `${(b / 1024).toFixed(1)} KB`;

const files = readdirSync(ASSETS).filter((n) => n.startsWith("app-"));

if (files.length === 0) {
  process.stderr.write(
    "No app-* assets found under dist/assets/. Run `pnpm run build` first.\n",
  );
  process.exit(1);
}

let totalGzip = 0;
const lines = files.map((name) => {
  const path = resolve(ASSETS, name);
  const raw = readFileSync(path);
  const gz = gzipSync(raw);
  totalGzip += gz.length;
  return `${basename(name)}  raw ${fmt(raw.length)}  gz ${fmt(gz.length)}`;
});

const budgetBytes = MAX_GZIP_KB * 1024;
lines.push(
  `total app-*  gz ${fmt(totalGzip)}  (budget ${MAX_GZIP_KB} KB gz)`,
);
process.stdout.write(`${lines.join("\n")}\n`);

if (totalGzip > budgetBytes) {
  process.stderr.write(
    `Bundle over budget: ${fmt(totalGzip)} gz > ${MAX_GZIP_KB} KB gz. ` +
      `Reduce the app bundle or re-baseline MAX_GZIP_KB deliberately.\n`,
  );
  process.exit(1);
}

process.stdout.write(
  `Bundle within budget: ${fmt(totalGzip)} gz <= ${MAX_GZIP_KB} KB gz.\n`,
);
