const BRAND_TITLE = "vd3 — Fibonacci-Tuned Vue 3 Design System";

/** Browser tab title. Home matches the hero: “vd3” plus “UI”. */
export function docsDocumentTitle(path: string, routeTitle?: string): string {
  if (path === "/") return "vd3 UI";
  if (!routeTitle || routeTitle === "vd3 Docs") return BRAND_TITLE;
  return `${routeTitle} — vd3`;
}
