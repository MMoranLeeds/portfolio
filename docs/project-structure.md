# Project structure

## Main directories

| Path                 | Responsibility                                                                |
| -------------------- | ----------------------------------------------------------------------------- |
| `src/components/`    | Reusable interface components                                                 |
| `src/views/`         | Route-level layouts, including the shared case-study view                     |
| `src/composables/`   | Reusable Vue behaviour, such as dialogs, motion and floating controls         |
| `src/data/`          | Homepage, CV, testimonials, company history and shared audience references    |
| `src/data/projects/` | Ordered case-study registry and project-specific content                      |
| `src/config/`        | Site-wide profile, origin, analytics and default social-preview settings      |
| `src/types/`         | Shared TypeScript contracts                                                   |
| `src/utils/`         | Calculations and framework-independent helpers                                |
| `src/services/`      | Analytics integration                                                         |
| `src/seo/`           | Metadata generation for static HTML and browser navigation                    |
| `src/router/`        | Navigation, section synchronisation and scroll behaviour                      |
| `src/tools/`         | The optional share-image studio                                               |
| `src/assets/`        | Imported source images, generated image variants and styles                   |
| `public/`            | Files served directly, including social images, optimised videos and captions |
| `scripts/`           | Build, media-maintenance and verification tasks                               |
| `tests/`             | Playwright browser tests                                                      |
| `docs/`              | Current documentation and explicitly archived delivery notes                  |

The root README is the public introduction. Build and tool configuration files stay at the project root, where their tools expect them.

## Case studies

`src/data/projects/index.ts` is the only ordered registry. It drives homepage cards, project lookup, the next-case-study sequence, prerendered routes and sitemap entries.

Each case study has a directory named after its public slug:

| Directory                                       | Case study             |
| ----------------------------------------------- | ---------------------- |
| `src/data/projects/fruugo-localisation/`        | Localisation at Fruugo |
| `src/data/projects/fruugo-merchant-onboarding/` | Merchant onboarding    |
| `src/data/projects/huugo-from-fruugo/`          | Huugo from Fruugo      |
| `src/data/projects/accessible-trades/`          | Accessible Trades      |

Within each directory:

- **`index.ts`** exports one typed `Project` containing the story, summary, dates, status, SEO description, social-preview image, mobile-preview copy and optional video or card/header overrides.
- **`images.ts`** resolves that project's responsive article screenshots and their dimensions. Article captions and alternative text are supplied by the story where each image appears.

The complete contract is in `src/types/project.ts`.

### Project fields

| Field                                                            | Purpose                                                                                             |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `slug`, `title`, `category`, `summary`, `role`, `status`, `tags` | Identity and introductory content                                                                   |
| `overview`                                                       | Outcome summary, delivery period and optional launch date                                           |
| `seoDescription`, `socialPreview`                                | Search/share description and case-specific share image                                              |
| `cover`                                                          | Default header artwork and card background                                                          |
| `card`                                                           | Optional card alternative text and header overrides when reusing the card screenshot                |
| `mobile`                                                         | Portrait/mobile preview copy and SVG fallback                                                       |
| `video`                                                          | Optional video, insertion section, poster, explanatory text and manual caption/transcript overrides |
| `sections`, `sources`                                            | Article content and supporting references                                                           |

Do not add separate slug-keyed overview, video or social-image maps elsewhere. The view, reading calculation and metadata code read the same project object.

### Shared helpers and generated data

`src/data/projects/shared/` contains reusable card, cover and mobile image resolution. It does not hold individual case-study stories. Static asset globs retain Vite-compatible image URLs.

`src/data/projects/generated/videoTranscripts.ts` is generated by `npm run transcript:publish`. It deliberately remains separate from hand-edited stories. Its keys match MP4 basenames, and the player and reading calculation use its published transcript unless a project provides an explicit override.

Shared Fruugo audience references remain in `src/data/fruugoAudience.ts` because both the homepage and case studies use them. Testimonials likewise remain shared in `src/data/peerReviews.ts`.

## Adding a case study

1. Create `src/data/projects/<slug>/index.ts` and export a `Project`. Use an existing project as the shape reference, replacing its content and assets.
2. Use a unique lower-case, hyphen-separated slug and unique section IDs. Video `sectionId` must match a section in that project.
3. Add the project to `src/data/projects/index.ts` in the intended display order. The next-study link wraps from the last entry to the first.
4. Add source screenshots and any project-specific image helper. Optimise images before importing generated variants.
5. Add a 1200 × 630 social image to `public/images/social/` and configure `socialPreview` in the project. Other routes use `src/config/socialPreview.ts` as their default.
6. For a portrait preview, configure `mobile` and add `src/assets/images/original/mobile/<slug>.png`. The shared helper selects its optimised variants automatically, falling back to the configured SVG when absent.
7. For a distinct desktop card screenshot, add `src/assets/images/original/cards/<slug>.png`. Use `card.header` to reuse it for the article header; omit this option to retain the normal `cover`.
8. Build and run the relevant [checks](checks.md). No new Vue page or router entry is required.

For another transcribed film, also register its filename in `scripts/transcripts.mjs`, then follow the [transcript workflow](video-transcripts.md).
