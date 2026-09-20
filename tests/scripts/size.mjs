import { gzipSync } from "node:zlib";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import ts from "typescript";
import { JSDOM } from "jsdom";

// Covers local initial JS/CSS, including static imports and modulepreloads.
// Lazy imports, font binaries, images and third-party requests are reported separately.
const ROOT = resolve("dist");
// v1.7.7 hybrid: homepage retains its 375 KiB gate; docs may load 15 small
// references upfront. Measured trade-off and all-eager comparison live in
// reviews/2026-09-20-navigation/. Canvas stays lazy (not a blanket rollback).
const MAX_INITIAL_GZIP_KIB = 390;
const MAX_HOME_GZIP_KIB = 375;
const MAX_SEARCH_BYTES = 350_000;
const ROUTES = [
  "index.html",
  "components/button.html",
  "canvas/charts.html",
  "canvas/flowchart.html",
];
const fmt = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;
function routeAssets(route) {
  const dom = new JSDOM(readFileSync(resolve(ROOT, route), "utf8"));
  const urls = [
    ...dom.window.document.querySelectorAll(
      'script[type="module"][src], link[rel="stylesheet"][href], link[rel="modulepreload"][href]',
    ),
  ].map((el) => el.getAttribute("src") || el.getAttribute("href"));
  const external = urls.filter((url) => /^https?:\/\//.test(url));
  const seen = new Set();
  function visit(url, importer = resolve(ROOT, route)) {
    if (!url || /^(https?:|data:)/.test(url)) return;
    const clean = url.split(/[?#]/)[0];
    const file = clean.startsWith("/")
      ? resolve(ROOT, `.${clean}`)
      : resolve(dirname(importer), clean);
    if (
      !file.startsWith(`${ROOT}/`) ||
      !/\.(js|css)$/.test(file) ||
      seen.has(file)
    )
      return;
    if (!existsSync(file)) throw new Error(`Missing initial asset: ${file}`);
    seen.add(file);
    const source = readFileSync(file, "utf8");
    if (file.endsWith(".js")) {
      const ast = ts.createSourceFile(
        file,
        source,
        ts.ScriptTarget.Latest,
        false,
        ts.ScriptKind.JS,
      );
      for (const node of ast.statements) {
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier &&
          ts.isStringLiteral(node.moduleSpecifier)
        )
          visit(node.moduleSpecifier.text, file);
      }
    } else {
      for (const match of source.matchAll(
        /@import\s+(?:url\()?['"]([^'"]+)['"]/g,
      ))
        visit(match[1], file);
    }
  }
  urls.forEach((url) => visit(url));
  const assets = [...seen].sort().map((file) => ({
    file: file.slice(ROOT.length),
    gzip: gzipSync(readFileSync(file)).length,
  }));
  const js = assets
    .filter((x) => x.file.endsWith(".js"))
    .reduce((n, x) => n + x.gzip, 0);
  const css = assets
    .filter((x) => x.file.endsWith(".css"))
    .reduce((n, x) => n + x.gzip, 0);
  return { route, js, css, total: js + css, external, assets };
}
let failed = false;
for (const route of ROUTES) {
  const result = routeAssets(route);
  process.stdout.write(
    `${route}: JS ${fmt(result.js)}, CSS ${fmt(result.css)}, total ${fmt(result.total)} gzip (${result.assets.length} files)\n`,
  );
  if (process.argv.includes("--json"))
    process.stdout.write(`${JSON.stringify(result)}\n`);
  if (result.external.length)
    process.stdout.write(
      `  External styles/scripts excluded: ${result.external.join(", ")}\n`,
    );
  const budget =
    route === "index.html" ? MAX_HOME_GZIP_KIB : MAX_INITIAL_GZIP_KIB;
  if (result.total > budget * 1024) failed = true;
}
const searchBytes = readFileSync(
  resolve(ROOT, "search/search-index.json"),
).length;
process.stdout.write(
  `Search index: ${searchBytes} bytes (budget ${MAX_SEARCH_BYTES}); homepage ${MAX_HOME_GZIP_KIB}, docs ${MAX_INITIAL_GZIP_KIB} KiB gzip budgets.\n`,
);
if (searchBytes > MAX_SEARCH_BYTES) failed = true;
if (failed) {
  process.stderr.write(
    "Loading budget exceeded. Inspect initial dependencies or search content.\n",
  );
  process.exitCode = 1;
}
