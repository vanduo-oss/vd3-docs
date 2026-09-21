import { onUnmounted, watch, type Ref } from "vue";
import {
  SITE_DOCK_SPIN_HOVER_MS,
  SITE_DOCK_SPIN_IDLE_MS,
  SITE_DOCK_SPIN_MORPH_MS,
  SITE_DOCK_SPIN_RAMP_MS,
  ensureSiteDockBrandSpin,
  setSiteDockBrandSpinDurationPreservingPhase,
  settleSiteDockBrandSpin,
} from "@/composables/siteDockBrandSpin";

function getBrandSpin(dock: HTMLElement): Element | null {
  return dock.querySelector(".vd-dock-brand .vd3-mark-spin");
}

function isMousePointer(event: Event): boolean {
  return event instanceof PointerEvent && event.pointerType === "mouse";
}

/**
 * Drives brand-mark spin via WAAPI. Hover/focus/morph keep a continuous spin;
 * leave and morph-end decelerate to upright (two dots up) instead of freezing.
 *
 * Touch/pen: pointerup / pointercancel / touchend settle even when CSS :hover
 * stays sticky after the finger lifts (mobile browsers often keep :hover).
 * Mouse: only pointerleave / focusout settle so hover can keep spinning.
 */
export function useSiteDockBrandSpin(dockEl: Ref<HTMLElement | null>): void {
  let rampFrame = 0;
  let cleanup: (() => void) | undefined;
  /** Explicit engage — not CSS :hover, which sticks after tap on touch devices. */
  let spinEngaged = false;

  const cancelRamp = (): void => {
    if (rampFrame) cancelAnimationFrame(rampFrame);
    rampFrame = 0;
  };

  const rampHoverSpeed = (spin: Element): void => {
    cancelRamp();
    ensureSiteDockBrandSpin(spin, SITE_DOCK_SPIN_IDLE_MS);

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

  const syncMorphSpeed = (
    dock: HTMLElement,
    brand: HTMLElement,
    reducedMotion: boolean,
  ): void => {
    const spin = getBrandSpin(dock);
    if (!spin) return;

    if (dock.classList.contains("is-morphing")) {
      cancelRamp();
      if (reducedMotion) {
        settleSiteDockBrandSpin(spin, { reducedMotion: true });
        return;
      }
      ensureSiteDockBrandSpin(spin, SITE_DOCK_SPIN_MORPH_MS);
      return;
    }

    // Prefer spinEngaged over :hover so sticky post-tap hover cannot keep
    // the infinite spin running after touch has already ended.
    const active = spinEngaged || brand.matches(":focus-visible");
    if (active) {
      if (reducedMotion) return;
      ensureSiteDockBrandSpin(spin, SITE_DOCK_SPIN_HOVER_MS);
      return;
    }

    cancelRamp();
    settleSiteDockBrandSpin(spin, { reducedMotion });
  };

  const bindBrandSpin = (dock: HTMLElement): (() => void) => {
    const brand = dock.querySelector(".vd-dock-brand");
    const spin = getBrandSpin(dock);
    if (!(brand instanceof HTMLElement) || !spin) return () => undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onActivate = (): void => {
      spinEngaged = true;
      if (reducedMotion.matches) return;
      if (dock.classList.contains("is-morphing")) {
        ensureSiteDockBrandSpin(spin, SITE_DOCK_SPIN_MORPH_MS);
        return;
      }
      rampHoverSpeed(spin);
    };

    const onDeactivate = (): void => {
      spinEngaged = false;
      cancelRamp();
      if (dock.classList.contains("is-morphing")) return;
      settleSiteDockBrandSpin(spin, {
        reducedMotion: reducedMotion.matches,
      });
    };

    /** Touch/pen release ends spin; mouse click while hovering must not. */
    const onPointerRelease = (event: Event): void => {
      if (isMousePointer(event)) return;
      onDeactivate();
    };

    brand.addEventListener("pointerenter", onActivate);
    brand.addEventListener("pointerdown", onActivate);
    brand.addEventListener("pointerleave", onDeactivate);
    brand.addEventListener("pointerup", onPointerRelease);
    brand.addEventListener("pointercancel", onPointerRelease);
    brand.addEventListener("touchend", onDeactivate);
    brand.addEventListener("touchcancel", onDeactivate);
    brand.addEventListener("focusin", onActivate);
    brand.addEventListener("focusout", onDeactivate);

    const morphObserver = new MutationObserver(() => {
      syncMorphSpeed(dock, brand, reducedMotion.matches);
    });
    morphObserver.observe(dock, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelRamp();
      spinEngaged = false;
      brand.removeEventListener("pointerenter", onActivate);
      brand.removeEventListener("pointerdown", onActivate);
      brand.removeEventListener("pointerleave", onDeactivate);
      brand.removeEventListener("pointerup", onPointerRelease);
      brand.removeEventListener("pointercancel", onPointerRelease);
      brand.removeEventListener("touchend", onDeactivate);
      brand.removeEventListener("touchcancel", onDeactivate);
      brand.removeEventListener("focusin", onActivate);
      brand.removeEventListener("focusout", onDeactivate);
      morphObserver.disconnect();
      settleSiteDockBrandSpin(spin, {
        reducedMotion: true,
      });
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
