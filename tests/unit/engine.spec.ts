import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { useEngineStore } from '@/stores/engine';
import EngineSwitch from '@/components/EngineSwitch.vue';

describe('useEngineStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
  });

  it('defaults to the Vue 3 engine', () => {
    const engine = useEngineStore();
    expect(engine.engine).toBe('vue3');
  });

  it('toggle flips the engine and persists to localStorage', () => {
    const engine = useEngineStore();
    engine.toggle();
    expect(engine.engine).toBe('vanilla');
    expect(window.localStorage.getItem('vanduo-docs-engine')).toBe('vanilla');
    engine.toggle();
    expect(engine.engine).toBe('vue3');
    expect(window.localStorage.getItem('vanduo-docs-engine')).toBe('vue3');
  });

  it('init() hydrates the stored preference', () => {
    window.localStorage.setItem('vanduo-docs-engine', 'vanilla');
    const engine = useEngineStore();
    engine.init();
    expect(engine.engine).toBe('vanilla');
  });
});

describe('EngineSwitch', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
  });

  it('renders the vue3 slot by default', () => {
    const wrapper = mount(EngineSwitch, {
      slots: { vue3: '<p>VUE BLOCK</p>', vanilla: '<p>VANILLA BLOCK</p>' },
    });
    expect(wrapper.text()).toContain('VUE BLOCK');
    expect(wrapper.text()).not.toContain('VANILLA BLOCK');
  });

  it('renders the vanilla slot when the engine is vanilla', () => {
    const engine = useEngineStore();
    engine.setEngine('vanilla');
    const wrapper = mount(EngineSwitch, {
      slots: { vue3: '<p>VUE BLOCK</p>', vanilla: '<p>VANILLA BLOCK</p>' },
    });
    expect(wrapper.text()).toContain('VANILLA BLOCK');
    expect(wrapper.text()).not.toContain('VUE BLOCK');
  });
});
