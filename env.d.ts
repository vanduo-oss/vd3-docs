/// <reference types="vite/client" />

// Injected by Vite `define` from package.json (see vite.config.ts).
declare const __APP_VERSION__: string;

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    unknown
  >;
  export default component;
}

// Side-effect CSS bundles imported in main.ts. The vd3 line ships real types
// for its JS/Vue subpaths (resolved from ../vd3 and ../vd3-cbun via `link:`),
// so only the style entry points need an ambient declaration.
declare module "@vanduo-oss/vd3/css";
declare module "@vanduo-oss/vd3-cbun/charts/css";
declare module "@vanduo-oss/vd3-cbun/code-editor/css";
declare module "@vanduo-oss/vd3-cbun/draw/css";
declare module "@vanduo-oss/vd3-cbun/flowchart/css";
declare module "@vanduo-oss/vd3-cbun/music-player/css";
