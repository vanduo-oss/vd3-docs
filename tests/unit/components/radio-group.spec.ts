import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdRadioGroup } from "@vanduo-oss/vue";

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

describe('VdRadioGroup', () => {
  it('renders all options', () => {
    const wrapper = mount(VdRadioGroup, {
      props: { options, modelValue: 'a', name: 'r' },
    });
    expect(wrapper.findAll('.vd-form-radio').length).toBe(2);
  });

  it('checks the modelValue', () => {
    const wrapper = mount(VdRadioGroup, {
      props: { options, modelValue: 'b', name: 'r' },
    });
    const inputs = wrapper.findAll<HTMLInputElement>('input[type="radio"]');
    expect(inputs[0].element.checked).toBe(false);
    expect(inputs[1].element.checked).toBe(true);
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(VdRadioGroup, {
      props: { options, modelValue: 'a', name: 'r' },
    });
    const inputs = wrapper.findAll<HTMLInputElement>('input[type="radio"]');
    await inputs[1].setValue(true);
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['b']);
  });
});
