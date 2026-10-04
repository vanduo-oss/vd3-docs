import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createPinia, disposePinia, setActivePinia } from "pinia";
import { nextTick } from "vue";
import { setThemeDefaults, useThemePreference } from "@vanduo-oss/vd3";
import { useThemeStore } from "@/stores/theme";

let pinia: ReturnType<typeof createPinia>;
beforeEach(() => {
  localStorage.clear();
  setThemeDefaults({
    FONT: "nunito",
    PRIMARY_LIGHT: "black",
    PRIMARY_DARK: "blue",
  });
  pinia = createPinia();
  setActivePinia(pinia);
});
afterEach(() => {
  disposePinia(pinia);
  localStorage.clear();
});

describe("temporary docs theme previews", () => {
  it("shares visible mode and fonts without saving demos or reset", async () => {
    const docs = useThemeStore();
    docs.init();
    docs.setTheme("light");
    docs.setPrimary("teal");
    const saved = { ...localStorage };
    const demo = useThemePreference();
    demo.setFont("jetbrains-mono");
    demo.setRadius("0.125");
    demo.setNeutral("zinc");
    demo.setTheme("dark");
    await nextTick();
    expect(docs.font).toBe("jetbrains-mono");
    expect(docs.theme).toBe("dark");
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect({ ...localStorage }).toEqual(saved);
    demo.reset();
    await nextTick();
    expect({ ...localStorage }).toEqual(saved);
  });

  it("saves dock choices without carrying preview styles into storage or reload", async () => {
    const docs = useThemeStore();
    docs.init();
    const demo = useThemePreference();
    demo.setFont("lato");
    demo.setRadius("0.125");
    demo.setNeutral("zinc");
    docs.setTheme("dark");
    docs.setPrimary("violet");
    await nextTick();
    expect(docs.font).toBe("lato");
    expect(localStorage.getItem("vanduo-font-preference")).toBe("nunito");
    expect(localStorage.getItem("vanduo-radius")).toBe("0.5");
    expect(localStorage.getItem("vanduo-neutral-color")).toBe("charcoal");
    const saved = { ...localStorage };
    docs.previewPrimary("red");
    await nextTick();
    expect(docs.primary).toBe("red");
    expect({ ...localStorage }).toEqual(saved);
    docs.$dispose();
    setActivePinia(createPinia());
    const reload = useThemeStore();
    reload.init();
    expect(reload.theme).toBe("dark");
    expect(reload.primary).toBe("violet");
    expect(reload.font).toBe("nunito");
    expect(reload.radius).toBe("0.5");
    expect(reload.neutral).toBe("charcoal");
    expect(reload.palette).toBe("open-color");
    reload.$dispose();
  });
});
