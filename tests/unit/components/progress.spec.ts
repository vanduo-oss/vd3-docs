import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdProgress } from "@vanduo-oss/vue";

describe('VdProgress', () => {
  it('sets aria-valuenow to the value', () => {
    const wrapper = mount(VdProgress, { props: { value: 42, max: 100 } });
    expect(wrapper.attributes('aria-valuenow')).toBe('42');
  });

  it('renders indeterminate without aria-valuenow', () => {
    const wrapper = mount(VdProgress, { props: { indeterminate: true } });
    expect(wrapper.attributes('aria-valuenow')).toBeUndefined();
    expect(wrapper.classes()).toContain('is-indeterminate');
  });
});