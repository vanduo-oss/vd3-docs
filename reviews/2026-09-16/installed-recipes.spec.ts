import { test, expect } from "@playwright/test";
test("modal and toast recipe", async ({ page }) => {
  await page.goto("/?recipe=modal-toast");
  const open = page.getByRole("button", { name: "Edit note" });
  await open.click();
  const modal = page.getByRole("dialog");
  await expect(modal).toBeVisible();
  await modal.getByRole("button", { name: "Save" }).click();
  await expect(modal).not.toBeVisible();
  await expect(page.getByText("Saved", { exact: true })).toBeVisible();
  await expect(open).toBeFocused();
});
test("tooltip recipe", async ({ page }) => {
  await page.goto("/?recipe=tooltip");
  const trigger = page.getByRole("button");
  await trigger.focus();
  await expect(page.getByRole("tooltip")).toBeVisible();
  await trigger.press("Escape");
  await expect(page.getByRole("tooltip")).toHaveCount(0);
  await trigger.press("Enter");
  await expect(page.locator("main,body").first()).toContainText("1");
});
test("bar event and table recipe", async ({ page }) => {
  await page.goto("/?recipe=bar");
  await expect(page.getByRole("table")).toBeVisible();
  const mark = page.locator("rect.vd-chart-bar").first();
  await mark.focus();
  await mark.press("Enter");
  await expect(page.getByText("Selected: Jan")).toBeVisible();
});
test("pie default and theme refresh recipe", async ({ page }) => {
  await page.goto("/?recipe=pie");
  const mark = page.locator(".vd-chart-slice").first();
  expect((await mark.getAttribute("d"))?.match(/A/g)).toHaveLength(1);
  await page.getByRole("button", { name: "Change chart color" }).click();
  await expect(mark).toHaveAttribute("fill", "#0b7285");
});
test("controlled editor recipe preserves edit and undo across read-only", async ({
  page,
}) => {
  await page.goto("/?recipe=editor");
  await page.getByRole("button", { name: "Add Rect", exact: true }).click();
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(3);
  const toggle = page.getByRole("button", { name: "Toggle read-only" });
  await toggle.click();
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(3);
  await toggle.click();
  await page.getByRole("button", { name: "Undo", exact: true }).first().click();
  await expect(page.locator(".vd-flowchart-node")).toHaveCount(2);
});
