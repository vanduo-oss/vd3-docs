import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, statSync, readdirSync } from "node:fs";
import { resolve, extname, relative, sep, join } from "node:path";
import { gzipSync } from "node:zlib";
import { cpus, platform, arch } from "node:os";

// Production files only. Gzip, browser cache, and click-to-next-frame timings;
// no dev server transformations or Playwright polling time in the measurement.
//
// Trust boundary: local CLI only. Serves a caller-selected dist tree over
// loopback HTTP (required so Chromium can measure navigation). The request
// handler only looks up URL keys in a prebuilt allowlist of files under that
// root — request input never flows into filesystem APIs.
const rootArg = process.argv[2] || "dist";
if (rootArg !== "dist") {
  throw new Error(`Unsupported benchmark root: ${rootArg}`);
}
const root = resolve("dist");

const outputArg = process.argv[3];
const reviewFolder = "reviews/2026-09-20-navigation";
let output;
switch (outputArg) {
  case "/tmp/vd3-hybrid.json":
    output = "/tmp/vd3-hybrid.json";
    break;
  case `${reviewFolder}/baseline.json`:
    output = resolve(reviewFolder, "baseline.json");
    break;
  case `${reviewFolder}/baseline-settled.json`:
    output = resolve(reviewFolder, "baseline-settled.json");
    break;
  case `${reviewFolder}/eager.json`:
    output = resolve(reviewFolder, "eager.json");
    break;
  case `${reviewFolder}/hybrid-imports.json`:
    output = resolve(reviewFolder, "hybrid-imports.json");
    break;
  case `${reviewFolder}/hybrid-final.json`:
    output = resolve(reviewFolder, "hybrid-final.json");
    break;
  case `${reviewFolder}/hybrid-settled.json`:
    output = resolve(reviewFolder, "hybrid-settled.json");
    break;
  default:
    throw new Error(
      "Usage: node benchmark.mjs dist <approved-output.json> [--settled]",
    );
}
const settled = process.argv.includes("--settled");

const MAX_ASSET_BYTES = 8 * 1024 * 1024;
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

/** @type {Map<string, { body: Buffer, type: string, cacheable: boolean }>} */
const assets = new Map();

function indexDist(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      indexDist(abs);
      continue;
    }
    if (!entry.isFile()) continue;
    const rel = relative(root, abs).split(sep).join("/");
    if (statSync(abs).size > MAX_ASSET_BYTES) continue;
    const raw = readFileSync(abs);
    // Retain the post-read check in case a local build rewrites an asset
    // between the metadata check and the read.
    if (raw.byteLength > MAX_ASSET_BYTES) continue;
    const type = mime[extname(abs)] || "application/octet-stream";
    const record = {
      body: gzipSync(raw),
      type,
      cacheable: rel.startsWith("assets/"),
    };
    assets.set(`/${rel}`, record);
    if (rel.endsWith(".html")) {
      assets.set(`/${rel.slice(0, -".html".length)}`, record);
    }
  }
}

if (!statSync(root).isDirectory()) {
  throw new Error(`Benchmark dist root is not a directory: ${root}`);
}
indexDist(root);
if (assets.has("/index.html")) assets.set("/", assets.get("/index.html"));

