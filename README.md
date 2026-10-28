# Matthew Moran | Product design & frontend development

My portfolio brings together research, product design, accessibility and frontend development, with case studies explaining the decisions behind the work and what changed as a result.

I designed and built the site with Vue 3 and TypeScript. This repository makes the frontend available to explore, including its reusable components, interaction logic, content structure and build tools.

**[View the portfolio](https://mdmoran.netlify.app/)** · **[View the CV](https://mdmoran.netlify.app/cv)** · **[Explore the source](https://github.com/MMoranLeeds/portfolio)**

## Approach

- **Reusable content and components.** One typed project registry feeds the cards, case-study view, next-study links and generated routes. Each case study keeps its story and presentation settings together.
- **Static HTML with client-side navigation.** The build prerenders readable pages and metadata; Vue hydrates them for browser interactions. Production hosting needs no Node server.
- **Shared visual foundations.** CSS tokens and common components keep the portfolio, print CV and share-image tool aligned.
- **Accessibility in implementation.** Native dialogs, keyboard focus handling, visible focus, motion preferences and video text alternatives are supported by interaction tests and accessibility scans.
- **Content-aware reading controls.** Reading estimates follow case-study content; progress and estimated time remaining update with scroll position.
- **Consent-gated analytics.** The optional Google Analytics tag loads after explicit visitor consent.

Vue and Vue Router are the only direct production dependencies. Build and maintenance tooling runs separately from the browser application.

## Run locally

Use Node 22.18 or later within Node 22, or Node 24.12 or later, matching `package.json`.

```bash
npm ci
npm run dev
```

The portfolio itself does not need a backend or API key.

## Documentation

All setup, architecture and maintenance guides are in [docs](docs/README.md).

- [Getting started and deployment](docs/getting-started.md)
- [Project structure and case-study content](docs/project-structure.md)
- [Checks and browser tests](docs/checks.md)
- [Images and share studio](docs/images-and-share-studio.md)
- [Video optimisation](docs/VIDEO_SETUP.md)
- [Captions and transcripts](docs/video-transcripts.md)
- [Analytics and consent](docs/ANALYTICS_SETUP.md)

For the changed-files structure update, follow [the migration instructions](docs/structure-update.md) before building.
