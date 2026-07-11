import { describe, expect, it, vi, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { useWaypoint } from "@vanduo-oss/vue";

const Harness = defineComponent({
  setup() {
    const root = ref<HTMLElement | null>(null);
    useWaypoint(root);
    return { root };
  },
  template: `
    <div ref="root">
      <nav data-vd-waypoint-nav="window">
        <a href="#wp-a" class="is-active">A</a>
        <a href="#wp-b">B</a>
      </nav>
      <div id="wp-a">A</div>
      <div id="wp-b">B</div>
    </div>
  `,
});

describe('useWaypoint', () => {
  beforeAll(() => {
    // jsdom does not implement scrollIntoView
    Element.prototype.scrollIntoView = vi.fn();
  });

  it('marks resolved sections with data-vd-waypoint-section', () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    expect(
      document.getElementById('wp-a')?.hasAttribute('data-vd-waypoint-section'),
    ).toBe(true);
    expect(
      document.getElementById('wp-b')?.hasAttribute('data-vd-waypoint-section'),
    ).toBe(true);
    wrapper.unmount();
  });

  it('activates the clicked link with is-active and aria-current', async () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const links = wrapper.findAll('a');
    await links[1].trigger('click');
    expect(links[1].classes()).toContain('is-active');
    expect(links[1].attributes('aria-current')).toBe('true');
    expect(links[0].classes()).not.toContain('is-active');
    wrapper.unmount();
  });
});
