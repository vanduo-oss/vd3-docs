import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Which documentation engine the reader is viewing code/API for.
 * The two engines share an identical DOM/CSS contract — only the wiring code
 * and JS API differ — so this only swaps `EngineSwitch` blocks, never demos.
 */
export type DocsEngine = "vue3" | "vanilla";

const STORAGE_KEY = "vanduo-docs-engine";

function loadEngine(): DocsEngine {
  if (typeof window === "undefined") return "vue3";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "vanilla" ? "vanilla" : "vue3";
  } catch {
    return "vue3";
  }
}

function persistEngine(engine: DocsEngine): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, engine);
  } catch {
    /* storage may be unavailable (private mode) */
  }
}

export const useEngineStore = defineStore("engine", () => {
  // Default to Vue 3 — the site is Vue-powered. Hydrate from storage in init().
  const engine = ref<DocsEngine>("vue3");
  const ready = ref(false);

  /** Hydrate from localStorage; call once on the client after mount. */
  const init = (): void => {
    if (ready.value) return;
    engine.value = loadEngine();
    ready.value = true;
  };

  const setEngine = (next: DocsEngine): void => {
    engine.value = next;
    persistEngine(next);
  };

  const toggle = (): void => {
    setEngine(engine.value === "vue3" ? "vanilla" : "vue3");
  };

  return { engine, ready, init, setEngine, toggle };
});
