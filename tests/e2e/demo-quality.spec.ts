import { test, expect, type Page } from "@playwright/test";

const saved = (page: Page) => page.evaluate(() => ({ ...localStorage }));
const dock = (page: Page) =>
  page.getByRole("navigation", { name: "Site", exact: true });
async function pickDockColor(page: Page, hue: string) {
  await dock(page).getByRole("button", { name: "Choose theme color" }).click();
  await page
    .locator(
      `.vd-theme-customizer-fan.is-open [data-color="${hue}"] .tc-fan-swatch`,
    )
    .click();
}

test("demo fonts, mode, radius and Reset are temporary; dock choices alone survive reload", async ({
  page,
  isMobile,
}) => {
  await page.goto("/components/theme-customizer");
  await dock(page)
    .getByRole("button", { name: /Theme:/ })
    .click(); // System -> Light
  await pickDockColor(page, "violet");
  const before = await saved(page);
  await page.getByRole("button", { name: "open()", exact: true }).click();
  const panel = page.locator(".vd-theme-customizer-panel.is-open");
  await expect(panel).toBeVisible();
  await expect(panel.getByText("Palette", { exact: true })).toHaveCount(0);
  await panel.locator("select").selectOption("jetbrains-mono");
  await panel.getByRole("button", { name: "0.125", exact: true }).click();
  await panel.getByRole("button", { name: "Zinc", exact: true }).click();
  await expect
    .poll(() =>
      page.locator("body").evaluate((el) => getComputedStyle(el).fontFamily),
    )
    .toContain("JetBrains Mono");
  expect(await saved(page)).toEqual(before);
  if (isMobile) await page.keyboard.press("Escape");
  else await page.getByRole("button", { name: "close()", exact: true }).click();
  await dock(page)
    .getByRole("button", { name: /Theme:/ })
    .click(); // saved Dark, preserve temporary font
  await pickDockColor(page, "teal");
  const committed = await saved(page);
  expect(committed["vanduo-theme-preference"]).toBe("dark");
  expect(committed["vanduo-font-preference"]).toBe("nunito");
  expect(committed["vanduo-radius"]).toBe("0.5");
  expect(committed["vanduo-neutral-color"]).toBe("charcoal");
  await page.getByRole("button", { name: "open()", exact: true }).click();
  await panel.getByRole("button", { name: "Reset to Defaults" }).click();
  expect(await saved(page)).toEqual(committed);
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).toHaveAttribute("data-primary", "teal");
  await expect(page.locator("html")).toHaveAttribute("data-font", "nunito");
  await expect(page.locator("html")).toHaveAttribute("data-radius", "0.5");
  await expect(page.locator("html")).toHaveAttribute(
    "data-neutral",
    "charcoal",
  );
  await expect
    .poll(() =>
      page.locator("body").evaluate((el) => getComputedStyle(el).fontFamily),
    )
    .toContain("Nunito");
});

