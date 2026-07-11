import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdCheckboxGroup } from "@vanduo-oss/vue";

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
];

describe('VdCheckboxGroup', () => {
  it('renders all options', () => {
    const wrapper = mount(VdCheckboxGroup, {
      props: { options, modelValue: [], name: 'test' },
    });
    expect(wrapper.findAll('.vd-form-check').length).toBe(3);
  });

  it('checks the values that are in modelValue', () => {
    const wrapper = mount(VdCheckboxGroup, {
      props: { options, modelValue: ['a', 'c'], name: 'test' },
    });
    const inputs = wrapper.findAll<HTMLInputElement>('input[type="checkbox"]');
    expect(inputs[0].element.checked).toBe(true);
    expect(inputs[1].element.checked).toBe(false);
    expect(inputs[2].element.checked).toBe(true);
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(VdCheckboxGroup, {
      props: { options, modelValue: [], name: 'test' },
    });
    const inputs = wrapper.findAll<HTMLInputElement>('input[type="checkbox"]');
    await inputs[0].setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['a']]);
  });

  it('applies inline class when inline prop is true', () => {
    const wrapper = mount(VdCheckboxGroup, {
      props: { options, modelValue: [], name: 'test', inline: true },
    });
    expect(wrapper.find('.vd-form-check-group').classes()).toContain(
      'vd-form-check-group-inline',
    );
  });
});
