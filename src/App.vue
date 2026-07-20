<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import VdNavbar from "@/layout/VdNavbar.vue";
import VdFooter from "@/layout/VdFooter.vue";
import DocsLayout from "@/layout/DocsLayout.vue";
import GlobalSearchModal from "@/overlays/GlobalSearchModal.vue";
import LiveCustomizer from "@/overlays/LiveCustomizer.vue";
import { VdToastContainer } from "@vanduo-oss/vd3";
import { useThemeStore } from "@/stores/theme";
import { useCustomizerStore } from "@/stores/customizer";

const route = useRoute();
const theme = useThemeStore();
const customizer = useCustomizerStore();

// ── Per-route SEO (baked into the SSG HTML via @unhead) ──────────────
const BASE_URL = "https://vanduo.dev";
const BRAND_TITLE = "Vanduo — Fibonacci-Tuned Vue 3 Design System";
const DEFAULT_DESCRIPTION =
  "Vanduo is a Fibonacci-tuned Vue 3 design system: first-class components and composables on a golden-ratio scale with a single, consistent token set.";

const pageTitle = computed(() => {
  const t = route.meta?.title as string | undefined;
  if (!t || route.path === "/" || t === "Vanduo Docs") return BRAND_TITLE;
  return `${t} — Vanduo`;
});
const pageDescription = computed(() => {
  const d = route.meta?.description as string | undefined;
  if (d) return d;
  const t = route.meta?.title as string | undefined;
  return t && route.path !== "/"
    ? `${t} in Vanduo — the Fibonacci-tuned Vue 3 design system with first-class components and a single consistent token set.`
    : DEFAULT_DESCRIPTION;
});
const canonical = computed(() => `${BASE_URL}${route.path}`);

useHead({
  title: pageTitle,
  link: [{ rel: "canonical", href: canonical }],
  meta: [
    { name: "description", content: pageDescription },
    { property: "og:title", content: pageTitle },
    { property: "og:description", content: pageDescription },
    { property: "og:url", content: canonical },
    { name: "twitter:title", content: pageTitle },
    { name: "twitter:description", content: pageDescription },
  ],
});

onMounted(() => {
  theme.init();
  customizer.init();
});
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <VdNavbar />

  <main id="main-content">
    <DocsLayout v-if="route.meta.layout === 'docs'">
      <RouterView />
    </DocsLayout>
    <RouterView v-else />
  </main>

  <VdFooter />

  <GlobalSearchModal />
  <LiveCustomizer />
  <VdToastContainer />
</template>
