import { test, expect } from "@playwright/test";
import { writeFileSync } from "node:fs";
const summarize = (samples: number[]) => {
  const sorted = [...samples].sort((a, b) => a - b);
  return {
    median: sorted[Math.floor(sorted.length / 2)],
    p95: sorted[Math.ceil(sorted.length * 0.95) - 1],
    samples,
  };
};
test("measure package updates and graph interactions", async ({
  page,
  browser,
}) => {
  test.setTimeout(180000);
  await page.goto("/reviews/2026-09-16/performance.html");
  const charts = [];
  const graphs = [];
  for (const size of [100, 500, 1000, 2500])
    charts.push({
      size,
      update: summarize(
        await page.evaluate((n) => (window as any).bench.charts(n), size),
      ),
    });
  for (const size of [25, 100, 250, 500]) {
    const result = await page.evaluate(
      (n) => (window as any).bench.graph(n),
      size,
    );
    const node = page.locator(".vd-flowchart-node").first();
    await node.scrollIntoViewIfNeeded();
    const box = await node.boundingBox();
    expect(box).toBeTruthy();
    await page.mouse.move(box!.x + 20, box!.y + 20);
    await page.mouse.down();
    await page.mouse.move(box!.x + 160, box!.y + 60, { steps: 24 });
    await page.mouse.up();
    const drag = await page.evaluate(() => (window as any).bench.drag());
    expect(drag.node.x).not.toBe(40);
    expect(drag.samples.length).toBeGreaterThan(10);
    graphs.push({
      size,
      mount: result.mount,
      edit: summarize(result.edit),
      undoRedo: summarize(result.undoRedo),
      layout: summarize(result.layout),
      dragHandlerAndLayout: summarize(drag.samples),
    });
  }
  writeFileSync(
    "reviews/2026-09-16/performance-results.json",
    JSON.stringify(
      {
        measuredAt: new Date().toISOString(),
        browser: browser.version(),
        viewport: page.viewportSize(),
        device:
          "Mac mini Mac16,10; Apple M4 10 cores; 24 GB; macOS 26.6.2 (25G83)",
        notes:
          "One physical desktop; no CPU throttling. Two warmups, ten samples per synchronous operation. Includes forced layout; excludes compositor paint. Drag uses 24 real pointer steps. Other desktop apps may be active.",
        charts,
        graphs,
      },
      null,
      2,
    ) + "\n",
  );
});
