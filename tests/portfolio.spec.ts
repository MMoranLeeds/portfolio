import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page is accessible and does not overflow", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.screenshot({
    path: testInfo.outputPath("page.png"),
    fullPage: true,
  });
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Turning customer insights into clear, accessible products.",
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("mobile menu exposes links and returns focus on Escape", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const menu = page.locator('button[aria-controls="mobile-navigation"]');
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Page sections" })
    .getByRole("link", { name: "Accessibility & systems", exact: true })
    .focus();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Page sections" })
    .getByRole("link", { name: "Accessibility & systems", exact: true })
    .click();
  await expect(page.locator("#accessibility-and-systems")).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});

test("keyboard skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("narrow reflow and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeVisible();
});
