import { describe, expect, it } from 'vitest';
import { ROUTES, VISUAL_PARITY_EXCLUSIONS } from '../e2e/routes';
import { nav, flattenNav } from '@/nav';

/**
 * Drift guard: the visual-parity ROUTES list (tests/e2e/routes.ts) is the single
 * enumerated screenshot set, and src/nav.ts is the single source of truth for
 * routes. This test fails the moment a new page is registered in nav.ts but not
 * added to ROUTES (or explicitly excluded), so visual coverage can never
 * silently regress the way it had — every cbun-rendering route and ~16
 * first-party pages were previously missing.
 */
describe('visual-parity ROUTES vs nav', () => {
  const routePaths = new Set(ROUTES.map((r) => r.path));

  /** Every content route nav registers: top-level pages + all tab sections. */
  const navRoutes = [
    ...nav.pages.map((p) => p.route),
    ...flattenNav(nav).map((s) => s.route),
  ];

  it('screenshots every nav content route (or explicitly excludes it)', () => {
    const uncovered = navRoutes.filter(
      (route) => !routePaths.has(route) && !VISUAL_PARITY_EXCLUSIONS.has(route),
    );
    expect(
      uncovered,
      `these src/nav.ts routes are neither in ROUTES nor in ` +
        `VISUAL_PARITY_EXCLUSIONS (tests/e2e/routes.ts):\n` +
        uncovered.map((r) => `  ${r}`).join('\n'),
    ).toEqual([]);
  });

  it('has no duplicate or unlabeled ROUTES entries', () => {
    expect(routePaths.size).toBe(ROUTES.length);
    for (const route of ROUTES) {
      expect(route.path).toMatch(/^\//);
      expect(route.label.length).toBeGreaterThan(0);
    }
    const labels = new Set(ROUTES.map((r) => r.label));
    expect(labels.size).toBe(ROUTES.length);
  });

  it('every ROUTES path resolves to a real nav route (no stale paths)', () => {
    const navRouteSet = new Set(navRoutes);
    const orphans = ROUTES.map((r) => r.path).filter(
      (p) => !navRouteSet.has(p),
    );
    expect(
      orphans,
      `ROUTES paths not registered in src/nav.ts:\n` +
        orphans.map((r) => `  ${r}`).join('\n'),
    ).toEqual([]);
  });

  it('every exclusion names a real nav route (no stale exclusions)', () => {
    const navRouteSet = new Set(navRoutes);
    for (const excluded of VISUAL_PARITY_EXCLUSIONS) {
      expect(navRouteSet.has(excluded), `stale exclusion: ${excluded}`).toBe(
        true,
      );
    }
  });
});
