import { test, expect } from '@playwright/test';
import { ROUTES } from './routes';

// The enumerated route list lives in ./routes.ts (a Playwright-free module) so a
// Vitest unit test can import it and assert it never silently drifts from
// src/nav.ts. See tests/unit/visual-parity-routes.spec.ts.

test.describe('Visual parity', () => {
  for (const route of ROUTES) {
    test(`vd3 ${route.path} baseline`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route.path, { waitUntil: 'networkidle' });
      await expect(page).toHaveScreenshot(`vd3-${route.label}.png`, {
        maxDiffPixelRatio: 0.03,
        animations: 'disabled',
      });
    });
  }
});
