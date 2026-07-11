<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const sections = [
  { title: "Product", links: ["Features", "Pricing", "Docs"] },
  { title: "Company", links: ["About", "Blog", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms"] },
];

const coreHtml = `<!-- Basic 3-column footer -->
<footer class="vd-footer vd-footer-3col">
  <div class="vd-footer-section">
    <h4 class="vd-footer-heading">Product</h4>
    <ul class="vd-footer-list">
      <li class="vd-footer-list-item"><a class="vd-footer-link" href="#">Docs</a></li>
      <li class="vd-footer-list-item"><a class="vd-footer-link" href="#">Components</a></li>
    </ul>
  </div>
</footer>`;

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

const apiRows: [string, string, string][] = [
  [".vd-footer", "Base container for the page footer element.", "Component"],
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
      Compose branded multi-column footers with list links, social icons, and
      dark/size variants.
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
              <footer
                class="vd-footer vd-footer-3col"
                style="position: relative"
              >
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
                      <a class="vd-footer-link" href="#" @click.prevent>{{
                        link
                      }}</a>
                    </li>
                  </ul>
                </div>
              </footer>
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

    <h4 id="api" class="docs-heading">API Reference</h4>
    <div class="vd-table-responsive" style="margin-bottom: 3rem">
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
  </section>
</template>
