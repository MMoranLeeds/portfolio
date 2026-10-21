import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("system theme and saved overrides apply on initial load", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: /^Preferences:/ }).click();
  await expect(
    page.getByRole("combobox", { name: "Colour theme" }),
  ).toHaveValue("system");
  await page
    .getByRole("combobox", { name: "Colour theme" })
    .selectOption("light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: /^Preferences:/ }).click();
  await expect(
    page.getByRole("combobox", { name: "Colour theme" }),
  ).toHaveValue("light");
  await page
    .getByRole("combobox", { name: "Colour theme" })
    .selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("dark palette remains accessible on a case study", async ({ page }) => {
  await page.goto("/work/fruugo-localisation");
  await page.getByRole("button", { name: /^Preferences:/ }).click();
  await page
    .getByRole("combobox", { name: "Colour theme" })
    .selectOption("dark");
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await expect(page).toHaveURL(/\/work\/fruugo-localisation$/);
});

test("scrolling replaces the active hash without moving focus or adding history entries", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "desktop");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?campaign=test#introduction");
  const control = page.getByRole("button", { name: /^Preferences:/ });
  await control.focus();
  const length = await page.evaluate(() => history.length);
  await page
    .locator("#accessibility-and-systems")
    .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect(page).toHaveURL(/\?campaign=test#accessibility-and-systems$/);
  await expect(
    page.locator('.desktop-navigation a[aria-current="location"]'),
  ).toHaveAttribute("href", "/#accessibility-and-systems");
  await expect(control).toBeFocused();
  expect(await page.evaluate(() => history.length)).toBe(length);
  await page
    .locator("#contact")
    .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect(page).toHaveURL(/#contact$/);
});

test("direct section links and case-study URLs remain stable", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#accessibility-and-systems");
  await expect(page.locator("#accessibility-and-systems")).toBeInViewport();
  await expect(page).toHaveURL(/#accessibility-and-systems$/);
  await page.goto("/work/accessible-trades");
  await page
    .locator("#contact")
    .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  await expect(page).toHaveURL(/\/work\/accessible-trades$/);
});
