import { test, expect } from "@playwright/test";

test("the copied Button example performs its documented action", async ({
  page,
}) => {
  await page.goto("/components/button", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Save", exact: true }).click();
  await expect(page.locator("#buttons").getByRole("status")).toHaveText(
    "Saved 1 times",
  );
  await page
    .getByRole("button", { name: "Save with ring", exact: true })
    .click();
  await expect(page.locator("#buttons").getByRole("status")).toHaveText(
    "Saved 2 times",
  );
});

test("the copied Accordion example supports keyboard and exclusive selection", async ({
  page,
  browserName,
}) => {
  await page.goto("/components/accordion", { waitUntil: "networkidle" });
  const multiple = page.locator(".vd-accordion").nth(0);
  const exclusive = page.locator(".vd-accordion").nth(1);
  const first = multiple.getByRole("button", { name: "Design tokens" });
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#vd-accordion-panel-basic-tokens")).toBeVisible();
  // macOS WebKit uses Option+Tab to include native buttons in tab navigation.
  await page.keyboard.press(
    process.platform === "darwin" && browserName === "webkit"
      ? "Alt+Tab"
      : "Tab",
  );
  const second = multiple.getByRole("button", { name: "Keyboard access" });
  await expect(second).toBeFocused();
  await page.keyboard.press("Space");
  await expect(second).toHaveAttribute("aria-expanded", "true");
  await expect(first).toHaveAttribute("aria-expanded", "true");
  await exclusive.getByRole("button", { name: "Keyboard access" }).click();
  await expect(
    exclusive.getByRole("button", { name: "Design tokens" }),
  ).toHaveAttribute("aria-expanded", "false");
  await expect(
    page.locator("#vd-accordion-panel-exclusive-tokens"),
  ).toBeHidden();
  await expect(
    page.locator("#vd-accordion-panel-exclusive-keyboard"),
  ).toBeVisible();
});
