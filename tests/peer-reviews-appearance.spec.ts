import { test, expect } from "@playwright/test";

test("preferences open a native modal with immediate choices and focus return", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /^Preferences:/ });
  const viewer = page.getByRole("dialog", { name: "Preferences", exact: true });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  expect(await viewer.evaluate((element) => element.matches(":modal"))).toBe(
    true,
  );
  await expect(
    viewer.getByRole("combobox", { name: "Colour theme" }),
  ).toBeFocused();
  await viewer
    .getByRole("combobox", { name: "Colour theme" })
    .selectOption("dark");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "Done", exact: true }).click();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("preferences dismiss outside and fit a narrow viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: /^Preferences:/ });
  await trigger.click();
  const viewer = page.getByRole("dialog", { name: "Preferences", exact: true });
  const box = await viewer.boundingBox();
  expect(box!.x).toBeGreaterThanOrEqual(0);
  expect(box!.x + box!.width).toBeLessThanOrEqual(320);
  await viewer
    .getByText("Customise display settings and motion preferences.")
    .click();
  await expect(viewer).toBeVisible();
  await page.mouse.click(4, 4);
  await expect(viewer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("recent peer reviews appear on the homepage without invented project associations", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Testimonials", exact: true }),
  ).toHaveCount(1);
  await expect(page.locator("#testimonials .peer-review")).toHaveCount(4);
  await expect(page.locator("#testimonials")).toContainText("Becky Lovell");
  await expect(page.locator("#testimonials")).toContainText("Kieran Lynch");
  await expect(page.locator("#testimonials")).toContainText("Ryan Duncan");
  await expect(page.locator("#testimonials a")).toHaveCount(0);
  await expect(page.locator(".sidebar-tools .theme-trigger")).toHaveCount(0);
  await expect(page.locator("#testimonials")).toContainText("Huw Evans");
  await expect(page.locator("#testimonials details")).toHaveCount(0);
  await expect(page.locator(".review-continuation")).toContainText(
    "Matt is a dedicated mentor",
  );
  await expect(
    page.getByText("Peer feedback, 2026", { exact: true }),
  ).toHaveCount(3);
  await page.goto("/work/huugo-from-fruugo");
  await expect(
    page.getByRole("heading", {
      name: "Working together on this project",
      exact: true,
    }),
  ).toHaveCount(0);
});
