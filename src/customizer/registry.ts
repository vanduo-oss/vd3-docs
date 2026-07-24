/**
 * The component registry. Pure data + string builders (no Vue) describing every
 * customizable component. Adding a 4th component later = one new entry here; the
 * store, override engine, shell, controls, and codegen are all component-agnostic.
 */
import type { CustomizerEntry, CustomizerState } from "./types";

/**
 * Real component props + CSS-only look classes for one demo state. The Vd*
 * components only accept a subset of the customizer's looks as props; the rest
 * (button `outline-*` / `ghost-*`, badge `outlined`, card `outlined` / `filled`
 * / `glow`, and the glass modifiers) are CSS classes that ship in vd3's CSS. We
 * emit those on the element's `class` attribute — mirroring the live preview's
 * `rootClass` — so the generated SFC both typechecks and matches the preview.
 */
interface VdAttrs {
  /** Leading-space-prefixed prop string, e.g. ` variant="primary" size="sm"`. */
  props: string;
  /** Space-joined CSS-only classes appended after the scope class. */
  classes: string;
}

/** VdButton `Variant` is `StatusVariant | "ghost"` — `outline-*` / `ghost-*`
 *  are not props, so they go on `class`. */
function vdBtnAttrs(s: CustomizerState): VdAttrs {
  const props: string[] = [];
  const classes: string[] = [];
  if (s.variant === "vd-btn-primary") props.push(`variant="primary"`);
  else if (s.variant === "vd-btn-secondary") props.push(`variant="secondary"`);
  else if (s.variant) classes.push(s.variant); // vd-btn-outline-primary / -ghost-primary
  if (s.size === "vd-btn-sm") props.push(`size="sm"`);
  else if (s.size === "vd-btn-lg") props.push(`size="lg"`);
  return {
    props: props.length ? ` ${props.join(" ")}` : "",
    classes: classes.join(" "),
  };
}

/** VdBadge accepts `variant` + `pill`; `outlined` and the size classes are
 *  CSS-only. */
function vdBadgeAttrs(s: CustomizerState): VdAttrs {
  const props: string[] = [];
  const classes: string[] = [];
  props.push(
    s.variant.includes("secondary")
      ? `variant="secondary"`
      : `variant="primary"`,
  );
  if (s.variant.includes("pill")) props.push("pill");
  if (s.variant.includes("outlined")) classes.push("vd-badge-outlined");
  if (s.size === "vd-badge-sm") classes.push("vd-badge-sm");
  else if (s.size === "vd-badge-lg") classes.push("vd-badge-lg");
  return { props: ` ${props.join(" ")}`, classes: classes.join(" ") };
}

/** VdCard only exposes `elevated`; outlined/filled/glow and the glass modifiers
 *  are CSS-only. */
function vdCardAttrs(s: CustomizerState): VdAttrs {
  const props: string[] = [];
  const classes: string[] = [];
  if (s.variant === "vd-card-elevated") props.push("elevated");
  else if (s.variant) classes.push(s.variant); // vd-card-outlined / -filled / -glow
  if (s.glass === "tinted") classes.push("vd-card-glass", "vd-glass-tinted");
  else if (s.glass !== "off") classes.push("vd-card-glass");
  return {
    props: props.length ? ` ${props.join(" ")}` : "",
    classes: classes.join(" "),
  };
}

/** Compose the demo root `class`: the scope class plus any CSS-only looks. */
function vueClass(scope: string, classes: string): string {
  return [scope, classes].filter(Boolean).join(" ");
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
    vueTemplate: (s, scope) => {
      const { props, classes } = vdBtnAttrs(s);
      return `  <VdButton${props} class="${vueClass(scope, classes)}">Button</VdButton>`;
    },
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
    vueTemplate: (s, scope) => {
      const { props, classes } = vdBadgeAttrs(s);
      return `  <VdBadge${props} class="${vueClass(scope, classes)}">Badge</VdBadge>`;
    },
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
    vueTemplate: (s, scope) => {
      const { props, classes } = vdCardAttrs(s);
      return `  <VdCard${props} class="${vueClass(scope, classes)}">
    <template #header><h6>Card title</h6></template>
    Body content lives in the card body — customize its look and copy the code.
    <template #footer>
      <VdButton variant="primary" size="sm">Action</VdButton>
    </template>
  </VdCard>`;
    },
  },
};

/** Ordered ids for iteration / defaults. */
export const CUSTOMIZER_IDS = Object.keys(CUSTOMIZER_REGISTRY);

/** Render the demo root element (framework classes + literals only ⇒ v-html
 *  safe). Shared verbatim by the live preview and the Vanilla HTML output. */
export function renderDemo(entry: CustomizerEntry, s: CustomizerState): string {
  return `<${entry.tag} class="${entry.rootClass(s)}">${entry.inner(s)}</${entry.tag}>`;
}
