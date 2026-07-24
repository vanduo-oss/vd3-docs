import { describe, expect, it } from "vitest";
import { CUSTOMIZER_REGISTRY, renderDemo } from "@/customizer/registry";
import { toVueSfc } from "@/customizer/codegen";
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
