import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import {
  applyPreference,
  defaultPreference,
  loadPreference,
  setThemeDefaults,
} from "@vanduo-oss/vd3";
import {
  DOCS_DEFAULT_PRIMARY_DARK,
  DOCS_DEFAULT_PRIMARY_LIGHT,
  DOCS_PRIMARY_COLORS,
  docsPrimaryStorageKeys,
  docsPrimarySwatches,
} from "@/constants/docsPrimary";
import { useThemeStore } from "@/stores/theme";

const DOCS_THEME_DEFAULTS = {
  PRIMARY_LIGHT: DOCS_DEFAULT_PRIMARY_LIGHT,
  PRIMARY_DARK: DOCS_DEFAULT_PRIMARY_DARK,
  FONT: "nunito",
} as const;

const primaryKeys = () => docsPrimaryStorageKeys();

const stubColorScheme = (dark: boolean): void => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-color-scheme: dark") ? dark : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

const clearThemeAttrs = (): void => {
  for (const attr of [
    "data-palette",
    "data-theme",
    "data-primary",
    "data-neutral",
    "data-radius",
    "data-font",
  ]) {
    document.documentElement.removeAttribute(attr);
  }
};

describe("useTheme model", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearThemeAttrs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not throw and returns defaults without window (SSR)", () => {
    const originalWindow = globalThis.window;
    try {
      delete (globalThis as { window?: unknown }).window;
      const prefs = loadPreference();
      expect(prefs).toEqual(defaultPreference());
    } finally {
      (globalThis as { window?: unknown }).window = originalWindow;
    }
  });

  it("applies framework-faithful defaults", () => {
    applyPreference(defaultPreference());
    // theme "system" removes data-theme; primary defaults to black on light OS.
    expect(document.documentElement.getAttribute("data-palette")).toBe(
      "open-color",
    );
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
    expect(document.documentElement.getAttribute("data-neutral")).toBe(
      "charcoal",
    );
    expect(document.documentElement.getAttribute("data-radius")).toBe("0.5");
    expect(document.documentElement.getAttribute("data-font")).toBe("ubuntu");
  });

  it("defaults the palette to Open Color", () => {
    expect(defaultPreference().palette).toBe("open-color");
  });

  it("restores a stored preference", () => {
    window.localStorage.setItem("vanduo-palette", "open-color");
    window.localStorage.setItem("vanduo-theme-preference", "dark");
    window.localStorage.setItem("vanduo-primary-color", "blue");
    window.localStorage.setItem("vanduo-neutral-color", "slate");
    window.localStorage.setItem("vanduo-radius", "0.25");
    window.localStorage.setItem("vanduo-font-preference", "lato");
    const prefs = loadPreference();
    applyPreference(prefs);
    expect(document.documentElement.getAttribute("data-palette")).toBe(
      "open-color",
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.getAttribute("data-primary")).toBe("blue");
    expect(document.documentElement.getAttribute("data-neutral")).toBe("slate");
    expect(document.documentElement.getAttribute("data-radius")).toBe("0.25");
    expect(document.documentElement.getAttribute("data-font")).toBe("lato");
  });

  it("falls back to the default palette for an unknown stored value", () => {
    window.localStorage.setItem("vanduo-palette", "bogus");
    expect(loadPreference().palette).toBe("open-color");
  });
});

