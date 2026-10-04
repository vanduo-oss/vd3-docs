import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const tokenFile = JSON.parse(
  readFileSync(require.resolve("@vanduo-oss/vd3/tokens.json"), "utf8"),
);
const hues = tokenFile.customizer.primary.map(
  (item: { key: string }) => item.key,
) as string[];

for (const palette of ["open-color", "fibonacci"]) {
  for (const system of ["light", "dark"] as const) {
    test(`${palette} / system ${system}: rendered primary, RGB, alpha and ink agree`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme: system });
      await page.goto("/components/button", { waitUntil: "networkidle" });
      const failures = await page.evaluate(
        ({ palette, system, hues }) => {
          const root = document.documentElement;
          const fixture = document.createElement("div");
          fixture.innerHTML = `<button class="vd-btn vd-btn-primary">Primary</button><span id="theme-rgb"></span><span id="theme-alpha"></span><span id="theme-hover"></span><span id="theme-status"></span>`;
          const style = document.createElement("style");
          style.textContent =
            "*, *::before, *::after { transition: none !important; animation: none !important; }";
          document.head.append(style);
          document.body.append(fixture);
          const [button, rgb, alpha, hover, status] = [
            ...fixture.children,
          ] as HTMLElement[];
          rgb.style.backgroundColor = "rgba(var(--vd-color-primary-rgb), 1)";
          alpha.style.backgroundColor = "var(--vd-color-primary-alpha-10)";
          hover.style.backgroundColor = "var(--vd-color-primary-dark)";
          hover.style.color = "var(--vd-text-on-primary-hover)";
          const canvas = document.createElement("canvas");
          canvas.width = canvas.height = 1;
          const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
          const rgba = (color: string, opaque = false) => {
            ctx.clearRect(0, 0, 1, 1);
            if (opaque) {
              ctx.fillStyle = "black";
              ctx.fillRect(0, 0, 1, 1);
            }
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            return Array.from(ctx.getImageData(0, 0, 1, 1).data);
          };
          const luminance = (color: number[]) =>
            color.slice(0, 3).reduce((sum, channel, i) => {
              const c = channel / 255;
              return (
                sum +
                [0.2126, 0.7152, 0.0722][i] *
                  (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
              );
            }, 0);
          const contrast = (el: HTMLElement) => {
            const computed = getComputedStyle(el);
            const a = luminance(rgba(computed.color));
            const b = luminance(rgba(computed.backgroundColor));
            return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
          };
          const failures: string[] = [];
          try {
            root.setAttribute("data-palette", palette);
            for (const theme of ["light", "dark", "system"]) {
              if (theme === "system") root.removeAttribute("data-theme");
              else root.setAttribute("data-theme", theme);
              const dark =
                theme === "dark" || (theme === "system" && system === "dark");
              for (const hue of hues) {
                root.setAttribute("data-primary", hue);
                const label = `${palette}/${theme}/${hue}`;
                const fill = rgba(getComputedStyle(button).backgroundColor);
                const triplet = rgba(getComputedStyle(rgb).backgroundColor);
                if (fill.some((value, i) => Math.abs(value - triplet[i]) > 1))
                  failures.push(`${label}: RGB ${triplet} != fill ${fill}`);
                const tintColor = getComputedStyle(alpha).backgroundColor;
                const tint = rgba(tintColor);
                // Composite over opaque black before comparing channels. Reading
                // unpremultiplied low-alpha pixels amplifies 8-bit rounding.
                const expectedTint = rgba(
                  `rgba(${fill.slice(0, 3).join(",")}, ${dark ? 0.15 : 0.1})`,
                  true,
                );
                if (
                  rgba(tintColor, true).some(
                    (value, i) => Math.abs(value - expectedTint[i]) > 1,
                  ) ||
                  Math.abs(tint[3] - 255 * (dark ? 0.15 : 0.1)) > 1
                )
                  failures.push(`${label}: alpha ${tint} != tinted ${fill}`);
                for (const [state, el] of [
                  ["rest", button],
                  ["hover", hover],
                ] as const) {
                  const ratio = contrast(el);
                  if (ratio < 4.5)
                    failures.push(
                      `${label}/${state}: contrast ${ratio.toFixed(3)}`,
                    );
                }
              }
              for (const name of ["success", "warning", "error", "info"]) {
                status.style.backgroundColor = `var(--vd-color-${name})`;
                status.style.color = "var(--vd-text-on-status)";
                rgb.style.backgroundColor = `rgba(var(--vd-color-${name}-rgb), 1)`;
                if (
                  rgba(getComputedStyle(status).backgroundColor).some(
                    (value, i) =>
                      Math.abs(
                        value - rgba(getComputedStyle(rgb).backgroundColor)[i],
                      ) > 1,
                  )
                )
                  failures.push(`${palette}/${theme}/${name}: RGB mismatch`);
                if (contrast(status) < 4.5)
                  failures.push(
                    `${palette}/${theme}/${name}: contrast ${contrast(status).toFixed(3)}`,
                  );
              }
              rgb.style.backgroundColor =
                "rgba(var(--vd-color-primary-rgb), 1)";
            }
          } finally {
            fixture.remove();
            style.remove();
          }
          return failures;
        },
        { palette, system, hues },
      );
      expect(failures).toEqual([]);
    });
  }
}