test("demo theme menu changes the page without overwriting the saved dock mode", async ({
  page,
}) => {
  await page.goto("/components/theme-switcher");
  const before = await saved(page);
  await page
    .locator("#theme-switcher")
    .getByRole("button", { name: "Theme: System", exact: true })
    .first()
    .click();
  await page.getByRole("menuitemradio", { name: "Dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(await saved(page)).toEqual(before);
  await expect(
    dock(page).getByRole("button", { name: /Theme: Dark/ }),
  ).toBeVisible();
});

test("hovering a dock swatch changes only the preview", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Hover is a desktop interaction");
  await page.goto("/components/theme-customizer");
  await pickDockColor(page, "blue");
  const before = await saved(page);
  await dock(page).getByRole("button", { name: "Choose theme color" }).click();
  await page
    .locator(
      '.vd-theme-customizer-fan.is-open [data-color="red"] .tc-fan-swatch',
    )
    .hover();
  await expect(page.locator("html")).toHaveAttribute("data-primary", "red");
  expect(await saved(page)).toEqual(before);
  await page.keyboard.press("Escape");
  await expect(page.locator("html")).toHaveAttribute("data-primary", "blue");
});

test("dock accent follows hue, labels stay neutral, miniature brands cannot morph", async ({
  page,
}) => {
  await page.goto("/components/dock");
  await page.getByRole("button", { name: "violet", exact: true }).click();
  await page.getByRole("button", { name: "accent", exact: true }).click();
  const stage = page.locator("[data-dock-playground]");
  const color = () =>
    stage
      .locator(".vd-dock-item.is-active > i")
      .evaluate((el) => getComputedStyle(el).color);
  const label = await stage
    .locator(".vd-dock-item.is-active .vd-dock-label")
    .evaluate((el) => getComputedStyle(el).color);
  const violet = await color();
  await page.getByRole("button", { name: "orange", exact: true }).click();
  await expect.poll(color).not.toBe(violet);
  expect(
    await stage
      .locator(".vd-dock-item.is-active .vd-dock-label")
      .evaluate((el) => getComputedStyle(el).color),
  ).toBe(label);
  const mini = page.locator(".dock-stage-sm .vd-dock");
  await expect(mini).toHaveCount(10);
  for (const item of await mini.all()) {
    const brand = item.locator(".vd-dock-brand");
    await expect(brand).toHaveAttribute("aria-disabled", "true");
    await brand.click({ force: true });
    await expect(item).toHaveClass(/is-horizontal/);
    await expect(item).not.toHaveClass(/is-square|is-vertical/);
  }
});

test("footer columns share a row on desktop and stack on mobile; copyright spans all", async ({
  page,
}) => {
  await page.goto("/components/footer");
  const geometry = await page
    .locator("main .vd-footer")
    .first()
    .evaluate((el) => ({
      width: el.getBoundingClientRect().width,
      bottomSpace:
        el.getBoundingClientRect().bottom -
        el.querySelector(".vd-footer-copyright")!.getBoundingClientRect()
          .bottom,
      copyright: el
        .querySelector(".vd-footer-copyright")!
        .getBoundingClientRect().width,
      sections: [...el.querySelectorAll(".vd-footer-section")].map((s) => ({
        x: s.getBoundingClientRect().x,
        y: s.getBoundingClientRect().y,
        width: s.getBoundingClientRect().width,
      })),
    }));
  expect(geometry.bottomSpace).toBeGreaterThanOrEqual(8);
  await page
    .locator(".demo-footer-container")
    .first()
    .screenshot({ path: test.info().outputPath("footer-review.png") });
  if (page.viewportSize()!.width >= 768) {
    expect(new Set(geometry.sections.map((s) => Math.round(s.y))).size).toBe(1);
    expect(new Set(geometry.sections.map((s) => Math.round(s.x))).size).toBe(3);
    expect(geometry.copyright).toBeGreaterThan(
      geometry.sections[0].width * 2.5,
    );
  } else {
    expect(new Set(geometry.sections.map((s) => Math.round(s.x))).size).toBe(1);
    expect(new Set(geometry.sections.map((s) => Math.round(s.y))).size).toBe(3);
  }
});

test("Navbar closes without horizontal overflow and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/components/navbar");
  const nav = page.locator("main .vd-navbar").first();
  const button = nav.getByRole("button", { name: "Toggle navigation" });
  await expect(nav.locator(".vd-navbar-menu")).toBeHidden();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
  await expect(nav.locator(".vd-navbar-menu")).toBeHidden();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await button.click();
  await nav.getByRole("link", { name: "Docs", exact: true }).click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 1200, height: 900 });
  await expect(
    nav.getByRole("link", { name: "Docs", exact: true }),
  ).toBeVisible();
});

test("gradient separator follows primary and theme and supports labels/vertical", async ({
  page,
}) => {
  await page.goto("/components/separator");
  const demo = page.locator("#demo-separator-gradient");
  const gradient = demo.locator("hr").first();
  const appearance = () =>
    gradient.evaluate((el) => ({
      image: getComputedStyle(el).backgroundImage,
      height: el.getBoundingClientRect().height,
      width: el.getBoundingClientRect().width,
    }));
  const initial = await appearance();
  expect(initial.height).toBe(3);
  expect(initial.width).toBe(80);
  await pickDockColor(page, "violet");
  await expect
    .poll(async () => (await appearance()).image)
    .not.toBe(initial.image);
  await expect(demo.locator('[aria-orientation="vertical"]')).toBeVisible();
  await expect(demo.getByText("OR", { exact: true })).toBeVisible();
  const color = (await appearance()).image;
  await dock(page)
    .getByRole("button", { name: /Theme:/ })
    .click();
  await dock(page)
    .getByRole("button", { name: /Theme:/ })
    .click();
  await expect.poll(async () => (await appearance()).image).not.toBe(color);
  await page.goto("/about");
  await expect(
    page.locator(".about-divider.vd-separator-gradient"),
  ).toHaveCount(4);
});

test("popover buttons support keyboard activation and dismissal", async ({
  page,
}) => {
  await page.goto("/components/popover", { waitUntil: "networkidle" });
  const trigger = page.getByRole("button", { name: "Auto flip", exact: true });
  const panel = page.locator("#demo-follow-auto");
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(panel).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await trigger.focus();
  await page.keyboard.press("Space");
  await expect(panel).toBeVisible();
  await page
    .getByRole("heading", { name: "Popover", exact: false })
    .first()
    .click();
  await expect(panel).toBeHidden();
});
