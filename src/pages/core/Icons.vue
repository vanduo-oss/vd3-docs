<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useTooltips } from "@vanduo-oss/vue";

const root = ref<HTMLElement | null>(null);
useTooltips(root);

const weights = [
  { cls: "ph ph-heart", label: "Regular", token: ".ph" },
  { cls: "ph-fill ph-heart", label: "Fill", token: ".ph-fill" },
  { cls: "ph-bold ph-heart", label: "Bold", token: ".ph-bold" },
  { cls: "ph-light ph-heart", label: "Light", token: ".ph-light" },
  { cls: "ph-thin ph-heart", label: "Thin", token: ".ph-thin" },
  { cls: "ph-duotone ph-heart", label: "Duotone", token: ".ph-duotone" },
];

const sampleIcons: { cls: string; tip: string; color?: string }[] = [
  { cls: "ph ph-house", tip: "ph-house" },
  { cls: "ph ph-user", tip: "ph-user" },
  { cls: "ph ph-gear", tip: "ph-gear" },
  { cls: "ph ph-bell", tip: "ph-bell" },
  { cls: "ph ph-envelope", tip: "ph-envelope" },
  { cls: "ph ph-magnifying-glass", tip: "ph-magnifying-glass" },
  { cls: "ph ph-download", tip: "ph-download" },
  { cls: "ph ph-upload", tip: "ph-upload" },
  { cls: "ph ph-trash", tip: "ph-trash" },
  { cls: "ph ph-pencil", tip: "ph-pencil" },
  {
    cls: "ph-fill ph-heart",
    tip: "ph-heart (fill)",
    color: "var(--vd-color-error)",
  },
  {
    cls: "ph-fill ph-star",
    tip: "ph-star (fill)",
    color: "var(--vd-color-warning)",
  },
  {
    cls: "ph ph-check-circle",
    tip: "ph-check-circle",
    color: "var(--vd-color-success)",
  },
  { cls: "ph ph-warning", tip: "ph-warning", color: "var(--vd-color-warning)" },
  { cls: "ph ph-x-circle", tip: "ph-x-circle", color: "var(--vd-color-error)" },
  { cls: "ph ph-info", tip: "ph-info", color: "var(--vd-color-info)" },
];

const quickStartHtml = `<!-- Include default weights (regular + fill) -->
<link rel="stylesheet" href="css/icons/icons.css">

<!-- Use icons -->
<i class="ph ph-heart"></i>
<i class="ph-fill ph-star"></i>
<i class="ph ph-house"></i>`;

const importHtml = `<!-- Default (regular + fill) - Recommended -->
<link rel="stylesheet" href="css/icons/icons.css">

<!-- All 6 weights (~3MB) -->
<link rel="stylesheet" href="css/icons/icons-all.css">

<!-- Individual weights -->
<link rel="stylesheet" href="icons/phosphor/bold/style.css">
<link rel="stylesheet" href="icons/phosphor/light/style.css">`;

const stylingHtml = `<!-- Size with font-size -->
<i class="ph ph-heart" style="font-size: 48px;"></i>

<!-- Color with color -->
<i class="ph-fill ph-star" style="color: gold;"></i>

<!-- Use CSS variables -->
<i class="ph ph-check" style="color: var(--vd-color-success);"></i>`;

const a11yHtml = `<!-- Decorative: label is visible, hide the icon -->
<button class="vd-btn vd-btn-primary">
  <i class="ph ph-download-simple" aria-hidden="true"></i> Download
</button>

<!-- Icon-only: give the control an accessible name -->
<button class="vd-btn" aria-label="Close dialog">
  <i class="ph ph-x" aria-hidden="true"></i>
</button>`;
</script>

