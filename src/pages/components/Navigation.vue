<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useNavbarGlassScroll } from "@vanduo-oss/vd3";
import { useSidenav } from "@vanduo-oss/vd3";

const navRoot = ref<HTMLElement | null>(null);
useNavbarGlassScroll(navRoot);

const sidenavRoot = ref<HTMLElement | null>(null);
useSidenav(sidenavRoot);

const navIndex = [
  {
    id: "breadcrumb",
    label: "Breadcrumbs",
    desc: "Hierarchical trail showing the current page within a section.",
  },
  {
    id: "pagination",
    label: "Pagination",
    desc: "Static or JS-driven page navigation.",
  },
  {
    id: "navbar",
    label: "Navbar",
    desc: "Top-of-page brand + links container with sticky/glass variants.",
  },
  {
    id: "sidenav",
    label: "Sidenav",
    desc: "Vertical sidebar nav with active-section highlight.",
  },
  {
    id: "sticky",
    label: "Sticky",
    desc: "Make any element stick to a viewport edge on scroll.",
  },
] as const;

type NavIndexId = (typeof navIndex)[number]["id"];
const previewId = ref<NavIndexId>("breadcrumb");

const breadcrumbHtml = `<nav class="vd-breadcrumbs" aria-label="Breadcrumb">
  <ol class="vd-breadcrumb">
    <li class="vd-breadcrumb-item"><a href="#">Home</a></li>
    <li class="vd-breadcrumb-item"><a href="#">Library</a></li>
    <li class="vd-breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>`;

const paginationHtml = `<!-- CSS-only pagination (server-rendered) -->
<nav aria-label="Page navigation">
  <ul class="vd-pagination">
    <li class="vd-pagination-item">
      <a href="#" class="vd-pagination-link" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="vd-pagination-item"><a href="#" class="vd-pagination-link">1</a></li>
    <li class="vd-pagination-item"><a href="#" class="vd-pagination-link">2</a></li>
    <li class="vd-pagination-item active"><a href="#" class="vd-pagination-link">3</a></li>
    <li class="vd-pagination-item"><a href="#" class="vd-pagination-link">4</a></li>
    <li class="vd-pagination-item"><a href="#" class="vd-pagination-link">5</a></li>
    <li class="vd-pagination-item">
      <a href="#" class="vd-pagination-link" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>

<!-- JavaScript-driven pagination -->
<nav aria-label="Page navigation (interactive)">
  <ul class="vd-pagination"
      data-pagination
      data-total-pages="12"
      data-current-page="3"
      data-max-visible="7"></ul>
</nav>`;

const navbarHtml = `<header class="vd-navbar vd-navbar-fixed vd-navbar-glass">
  <div class="vd-navbar-container">
    <a href="/" class="vd-navbar-brand">Brand</a>
    <nav class="vd-navbar-nav">
      <a href="/docs" class="vd-nav-link">Docs</a>
      <a href="/about" class="vd-nav-link">About</a>
    </nav>
  </div>
</header>`;

const sidenavHtml = `<aside class="vd-sidenav">
  <ul class="vd-sidenav-list">
    <li class="vd-sidenav-item active">
      <a href="#" class="vd-sidenav-link">Section 1</a>
    </li>
    <li class="vd-sidenav-item">
      <a href="#" class="vd-sidenav-link">Section 2</a>
    </li>
    <li class="vd-sidenav-item">
      <a href="#" class="vd-sidenav-link">Section 3</a>
    </li>
  </ul>
</aside>`;

const stickyHtml = `<!-- Pin inside a framed scroller, not the page viewport -->
<div class="demo-frame" style="max-height: 12rem; overflow-y: auto;">
  <div style="position: sticky; top: 0;">Sticky bar</div>
  <!-- scrollable content -->
</div>`;
</script>

