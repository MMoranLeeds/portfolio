# Design-system card artwork

The homepage card uses `design-system-integration-card.svg`, an editable 1600 × 667 vector illustration. The Figma symbol, stylised Claude mark, framework-agnostic code symbol, connectors and text are separate SVG groups. This is a first-draft editorial illustration, not an official integration badge or a product screenshot. Review or replace the marks if needed.

The image communicates Figma, Claude with MCP, and code with updates in both directions. The article explains the prompted and reviewed workflow. There is no mobile mockup because the subject is a design and engineering workflow.

## Editing

Open the SVG in a vector editor, or edit its labelled groups in a text editor. Maintain the 1600 × 667 canvas and generous spacing so the symbols remain recognisable at card size.

After saving changes, run this from the portfolio root to update the raster original:

```sh
node --input-type=module <<'JS'
import sharp from "sharp";
await sharp("docs/artwork/design-system-integration-card.svg")
  .png()
  .toFile("src/assets/images/original/cards/design-system-integration.png");
JS
npm run images:optimise
```

The optimiser reads the PNG original and creates the responsive WebP files. It does not render the SVG automatically.

## Independent article imagery

The genuine connected-library screenshot is preserved at `src/assets/images/original/design-system-integration/overview.png`. The project image helper now uses this separate source for the case-study opening. Replacing the card artwork therefore does not replace the article screenshot.

Only this project selects `card.presentation: "artwork"`. That selects a fallback wallpaper while retaining the same screen frame, inset and sizing as the other cards. The article still displays the real connected-library evidence, and other projects keep their current card presentation.
