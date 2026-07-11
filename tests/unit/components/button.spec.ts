import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdButton } from "@vanduo-oss/vue";

describe('VdButton', () => {
  it('renders with the default primary variant class', () => {
    const wrapper = mount(VdButton, { slots: { default: 'Click me' } });
    expect(wrapper.classes()).toContain('vd-btn');
    expect(wrapper.classes()).toContain('vd-btn-primary');
  });

  it('applies variant class', () => {
    const wrapper = mount(VdButton, {
      props: { variant: 'danger' },
      slots: { default: 'Delete' },
    });
    expect(wrapper.classes()).toContain('vd-btn-danger');
  });

  it('emits click when enabled', async () => {
    const wrapper = mount(VdButton, { slots: { default: 'Save' } });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toHaveLength(1);
  });

  it('does not emit click when disabled', async () => {
    const wrapper = mount(VdButton, {
      props: { disabled: true },
      slots: { default: 'Save' },
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeUndefined();
  });
});