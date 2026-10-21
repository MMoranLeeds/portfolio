# Applying the project-structure update

This is a changed-files patch for `portfolio(7).zip`. It contains additions and replacements, not a complete application. Existing assets, dependencies, lockfile and deployment settings are retained.

## Apply locally

1. Commit or back up the current project.
2. Copy this ZIP's contents into the project root, preserving paths and replacing matching files. Do not replace the whole project with this patch.
3. Preview the old files that can be removed:

   ```bash
   node scripts/apply-structure-cleanup.mjs
   ```

4. Apply the cleanup:

   ```bash
   node scripts/apply-structure-cleanup.mjs --apply
   ```

5. Run the checks:

   ```bash
   npm run lint
   npm run build
   npm run test:static
   npm run test:ui
   node scripts/verify-case-reading.mjs
   ```

6. Review `git status` and the diff, including the old paths being deleted and new paths being added. Use `git add -A` when ready to stage both sides of the moves. Commit and deploy through the usual GitHub/Netlify workflow.

No dependency change is required. A clean checkout still needs `npm ci` before running checks.

## Safe deletion

An ordinary ZIP cannot remove the old paths when copied over an existing project. `docs/structure-migration.json` lists the obsolete files and their replacements.

The cleanup task checks every replacement exists and compares every old file against its SHA-256 fingerprint from the supplied ZIP before deleting anything. It defaults to a dry run, removes only the explicit files in the manifest and can be rerun safely. It does not remove directories or media assets.

If any old file has changed locally, the task stops before deleting files. Compare that file with its replacements, transfer any needed edits, and manually remove the old file after review. Do not overwrite newer project content merely to make its fingerprint match. The task checks that replacements exist, not that later local edits have been transferred.

Imports explicitly target the new project registry, so leaving an old `src/data/projects.ts` temporarily in place cannot silently redirect the application to the stale registry. Complete cleanup nevertheless to avoid duplicate sources of truth.

## What moved

| Before                                                           | After                                             |
| ---------------------------------------------------------------- | ------------------------------------------------- |
| Large Accessible Trades definition inside `src/data/projects.ts` | `src/data/projects/accessible-trades/index.ts`    |
| Other `*Project.ts` story files in `src/data/`                   | Their case-study folders in `src/data/projects/`  |
| Separate overview and video maps                                 | `overview` and `video` fields in each project     |
| Per-case social previews in global configuration                 | Each project's `socialPreview` field              |
| Slug-specific mobile metadata in the shared resolver             | Each project's `mobile` field                     |
| Image helper files in `src/data/`                                | `images.ts` beside each case study                |
| Global project image resolvers                                   | `src/data/projects/shared/`                       |
| Published transcript registry in `src/data/`                     | `src/data/projects/generated/videoTranscripts.ts` |
| Handover, update notes and patch manifest at the root            | `docs/archive/`, explicitly marked historical     |

The root README introduces the portfolio and links to the maintained guides in `docs/`. Shared audience data, testimonials and homepage content remain shared rather than being copied into individual projects.

## Verification for this update

- Lint and TypeScript checks passed, and the production build generated all seven routes.
- Before and after the data refactor, all seven routes produced identical rendered HTML and metadata.
- Static output, theme/router UI checks, case-study reading checks, mocked analytics checks and default-build studio isolation checks passed.
- Transcript publishing was exercised in an isolated fixture at its new registry path, preserving both film entries.
- Cleanup was exercised in an isolated fixture: dry run, refusal on local edits, removal of all 17 obsolete paths and safe rerun.
- Documentation links were checked. No runtime dependency changes were made.

Some existing verification assertions still described earlier page content. These were updated for the current 404 heading, testimonials anchor, public audience figures, rollout wording and outcome summary. The studio check no longer imports a missing, retired Netlify authentication module.

The Playwright browser suite was not run because the Chromium download was unavailable in this environment. Run `npm run test:e2e` locally for browser coverage.
