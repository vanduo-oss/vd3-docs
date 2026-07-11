import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdChip } from "@vanduo-oss/vue";

describe('VdChip', () => {
  it('renders slot content', () => {
    const wrapper = mount(VdChip, {
      slots: { default: 'Hello' },
    });
    expect(wrapper.text()).toContain('Hello');
  });

  it('applies variant and size classes', () => {
    const wrapper = mount(VdChip, {
      props: { variant: 'success', size: 'lg' },
      slots: { default: 'X' },
    });
    expect(wrapper.classes()).toContain('vd-chip-success');
    expect(wrapper.classes()).toContain('vd-chip-lg');
  });

  it('renders dismiss button when dismissible is true', () => {
    const wrapper = mount(VdChip, {
      props: { dismissible: true },
      slots: { default: 'X' },
    });
    expect(wrapper.find('.vd-chip-close').exists()).toBe(true);
    expect(wrapper.classes()).toContain('vd-chip-dismissible');
  });

  it('emits dismiss when close button clicked', async () => {
    const wrapper = mount(VdChip, {
      props: { dismissible: true },
      slots: { default: 'X' },
    });
    await wrapper.find('.vd-chip-close').trigger('click');
    expect(wrapper.emitted('dismiss')).toBeDefined();
  });
});
