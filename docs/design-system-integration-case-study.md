# Connecting Fruugo’s design system and code

The case study describes the active internal workflow connecting Fruugo’s maintained component library with Figma through Claude and MCP. Its period is 2026. It presents the integration as the next step in Matt’s design-system work since networx in 2013, with Sass-based frontend patterns, later Adobe XD component work, company-wide system ownership at Incommunities and continuing Fruugo library ownership. The early profile-card lab is no longer needed in the public narrative.

## Content and integration

- Route: `/work/design-system-integration`, unchanged to preserve links.
- Content: `src/data/projects/design-system-integration/index.ts`.
- Image helper: `src/data/projects/design-system-integration/images.ts`.
- Registry position: after Huugo, before Accessible Trades.
- The registry supplies cards, navigation, metadata, prerendering, reading time and share-studio options.

## Images now supplied

Source PNG paths below are relative to `src/assets/images/original/`. Run `npm run images:optimise` after future replacements. Keep only one original per filename stem.

| Original                                             | Content                                                                        | Native dimensions |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------- |
| `cards/design-system-integration.png`                | Supplied comparison of Chip variants in Figma and Storybook                    | 1600 × 667        |
| `design-system-integration/components.png`           | Chip properties, primary-fill binding, colour variable and source excerpts     | 1600 × 1000       |
| `design-system-integration/token-change.png`         | Calendar-day states, selected In range property and selection colours in Figma | 900 × 592         |
| `design-system-integration/claude-review.png`        | Actual instruction, MCP inspection statement and applied stylesheet edit       | 1150 × 621        |
| `design-system-integration/calendar-source-diff.png` | Before/after crops of the actual repository diff in VS Code                    | 780 × 348         |
| `design-system-integration/calendar-storybook.png`   | Rendered DateRangePicker with 11–21 November 2026 selected                     | 703 × 487         |
| `design-system-integration/code-update.png`          | Before/after FAB background colour source diff                                 | 780 × 452         |
| `design-system-integration/fab-storybook.png`        | Actual Storybook FAB before and after the colour change                        | 560 × 255         |
| `design-system-integration/fab-review.png`           | Instruction, comparison and variant scope before applying                      | 1150 × 1131       |
| `design-system-integration/fab-applied.png`          | Human approval, MCP action and completed Figma update                          | 1150 × 617        |
| `design-system-integration/fab-figma.png`            | Final Figma FAB component set                                                  | 691 × 291         |

The calendar sequence sits in the `figma-to-code` block. Its four figures use full-width presentation and explicit natural aspect ratios so important content remains visible. Do not turn them into a two-column grid or force a 4:3 crop. The shared image viewer retains full-size images. No source crop was enlarged to meet an arbitrary target size.

## Evidence and captions

The calendar sources supplied on 17 November 2026 are:

- `image(20261117-164428).png`: Figma state and colour properties.
- `image(20261117-164401).png`: Claude prompt, MCP inspection and applied edit.
- `image(20261117-164410).png`: actual VS Code repository diff.
- `image(20261117-164825).png`: rendered Storybook result.

These are deterministic crops and compositions of genuine screenshots. Headings outside the crops are editorial labels. Source pixels and code content are not generated or rewritten. Model-switch messages, unrelated commit history, terminal warnings and empty canvas have been excluded.

The repository diff changes the text colour for `--in-range` and `--in-selecting-range` from `colors.$fruugo-blue-secondary` to `colors.$fruugo-black`, keeping `colors.$pastel-blue` as the background. The Storybook image shows the current implementation, including dark intermediate-day text and distinct range endpoints. The article describes the local design-to-implementation example, not a production release or complete accessibility audit. The supplied terminal’s test claims have not been independently rerun. Contrast has now been independently recalculated from the supplied opaque sRGB colours: #007CBB on #D4E3F1 is 3.490220:1 and #212529 on #D4E3F1 is 11.795392:1. Public copy displays 3.49:1 and 11.80:1. The first pairing fails the normal-text AA threshold of 4.5:1 and AAA threshold of 7:1; the second exceeds both. These are text-contrast findings only, not complete component compliance. The supplied WebAIM permalinks reverse foreground and background, which does not change the contrast ratio. The URLs are retained as supplied; the article correctly identifies dark text on pale blue. The retrieval service could not open those dynamic checker URLs, so the values were calculated locally using the WCAG relative-luminance formula, with criteria checked against W3C.

