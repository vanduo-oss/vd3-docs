import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, basename } from "node:path";

const ASSETS = resolve("dist/assets");
const fmt = (b) => `${(b / 1024).toFixed(1)} KB`;

const files = readdirSync(ASSETS).filter((n) => n.startsWith("app-"));

if (files.length === 0) {
  process.stderr.write(
    "No app-* assets found under dist/assets/. Run `pnpm run build` first.\n",
  );
  process.exit(1);
}

const lines = files.map((name) => {
  const path = resolve(ASSETS, name);
  const raw = readFileSync(path);
  const gz = gzipSync(raw);
  return `${basename(name)}  raw ${fmt(raw.length)}  gz ${fmt(gz.length)}`;
});

process.stdout.write(`${lines.join("\n")}\n`);