<template>
  <section id="icons" ref="root">
    <h5 class="demo-title"><i class="ph ph-images"></i>Icons</h5>
    <p class="vd-mb-8">
      Vanduo includes
      <a href="https://phosphoricons.com" target="_blank" rel="noopener"
        ><strong>Phosphor Icons</strong></a
      >
      — a flexible icon family with 1,500+ icons in 6 weights. Icons are bundled
      locally with no external dependencies.
    </p>

    <!-- Icon Weights -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Icon Weights</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              6 distinct weights for different visual styles:
            </p>
            <div class="doc-icons-weights">
              <div
                v-for="w in weights"
                :key="w.token"
                class="doc-icons-weight-item"
              >
                <i :class="w.cls"></i>
                <p class="vd-text-sm vd-text-muted">
                  {{ w.label }}<br /><code>{{ w.token }}</code>
                </p>
              </div>
            </div>
            <p class="vd-text-sm vd-text-muted vd-mt-5">
              <strong>Note:</strong> The default
              <code>css/vanduo.css</code> bundle (and
              <code>css/icons/icons.css</code>) load only the
              <strong>regular</strong> and <strong>fill</strong> weights. The
              bold, light, thin, and duotone weights above require
              <code>css/icons/icons-all.css</code> — this documentation site
              loads it to preview every weight. See
              <strong>Import Options</strong> below.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Start + Import Options -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Quick Start</h6></div>
          <div class="vd-card-body">
            <p>
              Include the icons stylesheet and use
              <code>&lt;i&gt;</code> elements with the appropriate classes:
            </p>
            <DocCodeSnippet :html="quickStartHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Import Options</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="importHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- Example Icons + Styling -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Example Icons</h6></div>
          <div class="vd-card-body">
            <div class="doc-icons-sample-row">
              <i
                v-for="icon in sampleIcons"
                :key="icon.tip"
                :class="icon.cls"
                :style="icon.color ? `color: ${icon.color};` : undefined"
                :data-tooltip="icon.tip"
              ></i>
            </div>
            <p class="doc-icons-footer vd-text-sm vd-text-muted">
              Browse all 1,500+ icons at
              <a href="https://phosphoricons.com" target="_blank" rel="noopener"
                >phosphoricons.com</a
              >
            </p>
          </div>
        </div>
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Styling Icons</h6></div>
          <div class="vd-card-body">
            <p>Icons are font-based — style them with CSS:</p>
            <DocCodeSnippet :html="stylingHtml" />
            <div class="vd-mt-5" style="font-size: 32px">
              <i class="ph ph-heart"></i>
              <i class="ph ph-heart" style="font-size: 24px"></i>
              <i class="ph ph-heart" style="font-size: 16px"></i>
              <span class="vd-ml-5"></span>
              <i
                class="ph-fill ph-circle"
                style="color: var(--vd-color-primary)"
              ></i>
              <i
                class="ph-fill ph-circle"
                style="color: var(--vd-color-success)"
              ></i>
              <i
                class="ph-fill ph-circle"
                style="color: var(--vd-color-warning)"
              ></i>
              <i
                class="ph-fill ph-circle"
                style="color: var(--vd-color-error)"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Icons in Buttons -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Icons in Buttons</h6></div>
          <div class="vd-card-body">
            <button class="vd-btn vd-btn-primary">
              <i class="ph ph-download mr-2"></i> Download
            </button>
            <button class="vd-btn vd-btn-success">
              <i class="ph ph-check mr-2"></i> Save
            </button>
            <button class="vd-btn vd-btn-danger">
              <i class="ph ph-trash mr-2"></i> Delete
            </button>
            <button class="vd-btn vd-btn-outline">
              <i class="ph ph-gear mr-2"></i> Settings
            </button>
            <button class="vd-btn vd-btn-secondary">
              <i
                class="ph-fill ph-heart mr-2"
                style="color: var(--vd-color-error)"
              ></i>
              Like
            </button>
            <button class="vd-btn vd-btn-info">
              <i class="ph ph-share-network mr-2"></i> Share
            </button>
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
                class="ph ph-heart-straight"
                style="color: var(--vd-color-error)"
              ></i>
              Icons by
              <a href="https://phosphoricons.com" target="_blank" rel="noopener"
                ><strong>Phosphor Icons</strong></a
              >
              — MIT Licensed
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Accessibility</h6></div>
          <div class="vd-card-body">
            <p class="vd-mb-5">
              Phosphor icons render as empty <code>&lt;i&gt;</code> elements
              (the glyph is a font), so they carry no text for assistive tech.
              Two rules cover every case:
            </p>
            <div class="vd-row">
              <div class="vd-col-12 vd-col-md-6 vd-mb-4">
                <div class="vd-alert vd-alert-success" style="height: 100%">
                  <i class="ph ph-check-circle"></i>
                  <div>
                    <strong>Decorative</strong> (sits beside a visible label) →
                    hide it with <code>aria-hidden="true"</code>; the label
                    already speaks for it.
                  </div>
                </div>
              </div>
              <div class="vd-col-12 vd-col-md-6 vd-mb-4">
                <div class="vd-alert vd-alert-info" style="height: 100%">
                  <i class="ph ph-info"></i>
                  <div>
                    <strong>Meaningful &amp; standalone</strong> (icon-only
                    button/link) → name the control with
                    <code>aria-label="…"</code>.
                  </div>
                </div>
              </div>
            </div>
            <DocCodeSnippet :html="a11yHtml" default-open />
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              Also mind <strong>touch targets</strong>: keep icon-only controls
              at least 24×24px (WCAG 2.2). More in
              <RouterLink to="/guides/accessibility"
                >Accessibility Essentials</RouterLink
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
