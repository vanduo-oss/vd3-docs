import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const phaseArg = process.argv[2] || "before";
if (phaseArg !== "before" && phaseArg !== "after") {
  throw new Error(`Invalid phase "${phaseArg}". Use before or after.`);
}
const folder = "reviews/2026-09-20-cbun-responsive";
const beforeScreenshots = new Map([
  [390, `${folder}/before-390.png`],
  [800, `${folder}/before-800.png`],
  [1024, `${folder}/before-1024.png`],
  [1440, `${folder}/before-1440.png`],
]);
const afterScreenshots = new Map([
  [390, `${folder}/after-390.png`],
  [800, `${folder}/after-800.png`],
  [1024, `${folder}/after-1024.png`],
  [1440, `${folder}/after-1440.png`],
]);
const screenshotPaths =
  phaseArg === "before" ? beforeScreenshots : afterScreenshots;
const browser = await chromium.launch();
const rows = [];
try {
  for (const width of [
    390, 768, 769, 800, 840, 841, 900, 901, 1024, 1180, 1181, 1440,
  ]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    await page.goto("http://127.0.0.1:8787/cbun", { waitUntil: "networkidle" });
    await page
      .locator(".cbun-flowchart-wrap .vd-flowchart-node")
      .first()
      .waitFor();
    const geometry = await page
      .locator(".cbun-flowchart-wrap")
      .evaluate((el) => {
        const box = (selector) => {
          const node = el.querySelector(selector);
          const r = node.getBoundingClientRect();
          return {
            width: r.width,
            height: r.height,
            display: getComputedStyle(node).display,
            scrollWidth: node.scrollWidth,
            clientWidth: node.clientWidth,
          };
        };
        return {
          host: el.clientWidth,
          body: box(".vd-flowchart-body"),
          canvas: box(".vd-flowchart-canvas"),
          palette: box(".vd-flowchart-panel--palette"),
          toolbar: box(".vd-flowchart-toolbar"),
          rows: getComputedStyle(el.querySelector(".vd-flowchart-body"))
            .gridTemplateRows,
          zoom: el
            .querySelector(".vd-flowchart-world")
            .getAttribute("transform"),
        };
      });
    rows.push({ width, ...geometry });
    const screenshotPath = screenshotPaths.get(width);
    if (screenshotPath)
      await page
        .locator(".cbun-flowchart-wrap")
        .screenshot({ path: screenshotPath });
    await page.close();
  }
  const output = JSON.stringify(rows, null, 2) + "\n";
  if (phaseArg === "before") {
    writeFileSync(`${folder}/before.json`, output);
  } else {
    writeFileSync(`${folder}/after.json`, output);
  }
  process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
} finally {
  await browser.close();
}
