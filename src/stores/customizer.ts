import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { PRIMARY_COLORS, type RadiusOption } from "@vanduo-oss/vue";
import { CUSTOMIZER_REGISTRY } from "@/customizer/registry";
import type {
  CustomizerEntry,
  CustomizerState,
  Placement,
} from "@/customizer/types";
import { useThemeStore } from "@/stores/theme";

/**
 * State for the Live Component Customizer overlay. Follows the SSR-safe pattern
 * of `stores/engine.ts`: reactive state starts at deterministic defaults, all
 * `localStorage` access is guarded, and hydration happens once in `init()` on
 * the client. Only the drawer *placement* is persisted — knob state is seeded
 * fresh from the current theme each time the customizer opens.
 */
const STORAGE_KEY = "vanduo-docs-customizer";
const PLACEMENTS: Placement[] = ["left", "right", "top", "bottom"];

/** Fixed teal matching the framework's default `--vd-color-secondary`. */
const DEFAULT_SECONDARY = "#12b886";
/** Neutral fallback primary when the theme primary can't be resolved to a hex. */
const FALLBACK_PRIMARY = "#228be6";

function baseDefaults(): CustomizerState {
  return {
    primary: FALLBACK_PRIMARY,
    secondary: DEFAULT_SECONDARY,
    radius: "0.5" as RadiusOption,
    shadow: "sm",
    font: "ubuntu",
    fontScale: 1,
    glass: "off",
    outline: 0,
    variant: "",
    size: "",
  };
}

function loadPlacement(): Placement {
  if (typeof window === "undefined") return "right";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as { placement?: string }) : null;
    const p = parsed?.placement;
    return p && (PLACEMENTS as string[]).includes(p)
      ? (p as Placement)
      : "right";
  } catch {
    return "right";
  }
}

function persistPlacement(placement: Placement): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ placement }));
  } catch {
    /* storage may be unavailable (private mode) */
  }
}

export const useCustomizerStore = defineStore("customizer", () => {
  const open = ref(false);
  const activeId = ref<string | null>(null);
  const placement = ref<Placement>("right");
  /** CSS scope class (with leading dot) used in generated code. */
  const scopeClass = ref(".my-demo");
  const state = reactive<CustomizerState>(baseDefaults());
  const ready = ref(false);

  const entry = computed<CustomizerEntry | null>(() =>
    activeId.value ? (CUSTOMIZER_REGISTRY[activeId.value] ?? null) : null,
  );

  /** Hydrate persisted placement once on the client. */
  const init = (): void => {
    if (ready.value) return;
    placement.value = loadPlacement();
    ready.value = true;
  };

  /** Resolve the current theme primary to a hex (falls back gracefully). */
  const themePrimaryHex = (): string => {
    try {
      const key = useThemeStore().primary;
      return (
        PRIMARY_COLORS.find((c) => c.key === key)?.color ?? FALLBACK_PRIMARY
      );
    } catch {
      return FALLBACK_PRIMARY;
    }
  };

  /** Open the customizer for a registry id, seeding knobs from the theme. */
  const openFor = (id: string): void => {
    const target = CUSTOMIZER_REGISTRY[id];
    if (!target) return;
    activeId.value = id;
    Object.assign(
      state,
      baseDefaults(),
      { primary: themePrimaryHex() },
      target.defaults,
    );
    open.value = true;
  };

  const close = (): void => {
    open.value = false;
  };

  const setPlacement = (p: Placement): void => {
    placement.value = p;
    persistPlacement(p);
  };

  /** Generic knob setter (keeps components terse + typed). */
  const setKnob = <K extends keyof CustomizerState>(
    key: K,
    value: CustomizerState[K],
  ): void => {
    state[key] = value;
  };

  /** Restore knob defaults for the active entry (placement is a separate pref). */
  const reset = (): void => {
    Object.assign(
      state,
      baseDefaults(),
      { primary: themePrimaryHex() },
      entry.value?.defaults ?? {},
    );
  };

  return {
    open,
    activeId,
    placement,
    scopeClass,
    state,
    ready,
    entry,
    init,
    openFor,
    close,
    setPlacement,
    setKnob,
    reset,
  };
});
