import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import { VanduoVue, loadVanduoRuntime } from "@vanduo-oss/vue";
import App from "./App.vue";
import { buildRoutes } from "./router";
import "@vanduo-oss/framework/css";
import "@vanduo-oss/charts/css";
import "@vanduo-oss/flowchart/css";
import "@vanduo-oss/music-player/css";
import "./styles/docs.css";
import "./styles/app.css";

const routes = buildRoutes();

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior(to, _from, savedPosition) {
      // Preserve position on browser back/forward
      if (savedPosition) return savedPosition;
      // Honor deep-link anchors (offset for the fixed 80px navbar)
      if (to.hash) return { el: to.hash, top: 80, behavior: "instant" };
      // Default: jump to top of the new page (instant, since html has
      // scroll-behavior: smooth which would otherwise animate the jump)
      return { top: 0, behavior: "instant" };
    },
  },
  async ({ app, initialState }) => {
    app.use(createPinia());
    // The docs site overrides core's generic default dark primary (amber ->
    // blue); @vanduo-oss/vue ships the generic baseline, so we inject it here.
    // (The per-mode default neutral — stone in light, charcoal in dark — is
    // handled in the theme store, since the engine has no NEUTRAL_DARK default.)
    app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "blue" } });

    // The VD2 plugin kicks off the framework's client JS (window.Vanduo*
    // globals that the composables delegate to); await it before mount so the
    // globals exist before any page's onMounted runs. No-ops during SSR.
    if (!import.meta.env.SSR) {
      await loadVanduoRuntime();
    }

    // Page <title> is managed per route by @unhead in App.vue (so it stays in
    // sync with the SSG-baked title and the "— Vanduo" suffix).

    if (import.meta.env.SSR && initialState) {
      initialState.pinia = {};
    }
  },
);
