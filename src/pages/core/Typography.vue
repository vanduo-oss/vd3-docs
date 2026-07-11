<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

interface ScaleRow {
  cls: string;
  token: string;
  badge: string;
  badgeVariant: "primary" | "secondary";
  text: string;
}

const scale: ScaleRow[] = [
  {
    cls: "vd-text-6xl",
    token: "--vd-font-size-6xl",
    badge: "54→86px",
    badgeVariant: "secondary",
    text: "Aa",
  },
  {
    cls: "vd-text-5xl",
    token: "--vd-font-size-5xl",
    badge: "45→68px",
    badgeVariant: "secondary",
    text: "Aa",
  },
  {
    cls: "vd-text-4xl",
    token: "--vd-font-size-4xl",
    badge: "37→53px",
    badgeVariant: "secondary",
    text: "Aa",
  },
  {
    cls: "vd-text-3xl",
    token: "--vd-font-size-3xl",
    badge: "31→42px",
    badgeVariant: "secondary",
    text: "The quick brown fox",
  },
  {
    cls: "vd-text-2xl",
    token: "--vd-font-size-2xl",
    badge: "26→33px",
    badgeVariant: "secondary",
    text: "The quick brown fox",
  },
  {
    cls: "vd-text-xl",
    token: "--vd-font-size-xl",
    badge: "22→26px",
    badgeVariant: "secondary",
    text: "The quick brown fox jumps",
  },
  {
    cls: "vd-text-lg",
    token: "--vd-font-size-lg",
    badge: "18→20px",
    badgeVariant: "secondary",
    text: "The quick brown fox jumps over",
  },
  {
    cls: "vd-text-base",
    token: "--vd-font-size-base",
    badge: "16px",
    badgeVariant: "primary",
    text: "The quick brown fox jumps over the lazy dog",
  },
  {
    cls: "vd-text-sm",
    token: "--vd-font-size-sm",
    badge: "13px · fib",
    badgeVariant: "secondary",
    text: "The quick brown fox jumps over the lazy dog",
  },
  {
    cls: "vd-text-xs",
    token: "--vd-font-size-xs",
    badge: "10px",
    badgeVariant: "secondary",
    text: "The quick brown fox jumps over the lazy dog",
  },
];

// Interactive type-scale playground (xs … 6xl, left → right).
const playgroundSteps = [...scale].reverse();
const sampleText = ref("The quick brown fox jumps over the lazy dog");
const stepIdx = ref(
  Math.max(
    0,
    playgroundSteps.findIndex((s) => s.cls === "vd-text-base"),
  ),
);
const current = computed(() => playgroundSteps[stepIdx.value]);

const leading = [
  {
    badge: "tight · 1.236",
    variant: "secondary",
    lh: "var(--vd-line-height-tight)",
  },
  {
    badge: "normal · 1.5",
    variant: "secondary",
    lh: "var(--vd-line-height-normal)",
  },
  {
    badge: "relaxed · 1.618 (φ)",
    variant: "primary",
    lh: "var(--vd-line-height-relaxed)",
  },
];
const leadingText =
  "Vanduo keeps vertical rhythm tied to the golden ratio so dense headings and body copy feel balanced without hand-tuning every block.";

const tracking = [
  { label: "tighter · −0.05em", ls: "var(--vd-letter-spacing-tighter)" },
  { label: "normal · 0", ls: "var(--vd-letter-spacing-normal)" },
  { label: "wider · 0.05em", ls: "var(--vd-letter-spacing-wider)" },
  { label: "widest · 0.1em", ls: "var(--vd-letter-spacing-widest)" },
];

const weights = [
  {
    cls: "vd-font-light",
    label: "Light",
    token: ".vd-font-light",
    value: "(300)",
  },
  {
    cls: "vd-font-normal",
    label: "Normal",
    token: ".vd-font-normal",
    value: "(400)",
  },
  {
    cls: "vd-font-medium",
    label: "Medium",
    token: ".vd-font-medium",
    value: "(500)",
  },
  {
    cls: "vd-font-semibold",
    label: "Semibold",
    token: ".vd-font-semibold",
    value: "(600)",
  },
  {
    cls: "vd-font-bold",
    label: "Bold",
    token: ".vd-font-bold",
    value: "(700)",
  },
  {
    cls: "vd-font-extrabold",
    label: "Extrabold",
    token: ".vd-font-extrabold",
    value: "(800)",
  },
];

