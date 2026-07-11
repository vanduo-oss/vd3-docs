import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import VdFooter from '@/layout/VdFooter.vue';

const mountFooter = () =>
  mount(VdFooter, {
    global: {
      stubs: {
        RouterLink: {
          props: ['to'],
          template: '<a :href="to"><slot /></a>',
        },
      },
    },
  });

describe('VdFooter', () => {
  it('renders the brand wordmark', () => {
    const wrapper = mountFooter();
    expect(wrapper.text()).toContain('vanduo');
    expect(wrapper.text()).toContain('framework');
  });

  it('renders the copyright line', () => {
    const wrapper = mountFooter();
    expect(wrapper.text()).toMatch(/Vanduo Framework\. MIT License\./);
  });

  it('renders quick links and resource columns', () => {
    const wrapper = mountFooter();
    expect(wrapper.text()).toContain('Quick Links');
    expect(wrapper.text()).toContain('Resources');
    expect(wrapper.text()).toContain('GitHub');
    expect(wrapper.text()).toContain('Changelog');
  });

  it('marks external resource links with rel=noopener', () => {
    const wrapper = mountFooter();
    const external = wrapper
      .findAll('a')
      .filter((a) => a.attributes('target') === '_blank');
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.attributes('rel')).toBe('noopener');
    }
  });
});
