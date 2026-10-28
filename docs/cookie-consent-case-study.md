# Cookie consent at Fruugo

## Location and editing

The new page is `/work/fruugo-cookie-consent`, placed after Localisation and before Merchant onboarding. The registry drives the homepage, routes, next-study links, sitemap and Share Studio choices. Reading time is calculated from the current copy.

Edit the case study in `src/data/projects/fruugo-cookie-consent/index.ts`. Image handling is in the adjacent `images.ts`.

The copy focuses on discovery, design decisions, Legal collaboration, the country-based A/B test and worldwide rollout. Frontend implementation, QA and Data Science responsibilities are attributed separately from Matt's design ownership.

## Screenshots now included

The desktop and mobile before/after comparisons use Matthew's supplied screenshots. The old images are cropped to website viewport pixels only; browser tabs, address bars, bookmarks, device-emulation controls and outer black margins are excluded. No consent controls or wording have been reconstructed.

| Image       | Original file                                                  | Treatment                                                 |
| ----------- | -------------------------------------------------------------- | --------------------------------------------------------- |
| Old desktop | `src/assets/images/original/cookie-consent/desktop-before.png` | Viewport crop, 1932 × 962 pixels.                         |
| New desktop | `src/assets/images/original/cookie-consent/desktop-after.png`  | Supplied current production viewport, 2048 × 1181 pixels. |
| Old mobile  | `src/assets/images/original/cookie-consent/mobile-before.png`  | Phone viewport crop, 390 × 844 pixels.                    |
| New mobile  | `src/assets/images/original/cookie-consent/mobile-after.png`   | Supplied current production viewport, 942 × 2048 pixels.  |

The article comparisons preserve each viewport's proportions and show the full consent panel. Mobile comparison figures share the existing portrait preview and maximum width. The image viewer retains the full optimised screenshot, so small labels can be enlarged. The historical mobile source limits its available resolution; it has not been artificially upscaled.

The after captions identify these as current production captures after the rollout, rather than screenshots taken during the initial experiment. The old and new screenshots also show different surrounding page contexts.

The optional experiment image is still outstanding. Add a cropped results chart, labelled with dates, environment and country-group context, as `src/assets/images/original/cookie-consent/test-results.png`. Exclude internal URLs, identifying information and unrelated business figures. Optimise to replace that placeholder automatically.

## Cover, phone overlay and share image

The cover is now the current production desktop screenshot, cropped around the complete consent panel at **1200 × 500**, matching the shared **12:5** desktop presentation. Its source is `src/assets/images/original/cards/fruugo-cookie-consent.png`. All three actions are retained in the crop.

The phone overlay uses the current mobile screenshot at `src/assets/images/original/mobile/fruugo-cookie-consent.png`. It uses the same shared phone proportions, size and inset positioning as the other case studies. The case-study overlay opens in the shared image viewer.

Replace the named originals and run `npm run images:optimise` for future screenshot updates. The script also runs before development and production builds. Cookie-consent screenshots use the same higher-quality WebP settings as the other detailed interface captures.

The existing 1200 × 630 results-led share image remains `public/images/social/fruugo-cookie-consent.png`. The Share Studio automatically uses the new cover for subsequent image generation. Select the case-study template and this project to generate a replacement.

## How the evidence is presented

- The initial comparison is **66.3% versus 76.3%**, a **10-percentage-point difference**, on 18 March 2026.
- The **69.7%** pre-release snapshot is labelled as a different all-traffic period, rather than used as the experiment control.
- The **76-79%** range is the reported post-rollout reading in both production environments on 13 April 2026.
- The split was by country and production environment, not individual random assignment. The text acknowledges concurrent changes and limits to attribution.
- GTV is qualitative, following Data Science's final assessment. The preliminary, restricted 9% reading and the AI-generated revenue estimate are omitted.
- The page makes no statistical-significance, guaranteed-compliance or demonstrated-understanding claim. Advanced cookie information remains follow-on work, rather than a claimed completed release.
- Private Slack links, ticket links and employee messages are not included in the public page. The supplied MD brief remains the source material, rather than being copied into public assets.

## Apply and check

Apply this archive over the previous portfolio updates, preserving relative paths. No new package dependency is required.

```bash
npm run build
npm run test:static
node scripts/verify-case-reading.mjs
```

Before replacing a placeholder, inspect the screenshot for private information and ensure its dates and labels agree with the paragraph it supports.
