import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdSelect } from "@vanduo-oss/vue";

const options = [
  { value: 'a', label: 'Apple' },
  { value: 'b', label: 'Banana' },
  { value: 'c', label: 'Cherry' },
];

describe('VdSelect', () => {
  it('renders all options', () => {
    const wrapper = mount(VdSelect, {
      props: { modelValue: 'a', options },
    });
    expect(wrapper.findAll('option').length).toBe(3);
  });

  it('marks the model value as selected', () => {
    const wrapper = mount(VdSelect, {
      props: { modelValue: 'b', options },
    });
    const select = wrapper.find('select').element as HTMLSelectElement;
    expect(select.value).toBe('b');
  });

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(VdSelect, {
      props: { modelValue: 'a', options },
    });
    const select = wrapper.find('select');
    await select.setValue('c');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['c']);
  });

  it('renders placeholder option when provided', () => {
    const wrapper = mount(VdSelect, {
      props: { modelValue: '', options, placeholder: 'Pick one' },
    });
    expect(wrapper.find('option').text()).toBe('Pick one');
  });
});
