# NextRamble case study

The case study is available at `/work/nextramble`. It appears after Accessible Trades in the shared project registry. The existing route, reading-time, contents, progress, next-study and Share Studio code picks it up automatically.

## Edit the story

- `src/data/projects/nextramble/index.ts`: page copy, outcome summary, period, tags, external link and social metadata.
- `src/data/projects/nextramble/images.ts`: responsive image definitions and preview crops.
- `src/data/projects/index.ts`: homepage and next-study order.

The copy distinguishes desk research and creator-led iteration from participant research. It describes delivered capabilities without claiming adoption, time savings, accessibility certification or a confirmed project start date.

## Images

The images show the public live service on 28 October 2026. The desktop and mobile homepage screenshots were supplied by Matthew:

| Original                                                     | Use                                                      |
| ------------------------------------------------------------ | -------------------------------------------------------- |
| `src/assets/images/original/cards/nextramble.jpg`            | Homepage card and case-study opening image               |
| `src/assets/images/original/nextramble/route-comparison.jpg` | Homepage example comparing two illustrative routes       |
| `src/assets/images/original/nextramble/route-detail.jpg`     | Leeds area guide, with route facts and source disclosure |

The mobile original is `src/assets/images/original/mobile/nextramble.png`.

Replace originals under the same filenames, then run `npm run images:optimise`. The script also runs before development and production builds. Existing screenshots remain in place for the other projects.

The comparison image is explicitly labelled as an illustrative example. It does not depict real member voting. No signed-in member information is included.

The mobile screenshot uses the same shared device frame, overlay width and positioning as the other projects, on both the homepage card and case-study header. Its case-study preview opens in the existing image viewer. Desktop card media retains the shared 12:5 container; the phone frame retains the shared 390:844 aspect ratio. Images preserve their proportions and use the existing cropping rules.

The starting 1200 × 630 share image is `public/images/social/nextramble.png`. In the existing Share Studio, select the case-study template and NextRamble to generate a replacement using the current brand and image controls. Save it to that same path.

## Useful next evidence

A safe demonstration group could provide screenshots of the signed-in proposal, voting and confirmed-walk states. Add these when available, using demonstration content and labelling it accordingly. Before adding impact metrics, establish a baseline and measure actual group planning, repeat use or organiser effort.

## Checks

```bash
npm run build
npm run test:static
node scripts/verify-case-reading.mjs
npm run lint
```

No package dependencies were added for this case study. Copy the update archive into the existing project root, preserving its relative paths. It contains changed and new files, rather than a complete replacement project.
