import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { DockPlacement } from "@vanduo-oss/vd3";
import {
  playSiteDockNarrowBrandMorph,
  type SiteDockMorphApi,
} from "@/composables/siteDockNarrowBrandMorph";

function makeApi(overrides: {
  placement?: "bottom" | "top";
  orientation?: "horizontal" | "vertical";
  visualPhase?: "horizontal" | "square" | "vertical";
  isMorphing?: boolean;
  snapToPlacement?: (target: DockPlacement) => void;
} = {}): SiteDockMorphApi & {
  placement: { value: "bottom" | "top" };
  orientation: { value: "horizontal" | "vertical" };
  visualPhase: { value: "horizontal" | "square" | "vertical" };
  isMorphing: { value: boolean };
} {
  return {
    placement: { value: overrides.placement ?? "bottom" },
    orientation: { value: overrides.orientation ?? "horizontal" },
    visualPhase: { value: overrides.visualPhase ?? "horizontal" },
    isMorphing: { value: overrides.isMorphing ?? false },
    snapToPlacement: overrides.snapToPlacement ?? vi.fn(),
  };
}

describe("playSiteDockNarrowBrandMorph", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? false : false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("runs shrink → grow morph and updates placement after shrink", () => {
    const api = makeApi();
    const onApplied = vi.fn();
    const onSettled = vi.fn();

    playSiteDockNarrowBrandMorph(api, "top", { onApplied, onSettled });

    expect(api.isMorphing.value).toBe(true);
    expect(api.visualPhase.value).toBe("square");
    expect(onApplied).not.toHaveBeenCalled();

    vi.advanceTimersByTime(480);
    expect(api.placement.value).toBe("top");
    expect(api.orientation.value).toBe("horizontal");
    expect(api.visualPhase.value).toBe("horizontal");
    expect(onApplied).toHaveBeenCalledTimes(1);
    expect(onSettled).not.toHaveBeenCalled();

    vi.advanceTimersByTime(720);
    expect(api.isMorphing.value).toBe(false);
    expect(onSettled).toHaveBeenCalledTimes(1);
  });

  it("snaps when reduced motion is preferred", () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)",
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));

    const snapToPlacement = vi.fn();
    const api = makeApi({ snapToPlacement });
    const onApplied = vi.fn();

    playSiteDockNarrowBrandMorph(api, "top", { onApplied });

    expect(snapToPlacement).toHaveBeenCalledWith("top");
    expect(api.isMorphing.value).toBe(false);
    expect(onApplied).toHaveBeenCalledTimes(1);
  });

  it("ignores clicks while a morph is already running", () => {
    const api = makeApi({ isMorphing: true });
    playSiteDockNarrowBrandMorph(api, "top");
    expect(api.visualPhase.value).toBe("horizontal");
  });
});
