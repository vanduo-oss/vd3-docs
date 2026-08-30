import { onUnmounted, watch, type Ref } from "vue";
import {
  SITE_DOCK_SPIN_HOVER_MS,
  SITE_DOCK_SPIN_IDLE_MS,
  SITE_DOCK_SPIN_MORPH_MS,
  SITE_DOCK_SPIN_RAMP_MS,
  setSiteDockBrandSpinDurationPreservingPhase,
} from "@/composables/siteDockBrandSpin";

function getBrandSpin(dock: HTMLElement): Element | null {
  return dock.querySelector(".vd-dock-brand .vd3-mark-spin");
}

/**
 * Preserves brand-mark rotation when hover/morph changes spin speed.
 * CSS keeps play-state; this composable ramps duration without resetting angle.
 */
export function useSiteDockBrandSpin(dockEl: Ref<HTMLElement | null>): void {
  let rampFrame = 0;
  let cleanup: (() => void) | undefined;

  const cancelRamp = (): void => {
    if (rampFrame) cancelAnimationFrame(rampFrame);
    rampFrame = 0;
  };

  const rampHoverSpeed = (spin: Element): void => {
    cancelRamp();
    setSiteDockBrandSpinDurationPreservingPhase(spin, SITE_DOCK_SPIN_IDLE_MS);

    const start = performance.now();
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / SITE_DOCK_SPIN_RAMP_MS);
      const eased = t * (2 - t);
      const duration =
        SITE_DOCK_SPIN_IDLE_MS +
        (SITE_DOCK_SPIN_HOVER_MS - SITE_DOCK_SPIN_IDLE_MS) * eased;
      setSiteDockBrandSpinDurationPreservingPhase(spin, duration);
      if (t < 1) rampFrame = requestAnimationFrame(tick);
    };
    rampFrame = requestAnimationFrame(tick);
  };

  const syncMorphSpeed = (dock: HTMLElement, brand: HTMLElement): void => {
    const spin = getBrandSpin(dock);
    if (!spin) return;

    if (dock.classList.contains("is-morphing")) {
      cancelRamp();
      setSiteDockBrandSpinDurationPreservingPhase(
        spin,
        SITE_DOCK_SPIN_MORPH_MS,
      );
      return;
    }

    const hovered = brand.matches(":hover") || brand.matches(":focus-visible");
    if (hovered) {
      setSiteDockBrandSpinDurationPreservingPhase(
        spin,
        SITE_DOCK_SPIN_HOVER_MS,
      );
      return;
    }

    setSiteDockBrandSpinDurationPreservingPhase(spin, SITE_DOCK_SPIN_IDLE_MS);
  };

  const bindBrandSpin = (dock: HTMLElement): (() => void) => {
    const brand = dock.querySelector(".vd-dock-brand");
    const spin = getBrandSpin(dock);
    if (!(brand instanceof HTMLElement) || !spin) return () => undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onActivate = (): void => {
      if (reducedMotion.matches) return;
      rampHoverSpeed(spin);
    };

    const onDeactivate = (): void => {
      cancelRamp();
    };

    brand.addEventListener("pointerenter", onActivate);
    brand.addEventListener("pointerleave", onDeactivate);
    brand.addEventListener("focusin", onActivate);
    brand.addEventListener("focusout", onDeactivate);

    const morphObserver = new MutationObserver(() => {
      if (reducedMotion.matches) return;
      syncMorphSpeed(dock, brand);
    });
    morphObserver.observe(dock, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelRamp();
      brand.removeEventListener("pointerenter", onActivate);
      brand.removeEventListener("pointerleave", onDeactivate);
      brand.removeEventListener("focusin", onActivate);
      brand.removeEventListener("focusout", onDeactivate);
      morphObserver.disconnect();
    };
  };

  watch(
    dockEl,
    (el) => {
      cleanup?.();
      cleanup = el ? bindBrandSpin(el) : undefined;
    },
    { immediate: true },
  );

  onUnmounted(() => {
    cleanup?.();
    cleanup = undefined;
  });
}
