import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { DockCorner, DockPlacement } from "@vanduo-oss/vd3";
import {
  playSiteDockNarrowBrandMorph,
  type SiteDockMorphApi,
} from "@/composables/siteDockNarrowBrandMorph";

const BEAT_MS = 610;

/** Two frames: the morph arms transitions, then the square target applies. */
function paintSquare(): void {
  vi.advanceTimersByTime(16);
  vi.advanceTimersByTime(16);
}

function makeApi(
  overrides: {
    placement?: "bottom" | "top";
    orientation?: "horizontal" | "vertical";
    visualPhase?: "horizontal" | "square" | "vertical";
    morphCorner?: DockCorner | null;
    isMorphing?: boolean;
    snapToPlacement?: (target: DockPlacement) => void;
  } = {},
): SiteDockMorphApi & {
  placement: { value: "bottom" | "top" };
  orientation: { value: "horizontal" | "vertical" };
  visualPhase: { value: "horizontal" | "square" | "vertical" };
  morphCorner: { value: DockCorner | null };
  isMorphing: { value: boolean };
} {
  return {
    placement: { value: overrides.placement ?? "bottom" },
    orientation: { value: overrides.orientation ?? "horizontal" },
    visualPhase: { value: overrides.visualPhase ?? "horizontal" },
    morphCorner: { value: overrides.morphCorner ?? null },
    isMorphing: { value: overrides.isMorphing ?? false },
    snapToPlacement: overrides.snapToPlacement ?? vi.fn(),
  };
}

describe("playSiteDockNarrowBrandMorph", () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        "setTimeout",
        "clearTimeout",
        "requestAnimationFrame",
        "cancelAnimationFrame",
      ],
    });
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" ? false : false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));
    vi.spyOn(window, "getComputedStyle").mockImplementation(
      () =>
        ({
          getPropertyValue: (prop: string) =>
            prop === "--vd-duration-slower" ? "0.61s" : "",
        }) as CSSStyleDeclaration,
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("shrinks, slides up, then grows when moving bottom to top", () => {
    const api = makeApi();
    const onApplied = vi.fn();
    const onSettled = vi.fn();

    playSiteDockNarrowBrandMorph(api, "top", { onApplied, onSettled });

    expect(api.isMorphing.value).toBe(true);
    expect(api.visualPhase.value).toBe("horizontal");
    expect(api.morphCorner.value).toBe("bottom-left");
    expect(api.placement.value).toBe("bottom");
    expect(onApplied).not.toHaveBeenCalled();

    paintSquare();
    expect(api.visualPhase.value).toBe("square");
    expect(api.morphCorner.value).toBe("bottom-left");
    expect(api.placement.value).toBe("bottom");

    vi.advanceTimersByTime(BEAT_MS);
    expect(api.visualPhase.value).toBe("square");
    expect(api.morphCorner.value).toBe("top-left");
    expect(api.placement.value).toBe("bottom");
    expect(onApplied).not.toHaveBeenCalled();

    vi.advanceTimersByTime(BEAT_MS);
    expect(api.placement.value).toBe("top");
    expect(api.orientation.value).toBe("horizontal");
    expect(api.visualPhase.value).toBe("horizontal");
    expect(api.morphCorner.value).toBe("top-left");
    expect(api.isMorphing.value).toBe(true);
    expect(onApplied).toHaveBeenCalledTimes(1);
    expect(onSettled).not.toHaveBeenCalled();

    vi.advanceTimersByTime(BEAT_MS);
    expect(api.isMorphing.value).toBe(false);
    expect(api.morphCorner.value).toBeNull();
    expect(onSettled).toHaveBeenCalledTimes(1);
  });

  it("shrinks, slides down, then grows when moving top to bottom", () => {
    const api = makeApi({ placement: "top" });

    playSiteDockNarrowBrandMorph(api, "bottom");

    paintSquare();
    expect(api.visualPhase.value).toBe("square");
    expect(api.morphCorner.value).toBe("top-left");
    expect(api.placement.value).toBe("top");

    vi.advanceTimersByTime(BEAT_MS);
    expect(api.visualPhase.value).toBe("square");
    expect(api.morphCorner.value).toBe("bottom-left");
    expect(api.placement.value).toBe("top");

    vi.advanceTimersByTime(BEAT_MS);
    expect(api.placement.value).toBe("bottom");
    expect(api.visualPhase.value).toBe("horizontal");
    expect(api.morphCorner.value).toBe("bottom-left");
    expect(api.isMorphing.value).toBe(true);

    vi.advanceTimersByTime(BEAT_MS);
    expect(api.isMorphing.value).toBe(false);
    expect(api.morphCorner.value).toBeNull();
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
    expect(api.morphCorner.value).toBeNull();
  });
});
