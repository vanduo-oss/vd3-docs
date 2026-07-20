/** Taller viewBox (1100 vs 922) — scale em size so the mark matches design intent. */
export const VD3_MARK_VIEW_SIZE_RATIO = 1100 / 922;

/** Hero random pool — keep in sync with logo-fx.css selectors. */
export const APPROVED_LOGO_FX = [
  "bloom-spin",
  "spin",
  "counter-spin",
  "pulse",
  "breathe-spin",
  "wobble",
  "heartbeat",
  "stagger-pulse",
  "morph-scale-swap",
  "soft-glow",
  "chromatic-soft",
  "liquid-displace",
  "stroke-draw",
  "outline-only",
  "specular-sweep",
  "cascade-in",
] as const;

export type ApprovedLogoFx = (typeof APPROVED_LOGO_FX)[number];

export function pickRandomLogoFx(): ApprovedLogoFx {
  const index = Math.floor(Math.random() * APPROVED_LOGO_FX.length);
  return APPROVED_LOGO_FX[index] ?? "spin";
}

export function vd3MarkSize(em: number): string {
  return `${em * VD3_MARK_VIEW_SIZE_RATIO}em`;
}

export function isBloomSpinFx(fx: ApprovedLogoFx): boolean {
  return fx === "bloom-spin";
}
