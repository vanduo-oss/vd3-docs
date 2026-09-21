import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { effectScope, nextTick, ref } from "vue";
import * as siteDockBrandSpin from "@/composables/siteDockBrandSpin";
import {
  ensureSiteDockBrandSpin,
  nextUprightAngleDeg,
  parseAngleDeg,
  parseTimeMs,
  settleDurationMs,
  setSiteDockBrandSpinDurationPreservingPhase,
  settleSiteDockBrandSpin,
  SITE_DOCK_BRAND_SETTLE_NAME,
  SITE_DOCK_BRAND_SPIN_NAME,
  SITE_DOCK_SPIN_HOVER_MS,
  SITE_DOCK_SPIN_SETTLE_MAX_MS,
  SITE_DOCK_SPIN_SETTLE_MIN_MS,
} from "@/composables/siteDockBrandSpin";
import { useSiteDockBrandSpin } from "@/composables/useSiteDockBrandSpin";

describe("siteDockBrandSpin", () => {
  it("parseTimeMs handles seconds and milliseconds", () => {
    expect(parseTimeMs("12s")).toBe(12000);
    expect(parseTimeMs("900ms")).toBe(900);
    expect(parseTimeMs(5000)).toBe(5000);
  });

  it("parseAngleDeg handles deg, turn, and rad", () => {
    expect(parseAngleDeg("90deg")).toBe(90);
    expect(parseAngleDeg("0.5turn")).toBe(180);
    expect(parseAngleDeg(`${Math.PI}rad`)).toBeCloseTo(180, 5);
  });

  it("nextUprightAngleDeg advances forward to the next 0deg multiple", () => {
    expect(nextUprightAngleDeg(0)).toBe(0);
    expect(nextUprightAngleDeg(0.2)).toBe(0);
    expect(nextUprightAngleDeg(90)).toBe(360);
    expect(nextUprightAngleDeg(359.8)).toBe(360);
    expect(nextUprightAngleDeg(450)).toBe(720);
  });

  it("settleDurationMs coasts toward upright within min/max bounds", () => {
    expect(settleDurationMs(0, 5000)).toBe(0);
    const mid = settleDurationMs(180, 1000);
    expect(mid).toBeGreaterThanOrEqual(SITE_DOCK_SPIN_SETTLE_MIN_MS);
    expect(mid).toBeLessThanOrEqual(SITE_DOCK_SPIN_SETTLE_MAX_MS);
    expect(settleDurationMs(1, 12000)).toBe(SITE_DOCK_SPIN_SETTLE_MAX_MS);
  });

  it("preserves spin phase when duration changes", () => {
    const effect = {
      getTiming: vi.fn(() => ({ duration: 10000, iterations: Infinity })),
      updateTiming: vi.fn(),
    };
    const anim = {
      id: SITE_DOCK_BRAND_SPIN_NAME,
      currentTime: 2500,
      effect,
    } as unknown as Animation;

    const spin = {
      getAnimations: vi.fn(() => [anim]),
    } as unknown as Element;

    setSiteDockBrandSpinDurationPreservingPhase(spin, SITE_DOCK_SPIN_HOVER_MS);

    expect(effect.updateTiming).toHaveBeenCalledWith({
      duration: SITE_DOCK_SPIN_HOVER_MS,
      iterations: Infinity,
    });
    expect(anim.currentTime).toBe(1250);
  });

  it("settleSiteDockBrandSpin eases to the next upright angle", async () => {
    const finished = Promise.resolve();
    const settleAnim = {
      id: "",
      playState: "finished",
      cancel: vi.fn(),
      finished,
    };
    const spinAnim = {
      id: SITE_DOCK_BRAND_SPIN_NAME,
      cancel: vi.fn(),
      effect: {
        getTiming: () => ({ duration: 1000 }),
      },
    };

    const styleSet = vi.fn();
    const animate = vi.fn(() => settleAnim);
    const spin = {
      getAnimations: vi.fn(() => [spinAnim]),
      animate,
      style: { setProperty: styleSet },
    } as unknown as HTMLElement;

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: () => "90deg",
    } as unknown as CSSStyleDeclaration);

    const result = settleSiteDockBrandSpin(spin);

    expect(spinAnim.cancel).toHaveBeenCalled();
    expect(animate).toHaveBeenCalledWith(
      [
        { "--vd-site-dock-brand-angle": "90deg" },
        { "--vd-site-dock-brand-angle": "360deg" },
      ],
      expect.objectContaining({
        fill: "forwards",
        easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      }),
    );
    expect(result).toBe(settleAnim);
    expect(settleAnim.id).toBe(SITE_DOCK_BRAND_SETTLE_NAME);

    await finished;
    await Promise.resolve();
    expect(styleSet).toHaveBeenCalledWith("--vd-site-dock-brand-angle", "0deg");
    expect(settleAnim.cancel).toHaveBeenCalled();
  });

  it("settleSiteDockBrandSpin snaps upright when reduced motion is set", () => {
    const styleSet = vi.fn();
    const animate = vi.fn();
    const spin = {
      getAnimations: vi.fn(() => []),
      animate,
      style: { setProperty: styleSet },
    } as unknown as HTMLElement;

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: () => "120deg",
    } as unknown as CSSStyleDeclaration);

    expect(
      settleSiteDockBrandSpin(spin, { reducedMotion: true }),
    ).toBeNull();
    expect(animate).not.toHaveBeenCalled();
    expect(styleSet).toHaveBeenCalledWith("--vd-site-dock-brand-angle", "0deg");
  });

  it("ensureSiteDockBrandSpin starts a continuous WAAPI spin from the current angle", () => {
    const created = { id: "" };
    const animate = vi.fn(() => created);
    const styleSet = vi.fn();
    const spin = {
      getAnimations: vi.fn(() => []),
      animate,
      style: { setProperty: styleSet },
    } as unknown as HTMLElement;

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: () => "45deg",
    } as unknown as CSSStyleDeclaration);

    const anim = ensureSiteDockBrandSpin(spin, SITE_DOCK_SPIN_HOVER_MS);

    expect(animate).toHaveBeenCalledWith(
      [
        { "--vd-site-dock-brand-angle": "45deg" },
        { "--vd-site-dock-brand-angle": "405deg" },
      ],
      {
        duration: SITE_DOCK_SPIN_HOVER_MS,
        easing: "linear",
        iterations: Infinity,
      },
    );
    expect(anim).toBe(created);
    expect(created.id).toBe(SITE_DOCK_BRAND_SPIN_NAME);
  });
});

