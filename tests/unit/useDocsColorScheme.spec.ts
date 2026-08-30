import { afterEach, describe, expect, it } from "vitest";
import { DOCK_TINTS } from "@vanduo-oss/vd3";
import {
  DOCS_DOCK_RADIUS,
  docsDockAccent,
  docsDockBackgroundTint,
  docsDockTint,
  readDocsColorScheme,
} from "@/composables/useDocsColorScheme";

describe("docs dock theme defaults", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-primary");
  });

  it("uses radius 1.5", () => {
    expect(DOCS_DOCK_RADIUS).toBe("1.5");
  });

  it("keeps site dock background untinted ink in all schemes", () => {
    expect(docsDockBackgroundTint("light", "violet")).toBe("");
    expect(docsDockBackgroundTint("dark", "violet")).toBe("");
    expect(docsDockBackgroundTint("dark", "green")).toBe("");
    expect(docsDockTint("dark", "violet")).toBe("");
  });

  it("maps primary to dock accent for icons in light and dark", () => {
    expect(docsDockAccent("light", "violet")).toBe("violet");
    expect(docsDockAccent("dark", "violet")).toBe("violet");
    expect(docsDockAccent("light", "green")).toBe("green");
    expect(docsDockAccent("dark", "green")).toBe("green");
    expect(docsDockAccent("light", "blue")).toBe("blue");
  });

  it("uses no accent for Ink (black) in either scheme", () => {
    expect(docsDockAccent("dark", "black")).toBe("");
    expect(docsDockAccent("light", "black")).toBe("");
  });

  it("falls back to scheme default accent for unknown primaries", () => {
    expect(docsDockAccent("dark", "amber")).toBe("blue");
    expect(docsDockAccent("light", "amber")).toBe("");
    expect(docsDockAccent("dark", "")).toBe("blue");
    expect(docsDockAccent("light", "")).toBe("");
  });

  it("accepts DOCK_TINTS as accent values in both schemes", () => {
    for (const tint of DOCK_TINTS) {
      expect(docsDockAccent("dark", tint)).toBe(tint);
      expect(docsDockAccent("light", tint)).toBe(tint);
    }
  });

  it("reads data-theme on html, else prefers-color-scheme", () => {
    document.documentElement.setAttribute("data-theme", "dark");
    expect(readDocsColorScheme()).toBe("dark");
    document.documentElement.setAttribute("data-theme", "light");
    expect(readDocsColorScheme()).toBe("light");
    document.documentElement.removeAttribute("data-theme");
    expect(readDocsColorScheme()).toBe("light");
  });
});
