export const SITE_DOCK_BRAND_SPIN_NAME = "vd-site-dock-brand-spin";
export const SITE_DOCK_BRAND_SETTLE_NAME = "vd-site-dock-brand-settle";
export const SITE_DOCK_BRAND_ANGLE_VAR = "--vd-site-dock-brand-angle";
export const SITE_DOCK_SPIN_HOVER_MS = 5000;
export const SITE_DOCK_SPIN_IDLE_MS = 12000;
export const SITE_DOCK_SPIN_MORPH_MS = 900;
export const SITE_DOCK_SPIN_RAMP_MS = 1000;
export const SITE_DOCK_SPIN_SETTLE_MIN_MS = 600;
export const SITE_DOCK_SPIN_SETTLE_MAX_MS = 1800;
/** Stretch linear remaining-time so ease-out still feels like coasting. */
export const SITE_DOCK_SPIN_SETTLE_COAST = 1.75;
const UPRIGHT_EPS_DEG = 0.5;

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

export function parseAngleDeg(value: string): number {
  const raw = value.trim().toLowerCase();
  if (!raw) return 0;
  if (raw.endsWith("turn")) return Number.parseFloat(raw) * 360;
  if (raw.endsWith("rad")) return Number.parseFloat(raw) * (180 / Math.PI);
  if (raw.endsWith("grad")) return Number.parseFloat(raw) * 0.9;
  return Number.parseFloat(raw);
}

export function readSiteDockBrandAngleDeg(spin: Element): number {
  return parseAngleDeg(
    getComputedStyle(spin).getPropertyValue(SITE_DOCK_BRAND_ANGLE_VAR),
  );
}

/** Forward-only next upright (0deg mod 360) — two dots up. */
export function nextUprightAngleDeg(currentDeg: number): number {
  const rem = ((currentDeg % 360) + 360) % 360;
  if (rem < UPRIGHT_EPS_DEG || rem > 360 - UPRIGHT_EPS_DEG) {
    return Math.round(currentDeg / 360) * 360;
  }
  return Math.ceil(currentDeg / 360) * 360;
}

export function settleDurationMs(
  currentDeg: number,
  periodMs: number,
): number {
  const remaining = nextUprightAngleDeg(currentDeg) - currentDeg;
  if (remaining < UPRIGHT_EPS_DEG) return 0;
  const period = periodMs > 0 ? periodMs : SITE_DOCK_SPIN_HOVER_MS;
  const linearMs = period * (remaining / 360);
  const coasted = linearMs * SITE_DOCK_SPIN_SETTLE_COAST;
  return Math.min(
    SITE_DOCK_SPIN_SETTLE_MAX_MS,
    Math.max(SITE_DOCK_SPIN_SETTLE_MIN_MS, coasted),
  );
}

function isBrandSpinOrSettle(anim: Animation): boolean {
  if (
    anim.id === SITE_DOCK_BRAND_SPIN_NAME ||
    anim.id === SITE_DOCK_BRAND_SETTLE_NAME
  ) {
    return true;
  }
  if (!("animationName" in anim)) return false;
  const name = (anim as CSSAnimation).animationName;
  return (
    name === SITE_DOCK_BRAND_SPIN_NAME || name === SITE_DOCK_BRAND_SETTLE_NAME
  );
}

export function findSiteDockBrandSpinAnimation(
  spin: Element,
): Animation | undefined {
  return spin.getAnimations().find((anim) => {
    if (anim.id === SITE_DOCK_BRAND_SPIN_NAME) return true;
    return (
      "animationName" in anim &&
      (anim as CSSAnimation).animationName === SITE_DOCK_BRAND_SPIN_NAME
    );
  });
}

