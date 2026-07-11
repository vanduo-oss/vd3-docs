import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdOffcanvas } from "@vanduo-oss/vue";

describe('VdOffcanvas', () => {
  it('does not render when modelValue is false', () => {
    const wrapper = mount(VdOffcanvas, {
      props: { modelValue: false },
      attachTo: document.body,
    });
    expect(document.body.querySelector('.vd-offcanvas')).toBeNull();
    wrapper.unmount();
  });

  it('renders with is-open when modelValue is true', async () => {
    const wrapper = mount(VdOffcanvas, {
      props: { modelValue: true, title: 'Panel' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const panel = document.body.querySelector('aside.vd-offcanvas');
    expect(panel).not.toBeNull();
    expect(panel?.classList.contains('is-open')).toBe(true);
    wrapper.unmount();
  });

  it('emits update:modelValue false on close button', async () => {
    const wrapper = mount(VdOffcanvas, {
      props: { modelValue: true, title: 'Panel' },
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

  it('defaults to right placement', async () => {
    const wrapper = mount(VdOffcanvas, {
      props: { modelValue: true, title: 'Panel' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const panel = document.body.querySelector('aside.vd-offcanvas');
    expect(panel?.classList.contains('vd-offcanvas-right')).toBe(true);
    wrapper.unmount();
  });

  it('does not render overlay when closed', async () => {
    const wrapper = mount(VdOffcanvas, {
      props: { modelValue: false },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('.vd-sidenav-overlay')).toBeNull();
    wrapper.unmount();
  });
});
