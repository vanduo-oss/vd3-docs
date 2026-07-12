<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { VdFooter } from "@vanduo-oss/vd3";

const sections = [
  { title: "Product", links: ["Features", "Pricing", "Docs"] },
  { title: "Company", links: ["About", "Blog", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms"] },
];

const coreHtml = `<!-- Rendered output of &lt;VdFooter :columns="3"&gt; -->
<footer class="vd-footer vd-footer-3col">
  <div class="vd-footer-container">
    <div class="vd-footer-section">
      <h4 class="vd-footer-heading">Product</h4>
      <ul class="vd-footer-list">
        <li class="vd-footer-list-item"><a class="vd-footer-link" href="#">Docs</a></li>
        <li class="vd-footer-list-item"><a class="vd-footer-link" href="#">Components</a></li>
      </ul>
    </div>
    <div class="vd-footer-copyright">© 2026 Vanduo</div>
  </div>
</footer>`;

const vue3Usage = `<script setup lang="ts">
import { VdFooter } from "@vanduo-oss/vd3";
<\/script>

<template>
  <VdFooter :columns="3">
    <div class="vd-footer-section">
      <h4 class="vd-footer-heading">Product</h4>
      <ul class="vd-footer-list">
        <li class="vd-footer-list-item">
          <a class="vd-footer-link" href="/docs">Docs</a>
        </li>
        <li class="vd-footer-list-item">
          <a class="vd-footer-link" href="/components">Components</a>
        </li>
      </ul>
    </div>

    <template #copyright>© 2026 Vanduo</template>
  </VdFooter>
</template>`;

const variants: [string, string][] = [
  [
    ".vd-footer-2col / .vd-footer-3col / .vd-footer-4col",
    "Responsive grid columns",
  ],
  [".vd-footer-dark", "Dark visual style"],
  [".vd-footer-sm / .vd-footer-lg", "Compact or spacious padding"],
  [".vd-footer-brand", "Brand/logo block"],
  [".vd-footer-social", "Social action links row"],
  [".vd-footer-copyright", "Bottom legal row"],
];

const cssVars: [string, string][] = [
  ["--vd-footer-bg", "var(--vd-bg-secondary)"],
  ["--vd-footer-link-color", "var(--vd-text-secondary)"],
  ["--vd-footer-heading-color", "var(--vd-text-primary)"],
  ["--vd-footer-padding-y", "3.4375rem (55px)"],
  ["--vd-footer-padding-y-sm", "2.125rem (34px)"],
  ["--vd-footer-padding-y-lg", "5.5625rem (89px)"],
  ["--vd-footer-section-spacing", "2.125rem (34px)"],
];

const vue3Api: [string, string][] = [
  [
    ":columns",
    "2 | 3 | 4 — responsive grid columns. Omit for a single flowing block.",
  ],
  [":dark", "Dark visual style (`.vd-footer-dark`)."],
  [":size", "'sm' | 'lg' — compact or spacious padding."],
  [
    "default slot",
    "Footer content — `.vd-footer-section` columns, brand, and social rows.",
  ],
  [
    "copyright slot",
    "Bottom legal row, rendered inside `.vd-footer-copyright`.",
  ],
];

const apiRows: [string, string, string][] = [
  [".vd-footer", "Base container for the page footer element.", "Component"],
  [
    ".vd-footer-container",
    "Inner max-width wrapper the component renders around the slotted content.",
    "Layout",
  ],
  [
    ".vd-footer-section",
    "A column or grouping area within the footer grid.",
    "Layout",
  ],
  [
    ".vd-footer-heading",
    "Typography class for column titles/headers.",
    "Element",
  ],
  [
    ".vd-footer-list",
    "Unordered list wrapper to remove bullet points and padding.",
    "Layout",
  ],
  [
    ".vd-footer-list-item",
    "Individual item inside a footer list.",
    "Component",
  ],
  [
    ".vd-footer-link",
    "Styled anchor tag commonly used in footer sections.",
    "Element",
  ],
  [
    ".vd-footer-brand",
    "Wrapper for branding/logo displays inside the footer.",
    "Element",
  ],
  [
    ".vd-footer-social",
    "Container to align horizontal social media link icons.",
    "Layout",
  ],
  [
    ".vd-footer-copyright",
    "Typography block for copyright/legal text elements.",
    "Layout",
  ],
  [
    ".vd-footer-[cols]col",
    "Grid layout modifiers: -2col, -3col, -4col.",
    "Modifier",
  ],
  [
    ".vd-footer-[variant]",
    "Style and spacing modifiers: -dark, -sm, -lg.",
    "Modifier",
  ],
];
</script>

<template>
  <section id="footer">
    <h5 class="demo-title"><i class="ph ph-layout"></i>Footer</h5>
    <p class="vd-mb-8">
      <strong>VdFooter</strong> composes branded multi-column footers. Pass
      <code>columns</code>, <code>dark</code>, and <code>size</code>; drop your
      link sections into the default slot and legal text into the
      <code>copyright</code> slot.
    </p>

    <!-- Rendered Demo -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Footer Demo</h6></div>
          <div class="vd-card-body">
            <div
              class="demo-footer-container"
              style="
                border: 1px solid var(--vd-border-color);
                border-radius: var(--vd-radius-fib-5);
                overflow: hidden;
              "
            >
              <VdFooter :columns="3">
                <div
                  v-for="s in sections"
                  :key="s.title"
                  class="vd-footer-section"
                >
                  <h4 class="vd-footer-heading">{{ s.title }}</h4>
                  <ul class="vd-footer-list">
                    <li
                      v-for="link in s.links"
                      :key="link"
                      class="vd-footer-list-item"
                    >
                      <a class="vd-footer-link" href="#footer" @click.prevent>{{
                        link
                      }}</a>
                    </li>
                  </ul>
                </div>
                <template #copyright>
                  © 2026 Vanduo — built with vd3.
                </template>
              </VdFooter>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dark Variant Demo -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Dark Variant</h6></div>
          <div class="vd-card-body">
            <div
              class="demo-footer-container"
              style="
                border: 1px solid var(--vd-border-color);
                border-radius: var(--vd-radius-fib-5);
                overflow: hidden;
              "
            >
              <VdFooter dark :columns="2">
                <div class="vd-footer-section">
                  <h4 class="vd-footer-heading">Resources</h4>
                  <ul class="vd-footer-list">
                    <li class="vd-footer-list-item">
                      <a class="vd-footer-link" href="#footer" @click.prevent
                        >Guides</a
                      >
                    </li>
                    <li class="vd-footer-list-item">
                      <a class="vd-footer-link" href="#footer" @click.prevent
                        >Changelog</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="vd-footer-section">
                  <h4 class="vd-footer-heading">Community</h4>
                  <ul class="vd-footer-list">
                    <li class="vd-footer-list-item">
                      <a class="vd-footer-link" href="#footer" @click.prevent
                        >GitHub</a
                      >
                    </li>
                    <li class="vd-footer-list-item">
                      <a class="vd-footer-link" href="#footer" @click.prevent
                        >Discussions</a
                      >
                    </li>
                  </ul>
                </div>
                <template #copyright> © 2026 Vanduo. MIT licensed. </template>
              </VdFooter>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Core Markup + Variants -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Core Markup</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="coreHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Layouts &amp; Variants</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in variants" :key="row[0]">
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
      </div>
    </div>

    <!-- CSS Variables -->
    <div class="vd-row">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>CSS Variables</h6></div>
          <div class="vd-card-body">
            <div class="vd-table-responsive">
              <table class="vd-table vd-table-striped">
                <thead>
                  <tr>
                    <th>Variable</th>
                    <th>Default</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in cssVars" :key="row[0]">
                    <td>
                      <code>{{ row[0] }}</code>
                    </td>
                    <td>
                      <code>{{ row[1] }}</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

        <h4 class="vd-mt-6">Component API</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-striped">
            <thead>
              <tr>
                <th>Prop / slot</th>
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

        <h4 class="vd-mt-6">CSS Classes</h4>
        <div class="vd-table-responsive">
          <table class="vd-table vd-table-hover">
            <thead>
              <tr>
                <th style="width: 25%">Class Name</th>
                <th style="width: 55%">Description</th>
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
      </div>
    </div>
  </section>
</template>
