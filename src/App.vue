<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import VdNavbar from "@/layout/VdNavbar.vue";
import VdFooter from "@/layout/VdFooter.vue";
import DocsLayout from "@/layout/DocsLayout.vue";
import GlobalSearchModal from "@/overlays/GlobalSearchModal.vue";
import LiveCustomizer from "@/overlays/LiveCustomizer.vue";
import { VdToastContainer } from "@vanduo-oss/vue";
import { useThemeStore } from "@/stores/theme";
import { useEngineStore } from "@/stores/engine";
import { useCustomizerStore } from "@/stores/customizer";

const route = useRoute();
const theme = useThemeStore();
const engine = useEngineStore();
const customizer = useCustomizerStore();

// ── Per-route SEO (baked into the SSG HTML via @unhead) ──────────────
const BASE_URL = "https://vanduo.dev";
const BRAND_TITLE = "Vanduo — Two-Engine Design System (Vanilla + Vue 3)";
const DEFAULT_DESCRIPTION =
  "Vanduo is a Fibonacci-tuned, dual-engine design system: drop-in Vanilla CSS/JS or first-class Vue 3 components — identical tokens, identical look.";

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
    ? `${t} in Vanduo — the dual-engine design system with drop-in Vanilla CSS/JS and first-class Vue 3 components.`
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
  engine.init();
  customizer.init();
});
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <VdNavbar />

  <main
    id="main-content"
    style="padding-top: 80px; min-height: calc(100vh - 200px)"
  >
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
