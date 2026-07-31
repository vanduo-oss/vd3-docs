import { describe, expect, it } from "vitest";
import { CUSTOMIZER_REGISTRY, renderDemo } from "@/customizer/registry";
import { toVueSfc } from "@/customizer/codegen";
import { stageStyle, styleToCss } from "@/customizer/overrides";
import type { CustomizerState } from "@/customizer/types";

/**
 * Guards the "copy-ready" Vue SFC the customizer generates. The generated
 * template must (1) typecheck against the real @vanduo-oss/vd3 prop types — so
 * NO `variant="outline-primary"` / `variant="ghost-primary"` on VdButton and no
 * invented Badge/Card props — and (2) reproduce the live preview by carrying the
 * same CSS-only look classes the preview's `rootClass` emits.
 */
const base: CustomizerState = {
  primary: "#228be6",
  secondary: "#12b886",
  radius: "0.5",
  shadow: "none",
  font: "system",
  fontScale: 1,
  glass: "off",
  outline: 0,
  ring: false,
  widthScale: 1,
  variant: "",
  size: "",
};

const scope = ".my-demo";
const state = (over: Partial<CustomizerState>): CustomizerState => ({
  ...base,
  ...over,
});

/** The template body of a generated SFC (excludes the CSS `<style>` block, where
 *  custom-prop names like `--vd-card-glow-color` legitimately contain look
 *  words). */
const templateOf = (sfc: string): string =>
  sfc.slice(sfc.indexOf("<template>"), sfc.indexOf("</template>"));

/** `variant=` values that do not exist on the real components (the shipped bug). */
const INVALID_VARIANT_PROPS = ['variant="outline', 'variant="ghost'];

describe("customizer codegen — valid props + preview-matching classes", () => {
  it("emits no invalid variant props across every variant/glass permutation", () => {
    for (const entry of Object.values(CUSTOMIZER_REGISTRY)) {
      const glassModes: CustomizerState["glass"][] = [
        "off",
        "frosted",
        "tinted",
      ];
      const sizes = entry.sizes.length ? entry.sizes.map((c) => c.value) : [""];
      for (const variant of entry.variants.map((c) => c.value)) {
        for (const size of sizes) {
          for (const glass of glassModes) {
            const tpl = templateOf(
              toVueSfc(entry, state({ variant, size, glass }), scope),
            );
            for (const bad of INVALID_VARIANT_PROPS) {
              expect(
                tpl,
                `${entry.id} template (${variant}/${size}/${glass}) must not contain ${bad}`,
              ).not.toContain(bad);
            }
          }
        }
      }
    }
  });

  describe("VdButton", () => {
    const entry = CUSTOMIZER_REGISTRY.button;

    it("maps solid variants to real props", () => {
      expect(
        toVueSfc(entry, state({ variant: "vd-btn-primary" }), scope),
      ).toContain('<VdButton variant="primary" class="my-demo">');
      expect(
        toVueSfc(entry, state({ variant: "vd-btn-secondary" }), scope),
      ).toContain('<VdButton variant="secondary" class="my-demo">');
    });

    it("emits outline/ghost as CSS classes, never as variant props", () => {
      const outline = toVueSfc(
        entry,
        state({ variant: "vd-btn-outline-primary" }),
        scope,
      );
      expect(outline).toContain('class="my-demo vd-btn-outline-primary"');
      expect(outline).not.toContain("variant=");

      const ghost = toVueSfc(
        entry,
        state({ variant: "vd-btn-ghost-primary" }),
        scope,
      );
      expect(ghost).toContain('class="my-demo vd-btn-ghost-primary"');
      expect(ghost).not.toContain("variant=");
    });

    it("keeps size as a real prop", () => {
      expect(
        toVueSfc(
          entry,
          state({ variant: "vd-btn-primary", size: "vd-btn-lg" }),
          scope,
        ),
      ).toContain('<VdButton variant="primary" size="lg" class="my-demo">');
    });

    it("ring is off by default and emits the real ring prop when on", () => {
      expect(
        toVueSfc(entry, state({ variant: "vd-btn-primary" }), scope),
      ).not.toContain(" ring");

      const ringOn = toVueSfc(
        entry,
        state({ variant: "vd-btn-primary", ring: true }),
        scope,
      );
      expect(ringOn).toContain('<VdButton variant="primary" ring class="my-demo">');
      expect(ringOn).not.toContain('variant="ring"');
    });

    it("preview rootClass carries vd-btn-ring when ring is on", () => {
      const s = state({ variant: "vd-btn-outline-primary", ring: true });
      expect(entry.rootClass(s)).toContain("vd-btn-ring");
      expect(renderDemo(entry, s)).toContain("vd-btn-ring");
    });
  });

  describe("VdBadge", () => {
    const entry = CUSTOMIZER_REGISTRY.badge;

    it("keeps variant + pill props and adds the outlined class", () => {
      const outlined = toVueSfc(
        entry,
        state({ variant: "vd-badge-outlined vd-badge-primary" }),
        scope,
      );
      expect(outlined).toContain(
        '<VdBadge variant="primary" class="my-demo vd-badge-outlined">',
      );
      expect(outlined).not.toContain("outlined=");

      const pill = toVueSfc(
        entry,
        state({ variant: "vd-badge-pill vd-badge-primary" }),
        scope,
      );
      expect(pill).toContain(
        '<VdBadge variant="primary" pill class="my-demo">',
      );
    });

    it("emits size as a CSS class (not a prop)", () => {
      expect(
        toVueSfc(
          entry,
          state({ variant: "vd-badge-primary", size: "vd-badge-lg" }),
          scope,
        ),
      ).toContain('class="my-demo vd-badge-lg"');
    });
  });

  describe("VdCard", () => {
    const entry = CUSTOMIZER_REGISTRY.card;

    it("keeps elevated as a prop, others as classes", () => {
      expect(
        toVueSfc(entry, state({ variant: "vd-card-elevated" }), scope),
      ).toContain('<VdCard elevated class="my-demo">');
      const outlined = toVueSfc(
        entry,
        state({ variant: "vd-card-outlined" }),
        scope,
      );
      expect(outlined).toContain('<VdCard class="my-demo vd-card-outlined">');
      expect(outlined).not.toContain("outlined=");
    });

    it("emits glass modifiers as classes matching the preview rootClass", () => {
      const tinted = state({ variant: "vd-card-outlined", glass: "tinted" });
      const sfc = toVueSfc(entry, tinted, scope);
      expect(sfc).toContain(
        '<VdCard class="my-demo vd-card-outlined vd-card-glass vd-glass-tinted">',
      );
      // The classes on the generated element mirror the live preview's rootClass.
      const previewClasses = entry.rootClass(tinted); // "vd-card vd-card-outlined vd-card-glass vd-glass-tinted"
      for (const cls of previewClasses
        .split(" ")
        .filter((c) => c !== "vd-card")) {
        expect(renderDemo(entry, tinted)).toContain(cls);
        expect(sfc).toContain(cls);
      }
    });
  });
});

