import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import { VanduoVue } from "@vanduo-oss/vd3";
import App from "./App.vue";
import { buildRoutes } from "./router";
import "@vanduo-oss/vd3/css";
import "@vanduo-oss/vd3-cbun/charts/css";
import "@vanduo-oss/vd3-cbun/flowchart/css";
import "@vanduo-oss/vd3-cbun/music-player/css";
import "./styles/docs.css";
import "./styles/app.css";

const routes = buildRoutes();

export const createApp = ViteSSG(
  App,
  {
    // vite-ssg feeds this to the vue-router history base
    // (createWebHistory(routerOptions.base)); WITHOUT it the router defaults to
    // "/" even when the site is built under a sub-path. On the GitHub Pages
    // project deploy (VITE_BASE=/vd3-docs/) that mismatch made every RouterLink
    // render unprefixed (/docs-landing instead of /vd3-docs/docs-landing) and
    // made the root URL hydrate to the NotFound page. import.meta.env.BASE_URL
    // is "/" locally and "/vd3-docs/" in the Pages build, so both work.
    base: import.meta.env.BASE_URL,
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
    // blue); @vanduo-oss/vd3 ships the generic baseline, so we inject it here.
    // (The per-mode default neutral — stone in light, charcoal in dark — is
    // handled in the theme store, since the engine has no NEUTRAL_DARK default.)
    app.use(VanduoVue, { themeDefaults: { PRIMARY_DARK: "blue" } });

    // vd3 is fully standalone: the components/composables are pure Vue with no
    // window.Vanduo* IIFE runtime to bootstrap, so there is nothing to load here.

    // Page <title> is managed per route by @unhead in App.vue (so it stays in
    // sync with the SSG-baked title and the "— Vanduo" suffix).

    if (import.meta.env.SSR && initialState) {
      initialState.pinia = {};
    }
  },
);
