# Historical delivery note

This file records an earlier incremental update. It is retained for reference, not as current setup or project-structure guidance. Start with [the documentation index](../README.md).

---

# Native case-study image lightbox

Apply after `portfolio-responsive-webp-update.zip`. This is a changed-files patch, with no dependencies, deletions, image replacements or environment changes.

## Changes

- Every case-study figure uses one shared native dialog, including covers, screenshots and diagrams.
- Images open centred over a dark translucent, blurred backdrop, with a visible top-right Close control.
- Escape, Close and clicks outside the image/content dismiss the viewer. Gestures starting inside the image do not accidentally close it when released outside.
- The close button receives focus on opening; focus returns to the image trigger after dismissal. Native modal operation contains focus and makes the background inert. Navigation restores scrolling.
- The enlarged image is only inserted when requested. Full-size WebP URLs and SVG diagrams are reused; inline image loading and responsive sizing are unchanged.
- Static pages retain ordinary full-size image links when JavaScript or dialog support is unavailable.
- Image-load errors are announced and the close control remains available.

## Verification

TypeScript, lint, changed-file formatting, production build, all five static routes and Node theme/router/quote checks passed. Static checks confirm one initially closed dialog per case study, no enlarged image before interaction and fallback links. A browser regression file covers focus, dismissal, SVG/screenshots, mobile sizing, both themes and navigation; run it locally. Browser tests and Lighthouse were not run here, so retention of a score of 100 must be confirmed on the deployed build.
