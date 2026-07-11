import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdStack } from "@vanduo-oss/vue";
import { VdInline } from "@vanduo-oss/vue";

describe('layout primitives', () => {
  it('VdStack applies vd-stack and the data-gap attribute', () => {
    const wrapper = mount(VdStack, {
      props: { gap: 'fib-13' },
      slots: { default: '<p>x</p>' },
    });
    expect(wrapper.classes()).toContain('vd-stack');
    expect(wrapper.attributes('data-gap')).toBe('fib-13');
  });

  it('VdInline applies vd-inline and the data-gap attribute', () => {
    const wrapper = mount(VdInline, {
      props: { gap: 'fib-5' },
      slots: { default: '<span>x</span>' },
    });
    expect(wrapper.classes()).toContain('vd-inline');
    expect(wrapper.attributes('data-gap')).toBe('fib-5');
  });
});