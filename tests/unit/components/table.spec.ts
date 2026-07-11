import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdTable } from "@vanduo-oss/vue";

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
];

const rows = [
  { name: 'Ada', role: 'Engineer' },
  { name: 'Grace', role: 'Architect' },
];

describe('VdTable', () => {
  it('renders column headers', () => {
    const wrapper = mount(VdTable, { props: { columns, rows } });
    const headers = wrapper.findAll('th');
    expect(headers.length).toBe(2);
    expect(headers[0].text()).toBe('Name');
  });

  it('renders row data', () => {
    const wrapper = mount(VdTable, { props: { columns, rows } });
    const cells = wrapper.findAll('tbody td');
    expect(cells.length).toBe(4);
    expect(cells[0].text()).toBe('Ada');
  });

  it('applies variant classes', () => {
    const wrapper = mount(VdTable, {
      props: { columns, rows, striped: true, bordered: true, hover: true },
    });
    const table = wrapper.find('table');
    expect(table.classes()).toContain('vd-table-striped');
    expect(table.classes()).toContain('vd-table-bordered');
    expect(table.classes()).toContain('vd-table-hover');
  });

  it('renders caption when provided', () => {
    const wrapper = mount(VdTable, {
      props: { columns, rows, caption: 'Team members' },
    });
    expect(wrapper.find('.vd-table-caption').text()).toBe('Team members');
  });
});
