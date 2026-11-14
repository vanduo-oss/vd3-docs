const BRAND_TITLE = "VD3 UI — Fibonacci-Tuned Vue 3 Design System";

/** Browser tab title. Home matches the hero: “VD3 UI”. */
export function docsDocumentTitle(path: string, routeTitle?: string): string {
  if (path === "/") return "VD3 UI";
  if (!routeTitle || routeTitle === "VD3 UI Docs" || routeTitle === "vd3 Docs")
    return BRAND_TITLE;
  return `${routeTitle} — VD3 UI`;
}
