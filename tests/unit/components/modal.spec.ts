import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdModal } from "@vanduo-oss/vue";

describe('VdModal', () => {
  it('does not render when open is false', () => {
    const wrapper = mount(VdModal, {
      props: { open: false },
      slots: { default: 'Body' },
      attachTo: document.body,
    });
    expect(document.body.querySelector('[data-vd-modal]')).toBeNull();
    wrapper.unmount();
  });

  it('renders when open is true', async () => {
    const wrapper = mount(VdModal, {
      props: { open: true },
      slots: { default: 'Body' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    expect(document.body.querySelector('[data-vd-modal]')).not.toBeNull();
    wrapper.unmount();
  });

  it('emits update:open with false on close', async () => {
    const wrapper = mount(VdModal, {
      props: { open: true, title: 'Hello' },
      slots: { default: 'Body' },
      attachTo: document.body,
    });
    await wrapper.vm.$nextTick();
    const closeBtn = document.body.querySelector('[aria-label="Close"]') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false]);
    wrapper.unmount();
  });
});