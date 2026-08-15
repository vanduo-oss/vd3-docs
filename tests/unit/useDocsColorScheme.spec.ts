import { afterEach, describe, expect, it } from "vitest";
import {
  DOCS_DOCK_RADIUS,
  docsDockTint,
  readDocsColorScheme,
} from "@/composables/useDocsColorScheme";

describe("docs dock theme defaults", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
  });

  it("uses radius 2 (one step below pill)", () => {
    expect(DOCS_DOCK_RADIUS).toBe("2");
  });

  it("maps light to ink and dark to OC-8 green", () => {
    expect(docsDockTint("light")).toBe("");
    expect(docsDockTint("dark")).toBe("green");
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