export function findSiteDockBrandSettleAnimation(
  spin: Element,
): Animation | undefined {
  return spin.getAnimations().find((anim) => anim.id === SITE_DOCK_BRAND_SETTLE_NAME);
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

function cancelBrandAnimations(spin: Element): void {
  for (const anim of spin.getAnimations()) {
    if (isBrandSpinOrSettle(anim)) anim.cancel();
  }
}

function setBrandAngleStyle(spin: Element, deg: number): void {
  (spin as HTMLElement).style.setProperty(
    SITE_DOCK_BRAND_ANGLE_VAR,
    `${deg}deg`,
  );
}

/** Capture live angle onto the element, then drop spin/settle animations. */
export function captureSiteDockBrandAngle(spin: Element): number {
  const angle = readSiteDockBrandAngleDeg(spin);
  cancelBrandAnimations(spin);
  setBrandAngleStyle(spin, angle);
  return angle;
}

/** Start (or retarget) a continuous linear spin from the current angle. */
export function ensureSiteDockBrandSpin(
  spin: Element,
  durationMs: number,
): Animation {
  const settle = findSiteDockBrandSettleAnimation(spin);
  if (settle) {
    captureSiteDockBrandAngle(spin);
  }

  let anim = findSiteDockBrandSpinAnimation(spin);
  if (anim) {
    setSiteDockBrandSpinDurationPreservingPhase(spin, durationMs);
    return anim;
  }

  const start = readSiteDockBrandAngleDeg(spin);
  setBrandAngleStyle(spin, start);
  anim = (spin as HTMLElement).animate(
    [
      { [SITE_DOCK_BRAND_ANGLE_VAR]: `${start}deg` },
      { [SITE_DOCK_BRAND_ANGLE_VAR]: `${start + 360}deg` },
    ],
    {
      duration: durationMs,
      easing: "linear",
      iterations: Infinity,
    },
  );
  anim.id = SITE_DOCK_BRAND_SPIN_NAME;
  return anim;
}

/** Keep the visible rotation when changing spin period (avoids angle snap). */
export function setSiteDockBrandSpinDurationPreservingPhase(
  spin: Element,
  durationMs: number,
): void {
  let anim = findSiteDockBrandSpinAnimation(spin);
  if (!anim) {
    ensureSiteDockBrandSpin(spin, durationMs);
    return;
  }
  if (!anim.effect || !isKeyframeEffect(anim.effect)) return;

  const oldMs = parseTimeMs(anim.effect.getTiming().duration);
  const currentTime = Number(anim.currentTime ?? 0);
  const progress = oldMs > 0 ? (currentTime % oldMs) / oldMs : 0;

  anim.effect.updateTiming({ duration: durationMs, iterations: Infinity });
  anim.currentTime = progress * durationMs;
}

/**
 * Decelerate forward to the next upright orientation (0deg mod 360).
 * Reduced motion snaps upright immediately.
 */
export function settleSiteDockBrandSpin(
  spin: Element,
  options: { reducedMotion?: boolean; periodMs?: number } = {},
): Animation | null {
  const spinAnim = findSiteDockBrandSpinAnimation(spin);
  const periodMs =
    options.periodMs ??
    (parseTimeMs(spinAnim?.effect?.getTiming().duration) ||
      SITE_DOCK_SPIN_HOVER_MS);

  const current = captureSiteDockBrandAngle(spin);
  const target = nextUprightAngleDeg(current);
  const remaining = target - current;

  if (options.reducedMotion || remaining < UPRIGHT_EPS_DEG) {
    setBrandAngleStyle(spin, 0);
    return null;
  }

  const duration = settleDurationMs(current, periodMs);
  if (duration <= 0) {
    setBrandAngleStyle(spin, 0);
    return null;
  }

  const anim = (spin as HTMLElement).animate(
    [
      { [SITE_DOCK_BRAND_ANGLE_VAR]: `${current}deg` },
      { [SITE_DOCK_BRAND_ANGLE_VAR]: `${target}deg` },
    ],
    {
      duration,
      easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
      fill: "forwards",
    },
  );
  anim.id = SITE_DOCK_BRAND_SETTLE_NAME;

  void anim.finished
    .then(() => {
      if (anim.playState !== "finished") return;
      setBrandAngleStyle(spin, 0);
      anim.cancel();
    })
    .catch(() => {
      /* cancelled */
    });

  return anim;
}
