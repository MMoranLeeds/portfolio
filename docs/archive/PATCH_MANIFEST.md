# Historical delivery note

This file records an earlier incremental update. It is retained for reference, not as current setup or project-structure guidance. Start with [the documentation index](../README.md).

---

```text
Native Preferences dialog and motion settings

Apply over the current portfolio after previous updates, retaining file paths, then run npm run build and redeploy. No new dependencies, image replacements or case-study content files are included.

The existing ThemeControl.vue now opens a native Preferences dialog. Colour theme: System preference / Light / Dark. Interface motion: System preference / Reduced motion / Full motion. Both default to System, apply before first paint, follow device changes in System mode and persist independently. Selecting a value applies it immediately while keeping the dialog open. Done, Close, Escape or a backdrop click dismiss it with focus return and scroll restoration. The existing desktop and mobile trigger positions are preserved.

Reduced motion disables CSS animations, transitions and smooth scrolling. CSS handles device preferences without JavaScript too. Reduced-transparency media support progressively replaces dialog blur with an opaque backdrop; forced-colours palettes remain respected. No additional contrast control is included.

Passed: type-check/build, lint, changed-file formatting, static routes and non-browser preference/bootstrap tests. Browser tests updated and discovered but not executed; Lighthouse not run.

Changed/new files:
README.md
public/theme-init.js
scripts/verify-static.mjs
scripts/verify-ui.mjs
src/assets/main.css
src/assets/styles/base.css
src/assets/styles/preferences.css
src/assets/styles/projects.css
src/components/app/AppHeader.css
src/components/app/AppHeader.vue
src/components/app/ThemeControl.vue
src/composables/useMotion.ts
tests/fixed-appearance.spec.ts
tests/peer-reviews-appearance.spec.ts
tests/preferences-motion.spec.ts
tests/theme-and-sections.spec.ts

```
