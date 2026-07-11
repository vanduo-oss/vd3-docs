import { describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSearchStore } from '@/stores/search';

describe('useSearchStore', () => {
  it('returns no results for queries shorter than 2 chars', () => {
    setActivePinia(createPinia());
    const search = useSearchStore();
    search.open();
    search.query = 'b';
    expect(search.results).toHaveLength(0);
  });

  it('matches by section title', () => {
    setActivePinia(createPinia());
    const search = useSearchStore();
    search.open();
    search.query = 'modal';
    expect(search.results.some((r) => r.entry.title === 'Modal')).toBe(true);
  });

  it('matches by keyword', () => {
    setActivePinia(createPinia());
    const search = useSearchStore();
    search.open();
    search.query = 'dialog';
    expect(search.results.some((r) => r.entry.title === 'Modal')).toBe(true);
  });

  it('groups results by category path', () => {
    setActivePinia(createPinia());
    const search = useSearchStore();
    search.open();
    search.query = 'button';
    expect(search.groups.length).toBeGreaterThan(0);
    expect(search.ordered.length).toBe(
      search.groups.reduce((sum, g) => sum + g.results.length, 0),
    );
  });

  it('clears results on close', () => {
    setActivePinia(createPinia());
    const search = useSearchStore();
    search.open();
    search.query = 'but';
    search.close();
    expect(search.isOpen).toBe(false);
    expect(search.query).toBe('');
  });
});