describe("useSiteDockBrandSpin touch settle", () => {
  let scope: ReturnType<typeof effectScope>;
  let dock: HTMLElement;
  let brand: HTMLButtonElement;
  let spin: HTMLElement;
  let settleSpy: ReturnType<
    typeof vi.spyOn<typeof siteDockBrandSpin, "settleSiteDockBrandSpin">
  >;
  let ensureSpy: ReturnType<
    typeof vi.spyOn<typeof siteDockBrandSpin, "ensureSiteDockBrandSpin">
  >;

  beforeEach(async () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: false,
      media: query,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
    }));

    dock = document.createElement("nav");
    dock.className = "vd-site-dock";
    brand = document.createElement("button");
    brand.className = "vd-dock-brand";
    spin = document.createElement("span");
    spin.className = "vd3-mark-spin";
    brand.appendChild(spin);
    dock.appendChild(brand);
    document.body.appendChild(dock);

    const animStore: Animation[] = [];
    spin.animate = vi.fn((keyframes, options) => {
      const anim = {
        id: "",
        playState: "running",
        currentTime: 100,
        cancel: vi.fn(() => {
          const idx = animStore.indexOf(anim as unknown as Animation);
          if (idx >= 0) animStore.splice(idx, 1);
        }),
        finished: Promise.resolve(),
        effect: {
          getTiming: () => ({
            duration:
              typeof options === "object" && options && "duration" in options
                ? options.duration
                : SITE_DOCK_SPIN_HOVER_MS,
            iterations:
              typeof options === "object" && options && "iterations" in options
                ? options.iterations
                : 1,
          }),
          updateTiming: vi.fn(),
        },
      };
      animStore.push(anim as unknown as Animation);
      return anim as unknown as Animation;
    }) as unknown as typeof spin.animate;
    spin.getAnimations = vi.fn(
      () => [...animStore],
    ) as unknown as typeof spin.getAnimations;
    Object.defineProperty(spin, "style", {
      value: { setProperty: vi.fn() },
      configurable: true,
    });

    vi.spyOn(window, "getComputedStyle").mockReturnValue({
      getPropertyValue: () => "90deg",
    } as unknown as CSSStyleDeclaration);

    settleSpy = vi.spyOn(siteDockBrandSpin, "settleSiteDockBrandSpin");
    ensureSpy = vi.spyOn(siteDockBrandSpin, "ensureSiteDockBrandSpin");

    scope = effectScope();
    scope.run(() => {
      useSiteDockBrandSpin(ref(dock));
    });
    await nextTick();
  });

  afterEach(() => {
    scope.stop();
    dock.remove();
    settleSpy.mockRestore();
    ensureSpy.mockRestore();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("starts settle on touch pointerup instead of leaving infinite spin", () => {
    settleSpy.mockClear();
    ensureSpy.mockClear();

    brand.dispatchEvent(
      new PointerEvent("pointerenter", {
        bubbles: true,
        pointerType: "touch",
      }),
    );
    expect(ensureSpy).toHaveBeenCalled();
    expect(settleSpy).not.toHaveBeenCalled();

    brand.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerType: "touch",
      }),
    );
    expect(settleSpy).toHaveBeenCalled();
  });

  it("ignores mouse pointerup while hover remains engaged", () => {
    settleSpy.mockClear();

    brand.dispatchEvent(
      new PointerEvent("pointerenter", {
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    brand.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    expect(settleSpy).not.toHaveBeenCalled();

    brand.dispatchEvent(
      new PointerEvent("pointerleave", {
        bubbles: true,
        pointerType: "mouse",
      }),
    );
    expect(settleSpy).toHaveBeenCalled();
  });

  it("settles on morph end even when CSS :hover would stay sticky", async () => {
    brand.dispatchEvent(
      new PointerEvent("pointerenter", {
        bubbles: true,
        pointerType: "touch",
      }),
    );
    brand.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerType: "touch",
      }),
    );
    settleSpy.mockClear();
    ensureSpy.mockClear();

    vi.spyOn(brand, "matches").mockImplementation(
      (selector: string) => selector === ":hover",
    );

    dock.classList.add("is-morphing");
    // MutationObserver delivers asynchronously in jsdom.
    await Promise.resolve();
    await Promise.resolve();
    expect(ensureSpy).toHaveBeenCalled();

    settleSpy.mockClear();
    ensureSpy.mockClear();
    dock.classList.remove("is-morphing");
    await Promise.resolve();
    await Promise.resolve();

    expect(settleSpy).toHaveBeenCalled();
    expect(ensureSpy).not.toHaveBeenCalled();
  });
});
