import { chromium } from "@playwright/test";
import { writeFileSync } from "node:fs";

const phase = process.argv[2] || "before";
const folder = "reviews/2026-09-20-cbun-responsive";
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
    if ([390, 800, 1024, 1440].includes(width))
      await page
        .locator(".cbun-flowchart-wrap")
        .screenshot({ path: `${folder}/${phase}-${width}.png` });
    await page.close();
  }
  writeFileSync(
    `${folder}/${phase}.json`,
    JSON.stringify(rows, null, 2) + "\n",
  );
  process.stdout.write(JSON.stringify(rows, null, 2) + "\n");
} finally {
  await browser.close();
}
