# Video introduction preview

Apply this update after the Meet Matt refinements, copying these changed files into the matching folders in your existing portfolio. No new packages or video files are required. The preview reuses the existing Huugo film, captions. Matt's profile photo remains in the navigation without the old about modal. It is also the fallback image and full-player poster. The bubble can show a muted looping preview.

## What to try

- Use the squircle launcher on the right, or the Watch my introduction link in the homepage introduction or a case-study header.
- On wide screens, the player expands in the spare right gutter. Where space is limited, it opens as a modal. Below 960px the inline link replaces the bubble.
- The bubble preview loops silently when full motion is allowed, while the introduction is minimised. A single pause/resume control sits at the top-right on hover or keyboard focus, and remains visible on touch devices. There is no dismissal control or stored dismissal state. The inline link also opens the player. Minimise pauses the expanded player and retains its playback position. The muted loop resumes after minimising, unless the user paused it or reduced motion is selected.
- The video sits alone on the homepage and above case-study progress on case studies. Back-to-top has been removed from both page types. Both controls avoid the cookie banner. Opening another dialog pauses and closes it. Playing another video pauses this one. Hiding the tab pauses playback.
- Reduced motion displays the photo instead of a loop. Data-saving connections also skip the preview. Background tabs, other active media and other dialogs pause or suppress it. Autoplay rejection or a load error falls back to the photo.
- The full player starts after a click, with audio available. Captions and native media controls are available, with a compact Get in touch link to the homepage contact section below the video. Escape closes the player and returns focus. Motion preferences and print styles are respected.

This is an in-page floating player, rather than the browser's operating-system Picture-in-Picture window.

## Replace the preview with your introduction

Edit `src/config/introVideo.ts`:

1. Put the recording in `public/videos/` and update `src`, for example `/videos/matt-introduction.mp4`.
2. Import a poster image and replace `poster`. Use your face for a recognisable square crop.
3. Set the recording's actual `width` and `height`. `frameAspectRatio` controls the portrait presentation separately and defaults to `"9 / 16"`. The landscape preview is letterboxed, preserving its complete picture until you replace it with a portrait recording.
4. Add reviewed WebVTT captions in `public/videos/captions/` and update `captionsSrc`.
5. The old `aboutSummary` and `aboutDetails` configuration fields are no longer rendered.
6. Keep or change `title` and `launcherLabel`, currently "Meet Matt" and "Watch my introduction" respectively. The floating launcher remains video-only.

Set `enabled: false` to remove both the player and inline launch links.

## Layout and introduction copy

The floating launcher is a 112px video-only squircle, aligned to the right edge of the case-study progress chip underneath. It uses `corner-shape: squircle` with a 50% radius where supported, and a 28% rounded-corner fallback otherwise. The launch button retains an accessible name and a small play indicator. Below 960px, an inline launch link is retained.

Progress anchors below the video and avoids cookie controls. The player reserves vertical room for Preferences, reduces media height on shorter screens and uses a modal if the gutter cannot accommodate it. The header remains visible while the panel scrolls.

The expanded panel now shows only its heading, native video controls and a Get in touch link to `/#contact`. Following this link pauses and minimises the player, navigates home when needed, and moves focus to the contact section, which offers email, phone, LinkedIn and CV links. The duplicated playback status, introduction paragraphs and Read more toggle have been removed. The video can use more of the available vertical space while still respecting the viewport.

This patch does not overwrite `src/config/introVideo.ts`, your recording or your build optimisation pipeline. Keep your locally configured recording, poster, dimensions and “A little about me” heading. Reviewed caption assets are resolved from the published transcript registry by MP4 filename, taking precedence over a stale placeholder caption URL. The `meet-matt` entry uses `/videos/captions/meet-matt.en.vtt`. Keep the recording filename as `meet-matt.mp4`, or update its registry key to match.

## Accessibility and recording

The preview is decorative and hidden from assistive technology; the labelled launch button opens the full video with captions. Pause/resume controls are keyboard accessible, are not hover-only and have visible focus. The moving preview is optional, so motion preferences are respected before creating it. Review your eventual recording and captions, avoid flashing effects, and narrate any essential visual-only information.

## Validation

TypeScript checks, client and SSR builds, prerendering, static route checks and existing UI checks were run. Interactive browser checks covered playback, position retention, minimisation/reopening, keyboard focus, narrow-screen modal behaviour and desktop spacing with progress controls.

`tests/intro-video.spec.ts` adds browser regression scenarios for your normal Playwright workflow. These additional specifications were not run through the command-line runner in this environment; the interactive checks above were performed in the browser.

Three stale navigation expectations in `scripts/verify-static.mjs` were updated to match the existing eight-card order, including the Android study as the last card, in the earlier update. Those unchanged files are not repeated in this patch.

## Regenerate the personal introduction captions

The existing instructions are in `docs/video-transcripts.md`. The `meet-matt` recording is now registered in `scripts/transcripts.mjs`:

```bash
npm run transcript:generate -- --project meet-matt
# Review .transcripts/meet-matt/transcript.txt and captions.en.vtt against the recording.
npm run transcript:publish -- --project meet-matt --captions yes
```

Use the MP4 whose timing matches the deployed video. Generation uses the local Whisper installation described in the guide, outside the Node build. Publishing writes the TXT, timed WebVTT and registry entry. The compact introduction player uses the captions without rendering duplicate prose or a transcript disclosure. Its heading, recording, poster and dimensions remain controlled by your existing local config.

## Caption and completion-layer update

The supplied 34.3-second audio was transcribed locally with Whisper (`small.en`), then split into short timed cues. British English spelling and capitalisation were adjusted without rewriting the spoken wording, including “everyday shopping needs”, “helping them find the confidence that they need” and the closing “Thank you”. Spot-check synchronisation against the final deployed MP4, particularly if its beginning or end has been trimmed. No audio processing or video compression settings were changed.

The case-study progress stacking context is now above the introduction launcher and floating player, so completion confetti remains visible as it crosses the video. Its reduced-motion behaviour and non-interactive particles are retained.

## Bubble-to-player transition

Opening on desktop measures the bubble once and grows the inner player surface from that rectangle over 300ms. Minimise reverses it over 220ms. The heading and contact controls fade during the transition. The outer dialog keeps its final layout size, so floating-control collision detection never reads an animated rectangle. Only transform and opacity are animated, with no per-frame JavaScript, dimension animation, cloned video, canvas snapshot or extra dependency. Some compositing work is still required; this is not a guarantee of identical performance on all hardware.

Reduced motion, data saving and missing Web Animations support show the final state immediately. Narrow-screen modal openings use a short fade/scale rather than moving across the page. Resize, hidden tabs, unmounting, contact navigation and preference changes cancel or settle active animations. Keyboard focus remains on the real controls throughout.

The bubble image and preview keep `object-position: top center`. The heading has zero margin and the header aligns its children centrally. The recording configuration is not included in this patch, preserving the locally configured “A little about me” title and video.