const server = createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(req.url, "http://127.0.0.1").pathname,
    );
  } catch {
    res.writeHead(400).end();
    return;
  }
  if (pathname.includes("\0") || pathname.includes("..")) {
    res.writeHead(400).end();
    return;
  }

  // Exact key match against the prebuilt allowlist (no path join from the URL).
  let asset = null;
  for (const [key, value] of assets) {
    if (key === pathname) {
      asset = value;
      break;
    }
  }
  if (!asset) {
    res.writeHead(404).end();
    return;
  }

  const { body, type, cacheable } = asset;
  res.writeHead(200, {
    "Content-Type": type,
    "Content-Encoding": "gzip",
    "Content-Length": body.byteLength,
    "Cache-Control": cacheable
      ? "public, max-age=31536000, immutable"
      : "no-cache",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy":
      "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; img-src 'self' data:; connect-src 'self'",
    "Referrer-Policy": "no-referrer",
  });
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  res.end(body);
});
await new Promise((resolveListen) =>
  server.listen(0, "127.0.0.1", resolveListen),
);
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const results = {
  settledBeforeNavigation: settled,
  browser: browser.version(),
  system: `${platform()} ${arch()}`,
  cpu: cpus()[0].model,
  profiles: [],
};
try {
  for (const slow of [false, true]) {
    const profile = {
      name: slow ? "100ms latency, 1.6Mbps, CPU 4x" : "local unthrottled",
      samples: [],
    };
    for (let run = 0; run < 3; run++) {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
      });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send("Network.enable");
      await cdp.send("Network.setBlockedURLs", {
        urls: ["https://*", "http://fonts.*"],
      });
      if (slow) {
        await cdp.send("Network.emulateNetworkConditions", {
          offline: false,
          latency: 100,
          downloadThroughput: 200000,
          uploadThroughput: 93750,
        });
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      }
      await page.addInitScript(() => {
        window.__navBench = { changes: [], longTasks: [], lcp: 0 };
        new PerformanceObserver((list) => {
          for (const e of list.getEntries())
            window.__navBench.longTasks.push({
              start: e.startTime,
              duration: e.duration,
            });
        }).observe({ type: "longtask", buffered: true });
        new PerformanceObserver((list) => {
          window.__navBench.lcp = list.getEntries().at(-1).startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        document.addEventListener(
          "click",
          (event) => {
            const link = event.target.closest?.(".doc-nav-link");
            if (!link) return;
            const path = new URL(link.href).pathname;
            if (path === location.pathname) return;
            const start = performance.now();
            const old = document.querySelector(".doc-content")?.textContent;
            const observer = new MutationObserver(() => {
              if (
                location.pathname !== path ||
                document.querySelector(".doc-content")?.textContent === old
              )
                return;
              observer.disconnect();
              requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                  window.__navBench.changes.push({
                    path,
                    ms: performance.now() - start,
                    resources: performance
                      .getEntriesByType("resource")
                      .filter(
                        (e) =>
                          e.startTime >= start &&
                          /\.(js|css)(\?|$)/.test(e.name),
                      )
                      .map((e) => ({
                        name: new URL(e.name).pathname,
                        duration: e.duration,
                        transferSize: e.transferSize,
                      })),
                  });
                }),
              );
            });
            observer.observe(document.querySelector(".doc-content"), {
              subtree: true,
              childList: true,
              characterData: true,
            });
          },
          true,
        );
      });
      await page.goto(base + "/components/button");
      await page.waitForFunction(
        () => document.documentElement.dataset.vdHydrated === "true",
      );
      const initial = await page.evaluate(
        () =>
          new Promise((resolve) =>
            requestAnimationFrame(() =>
              requestAnimationFrame(() =>
                resolve({
                  readyMs: performance.now(),
                  lcpMs: window.__navBench.lcp,
                  longTaskMs: window.__navBench.longTasks.reduce(
                    (n, e) => n + e.duration,
                    0,
                  ),
                }),
              ),
            ),
          ),
      );
      const paths = [
        "/components/badge",
        "/components/alert",
        "/components/card",
        "/components/dropdown",
        "/components/tabs",
        "/components/accordion",
        "/components/avatar",
        "/components/modal",
        "/components/tooltip",
        "/core/color-palette",
        "/canvas/charts",
        "/components/button",
        "/components/badge",
      ];
      if (settled) await page.waitForLoadState("networkidle");
      for (let i = 0; i < paths.length; i++) {
        await page.mouse.move(0, 0);
        const link = page.locator(`.doc-nav-link[href="${paths[i]}"]`);
        await link.scrollIntoViewIfNeeded();
        await link.click();
        await page.waitForFunction(
          (n) => window.__navBench.changes.length === n,
          i + 1,
        );
      }
      profile.samples.push({
        initial,
        navigation: await page.evaluate(() => window.__navBench.changes),
      });
      await context.close();
      process.stdout.write(`${profile.name}: sample ${run + 1}/3 complete\n`);
    }
    results.profiles.push(profile);
  }
  writeFileSync(output, JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
