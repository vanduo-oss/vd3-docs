#!/usr/bin/env node
/**
 * vd3-docs indexer — delegates to @vanduo-oss/vdl-hybrid-search vdl-hybrid-index.
 */
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

let cliPath;
try {
  const pkgDir = path.dirname(
    require.resolve("@vanduo-oss/vdl-hybrid-search/package.json"),
  );
  cliPath = path.join(pkgDir, "scripts/vdl-hybrid-index.mjs");
} catch {
  cliPath = path.resolve(
    __dirname,
    "../../../vdl-hybrid-search/scripts/vdl-hybrid-index.mjs",
  );
}

const outDir = path.resolve(__dirname, "../public/search");
const env = {
  ...process.env,
  VDL_SITE: process.env.VD3_DOCS_SITE || "https://vd3.vanduo.dev",
  VDL_NAV_PATH: process.env.VD3_DOCS_PATH
    ? path.resolve(process.env.VD3_DOCS_PATH, "src/nav.ts")
    : path.resolve(__dirname, "../src/nav.ts"),
  VDL_PRESET: process.env.VDL_PRESET || "embeddinggemma",
};

const child = spawn(
  process.execPath,
  [cliPath, "--out", outDir, "--preset", env.VDL_PRESET],
  { stdio: "inherit", env },
);
child.on("exit", (code) => process.exit(code ?? 1));
