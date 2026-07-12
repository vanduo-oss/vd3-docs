<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdBreadcrumb } from "@vanduo-oss/vd3";
import type { BreadcrumbItem } from "@vanduo-oss/vd3";

const trail: BreadcrumbItem[] = [
  { label: "Home", href: "#breadcrumbs" },
  { label: "Components", href: "#breadcrumbs" },
  { label: "Breadcrumb" }, // last item, no href → rendered as the current page
];

const separators = ["slash", "chevron", "arrow", "dot", "pipe"] as const;

const usageHtml = `<!-- Rendered output of &lt;VdBreadcrumb :items="trail" /&gt; -->
<nav class="vd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="vd-breadcrumb vd-breadcrumb-separator-slash">
    <li class="vd-breadcrumb-item">
      <a class="vd-breadcrumb-link" href="/">Home</a>
    </li>
    <li class="vd-breadcrumb-item">
      <a class="vd-breadcrumb-link" href="/components">Components</a>
    </li>
    <li class="vd-breadcrumb-item vd-breadcrumb-current" aria-current="page">
      Breadcrumb
    </li>
  </ol>
</nav>`;

const slotHtml = `<VdBreadcrumb aria-label="Custom breadcrumb">
  <li class="vd-breadcrumb-item">
    <a class="vd-breadcrumb-link" href="/"><i class="ph ph-house"></i> Home</a>
  </li>
  <li class="vd-breadcrumb-item">
    <a class="vd-breadcrumb-link" href="/settings">Settings</a>
  </li>
  <li class="vd-breadcrumb-item vd-breadcrumb-current" aria-current="page">
    Profile
  </li>
</VdBreadcrumb>`;

const vue3Usage = `<script setup lang="ts">
import { VdBreadcrumb } from "@vanduo-oss/vd3";
import type { BreadcrumbItem } from "@vanduo-oss/vd3";

const trail: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Components", href: "/components" },
  { label: "Breadcrumb" }, // last item = current page
];
<\/script>

<template>
  <VdBreadcrumb :items="trail" separator="chevron" />
</template>`;

const cssClasses: [string, string][] = [
  [".vd-breadcrumbs", 'The <nav> landmark wrapper (aria-label="Breadcrumb").'],
  [".vd-breadcrumb", "The <ol> trail element."],
  [".vd-breadcrumb-item", "A single <li> entry in the trail."],
  [".vd-breadcrumb-link", "Anchor rendered for a non-current, linked item."],
  [
    ".vd-breadcrumb-current",
    'Current item — paired with aria-current="page" and no anchor.',
  ],
  [
    ".vd-breadcrumb-separator-slash / -chevron / -arrow / -dot / -pipe",
    "Separator glyph rendered between items (default: slash).",
  ],
  [".vd-breadcrumb-sm / -lg", "Compact or spacious size variants."],
];

const vue3Api: [string, string][] = [
  [
    ":items",
    "BreadcrumbItem[] — the trail. Each item is { label, href?, current? }.",
  ],
  [
    ":separator",
    "'slash' | 'chevron' | 'arrow' | 'dot' | 'pipe' — glyph between items (default 'slash').",
  ],
  [":size", "'sm' | 'lg' — compact or spacious sizing."],
  [
    ":aria-label",
    "Accessible label for the <nav> landmark (default 'Breadcrumb').",
  ],
  [
    "default slot",
    'Supply your own <li class="vd-breadcrumb-item"> markup instead of :items.',
  ],
  [
    "BreadcrumbItem (type export)",
    "{ label: string; href?: string; current?: boolean }. The current item is the one with current: true, or — if none is set — the last item.",
  ],
];
</script>

<template>
  <section id="breadcrumbs">
    <h5 class="demo-title"><i class="ph ph-caret-right"></i>Breadcrumbs</h5>
    <p class="vd-mb-5">
      <strong>VdBreadcrumb</strong> renders an accessible breadcrumb trail from
      an <code>items</code> array (or a custom default slot). It is markup-only
      — built on <code>breadcrumbs.css</code> — with the current page marked by
      <code>aria-current="page"</code> and no anchor.
    </p>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-breadcrumb-basic" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>From an items array</h6></div>
          <div class="vd-card-body">
            <div @click.prevent>
              <VdBreadcrumb :items="trail" />
            </div>
            <DocCodeSnippet :html="usageHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-breadcrumb-sizes" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Size Variants</h6></div>
          <div class="vd-card-body" @click.prevent>
            <p class="vd-text-sm vd-text-muted vd-mb-2">Small</p>
            <VdBreadcrumb :items="trail" size="sm" separator="chevron" />
            <p class="vd-text-sm vd-text-muted vd-mb-2 vd-mt-4">Large</p>
            <VdBreadcrumb :items="trail" size="lg" separator="chevron" />
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12">
        <div
          id="demo-breadcrumb-separators"
          class="vd-card vd-card-glow demo-card"
        >
          <div class="vd-card-header"><h6>Separators</h6></div>
          <div class="vd-card-body" @click.prevent>
            <div v-for="sep in separators" :key="sep" class="vd-mb-3">
              <p class="vd-text-sm vd-text-muted vd-mb-1">
                <code>separator="{{ sep }}"</code>
              </p>
              <VdBreadcrumb :items="trail" :separator="sep" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div id="demo-breadcrumb-slot" class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Custom slot (icons)</h6></div>
          <div class="vd-card-body">
            <VdBreadcrumb aria-label="Custom breadcrumb">
              <li class="vd-breadcrumb-item">
                <a class="vd-breadcrumb-link" href="#breadcrumbs" @click.prevent
                  ><i class="ph ph-house"></i> Home</a
                >
              </li>
              <li class="vd-breadcrumb-item">
                <a class="vd-breadcrumb-link" href="#breadcrumbs" @click.prevent
                  >Settings</a
                >
              </li>
              <li
                class="vd-breadcrumb-item vd-breadcrumb-current"
                aria-current="page"
              >
                Profile
              </li>
            </VdBreadcrumb>
            <DocCodeSnippet :html="slotHtml" />
          </div>
        </div>
      </div>
    </div>

    <!-- API Reference -->
    <div id="api" class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-list-dashes mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >API Reference
        </h6>
      </div>
      <div class="vd-card-body">
        <h4>Usage</h4>
        <DocCodeSnippet :html="vue3Usage" :default-open="true" />

        <h4 class="vd-mt-6">CSS Classes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Class</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in cssClasses" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h4 class="vd-mt-6">Component API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / slot / type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in vue3Api" :key="row[0]">
                <td>
                  <code>{{ row[0] }}</code>
                </td>
                <td>{{ row[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Accessibility -->
    <div class="vd-card vd-card-glow demo-card">
      <div class="vd-card-header">
        <h6>
          <i
            class="ph ph-wheelchair mr-2"
            style="color: var(--vd-color-primary)"
          ></i
          >Accessibility
        </h6>
      </div>
      <div class="vd-card-body">
        <ul>
          <li>
            The trail is a <code>&lt;nav&gt;</code> landmark labelled
            <code>Breadcrumb</code> by default — override with
            <code>:aria-label</code>.
          </li>
          <li>
            The current page renders without an anchor and carries
            <code>aria-current="page"</code> so assistive tech announces it as
            the current location.
          </li>
          <li>
            Only linked, non-current items become <code>&lt;a&gt;</code>
            elements, keeping the trail keyboard-navigable without a dead final
            link.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
