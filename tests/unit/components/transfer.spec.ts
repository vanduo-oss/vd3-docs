import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdTransfer } from "@vanduo-oss/vue";

const items = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma' },
];

describe('VdTransfer', () => {
  it('renders all items in the source panel', () => {
    const wrapper = mount(VdTransfer, { props: { items } });
    const panels = wrapper.findAll('.vd-transfer-panel');
    expect(panels[0].findAll('.vd-transfer-item').length).toBe(3);
    expect(panels[1].findAll('.vd-transfer-item').length).toBe(0);
  });

  it('marks a clicked item is-selected and enables the move button', async () => {
    const wrapper = mount(VdTransfer, { props: { items } });
    const item = wrapper.findAll('.vd-transfer-item')[0];
    await item.trigger('click');
    expect(item.classes()).toContain('is-selected');
    const moveRight = wrapper.findAll('.vd-transfer-btn')[0];
    expect(moveRight.attributes('disabled')).toBeUndefined();
  });

  it('moves selected items to the target panel and fires transfer:change', async () => {
    const wrapper = mount(VdTransfer, { props: { items }, attachTo: document.body });
    let detail: { selected: string[]; available: string[] } | null = null;
    wrapper.find('.vd-transfer').element.addEventListener('transfer:change', (e) => {
      detail = (e as CustomEvent).detail;
    });
    await wrapper.findAll('.vd-transfer-item')[0].trigger('click');
    await wrapper.findAll('.vd-transfer-btn')[0].trigger('click');
    const panels = wrapper.findAll('.vd-transfer-panel');
    expect(panels[0].findAll('.vd-transfer-item').length).toBe(2);
    expect(panels[1].findAll('.vd-transfer-item').length).toBe(1);
    expect(detail).toEqual({ selected: ['a'], available: ['b', 'c'] });
    wrapper.unmount();
  });

  it('filters the source list by search text', async () => {
    const wrapper = mount(VdTransfer, { props: { items } });
    const search = wrapper.findAll('.vd-transfer-search input')[0];
    await search.setValue('alp');
    const visible = wrapper.findAll('.vd-transfer-panel')[0].findAll('.vd-transfer-item');
    expect(visible.length).toBe(1);
    expect(visible[0].text()).toContain('Alpha');
  });
});
