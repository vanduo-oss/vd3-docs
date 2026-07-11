import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdCollection } from "@vanduo-oss/vue";

const items = [
  { id: 1, title: 'Item one', subtitle: 'A' },
  { id: 2, title: 'Item two' },
];

describe('VdCollection', () => {
  it('renders items', () => {
    const wrapper = mount(VdCollection, { props: { items } });
    expect(wrapper.text()).toContain('Item one');
    expect(wrapper.text()).toContain('Item two');
  });

  it('renders header when provided', () => {
    const wrapper = mount(VdCollection, { props: { header: 'My List', items } });
    expect(wrapper.find('.vd-collection-header').exists()).toBe(true);
    expect(wrapper.text()).toContain('My List');
  });

  it('applies hoverable and bordered classes', () => {
    const wrapper = mount(VdCollection, {
      props: { items, hoverable: true, bordered: true },
    });
    expect(wrapper.classes()).toContain('vd-collection-hoverable');
    expect(wrapper.classes()).toContain('vd-collection-bordered');
  });

  it('renders action text per item', () => {
    const wrapper = mount(VdCollection, {
      props: {
        items: [{ id: 1, title: 'X', action: 'View' }],
      },
    });
    expect(wrapper.find('.vd-collection-action').text()).toBe('View');
  });
});
