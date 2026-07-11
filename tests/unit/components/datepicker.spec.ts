import { describe, expect, it, beforeAll, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { useDatepicker } from "@vanduo-oss/vue";

const Harness = defineComponent({
  props: { value: { type: String, default: '' }, format: { type: String, default: '' } },
  setup() {
    const root = ref<HTMLElement | null>(null);
    useDatepicker(root);
    return { root };
  },
  template: `
    <div ref="root">
      <div class="vd-suggest-wrapper">
        <input
          id="dp"
          class="vd-input"
          :value="value"
          data-vd-datepicker
          :data-vd-datepicker-format="format || undefined"
          readonly
        />
      </div>
    </div>
  `,
});

describe('useDatepicker', () => {
  beforeAll(() => {
    // jsdom lacks rAF in some setups; make it synchronous and deterministic
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  it('opens a calendar popup on focus showing the selected month', async () => {
    const wrapper = mount(Harness, {
      props: { value: '01/15/2026', format: 'MM/DD/YYYY' },
      attachTo: document.body,
    });
    await wrapper.find('#dp').trigger('focus');
    const popup = document.querySelector('.vd-datepicker-popup.is-open');
    expect(popup).not.toBeNull();
    expect(popup?.querySelector('.vd-datepicker-title')?.textContent).toBe(
      'January 2026',
    );
    // the pre-selected day is marked
    expect(popup?.querySelector('[data-vd-date="2026-01-15"]')?.classList.contains('is-selected')).toBe(true);
    wrapper.unmount();
  });

  it('writes the picked date back in the configured format and fires datepicker:select', async () => {
    const wrapper = mount(Harness, {
      props: { value: '01/15/2026', format: 'MM/DD/YYYY' },
      attachTo: document.body,
    });
    const input = wrapper.find('#dp').element as HTMLInputElement;
    let detail: { formatted: string } | null = null;
    input.addEventListener('datepicker:select', (e) => {
      detail = (e as CustomEvent).detail;
    });
    await wrapper.find('#dp').trigger('focus');
    const dayBtn = document.querySelector<HTMLButtonElement>('[data-vd-date="2026-01-20"]');
    dayBtn?.click();
    expect(input.value).toBe('01/20/2026');
    expect(detail).toMatchObject({ formatted: '01/20/2026' });
    wrapper.unmount();
  });

  it('disables out-of-range days under min/max constraints', async () => {
    const DisabledHarness = defineComponent({
      setup() {
        const root = ref<HTMLElement | null>(null);
        useDatepicker(root);
        return { root };
      },
      template: `
        <div ref="root">
          <div class="vd-suggest-wrapper">
            <input id="dp2" class="vd-input"
              data-vd-datepicker
              data-vd-datepicker-min="2026-05-10"
              data-vd-datepicker-max="2026-05-20"
              readonly />
          </div>
        </div>
      `,
    });
    const wrapper = mount(DisabledHarness, { attachTo: document.body });
    await wrapper.find('#dp2').trigger('focus');
    const popup = document.querySelector('.vd-datepicker-popup');
    // view snapped to May 2026; day 5 is before min and disabled, day 15 selectable
    expect(popup?.querySelector('[data-vd-date="2026-05-05"]')?.classList.contains('is-disabled')).toBe(true);
    expect(popup?.querySelector('[data-vd-date="2026-05-15"]')?.classList.contains('is-disabled')).toBe(false);
    wrapper.unmount();
  });
});
