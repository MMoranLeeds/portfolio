import { test, expect } from "@playwright/test";

test("labelled theme control stays fixed and remembers its label", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const button = page.getByRole("button", { name: /^Preferences:/ });
  const before = await button.boundingBox();
  expect(before).not.toBeNull();
  expect(before!.x).toBeGreaterThan(1200);
  await page
    .locator("#case-studies")
    .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
  const after = await button.boundingBox();
  expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
  await button.click();
  await page
    .getByRole("combobox", { name: "Colour theme" })
    .selectOption("dark");
  await page.reload();
  await expect(button).toHaveAttribute("aria-label", /Dark theme/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("appearance reserves space and remains accessible at narrower widths", async ({
  page,
}) => {
  for (const width of [320, 767, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const utility = await page.locator(".appearance-utility").boundingBox();
    const heading = await page.getByRole("heading", { level: 1 }).boundingBox();
    expect(utility).not.toBeNull();
    expect(heading!.y).toBeGreaterThanOrEqual(utility!.y + utility!.height);
    await expect(page.locator(".app-header .appearance-utility")).toHaveCount(
      1,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: /^Preferences:/ }).click();
    const dialog = await page.locator("#preferences-panel").boundingBox();
    expect(dialog!.x).toBeGreaterThanOrEqual(0);
    expect(dialog!.x + dialog!.width).toBeLessThanOrEqual(width);
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: /^Preferences:/ }),
    ).toBeFocused();
  }
});

test("mobile appearance scrolls away and desktop contacts use remaining sidebar space", async ({
  page,
}) => {
  for (const width of [320, 767, 959]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const utility = page.locator(".appearance-utility");
    await expect(utility).toHaveCSS("position", "static");
    await page
      .locator("#case-studies")
      .evaluate((element) => element.scrollIntoView({ behavior: "instant" }));
    const box = await utility.boundingBox();
    expect(box!.y + box!.height).toBeLessThan(0);
  }
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto("/");
  await expect(page.locator(".desktop-navigation")).toHaveCSS("flex-grow", "1");
  const contacts = await page.locator(".sidebar-tools").boundingBox();
  expect(contacts!.y + contacts!.height).toBeGreaterThan(1000);
  await expect(page.locator(".identity-copy .identity-focus")).toBeVisible();
});
