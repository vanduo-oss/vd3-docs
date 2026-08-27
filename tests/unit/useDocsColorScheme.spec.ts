import { afterEach, describe, expect, it } from "vitest";
import { DOCK_TINTS } from "@vanduo-oss/vd3";
import {
  DOCS_DOCK_RADIUS,
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

  it("maps light to ink and dark to selected dock primary", () => {
    expect(docsDockTint("light", "violet")).toBe("");
    expect(docsDockTint("dark", "violet")).toBe("violet");
    expect(docsDockTint("dark", "green")).toBe("green");
    expect(docsDockTint("dark", "blue")).toBe("blue");
  });

  it("uses untinted ink frost for dark + Ink (black)", () => {
    expect(docsDockTint("dark", "black")).toBe("");
    expect(docsDockTint("light", "black")).toBe("");
  });

  it("falls back to blue for unknown dark primaries", () => {
    expect(docsDockTint("dark", "amber")).toBe("blue");
    expect(docsDockTint("dark", "")).toBe("blue");
  });

  it("only accepts DOCK_TINTS as dark tint values", () => {
    for (const tint of DOCK_TINTS) {
      expect(docsDockTint("dark", tint)).toBe(tint);
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
