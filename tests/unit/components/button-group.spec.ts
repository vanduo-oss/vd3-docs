import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { VdButtonGroup } from "@vanduo-oss/vue";
import { VdButton } from "@vanduo-oss/vue";

describe('VdButtonGroup', () => {
  it('renders slot content as children', () => {
    const wrapper = mount(VdButtonGroup, {
      slots: {
        default: () => [
          h(VdButton, { variant: 'primary' }, () => 'A'),
          h(VdButton, { variant: 'secondary' }, () => 'B'),
        ],
      },
    });
    expect(wrapper.findAllComponents(VdButton).length).toBe(2);
  });

  it('applies size class', () => {
    const wrapper = mount(VdButtonGroup, {
      props: { size: 'lg' },
    });
    expect(wrapper.classes()).toContain('vd-btn-group-lg');
  });

  it('applies vertical class', () => {
    const wrapper = mount(VdButtonGroup, {
      props: { vertical: true },
    });
    expect(wrapper.classes()).toContain('vd-btn-group-vertical');
  });
});
