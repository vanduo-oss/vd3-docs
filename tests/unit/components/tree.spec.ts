import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdTree } from "@vanduo-oss/vue";
import type { TreeNode } from "@vanduo-oss/vue";

const nodes: TreeNode[] = [
  {
    id: 'parent',
    label: 'Parent',
    children: [
      { id: 'a', label: 'Child A' },
      { id: 'b', label: 'Child B' },
    ],
  },
  { id: 'leaf', label: 'Leaf' },
];

describe('VdTree', () => {
  it('renders branch nodes with a toggle and leaves with a placeholder', () => {
    const wrapper = mount(VdTree, { props: { nodes } });
    expect(wrapper.findAll('.vd-tree-node').length).toBe(4);
    expect(wrapper.findAll('.vd-tree-toggle').length).toBe(1);
    expect(wrapper.findAll('.vd-tree-toggle-placeholder').length).toBe(3);
  });

  it('toggles the open state of a branch on toggle click', async () => {
    const wrapper = mount(VdTree, { props: { nodes } });
    const branch = wrapper.find('.vd-tree-node');
    expect(branch.classes()).not.toContain('is-open');
    await wrapper.find('.vd-tree-toggle').trigger('click');
    expect(branch.classes()).toContain('is-open');
    expect(branch.attributes('aria-expanded')).toBe('true');
  });

  it('cascades a parent check to all descendants and reports via getChecked', async () => {
    const wrapper = mount(VdTree, {
      props: { nodes, checkbox: true, cascade: true },
    });
    const parentCheckbox = wrapper.findAll('input[type="checkbox"]')[0];
    await parentCheckbox.setValue(true);
    const exposed = wrapper.vm as unknown as { getChecked: () => string[] };
    expect(exposed.getChecked()).toEqual(['parent', 'a', 'b']);
  });

  it('fires tree:check with the documented { checked, node } detail', async () => {
    const wrapper = mount(VdTree, {
      props: { nodes, checkbox: true, cascade: true },
      attachTo: document.body,
    });
    let detail: { checked: string[]; node: string } | null = null;
    wrapper.find('.vd-tree').element.addEventListener('tree:check', (e) => {
      detail = (e as CustomEvent).detail;
    });
    await wrapper.findAll('input[type="checkbox"]')[0].setValue(true);
    expect(detail).toEqual({ checked: ['parent', 'a', 'b'], node: 'parent' });
    wrapper.unmount();
  });
});
