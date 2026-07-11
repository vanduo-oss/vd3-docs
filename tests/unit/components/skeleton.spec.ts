import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdSkeleton } from "@vanduo-oss/vue";

describe('VdSkeleton', () => {
  it('renders text variant by default', () => {
    const wrapper = mount(VdSkeleton);
    expect(wrapper.find('.vd-skeleton-text').exists()).toBe(true);
  });

  it('renders card variant', () => {
    const wrapper = mount(VdSkeleton, { props: { shape: 'card' } });
    expect(wrapper.find('.vd-skeleton-card').exists()).toBe(true);
  });

  it('renders circle variant', () => {
    const wrapper = mount(VdSkeleton, { props: { shape: 'circle' } });
    expect(wrapper.find('.vd-skeleton-circle').exists()).toBe(true);
  });

  it('renders multiple lines', () => {
    const wrapper = mount(VdSkeleton, {
      props: { shape: 'text', lines: 3 },
    });
    const lines = wrapper.findAll('.vd-skeleton-text');
    expect(lines.length).toBe(3);
  });
});
