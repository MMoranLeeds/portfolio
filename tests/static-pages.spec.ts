import { test, expect } from "@playwright/test";

test("production case study is readable without JavaScript", async ({
  browser,
}) => {
  test.skip(
    !process.env.TEST_PREVIEW,
    "Requires npm run build and the production preview",
  );
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:5173/work/accessible-trades/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessible Trades",
  );
  await expect(
    page.getByRole("heading", { name: "The problem and goal", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Back to case studies", exact: true })
    .first()
    .click();
  await expect(page.locator("#case-studies")).toBeVisible();
  await context.close();
});
