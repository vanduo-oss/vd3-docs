import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdAccordion } from "@vanduo-oss/vue";

describe('VdAccordion', () => {
  const items = [
    { id: 'one', title: 'One', content: 'First' },
    { id: 'two', title: 'Two', content: 'Second' },
  ];

  it('opens the active item', () => {
    const wrapper = mount(VdAccordion, {
      props: { items, modelValue: 'one', exclusive: true },
    });
    const expanded = wrapper.findAll('[aria-expanded="true"]');
    expect(expanded).toHaveLength(1);
    expect(expanded[0]!.text()).toContain('One');
  });

  it('exclusive mode closes previous on new click', async () => {
    const wrapper = mount(VdAccordion, {
      props: { items, modelValue: 'one', exclusive: true },
    });
    await wrapper.findAll('button.vd-accordion-header')[1]!.trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['two']);
  });
});