import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Huugo is selected work rather than duplicated homepage copy", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Putting this into practice: Huugo from Fruugo",
    }),
  ).toHaveCount(0);
  await expect(page.locator(".project-card")).toHaveCount(5);
  await page
    .getByRole("link", {
      name: "Read case study: Huugo from Fruugo",
      exact: true,
    })
    .click();
  await expect(page).toHaveURL(/\/work\/huugo-from-fruugo$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Huugo from Fruugo",
  );
  await expect(page).toHaveTitle("Huugo from Fruugo | Matthew Moran");
  await expect(
    page.getByRole("heading", {
      name: "From character design to an agent-supported workflow",
      exact: true,
    }),
  ).toBeVisible();
});

test("Huugo content, evidence and future scope are accessible", async ({
  page,
}) => {
  await page.goto("/work/huugo-from-fruugo");
  await expect(page.locator(".case-evidence li")).toHaveCount(3);
  await expect(
    page.getByText("Proposed next phase", { exact: true }),
  ).toBeVisible();
  await page.locator(".evidence-source").first().click();
  await expect(page.locator("#source-google-shopping")).toBeInViewport();
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
});

test("Huugo reflows at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/work/huugo-from-fruugo");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
