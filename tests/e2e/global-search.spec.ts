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
});
