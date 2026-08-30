export const SITE_DOCK_BRAND_SPIN_NAME = "vd-site-dock-brand-spin";
export const SITE_DOCK_SPIN_HOVER_MS = 5000;
export const SITE_DOCK_SPIN_IDLE_MS = 12000;
export const SITE_DOCK_SPIN_MORPH_MS = 900;
export const SITE_DOCK_SPIN_RAMP_MS = 1000;

/** `EffectTiming.duration` widens to CSSNumericValue under typed OM lib defs. */
export function parseTimeMs(
  value: string | number | CSSNumericValue | null | undefined,
): number {
  if (typeof value === "number") return value;
  if (value == null) return 0;
  const raw = String(value).trim();
  if (raw.endsWith("ms")) return Number.parseFloat(raw);
  if (raw.endsWith("s")) return Number.parseFloat(raw) * 1000;
  return Number.parseFloat(raw);
}

export function findSiteDockBrandSpinAnimation(
  spin: Element,
): Animation | undefined {
  return spin.getAnimations().find((anim) => {
    return (
      "animationName" in anim &&
      (anim as CSSAnimation).animationName === SITE_DOCK_BRAND_SPIN_NAME
    );
  });
}

function isKeyframeEffect(
  effect: AnimationEffect | null,
): effect is KeyframeEffect {
  return (
    effect != null &&
    "getTiming" in effect &&
    "updateTiming" in effect &&
    typeof effect.getTiming === "function" &&
    typeof effect.updateTiming === "function"
  );
}

/** Keep the visible rotation when changing spin period (avoids angle snap). */
export function setSiteDockBrandSpinDurationPreservingPhase(
  spin: Element,
  durationMs: number,
): void {
  const anim = findSiteDockBrandSpinAnimation(spin);
  if (!anim?.effect || !isKeyframeEffect(anim.effect)) return;

  const oldMs = parseTimeMs(anim.effect.getTiming().duration);
  const currentTime = Number(anim.currentTime ?? 0);
  const progress = oldMs > 0 ? (currentTime % oldMs) / oldMs : 0;

  anim.effect.updateTiming({ duration: durationMs, iterations: Infinity });
  anim.currentTime = progress * durationMs;
}