/**
 * Covers the override engine (`stageStyle` / `styleToCss` in overrides.ts) and
 * the SFC assembly (`toVueSfc` in codegen.ts) that the earlier suite only
 * touched indirectly: the emitted `import … from "@vanduo-oss/vd3"` line, the
 * scoped `<style>` block, and a coherent single-file-component shape.
 */
describe("customizer overrides + SFC assembly", () => {
  describe("stageStyle", () => {
    it("derives every leaf color token from the primary/secondary hexes", () => {
      const map = stageStyle(base);
      expect(map["--vd-color-primary"]).toBe("#228be6");
      expect(map["--vd-color-primary-hover"]).toBe(
        "color-mix(in srgb, #228be6, black 8%)",
      );
      expect(map["--vd-color-primary-alpha-20"]).toBe(
        "color-mix(in srgb, #228be6 20%, transparent)",
      );
      expect(map["--vd-color-secondary"]).toBe("#12b886");
      // Only the primary accent seeds the card-glow leaves.
      expect(map["--vd-card-glow-color"]).toBe(
        "color-mix(in srgb, #228be6, white 55%)",
      );
      expect(map).not.toHaveProperty("--vd-card-glow-color-secondary");
    });

    it("maps radius / shadow / font knobs to concrete leaf values", () => {
      const map = stageStyle(base); // radius "0.5", shadow "none", font "system"
      expect(map["--vd-btn-border-radius"]).toBe("0.625rem");
      expect(map["--vd-badge-border-radius"]).toBe("0.375rem");
      expect(map["--vd-card-border-radius"]).toBe("1rem");
      expect(map["--vd-card-shadow"]).toBe("none");
      expect(map["--vd-font-family-sans"]).toContain("system-ui");
      expect(map["font-family"]).toBe("var(--vd-font-family-sans)");
    });

    it("emits shadow / glass / outline / font-scale overrides only when engaged", () => {
      const off = stageStyle(base);
      expect(off).not.toHaveProperty("--vd-glass-tint");
      expect(off).not.toHaveProperty("--vd-card-border-width");
      expect(off).not.toHaveProperty("font-size");

      const on = stageStyle(
        state({
          shadow: "md",
          glass: "tinted",
          outline: 2,
          radius: "0.25",
          font: "ubuntu",
          fontScale: 1.25,
        }),
      );
      expect(on["--vd-card-shadow"]).toBe("var(--vd-shadow-md)");
      expect(on["--vd-glass-tint"]).toBe("var(--vd-color-primary-alpha-20)");
      expect(on["--vd-card-border-width"]).toBe("2px");
      expect(on["--vd-card-border-color"]).toBe("var(--vd-color-primary)");
      expect(on["--vd-card-border-radius"]).toBe("0.5rem");
      expect(on["--vd-font-family-sans"]).toContain("Ubuntu");
      expect(on["font-size"]).toBe("calc(1rem * 1.25)");
      expect(on["--vd-btn-font-size"]).toBe(
        "calc(var(--vd-font-size-base) * 1.25)",
      );
    });
  });

  describe("styleToCss", () => {
    it("serializes a style map to 2-space-indented declarations", () => {
      expect(
        styleToCss({ "--vd-color-primary": "#228be6", "font-family": "serif" }),
      ).toBe("  --vd-color-primary: #228be6;\n  font-family: serif;");
    });

    it("round-trips a stageStyle map into valid declaration lines", () => {
      const css = styleToCss(stageStyle(base));
      expect(css).toContain("  --vd-color-primary: #228be6;");
      expect(css.split("\n").every((l) => l.trim().endsWith(";"))).toBe(true);
    });
  });

  describe("toVueSfc assembly", () => {
    it("emits the import line, scoped style block, and a coherent SFC", () => {
      const sfc = toVueSfc(
        CUSTOMIZER_REGISTRY.button,
        state({ variant: "vd-btn-primary" }),
        scope,
      );

      // Imports name only the real Vd* components for the entry.
      expect(sfc).toContain('import { VdButton } from "@vanduo-oss/vd3";');

      // A single scoped style block carries the concrete override values.
      expect(sfc).toContain(`${scope} {`);
      expect(sfc).toContain("  --vd-color-primary: #228be6;");
      expect(sfc).toContain("  --vd-btn-border-radius: 0.625rem;");

      // The three blocks appear in order and the template mirrors the preview.
      const scriptIdx = sfc.indexOf('<script setup lang="ts">');
      const templateIdx = sfc.indexOf("<template>");
      const styleIdx = sfc.indexOf("<style>");
      expect(scriptIdx).toBeGreaterThanOrEqual(0);
      expect(templateIdx).toBeGreaterThan(scriptIdx);
      expect(styleIdx).toBeGreaterThan(templateIdx);
      expect(sfc).toContain(
        '<VdButton variant="primary" class="my-demo">Button</VdButton>',
      );
    });

    it("multi-import cards fold per-entry extraCss into the scoped block", () => {
      const sfc = toVueSfc(
        CUSTOMIZER_REGISTRY.card,
        state({ variant: "vd-card-outlined", shadow: "md", outline: 3 }),
        scope,
      );
      expect(sfc).toContain(
        'import { VdCard, VdButton } from "@vanduo-oss/vd3";',
      );
      // Card outline/shadow are pure leaf-token overrides (no extra CSS rules).
      expect(sfc).toContain("  --vd-card-border-width: 3px;");
      expect(sfc).toContain("  --vd-card-shadow: var(--vd-shadow-md);");
    });

    it("Button outline/shadow become real extra CSS rules under the scope", () => {
      const sfc = toVueSfc(
        CUSTOMIZER_REGISTRY.button,
        state({ variant: "vd-btn-primary", shadow: "lg", outline: 2 }),
        scope,
      );
      expect(sfc).toContain(
        `${scope} .vd-btn { border-width: 2px; border-color: var(--vd-color-primary); }`,
      );
      expect(sfc).toContain(
        `${scope} .vd-btn { box-shadow: var(--vd-shadow-lg); }`,
      );
    });

    it("Button ring outline drives --vd-btn-ring-width, not border-width", () => {
      const sfc = toVueSfc(
        CUSTOMIZER_REGISTRY.button,
        state({ variant: "vd-btn-primary", ring: true, outline: 3 }),
        scope,
      );
      expect(sfc).toContain(
        `${scope} .vd-btn { --vd-btn-ring-width: 3px; }`,
      );
      expect(sfc).not.toContain(
        `${scope} .vd-btn { border-width: 3px; border-color: var(--vd-color-primary); }`,
      );
    });

    it("Button widthScale scales horizontal padding tokens when not 1", () => {
      const off = toVueSfc(
        CUSTOMIZER_REGISTRY.button,
        state({ variant: "vd-btn-primary" }),
        scope,
      );
      expect(off).not.toContain("--vd-btn-padding-x:");

      const sfc = toVueSfc(
        CUSTOMIZER_REGISTRY.button,
        state({ variant: "vd-btn-primary", widthScale: 1.5 }),
        scope,
      );
      expect(sfc).toContain("--vd-btn-padding-x: calc(1.3125rem * 1.5);");
      expect(sfc).toContain("--vd-btn-padding-x-sm: calc(0.8125rem * 1.5);");
      expect(sfc).toContain("--vd-btn-padding-x-lg: calc(2.125rem * 1.5);");
    });
  });
});
