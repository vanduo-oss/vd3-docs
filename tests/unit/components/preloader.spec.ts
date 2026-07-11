import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdPreloader } from "@vanduo-oss/vue";

describe('VdPreloader', () => {
  it('renders container and spinner', () => {
    const wrapper = mount(VdPreloader);
    expect(wrapper.find('.vd-preloader-container').exists()).toBe(true);
    expect(wrapper.find('.vd-preloader').exists()).toBe(true);
    expect(wrapper.find('.vd-preloader-spinner').exists()).toBe(true);
  });

  it('applies variant class', () => {
    const wrapper = mount(VdPreloader, { props: { variant: 'success' } });
    expect(wrapper.find('.vd-preloader').classes()).toContain(
      'vd-preloader-success',
    );
  });

  it('renders text when provided', () => {
    const wrapper = mount(VdPreloader, { props: { text: 'Loading…' } });
    expect(wrapper.find('.vd-preloader-text').text()).toBe('Loading…');
  });

  it('applies theme class', () => {
    const wrapper = mount(VdPreloader, { props: { theme: 'dark' } });
    expect(wrapper.find('.vd-preloader-container').classes()).toContain(
      'vd-preloader-dark',
    );
  });
});
