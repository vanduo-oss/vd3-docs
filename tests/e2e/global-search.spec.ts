import { test, expect } from "@playwright/test";

/**
 * Fuzzy-path smoke for Cmd+K hybrid search. Does not assert semantic ranking
 * (MiniLM download is optional / background). Relies on committed
 * public/search assets served by the preview server.
 */
test.describe("Global hybrid search", () => {
  test("serves corpus assets and finds Modal via Cmd+K", async ({ page }) => {
    const indexRes = await page.request.get("/search/search-index.json");
    expect(indexRes.ok()).toBeTruthy();
    const vectorsRes = await page.request.get("/search/vectors.json");
    expect(vectorsRes.ok()).toBeTruthy();

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Meta+k");
    const dialog = page.getByRole("dialog", { name: "Search entire site" });
    await expect(dialog).toBeVisible();

    const input = dialog.getByRole("searchbox", { name: "Search" });
    await input.fill("modal");

    const listbox = dialog.getByRole("listbox", { name: "Search results" });
    await expect(listbox).toBeVisible({ timeout: 15000 });
    await expect(
      listbox.getByRole("option").filter({ hasText: "Modal" }),
    ).toBeVisible({
      timeout: 15000,
    });

    const aiToggle = dialog.getByRole("switch", { name: "AI search" });
    await expect(aiToggle).not.toBeChecked();
  });

  test("shows AI toggle on narrow viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Meta+k");

    const dialog = page.getByRole("dialog", { name: "Search entire site" });
    await expect(dialog).toBeVisible();

    const modal = page.locator(".vd-global-search-modal.is-open");
    await expect(modal).toBeVisible();
    await expect(modal).toHaveCSS("border-radius", /^(?!0px$).+/);

    const footerControls = dialog.locator(".vd-global-search-footer-controls");
    await expect(footerControls).toBeVisible();

    const aiToggle = dialog.getByRole("switch", { name: "AI search" });
    await expect(aiToggle).not.toBeChecked();
  });

  test("dismisses AI disclaimer after acknowledge", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("vd3-docs:ai-search-disclaimer-ack");
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Meta+k");

    const dialog = page.getByRole("dialog", { name: "Search entire site" });
    await expect(dialog).toBeVisible();

    const aiToggle = dialog.getByRole("switch", { name: "AI search" });
    await aiToggle.click();
    await expect(dialog.locator(".vd-global-search-ai-notice")).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Got it" })).toBeVisible();

    await dialog.getByRole("button", { name: "Got it" }).click();
    await expect(dialog.locator(".vd-global-search-ai-notice")).toBeHidden();
    await expect(aiToggle).toBeChecked();

    await page.keyboard.press("Escape");
    await page.keyboard.press("Meta+k");
    await expect(dialog).toBeVisible();
    await expect(aiToggle).toBeChecked();
    await expect(dialog.locator(".vd-global-search-ai-notice")).toBeHidden();
  });
});
