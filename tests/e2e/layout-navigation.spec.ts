import { test, expect } from '@playwright/test';

// These drawers (sidenav / offcanvas) slide via `transform: translate(...)`,
// so the closed panel is off-screen but NOT display:none — Playwright still
// counts it "visible". The canonical open/closed signal is the `.is-open`
// state class (mirrored from the framework), which is what we assert here.

test.describe('VdSidenav interaction', () => {
  test('opens, is labelled, and closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/components/sidenav', { waitUntil: 'networkidle' });

    const trigger = page.getByRole('button', { name: 'Open Sidenav' }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.locator('aside.vd-sidenav').first();
    await expect(dialog).toHaveClass(/is-open/);
    await expect(dialog).toHaveAttribute('aria-label', 'Menu');
    await expect(dialog).toBeInViewport();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveClass(/is-open/);
  });

  test('closes on backdrop click', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/components/sidenav', { waitUntil: 'networkidle' });

    await page.getByRole('button', { name: 'Open Sidenav' }).first().click();
    const dialog = page.locator('aside.vd-sidenav').first();
    await expect(dialog).toHaveClass(/is-open/);

    // The composable appends a single overlay to <body> while open.
    await page.locator('.vd-sidenav-overlay').first().click();
    await expect(dialog).not.toHaveClass(/is-open/);
  });
});

test.describe('VdOffcanvas interaction', () => {
  test('right panel opens on trigger and closes on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/components/offcanvas', { waitUntil: 'networkidle' });

    const trigger = page.getByRole('button', { name: 'Right' }).first();
    await expect(trigger).toBeVisible();
    await trigger.click();

    // Target the specific right-hand panel (the page renders four panels).
    const dialog = page.locator('#offcanvas-right-demo');
    await expect(dialog).toHaveClass(/is-open/);
    await expect(dialog).toBeInViewport();

    await page.keyboard.press('Escape');
    await expect(dialog).not.toHaveClass(/is-open/);
  });
});

test.describe('VdSticky interaction', () => {
  test('renders an affix element', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/components/sticky', { waitUntil: 'networkidle' });
    // The demo pins a nav via the canonical `.vd-affix` + [data-vd-affix] API.
    const affix = page.locator('.vd-affix[data-vd-affix]').first();
    await expect(affix).toBeVisible();
  });
});

test.describe('VdWaypoint interaction', () => {
  test('renders the scrollspy nav and observed sections', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/components/scrollspy', { waitUntil: 'networkidle' });

    const nav = page.locator('[data-vd-waypoint-nav]').first();
    await expect(nav).toBeVisible();

    // Sections live in the scroll container the nav observes.
    const sections = page.locator('#waypoint-demo-scroll [id]');
    await expect(sections.first()).toBeVisible();
    expect(await sections.count()).toBeGreaterThan(1);
  });
});
