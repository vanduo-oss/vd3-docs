import { test, expect } from '@playwright/test';

interface Route {
  readonly path: string;
  readonly label: string;
}

const ROUTES: readonly Route[] = [
  { path: '/', label: 'home' },
  { path: '/about', label: 'about' },
  { path: '/changelog', label: 'changelog' },
  { path: '/kilo-oss', label: 'kilo-oss' },
  { path: '/docs-landing', label: 'docs-landing' },
  { path: '/components/button', label: 'components-button' },
  { path: '/components/badge', label: 'components-badge' },
  { path: '/components/alert', label: 'components-alert' },
  { path: '/components/card', label: 'components-card' },
  { path: '/components/modal', label: 'components-modal' },
  { path: '/components/toast', label: 'components-toast' },
  { path: '/components/tooltip', label: 'components-tooltip' },
  { path: '/components/tabs', label: 'components-tabs' },
  { path: '/components/accordion', label: 'components-accordion' },
  { path: '/components/flow', label: 'components-flow' },
  { path: '/components/progress', label: 'components-progress' },
  { path: '/components/spinner', label: 'components-spinner' },
  { path: '/components/code-snippet', label: 'components-code-snippet' },
  { path: '/components/icon', label: 'components-icon' },
  { path: '/components/sidenav', label: 'components-sidenav' },
  { path: '/components/sticky', label: 'components-sticky' },
  { path: '/components/scrollspy', label: 'components-scrollspy' },
  { path: '/components/offcanvas', label: 'components-offcanvas' },
  { path: '/components/navbar', label: 'components-navbar' },
  { path: '/components/footer', label: 'components-footer' },
  { path: '/components/avatar', label: 'components-avatar' },
  { path: '/components/table', label: 'components-table' },
  { path: '/components/collection', label: 'components-collection' },
  { path: '/components/breadcrumb', label: 'components-breadcrumb' },
  { path: '/components/chip', label: 'components-chip' },
  { path: '/components/skeleton', label: 'components-skeleton' },
  { path: '/components/preloader', label: 'components-preloader' },
  { path: '/components/doc-search', label: 'components-doc-search' },
  { path: '/components/forms', label: 'components-forms' },
  { path: '/components/form-validation', label: 'components-form-validation' },
  { path: '/components/datepicker', label: 'components-datepicker' },
  { path: '/components/timepicker', label: 'components-timepicker' },
  { path: '/components/rating', label: 'components-rating' },
  { path: '/components/stepper', label: 'components-stepper' },
  { path: '/components/autocomplete', label: 'components-autocomplete' },
  { path: '/components/transfer', label: 'components-transfer' },
  { path: '/components/tree', label: 'components-tree' },
  { path: '/components/pagination', label: 'components-pagination' },
  { path: '/components/button-groups', label: 'components-button-groups' },
  { path: '/core/color-palette', label: 'core-color-palette' },
  { path: '/core/typography', label: 'core-typography' },
  { path: '/core/icons', label: 'core-icons' },
  { path: '/core/golden-ratio', label: 'core-golden-ratio' },
  { path: '/core/grid-system', label: 'core-grid-system' },
  { path: '/core/shadows-glow', label: 'core-shadows-glow' },
  { path: '/effects/glass', label: 'effects-glass' },
  { path: '/effects/morph', label: 'effects-morph' },
  { path: '/effects/parallax', label: 'effects-parallax' },
  { path: '/components/theme-switcher', label: 'components-theme-switcher' },
  { path: '/components/theme-customizer', label: 'components-theme-customizer' },
  { path: '/guides/getting-started', label: 'guides-getting-started' },
  { path: '/guides/first-layout', label: 'guides-first-layout' },
  { path: '/guides/framework-integration', label: 'guides-framework-integration' },
  { path: '/guides/runtime-architecture', label: 'guides-runtime-architecture' },
  { path: '/guides/lazy-loading', label: 'guides-lazy-loading' },
  { path: '/guides/css-variables', label: 'guides-css-variables' },
  { path: '/guides/theme-customizer', label: 'guides-theme-customizer' },
  { path: '/guides/fibonacci', label: 'guides-fibonacci' },
  { path: '/guides/accessibility', label: 'guides-accessibility' },
  { path: '/guides/security', label: 'guides-security' },
  { path: '/guides/production', label: 'guides-production' },
  { path: '/guides/migration', label: 'guides-migration' },
  { path: '/guides/troubleshooting', label: 'guides-troubleshooting' },
  { path: '/guides/utilities-cheat-sheet', label: 'guides-utilities-cheat-sheet' },
  { path: '/guides/vanduo-ecosystem', label: 'guides-vanduo-ecosystem' },
];

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
