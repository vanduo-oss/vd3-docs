import { test, expect, type Locator } from "@playwright/test";

/** Brand clicks are ignored while the dock is morphing — wait for settle. */
async function cycleDockTo(
  dock: Locator,
  brand: Locator,
  edge: "bottom" | "left" | "top" | "right",
): Promise<void> {
  await expect(dock).not.toHaveClass(/is-morphing/, { timeout: 5000 });
  await brand.click();
  await expect(dock).toHaveClass(new RegExp(`vd-dock-edge-${edge}`), {
    timeout: 5000,
  });
  await expect(dock).not.toHaveClass(/is-morphing/, { timeout: 5000 });
}

test.describe("Site Oola dock chrome", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
      window.localStorage.removeItem("vd3-docs-site-dock");
    });
  });

  test("renders site dock with nav and actions on home", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const dock = page.locator("nav.vd-site-dock.vd-dock-fixed").first();
    await expect(dock).toBeVisible();
    await expect(dock).toHaveClass(/vd-dock-edge-bottom/);
    await expect(dock).toHaveClass(/vd-dock-items-inline/);
    await expect(dock).toHaveCSS("--vd-dock-radius", "1.5rem");
    const home = dock.getByRole("button", { name: "Home" });
    const docs = dock.getByRole("button", { name: "Docs" });
    await expect(home).toBeVisible();
    await expect(docs).toBeVisible();
    await expect(home).toHaveAttribute("data-tooltip", "Home");
    await expect(home).toHaveAttribute("data-tooltip-placement", "top");
    await expect(home).toHaveAttribute("data-tooltip-variant", "glass");
    await expect(
      dock.getByRole("button", { name: "Open global search" }),
    ).toBeVisible();
    await expect(
      dock.getByRole("button", { name: "Open theme customizer" }),
    ).toBeVisible();

    await home.hover();
    const tooltip = page.locator(".vd-tooltip.vd-tooltip-top").first();
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText("Home");
  });

  test("Docs item navigates to docs landing", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page
      .locator("nav.vd-site-dock")
      .getByRole("button", { name: "Docs" })
      .click();
    await expect(page).toHaveURL(/\/docs-landing/);
    await expect(
      page.getByRole("navigation", { name: "Resources" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Resources" }).getByText("About"),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Resources" }).getByText("GitHub"),
    ).toBeVisible();
  });

  test("brand click cycles four dock edges", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const dock = page.locator("nav.vd-site-dock.vd-dock-fixed").first();
    const brand = dock.locator("button.vd-dock-brand").first();
    await expect(dock).toHaveClass(/vd-dock-edge-bottom/);

    await cycleDockTo(dock, brand, "left");
    await cycleDockTo(dock, brand, "top");
    await cycleDockTo(dock, brand, "right");
    await cycleDockTo(dock, brand, "bottom");
  });

  test("vertical dock stacks actions, keeps brand bottom, and clears content", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const dock = page.locator("nav.vd-site-dock.vd-dock-fixed").first();
    const brand = dock.locator("button.vd-dock-brand").first();
    const search = dock.getByRole("button", { name: "Open global search" });
    const theme = dock.locator("button.vd-theme-switcher-toggle").first();
    const customizer = dock.getByRole("button", {
      name: "Open theme customizer",
    });

    const assertVerticalChrome = async (side: "left" | "right") => {
      await expect(dock).toHaveClass(new RegExp(`vd-dock-edge-${side}`));
      await expect(dock).toHaveClass(/is-vertical/);
      await expect(dock).toHaveClass(/vd-dock-items-stack/);

      const searchBox = await search.boundingBox();
      const themeBox = await theme.boundingBox();
      const customizerBox = await customizer.boundingBox();
      const brandBox = await brand.boundingBox();
      const dockBox = await dock.boundingBox();
      expect(searchBox).toBeTruthy();
      expect(themeBox).toBeTruthy();
      expect(customizerBox).toBeTruthy();
      expect(brandBox).toBeTruthy();
      expect(dockBox).toBeTruthy();

      // Actions form a vertical column (Y increases down the stack).
      expect(themeBox!.y).toBeGreaterThan(searchBox!.y + 4);
      expect(customizerBox!.y).toBeGreaterThan(themeBox!.y + 4);

      // Brand stays at the bottom of the vertical pill.
      expect(brandBox!.y).toBeGreaterThan(customizerBox!.y + 4);

      // Content box must clear the fixed dock (pad tokens ≈ thickness + inset + gap).
      const cleared = await page.evaluate((edge) => {
        const dockEl = document.querySelector("nav.vd-site-dock");
        const mainEl = document.querySelector("#main-content");
        if (!(dockEl instanceof HTMLElement) || !(mainEl instanceof HTMLElement)) {
          return false;
        }
        const dockRect = dockEl.getBoundingClientRect();
        const mainRect = mainEl.getBoundingClientRect();
        const style = getComputedStyle(mainEl);
        const padLeft = Number.parseFloat(style.paddingLeft);
        const padRight = Number.parseFloat(style.paddingRight);
        if (edge === "left") {
          return mainRect.left + padLeft >= dockRect.right - 1;
        }
        return mainRect.right - padRight <= dockRect.left + 1;
      }, side);
      expect(cleared).toBe(true);
    };

    await cycleDockTo(dock, brand, "left");
    await assertVerticalChrome("left");

    // Short-axis thickness matches docs --vd-dock-height (macOS-style 6.75rem).
    const thickness = await dock.evaluate((el) => {
      const rem = Number.parseFloat(
        getComputedStyle(document.documentElement).fontSize,
      );
      const box = el.getBoundingClientRect();
      return {
        actual: box.width,
        expected: 6.75 * rem,
      };
    });
    expect(thickness.actual).toBeGreaterThan(thickness.expected - 4);
    expect(thickness.actual).toBeLessThan(thickness.expected + 4);

    await cycleDockTo(dock, brand, "top");
    await cycleDockTo(dock, brand, "right");
    await assertVerticalChrome("right");
  });

  test("horizontal top dock keeps brand on the left", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const dock = page.locator("nav.vd-site-dock.vd-dock-fixed").first();
    const brand = dock.locator("button.vd-dock-brand").first();
    const search = dock.getByRole("button", { name: "Open global search" });

    await cycleDockTo(dock, brand, "left");
    await cycleDockTo(dock, brand, "top");
    await expect(dock).toHaveClass(/is-horizontal/);

    const brandBox = await brand.boundingBox();
    const searchBox = await search.boundingBox();
    expect(brandBox).toBeTruthy();
    expect(searchBox).toBeTruthy();
    expect(brandBox!.x).toBeLessThan(searchBox!.x - 4);
  });

  test("search action opens the global search modal", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page
      .locator("nav.vd-site-dock")
      .getByRole("button", { name: "Open global search" })
      .click();
    await expect(page.locator(".global-search-modal.is-open")).toBeVisible();
  });

  test("brand mark spins on hover and spins fast while morphing", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const dock = page.locator("nav.vd-site-dock.vd-dock-fixed").first();
    const brand = dock.locator("button.vd-dock-brand").first();
    const spin = brand.locator(".vd3-mark-spin").first();

    await expect(spin).toHaveCSS("animation-play-state", "paused");

    await brand.hover();
    await expect(spin).toHaveCSS("animation-play-state", "running");
    const hoverName = await spin.evaluate(
      (el) => getComputedStyle(el).animationName,
    );
    expect(hoverName).toContain("vd-site-dock-brand-spin");

    // Leave hover so morph fast-spin is not conflated with :hover.
    await page.mouse.move(0, 0);
    await expect(spin).toHaveCSS("animation-play-state", "paused");

    await expect(dock).not.toHaveClass(/is-morphing/, { timeout: 5000 });
    await brand.click({ force: true });
    await expect(dock).toHaveClass(/is-morphing/, { timeout: 2000 });

    const morphSpin = await spin.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        playState: style.animationPlayState,
        durationMs: Number.parseFloat(style.animationDuration) * 1000,
        name: style.animationName,
      };
    });
    expect(morphSpin.playState).toBe("running");
    expect(morphSpin.name).toContain("vd-site-dock-brand-spin");
    // Fast morph target is 0.9s; allow a little tolerance while transitioning.
    expect(morphSpin.durationMs).toBeLessThan(2000);
    expect(morphSpin.durationMs).toBeGreaterThan(400);

    await expect(dock).not.toHaveClass(/is-morphing/, { timeout: 5000 });
  });
});
