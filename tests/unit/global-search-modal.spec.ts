import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import GlobalSearchModal from '@/overlays/GlobalSearchModal.vue';
import { useSearchStore } from '@/stores/search';

/**
 * Interaction test for the command-palette search overlay. The search STORE is
 * unit-tested separately (useGlobalSearch.spec.ts); this exercises the MODAL
 * component itself: the global cmd+k keydown, typing to filter, arrow-key
 * navigation, and the ARIA listbox/option structure the results render into.
 *
 * The component Teleports to <body> and installs a window `keydown` listener in
 * onMounted, so we attach to the real document and dispatch keyboard events on
 * `window`, then query the teleported DOM.
 */
const makeRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/:pathMatch(.*)*', component: { template: '<div />' } }],
  });

const pressKey = (init: KeyboardEventInit): void => {
  window.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, ...init }));
};

describe('GlobalSearchModal', () => {
  it('opens on cmd+k, filters on input, and arrow-navigates the listbox', async () => {
    const pinia = createPinia();
    const wrapper = mount(GlobalSearchModal, {
      global: { plugins: [pinia, makeRouter()] },
      attachTo: document.body,
    });
    const store = useSearchStore(pinia);

    // Closed initially — no results listbox is rendered.
    expect(store.isOpen).toBe(false);
    expect(document.body.querySelector('[role="listbox"]')).toBeNull();

    // Cmd+K opens the modal.
    pressKey({ key: 'k', metaKey: true });
    await wrapper.vm.$nextTick();
    expect(store.isOpen).toBe(true);

    // Type a query into the teleported search input (v-model → store.query).
    const input = document.body.querySelector(
      '.global-search-input',
    ) as HTMLInputElement | null;
    expect(input).not.toBeNull();
    input!.value = 'button';
    input!.dispatchEvent(new Event('input'));
    await wrapper.vm.$nextTick();
    expect(store.query).toBe('button');
    expect(store.ordered.length).toBeGreaterThan(1);

    // Results render as a role=listbox with role=option children.
    const listbox = document.body.querySelector(
      '[role="listbox"]',
    ) as HTMLElement | null;
    expect(listbox).not.toBeNull();
    const options = listbox!.querySelectorAll('[role="option"]');
    expect(options.length).toBe(store.ordered.length);

    // ArrowDown moves the active option; the selected one carries aria-selected.
    expect(store.activeIndex).toBe(0);
    pressKey({ key: 'ArrowDown' });
    await wrapper.vm.$nextTick();
    expect(store.activeIndex).toBe(1);
    expect(listbox!.querySelector('[aria-selected="true"]')).not.toBeNull();

    // Escape closes and clears.
    pressKey({ key: 'Escape' });
    await wrapper.vm.$nextTick();
    expect(store.isOpen).toBe(false);
    expect(store.query).toBe('');

    wrapper.unmount();
  });
});
