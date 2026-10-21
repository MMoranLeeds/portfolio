# Images and share studio

## Source and generated images

Place imported source imagery in `src/assets/images/original/`. The optimiser also processes raster images from `public/images/` into responsive WebP variants and metadata in `src/assets/images/dist/`.

```bash
npm run images:optimise
npm run images:watch
```

Optimisation runs automatically before development, production builds and standalone type checks. Keep source images available so the generated output can be reproduced. Do not hand-edit generated variants or metadata.

| Image                         | Source location                                                       |
| ----------------------------- | --------------------------------------------------------------------- |
| Portrait                      | `src/assets/images/original/profile.*`                                |
| Case-study screenshots        | Project folders within `src/assets/images/original/`                  |
| Desktop card screenshots      | `src/assets/images/original/cards/<project-slug>.png`                 |
| Mobile/portrait previews      | `src/assets/images/original/mobile/<project-slug>.png`                |
| Social-preview PNG/JPEG files | `public/images/`, with case-specific files in `public/images/social/` |

The article data supplies captions, alternative text and presentation settings. The image helpers resolve generated URLs and dimensions. Keep illustrative artwork clearly described when it is used instead of an interface screenshot.

## Share-image studio

Run the development server and visit `/_studio/share-image` to create portfolio social previews, case-study previews and LinkedIn banners, with template-specific dimensions and PNG/JPEG export.

Defaults and selectable imagery live in `src/tools/share-image/config.ts`. Layout and rendering code live alongside it. The studio shares the application's visual foundations so generated graphics can follow branding changes.

Exporting downloads an image; it does not replace a deployed asset automatically. Save the chosen export into the appropriate `public/images/` location and rebuild. Case-study image URLs and alternative text are configured in each project's `socialPreview` field. The homepage and other routes use `src/config/socialPreview.ts` as their default.

The studio uses a separate dynamic import and its production route is disabled by default. Keep it local unless hosted access is deliberately configured. `VITE_ENABLE_SHARE_STUDIO=true` includes the production route, but a hidden URL and `noindex` are not authentication. Server-side access protection would need to be configured separately; this ZIP contains no hosted authentication service.
