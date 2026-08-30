import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import {
  applyPreference,
  defaultPreference,
  loadPreference,
  setThemeDefaults,
} from "@vanduo-oss/vd3";
import {
  DOCS_PRIMARY_COLORS,
  docsPrimarySwatches,
} from "@/constants/docsPrimary";
import { useThemeStore } from "@/stores/theme";

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
    setThemeDefaults({
      PRIMARY_LIGHT: "black",
      PRIMARY_DARK: "blue",
      FONT: "nunito",
    });
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
    // system + jsdom matchMedia(false) → light → docs default Ink
    expect(theme.primary).toBe("black");
  });

  it("init overwrites stored non-primary prefs but keeps an explicit dock primary", () => {
    setThemeDefaults({
      PRIMARY_LIGHT: "black",
      PRIMARY_DARK: "blue",
      FONT: "nunito",
    });
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
    expect(window.localStorage.getItem("vanduo-font-preference")).toBe("nunito");
    expect(window.localStorage.getItem("vanduo-radius")).toBe("0.5");
    expect(window.localStorage.getItem("vanduo-neutral-color")).toBe("charcoal");
    expect(window.localStorage.getItem("vanduo-primary-color")).toBe("violet");
  });

  it("keeps stored blue as the docs auto default (no migrate-to-green)", () => {
    setThemeDefaults({ PRIMARY_LIGHT: "black", PRIMARY_DARK: "blue" });
    window.localStorage.setItem("vanduo-theme-preference", "dark");
    window.localStorage.setItem("vanduo-primary-color", "blue");
    const theme = useThemeStore();
    theme.init();
    expect(theme.primary).toBe("blue");
    expect(document.documentElement.getAttribute("data-primary")).toBe("blue");
  });

  it("keeps Ink (black) in light and dark; coerces amber/rose to blue", () => {
    setThemeDefaults({ PRIMARY_LIGHT: "black", PRIMARY_DARK: "blue" });
    window.localStorage.setItem("vanduo-theme-preference", "light");
    window.localStorage.setItem("vanduo-primary-color", "black");
    const theme = useThemeStore();
    theme.init();
    expect(theme.primary).toBe("black");

    theme.setPrimary("amber");
    expect(theme.primary).toBe("black");
    theme.setPrimary("rose");
    expect(theme.primary).toBe("black");

    theme.setTheme("dark");
    theme.setPrimary("amber");
    expect(theme.primary).toBe("blue");

    theme.setPrimary("black");
    expect(theme.primary).toBe("black");
    theme.setTheme("light");
    expect(theme.primary).toBe("black");
  });

  it("defaults light primary to Ink and dark primary to blue", () => {
    setThemeDefaults({ PRIMARY_LIGHT: "black", PRIMARY_DARK: "blue" });
    const theme = useThemeStore();
    theme.init();
    theme.setTheme("light");
    expect(theme.primary).toBe("black");
    theme.setTheme("dark");
    expect(theme.primary).toBe("blue");
  });

  it("docs primary swatches include Ink + eight hues in both schemes", () => {
    expect(DOCS_PRIMARY_COLORS).toHaveLength(8);
    expect(DOCS_PRIMARY_COLORS.map((c) => c.key).sort()).toEqual(
      [
        "blue",
        "green",
        "orange",
        "pink",
        "red",
        "teal",
        "violet",
        "yellow",
      ].sort(),
    );

    const ink = {
      key: "black",
      name: "Ink",
      color: "#000000",
    };

    const light = docsPrimarySwatches("light");
    expect(light).toHaveLength(9);
    expect(light[0]).toEqual(ink);

    const dark = docsPrimarySwatches("dark");
    expect(dark).toHaveLength(9);
    expect(dark[0]).toEqual(ink);
    expect(dark.map((c) => c.key)).toContain("black");
  });

  it("preserves explicit dock primary across theme flips", () => {
    const theme = useThemeStore();
    theme.init();
    theme.setPrimary("violet");
    theme.setTheme("dark");
    expect(theme.primary).toBe("violet");
    theme.setTheme("light");
    expect(theme.primary).toBe("violet");
  });

  it("preserves explicit Ink picked in dark across theme flips", () => {
    setThemeDefaults({ PRIMARY_LIGHT: "black", PRIMARY_DARK: "blue" });
    const theme = useThemeStore();
    theme.init();
    theme.setTheme("dark");
    theme.setPrimary("black");
    theme.setTheme("light");
    expect(theme.primary).toBe("black");
  });
});
