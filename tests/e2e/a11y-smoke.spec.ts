import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFileSync } from "node:fs";

// No global rule exclusions. New occurrences fail in either theme.
interface Route {
  readonly path: string;
  readonly label: string;
}
const ROUTES: readonly Route[] = [
  { path: "/", label: "home" },
  { path: "/docs-landing", label: "docs-landing" },
  { path: "/components/button", label: "components-button" },
  { path: "/components/forms", label: "components-forms" },
  { path: "/guides/getting-started", label: "guides-getting-started" },
  { path: "/canvas/charts", label: "canvas-charts" },
  { path: "/canvas/flowchart", label: "canvas-flowchart" },
  { path: "/media/image-box", label: "media-image-box" },
  { path: "/changelog", label: "changelog" },
  {
    path: "/components/theme-customizer",
    label: "components-theme-customizer",
  },
  { path: "/components/theme-switcher", label: "components-theme-switcher" },
  { path: "/core/color-palette", label: "core-color-palette" },
  // Rich-ARIA widget archetype: VdTree renders a role=tree / role=treeitem
  // hierarchy with aria-expanded / aria-selected, exercising the composite-
  // widget rules (aria-required-children, roles, focus) the flat pages don't.
  { path: "/components/tree", label: "components-tree" },
];

for (const theme of ["light", "dark"] as const) {
  for (const route of ROUTES) {
    test(`${theme}: ${route.path} has no serious/critical axe violations`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.emulateMedia({ colorScheme: theme });
      await page.addInitScript(
        (value) => localStorage.setItem("vanduo-theme-preference", value),
        theme,
      );
      await page.goto(route.path, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      writeFileSync(
        testInfo.outputPath("axe.json"),
        JSON.stringify(
          { route: route.path, theme, violations: results.violations },
          null,
          2,
        ),
      );
      const blocking = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      );
      expect(
        blocking.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            why: n.failureSummary,
          })),
        })),
      ).toEqual([]);
    });
  }
}
