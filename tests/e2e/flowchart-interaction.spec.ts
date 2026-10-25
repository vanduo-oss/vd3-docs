import { test, expect, type Page } from "@playwright/test";

async function openFlowchart(page: Page, theme: "light" | "dark") {
  await page.emulateMedia({ colorScheme: theme });
  await page.addInitScript((stored) => {
    window.localStorage.setItem("vanduo-theme-preference", stored);
  }, theme);
  await page.goto("/canvas/flowchart", { waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await expect(page.locator(".vd-flowchart-canvas")).toBeVisible();
  await expect(
    page.locator(".vd-flowchart-node[data-node-id='note']"),
  ).toBeAttached();
  await expect(page.locator("[data-flowchart-scale]")).not.toHaveText("");
}

for (const theme of ["light", "dark"] as const) {
  test.describe(`flowchart 1.5.0 interaction (${theme})`, () => {
    test("reaches both camera bounds from the editor zoom controls", async ({
      page,
    }) => {
      await openFlowchart(page, theme);
      const scale = page.locator("[data-flowchart-scale]");
      await page.locator("[data-flowchart-demo='overview']").click();
      await expect(scale).toHaveText("0.0500");
      await page.locator("[data-flowchart-action='zoom-out']").click();
      await expect(scale).toHaveText("0.0500");

      const zoomIn = page.locator("[data-flowchart-action='zoom-in']");
      for (let step = 0; step < 80; step += 1) {
        if ((await scale.textContent()) === "20.0000") break;
        await zoomIn.click();
      }
      await expect(scale).toHaveText("20.0000");
      await zoomIn.click();
      await expect(scale).toHaveText("20.0000");
    });

    test("moves selection from the focused canvas and keeps the minimap pointer-only", async ({
      page,
    }) => {
      await openFlowchart(page, theme);
      const canvas = page.locator(".vd-flowchart-canvas");
      await canvas.focus();
      await expect(canvas).toBeFocused();
      await page.keyboard.press("Home");
      await expect(
        page.locator(".vd-flowchart-node.is-selected"),
      ).toHaveAttribute("data-node-id", "start");
      await page.keyboard.press("End");
      await expect(
        page.locator(".vd-flowchart-node.is-selected"),
      ).toHaveAttribute("data-node-id", "note");
      await page.keyboard.press("?");
      await expect(
        page.getByRole("dialog", { name: "Keyboard shortcuts" }),
      ).toContainText("Copy, cut, paste");
      await page.keyboard.press("Escape");
      await expect(page.locator(".vd-flowchart-minimap")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      await canvas.focus();
      await page.keyboard.press("Shift+Tab");
      await expect(canvas).not.toBeFocused();
    });

    test("keeps the diagram when JSON load is invalid", async ({ page }) => {
      await openFlowchart(page, theme);
      const json = page.getByRole("textbox", { name: "Flowchart JSON" });
      await expect(json).toHaveValue(/"id": "note"/);
      const before = await json.inputValue();
      await json.fill("{");
      await page.locator("[data-json-action='load']").click();
      await expect(page.locator(".vd-flowchart-json-status")).toContainText(
        "current document was not changed",
      );
      await expect(
        page.locator(".vd-flowchart-node[data-node-id='note']"),
      ).toBeAttached();
      await expect(
        page.locator(".vd-flowchart-node[data-node-id='start']"),
      ).toBeAttached();
      await page.locator("[data-json-action='refresh']").click();
      await expect(json).toHaveValue(before);
    });
  });
}
