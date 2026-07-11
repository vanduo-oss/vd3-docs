import { describe, expect, it, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { useSuggest } from "@vanduo-oss/vue";

const Harness = defineComponent({
  setup() {
    const root = ref<HTMLElement | null>(null);
    useSuggest(root);
    return { root };
  },
  template: `
    <div ref="root">
      <div class="vd-suggest-wrapper">
        <input id="sg" class="vd-input" data-vd-suggest='["Apple","Apricot","Banana"]' />
      </div>
    </div>
  `,
});

describe('useSuggest', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('filters items (debounced) and highlights the matched substring', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Harness, { attachTo: document.body });
    const input = wrapper.find('#sg');
    (input.element as HTMLInputElement).value = 'ap';
    await input.trigger('input');
    vi.advanceTimersByTime(250);
    const list = wrapper.find('.vd-suggest-list');
    expect(list.classes()).toContain('is-open');
    const items = wrapper.findAll('.vd-suggest-item');
    expect(items.length).toBe(2); // Apple, Apricot
    expect(items[0].find('.vd-suggest-match').text().toLowerCase()).toBe('ap');
    wrapper.unmount();
  });

  it('selects an item on click and fires suggest:select', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Harness, { attachTo: document.body });
    const inputEl = wrapper.find('#sg').element as HTMLInputElement;
    let detail: { value: string } | null = null;
    inputEl.addEventListener('suggest:select', (e) => {
      detail = (e as CustomEvent).detail;
    });
    inputEl.value = 'ban';
    await wrapper.find('#sg').trigger('input');
    vi.advanceTimersByTime(250);
    await wrapper.findAll('.vd-suggest-item')[0].trigger('click');
    expect(inputEl.value).toBe('Banana');
    expect(detail).toMatchObject({ value: 'Banana' });
    wrapper.unmount();
  });
});