const fontHtml = `<!-- Set a curated font on the document -->
<html data-font="ubuntu">

<!-- Add your own: register a stack on the attribute -->
<style>
  [data-font="roboto"] { --vd-font-family-sans: 'Roboto', sans-serif; }
</style>`;

const apiRows: [string, string, string][] = [
  [
    ".vd-text-xs … .vd-text-6xl",
    "Apply a step of the golden-ratio type scale.",
    "Utility",
  ],
  [".vd-font-light … .vd-font-extrabold", "Font weight, 300–800.", "Utility"],
  [".vd-text-italic", "Italic font style.", "Utility"],
  [
    "--vd-line-height-{tight,snug,normal,relaxed,loose}",
    "φ-derived leading tokens (1.236 → 2).",
    "Token",
  ],
  [
    "--vd-letter-spacing-{tighter…widest}",
    "Tracking tokens (−0.05em → 0.1em).",
    "Token",
  ],
  [
    'data-font="[name]"',
    "Curated font stack on <html> (ubuntu, open-sans, lato, jetbrains-mono, system).",
    "Attribute",
  ],
];
</script>

<template>
  <section id="typography">
    <h5 class="demo-title"><i class="ph ph-text-aa"></i>Typography</h5>
    <p class="vd-mb-8">
      A fluid, golden-ratio type system: ten size steps, φ-derived line-heights,
      a tracking scale, and five runtime-switchable font families — all driven
      by <code>--vd-*</code> tokens.
    </p>

    <!-- Type scale -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Golden-ratio type scale</h6></div>
          <div class="vd-card-body">
            <div class="vd-alert vd-alert-info vd-mb-6">
              <i class="ph ph-info"></i>
              <div>
                <strong>Every two steps multiply by φ (1.618).</strong>
                The scale steps by <strong>√φ ≈ 1.272</strong>, so each pair of
                steps lands on the golden ratio:
                16&nbsp;→&nbsp;26&nbsp;→&nbsp;42&nbsp;→&nbsp;68&nbsp;px. Sizes
                <code>lg</code> and up use <code>clamp()</code> to scale fluidly
                between a mobile (≈1.414, augmented fourth) and desktop (φ)
                ratio — no breakpoints needed.
              </div>
            </div>

            <div class="doc-type-scale vd-stack" data-gap="fib-5">
              <div
                v-for="(row, i) in scale"
                :key="row.token"
                class="vd-inline"
                data-justify="between"
                data-align="baseline"
                :style="
                  i < scale.length - 1
                    ? 'border-bottom: 1px solid var(--vd-border-color); padding-bottom: 0.5rem;'
                    : ''
                "
              >
                <span :class="row.cls">{{ row.text }}</span>
                <span class="vd-inline" data-gap="fib-5" data-align="center">
                  <code>{{ row.token }}</code>
                  <span
                    class="vd-badge"
                    :class="`vd-badge-${row.badgeVariant}`"
                    >{{ row.badge }}</span
                  >
                </span>
              </div>
            </div>

            <p class="vd-text-sm vd-text-muted vd-mt-5">
              Utility classes <code>.vd-text-xs</code> …
              <code>.vd-text-6xl</code>
              apply each step. See the
              <RouterLink to="/core/golden-ratio">Golden Ratio</RouterLink>
              page for the proportional system these derive from.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive playground -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>
              <i class="ph ph-sliders-horizontal"></i> Type-scale playground
            </h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-5 vd-text-sm vd-text-muted">
              Type your own copy and drag through the scale — the preview, the
              utility class, and the size update live.
            </p>
            <input
              v-model="sampleText"
              type="text"
              class="vd-input vd-mb-5"
              placeholder="Type sample text…"
              aria-label="Sample text"
            />
            <input
              v-model.number="stepIdx"
              type="range"
              class="vd-range"
              :min="0"
              :max="playgroundSteps.length - 1"
              step="1"
              style="width: 100%"
              aria-label="Type scale step"
            />
            <div
              class="vd-mt-3"
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 1rem;
                flex-wrap: wrap;
              "
            >
              <code>.{{ current.cls }}</code>
              <span class="vd-badge vd-badge-primary">{{ current.badge }}</span>
            </div>
            <div class="type-playground-preview vd-mt-5">
              <span :class="current.cls">{{
                sampleText || "The quick brown fox"
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Leading + tracking -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-lg-7">
        <div
          class="vd-card vd-card-glow demo-card vd-mb-8"
          style="height: 100%"
        >
          <div class="vd-card-header">
            <h6>Line height (leading) — φ-derived</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Line-heights come straight from φ: <code>1.236</code> (2/φ),
              <code>1.382</code>, <code>1.5</code>, and <code>1.618</code> (φ
              itself).
            </p>
            <div class="vd-stack" data-gap="fib-8">
              <div
                v-for="row in leading"
                :key="row.badge"
                class="vd-box"
                data-pad="fib-8"
                data-bg="secondary"
                data-round="md"
              >
                <span
                  class="vd-badge"
                  :class="`vd-badge-${row.variant}`"
                  style="display: inline-block; margin-bottom: 0.5rem"
                  >{{ row.badge }}</span
                >
                <p class="vd-mb-0" :style="`line-height: ${row.lh};`">
                  {{ leadingText }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-lg-5">
        <div
          class="vd-card vd-card-glow demo-card vd-mb-8"
          style="height: 100%"
        >
          <div class="vd-card-header"><h6>Letter spacing (tracking)</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Six tracking tokens, from <code>tighter</code> to
              <code>widest</code>.
            </p>
            <div class="vd-stack" data-gap="fib-5">
              <div v-for="row in tracking" :key="row.label">
                <span class="vd-text-sm vd-text-muted">{{ row.label }}</span
                ><br />
                <span class="vd-text-lg" :style="`letter-spacing: ${row.ls};`"
                  >Vanduo</span
                >
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-5">
              Applied via the <code>--vd-letter-spacing-*</code> tokens.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Headings + weights -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Headings</h6></div>
          <div class="vd-card-body doc-typography-headings">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header"><h6>Weights &amp; styles</h6></div>
          <div class="vd-card-body">
            <p v-for="w in weights" :key="w.cls" :class="w.cls" class="vd-mb-2">
              {{ w.label }} · <code>{{ w.token }}</code> {{ w.value }}
            </p>
            <p class="vd-text-italic vd-mb-0">
              Italic · <code>.vd-text-italic</code>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Font families -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card vd-mb-8">
          <div class="vd-card-header">
            <h6>Font families &amp; runtime switching</h6>
          </div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Vanduo ships <strong>5 curated font options</strong>, switchable
              at runtime via the <code>data-font</code> attribute on
              <code>&lt;html&gt;</code> (also exposed by FontSwitcher and the
              Theme Customizer). The preference persists in
              <code>localStorage.vanduo-font-preference</code>.
            </p>
            <div class="vd-row vd-gap-fib-21">
              <div class="vd-col-12 vd-col-md-6">
                <ul>
                  <li><code>ubuntu</code> — default humanist sans-serif</li>
                  <li><code>open-sans</code> — neutral, highly readable</li>
                  <li><code>lato</code> — friendly, rounded sans-serif</li>
                  <li><code>jetbrains-mono</code> — monospace for code</li>
                  <li>
                    <code>system</code> — native system stack (same as omitting
                    <code>data-font</code>)
                  </li>
                </ul>
              </div>
              <div class="vd-col-12 vd-col-md-6">
                <DocCodeSnippet :html="fontHtml" default-open />
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              Self-hosting steps and the Google Fonts CDN path are covered in
              <RouterLink to="/guides/css-variables"
                >CSS Variables &amp; Theming</RouterLink
              >. For minimum readable sizes and contrast, see
              <RouterLink to="/guides/accessibility"
                >Accessibility Essentials</RouterLink
              >.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- API -->
    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
      <table class="vd-table vd-table-hover">
        <thead>
          <tr>
            <th style="width: 30%">Class / Token</th>
            <th style="width: 50%">Description</th>
            <th style="width: 20%">Type</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in apiRows" :key="row[0]">
            <td>
              <code>{{ row[0] }}</code>
            </td>
            <td>{{ row[1] }}</td>
            <td>{{ row[2] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.type-playground-preview {
  padding: 1.5rem;
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-radius-fib-5, 0.5rem);
  background: var(--vd-bg-secondary);
  overflow-wrap: anywhere;
  line-height: var(--vd-line-height-tight);
}
</style>
