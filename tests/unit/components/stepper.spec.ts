import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, ref } from 'vue';
import { useStepper } from "@vanduo-oss/vue";

const Harness = defineComponent({
  setup() {
    const root = ref<HTMLElement | null>(null);
    const stepper = useStepper(root);
    return { root, stepper };
  },
  template: `
    <div ref="root">
      <div id="s" class="vd-stepper vd-stepper-clickable">
        <div class="vd-stepper-item">A</div>
        <div class="vd-stepper-item is-active">B</div>
        <div class="vd-stepper-item">C</div>
      </div>
    </div>
  `,
});

describe('useStepper', () => {
  it('derives the active index from .is-active and marks earlier steps completed', () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const items = wrapper.findAll('.vd-stepper-item');
    expect(items[0].classes()).toContain('is-completed');
    expect(items[1].classes()).toContain('is-active');
    expect(items[1].attributes('aria-current')).toBe('step');
    wrapper.unmount();
  });

  it('navigates to a clicked step on a clickable stepper', async () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const items = wrapper.findAll('.vd-stepper-item');
    await items[2].trigger('click');
    expect(items[2].classes()).toContain('is-active');
    expect(items[0].classes()).toContain('is-completed');
    expect(items[1].classes()).toContain('is-completed');
    wrapper.unmount();
  });

  it('dispatches stepper:change when the step changes', async () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const el = wrapper.find('#s').element;
    let detail: unknown = null;
    el.addEventListener('stepper:change', (e) => {
      detail = (e as CustomEvent).detail;
    });
    await wrapper.findAll('.vd-stepper-item')[0].trigger('click');
    expect(detail).toMatchObject({ current: 0, previous: 1, total: 3 });
    wrapper.unmount();
  });

  it('exposes an imperative next/prev API', () => {
    const wrapper = mount(Harness, { attachTo: document.body });
    const el = wrapper.find('#s').element;
    (
      wrapper.vm as unknown as { stepper: ReturnType<typeof useStepper> }
    ).stepper.next(el);
    expect(wrapper.findAll('.vd-stepper-item')[2].classes()).toContain(
      'is-active',
    );
    wrapper.unmount();
  });
});
