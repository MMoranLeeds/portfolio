import { test, expect } from "@playwright/test";

test("introduction is lazy, minimises and remains available", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  const launcher = page.getByRole("button", {
    name: "Play A little about me",
    exact: true,
  });
  const panel = page.locator("#intro-video-player");
  await expect(launcher).toBeVisible();
  await expect(panel.locator("video")).toHaveCount(0);
  await launcher.click();
  await expect(panel).toBeVisible();
  await expect(panel).not.toHaveAttribute("aria-modal", "true");
  await expect(panel.locator("track")).toHaveAttribute("kind", "captions");
  await panel
    .getByRole("button", { name: "Minimise video introduction", exact: true })
    .click();
  await expect(panel).not.toBeVisible();
  await expect(launcher).toBeFocused();
  await expect
    .poll(() =>
      panel
        .locator("video")
        .evaluate((video: HTMLVideoElement) => video.paused),
    )
    .toBe(true);
  await expect(
    page.getByRole("button", {
      name: "Dismiss video introduction until refresh",
      exact: true,
    }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Close video introduction", exact: true }),
  ).toHaveCount(0);
  await page.reload();
  await expect(launcher).toBeVisible();
  const inline = page.getByRole("link", {
    name: "Watch my introduction",
    exact: true,
  });
  await inline.click();
  await expect(panel).toBeVisible();
  await panel
    .getByRole("button", { name: "Minimise video introduction", exact: true })
    .press("Escape");
  await expect(inline).toBeFocused();
  await expect(panel).not.toBeVisible();
});

test("compact screens use a modal with keyboard focus restoration", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/fruugo-cookie-consent");
  const inline = page.getByRole("link", {
    name: "Watch my introduction",
    exact: true,
  });
  await expect(page.locator(".intro-launcher")).not.toBeVisible();
  await inline.click();
  const panel = page.locator("#intro-video-player");
  await expect(panel).toHaveAttribute("aria-modal", "true");
  await expect(
    panel.getByRole("button", {
      name: "Minimise video introduction",
      exact: true,
    }),
  ).toBeFocused();
  await panel
    .getByRole("button", { name: "Minimise video introduction", exact: true })
    .press("Escape");
  await expect(panel).not.toBeVisible();
  await expect(inline).toBeFocused();
});

for (const route of ["/", "/work/fruugo-cookie-consent"]) {
  test(`video stays in place without back-to-top on ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(route);
    const bubble = page.locator(".intro-launcher");
    await expect(bubble).toBeVisible();
    const before = await bubble.boundingBox();
    await page.mouse.wheel(0, 1500);
    await expect(
      page.getByRole("button", { name: "Back to top", exact: true }),
    ).toHaveCount(0);
    await expect
      .poll(async () => {
        const after = await bubble.boundingBox();
        return !!before && !!after && Math.abs(after.y - before.y) < 2;
      })
      .toBe(true);
  });
}

test("navigation keeps Matt's portrait without the duplicate about modal", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".app-header .identity img")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Meet Matt, about me", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".app-header .identity-name")).toHaveText(
    "Matthew Moran",
  );
  await expect(page.locator(".intro-launcher img")).toHaveAttribute(
    "src",
    /profile.*\.webp/,
  );
  await expect(page.locator(".intro-launcher")).not.toContainText("Huugo film");
});

test("preview respects motion settings and can be paused without dismissal", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".intro-preview-video")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: /Dismiss video introduction/ }),
  ).toHaveCount(0);
  await expect(page.locator(".intro-launcher")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await expect(page.locator(".intro-preview-video")).toHaveAttribute(
    "loop",
    "",
  );
  await expect(page.locator(".intro-preview-video")).toHaveJSProperty(
    "muted",
    true,
  );
  const pause = page.getByRole("button", {
    name: "Pause video preview",
    exact: true,
  });
  await pause.press("Enter");
  await expect(page.locator(".intro-preview-video")).toHaveJSProperty(
    "paused",
    true,
  );
  await page
    .getByRole("button", { name: "Play A little about me", exact: true })
    .click();
  await expect(page.locator(".intro-preview-video")).toHaveJSProperty(
    "paused",
    true,
  );
  await expect(page.locator("#intro-video-player video")).toHaveJSProperty(
    "muted",
    false,
  );
});

test("preview resumes after minimising the compact introduction", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Play A little about me", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Minimise video introduction", exact: true })
    .click();
  await expect(page.locator(".intro-preview-video")).toHaveJSProperty(
    "muted",
    true,
  );
  await expect(page.locator(".intro-preview-video")).toHaveJSProperty(
    "paused",
    false,
  );
  await expect(page.locator(".intro-orb")).toHaveCSS("width", "108px");
});

test("compact player offers contact without duplicate copy or status", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/work/design-system-integration");
  await page
    .getByRole("button", { name: "Play A little about me", exact: true })
    .click();
  const panel = page.locator("#intro-video-player");
  await expect(
    panel.getByRole("link", { name: "Get in touch" }),
  ).toHaveAttribute("href", "/#contact");
  await expect(
    panel.locator(
      ".intro-player-status, .intro-player-copy, .intro-about-toggle",
    ),
  ).toHaveCount(0);
  await expect(panel).not.toHaveAttribute(
    "aria-describedby",
    "intro-video-description",
  );
  await expect(panel.locator("video")).toHaveAttribute("controls", "");
  await expect(panel.locator("track")).toHaveAttribute("kind", "captions");
});

test("video sits above case-study progress and alone on the homepage", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  await expect(page.locator(".case-progress")).toHaveCount(0);
  await page
    .getByRole("link", {
      name: "Read case study: Connecting Fruugo’s design system and code",
      exact: true,
    })
    .click();
  await expect
    .poll(async () => {
      const video = await page.locator(".intro-launcher").boundingBox();
      const progress = await page.locator(".case-progress").boundingBox();
      return !!video && !!progress && video.y + video.height < progress.y;
    })
    .toBe(true);
  await page
    .getByRole("button", { name: "Play A little about me", exact: true })
    .click();
  await expect(page.getByText("Read transcript", { exact: true })).toHaveCount(
    0,
  );
});

for (const route of ["/", "/work/design-system-integration"]) {
  test(`introduction contact link navigates and transfers focus from ${route}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(route);
    await page
      .getByRole("button", { name: "Play A little about me", exact: true })
      .click();
    await page
      .locator(".intro-player-header")
      .getByRole("link", { name: "Get in touch" })
      .click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.locator("#intro-video-player")).not.toBeVisible();
    await expect(page.locator("#contact")).toBeFocused();
    await expect(page.locator("#contact")).toBeInViewport();
  });
}

test("player surface preserves crop and alignment without moving the layout anchor", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/");
  await expect(page.locator(".intro-orb img")).toHaveCSS(
    "object-position",
    "50% 0%",
  );
  await page
    .getByRole("button", { name: "Play A little about me", exact: true })
    .click();
  await expect(page.locator(".intro-player-surface")).toBeVisible();
  await expect(page.locator(".intro-player-header")).toHaveCSS(
    "align-items",
    "flex-start",
  );
  await expect(page.locator("#intro-video-heading")).toHaveCSS(
    "margin-top",
    "0px",
  );
  await page
    .getByRole("button", { name: "Minimise video introduction", exact: true })
    .click();
  await expect(page.locator("#intro-video-player")).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Play A little about me", exact: true }),
  ).toBeFocused();
});
