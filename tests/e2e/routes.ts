/**
 * Single source of truth for the routes the visual-parity suite screenshots.
 *
 * Kept in its own Playwright-free module (no `@playwright/test` import) so a
 * plain Vitest unit test can import it and assert it never silently drifts from
 * `src/nav.ts` (see `tests/unit/visual-parity-routes.spec.ts`).
 *
 * `ROUTES` is a representative **superset**: it enumerates every content route
 * `src/nav.ts` registers — the top-level pages, every component/foundation/
 * guide/effect section, AND every cbun-rendering canvas/media/editor route. The
 * cbun pages are safe to baseline because their only non-deterministic bits
 * (Hex's random terrain fill, MusicPlayer's wall-clock event log) fire on user
 * interaction, so the initial page-load render the suite captures is stable.
 */

export interface Route {
  readonly path: string;
  readonly label: string;
}

/**
 * Nav content routes intentionally NOT screenshotted, each with a reason.
 * The drift guard reads this so a deliberate exclusion is explicit rather
 * than a silent gap.
 */
export const VISUAL_PARITY_EXCLUSIONS: ReadonlySet<string> = new Set<string>([
  // Continuous WebGL liquid animation cannot produce two consecutive stable
  // screenshots (Playwright animations:'disabled' only covers CSS).
  "/effects/liquid-gradient",
]);

export const ROUTES: readonly Route[] = [
  { path: '/', label: 'home' },
  { path: '/docs-landing', label: 'docs-landing' },
  { path: '/cbun', label: 'cbun' },
  { path: '/showcase', label: 'showcase' },
  { path: '/about', label: 'about' },
  { path: '/changelog', label: 'changelog' },
  { path: '/core/color-palette', label: 'core-color-palette' },
  { path: '/core/typography', label: 'core-typography' },
  { path: '/core/icons', label: 'core-icons' },
  { path: '/core/golden-ratio', label: 'core-golden-ratio' },
  { path: '/core/grid-system', label: 'core-grid-system' },
  { path: '/core/shadows-glow', label: 'core-shadows-glow' },
  { path: '/components/theme-switcher', label: 'components-theme-switcher' },
  { path: '/components/theme-customizer', label: 'components-theme-customizer' },
  { path: '/components/button', label: 'components-button' },
  { path: '/components/badge', label: 'components-badge' },
  { path: '/components/alert', label: 'components-alert' },
  { path: '/components/card', label: 'components-card' },
  { path: '/components/dropdown', label: 'components-dropdown' },
  { path: '/components/menu', label: 'components-menu' },
  { path: '/components/popover', label: 'components-popover' },
  { path: '/components/doc-search', label: 'components-doc-search' },
  { path: '/components/fab', label: 'components-fab' },
  { path: '/components/ripple', label: 'components-ripple' },
  { path: '/components/expanding-cards', label: 'components-expanding-cards' },
  { path: '/components/spotlight', label: 'components-spotlight' },
  { path: '/components/timeline', label: 'components-timeline' },
  { path: '/components/template', label: 'components-template' },
  { path: '/components/navigation', label: 'components-navigation' },
  { path: '/components/modal', label: 'components-modal' },
  { path: '/components/toast', label: 'components-toast' },
  { path: '/components/tooltip', label: 'components-tooltip' },
  { path: '/components/chip', label: 'components-chip' },
  { path: '/components/skeleton', label: 'components-skeleton' },
  { path: '/components/preloader', label: 'components-preloader' },
  { path: '/components/avatar', label: 'components-avatar' },
  { path: '/components/table', label: 'components-table' },
  { path: '/components/collection', label: 'components-collection' },
  { path: '/components/breadcrumb', label: 'components-breadcrumb' },
  { path: '/components/tabs', label: 'components-tabs' },
  { path: '/components/accordion', label: 'components-accordion' },
  { path: '/components/flow', label: 'components-flow' },
  { path: '/interactive/draggable', label: 'interactive-draggable' },
  { path: '/interactive/search', label: 'interactive-search' },
  { path: '/canvas/charts', label: 'canvas-charts' },
  { path: '/canvas/flowchart', label: 'canvas-flowchart' },
  { path: '/canvas/hex', label: 'canvas-hex' },
  { path: '/canvas/draw', label: 'canvas-draw' },
  { path: '/media/music-player', label: 'media-music-player' },
  { path: '/media/image-box', label: 'media-image-box' },
  { path: '/editors/code-editor', label: 'editors-code-editor' },
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
  { path: '/guides/troubleshooting', label: 'guides-troubleshooting' },
  { path: '/guides/utilities-cheat-sheet', label: 'guides-utilities-cheat-sheet' },
  { path: '/guides/vanduo-ecosystem', label: 'guides-vanduo-ecosystem' },
  { path: '/effects/glass', label: 'effects-glass' },
  { path: '/effects/surfaces', label: 'effects-surfaces' },
  { path: '/effects/morph', label: 'effects-morph' },
  { path: '/effects/parallax', label: 'effects-parallax' },
  { path: '/components/forms', label: 'components-forms' },
  { path: '/components/form-validation', label: 'components-form-validation' },
  { path: '/components/datepicker', label: 'components-datepicker' },
  { path: '/components/timepicker', label: 'components-timepicker' },
  { path: '/components/rating', label: 'components-rating' },
  { path: '/components/switch', label: 'components-switch' },
  { path: '/components/slider', label: 'components-slider' },
  { path: '/components/stepper', label: 'components-stepper' },
  { path: '/components/autocomplete', label: 'components-autocomplete' },
  { path: '/components/transfer', label: 'components-transfer' },
  { path: '/components/tree', label: 'components-tree' },
  { path: '/components/pagination', label: 'components-pagination' },
  { path: '/components/button-groups', label: 'components-button-groups' },
  { path: '/components/progress', label: 'components-progress' },
  { path: '/components/spinner', label: 'components-spinner' },
  { path: '/components/code-snippet', label: 'components-code-snippet' },
  { path: '/components/primitives', label: 'components-primitives' },
  { path: '/components/separator', label: 'components-separator' },
  { path: '/components/sidenav', label: 'components-sidenav' },
  { path: '/components/sticky', label: 'components-sticky' },
  { path: '/components/scrollspy', label: 'components-scrollspy' },
  { path: '/components/offcanvas', label: 'components-offcanvas' },
  { path: '/components/navbar', label: 'components-navbar' },
  { path: '/components/footer', label: 'components-footer' },
];
