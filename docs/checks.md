# Checks

Run commands from the project root after `npm ci`.

| Command                                | Purpose                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `npm run lint`                         | ESLint, with warnings treated as failures                                                              |
| `npm run format:check`                 | Check formatting with Prettier                                                                         |
| `npm run type-check`                   | Check application and tooling TypeScript                                                               |
| `npm run build`                        | Optimise images, type-check and create production output                                               |
| `npm run check`                        | Run lint, formatting checks and the build                                                              |
| `npm run test:static`                  | Check generated HTML, metadata and assets after a build                                                |
| `npm run test:ui`                      | Run scripted theme, router and interface checks                                                        |
| `node scripts/verify-case-reading.mjs` | Check reading estimates, content changes, progress calculations and motion CSS after a build           |
| `node scripts/verify-analytics.mjs`    | Check analytics behaviour with a mocked Google tag after a build                                       |
| `node scripts/verify-share-studio.mjs` | Check studio route isolation and build metadata; pass `--enabled` when checking a studio-enabled build |
| `npm run test:e2e`                     | Run Playwright browser tests                                                                           |

`npm run check` does not include the separate static, UI or browser test commands.

## Browser tests

Install Chromium first:

```bash
npx playwright install chromium
npm run test:e2e
```

Playwright starts a development server automatically. To test an existing production build instead:

```bash
npm run build
TEST_PREVIEW=1 npm run test:e2e
```

The suite defines desktop and mobile projects. Coverage includes navigation, dialogs, focus restoration, themes, motion preferences, case studies and accessibility scans. The optional `PLAYWRIGHT_CHROMIUM_EXECUTABLE` environment variable can point to an existing Chromium executable.

Automated checks support manual keyboard, assistive-technology and responsive testing. They do not establish complete accessibility conformance on their own. Test analytics collection with the actual GA4 configuration after deployment; mocked checks do not send live events.
