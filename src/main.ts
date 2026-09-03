import { ViteSSG } from "vite-ssg";
import { createPinia } from "pinia";
import { VanduoVue } from "@vanduo-oss/vd3";
import App from "./App.vue";
import { buildRoutes } from "./router";
import "@vanduo-oss/vd3/css";
import "@vanduo-oss/vd3-cbun/charts/css";
import "@vanduo-oss/vd3-cbun/code-editor/css";
import "@vanduo-oss/vd3-cbun/draw/css";
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
    // "/" even when the site is built under a sub-path, which breaks RouterLinks
    // and hydrates the root as NotFound. import.meta.env.BASE_URL is "/" locally
    // and on the vd3.vanduo.dev Pages deploy (override with VITE_BASE only when
    // testing a non-root layout).
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
    // Docs first-paint / package defaults: Ink in light, green in dark.
    // (Per-mode neutral — stone in light, charcoal in dark — is handled in the
    // theme store; the engine has no NEUTRAL_DARK default. Dark + green gets
    // logo-green accent pins in docs.css.)
    app.use(VanduoVue, {
      themeDefaults: {
        PRIMARY_LIGHT: "black",
        PRIMARY_DARK: "green",
        FONT: "nunito",
      },
    });

    // vd3 is fully standalone: the components/composables are pure Vue with no
    // window.Vanduo* IIFE runtime to bootstrap, so there is nothing to load here.

    // Page <title> is managed per route by @unhead in App.vue (so it stays in
    // sync with the SSG-baked title and the "— vd3" suffix).

    if (import.meta.env.SSR && initialState) {
      initialState.pinia = {};
    }
  },
);
