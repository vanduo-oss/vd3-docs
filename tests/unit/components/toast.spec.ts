import { beforeEach, describe, expect, it } from 'vitest';
import { useToastStore } from "@vanduo-oss/vd3";

// vd3's toast queue is a module-level singleton (BREAKING vs the old Pinia
// store: no per-test `createPinia()` reset), so drain the shared queue before
// each test to isolate state.
beforeEach(() => {
  useToastStore().queue.splice(0);
});

describe('useToastStore', () => {
  it('adds a toast to the queue and returns an id', () => {
    const store = useToastStore();
    const id = store.show('Saved');
    expect(id).toMatch(/^toast-/);
    expect(store.queue).toHaveLength(1);
    expect(store.queue[0]!.message).toBe('Saved');
  });

  it('dismisses a toast by id', () => {
    const store = useToastStore();
    const id = store.show('Bye');
    store.dismiss(id);
    expect(store.queue).toHaveLength(0);
  });
});
