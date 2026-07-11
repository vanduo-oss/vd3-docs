<script setup lang="ts">
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { tokens } from "@vanduo-oss/core";

interface Swatch {
  name: string;
  varRef: string;
  hex: string;
  fg: string;
  star?: boolean;
  border?: boolean;
}

type PalettePrefix = "fib" | "oc";

const hexOf = (name: string): string => tokens[name] ?? "#000000";

/** WCAG relative luminance for an #rrggbb value. */
const luminance = (hex: string): number => {
  const n = hex.replace("#", "");
  const ch = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
  const lin = ch.map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
};
const contrast = (a: string, b: string): number => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};
/** Pick the more legible foreground (dark vs white) for a background hex. */
const fgFor = (hex: string): string =>
  contrast(hex, "#ffffff") >= contrast(hex, "#212529") ? "#ffffff" : "#212529";

/** WCAG rating for a contrast ratio (against the swatch's chosen text colour). */
const wcagLabel = (ratio: number): string =>
  ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : ratio >= 3 ? "AA Large" : "Fail";
const wcagOf = (s: Swatch): string => wcagLabel(contrast(s.hex, s.fg));
const contrastTitle = (s: Swatch): string =>
  `Contrast vs ${s.fg === "#ffffff" ? "white" : "dark"} text — ${contrast(
    s.hex,
    s.fg,
  ).toFixed(2)}:1 (${wcagOf(s)})`;

/** Build a 0–9 scale for a family, painted live from the namespaced palette var. */
const scale = (
  prefix: PalettePrefix,
  family: string,
  mainStep = 5,
  lightSteps = 5,
): Swatch[] =>
  Array.from({ length: 10 }, (_, i) => {
    const varName = `--vd-${prefix}-${family}-${i}`;
    const hex = hexOf(varName);
    return {
      name: `${family}-${i}`,
      varRef: `var(${varName})`,
      hex,
      fg: fgFor(hex),
      star: i === mainStep,
      border: prefix === "oc" && i < lightSteps,
    };
  });

// Open Color (the default palette) — brand, neutrals, and status families.
const families: { title: string; subtitle: string; scale: Swatch[] }[] = [
  {
    title: "Primary — Brand",
    subtitle: "The default brand color — primary actions and emphasis",
    scale: scale("oc", "primary", 5),
  },
  {
    title: "Secondary",
    subtitle: "Secondary actions and accents",
    scale: scale("oc", "secondary", 5),
  },
  {
    title: "Gray — Neutrals",
    subtitle: "Backgrounds, borders, text, and UI structure",
    scale: scale("oc", "gray", 6),
  },
  {
    title: "Danger — Red",
    subtitle: "Error states, destructive actions",
    scale: scale("oc", "danger", 6),
  },
  {
    title: "Success — Green",
    subtitle: "Success states, confirmations",
    scale: scale("oc", "success", 6),
  },
  {
    title: "Warning — Yellow",
    subtitle: "Warnings, cautions, attention",
    scale: scale("oc", "warning", 6),
  },
  {
    title: "Info — Blue",
    subtitle: "Information, help, neutral feedback",
    scale: scale("oc", "info", 6),
  },
];

// Fibonacci (optional) — the golden-angle palette, shown for opt-in comparison.
const fibPrimary = scale("fib", "primary", 5);
const fibGray = scale("fib", "gray", 6);

// Golden accent track (Fibonacci-only) — the golden-angle signature.
const golden: Swatch[] = Array.from({ length: 8 }, (_, i) => {
  const varName = `--vd-fib-golden-${i + 1}`;
  const hex = hexOf(varName);
  return {
    name: `golden-${i + 1}`,
    varRef: `var(${varName})`,
    hex,
    fg: fgFor(hex),
  };
});

const hueNames = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "violet",
  "grape",
  "pink",
];
const hues = hueNames.map((label) => {
  const varName = `--vd-oc-${label}-5`;
  const hex = hexOf(varName);
  return { label, varRef: `var(${varName})`, hex, fg: fgFor(hex) };
});

const swatchStyle = (s: Swatch): string => {
  let style = `background: ${s.varRef}; color: ${s.fg};`;
  if (s.border) style += " border-bottom: 1px solid var(--vd-border-color);";
  return style;
};