<template>
  <section id="navigation">
    <h5 class="demo-title"><i class="ph ph-compass"></i>Navigation</h5>
    <p class="vd-mb-8">
      Catalog of vd3's navigation primitives — breadcrumbs, pagination, navbar,
      sidenav, and sticky. Each component has its own dedicated page for full
      API + demos; this page is a quick-reference index.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card nav-index-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-bullets"></i> Components</h6>
          </div>
          <div class="vd-card-body">
            <nav class="nav-index" aria-label="Navigation components">
              <ul class="nav-index-list">
                <li
                  v-for="item in navIndex"
                  :key="item.id"
                  class="nav-index-item"
                  :class="{ 'is-active': previewId === item.id }"
                >
                  <button
                    type="button"
                    class="nav-index-link"
                    :aria-pressed="previewId === item.id"
                    @click="previewId = item.id"
                  >
                    {{ item.label }}
                  </button>
                  <p class="nav-index-desc">{{ item.desc }}</p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div id="breadcrumb" class="vd-row vd-mb-6 nav-demo-target">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Breadcrumbs</h6></div>
          <div class="vd-card-body">
            <nav class="vd-breadcrumbs" aria-label="Breadcrumb">
              <ol class="vd-breadcrumb">
                <li class="vd-breadcrumb-item">
                  <a href="#" @click.prevent>Home</a>
                </li>
                <li class="vd-breadcrumb-item">
                  <a href="#" @click.prevent>Library</a>
                </li>
                <li class="vd-breadcrumb-item active" aria-current="page">
                  Data
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <DocCodeSnippet :html="breadcrumbHtml" />
      </div>
    </div>

    <!-- Pagination -->
    <div id="pagination" class="vd-row vd-mb-6 nav-demo-target">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pagination (CSS only)</h6></div>
          <div class="vd-card-body">
            <nav aria-label="Page navigation" @click.prevent>
              <ul class="vd-pagination">
                <li class="vd-pagination-item">
                  <a href="#" class="vd-pagination-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li class="vd-pagination-item">
                  <a href="#" class="vd-pagination-link">1</a>
                </li>
                <li class="vd-pagination-item">
                  <a href="#" class="vd-pagination-link">2</a>
                </li>
                <li class="vd-pagination-item active">
                  <a href="#" class="vd-pagination-link">3</a>
                </li>
                <li class="vd-pagination-item">
                  <a href="#" class="vd-pagination-link">4</a>
                </li>
                <li class="vd-pagination-item">
                  <a href="#" class="vd-pagination-link">5</a>
                </li>
                <li class="vd-pagination-item">
                  <a href="#" class="vd-pagination-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <DocCodeSnippet :html="paginationHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pagination (JavaScript)</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Add <code>data-pagination</code> on the list; set
              <code>data-total-pages</code>, <code>data-current-page</code>, and
              optional <code>data-max-visible</code>.
            </p>
            <nav aria-label="Page navigation (interactive demo)" @click.prevent>
              <ul
                class="vd-pagination"
                data-pagination
                data-total-pages="12"
                data-current-page="3"
                data-max-visible="7"
              ></ul>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Navbar -->
    <div id="navbar" class="vd-row vd-mb-6 nav-demo-target" ref="navRoot">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Navbar (glass)</h6></div>
          <div class="vd-card-body" style="padding: 0">
            <header
              class="vd-navbar vd-navbar-glass"
              style="position: relative"
            >
              <div class="vd-navbar-container">
                <a href="#" class="vd-navbar-brand" @click.prevent>Brand</a>
                <nav class="vd-navbar-nav">
                  <a href="#" class="vd-nav-link" @click.prevent>Docs</a>
                  <a href="#" class="vd-nav-link" @click.prevent>About</a>
                </nav>
              </div>
            </header>
          </div>
        </div>
        <DocCodeSnippet :html="navbarHtml" />
      </div>
    </div>

    <!-- Sidenav -->
    <div id="sidenav" class="vd-row vd-mb-6 nav-demo-target" ref="sidenavRoot">
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sidenav</h6></div>
          <div class="vd-card-body" style="padding: 0">
            <aside class="vd-sidenav">
              <ul class="vd-sidenav-list">
                <li class="vd-sidenav-item active">
                  <a href="#" class="vd-sidenav-link" @click.prevent
                    >Section 1</a
                  >
                </li>
                <li class="vd-sidenav-item">
                  <a href="#" class="vd-sidenav-link" @click.prevent
                    >Section 2</a
                  >
                </li>
                <li class="vd-sidenav-item">
                  <a href="#" class="vd-sidenav-link" @click.prevent
                    >Section 3</a
                  >
                </li>
              </ul>
            </aside>
          </div>
        </div>
        <DocCodeSnippet :html="sidenavHtml" />
      </div>

      <div class="vd-col-12 vd-col-md-8">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>See also</h6></div>
          <div class="vd-card-body">
            <ul>
              <li><a href="/components/navbar">Navbar — full page</a></li>
              <li><a href="/components/sidenav">Sidenav — full page</a></li>
              <li>
                <a href="/components/pagination">Pagination — full page</a>
              </li>
              <li>
                <a href="/components/breadcrumb">Breadcrumb — full page</a>
              </li>
              <li><a href="/components/sticky">Sticky — full page</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Sticky: pin inside this frame, never the page viewport -->
    <div id="sticky" class="vd-row vd-mb-6 nav-demo-target">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sticky</h6></div>
          <div class="vd-card-body">
            <p class="vd-text-sm vd-text-muted vd-mb-3">
              Scroll inside the frame. The bar pins to the top of this preview,
              not the page.
            </p>
            <div class="nav-sticky-frame">
              <p class="nav-sticky-lead">
                Lead-in copy so the bar has room to travel before it pins.
              </p>
              <div class="nav-sticky-bar">
                <strong>Sticky</strong>
                <span class="vd-text-sm vd-text-muted"
                  >position: sticky inside this scroller</span
                >
              </div>
              <p>
                Further content keeps the frame scrollable. When this box is at
                its end, or the pointer is outside it, the page scrolls
                normally.
              </p>
              <p>
                Use a framed overflow container for docs previews so sticky
                examples cannot attach to the viewport and yank the page.
              </p>
              <p>
                Keep scrolling here to see the bar stay pinned to the frame
                while this copy moves underneath.
              </p>
              <p>
                The dedicated Sticky page covers offsets, affix events, and
                variants in more depth.
              </p>
              <div class="nav-sticky-spacer" aria-hidden="true"></div>
            </div>
          </div>
        </div>
        <DocCodeSnippet :html="stickyHtml" />
      </div>
    </div>
  </section>
