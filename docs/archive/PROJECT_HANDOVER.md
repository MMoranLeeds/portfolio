# Historical delivery note

This file records an earlier incremental update. It is retained for reference, not as current setup or project-structure guidance. Start with [the documentation index](../README.md).

---

# Portfolio handover: mobile appearance and manager feedback

## Layout

One ThemeControl instance remains in AppHeader. At 1280px and above it floats fixed at the top-right; from 960px to 1279px it occupies the existing fixed utility bar. Below 960px its wrapper is static within the mobile header, so it scrolls away. Mobile fixed-bar padding and reserved anchor offsets are removed. Theme storage, system preference detection and before-paint bootstrap are unchanged.

AppHeader is a flex column. Desktop navigation grows to fill remaining height; the contact group follows at the bottom. The identity-focus span places the supporting line beneath the name and role on both desktop and mobile. Overflow scrolling handles shorter desktop viewports.

## Feedback

The reusable peer-review data list now includes four featured entries: Becky Lovell, Kieran Lynch, Ryan Duncan and Huw Evans. Becky remains the lead quotation, with a directly visible mentoring continuation and separate source attribution. Kieran and Ryan use alternative verbatim excerpts supplied by Matt. Huw’s excerpt is from the uploaded performance-review PDF; his name and manager relationship were explicitly supplied by Matt. No unspecified job titles, quantitative outcomes, personal leave details or reviewer links are added.

General endorsements have no project associations. Empty project-review lists still render no section. The homepage limit is four.

## Patch and checks

Apply this incremental ZIP after portfolio-fixed-appearance-feedback-update.zip. It contains only changed source, tests and documentation, plus a patch manifest. Case-study content, image assets, theme tokens and dependencies are unchanged.

TypeScript, lint, formatting, production build, static pages and Node theme/router/quote checks passed. ZIP integrity and patch reconstruction checked. Updated Playwright tests are included for local execution, but browser tests and Lighthouse were not run here. No visual QA or accessibility-conformance score is claimed.
