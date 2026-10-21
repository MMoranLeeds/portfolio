import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("motion follows the system and remembers an explicit override", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");
  await page.getByRole("button", { name: /^Preferences:/ }).click();
  const viewer = page.getByRole("dialog", { name: "Preferences", exact: true });
  const motion = viewer.getByRole("combobox", { name: "Interface motion" });
  await expect(motion).toHaveValue("system");
  await motion.selectOption("full");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "smooth");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await page.getByRole("button", { name: /^Preferences:/ }).click();
  await motion.selectOption("system");
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduce");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("html")).toHaveAttribute("data-motion", "full");
  await motion.selectOption("reduce");
  await expect(page.locator(".arrow-icon").first()).toHaveCSS(
    "transition-duration",
    "0s",
  );
  await expect(viewer).toBeVisible();
});

test("preferences preserve modal focus, accessibility and scroll at 320px", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/work/accessible-trades");
  const trigger = page.getByRole("button", { name: /^Preferences:/ });
  for (const theme of ["light", "dark"]) {
    await trigger.click();
    const viewer = page.getByRole("dialog", {
      name: "Preferences",
      exact: true,
    });
    await viewer
      .getByRole("combobox", { name: "Colour theme" })
      .selectOption(theme);
    await viewer.getByRole("button", { name: "Done", exact: true }).focus();
    await page.keyboard.press("Tab");
    await expect(
      viewer.getByRole("button", { name: "Close preferences" }),
    ).toBeFocused();
    await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
    const scan = await new AxeBuilder({ page })
      .include("#preferences-panel")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    expect(
      await page.locator("html").evaluate((element) => element.style.overflow),
    ).toBe("");
  }
});
