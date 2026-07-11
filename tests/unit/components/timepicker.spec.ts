import { describe, expect, it, beforeAll, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { useTimepicker } from "@vanduo-oss/vue";

const makeHarness = (attrs: string) =>
  defineComponent({
    setup() {
      const root = ref<HTMLElement | null>(null);
      useTimepicker(root);
      return { root };
    },
    template: `<div ref="root"><input id="tp" class="vd-input" ${attrs} /></div>`,
  });

describe('useTimepicker', () => {
  beforeAll(() => {
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });
  });

  it('opens a body-appended popup of 30-minute slots on focus (48 slots)', async () => {
    const wrapper = mount(makeHarness('data-vd-timepicker'), {
      attachTo: document.body,
    });
    await wrapper.find('#tp').trigger('focus');
    const popup = document.querySelector('.vd-timepicker-popup.is-open');
    expect(popup).not.toBeNull();
    expect(popup?.querySelectorAll('.vd-timepicker-item').length).toBe(48);
    expect(popup?.querySelector('.vd-timepicker-item')?.textContent).toBe(
      '12:00 AM',
    );
    wrapper.unmount();
  });

  it('honours the 24h format and step interval', async () => {
    const wrapper = mount(
      makeHarness('data-vd-timepicker data-vd-timepicker-format="24h" data-vd-timepicker-step="15"'),
      { attachTo: document.body },
    );
    await wrapper.find('#tp').trigger('focus');
    const items = document.querySelectorAll('.vd-timepicker-popup.is-open .vd-timepicker-item');
    expect(items.length).toBe(96); // 24h * 4 per hour
    expect(items[0].textContent).toBe('00:00');
    expect(items[1].textContent).toBe('00:15');
    wrapper.unmount();
  });

  it('writes the chosen time and fires timepicker:select with { time, hours, minutes }', async () => {
    const wrapper = mount(makeHarness('data-vd-timepicker data-vd-timepicker-format="24h"'), {
      attachTo: document.body,
    });
    const input = wrapper.find('#tp').element as HTMLInputElement;
    let detail: { time: string; hours: number; minutes: number } | null = null;
    input.addEventListener('timepicker:select', (e) => {
      detail = (e as CustomEvent).detail;
    });
    await wrapper.find('#tp').trigger('focus');
    // second slot = 00:30
    const second = document.querySelectorAll<HTMLElement>('.vd-timepicker-item')[1];
    second.click();
    expect(input.value).toBe('00:30');
    expect(detail).toEqual({ time: '00:30', hours: 0, minutes: 30 });
    wrapper.unmount();
  });
});
