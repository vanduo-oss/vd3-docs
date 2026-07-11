import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdPagination } from "@vanduo-oss/vue";

describe('VdPagination', () => {
  it('renders prev and next items', () => {
    const wrapper = mount(VdPagination, {
      props: { modelValue: 1, total: 5 },
    });
    expect(wrapper.find('.vd-pagination-prev').exists()).toBe(true);
    expect(wrapper.find('.vd-pagination-next').exists()).toBe(true);
  });

  it('renders ellipsis for large totals', () => {
    const wrapper = mount(VdPagination, {
      props: { modelValue: 10, total: 20, maxVisible: 7 },
    });
    expect(wrapper.find('.vd-pagination-ellipsis').exists()).toBe(true);
  });

  it('marks the active page with .active and aria-current', () => {
    const wrapper = mount(VdPagination, {
      props: { modelValue: 3, total: 5 },
    });
    const active = wrapper.find('.vd-pagination-item.active');
    expect(active.text()).toBe('3');
    expect(active.find('.vd-pagination-link').attributes('aria-current')).toBe(
      'page',
    );
  });

  it('disables prev on the first page', () => {
    const wrapper = mount(VdPagination, {
      props: { modelValue: 1, total: 5 },
    });
    expect(wrapper.find('.vd-pagination-prev').classes()).toContain('disabled');
  });

  it('emits update:modelValue and dispatches pagination:change on click', async () => {
    const wrapper = mount(VdPagination, {
      props: { modelValue: 2, total: 5 },
      attachTo: document.body,
    });
    let detail: { page: number; totalPages: number } | null = null;
    wrapper.find('nav').element.addEventListener('pagination:change', (e) => {
      detail = (e as CustomEvent).detail;
    });
    await wrapper.find('.vd-pagination-next .vd-pagination-link').trigger('click');
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([3]);
    expect(detail).toEqual({ page: 3, totalPages: 5 });
    wrapper.unmount();
  });
});
