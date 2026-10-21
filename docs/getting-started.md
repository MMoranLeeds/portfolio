# Getting started

## Requirements

Use Node 22.18 or later within Node 22, or Node 24.12 or later, matching `package.json`.

```bash
npm ci
npm run dev
```

The portfolio does not need a backend or API key. Image optimisation runs before the development server starts.

## Production configuration

Set the production origin in Netlify's build environment, or create `.env.production` locally:

```dotenv
VITE_SITE_URL=https://mdmoran.netlify.app
```

The value must be an HTTP(S) origin without a path, credentials, query or hash. Without a public origin, the generated pages use `noindex` and the robots file disallows crawling. Keep test deployments out of search results.

Optional settings:

| Variable                   | Purpose                                                                                                   |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `VITE_GA_MEASUREMENT_ID`   | GA4 measurement ID. Analytics remains gated by consent and the configured production hostname.            |
| `VITE_ENABLE_SHARE_STUDIO` | Set to `true` only if intentionally including the studio route in production. This is not authentication. |

`VITE_` variables are included in browser-delivered code. Do not store secrets in them. See [analytics setup](ANALYTICS_SETUP.md) and [share studio](images-and-share-studio.md).

## Build and deploy

```bash
npm run build
npm run test:static
npm run preview
```

The build optimises images, checks TypeScript, creates client and temporary server bundles, and prerenders the homepage, CV and case studies into `dist/`. It also produces `404.html`, `sitemap.xml` and `robots.txt`. Vue hydrates the generated HTML for browser interactions and navigation. The temporary `.ssr/` directory is removed after successful rendering.

| Netlify setting   | Value                                       |
| ----------------- | ------------------------------------------- |
| Build command     | `npm run build`                             |
| Publish directory | `dist`                                      |
| Production origin | `VITE_SITE_URL=https://mdmoran.netlify.app` |

Deploy only `dist/`. There is no production Node server. The repository includes `public/_redirects` for Netlify missing-page handling. Other hosts need equivalent handling for generated routes and genuine 404 responses.

Changing a build environment variable requires a new build to update generated HTML. Preview the generated site and check direct case-study links before publishing.
