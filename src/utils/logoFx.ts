/** Taller viewBox (1100 vs 922) — scale em size so the mark matches design intent. */
export const VD3_MARK_VIEW_SIZE_RATIO = 1100 / 922;

/** Home hero — single fixed logo effect. */
export const HERO_LOGO_FX = "stroke-draw" as const;

export type HeroLogoFx = typeof HERO_LOGO_FX;

export function vd3MarkSize(em: number): string {
  return `${em * VD3_MARK_VIEW_SIZE_RATIO}em`;
}
