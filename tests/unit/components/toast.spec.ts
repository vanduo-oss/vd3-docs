import { describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useToastStore } from "@vanduo-oss/vue";

describe('useToastStore', () => {
  it('adds a toast to the queue and returns an id', () => {
    setActivePinia(createPinia());
    const store = useToastStore();
    const id = store.show('Saved');
    expect(id).toMatch(/^toast-/);
    expect(store.queue).toHaveLength(1);
    expect(store.queue[0]!.message).toBe('Saved');
  });

  it('dismisses a toast by id', () => {
    setActivePinia(createPinia());
    const store = useToastStore();
    const id = store.show('Bye');
    store.dismiss(id);
    expect(store.queue).toHaveLength(0);
  });
});