import { describe, expect, it, vi } from "vitest";
import {
  parseTimeMs,
  setSiteDockBrandSpinDurationPreservingPhase,
  SITE_DOCK_BRAND_SPIN_NAME,
  SITE_DOCK_SPIN_HOVER_MS,
} from "@/composables/siteDockBrandSpin";

describe("siteDockBrandSpin", () => {
  it("parseTimeMs handles seconds and milliseconds", () => {
    expect(parseTimeMs("12s")).toBe(12000);
    expect(parseTimeMs("900ms")).toBe(900);
    expect(parseTimeMs(5000)).toBe(5000);
  });

  it("preserves spin phase when duration changes", () => {
    const effect = {
      getTiming: vi.fn(() => ({ duration: 10000, iterations: Infinity })),
      updateTiming: vi.fn(),
    };
    const anim = {
      currentTime: 2500,
      effect,
    } as unknown as Animation;

    const spin = {
      getAnimations: vi.fn(() => [
        Object.assign(anim, { animationName: SITE_DOCK_BRAND_SPIN_NAME }),
      ]),
    } as unknown as Element;

    setSiteDockBrandSpinDurationPreservingPhase(spin, SITE_DOCK_SPIN_HOVER_MS);

    expect(effect.updateTiming).toHaveBeenCalledWith({
      duration: SITE_DOCK_SPIN_HOVER_MS,
      iterations: Infinity,
    });
    expect(anim.currentTime).toBe(1250);
  });
});
