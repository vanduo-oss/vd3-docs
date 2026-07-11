import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdAvatar } from "@vanduo-oss/vue";

describe('VdAvatar', () => {
  it('renders initials when no src provided', () => {
    const wrapper = mount(VdAvatar, {
      props: { initials: 'JD' },
    });
    expect(wrapper.text()).toContain('JD');
    expect(wrapper.find('.vd-avatar-initials').exists()).toBe(true);
  });

  it('renders img when src provided', () => {
    const wrapper = mount(VdAvatar, {
      props: { src: '/avatar.png', alt: 'User' },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe('/avatar.png');
    expect(img.attributes('alt')).toBe('User');
  });

  it('applies size variant shape classes', () => {
    const wrapper = mount(VdAvatar, {
      props: { size: 'lg', variant: 'success', shape: 'rounded' },
    });
    expect(wrapper.classes()).toContain('vd-avatar-lg');
    expect(wrapper.classes()).toContain('vd-avatar-success');
    expect(wrapper.classes()).toContain('vd-avatar-rounded');
  });

  it('renders status indicator when status prop is set', () => {
    const wrapper = mount(VdAvatar, {
      props: { status: 'online' },
    });
    const status = wrapper.find('.vd-avatar-status');
    expect(status.exists()).toBe(true);
    expect(status.classes()).toContain('vd-avatar-status-online');
  });
});
