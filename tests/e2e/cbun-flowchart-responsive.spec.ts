import { test, expect, type Page } from "@playwright/test";

const preview = ".cbun-flowchart-wrap";

async function geometry(page: Page) {
  return page.locator(preview).evaluate((root) => {
    const canvas = root.querySelector(".vd-flowchart-canvas")!;
    const canvasBox = canvas.getBoundingClientRect();
    const body = root
      .querySelector(".vd-flowchart-body")!
      .getBoundingClientRect();
    const toolbar = root.querySelector(".vd-flowchart-toolbar")!;
    const palette = root.querySelector(".vd-flowchart-panel--palette")!;
    const nodes = [...root.querySelectorAll(".vd-flowchart-node")];
    const nodeBoxes = nodes.map((node) => node.getBoundingClientRect());
    const centerX =
      (Math.min(...nodeBoxes.map((r) => r.left)) +
        Math.max(...nodeBoxes.map((r) => r.right))) /
      2;
    const centerY =
      (Math.min(...nodeBoxes.map((r) => r.top)) +
        Math.max(...nodeBoxes.map((r) => r.bottom))) /
      2;
    return {
      canvasHeight: canvasBox.height,
      bodyHeight: body.height,
      nodesCentered:
        Math.abs(centerX - (canvasBox.left + canvasBox.width / 2)) < 2 &&
        Math.abs(centerY - (canvasBox.top + canvasBox.height / 2)) < 2,
      toolbarFits: toolbar.scrollWidth <= toolbar.clientWidth + 1,
      paletteFits:
        getComputedStyle(palette).display === "none" ||
        palette.scrollWidth <= palette.clientWidth + 1,
      nodesFit:
        nodes.length === 3 &&
        nodes.every((node) => {
          const r = node.getBoundingClientRect();
          return (
            r.left >= canvasBox.left - 1 &&
            r.right <= canvasBox.right + 1 &&
            r.top >= canvasBox.top - 1 &&
            r.bottom <= canvasBox.bottom + 1
          );
        }),
    };
  });
}

async function expectUsableCanvas(page: Page, minimumHeight = 280) {
  await expect
    .poll(() => geometry(page))
    .toMatchObject({
      toolbarFits: true,
      paletteFits: true,
      nodesFit: true,
      nodesCentered: true,
    });
  const box = await geometry(page);
  expect(box.canvasHeight).toBeGreaterThan(minimumHeight);
  expect(Math.abs(box.bodyHeight - box.canvasHeight)).toBeLessThan(2);
}

// Check both sides of the phone override, package breakpoints, and the
// showcase's two-column/stacked-row breakpoint. Endpoints alone missed this.
for (const width of [
  390, 768, 769, 800, 840, 841, 900, 901, 1024, 1180, 1181, 1440,
]) {
  test(`CBUN flowchart uses its canvas at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/cbun", { waitUntil: "networkidle" });
    await expectUsableCanvas(page);
  });
}

test("refits after viewport and container-only changes, and Fit remains usable", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/cbun", { waitUntil: "networkidle" });
  for (const width of [800, 1024, 390, 1180, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await expectUsableCanvas(page);
  }
  // Changing the containing column does not dispatch a window resize event.
  await page.locator(preview).evaluate((el) => {
    (el as HTMLElement).style.width = "460px";
  });
  // The full toolbar wraps in this artificially narrow desktop container.
  await expectUsableCanvas(page, 260);
  await page.locator(preview).evaluate((el) => {
    (el as HTMLElement).style.removeProperty("width");
  });
  await expectUsableCanvas(page);
  const canvas = page.locator(`${preview} .vd-flowchart-world`);
  const fitted = await canvas.getAttribute("transform");
  await page.locator(`${preview} [data-flowchart-action="zoom-in"]`).click();
  await expect(canvas).not.toHaveAttribute("transform", fitted!);
  await page.locator(`${preview} [data-flowchart-action="fit-view"]`).click();
  await expectUsableCanvas(page);
  await page.getByRole("button", { name: "Home", exact: true }).click();
  await expect(page.locator(preview)).toHaveCount(0);
  await page.setViewportSize({ width: 800, height: 1000 });
  expect(errors).toEqual([]);
});
