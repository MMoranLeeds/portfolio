import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("all case-study covers open in one native modal and return keyboard focus", async ({
  page,
}) => {
  for (const slug of [
    "nextramble",
    "accessible-trades",
    "huugo-from-fruugo",
    "fruugo-localisation",
    "fruugo-merchant-onboarding",
  ]) {
    await page.goto(`/work/${slug}`);
    const trigger = page
      .getByRole("button", { name: /^Enlarge image:/ })
      .first();
    const viewer = page.getByRole("dialog", { name: "Image viewer" });
    await expect(page.locator(".image-lightbox")).toHaveCount(1);
    await expect(page.locator(".image-lightbox img")).toHaveCount(0);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(viewer).toBeVisible();
    expect(await viewer.evaluate((element) => element.matches(":modal"))).toBe(
      true,
    );
    await expect(
      viewer.getByRole("button", { name: "Close image" }),
    ).toBeFocused();
    await expect(viewer.locator("img")).toHaveAttribute("src", /\.webp$/);
    await expect(page.locator("html")).toHaveCSS("overflow", "hidden");
    await page.keyboard.press("Escape");
    await expect(viewer).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(page.locator(".image-lightbox img")).toHaveCount(0);
    expect(
      await page.locator("html").evaluate((element) => element.style.overflow),
    ).toBe("");
  }
});

test("SVG and screenshot figures support outside dismissal and close without leaving the page", async ({
  page,
}) => {
  await page.goto("/work/fruugo-localisation");
  const svg = page.getByRole("button", {
    name: /Enlarge image:.*(?:audit|screenshots)/i,
  });
  await svg.click();
  const viewer = page.getByRole("dialog", { name: "Image viewer" });
  await expect(viewer.locator("img")).toHaveAttribute("src", /\.svg$/);
  await page.mouse.click(4, 4);
  await expect(viewer).toBeHidden();
  await expect(svg).toBeFocused();
  await expect(page).toHaveURL(/\/work\/fruugo-localisation$/);

  await page.goto("/work/fruugo-merchant-onboarding");
  const screenshot = page.getByRole("button", {
    name: /Enlarge image: Original payment page/,
  });
  await screenshot.click();
  await expect(viewer).toBeVisible();
  await expect
    .poll(() =>
      viewer
        .locator("img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  await viewer.locator("img").click();
  await expect(viewer).toBeVisible();
  const box = await viewer.locator("img").boundingBox();
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
  await page.mouse.down();
  await page.mouse.move(4, 4);
  await page.mouse.up();
  await expect(viewer).toBeVisible();
  await viewer.getByRole("button", { name: "Close image" }).click();
  await expect(viewer).toBeHidden();
  await expect(screenshot).toBeFocused();
});

test("the open viewer is accessible and fits a 320px viewport in both themes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/work/fruugo-merchant-onboarding");
  for (const theme of ["light", "dark"]) {
    await page.evaluate((value) => {
      document.documentElement.dataset.theme = value;
    }, theme);
    await page
      .getByRole("button", { name: /^Enlarge image:/ })
      .first()
      .click();
    const viewer = page.getByRole("dialog", { name: "Image viewer" });
    await expect
      .poll(() =>
        viewer
          .locator("img")
          .evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
      )
      .toBe(true);
    const box = await viewer.locator("img").boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(320);
    expect(box!.y + box!.height).toBeLessThanOrEqual(720);
    const results = await new AxeBuilder({ page })
      .include(".image-lightbox")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.keyboard.press("Escape");
  }
});

test("navigation closes the viewer and restores scroll", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("link", {
      name: "Read case study: Accessible Trades",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: /^Enlarge image:/ })
    .first()
    .click();
  await page.goBack();
  await expect(page.getByRole("dialog", { name: "Image viewer" })).toHaveCount(
    0,
  );
  expect(
    await page.locator("html").evaluate((element) => element.style.overflow),
  ).toBe("");
});

test("failed enlarged images announce recovery and remain dismissible", async ({
  page,
}) => {
  await page.goto("/work/fruugo-merchant-onboarding");
  const trigger = page.getByRole("button", {
    name: /Enlarge image: Original payment page/,
  });
  const srcset = await trigger.locator("img").getAttribute("srcset");
  const fullSrc = srcset!.split(",").at(-1)!.trim().split(/\s+/)[0];
  await page.route(new URL(fullSrc, "http://127.0.0.1:5173").href, (route) =>
    route.abort(),
  );
  await trigger.click();
  const viewer = page.getByRole("dialog", { name: "Image viewer" });
  await expect(viewer.getByRole("alert")).toContainText(
    "This image couldn’t be loaded",
  );
  await expect(
    viewer.getByRole("button", { name: "Close image" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("long case-study screenshots scroll without losing the close control", async ({
  page,
}) => {
  await page.goto("/work/accessible-trades");
  const trigger = page.getByRole("button", {
    name: /Enlarge image: Lonsdale Contracts company profile/,
  });
  await trigger.click();
  const viewer = page.getByRole("dialog", { name: "Image viewer" });
  await expect(viewer).toHaveClass(/image-lightbox--document/);
  await expect
    .poll(() =>
      viewer
        .locator("img")
        .evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
    )
    .toBe(true);
  expect(
    await viewer.evaluate(
      (element) => element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await page.keyboard.press("PageDown");
  await expect
    .poll(() => viewer.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  const close = viewer.getByRole("button", { name: "Close image" });
  await expect(close).toBeFocused();
  await expect(close).toBeInViewport();
  await page.keyboard.press("Escape");
  await expect(viewer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("case-study phones stay inside a consistent desktop image canvas", async ({
  page,
}) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const dimensions: Array<{ desktop: number; phone: number }> = [];
    for (const slug of [
      "fruugo-localisation",
      "fruugo-merchant-onboarding",
      "huugo-from-fruugo",
      "accessible-trades",
      "nextramble",
    ]) {
      await page.goto(`/work/${slug}`);
      const media = page.locator(".case-cover-pair .project-figure-media");
      const desktop = media.locator(":scope > .project-image-trigger");
      const phone = media.locator(".mobile-preview-device");
      await expect(phone).toBeVisible();
      const screenBounds = await desktop.boundingBox();
      const phoneBounds = await phone.boundingBox();
      expect(screenBounds).not.toBeNull();
      expect(phoneBounds).not.toBeNull();
      const screen = screenBounds!;
      const device = phoneBounds!;
      expect(device.y).toBeGreaterThanOrEqual(screen.y);
      expect(device.y + device.height).toBeLessThanOrEqual(
        screen.y + screen.height + 1,
      );
      expect(device.x).toBeGreaterThanOrEqual(screen.x);
      expect(device.x + device.width).toBeLessThanOrEqual(
        screen.x + screen.width + 1,
      );
      expect(Math.abs(screen.width / screen.height - 12 / 5)).toBeLessThan(
        0.03,
      );
      expect(
        Math.abs((device.x + device.width - screen.x) / screen.width - 0.98),
      ).toBeLessThan(0.01);
      dimensions.push({ desktop: screen.width, phone: device.width });
    }
    for (const size of dimensions) {
      expect(Math.abs(size.desktop - dimensions[0]!.desktop)).toBeLessThan(1);
      expect(Math.abs(size.phone - dimensions[0]!.phone)).toBeLessThan(1);
    }
  }
});
