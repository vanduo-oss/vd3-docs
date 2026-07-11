import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { VdAlert } from "@vanduo-oss/vue";

describe('VdAlert', () => {
  it('renders the success variant class', () => {
    const wrapper = mount(VdAlert, {
      props: { variant: 'success', title: 'OK' },
      slots: { default: 'Saved.' },
    });
    expect(wrapper.classes()).toContain('vd-alert-success');
  });

  it('emits dismiss when dismissible close is clicked', async () => {
    const wrapper = mount(VdAlert, {
      props: { variant: 'info', dismissible: true },
      slots: { default: 'Hi' },
    });
    await wrapper.find('[aria-label="Dismiss"]').trigger('click');
    expect(wrapper.emitted('dismiss')).toHaveLength(1);
  });

  it('does not show dismiss button when not dismissible', () => {
    const wrapper = mount(VdAlert, {
      props: { variant: 'info', dismissible: false },
      slots: { default: 'Hi' },
    });
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(false);
  });
});