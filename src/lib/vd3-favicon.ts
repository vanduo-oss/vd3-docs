/**
 * The site mark follows `--vd3-mark-*` tokens. A standalone favicon cannot
 * keep `color-mix()` or `var()` references, so the icon is rebuilt from the
 * computed colors whenever the dock changes the primary.
 */

const HEX_COLOR = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const RGB_COLOR =
  /^rgba?\(\s*(?:(?:\d{1,3}\s*,\s*){2}\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+))?|(?:\d{1,3}\s+){2}\d{1,3}(?:\s*\/\s*(?:\d{1,3}%?|0|1|0?\.\d+))?)\s*\)$/;
const SRGB_COLOR =
  /^color\(\s*srgb\s+(?:\d*\.?\d+%?\s+){2}\d*\.?\d+%?(?:\s*\/\s*(?:\d*\.?\d+%?|none))?\s*\)$/;

export const VD3_FAVICON_FALLBACK = {
  outer: "#3d7a4a",
  innerLight: "#2f9e44",
  innerDark: "#163d1c",
} as const;

const INNER_PATH =
  "M145.5 361C145.5 241.983 241.983 145.5 361 145.5C480.017 145.5 576.5 241.983 576.5 361C576.5 480.017 480.017 576.5 361 576.5C241.983 576.5 145.5 480.017 145.5 361Z";

/** Accept only concrete colors so a computed value cannot break out of the SVG. */
export function sanitizeCssColor(value: unknown): string {
  if (typeof value !== "string") return "";
  const color = value.trim();
  if (
    HEX_COLOR.test(color) ||
    RGB_COLOR.test(color) ||
    SRGB_COLOR.test(color)
  ) {
    return color;
  }
  return "";
}

export function buildVd3FaviconSvg(
  outer: string,
  innerLight: string,
  innerDark: string,
): string {
  const safeOuter = sanitizeCssColor(outer) || VD3_FAVICON_FALLBACK.outer;
  const safeLight =
    sanitizeCssColor(innerLight) || VD3_FAVICON_FALLBACK.innerLight;
  const safeDark =
    sanitizeCssColor(innerDark) || VD3_FAVICON_FALLBACK.innerDark;
  return [
    '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="28 90 666 666" fill="none">',
    "<defs>",
    '<radialGradient id="vd3-favicon-inner" cx="361" cy="361" r="215.5" gradientUnits="userSpaceOnUse">',
    `<stop stop-color="${safeLight}"/>`,
    `<stop offset="0.841428" stop-color="${safeDark}"/>`,
    "</radialGradient>",
    "</defs>",
    `<circle cx="145.5" cy="236.581" r="100" fill="${safeOuter}"/>`,
    `<circle cx="576.5" cy="236.581" r="100" fill="${safeOuter}"/>`,
    `<circle cx="361" cy="609.838" r="100" fill="${safeOuter}"/>`,
    `<path d="${INNER_PATH}" fill="url(#vd3-favicon-inner)"/>`,
    "</svg>",
  ].join("");
}

export function vd3FaviconDataUrl(
  outer: string,
  innerLight: string,
  innerDark: string,
): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(buildVd3FaviconSvg(outer, innerLight, innerDark))}`;
}

type ColorProperty = "color" | "backgroundColor" | "borderTopColor";

function readToken(
  root: Element,
  token: string,
  property: ColorProperty,
): string {
  const doc = root.ownerDocument;
  const getStyle = doc?.defaultView?.getComputedStyle;
  if (
    !doc ||
    typeof getStyle !== "function" ||
    typeof doc.createElement !== "function"
  ) {
    return "";
  }
  const probe = doc.createElement("span");
  if (probe.style) {
    probe.style[property] = `var(${token})`;
    probe.style.display = "none";
  }
  try {
    root.appendChild(probe);
    return sanitizeCssColor(getStyle(probe)[property]);
  } catch {
    return "";
  } finally {
    probe.remove?.();
  }
}

function iconLink(doc: Document): HTMLLinkElement {
  const existing = doc.querySelector('link[rel="icon"]');
  if (
    existing &&
    typeof (existing as HTMLElement).setAttribute === "function"
  ) {
    return existing as HTMLLinkElement;
  }
  const link = doc.createElement("link");
  link.setAttribute("rel", "icon");
  link.setAttribute("type", "image/svg+xml");
  doc.head.appendChild(link);
  return link;
}

/**
 * Point the SVG favicon at the current mark colors and keep it in sync
 * when the dock changes `data-primary`.
 */
export function installVd3Favicon(doc: Document = document): () => void {
  if (
    !doc?.documentElement ||
    !doc.head ||
    typeof doc.querySelector !== "function"
  ) {
    return () => {};
  }
  const link = iconLink(doc);
  const sync = (): void => {
    const root = doc.documentElement;
    const outer =
      readToken(root, "--vd3-mark-outer-fill", "color") ||
      VD3_FAVICON_FALLBACK.outer;
    const innerLight =
      readToken(root, "--vd3-mark-inner-light", "backgroundColor") ||
      VD3_FAVICON_FALLBACK.innerLight;
    const innerDark =
      readToken(root, "--vd3-mark-inner-dark", "borderTopColor") ||
      VD3_FAVICON_FALLBACK.innerDark;
    const href = vd3FaviconDataUrl(outer, innerLight, innerDark);
    if (link.getAttribute("href") !== href) link.setAttribute("href", href);
    if (link.getAttribute("type") !== "image/svg+xml") {
      link.setAttribute("type", "image/svg+xml");
    }
  };
  sync();
  const Observer = doc.defaultView?.MutationObserver;
  if (typeof Observer !== "function") return () => {};
  const observer = new Observer(sync);
  observer.observe(doc.documentElement, {
    attributes: true,
    attributeFilter: ["data-primary", "data-theme", "data-palette"],
  });
  return () => observer.disconnect();
}
