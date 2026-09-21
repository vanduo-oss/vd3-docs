import { test, expect, type Page } from "@playwright/test";

async function mutedOnDock(
  page: Page,
  preference: "system" | "light" | "dark",
  scheme: "light" | "dark",
): Promise<{ color: string; theme: string | null }> {
  await page.emulateMedia({ colorScheme: scheme });
  await page.addInitScript((stored) => {
    window.localStorage.setItem("vanduo-theme-preference", stored);
  }, preference);
  await page.goto("/components/dock", { waitUntil: "networkidle" });
  const muted = page.locator("section#dock > p.vd-text-muted").first();
  await expect(muted).toBeVisible();
  return muted.evaluate((el) => ({
    color: getComputedStyle(el).color,
    theme: document.documentElement.getAttribute("data-theme"),
  }));
}

test.describe("Docs color sets", () => {
  test("system matches explicit dark and light muted text", async ({
    page,
  }) => {
    const dark = await mutedOnDock(page, "dark", "dark");
    const systemDark = await mutedOnDock(page, "system", "dark");
    expect(dark.theme).toBe("dark");
    expect(systemDark.theme).toBe("dark");
    expect(systemDark.color).toBe(dark.color);

    const light = await mutedOnDock(page, "light", "light");
    const systemLight = await mutedOnDock(page, "system", "light");
    expect(light.theme).toBe("light");
    expect(systemLight.theme).toBe("light");
    expect(systemLight.color).toBe(light.color);
  });
});
