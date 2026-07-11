import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdSidenav } from "@vanduo-oss/vue";

describe('VdSidenav', () => {
  it('does not render when modelValue is false', () => {
    const wrapper = mount(VdSidenav, {
      props: { modelValue: false },
      slots: { default: 'Body' },
      attachTo: document.body,
    });
    expect(document.body.querySelector('.vd-sidenav')).toBeNull();
    wrapper.unmount();
  });

  it('renders with is-open class when modelValue is true', async () => {
    const wrapper = mount(VdSidenav, {
      props: { modelValue: true, title: 'Menu' },
      slots: { default: '<p>Body</p>' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const sidenav = document.body.querySelector('aside.vd-sidenav');
    expect(sidenav).not.toBeNull();
    expect(sidenav?.classList.contains('is-open')).toBe(true);
    wrapper.unmount();
  });

  it('emits update:modelValue false on close button', async () => {
    const wrapper = mount(VdSidenav, {
      props: { modelValue: true, title: 'Menu' },
      slots: { default: 'Body' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const closeBtn = document.body.querySelector(
      '.vd-sidenav-close',
    ) as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false]);
    wrapper.unmount();
  });

  it('applies placement class', async () => {
    const wrapper = mount(VdSidenav, {
      props: { modelValue: true, placement: 'right' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const sidenav = document.body.querySelector('aside.vd-sidenav');
    expect(sidenav?.classList.contains('vd-sidenav-right')).toBe(true);
    wrapper.unmount();
  });

  it('does not render overlay when closed', async () => {
    const wrapper = mount(VdSidenav, {
      props: { modelValue: false },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.vd-sidenav-overlay')).toBeNull();
    wrapper.unmount();
  });
});
