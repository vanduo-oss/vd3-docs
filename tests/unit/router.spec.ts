import { describe, expect, it } from 'vitest';
import { buildRoutes } from '@/router';
import { nav, flattenNav } from '@/nav';

describe('router', () => {
  it('buildRoutes emits one route per page plus one per section', () => {
    const routes = buildRoutes();
    const sectionCount = flattenNav(nav).length;
    expect(routes.length).toBe(nav.pages.length + sectionCount + 2);
  });

  it('every route has a meta.title', () => {
    const routes = buildRoutes();
    for (const route of routes) {
      expect(route.meta?.title).toBeTypeOf('string');
    }
  });
});