const paletteSwitchHtml = `<!-- Default: Open Color palette -->
<html data-palette="open-color">

<!-- Opt in to the Fibonacci (golden-angle) palette -->
<html data-palette="fibonacci"></html>`;

const cssUsage = `/* Active scales follow the active palette (Open Color by default) */
.my-element {
  background: var(--vd-primary-0);  /* Lightest */
  color: var(--vd-primary-9);       /* Darkest */
}

/* Semantic aliases (recommended) */
.my-button {
  background: var(--vd-color-primary);
  border-color: var(--vd-color-primary-dark);
}

/* Golden accent track (Fibonacci-only) */
.badge-accent {
  background: var(--vd-golden-1);
}`;

const themingCss = `:root {
  /* Pin a specific palette regardless of the runtime switch */
  --vd-primary-5: var(--vd-oc-primary-5);
}

/* Or address either palette's raw scale directly */
.swatch-oc  { background: var(--vd-oc-primary-5); }   /* Open Color */
.swatch-fib { background: var(--vd-fib-primary-5); }  /* Fibonacci  */`;
</script>

<template>
  <section id="color-palette">
    <h5 class="demo-title"><i class="ph ph-palette"></i>Color Palette</h5>
    <p class="vd-mb-8">
      Vanduo's default palette is
      <a
        href="https://yeun.github.io/open-color/"
        target="_blank"
        rel="noopener"
        ><strong>Open Color</strong></a
      >
      (MIT) — the friendly, battle-tested scale you already know. For a look
      that shares the same DNA as Vanduo's spacing, type, and grid, opt into the
      <strong>Fibonacci</strong> palette — a <em>golden-angle generated</em>
      system where hues rotate by the golden angle (~137.5°) and every shade
      sits on a
      <RouterLink to="/core/golden-ratio">golden-ratio</RouterLink> lightness
      ramp — via the runtime <code>data-palette</code> switch.
    </p>

    <!-- Palette switch -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6><i class="ph ph-swap"></i> Switching palettes</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Open Color is the <code>:root</code> default; opt into the
              Fibonacci (golden-angle) palette at runtime — every component
              follows automatically.
            </p>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet class="vd-mb-3" :html="paletteSwitchHtml" />
            <p class="vd-mb-0 vd-text-sm vd-text-muted">
              Prefer a UI? The
              <RouterLink to="/components/theme-customizer"
                >Theme Customizer</RouterLink
              >
              exposes the same live controls.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Semantic surfaces: light & dark -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Semantic surfaces — light &amp; dark</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-6">
              The raw scales below are fixed values. The
              <strong>semantic</strong> tokens (<code>--vd-bg-*</code>,
              <code>--vd-text-*</code>, <code>--vd-border-color</code>) remap
              per theme, so the same markup adapts automatically. Here is the
              same set in both modes:
            </p>
            <div class="vd-row">
              <div class="vd-col-12 vd-col-md-6 vd-mb-5">
                <p class="vd-text-sm vd-text-muted vd-mb-2">
                  <i class="ph ph-sun"></i> Light
                </p>
                <div
                  style="
                    background: var(--vd-bg-primary);
                    border: 1px solid var(--vd-border-color);
                    border-radius: var(--vd-radius-fib-5);
                    padding: 1rem;
                  "
                >
                  <div
                    style="
                      background: var(--vd-bg-secondary);
                      color: var(--vd-text-primary);
                      padding: 0.5rem 0.75rem;
                      border-radius: var(--vd-radius-fib-3);
                      margin-bottom: 0.5rem;
                    "
                  >
                    <code>--vd-bg-secondary</code>
                  </div>
                  <div
                    style="
                      background: var(--vd-bg-tertiary);
                      color: var(--vd-text-primary);
                      padding: 0.5rem 0.75rem;
                      border-radius: var(--vd-radius-fib-3);
                      margin-bottom: 0.5rem;
                    "
                  >
                    <code>--vd-bg-tertiary</code>
                  </div>
                  <div
                    style="
                      background: var(--vd-color-primary);
                      color: var(--vd-text-on-primary, #fff);
                      padding: 0.5rem 0.75rem;
                      border-radius: var(--vd-radius-fib-3);
                      margin-bottom: 0.5rem;
                    "
                  >
                    <code>--vd-color-primary</code>
                  </div>
                  <p class="vd-mb-0" style="color: var(--vd-text-primary)">
                    Text primary ·
                    <span style="color: var(--vd-text-muted)">muted</span>
                  </p>
                </div>
              </div>
              <div class="vd-col-12 vd-col-md-6 vd-mb-5">
                <p class="vd-text-sm vd-text-muted vd-mb-2">
                  <i class="ph ph-moon"></i> Dark
                </p>
                <div
                  data-theme="dark"
                  style="
                    background: var(--vd-bg-primary);
                    border: 1px solid var(--vd-border-color);
                    border-radius: var(--vd-radius-fib-5);
                    padding: 1rem;
                  "
                >
                  <div
                    style="
                      background: var(--vd-bg-secondary);
                      color: var(--vd-text-primary);
                      padding: 0.5rem 0.75rem;
                      border-radius: var(--vd-radius-fib-3);
                      margin-bottom: 0.5rem;
                    "
                  >
                    <code>--vd-bg-secondary</code>
                  </div>
                  <div
                    style="
                      background: var(--vd-bg-tertiary);
                      color: var(--vd-text-primary);
                      padding: 0.5rem 0.75rem;
                      border-radius: var(--vd-radius-fib-3);
                      margin-bottom: 0.5rem;
                    "
                  >
                    <code>--vd-bg-tertiary</code>
                  </div>
                  <div
                    style="
                      background: var(--vd-color-primary);
                      color: var(--vd-text-on-primary, #fff);
                      padding: 0.5rem 0.75rem;
                      border-radius: var(--vd-radius-fib-3);
                      margin-bottom: 0.5rem;
                    "
                  >
                    <code>--vd-color-primary</code>
                  </div>
                  <p class="vd-mb-0" style="color: var(--vd-text-primary)">
                    Text primary ·
                    <span style="color: var(--vd-text-muted)">muted</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="vd-alert vd-alert-warning vd-mb-0">
              <i class="ph ph-shield-check"></i>
              <div>
                <strong>Contrast &amp; accessibility.</strong> The ★ marks each
                family's main step; its badge shows the WCAG rating against the
                most legible text colour, and hovering any swatch reveals the
                exact ratio. Because the
                <RouterLink to="/components/theme-customizer"
                  >Theme Customizer</RouterLink
                >
                lets users pick <em>any</em> primary, verify contrast for custom
                colors — see
                <RouterLink to="/guides/accessibility"
                  >Accessibility Essentials</RouterLink
                >.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Color families (Open Color, the default) — 3-up grid -->
    <div class="vd-row">
      <div
        v-for="fam in families"
        :key="fam.title"
        class="vd-col-12 vd-col-md-6 vd-col-lg-4"
      >
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>{{ fam.title }}</h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">{{ fam.subtitle }}</p>
          </div>
          <div class="vd-card-body" style="padding: 0">
            <div class="color-scale">
              <div
                v-for="s in fam.scale"
                :key="s.name"
                class="color-swatch"
                :style="swatchStyle(s)"
                :title="contrastTitle(s)"
              >
                <span class="color-swatch-name"
                  >{{ s.name }}{{ s.star ? " ★" : "" }}</span
                >
                <span v-if="s.star" class="color-swatch-wcag">{{
                  wcagOf(s)
                }}</span>
                <span class="color-swatch-hex">{{ s.hex }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Named hues -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-paint-brush-broad"></i> Named hues &amp; utility
              classes
            </h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              Every hue keeps its recognizable name. Use
              <code>vd-bg-{color}-{shade}</code> /
              <code>vd-text-{color}-{shade}</code>.
            </p>
          </div>
          <div class="vd-card-body">
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem">
              <code
                v-for="hue in hues"
                :key="hue.label"
                :style="`background: ${hue.varRef}; padding: 0.25rem 0.6rem; border-radius: 4px; color: ${hue.fg};`"
                >{{ hue.label }}</code
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Fibonacci (optional) -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-spiral"></i> Fibonacci palette
              <span class="vd-badge vd-badge-info" style="font-size: 0.7rem"
                >optional</span
              >
            </h6>
            <p class="vd-text-sm vd-text-muted vd-mb-0">
              A <em>golden-angle generated</em> system — hues stepped by ≈137.5°
              on golden-ratio shade ramps. Opt in with
              <code>data-palette="fibonacci"</code> and every scale follows.
            </p>
          </div>
          <div class="vd-card-body">
            <!-- Golden accent track -->
            <p class="vd-text-sm vd-text-muted vd-mb-2">
              <i class="ph ph-asterisk"></i> Golden accent track —
              <code>--vd-golden-1</code> … <code>--vd-golden-8</code>, the
              signature of the Fibonacci palette.
            </p>
            <div
              style="display: flex; flex-wrap: wrap; gap: 0"
              class="color-scale vd-mb-6"
            >
              <div
                v-for="s in golden"
                :key="s.name"
                class="color-swatch"
                :style="`${swatchStyle(s)} flex: 1 1 110px; flex-direction: column; align-items: flex-start; gap: 0.25rem;`"
              >
                <span class="color-swatch-name">{{ s.name }}</span>
                <span class="color-swatch-hex">{{ s.hex }}</span>
              </div>
            </div>

            <!-- Fibonacci brand + neutral sample -->
            <div class="vd-row">
              <div class="vd-col-12 vd-col-lg-6">
                <p class="vd-text-sm vd-text-muted vd-mb-2">
                  Primary (Fibonacci "Water")
                </p>
                <div class="color-scale">
                  <div
                    v-for="s in fibPrimary"
                    :key="s.name"
                    class="color-swatch"
                    :style="swatchStyle(s)"
                    :title="contrastTitle(s)"
                  >
                    <span class="color-swatch-name"
                      >{{ s.name }}{{ s.star ? " ★" : "" }}</span
                    >
                    <span v-if="s.star" class="color-swatch-wcag">{{
                      wcagOf(s)
                    }}</span>
                    <span class="color-swatch-hex">{{ s.hex }}</span>
                  </div>
                </div>
              </div>
              <div class="vd-col-12 vd-col-lg-6">
                <p class="vd-text-sm vd-text-muted vd-mb-2">Gray (Fibonacci)</p>
                <div class="color-scale">
                  <div
                    v-for="s in fibGray"
                    :key="s.name"
                    class="color-swatch"
                    :style="swatchStyle(s)"
                  >
                    <span class="color-swatch-name">{{ s.name }}</span>
                    <span class="color-swatch-hex">{{ s.hex }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Usage Guide -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>CSS Variable Usage</h6>
          </div>
          <div class="vd-card-body">
            <DocCodeSnippet :css="cssUsage" />
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Addressing a specific palette</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-3">
              Active scales follow <code>data-palette</code>. To pin a palette
              or reference a raw scale directly:
            </p>
            <DocCodeSnippet :css="themingCss" />
            <p class="vd-text-sm vd-text-muted vd-mt-3">
              Both <code>--vd-oc-*</code> and <code>--vd-fib-*</code> are always
              defined, regardless of the active palette.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Attribution -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow">
          <div class="vd-card-body vd-text-center">
            <p class="vd-text-muted">
              <i
                class="ph ph-palette"
                style="color: var(--vd-color-primary)"
              ></i>
              Default palette:
              <a
                href="https://yeun.github.io/open-color/"
                target="_blank"
                rel="noopener"
                ><strong>Open Color</strong></a
              >
              by Heeyeun Jeong — MIT Licensed · optional Fibonacci palette
              generated by <code>@vanduo-oss/core</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.color-swatch {
  padding: 1rem;
  font-size: var(--vd-font-size-sm);
  font-family: var(--vd-font-family-mono);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.color-swatch-name {
  font-weight: var(--vd-font-weight-medium);
}

.color-swatch-hex {
  opacity: 0.8;
}

.color-swatch-wcag {
  font-size: var(--vd-font-size-xs);
  font-weight: var(--vd-font-weight-semibold);
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  border: 1px solid currentColor;
  opacity: 0.85;
  letter-spacing: 0.02em;
}

.color-scale {
  border-radius: var(--vd-btn-border-radius);
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.color-scale-title {
  font-weight: var(--vd-font-weight-semibold);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-scale-title code {
  font-size: var(--vd-font-size-xs);
  background: var(--vd-bg-secondary);
  padding: 0.125rem 0.375rem;
  border-radius: 3px;
}
</style>
