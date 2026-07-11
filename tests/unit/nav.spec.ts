import { describe, expect, it } from 'vitest';
import { nav, flattenNav } from '@/nav';

describe('nav', () => {
  it('exposes top-level pages and at least one tab', () => {
    expect(nav.pages.length).toBeGreaterThan(0);
    expect(nav.tabs.length).toBeGreaterThan(0);
  });

  it('every page has a route and a title', () => {
    for (const page of nav.pages) {
      expect(page.route).toMatch(/^\//);
      expect(page.title.length).toBeGreaterThan(0);
    }
  });

  it('every section has a unique id and route', () => {
    const sections = flattenNav(nav);
    const ids = new Set<string>();
    const routes = new Set<string>();
    for (const section of sections) {
      expect(ids.has(section.id)).toBe(false);
      expect(routes.has(section.route)).toBe(false);
      ids.add(section.id);
      routes.add(section.route);
    }
  });
});