import { test, expect } from '@playwright/test';

test.describe('Fibonacci Motion System', () => {
  test('navigates to /core/motion and displays duration ladder', async ({ page }) => {
    await page.goto('/core/motion');

    // Heading exists
    await expect(page.locator('h5.demo-title')).toContainText('Motion');

    // Fibonacci timing highlights
    await expect(page.locator('.motion-sequence-highlight')).toContainText('55ms');
    await expect(page.locator('.motion-sequence-highlight')).toContainText('987ms');

    // Duration ladder elements
    const ladderRows = page.locator('.motion-ladder-row');
    await expect(ladderRows).toHaveCount(7);
  });

  test('toggles motion modes and updates data-motion attribute', async ({ page }) => {
    await page.goto('/core/motion');

    // Default mode has no data-motion attribute (or 'auto')
    const htmlEl = page.locator('html');

    // Click 'reduce' button in the live motion controller
    const reduceBtn = page.getByRole('button', { name: 'reduce', exact: true });
    await reduceBtn.click();
    await expect(htmlEl).toHaveAttribute('data-motion', 'reduce');

    // Click 'off' button
    const offBtn = page.getByRole('button', { name: 'off', exact: true });
    await offBtn.click();
    await expect(htmlEl).toHaveAttribute('data-motion', 'off');

    // Click 'full' button
    const fullBtn = page.getByRole('button', { name: 'full', exact: true });
    await fullBtn.click();
    await expect(htmlEl).toHaveAttribute('data-motion', 'full');

    // Click 'auto' button -> attribute removed
    const autoBtn = page.getByRole('button', { name: 'auto', exact: true });
    await autoBtn.click();
    await expect(htmlEl).not.toHaveAttribute('data-motion');
  });

  test('interactively expands and collapses with VdExpandTransition', async ({ page }) => {
    await page.goto('/core/motion');

    const toggleBtn = page.getByRole('button', { name: /Collapse panel|Expand panel/ });
    await expect(toggleBtn).toBeVisible();

    const expandContent = page.locator('.demo-expand-content');
    await expect(expandContent).toBeVisible();

    // Collapse
    await toggleBtn.click();
    await expect(expandContent).not.toBeVisible();

    // Expand again
    await toggleBtn.click();
    await expect(expandContent).toBeVisible();
  });

  test('morphs Oola Dock through square waypoint between edges', async ({ page }) => {
    await page.goto('/components/dock');

    const dock = page.locator('[data-dock-playground] .vd-dock');
    await expect(dock).toBeVisible();
    await expect(dock).toHaveClass(/vd-dock-edge-bottom/);

    // Click 'left' chip in playground Place controls
    const leftChip = page.locator('.dock-play-chips button', { hasText: 'left' });
    await leftChip.click();

    // Verify dock transitions to left edge
    await expect(dock).toHaveClass(/vd-dock-edge-left/, { timeout: 3000 });
    await expect(dock).toHaveClass(/is-vertical/);
  });
});

