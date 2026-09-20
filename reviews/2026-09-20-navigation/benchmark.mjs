import { chromium } from "@playwright/test";
import { createServer } from "node:http";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve, extname } from "node:path";
import { gzipSync } from "node:zlib";
import { cpus, platform, arch } from "node:os";

// Production files only. Gzip, browser cache, and click-to-next-frame timings;
// no dev server transformations or Playwright polling time in the measurement.
const root = resolve(process.argv[2] || "dist");
const output = process.argv[3];
const settled = process.argv.includes("--settled");
if (!output) throw new Error("Usage: node benchmark.mjs <dist> <output.json>");
const cache = new Map();
const mime = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};
const server = createServer((req, res) => {
  let pathname = decodeURIComponent(
    new URL(req.url, "http://localhost").pathname,
  );
  if (pathname === "/") pathname = "/index.html";
  if (!extname(pathname)) pathname += ".html";
  const file = resolve(root, "." + pathname);
  if (!file.startsWith(root + "/") || !existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  if (!cache.has(file)) cache.set(file, gzipSync(readFileSync(file)));
  res.writeHead(200, {
    "Content-Type": mime[extname(file)] || "application/octet-stream",
    "Content-Encoding": "gzip",
    "Cache-Control": pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "no-cache",
  });
  res.end(cache.get(file));
});
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
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
  await new Promise((resolve) => server.close(resolve));
}
