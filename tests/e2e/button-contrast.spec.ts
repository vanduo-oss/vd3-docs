import { expect, test, type Page } from "@playwright/test";

const parseRgb = (value: string): [number, number, number] | null => {
  const match = value.match(/[\d.]+/g);
  if (!match || match.length < 3) return null;
  return [Number(match[0]), Number(match[1]), Number(match[2])];
};

const relativeLuminance = ([r, g, b]: [number, number, number]): number => {
  const channel = (value: number): number => {
    const linear = value / 255;
    return linear <= 0.04045
      ? linear / 12.92
      : ((linear + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrastRatio = (fg: string, bg: string): number => {
  const foreground = parseRgb(fg);
  const background = parseRgb(bg);
  if (!foreground || !background) return 0;
  const lighter = Math.max(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  const darker = Math.min(
    relativeLuminance(foreground),
    relativeLuminance(background),
  );
  return (lighter + 0.05) / (darker + 0.05);
};

const forceDarkYellow = async (page: Page): Promise<void> => {
  await page.addInitScript(() => {
    window.localStorage.setItem("vanduo-theme-preference", "dark");
    window.localStorage.setItem("vanduo-primary-color", "yellow");
  });
  await page.emulateMedia({ colorScheme: "dark" });
};

test.describe("Package-owned button contrast", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await forceDarkYellow(page);
  });

  test("dark + yellow filled variants keep readable ink", async ({ page }) => {
    await page.goto("/components/button", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute(
      "data-primary",
      "yellow",
    );

    const samples = await page.evaluate(() => {
      const root = document.querySelector('[data-demo="variants"]');
      if (!(root instanceof HTMLElement)) return [];
      return [...root.querySelectorAll(".vd-btn")]
        .filter((el) =>
          /vd-btn-(primary|secondary|success|danger|info)\b/.test(el.className),
        )
        .filter((el) => !el.className.includes("outline"))
        .map((el) => {
          const style = getComputedStyle(el);
          return {
            text: el.textContent?.trim() ?? "",
            color: style.color,
            backgroundColor: style.backgroundColor,
          };
        });
    });

    expect(samples).toHaveLength(5);
    for (const sample of samples) {
      expect(
        contrastRatio(sample.color, sample.backgroundColor),
        `${sample.text} contrast`,
      ).toBeGreaterThanOrEqual(4.5);
    }

    const primary = page.locator('[data-demo="variants"] .vd-btn-primary');
    await primary.hover();
    const primaryHover = await primary.evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        color: style.color,
        backgroundColor: style.backgroundColor,
      };
    });
    expect(
      contrastRatio(primaryHover.color, primaryHover.backgroundColor),
      "primary hover contrast",
    ).toBeGreaterThanOrEqual(4.5);
    expect(primaryHover.color).not.toBe("rgb(255, 255, 255)");
  });

  test("dark + yellow ink and outline hover use a solid primary fill and dark ink", async ({
    page,
  }) => {
    await page.goto("/components/button", { waitUntil: "networkidle" });

    const ink = page.locator('[data-demo="ink-sizes"] .vd-btn-ink').nth(1);
    const outline = page
      .locator('[data-demo="variants"] .vd-btn-outline')
      .first();

    const assertSolidHover = async (
      button: ReturnType<Page["locator"]>,
      label: string,
    ): Promise<void> => {
      const restOutline = await button.evaluate(
        (el) => getComputedStyle(el).borderColor,
      );
      await button.hover();
      // `.vd-btn` transitions `all` (and links also transition `color`);
      // retry until the hover paint has settled.
      await expect(button, `${label} hover text`).toHaveCSS(
        "color",
        "rgb(0, 0, 0)",
      );
      await expect(button, `${label} hover fill`).toHaveCSS(
        "background-color",
        restOutline,
      );
      await expect(button, `${label} hover border`).toHaveCSS(
        "border-color",
        restOutline,
      );
    };

    await assertSolidHover(ink, "ink");
    await assertSolidHover(outline, "outline");
  });

  test("live customizer selected chips use dark ink on the primary fill", async ({
    page,
  }) => {
    await page.goto("/components/button", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Customize live" }).click();

    const chips = page.locator(".lcc-seg-btn.active");
    await expect(chips.first()).toBeVisible();

    const samples = await chips.evaluateAll((els) =>
      els.map((el) => {
        const style = getComputedStyle(el);
        return {
          text: el.textContent?.trim() || el.getAttribute("aria-label") || "",
          color: style.color,
          backgroundColor: style.backgroundColor,
        };
      }),
    );

    expect(samples.length).toBeGreaterThanOrEqual(4);
    for (const sample of samples) {
      expect(sample.color, `${sample.text} chip text`).toBe("rgb(0, 0, 0)");
      expect(
        contrastRatio(sample.color, sample.backgroundColor),
        `${sample.text} chip contrast`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  test("variant grid is equal-sized and size demos run small to large", async ({
    page,
  }) => {
    await page.goto("/components/button", { waitUntil: "networkidle" });

    const variantButtons = page.locator('[data-demo="variants"] > .vd-btn');
    await expect(variantButtons).toHaveCount(9);

    const boxes = await variantButtons.evaluateAll((els) =>
      els.map((el) => {
        const box = el.getBoundingClientRect();
        return { width: box.width, height: box.height };
      }),
    );
    const width = boxes[0]?.width ?? 0;
    const height = boxes[0]?.height ?? 0;
    expect(width).toBeGreaterThan(80);
    for (const box of boxes) {
      expect(Math.abs(box.width - width)).toBeLessThan(2);
      expect(Math.abs(box.height - height)).toBeLessThan(2);
    }

    const inkClasses = await page
      .locator('[data-demo="ink-sizes"] > .vd-btn')
      .evaluateAll((els) => els.map((el) => el.className));
    expect(inkClasses[0]).toContain("vd-btn-sm");
    expect(inkClasses[1]).not.toMatch(/vd-btn-(sm|lg)/);
    expect(inkClasses[2]).toContain("vd-btn-lg");

    const loadingClasses = await page
      .locator('[data-demo="loading-sizes"] > .vd-btn')
      .evaluateAll((els) => els.map((el) => el.className));
    expect(loadingClasses[0]).toContain("vd-btn-sm");
    expect(loadingClasses[1]).not.toMatch(/vd-btn-(sm|lg)/);
    expect(loadingClasses[2]).toContain("vd-btn-lg");
  });
});

test.describe("Home CTA contrast", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await forceDarkYellow(page);
  });

  test("dark + yellow hero CTAs hover with a solid primary fill and dark ink", async ({
    page,
  }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute(
      "data-primary",
      "yellow",
    );

    const buttons = page.locator(".hero-cta-buttons .vd-btn");
    await expect(buttons).toHaveCount(3);

    const restOutline = await buttons.first().evaluate((el) => {
      const style = getComputedStyle(el);
      return style.borderColor;
    });

    for (let index = 0; index < 3; index += 1) {
      const button = buttons.nth(index);
      await button.hover();
      await expect(button).toHaveCSS("color", "rgb(0, 0, 0)");
      await expect(button).toHaveCSS("background-color", restOutline);
      await expect(button).toHaveCSS("border-color", restOutline);
    }
  });
});
