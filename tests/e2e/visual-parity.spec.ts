import { test, expect } from '@playwright/test';

interface Route {
  readonly vd2Path: string;
  readonly label: string;
}

const ROUTES: readonly Route[] = [
  { vd2Path: '/', label: 'home' },
  { vd2Path: '/about', label: 'about' },
  { vd2Path: '/changelog', label: 'changelog' },
  { vd2Path: '/kilo-oss', label: 'kilo-oss' },
  { vd2Path: '/docs-landing', label: 'docs-landing' },
  { vd2Path: '/components/button', label: 'components-button' },
  { vd2Path: '/components/badge', label: 'components-badge' },
  { vd2Path: '/components/alert', label: 'components-alert' },
  { vd2Path: '/components/card', label: 'components-card' },
  { vd2Path: '/components/modal', label: 'components-modal' },
  { vd2Path: '/components/toast', label: 'components-toast' },
  { vd2Path: '/components/tooltip', label: 'components-tooltip' },
  { vd2Path: '/components/tabs', label: 'components-tabs' },
  { vd2Path: '/components/accordion', label: 'components-accordion' },
  { vd2Path: '/components/flow', label: 'components-flow' },
  { vd2Path: '/components/progress', label: 'components-progress' },
  { vd2Path: '/components/spinner', label: 'components-spinner' },
  { vd2Path: '/components/code-snippet', label: 'components-code-snippet' },
  { vd2Path: '/components/icon', label: 'components-icon' },
  { vd2Path: '/components/sidenav', label: 'components-sidenav' },
  { vd2Path: '/components/sticky', label: 'components-sticky' },
  { vd2Path: '/components/scrollspy', label: 'components-scrollspy' },
  { vd2Path: '/components/offcanvas', label: 'components-offcanvas' },
  { vd2Path: '/components/navbar', label: 'components-navbar' },
  { vd2Path: '/components/footer', label: 'components-footer' },
  { vd2Path: '/components/avatar', label: 'components-avatar' },
  { vd2Path: '/components/table', label: 'components-table' },
  { vd2Path: '/components/collection', label: 'components-collection' },
  { vd2Path: '/components/breadcrumb', label: 'components-breadcrumb' },
  { vd2Path: '/components/chip', label: 'components-chip' },
  { vd2Path: '/components/skeleton', label: 'components-skeleton' },
  { vd2Path: '/components/preloader', label: 'components-preloader' },
  { vd2Path: '/components/forms', label: 'components-forms' },
  { vd2Path: '/components/form-validation', label: 'components-form-validation' },
  { vd2Path: '/components/datepicker', label: 'components-datepicker' },
  { vd2Path: '/components/timepicker', label: 'components-timepicker' },
  { vd2Path: '/components/rating', label: 'components-rating' },
  { vd2Path: '/components/stepper', label: 'components-stepper' },
  { vd2Path: '/components/autocomplete', label: 'components-autocomplete' },
  { vd2Path: '/components/transfer', label: 'components-transfer' },
  { vd2Path: '/components/tree', label: 'components-tree' },
  { vd2Path: '/components/pagination', label: 'components-pagination' },
  { vd2Path: '/components/button-groups', label: 'components-button-groups' },
  { vd2Path: '/core/color-palette', label: 'core-color-palette' },
  { vd2Path: '/core/typography', label: 'core-typography' },
  { vd2Path: '/core/icons', label: 'core-icons' },
  { vd2Path: '/core/golden-ratio', label: 'core-golden-ratio' },
  { vd2Path: '/core/grid-system', label: 'core-grid-system' },
  { vd2Path: '/core/shadows-glow', label: 'core-shadows-glow' },
  { vd2Path: '/effects/glass', label: 'effects-glass' },
  { vd2Path: '/effects/morph', label: 'effects-morph' },
  { vd2Path: '/effects/parallax', label: 'effects-parallax' },
  { vd2Path: '/components/theme-switcher', label: 'components-theme-switcher' },
  { vd2Path: '/components/theme-customizer', label: 'components-theme-customizer' },
  { vd2Path: '/guides/getting-started', label: 'guides-getting-started' },
  { vd2Path: '/guides/first-layout', label: 'guides-first-layout' },
  { vd2Path: '/guides/framework-integration', label: 'guides-framework-integration' },
  { vd2Path: '/guides/runtime-architecture', label: 'guides-runtime-architecture' },
  { vd2Path: '/guides/lazy-loading', label: 'guides-lazy-loading' },
  { vd2Path: '/guides/css-variables', label: 'guides-css-variables' },
  { vd2Path: '/guides/theme-customizer', label: 'guides-theme-customizer' },
  { vd2Path: '/guides/fibonacci', label: 'guides-fibonacci' },
  { vd2Path: '/guides/accessibility', label: 'guides-accessibility' },
  { vd2Path: '/guides/security', label: 'guides-security' },
  { vd2Path: '/guides/production', label: 'guides-production' },
  { vd2Path: '/guides/migration', label: 'guides-migration' },
  { vd2Path: '/guides/troubleshooting', label: 'guides-troubleshooting' },
  { vd2Path: '/guides/utilities-cheat-sheet', label: 'guides-utilities-cheat-sheet' },
  { vd2Path: '/guides/vanduo-ecosystem', label: 'guides-vanduo-ecosystem' },
];

test.describe('Visual parity', () => {
  for (const route of ROUTES) {
    test(`vd2 ${route.vd2Path} baseline regression`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route.vd2Path, { waitUntil: 'networkidle' });
      await expect(page).toHaveScreenshot(`vd2-${route.label}.png`, {
        maxDiffPixelRatio: 0.03,
        animations: 'disabled',
      });
    });
  }
});
