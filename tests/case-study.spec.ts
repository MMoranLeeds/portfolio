import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("opens a reusable case study and returns to selected work", async ({
  page,
}) => {
  await page.goto("/");
  const card = page.getByRole("link", {
    name: "Read case study: Accessible Trades",
    exact: true,
  });
  await card.scrollIntoViewIfNeeded();
  const position = await page.evaluate(() => window.scrollY);
  await card.click();
  await expect(page).toHaveURL(/\/work\/accessible-trades$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessible Trades",
  );
  await expect(page).toHaveTitle("Accessible Trades | Matthew Moran");
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /How Matthew Moran created Accessible Trades/,
  );
  await page
    .getByRole("link", { name: "Back to case studies", exact: true })
    .first()
    .click();
  await expect(page.locator("#case-studies")).toBeFocused();
  await expect
    .poll(async () =>
      Math.abs((await page.evaluate(() => window.scrollY)) - position),
    )
    .toBeLessThan(5);
  await expect(page).toHaveTitle("Matthew Moran | Lead Product Designer");
});

test("direct route loads, browser history works, and the case study is accessible", async ({
  page,
}) => {
  await page.goto("/work/accessible-trades");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessible Trades",
  );
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations).toEqual([]);
  await page
    .getByRole("link", { name: "Back to case studies", exact: true })
    .first()
    .click();
  await page.goBack();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessible Trades",
  );
  await page.goForward();
  await expect(page.locator("#case-studies")).toBeVisible();
});

test("unknown projects show a useful noindex page", async ({ page }) => {
  await page.goto("/work/project-that-does-not-exist");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This page seems to have wandered off.",
  );
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
});

test("case-study reflow works at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/work/accessible-trades");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("all cards expose outcomes and their articles explain rationale and evaluation", async ({
  page,
}) => {
  await page.goto("/");
  const cards = page.locator(".project-card");
  await expect(cards).toHaveCount(6);
  const destinations = await cards
    .locator("a.project-card-link")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
  for (const card of await cards.all()) {
    await expect(card.locator(".project-card-outcome-label")).toHaveText(
      "Outcome",
    );
    await expect(
      card.locator(".project-card-outcome p").last(),
    ).not.toBeEmpty();
  }
  for (const destination of destinations) {
    await page.goto(destination);
    const overview = page.getByRole("region", {
      name: "At a glance",
      exact: true,
    });
    await expect(overview.locator("dt")).toHaveText([
      "Design rationale",
      "Evaluation",
      "Outcome",
    ]);
    for (const detail of await overview.locator("dd").all()) {
      await expect(detail).not.toBeEmpty();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/work/fruugo-merchant-onboarding");
  await expect(page.locator(".case-overview")).toContainText(
    "one observed completion, not an average",
  );
  await expect(page.locator("#main-content")).toContainText(
    "do not establish average end-to-end application completion time",
  );
});
