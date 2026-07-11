<script setup lang="ts">
import { ref } from "vue";
import DocCodeSnippet from "@/components/DocCodeSnippet.vue";
import { useNavbarGlassScroll } from "@vanduo-oss/vue";
import { useSidenav } from "@vanduo-oss/vue";
import { useScrollspy } from "@vanduo-oss/vue";

const navRoot = ref<HTMLElement | null>(null);
useNavbarGlassScroll(navRoot);

const sidenavRoot = ref<HTMLElement | null>(null);
useSidenav(sidenavRoot);

const { activeId } = useScrollspy([
  "breadcrumb",
  "pagination",
  "navbar",
  "sidenav",
  "sticky",
]);

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
</script>

<template>
  <section id="navigation">
    <h5 class="demo-title"><i class="ph ph-compass"></i>Navigation</h5>
    <p class="vd-mb-8">
      Catalog of Vanduo's navigation primitives — breadcrumbs, pagination,
      navbar, sidenav, and sticky. Each component has its own dedicated page for
      full API + demos; this page is a quick-reference index.
    </p>

    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header">
            <h6><i class="ph ph-list-bullets"></i> Components</h6>
          </div>
          <div class="vd-card-body">
            <ul style="list-style: none; padding: 0">
              <li
                v-for="item in [
                  {
                    id: 'breadcrumb',
                    label: 'Breadcrumbs',
                    desc: 'Hierarchical trail showing the current page within a section.',
                  },
                  {
                    id: 'pagination',
                    label: 'Pagination',
                    desc: 'Static or JS-driven page navigation.',
                  },
                  {
                    id: 'navbar',
                    label: 'Navbar',
                    desc: 'Top-of-page brand + links container with sticky/glass variants.',
                  },
                  {
                    id: 'sidenav',
                    label: 'Sidenav',
                    desc: 'Vertical sidebar nav with active-section highlight.',
                  },
                  {
                    id: 'sticky',
                    label: 'Sticky',
                    desc: 'Make any element stick to a viewport edge on scroll.',
                  },
                ]"
                :key="item.id"
                :id="item.id"
                :style="{
                  padding: '0.75rem 0',
                  borderLeft:
                    activeId === item.id
                      ? '3px solid var(--vd-color-primary)'
                      : '3px solid transparent',
                  paddingLeft: '0.75rem',
                  marginBottom: '0.25rem',
                }"
              >
                <a :href="`#${item.id}`" style="font-weight: 600">{{
                  item.label
                }}</a>
                <p style="margin: 0.25rem 0 0; color: var(--vd-text-muted)">
                  {{ item.desc }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Breadcrumb -->
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Breadcrumbs</h6></div>
          <div class="vd-card-body">
            <nav class="vd-breadcrumbs" aria-label="Breadcrumb">
              <ol class="vd-breadcrumb">
                <li class="vd-breadcrumb-item"><a href="#">Home</a></li>
                <li class="vd-breadcrumb-item"><a href="#">Library</a></li>
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
    <div class="vd-row vd-mb-6">
      <div class="vd-col-12 vd-col-md-6">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Pagination (CSS only)</h6></div>
          <div class="vd-card-body">
            <nav aria-label="Page navigation">
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
            <nav aria-label="Page navigation (interactive demo)">
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
    <div class="vd-row vd-mb-6" ref="navRoot">
      <div class="vd-col-12">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Navbar (glass)</h6></div>
          <div class="vd-card-body" style="padding: 0">
            <header
              class="vd-navbar vd-navbar-glass"
              style="position: relative"
            >
              <div class="vd-navbar-container">
                <a href="#" class="vd-navbar-brand">Brand</a>
                <nav class="vd-navbar-nav">
                  <a href="#" class="vd-nav-link">Docs</a>
                  <a href="#" class="vd-nav-link">About</a>
                </nav>
              </div>
            </header>
          </div>
        </div>
        <DocCodeSnippet :html="navbarHtml" />
      </div>
    </div>

    <!-- Sidenav -->
    <div class="vd-row vd-mb-6" ref="sidenavRoot">
      <div class="vd-col-12 vd-col-md-4">
        <div class="vd-card vd-card-glow demo-card">
          <div class="vd-card-header"><h6>Sidenav</h6></div>
          <div class="vd-card-body" style="padding: 0">
            <aside class="vd-sidenav">
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
  </section>
</template>

<style scoped>
/*
 * The Navigation index shows the sidenav as an always-visible INLINE preview
 * (no toggle). The framework's `.vd-sidenav` is a fixed full-height drawer
 * (position: fixed; height: 100vh; transform: translateX(-100%)); inside a
 * `.vd-card-glow` demo card — whose glow applies a non-`none` transform, making
 * it the containing block for fixed descendants — that drawer escapes into a
 * scroll-tracking overlay across the page sidebar. Neutralize the drawer
 * positioning so it renders in flow inside the demo card.
 */
.demo-card .vd-sidenav {
  position: relative;
  inset: auto;
  height: auto;
  width: 100%;
  transform: none;
  z-index: auto;
  box-shadow: none;
}
</style>
