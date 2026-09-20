import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function openNavigation(page: Page) {
  const toggle = page.getByRole("button", {
    name: "Toggle navigation",
    exact: true,
  });
  if (
    (await toggle.isVisible()) &&
    (await toggle.getAttribute("aria-expanded")) !== "true"
  )
    await toggle.click();
}

async function navigate(page: Page, path: string) {
  await openNavigation(page);
  // Scrolling must not incidentally hover a different lazy link under the old
  // pointer position. The destination still gets a real click (or touch tap).
  await page.mouse.move(0, 0);
  const link = page.locator(`.doc-nav-link[href="${path}"]`);
  if (test.info().project.use.hasTouch) await link.tap();
  else await link.click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/components/button");
  await expect(page.locator("html")).toHaveAttribute(
    "data-vd-hydrated",
    "true",
  );
  await openNavigation(page);
});

test("lightweight pages navigate without fetching JavaScript or CSS", async ({
  page,
}) => {
  const requests: string[] = [];
  await page.route(/\/assets\/.*\.(js|css)$/, (route) => {
    requests.push(route.request().url());
    return route.abort();
  });
  for (const slug of [
    "badge",
    "alert",
    "card",
    "dropdown",
    "tabs",
    "accordion",
    "avatar",
    "tooltip",
    "breadcrumb",
    "chip",
    "progress",
    "spinner",
    "separator",
    "switch",
    "button",
  ]) {
    await navigate(page, `/components/${slug}`);
    await expect(page).toHaveURL(new RegExp(`/components/${slug}$`));
    await expect(page.locator(".doc-content > section")).toBeVisible();
  }
  expect(requests).toEqual([]);
  await expect(
    page.getByRole("progressbar", { name: "Loading page" }),
  ).toHaveCount(0);
});

test("slow navigation keeps the old article and shows pending feedback until loaded", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let release!: () => void;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route(/\/assets\/Modal-[^/]+\.js$/, async (route) => {
    await gate;
    await route.continue();
  });
  try {
    await navigate(page, "/components/modal");
    await expect(page.locator(".doc-nav-link[data-pending]")).toHaveAttribute(
      "href",
      "/components/modal",
    );
    await expect(
      page.getByRole("progressbar", { name: "Loading page" }),
    ).toBeVisible();
    await expect(page.locator("#main-content")).toHaveAttribute(
      "aria-busy",
      "true",
    );
    await expect(page.locator(".doc-content #buttons")).toBeVisible();
    await expect(page.locator(".doc-nav-pending")).toHaveCSS(
      "animation-name",
      "none",
    );
    expect(
      await page
        .locator(".doc-navigation-progress")
        .evaluate((el) => getComputedStyle(el, "::after").animationName),
    ).toBe("none");
    await page.screenshot({ path: testInfo.outputPath("pending.png") });
    const accessibility = await new AxeBuilder({ page })
      .include(".doc-navigation-progress")
      .analyze();
    expect(accessibility.violations).toEqual([]);
  } finally {
    release();
  }
  await expect(page).toHaveURL(/\/components\/modal$/);
  await expect(page.locator(".doc-nav-link[data-pending]")).toHaveCount(0);
  await expect(
    page.getByRole("progressbar", { name: "Loading page" }),
  ).toHaveCount(0);
  await expect(page.locator("#main-content")).not.toHaveAttribute("aria-busy");
});

test("failed lazy navigation provides a reload link and clears on a successful navigation", async ({
  page,
}, testInfo) => {
  await page.route(/\/assets\/Modal-[^/]+\.js$/, (route) => route.abort());
  await navigate(page, "/components/modal");
  await expect(page.locator(".doc-navigation-error")).toBeVisible();
  await expect(page.locator(".doc-navigation-error a")).toHaveAttribute(
    "href",
    "/components/modal",
  );
  await expect(page.locator(".doc-nav-link[data-pending]")).toHaveCount(0);
  await page.screenshot({ path: testInfo.outputPath("error.png") });
  const accessibility = await new AxeBuilder({ page })
    .include(".doc-navigation-error")
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await navigate(page, "/components/badge");
  await expect(page).toHaveURL(/\/components\/badge$/);
  await expect(page.locator(".doc-navigation-error")).toHaveCount(0);
});

test("keyboard focus prefetches a lazy route without changing content or announcing loading", async ({
  page,
}) => {
  const response = page.waitForResponse(/\/assets\/Modal-[^/]+\.js$/);
  await page.locator('.doc-nav-link[href="/components/modal"]').focus();
  await response;
  await expect(page).toHaveURL(/\/components\/button$/);
  await expect(page.locator(".doc-nav-link[data-pending]")).toHaveCount(0);
  await page.locator('.doc-nav-link[href="/components/modal"]').press("Enter");
  await expect(page).toHaveURL(/\/components\/modal$/);
});

test("rapid navigation keeps feedback attached to the latest destination", async ({
  page,
}) => {
  let releaseModal!: () => void;
  let releaseMenu!: () => void;
  const modal = new Promise<void>((resolve) => {
    releaseModal = resolve;
  });
  const menu = new Promise<void>((resolve) => {
    releaseMenu = resolve;
  });
  await page.route(/\/assets\/Modal-[^/]+\.js$/, async (route) => {
    await modal;
    await route.continue();
  });
  await page.route(/\/assets\/Menu-[^/]+\.js$/, async (route) => {
    await menu;
    await route.continue();
  });
  try {
    await navigate(page, "/components/modal");
    await navigate(page, "/components/menu");
    releaseModal();
    await expect(page.locator(".doc-nav-link[data-pending]")).toHaveAttribute(
      "href",
      "/components/menu",
    );
    await expect(
      page.getByRole("progressbar", { name: "Loading page" }),
    ).toBeVisible();
  } finally {
    releaseModal();
    releaseMenu();
  }
  await expect(page).toHaveURL(/\/components\/menu$/);
  await expect(page.locator(".doc-nav-link[data-pending]")).toHaveCount(0);
});
