import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, basename } from "node:path";

// Gzip size budget for the app bundle. Re-baselined 2026-08-30 after the vd3
// 1.7.0 site release: app-* ≈ 591.5 KB gz. The growth over the previous 575 KB
// cap (the 2026-08-15 vd3 1.5.0 baseline) is the published @vanduo-oss/vd3@1.7.0
// kit plus the hybrid search feature (fuse.js + @vanduo-oss/vdl-hybrid-search,
// statically imported by the app-wide search store; @huggingface/transformers
// stays lazy-loaded) — not a surprise dep. Bump by a small honest buffer so the
// gate still trips on a real regression.
const MAX_GZIP_KB = 600;

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
