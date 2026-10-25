<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from "vue";
import { RouterView, useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import VdSiteDock from "@/layout/VdSiteDock.vue";
import DocsLayout from "@/layout/DocsLayout.vue";
import GlobalSearchModal from "@/overlays/GlobalSearchModal.vue";
import { VdToastContainer } from "@vanduo-oss/vd3";
import { useThemeStore } from "@/stores/theme";
import { useSearchStore } from "@/stores/search";
import NavigationStatus from "@/layout/NavigationStatus.vue";
import { useNavigation } from "@/navigation";
import { docsDocumentTitle } from "@/lib/document-title";
import { installVd3Favicon } from "@/lib/vd3-favicon";

const route = useRoute();
const theme = useThemeStore();
const search = useSearchStore();
const { pending } = useNavigation();
let disconnectFavicon = () => {};

// ── Per-route SEO (baked into the SSG HTML via @unhead) ──────────────
const BASE_URL = "https://vd3.vanduo.dev";
const DEFAULT_DESCRIPTION =
  "vd3 is a Fibonacci-tuned Vue 3 design system: first-class components and composables on a golden-ratio scale with a single, consistent token set.";

const pageTitle = computed(() =>
  docsDocumentTitle(route.path, route.meta?.title as string | undefined),
);
const pageDescription = computed(() => {
  const d = route.meta?.description as string | undefined;
  if (d) return d;
  const t = route.meta?.title as string | undefined;
  return t && route.path !== "/"
    ? `${t} in vd3 — the Fibonacci-tuned Vue 3 design system with first-class components and a single consistent token set.`
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
  search.init();
  disconnectFavicon = installVd3Favicon();
  document.documentElement.dataset.vdHydrated = "true";
});

onBeforeUnmount(() => disconnectFavicon());
</script>

<template>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <VdSiteDock />
  <NavigationStatus />

  <main id="main-content" :aria-busy="pending ? 'true' : undefined">
    <DocsLayout v-if="route.meta.layout === 'docs'">
      <RouterView />
    </DocsLayout>
    <RouterView v-else />
  </main>

  <GlobalSearchModal />
  <VdToastContainer />
</template>
