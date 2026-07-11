<script setup lang="ts">
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";

const structureHtml = `<!-- Responsive navbar with mobile toggle -->
<nav class="vd-navbar">
  <div class="vd-navbar-container">
    <a href="#" class="vd-navbar-brand">Vanduo</a>

    <button class="vd-navbar-toggle" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>

    <div class="vd-navbar-menu" aria-hidden="true">
      <ul class="vd-navbar-nav">
        <li><a class="vd-nav-link active" href="#">Home</a></li>
        <li><a class="vd-nav-link" href="#">Docs</a></li>
      </ul>
      <div class="vd-navbar-actions">
        <button class="vd-btn vd-btn-primary vd-btn-sm">Sign in</button>
      </div>
    </div>
  </div>
</nav>`;

const variants: [string, string][] = [
  [".vd-navbar-dark", "Dark theme navbar"],
  [".vd-navbar-transparent", "Transparent until .vd-navbar-scrolled"],
  [".vd-navbar-fixed / .vd-navbar-fixed-top", "Fixed at page top"],
  [".vd-navbar-fixed-bottom", "Fixed at page bottom"],
  [".vd-navbar-sticky", "Sticky while scrolling"],
];

const cssVars: [string, string][] = [
  ["--vd-navbar-bg", "var(--vd-color-white)"],
  ["--vd-navbar-text-color", "var(--vd-text-primary)"],
  ["--vd-navbar-link-color", "var(--vd-text-primary)"],
  ["--vd-navbar-link-hover-color", "var(--vd-color-primary)"],
  ["--vd-navbar-height", "3.4375rem (55px)"],
  ["--vd-navbar-nav-gap", "1.3125rem (21px)"],
  ["--vd-navbar-mobile-menu-width", "233px"],
];

const apiRows: [string, string, string][] = [
  [
    ".vd-navbar",
    "Base container for the responsive top navigation bar.",
    "Component",
  ],
  [".vd-navbar-container", "Inner constraint wrapper for alignment.", "Layout"],
  [
    ".vd-navbar-brand",
    "Link container for the site logo or brand name.",
    "Element",
  ],
  [
    ".vd-navbar-toggle",
    "Hamburger button that toggles the mobile menu visibility.",
    "Action",
  ],
  [
    ".vd-navbar-menu",
    "The collapsible or slide-in container that holds navigation items and actions.",
    "Layout",
  ],
  [".vd-navbar-nav", "List wrapper for a group of navigation links.", "Layout"],
  [
    ".vd-nav-link",
    "Individual link within the navbar. Append .active for current route styling.",
    "Element",
  ],
  [
    ".vd-navbar-actions",
    'Container to align CTA buttons (like "Sign in") to the right or bottom of the menu.',
    "Layout",
  ],
  [
    ".vd-navbar-[variant]",
    "Modifiers for theme and positioning (-dark, -transparent, -fixed, -sticky).",
    "Modifier",
  ],
];
</script>

<template>
  <section id="navbar">
    <h5 class="demo-title"><i class="ph ph-list"></i>Navbar</h5>
    <p class="vd-mb-8">
      Build responsive top navigation with brand, centered links, action
      buttons, mobile slide-in menus, and optional dropdowns.
    </p>

    <!-- Rendered Demo -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Navbar Demo</h6></div>
          <div class="vd-card-body">
            <div
              class="demo-navbar-container"
              style="
                border: 1px solid var(--vd-border-color);
                border-radius: var(--vd-radius-fib-5);
                overflow: hidden;
              "
            >
              <nav class="vd-navbar" style="position: relative">
                <div class="vd-navbar-container">
                  <a href="#" class="vd-navbar-brand" @click.prevent>Brand</a>
                  <div class="vd-navbar-menu" style="display: flex">
                    <ul class="vd-navbar-nav">
                      <li>
                        <a href="#" class="vd-nav-link active" @click.prevent
                          >Home</a
                        >
                      </li>
                      <li>
                        <a href="#" class="vd-nav-link" @click.prevent>Docs</a>
                      </li>
                      <li>
                        <a href="#" class="vd-nav-link" @click.prevent>About</a>
                      </li>
                    </ul>
                    <div class="vd-navbar-actions">
                      <button class="vd-btn vd-btn-primary vd-btn-sm">
                        Sign in
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Basic Structure + Variants -->
    <div class="vd-row">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Basic Structure</h6></div>
          <div class="vd-card-body">
            <DocCodeSnippet :html="structureHtml" />
          </div>
        </div>
      </div>
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6>Variants &amp; Positioning</h6>
          </div>
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
            <p class="vd-text-sm vd-text-muted vd-mt-4">
              Use <code>.vd-navbar-dropdown</code>,
              <code>.vd-navbar-dropdown-menu</code>, and
              <code>.vd-navbar-dropdown-item</code> for nested navigation menus.
            </p>
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
