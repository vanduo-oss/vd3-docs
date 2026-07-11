/**
 * The component registry. Pure data + string builders (no Vue) describing every
 * customizable component. Adding a 4th component later = one new entry here; the
 * store, override engine, shell, controls, and codegen are all component-agnostic.
 */
import type { CustomizerEntry, CustomizerState } from "./types";

/** Map a variant/size class suffix to the equivalent VdButton props. */
function vdBtnProps(s: CustomizerState): string {
  const variant = s.variant.replace("vd-btn-", "").replace("-primary", "");
  let props = "";
  if (s.variant.includes("outline")) props += ` variant="outline-primary"`;
  else if (s.variant.includes("ghost")) props += ` variant="ghost-primary"`;
  else if (variant && variant !== "primary") props += ` variant="${variant}"`;
  else props += ` variant="primary"`;
  if (s.size === "vd-btn-sm") props += ` size="sm"`;
  else if (s.size === "vd-btn-lg") props += ` size="lg"`;
  return props;
}

function vdBadgeProps(s: CustomizerState): string {
  let props = "";
  if (s.variant.includes("secondary")) props += ` variant="secondary"`;
  else props += ` variant="primary"`;
  if (s.variant.includes("pill")) props += ` pill`;
  return props;
}

function vdCardProps(s: CustomizerState): string {
  let props = "";
  if (s.variant === "vd-card-elevated") props += ` elevated`;
  return props;
}

export const CUSTOMIZER_REGISTRY: Record<string, CustomizerEntry> = {
  button: {
    id: "button",
    label: "Button",
    icon: "cursor-click",
    knobs: [
      "variant",
      "size",
      "primary",
      "secondary",
      "radius",
      "shadow",
      "font",
      "fontSize",
      "outline",
    ],
    variants: [
      { value: "vd-btn-primary", label: "Primary" },
      { value: "vd-btn-secondary", label: "Secondary" },
      { value: "vd-btn-outline-primary", label: "Outline" },
      { value: "vd-btn-ghost-primary", label: "Ghost" },
    ],
    sizes: [
      { value: "", label: "Medium" },
      { value: "vd-btn-sm", label: "Small" },
      { value: "vd-btn-lg", label: "Large" },
    ],
    defaults: { variant: "vd-btn-primary", size: "", shadow: "none" },
    tag: "button",
    rootClass: (s) => ["vd-btn", s.variant, s.size].filter(Boolean).join(" "),
    inner: () => "Button",
    extraCss: (s, scope) => {
      let css = "";
      if (s.outline > 0)
        css += `${scope} .vd-btn { border-width: ${s.outline}px; border-color: var(--vd-color-primary); }\n`;
      if (s.shadow !== "none")
        css += `${scope} .vd-btn { box-shadow: var(--vd-shadow-${s.shadow}); }\n`;
      return css;
    },
    vueImports: ["VdButton"],
    vueTemplate: (s, scope) =>
      `  <VdButton${vdBtnProps(s)} class="${scope}">Button</VdButton>`,
  },

  badge: {
    id: "badge",
    label: "Badge",
    icon: "tag",
    knobs: [
      "variant",
      "size",
      "primary",
      "secondary",
      "radius",
      "font",
      "fontSize",
      "outline",
    ],
    variants: [
      { value: "vd-badge-primary", label: "Primary" },
      { value: "vd-badge-secondary", label: "Secondary" },
      { value: "vd-badge-outlined vd-badge-primary", label: "Outlined" },
      { value: "vd-badge-pill vd-badge-primary", label: "Pill" },
    ],
    sizes: [
      { value: "", label: "Medium" },
      { value: "vd-badge-sm", label: "Small" },
      { value: "vd-badge-lg", label: "Large" },
    ],
    defaults: { variant: "vd-badge-primary", size: "" },
    tag: "span",
    rootClass: (s) => ["vd-badge", s.variant, s.size].filter(Boolean).join(" "),
    inner: () => "Badge",
    extraCss: (s, scope) =>
      s.outline > 0
        ? `${scope} .vd-badge { border: ${s.outline}px solid var(--vd-color-primary); }\n`
        : "",
    vueImports: ["VdBadge"],
    vueTemplate: (s, scope) =>
      `  <VdBadge${vdBadgeProps(s)} class="${scope}">Badge</VdBadge>`,
  },

  card: {
    id: "card",
    label: "Card",
    icon: "cards",
    knobs: [
      "variant",
      "primary",
      "secondary",
      "radius",
      "shadow",
      "font",
      "fontSize",
      "glass",
      "outline",
    ],
    variants: [
      { value: "vd-card-elevated", label: "Elevated" },
      { value: "vd-card-outlined", label: "Outlined" },
      { value: "vd-card-filled", label: "Filled" },
      { value: "vd-card-glow", label: "Glow" },
    ],
    sizes: [],
    defaults: { variant: "vd-card-elevated", shadow: "sm" },
    tag: "div",
    rootClass: (s) => {
      const glass =
        s.glass === "off"
          ? ""
          : s.glass === "tinted"
            ? "vd-card-glass vd-glass-tinted"
            : "vd-card-glass";
      return ["vd-card", s.variant, glass].filter(Boolean).join(" ");
    },
    inner: () => `
  <div class="vd-card-header"><h6>Card title</h6></div>
  <div class="vd-card-body"><p class="vd-mb-0">Body content lives in the card body — customize its look and copy the code.</p></div>
  <div class="vd-card-footer">
    <button class="vd-btn vd-btn-primary vd-btn-sm">Action</button>
  </div>
`,
    // Card border/shadow are all leaf-token driven, so no extra CSS needed.
    extraCss: () => "",
    vueImports: ["VdCard", "VdButton"],
    vueTemplate: (s, scope) => `  <VdCard${vdCardProps(s)} class="${scope}">
    <template #header><h6>Card title</h6></template>
    Body content lives in the card body — customize its look and copy the code.
    <template #footer>
      <VdButton variant="primary" size="sm">Action</VdButton>
    </template>
  </VdCard>`,
  },
};

/** Ordered ids for iteration / defaults. */
export const CUSTOMIZER_IDS = Object.keys(CUSTOMIZER_REGISTRY);

/** Render the demo root element (framework classes + literals only ⇒ v-html
 *  safe). Shared verbatim by the live preview and the Vanilla HTML output. */
export function renderDemo(entry: CustomizerEntry, s: CustomizerState): string {
  return `<${entry.tag} class="${entry.rootClass(s)}">${entry.inner(s)}</${entry.tag}>`;
}
