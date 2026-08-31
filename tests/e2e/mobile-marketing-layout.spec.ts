import { test, expect } from "@playwright/test";

const MARKETING_ROUTES = [
  { path: "/cbun", root: "#cbun" },
  { path: "/showcase", root: "#showcase" },
] as const;

test.describe("Mobile marketing page gutters", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
  });

  for (const route of MARKETING_ROUTES) {
    test(`${route.path} keeps uniform horizontal gutters`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" });

      const layout = await page.evaluate((rootSelector) => {
        const root = document.querySelector(rootSelector);
        if (!(root instanceof HTMLElement)) {
          return { ok: false as const, reason: "missing root" };
        }

        const containers = [
          ...root.querySelectorAll(".vd-container-responsive"),
        ] as HTMLElement[];
        if (containers.length === 0) {
          return { ok: false as const, reason: "no containers" };
        }

        const rem = Number.parseFloat(
          getComputedStyle(document.documentElement).fontSize,
        );
        const minGutter = 1.3125 * rem; // --vd-space-fib-21
        const samples = containers.slice(0, 4).map((el) => {
          const style = getComputedStyle(el);
          const box = el.getBoundingClientRect();
          return {
            padLeft: Number.parseFloat(style.paddingLeft),
            padRight: Number.parseFloat(style.paddingRight),
            left: box.left,
            rightGap: window.innerWidth - box.right,
          };
        });

        const winW = window.innerWidth;
        const isInsideViewportScrollport = (el: HTMLElement): boolean => {
          let node: HTMLElement | null = el.parentElement;
          while (node && node !== root) {
            const style = getComputedStyle(node);
            const ox = style.overflowX;
            if (ox === "auto" || ox === "scroll" || ox === "hidden") {
              const box = node.getBoundingClientRect();
              if (box.left >= -1 && box.right <= winW + 1) return true;
            }
            node = node.parentElement;
          }
          return false;
        };

        // Flag page-bleed only — ignore tokens inside intentional scrollports
        // (code editor preview, etc.).
        let overflowX = false;
        for (const el of root.querySelectorAll("*")) {
          if (!(el instanceof HTMLElement)) continue;
          const r = el.getBoundingClientRect();
          if (r.width <= 1) continue;
          if (r.right <= winW + 1 && r.left >= -1) continue;
          if (isInsideViewportScrollport(el)) continue;
          overflowX = true;
          break;
        }

        const allPadded = samples.every(
          (s) => s.padLeft + 0.5 >= minGutter && s.padRight + 0.5 >= minGutter,
        );
        const uniform = samples.every(
          (s) =>
            Math.abs(s.padLeft - samples[0].padLeft) < 1 &&
            Math.abs(s.padRight - samples[0].padRight) < 1,
        );

        return {
          ok: true as const,
          overflowX,
          allPadded,
          uniform,
          samples,
          minGutter,
        };
      }, route.root);

      expect(layout.ok).toBe(true);
      if (!layout.ok) return;

      expect(layout.overflowX).toBe(false);
      expect(layout.allPadded).toBe(true);
      expect(layout.uniform).toBe(true);
      expect(layout.samples[0].padLeft).toBeGreaterThanOrEqual(
        layout.minGutter - 0.5,
      );
    });
  }
});
