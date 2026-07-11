import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { useAffix } from "@vanduo-oss/vue";

const Harness = defineComponent({
  setup() {
    const root = ref<HTMLElement | null>(null);
    useAffix(root);
    return { root };
  },
  template: `
    <div ref="root">
      <div class="vd-affix" data-vd-affix data-vd-affix-offset="0">
        <p>Stuck content</p>
      </div>
    </div>
  `,
});

describe('useAffix', () => {
  it('inserts a hidden sentinel before each affix element', () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const affix = wrapper.find('.vd-affix').element as HTMLElement;
    const sentinel = affix.previousElementSibling as HTMLElement | null;
    expect(sentinel).not.toBeNull();
    expect(sentinel?.style.visibility).toBe('hidden');
    wrapper.unmount();
  });

  it('sets the --vd-affix-top-offset custom property from the offset', () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const affix = wrapper.find('.vd-affix').element as HTMLElement;
    expect(affix.style.getPropertyValue('--vd-affix-top-offset')).toBe('0px');
    wrapper.unmount();
  });
});