describe("useThemeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    window.localStorage.clear();
    clearThemeAttrs();
    setThemeDefaults({ ...DOCS_THEME_DEFAULTS });
    stubColorScheme(false);
  });

  it("persists setTheme to localStorage and the DOM", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setTheme("dark");
    expect(window.localStorage.getItem("vanduo-theme-preference")).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("persists setPalette to localStorage and the DOM", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setPalette("open-color");
    expect(theme.palette).toBe("open-color");
    expect(window.localStorage.getItem("vanduo-palette")).toBe("open-color");
    expect(document.documentElement.getAttribute("data-palette")).toBe(
      "open-color",
    );
  });

  it("reset returns to docs locked defaults", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setPrimary("violet");
    theme.setFont("lato");
    theme.setRadius("0.25");
    theme.setNeutral("slate");
    expect(theme.primary).toBe("violet");
    theme.reset();
    expect(theme.theme).toBe("system");
    expect(theme.radius).toBe("0.5");
    expect(theme.palette).toBe("open-color");
    expect(theme.font).toBe("nunito");
    expect(["stone", "charcoal"]).toContain(theme.neutral);
    // system + jsdom matchMedia(false) → light → docs default black
    expect(theme.primary).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("blue");
  });

  it("init overwrites stored non-primary prefs but keeps an explicit dock primary", () => {
    window.localStorage.setItem("vanduo-theme-preference", "dark");
    window.localStorage.setItem("vanduo-primary-color", "violet");
    window.localStorage.setItem("vanduo-neutral-color", "slate");
    window.localStorage.setItem("vanduo-radius", "0.25");
    window.localStorage.setItem("vanduo-font-preference", "lato");
    window.localStorage.setItem("vanduo-palette", "open-color");

    const theme = useThemeStore();
    theme.init();

    expect(theme.primary).toBe("violet");
    expect(theme.font).toBe("nunito");
    expect(theme.radius).toBe("0.5");
    expect(theme.neutral).toBe("charcoal");
    expect(theme.palette).toBe("open-color");
    expect(window.localStorage.getItem("vanduo-font-preference")).toBe(
      "nunito",
    );
    expect(window.localStorage.getItem("vanduo-radius")).toBe("0.5");
    expect(window.localStorage.getItem("vanduo-neutral-color")).toBe(
      "charcoal",
    );
    expect(window.localStorage.getItem("vanduo-primary-color")).toBe("violet");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("violet");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
  });

  it("remaps a legacy shared blue default to first-visit per-scheme values", () => {
    window.localStorage.setItem("vanduo-theme-preference", "dark");
    window.localStorage.setItem("vanduo-primary-color", "blue");
    const theme = useThemeStore();
    theme.init();
    expect(theme.primary).toBe("blue");
    expect(document.documentElement.getAttribute("data-primary")).toBe("blue");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("blue");
  });

  it("migrates a legacy explicit primary onto the current scheme only", () => {
    window.localStorage.setItem("vanduo-theme-preference", "dark");
    window.localStorage.setItem("vanduo-primary-color", "green");
    const darkTheme = useThemeStore();
    darkTheme.init();
    expect(darkTheme.primary).toBe("green");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("green");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");

    window.localStorage.clear();
    window.localStorage.setItem("vanduo-theme-preference", "light");
    window.localStorage.setItem("vanduo-primary-color", "black");
    setActivePinia(createPinia());
    const lightTheme = useThemeStore();
    lightTheme.init();
    expect(lightTheme.primary).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("blue");
  });

  it("keeps Ink (black) in light and dark; coerces amber/lime; allows rose", () => {
    window.localStorage.setItem("vanduo-theme-preference", "light");
    window.localStorage.setItem("vanduo-primary-color", "black");
    const theme = useThemeStore();
    theme.init();
    expect(theme.primary).toBe("black");

    theme.setPrimary("amber");
    expect(theme.primary).toBe("black");
    theme.setPrimary("lime");
    expect(theme.primary).toBe("black");
    theme.setPrimary("rose");
    expect(theme.primary).toBe("rose");

    theme.setTheme("dark");
    expect(theme.primary).toBe("blue");
    theme.setPrimary("amber");
    expect(theme.primary).toBe("blue");
    theme.setPrimary("lime");
    expect(theme.primary).toBe("blue");
    theme.setPrimary("rose");
    expect(theme.primary).toBe("rose");

    theme.setPrimary("black");
    expect(theme.primary).toBe("black");
    theme.setTheme("light");
    expect(theme.primary).toBe("rose");
  });

  it("defaults first-visit primary to black in light and blue in dark", () => {
    const theme = useThemeStore();
    theme.init();
    expect(theme.primary).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("blue");
    theme.setTheme("light");
    expect(theme.primary).toBe("black");
    theme.setTheme("dark");
    expect(theme.primary).toBe("blue");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
  });

  it("defaults first-visit dark (system) primary to blue and still persists light black", () => {
    stubColorScheme(true);
    const theme = useThemeStore();
    theme.init();
    expect(theme.primary).toBe("blue");
    expect(document.documentElement.getAttribute("data-primary")).toBe("blue");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("blue");
  });

  it("docs primary swatches include Ink + twelve accretion hues in both schemes", () => {
    expect(DOCS_PRIMARY_COLORS).toHaveLength(12);
    expect(DOCS_PRIMARY_COLORS.map((c) => c.key)).toEqual([
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "cyan",
      "sky",
      "blue",
      "violet",
      "purple",
      "pink",
      "rose",
    ]);

    const ink = {
      key: "black",
      name: "Ink",
      color: "#000000",
    };

    const light = docsPrimarySwatches("light");
    expect(light).toHaveLength(13);
    expect(light[0]).toEqual(ink);

    const dark = docsPrimarySwatches("dark");
    expect(dark).toHaveLength(13);
    expect(dark[0]).toEqual(ink);
    expect(dark.map((c) => c.key)).toContain("black");
  });

  it("keeps per-scheme primaries independent across theme flips", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setTheme("light");
    theme.setPrimary("violet");
    theme.setTheme("dark");
    expect(theme.primary).toBe("blue");
    theme.setPrimary("green");
    theme.setTheme("light");
    expect(theme.primary).toBe("violet");
    theme.setTheme("dark");
    expect(theme.primary).toBe("green");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("violet");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("green");
  });

  it("restores per-scheme primaries after reload", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setTheme("light");
    theme.setPrimary("violet");
    theme.setTheme("dark");
    theme.setPrimary("green");

    setActivePinia(createPinia());
    const reloaded = useThemeStore();
    reloaded.init();
    expect(reloaded.theme).toBe("dark");
    expect(reloaded.primary).toBe("green");
    reloaded.setTheme("light");
    expect(reloaded.primary).toBe("violet");
  });

  it("keeps an explicit Ink pick in dark without overwriting light", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setTheme("light");
    theme.setPrimary("violet");
    theme.setTheme("dark");
    theme.setPrimary("black");
    expect(window.localStorage.getItem(primaryKeys().dark)).toBe("black");
    expect(window.localStorage.getItem(primaryKeys().light)).toBe("violet");
    theme.setTheme("light");
    expect(theme.primary).toBe("violet");
    theme.setTheme("dark");
    expect(theme.primary).toBe("black");
  });
});
