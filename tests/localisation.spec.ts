import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("localisation card opens its shared case-study view", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "Read case study: Localisation at Fruugo",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/work\/fruugo-localisation$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Localisation at Fruugo",
  );
  await expect(page).toHaveTitle("Localisation at Fruugo | Matthew Moran");
  await expect(
    page.getByRole("heading", {
      name: "Research and findings",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator(".case-evidence li")).toHaveCount(3);
  await expect(page.locator('a[href*="atlassian.net"]')).toHaveCount(0);
});

test("internal evidence is readable without a fake external link", async ({
  page,
}) => {
  await page.goto("/work/fruugo-localisation");
  await page.locator("#source-localisation-briefing").scrollIntoViewIfNeeded();
  await expect(page.locator("#source-localisation-briefing")).toBeInViewport();
  await expect(page.locator("#source-localisation-briefing a")).toHaveCount(0);
  await expect(page.locator("#source-noto-reference a")).toHaveAttribute(
    "href",
    "https://notofonts.github.io/noto-docs/website/use/",
  );
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
});

test("localisation case study reflows at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/work/fruugo-localisation");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
