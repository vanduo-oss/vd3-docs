import { test, expect } from "@playwright/test";

/**
 * Fuzzy-path smoke for Cmd+K Fuse search. Relies on committed
 * public/search/search-index.json served by the preview server.
 */
test.describe("Global Fuse search", () => {
  test("serves corpus and finds Modal via Cmd+K", async ({ page }) => {
    const indexRes = await page.request.get("/search/search-index.json");
    expect(indexRes.ok()).toBeTruthy();

    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html[data-vd-hydrated='true']")).toBeVisible();
    await page.keyboard.press("Meta+k");
    const dialog = page.getByRole("dialog", { name: "Search entire site" });
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute("data-vd-search-ready", "true");

    const input = dialog.getByRole("searchbox", { name: "Search" });
    await input.fill("modal");

    const listbox = dialog.getByRole("listbox", { name: "Search results" });
    await expect(listbox).toBeVisible({ timeout: 15000 });
    await expect(
      listbox.getByRole("option").filter({ hasText: "Modal" }),
    ).toBeVisible({
      timeout: 15000,
    });

    await expect(
      dialog.getByRole("switch", { name: "Semantic Search (BETA)" }),
    ).toHaveCount(0);
    await listbox
      .getByRole("option")
      .filter({ hasText: "Modal" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/components\/modal$/);
    await expect(page.locator("#modals .demo-title")).toBeVisible();
  });

  test("sits below the top Oola dock on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript(() => {
      window.localStorage.removeItem("vd3-docs-site-dock");
    });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("html[data-vd-hydrated='true']")).toBeVisible();

    const dock = page.locator("nav.vd-site-dock.vd-dock-fixed").first();
    await expect(dock).toHaveClass(/vd-dock-edge-top/);

    await page.keyboard.press("Meta+k");
    const modal = page.locator(".vd-global-search-modal.is-open");
    await expect(modal).toBeVisible();

    const dockBox = await dock.boundingBox();
    const modalBox = await modal.boundingBox();
    expect(dockBox).toBeTruthy();
    expect(modalBox).toBeTruthy();
    expect(modalBox!.y).toBeGreaterThanOrEqual(dockBox!.y + dockBox!.height);
  });
});
