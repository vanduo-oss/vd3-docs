import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import VdThemeCustomizer from "@/overlays/VdThemeCustomizer.vue";
import { useThemeStore } from "@/stores/theme";

const mountCustomizer = () => {
  setActivePinia(createPinia());
  const theme = useThemeStore();
  theme.init();

  const wrapper = mount(VdThemeCustomizer, {
    attachTo: document.body,
  });

  return { wrapper, theme };
};

describe("VdThemeCustomizer swatches fan", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("data-docs-dock", "bottom");
  });

  afterEach(() => {
    document.documentElement.removeAttribute("data-docs-dock");
    document.body.innerHTML = "";
  });

  it("renders swatches trigger and teleported fan", () => {
    const { wrapper } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');
    expect(trigger.attributes("aria-label")).toBe("Choose theme color");
    expect(trigger.find(".ph-swatches").exists()).toBe(true);

    const fan = document.body.querySelector(".vd-theme-customizer-fan");
    expect(fan).toBeTruthy();
    expect(fan?.querySelectorAll(".tc-fan-item").length).toBe(9);
    wrapper.unmount();
  });

  it("opens fan on trigger click and closes on Escape", async () => {
    const { wrapper } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');
    const fan = () => document.body.querySelector(".vd-theme-customizer-fan");

    await trigger.trigger("click");
    await flushPromises();
    expect(fan()?.classList.contains("is-open")).toBe(true);
    expect(fan()?.classList.contains("fan-up")).toBe(true);
    expect(trigger.attributes("aria-expanded")).toBe("true");

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await flushPromises();
    expect(fan()?.classList.contains("is-open")).toBe(false);
    wrapper.unmount();
  });

  it("maps dock edge to fan direction", async () => {
    const { wrapper } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');
    const fan = () => document.body.querySelector(".vd-theme-customizer-fan");

    const cases: Array<[string, string]> = [
      ["bottom", "fan-up"],
      ["top", "fan-down"],
      ["left", "fan-right"],
      ["right", "fan-left"],
    ];

    for (const [edge, dirClass] of cases) {
      document.documentElement.setAttribute("data-docs-dock", edge);
      await trigger.trigger("click");
      await flushPromises();
      expect(fan()?.classList.contains(dirClass)).toBe(true);
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      await flushPromises();
    }
    wrapper.unmount();
  });

  it("applies primary and closes fan on swatch pick", async () => {
    const { wrapper, theme } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');
    const fan = () => document.body.querySelector(".vd-theme-customizer-fan");

    await trigger.trigger("click");
    await flushPromises();

    const yellow = fan()?.querySelector('[data-color="yellow"]');
    expect(yellow).toBeTruthy();
    (yellow as HTMLButtonElement).click();
    await flushPromises();

    expect(theme.primary).toBe("yellow");
    expect(document.documentElement.getAttribute("data-primary")).toBe("yellow");
    expect(fan()?.classList.contains("is-open")).toBe(false);
    wrapper.unmount();
  });

  it("uses hinged spin transforms when open", async () => {
    const { wrapper } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');

    await trigger.trigger("click");
    await flushPromises();

    const items = document.body.querySelectorAll(".tc-fan-item");
    expect(items.length).toBe(9);

    const first = items[0] as HTMLElement;
    const openTransform = first.style.getPropertyValue("--fan-transform-open");
    // Hinged hand-fan pose: tilted rotation + outward slide along the blade.
    expect(openTransform).toMatch(/^rotate\(-?\d+(?:\.\d+)?deg\) translateX\(26px\)$/);

    const closedTransform = first.style.getPropertyValue(
      "--fan-transform-closed",
    );
    expect(closedTransform).toContain("scale(0.5)");

    // Center blade sits on top of the overlapped fan.
    const center = items[4] as HTMLElement;
    expect(center.style.zIndex).toBe("9");
    wrapper.unmount();
  });

  it("unfolds on top and right dock edges", async () => {
    const { wrapper } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');
    const fan = () => document.body.querySelector(".vd-theme-customizer-fan");

    for (const edge of ["top", "right"] as const) {
      document.documentElement.setAttribute("data-docs-dock", edge);
      await trigger.trigger("click");
      await flushPromises();

      const items = fan()?.querySelectorAll(".tc-fan-item");
      expect(items?.length).toBe(9);
      const first = items?.[0] as HTMLElement;
      const last = items?.[8] as HTMLElement;
      const a0 = first.style.getPropertyValue("--fan-transform-open");
      const a8 = last.style.getPropertyValue("--fan-transform-open");
      expect(a0).not.toBe(a8);

      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      await flushPromises();
    }
    wrapper.unmount();
  });

  it("previews on hover and reverts on dismiss without pick", async () => {
    const { wrapper, theme } = mountCustomizer();
    const trigger = wrapper.get('[data-theme-customizer-trigger]');
    const fan = () => document.body.querySelector(".vd-theme-customizer-fan");
    const initial = theme.primary;

    await trigger.trigger("click");
    await flushPromises();

    const yellow = fan()?.querySelector('[data-color="yellow"]') as HTMLElement;
    await yellow.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
    await flushPromises();
    expect(theme.primary).toBe("yellow");

    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    await flushPromises();
    expect(theme.primary).toBe(initial);
    wrapper.unmount();
  });

  it("places label before swatch dot on each blade", () => {
    const { wrapper } = mountCustomizer();
    const item = document.body.querySelector(".tc-fan-item");
    expect(item?.firstElementChild?.classList.contains("tc-fan-label")).toBe(
      true,
    );
    expect(item?.lastElementChild?.classList.contains("tc-fan-swatch")).toBe(
      true,
    );
    wrapper.unmount();
  });

  it("opens via vd:open-customizer window event", async () => {
    const { wrapper } = mountCustomizer();
    const fan = () => document.body.querySelector(".vd-theme-customizer-fan");

    window.dispatchEvent(new Event("vd:open-customizer"));
    await flushPromises();
    expect(fan()?.classList.contains("is-open")).toBe(true);
    wrapper.unmount();
  });
});
