import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Accessibility smoke gate. Runs axe-core (WCAG 2.0/2.1 A + AA) over a curated
// set of ~10 routes, one per page archetype (home, a plain component page, a
// form-heavy page, a guide, a canvas/ecosystem page, a media page, the
// changelog, the two theme pages, and a foundations page). Each route must
// have ZERO `serious`/`critical` axe violations EXCEPT the rules in
// `ALLOWLISTED_RULES` below. `minor`/`moderate` findings are logged but never
// fail the gate.
//
// ── Why an allow-list ────────────────────────────────────────────────────────
// The a11y audit uncovered serious violations that live BELOW this repo — in
// the linked `@vanduo-oss/vd3` design-system tokens or in global docs theming —
// and cannot be remediated from vd3-docs without either editing the read-only
// vd3 packages or globally restyling the site (which would also invalidate the
// freshly-captured visual-parity baselines). Those are recorded here as tracked
// findings and allow-listed so the gate still fails on any OTHER serious/
// critical regression (and on these same rules appearing via NEW nodes is still
// visible in the logs). Each entry is a real defect to fix in a follow-up:
//
//   • color-contrast (serious) — vd3 component tokens (`.vd-btn-secondary`,
//     `.vd-btn-info`, `.vd-badge-info`, `.vd-badge-outline`, `.vd-chip`, …), the
//     highlight.js syntax theme, and `.color-swatch-name` labels don't meet the
//     4.5:1 AA text ratio; several also sit on translucent `.vd-glass`/`.vd-card-glow`
//     surfaces. Fixing means adjusting vd3 tokens / the docs syntax theme.
//   • link-in-text-block (serious) — inline prose links (e.g. links to
//     `color-palette`, `migration`, `charts`) are distinguishable from body text
//     by colour alone (no underline, <3:1 colour delta). Fixing means a global
//     docs prose-link style change.
//   • nested-interactive (serious) — the home page "philosophy" flip-cards are
//     `role="button"` cards that contain a nested `RouterLink` ("Read the
//     guide"). Fixing means restructuring that widget (a design change).
//
// The docs-owned `aria-required-children` (critical) findings — an empty
// `role="listbox"` in GlobalSearchModal and a `role="tablist"` with no
// `role="tab"` children in DocCodeSnippet — were REAL and have been FIXED in
// this change, so that rule stays fully enforced here.

interface Route {
  readonly path: string;
  readonly label: string;
}

const ROUTES: readonly Route[] = [
  { path: '/', label: 'home' },
  { path: '/components/button', label: 'components-button' },
  { path: '/components/forms', label: 'components-forms' },
  { path: '/guides/getting-started', label: 'guides-getting-started' },
  { path: '/canvas/charts', label: 'canvas-charts' },
  { path: '/media/music-player', label: 'media-music-player' },
  { path: '/changelog', label: 'changelog' },
  { path: '/components/theme-customizer', label: 'components-theme-customizer' },
  { path: '/components/theme-switcher', label: 'components-theme-switcher' },
  { path: '/core/color-palette', label: 'core-color-palette' },
];

const BLOCKING_IMPACTS = new Set(['serious', 'critical']);

// Known, tracked design-system / global-theme findings (see header). These are
// reported (logged) but do not fail the gate; every other serious/critical rule
// does.
const ALLOWLISTED_RULES = new Set([
  'color-contrast',
  'link-in-text-block',
  'nested-interactive',
]);

test.describe('Accessibility smoke', () => {
  for (const route of ROUTES) {
    test(`${route.path} has no serious/critical axe violations`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route.path, { waitUntil: 'networkidle' });

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      const seriousOrCritical = results.violations.filter((v) =>
        BLOCKING_IMPACTS.has(v.impact ?? ''),
      );

      const allowlisted = seriousOrCritical.filter((v) =>
        ALLOWLISTED_RULES.has(v.id),
      );
      const blocking = seriousOrCritical.filter(
        (v) => !ALLOWLISTED_RULES.has(v.id),
      );
      const advisory = results.violations.filter(
        (v) => !BLOCKING_IMPACTS.has(v.impact ?? ''),
      );

      const describe = (list: typeof results.violations): string =>
        list
          .map((v) => `${v.id} (${v.impact}, ${v.nodes.length} node(s))`)
          .join(', ');

      if (allowlisted.length > 0) {
        // Tracked, allow-listed findings — surfaced for visibility only.
        console.log(`[a11y tracked]  ${route.path}: ${describe(allowlisted)}`);
      }
      if (advisory.length > 0) {
        console.log(`[a11y advisory] ${route.path}: ${describe(advisory)}`);
      }

      const summary = blocking.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => n.target).flat(),
      }));

      expect(
        summary,
        `unexpected serious/critical axe violations on ${route.path}:\n` +
          JSON.stringify(summary, null, 2),
      ).toEqual([]);
    });
  }
});
