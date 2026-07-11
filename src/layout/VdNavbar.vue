<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useNavbarGlassScroll } from "@vanduo-oss/vue";
import VdThemeCustomizer from "@/overlays/VdThemeCustomizer.vue";
import VdThemeSwitcher from "@/overlays/VdThemeSwitcher.vue";

const navRef = ref<HTMLElement | null>(null);
const isScrolled = useNavbarGlassScroll(navRef);
const menuOpen = ref(false);

const links = [
  { label: "Home", to: "/" },
  { label: "Docs", to: "/docs-landing" },
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
    class="vd-navbar vd-navbar-fixed vd-navbar-glass vd-glass-contrast"
    :class="{ 'vd-navbar-scrolled': isScrolled }"
  >
    <div class="vd-navbar-container">
      <div class="vd-navbar-brand">
        <div class="vd-navbar-brand-wrap">
          <RouterLink to="/" class="vd-navbar-brand-link" @click="closeMenu">
            <img
              src="/images/vanduo-h2o-logo-static.svg"
              class="vd-navbar-brand-logo"
              alt=""
              aria-hidden="true"
              width="200"
              height="200"
              decoding="async"
            />
            <span>Vanduo</span>
          </RouterLink>
        </div>
      </div>

      <div class="navbar-actions-always">
        <button
          class="global-search-trigger"
          aria-label="Open global search"
          @click="onSearchClick"
        >
          <i class="ph ph-magnifying-glass"></i>
        </button>
        <VdThemeCustomizer />
        <VdThemeSwitcher />
      </div>

      <button
        class="vd-navbar-toggle"
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