The earlier capture package supplies the overview and Chip mapping image. Its code panels are source excerpts rendered from repository text, not editor screenshots. The primary-fill binding is to a primitive. The article does not claim that this Chip property routes through a semantic alias, that every property is tokenised, or that the comparison establishes pixel parity.

Captions explain the design decision and outcome, without discussing cropping or addressing the portfolio author. Alt text describes actual content rather than placeholders for the supplied figures.

## Completed code-to-Figma example

The FAB sequence sits in the `code-to-figma` block. The primary FAB default background changes from `fruugo-blue` (#24A9FC) to `fruugo-blue-secondary` (#007CBB) in source, then in Figma following explicit review. The white icon is retained. Hover intentionally shares the default background colour, with its stronger shadow retained. The secondary variants are unchanged.

Sources supplied on 17 November 2026:

- `image(20261117-170410).png`: actual VS Code SCSS diff.
- `image(20261117-170454).png`: before source, not needed in the final figures because the diff includes it.
- `image(20261117-170521).png`: Storybook before.
- `image(20261117-170530).png`: Storybook after.
- `image(20261117-170806).png`: instruction and comparison before applying.
- `image(20261117-170909).png`: approval, MCP action and completed update.
- `image(20261117-170912).png`: final Figma set.

The figures combine genuine screenshot crops, with editorial headings outside the source content. Unrelated repository history, terminal output, model-switch notices and empty canvas are excluded. The Figma inspector selected an unrelated Button, so only the FAB set is used from that capture. No screenshot evidence has been invented or retouched. The source diff and Storybook pair establish the implementation change, the Claude figures show review and action, and the final Figma set shows the destination.

The five figures use natural aspect ratios. The Storybook comparison is limited to 35rem to avoid enlarging the small native component captures unnecessarily. The full-size viewer remains available. Do not claim a complete accessibility assessment, passing CI, a production release or automated continuous synchronisation from this evidence.

## Reverted Chip experiment

Matt confirmed the entire Chip token-binding experiment was reverted. The article records the mismatch between hard-coded component values and unavailable tokens as a review finding, with no experiment changes retained. Existing Chip overview and primary-fill mapping images illustrate the established library, not the reverted experiment or a completed token-coverage improvement.

## Removed content

The separate interactive prototype section and image reference have been removed, alongside unsupported prototype-specific summary, card, SEO, rationale and outcome claims. Matt’s subsequent clarification adds only the actual availability of rapid-prototyping experimentation to Frontend colleagues using their Figma access. The homepage description now focuses on maintaining shared components. General prototyping experience elsewhere in the portfolio is unchanged. The unused historical `interaction-guidance` asset is not rendered; no replacement screenshot is requested.

## Optional remaining asset

`public/images/social/design-system-integration.png` remains the existing 1200 × 630 social-preview placeholder. It is separate from the completed case-study evidence and can be replaced independently.

## Integration scope

Figma source reference:

https://www.figma.com/design/gVOnskNP5BkLH6AsJP9jw8/React-design-system?node-id=0-1

The integration is prompted and agent-assisted. Bidirectional capability was confirmed by Matt; the completed calendar sequence illustrates Figma to code and the FAB sequence illustrates code to Figma, including a proposal and explicit approval before the Figma write. It should not be described as unattended continuous synchronisation. The capture report distinguishes the repository’s read-only MCP manifest service from Claude’s Figma connection; the article should not imply that the read-only server itself performs Figma writes.

Availability does not imply universal token coverage, organisation-wide adoption, measured productivity gains or automatic production release. Keep developer review and human decisions central. Avoid publishing unrelated internal information or credentials in future captures.

## Local review

1. Apply the changed files to the portfolio root.
2. Run `npm run dev` and open `/work/design-system-integration`.
3. Inspect the header, component mapping, five FAB figures and four calendar figures, including their full-size views.
4. For future image replacements, update alt text/captions and run `npm run images:optimise`.
5. Run `npm run build` and `npm run test:static` before deployment.

## Leadership, adoption and outcomes clarification, 17 November 2026

Matt confirmed that Design and Frontend have access to the integration and that Frontend colleagues have been encouraged to experiment with rapid prototyping. The page distinguishes this availability from established team-wide adoption. It does not invent user counts, component coverage counts, time savings or business metrics. Completed updates, access to the connected library and the independently calculated calendar contrast improvement provide concrete outcomes.

Localisation history reflects Matt’s stated practice: translated string variables were used for design content before the move to on-demand Figma AI translation in design exploration. This is not presented as a replacement for production localisation, human language review or a proven localisation capability of every component.

## Existing governance described on the public page

- Figma-to-code changes follow the existing internal commit and code-review process before production.
- Code-to-Figma proposals receive human review before applying.
- Publishing the Figma library includes a message explaining the reason for the update.
- The FAB example demonstrates a specific proposal and approval. The page does not claim native incoming-change review or unattended automatic synchronisation.
- The complete Chip experiment was reverted, with no binding changes retained.

## Recommended workflow refinements, not claims of existing practice

A publishing message communicates a change; it does not replace reviewing the proposed change before applying or publishing it. Keep both steps distinct.

For future shared-component changes, use a compact record:

1. **Scope and owner:** identify the component, variants or tokens, affected consumers and who reviews the design intent. Link the source commit or PR and corresponding Figma node.
2. **Proposal before mutation:** ask the agent to inspect and report the intended changes, leaving the destination unchanged until reviewed. For broad edits, first use an isolated working copy or the team’s supported branch workflow.
3. **Review and verification:** inspect the diff and relevant rendered states, including focus, hover, disabled and error states where affected. Check variables remain bound, component instances remain connected and other variants are not unintentionally modified. Include language and responsive checks when the change affects content or layout.
4. **Publish and recovery:** include reason, affected components, source reference, validation and any consumer action in the publishing message. Retain a recoverable version and decide how a Figma rollback and code rollback would be kept aligned.

Suggested publishing message structure:

- Component and variants
- Reason and linked source change
- Behaviour or visual change
- Validation performed
- Action required by consumers, or no action required
- Reviewer

These refinements can be adopted within the existing process. They are not represented as completed organisation-wide governance in the public case study.

## Final editorial refinements

- The case study alone uses the overview labels Problem and My approach, supplied through optional labels in the shared overview model. Other studies retain their labels, and reading-time calculations use the displayed labels.
- Localisation leads with the need to accommodate translated content. On-demand translation is described as a design-exploration choice, separate from production localisation.
- The Chip audit’s retained outcome is the gap list, not retained changes or a completed token-resolution programme.
- Next steps describe joint token decisions, a clearer contribution route and adoption feedback as future work.
- The calendar sequence now starts with 1. No new screenshots or asset changes are needed.
- The public copy does not adopt the review brief’s unverified exact country/language counts or equate eight named categories with a verified integration count.
- The Adobe XD aside is removed to keep the history concise. Sass at networx still establishes work since 2013.

## Homepage illustration

The homepage uses a dedicated Figma, Claude/MCP and code illustration, with two-way connectors. The editable source and rendering instructions are in `docs/artwork/`. The card original keeps the existing `cards/design-system-integration.png` path, while the genuine article screenshot has been preserved independently as `design-system-integration/overview.png`. The article opening and its caption remain evidence of the actual connected component library.

The card uses the optional artwork presentation to select a fallback wallpaper. The illustration sits inside the shared desktop screen frame, with the same inset, border, shadow and sizing as the other cards. No phone mockup is added. The SVG is a first-draft editorial illustration with replaceable marks, not an official partnership or integration badge.

## Homepage outcome and discovery polish

The design-system card now includes the calendar text-contrast result alongside the connection made available to Design and Frontend. Section 04 includes a direct case-study link through the existing section-link pattern. The FAB sequence is numbered 1–5; the calendar remains 1–4. Localisation copy uses the portfolio’s established 40+ countries figure.

The onboarding card now leads with the 10-minute design target and the 12-month average Hotjar session duration of 10m 04s. It explicitly distinguishes session duration from application completion time. The fastest observed completed application remains supporting evidence inside that case study.

The Huugo card leads with the Netherlands marketplace launch and initial assistant adoption. The case study retains the standalone proof-of-concept GTV-to-model-spend ratio in its original reporting context, separate from marketplace findings.

This update does not change the project registry or overwrite the locally chosen card order. Country figures, card copy and cross-links can be applied independently of ordering changes.
