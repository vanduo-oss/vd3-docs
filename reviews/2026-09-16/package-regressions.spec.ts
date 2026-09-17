import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/reviews/2026-09-16/package-regressions.html");
});

test("built tooltip keeps its trigger visible and works with keyboard and pointer", async ({
  page,
}) => {
  const button = page.getByRole("button", { name: "Copy", exact: true });
  await expect(button).toBeVisible();
  await button.focus();
  const tip = page.getByRole("tooltip");
  await expect(tip).toBeVisible();
  await expect(button).toHaveAttribute(
    "aria-describedby",
    /existing vd-tooltip-/,
  );
  await button.press("Escape");
  await expect(tip).toHaveCount(0);
  await expect(button).toBeFocused();
  await button.blur();
  await button.hover();
  await expect(tip).toBeVisible();
  await tip.hover();
  await expect(tip).toBeVisible();
  const triggerBox = await button.boundingBox();
  const tipBox = await tip.boundingBox();
  expect(tipBox!.y).toBeGreaterThanOrEqual(triggerBox!.y + triggerBox!.height);
});

test("both built Vue pie exports keep a filled center", async ({ page }) => {
  for (const selector of [".generic-pie", ".typed-pie"]) {
    const slices = page.locator(`${selector} .vd-chart-slice`);
    await expect(slices).toHaveCount(2);
    expect(
      await slices.evaluateAll((els) =>
        els.map((el) => (el.getAttribute("d")!.match(/A/g) ?? []).length),
      ),
    ).toEqual([1, 1]);
  }
});

test("built Vue flowchart retains edits through options and parent echoes", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Add test node", exact: true })
    .click();
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(2);
  await expect(page.locator("#changes")).toHaveText("1");
  await page.getByRole("button", { name: "Toggle read-only" }).click();
  await page.getByRole("button", { name: "Change grid" }).click();
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(2);
  await page.getByRole("button", { name: "Toggle read-only" }).click();
  await page.getByRole("button", { name: "Undo edit" }).click();
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(1);
  await expect(page.locator("#changes")).toHaveText("2");
});

test("chart observation follows responsive changes and preserves focus through updates", async ({
  page,
}) => {
  const svg = page.locator(".bar-updates svg");
  await expect(svg).toHaveAttribute("width", "480");
  await page.evaluate(() => {
    (window as any).packageQA.state.width = 620;
  });
  await expect(svg).toHaveAttribute("width", "480");
  await page.evaluate(() => {
    (window as any).packageQA.state.responsive = true;
  });
  await expect(svg).toHaveAttribute("width", "620");
  await page.evaluate(() => {
    (window as any).packageQA.state.width = 480;
  });
  await expect(svg).toHaveAttribute("width", "480");
  const b = page.locator(".bar-updates rect.vd-chart-bar").nth(1);
  await b.focus();
  await page.evaluate(() => {
    (window as any).packageQA.state.rows = [
      { id: "b", x: "Renamed", y: 7 },
      { id: "a", x: "A", y: 3 },
    ];
  });
  await expect(
    page.locator(".bar-updates rect.vd-chart-bar").first(),
  ).toBeFocused();
  await page.evaluate(() => {
    (window as any).packageQA.state.rows = [{ id: "a", x: "A", y: 3 }];
  });
  await expect(page.locator(".bar-updates rect.vd-chart-bar")).toBeFocused();
  await page.evaluate(() => {
    (window as any).packageQA.state.responsive = false;
  });
  await page.evaluate(() => {
    (window as any).packageQA.state.width = 620;
  });
  await expect(svg).toHaveAttribute("width", "480");
  await page.evaluate(() => {
    (window as any).packageQA.state.color = "#0b7285";
  });
  await page.evaluate(() => {
    (window as any).packageQA.refresh();
  });
  await expect(page.locator(".bar-updates rect.vd-chart-bar")).toHaveAttribute(
    "fill",
    "#0b7285",
  );
});

test("graph add, select, edit, connect, delete and undo work from keyboard controls", async ({
  page,
}) => {
  const add = page.locator('[data-node-type="rect"]');
  await add.focus();
  await add.press("Enter");
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(2);
  const canvas = page.locator(".vd-flowchart-canvas");
  await canvas.focus();
  await canvas.press("Home");
  await canvas.press("Enter");
  const text = page.getByRole("textbox", { name: "Edit node text" });
  await expect(text).toBeFocused();
  await text.fill("Renamed start");
  await text.press("Control+Enter");
  await expect(canvas).toBeFocused();
  const summary = page.locator(".vd-flowchart-outline summary");
  await summary.focus();
  await summary.press("Enter");
  await expect(
    page.getByRole("list", { name: "Nodes and connections" }),
  ).toContainText("Renamed start");
  const source = page.getByRole("combobox", { name: "Selected node" });
  await source.focus();
  await source.press("Home");
  const target = page.getByRole("combobox", { name: "Connection target" });
  await target.focus();
  // Native select typeahead also works in macOS headless Chromium, whose
  // popup navigation does not commit ArrowDown/Enter selections.
  await target.press("p");
  await target.press("Tab");
  await expect(target).not.toHaveValue(await source.inputValue());
  const connect = page.getByRole("button", {
    name: "Connect nodes",
    exact: true,
  });
  await connect.focus();
  await connect.press("Enter");
  await expect(
    page.getByRole("list", { name: "Nodes and connections" }),
  ).toContainText("Connects to");
  await canvas.focus();
  await canvas.press("Home");
  await canvas.press("Delete");
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(1);
  await canvas.press("Control+z");
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(2);
});

test.describe("touch chart details", () => {
  test.use({ hasTouch: true });
  test("tapping a mark exposes its values", async ({ page }) => {
    await page.locator(".bar-updates rect.vd-chart-bar").first().tap();
    await expect(
      page.locator(".bar-updates .vd-chart-tooltip.is-visible"),
    ).toContainText("A");
  });
});