</template>

<style scoped>
/*
 * The Navigation index shows the sidenav as an always-visible INLINE preview
 * (no toggle). The framework's `.vd-sidenav` is a fixed full-height drawer
 * (position: fixed; height: 100vh; overflow-y: auto). `.vd-card` uses
 * `transform: translateZ(0)`, which becomes the containing block for fixed
 * descendants — the drawer then overlays the page as a scroll-stealing panel.
 * Neutralize drawer positioning so it stays in flow inside the demo card.
 */
.demo-card .vd-sidenav {
  position: relative;
  inset: auto;
  height: auto;
  width: 100%;
  transform: none;
  z-index: auto;
  box-shadow: none;
  overflow: visible;
}

.nav-index-card,
.nav-index-card .vd-card-body {
  overflow: visible;
}

.nav-index-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

@media (min-width: 768px) {
  .nav-index-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;
  }
}

.nav-index-item {
  padding: 0.5rem 0.75rem;
  margin: 0;
  border-left: 3px solid transparent;
}

.nav-index-item.is-active {
  border-left-color: var(--vd-color-primary);
}

.nav-index-link {
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font: inherit;
  font-weight: 600;
  color: inherit;
  text-align: left;
  cursor: pointer;
}

.nav-index-link:hover,
.nav-index-link:focus-visible {
  color: var(--vd-color-primary);
}

.nav-index-desc {
  margin: 0.125rem 0 0;
  color: var(--vd-text-muted);
}

.nav-demo-target {
  scroll-margin-top: calc(var(--docs-sticky-offset) + 0.5rem);
}

.nav-sticky-frame {
  max-height: 12.5rem;
  overflow-y: auto;
  overscroll-behavior-y: auto;
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-radius-fib-5, var(--vd-card-border-radius));
  padding: 0.75rem 1rem 1rem;
  background: var(--vd-bg-secondary);
}

.nav-sticky-lead,
.nav-sticky-frame p {
  margin: 0 0 0.75rem;
  color: var(--vd-text-muted);
  font-size: var(--vd-font-size-sm);
}

.nav-sticky-frame p:last-child {
  margin-bottom: 0;
}

.nav-sticky-bar {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0 0 0.75rem;
  padding: 0.625rem 0.75rem;
  background: var(--vd-card-bg);
  border: 1px solid var(--vd-border-color);
  border-radius: var(--vd-btn-border-radius);
}

.nav-sticky-bar strong {
  color: var(--vd-color-primary);
}

.nav-sticky-spacer {
  height: 10rem;
}
</style>
