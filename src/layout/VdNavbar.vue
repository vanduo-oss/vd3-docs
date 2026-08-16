<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useNavbarGlassScroll } from "@vanduo-oss/vd3";
import Vd3BrandMark from "@/components/Vd3BrandMark.vue";
import VdThemeCustomizer from "@/overlays/VdThemeCustomizer.vue";
import VdThemeSwitcher from "@/overlays/VdThemeSwitcher.vue";

/**
 * Docs shell dogfoods package classes:
 * `.vd-navbar-fixed` + `.vd-navbar-float` + `.vd-navbar-glass`
 * (+ scroll via `useNavbarGlassScroll`). Frost / float / centering CSS ships
 * in `@vanduo-oss/vd3` — docs only adds brand typography + always-visible
 * search/theme actions (`.navbar-actions-always`).
 */
const navRef = ref<HTMLElement | null>(null);
const isScrolled = useNavbarGlassScroll(navRef);
const menuOpen = ref(false);

const links = [
  { label: "Home", to: "/" },
  { label: "Docs", to: "/docs-landing" },
  { label: "CBUN", to: "/cbun" },
  { label: "Showcase", to: "/showcase" },
];

const onSearchClick = (): void => {
  window.dispatchEvent(new CustomEvent("vd:open-search"));
};
const toggleMenu = (): void => {
  menuOpen.value = !menuOpen.value;
};
const closeMenu = (): void => {
  menuOpen.value = false;
};
</script>

<template>
  <nav
    ref="navRef"
    class="vd-navbar vd-navbar-fixed vd-navbar-float vd-navbar-glass"
    :class="{ 'vd-navbar-scrolled': isScrolled }"
  >
    <div class="vd-navbar-container">
      <div class="vd-navbar-brand">
        <div class="vd-navbar-brand-wrap">
          <RouterLink to="/" class="vd-navbar-brand-link" @click="closeMenu">
            <Vd3BrandMark size="2.25rem" class="vd-brand-mark-nav" />
            <span class="hero-title-text">
              <span class="hero-title-brand">vd3</span>
            </span>
          </RouterLink>
        </div>
      </div>

      <div class="navbar-actions-always">
        <!-- Search → Theme switcher → Customizer -->
        <button
          class="global-search-trigger"
          aria-label="Open global search"
          @click="onSearchClick"
        >
          <i class="ph-bold ph-magnifying-glass"></i>
        </button>
        <VdThemeSwitcher />
        <VdThemeCustomizer />
      </div>

      <button
        class="vd-navbar-toggle"
        :class="{ 'is-active': menuOpen }"
        aria-label="Toggle navigation"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <span></span><span></span><span></span>
      </button>

      <div class="vd-navbar-menu" :class="{ 'is-open': menuOpen }">
        <ul class="vd-navbar-nav">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="vd-nav-link"
              active-class="is-active"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
