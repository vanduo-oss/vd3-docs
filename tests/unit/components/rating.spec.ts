import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdRating } from "@vanduo-oss/vue";

describe('VdRating', () => {
  it('renders 5 stars by default', () => {
    const wrapper = mount(VdRating, {
      props: { modelValue: 3 },
    });
    expect(wrapper.findAll('.vd-rating-star').length).toBe(5);
  });

  it('renders custom max stars', () => {
    const wrapper = mount(VdRating, {
      props: { modelValue: 2, max: 7 },
    });
    expect(wrapper.findAll('.vd-rating-star').length).toBe(7);
  });

  it('emits update:modelValue on click', async () => {
    const wrapper = mount(VdRating, {
      props: { modelValue: 2 },
    });
    const stars = wrapper.findAll('.vd-rating-star');
    await stars[3].trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([4]);
  });

  it('does not emit when readonly', async () => {
    const wrapper = mount(VdRating, {
      props: { modelValue: 3, readonly: true },
    });
    const stars = wrapper.findAll('.vd-rating-star');
    await stars[0].trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeUndefined();
  });
});
