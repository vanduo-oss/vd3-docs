import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdInput } from "@vanduo-oss/vue";

describe('VdInput', () => {
  it('renders an input with the model value', () => {
    const wrapper = mount(VdInput, {
      props: { modelValue: 'hello' },
    });
    const input = wrapper.find('input');
    expect((input.element as HTMLInputElement).value).toBe('hello');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(VdInput, {
      props: { modelValue: '' },
    });
    const input = wrapper.find('input');
    await input.setValue('world');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world']);
  });

  it('applies size and variant classes', () => {
    const wrapper = mount(VdInput, {
      props: { modelValue: '', size: 'lg', variant: 'danger' },
    });
    const input = wrapper.find('input');
    expect(input.classes()).toContain('vd-input-lg');
    expect(input.classes()).toContain('vd-input-danger');
  });

  it('is disabled when prop is set', () => {
    const wrapper = mount(VdInput, {
      props: { modelValue: '', disabled: true },
    });
    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });
});
