import { afterEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h } from "vue";
import { enableAutoUnmount, mount } from "@vue/test-utils";
import { DOCK_NARROW_QUERY } from "@vanduo-oss/vd3";
import { useUnlockDockNarrowLock } from "@/composables/useUnlockDockNarrowLock";

enableAutoUnmount(afterEach);

function stubMatchMedia(narrow: boolean): typeof window.matchMedia {
  return (query: string) =>
    ({
      matches:
        query === DOCK_NARROW_QUERY
          ? narrow
          : query === "(max-width: 0px)"
            ? false
            : false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }) as unknown as MediaQueryList;
}

function mountUnlock() {
  return mount(
    defineComponent({
      setup() {
        useUnlockDockNarrowLock();
        return () => h("div");
      },
    }),
  );
}

describe("useUnlockDockNarrowLock", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("makes the dock narrow query never match and restores on unmount", () => {
    const native = stubMatchMedia(true);
    vi.stubGlobal("matchMedia", native);
    expect(window.matchMedia(DOCK_NARROW_QUERY).matches).toBe(true);

    const wrapper = mountUnlock();
    expect(window.matchMedia(DOCK_NARROW_QUERY).matches).toBe(false);
    expect(window.matchMedia(DOCK_NARROW_QUERY).media).toBe("(max-width: 0px)");

    wrapper.unmount();
    expect(window.matchMedia).toBe(native);
    expect(window.matchMedia(DOCK_NARROW_QUERY).matches).toBe(true);
  });
});
