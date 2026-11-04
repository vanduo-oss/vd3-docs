import { afterEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { useActiveBreakpoint } from "@/composables/useActiveBreakpoint";

let viewport = 0;
const listeners = new Set<() => void>();

function stubViewport(width: number): void {
  viewport = width;
  vi.stubGlobal("matchMedia", (query: string) => {
    const min = Number(/min-width: (\d+)px/.exec(query)?.[1] ?? 0);
    return {
      get matches() {
        return viewport >= min;
      },
      media: query,
      addEventListener: (_: string, cb: () => void) => listeners.add(cb),
      removeEventListener: (_: string, cb: () => void) => listeners.delete(cb),
    };
  });
}

const Harness = defineComponent({
  setup() {
    const bp = useActiveBreakpoint();
    return () => h("span", bp.value);
  },
});

afterEach(() => {
  vi.unstubAllGlobals();
  listeners.clear();
});

describe("useActiveBreakpoint", () => {
  it.each([
    [375, "base"],
    [600, "sm"],
    [800, "md"],
    [1000, "lg"],
    [1300, "xl"],
    [1440, "2xl"],
  ])("resolves %ipx to %s on mount", async (width, expected) => {
    stubViewport(width);
    const wrapper = mount(Harness);
    await nextTick();
    expect(wrapper.text()).toBe(expected);
    wrapper.unmount();
  });

  it("follows viewport changes and detaches its listeners on unmount", async () => {
    stubViewport(1440);
    const wrapper = mount(Harness);
    await nextTick();
    expect(wrapper.text()).toBe("2xl");

    viewport = 700;
    listeners.forEach((cb) => cb());
    await nextTick();
    expect(wrapper.text()).toBe("sm");

    wrapper.unmount();
    expect(listeners.size).toBe(0);
  });
});
