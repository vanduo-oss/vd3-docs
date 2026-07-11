import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdTabs } from "@vanduo-oss/vue";

describe('VdTabs', () => {
  const tabs = [
    { id: 'a', label: 'A' },
    { id: 'b', label: 'B' },
  ];

  it('marks the active tab with aria-selected', () => {
    const wrapper = mount(VdTabs, {
      props: { tabs, modelValue: 'a' },
      slots: { default: '<div>body</div>' },
    });
    const buttons = wrapper.findAll('[role="tab"]');
    expect(buttons[0]!.attributes('aria-selected')).toBe('true');
    expect(buttons[1]!.attributes('aria-selected')).toBe('false');
  });

  it('emits update:modelValue when a tab is clicked', async () => {
    const wrapper = mount(VdTabs, {
      props: { tabs, modelValue: 'a' },
      slots: { default: '<div>body</div>' },
    });
    await wrapper.findAll('[role="tab"]')[1]!.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });
});