# Case-study videos

The Huugo launch film and Accessible Trades product-video example each appear
in **Delivery and outcomes** in their respective case studies. The homepage
links directly to the Accessible Trades video at
`/work/accessible-trades#ai-video-workflow`.
The source and optimised MP4s are maintained separately from the player configuration.

## Add and optimise the original

1. Install FFmpeg on your computer (macOS: `brew install ffmpeg`).
2. Save each original in `src/assets/videos/original/` using the filename below.
3. Run `node scripts/optimise-videos.mjs` from the project root.
4. Review the generated MP4 in `public/videos/`, then build and deploy normally.

| Case study        | Original filename                | Generated public URL                     |
| ----------------- | -------------------------------- | ---------------------------------------- |
| Huugo             | `huugo-promotion.mp4`            | `/videos/huugo-promotion.mp4`            |
| Accessible Trades | `accessible-trades-workflow.mp4` | `/videos/accessible-trades-workflow.mp4` |

The script processes all MP4s in the originals folder. For Accessible Trades,
add `src/assets/videos/original/accessible-trades-workflow.mp4` and run the same
command. There is no need to change or duplicate the optimiser.

Only the optimised file in `public/videos/` is deployed. The original stays in
`src/assets/videos/original/` and is not imported into the app. Do not store the
original in `public/`. The command is optional and separate from the existing
Sharp image optimiser, so Netlify does not need FFmpeg to build the site. Commit
or otherwise supply the generated public MP4 before deploying. No new npm
dependency or package-lock change is required.

You may instead copy an already optimised MP4 directly to
`public/videos/huugo-promotion.mp4`. For a separately hosted file, change `src`
in the relevant project’s `video` field in `src/data/projects/<slug>/index.ts` to its HTTPS URL.

## Compression choices

The script encodes H.264 video with AAC audio, CRF 25, a slow encoding preset,
YUV420p output, a maximum dimension of 1280 pixels and MP4 fast-start metadata.
It retains aspect ratio, avoids enlargement and accepts videos without audio.
Lower CRF retains more detail with larger files; higher CRF usually compresses
further. Try `node scripts/optimise-videos.mjs 23` if interface text loses clarity,
or `node scripts/optimise-videos.mjs 28` for a smaller version to compare.

It prints original/output sizes and never overwrites the original. A failed
encode leaves the previous public MP4 intact. Output may be larger if the
source is already efficient; always compare the result. Avoid repeatedly
encoding an already compressed output. Use the original as input each time.
Compression savings depend on source duration, codec, motion and resolution.
Compare visual quality and file size before publishing.

For example, a 4 MB result watched in full 1,000 times is approximately 4 GB of
video transfer, excluding other assets and repeat requests. Compression reduces
bytes per playback; it does not remove hosting bandwidth usage. For substantially
more traffic, a separate video host can keep those bytes off the portfolio host.

## Playback and accessibility

The initial page contains a lightweight poster and a real Play button. The MP4
is not attached to a media element until the visitor activates that button.
The native player uses controls, inline playback and `preload="none"`, with no
autoplay or looping. Navigating away stops playback. A direct MP4 link remains
available, including without JavaScript; missing/unsupported media has an error
message. The posters use existing case-study artwork, not frames extracted from the films.

Configure title, caption, explanatory paragraphs, play-button label, poster,
dimensions and source in the relevant project's `video` field in
`src/data/projects/<slug>/index.ts`. Set width/height to the actual aspect ratio.

Follow [video transcripts](video-transcripts.md) to generate, review and publish
captions and readable transcripts. Published files live in `public/videos/captions/`
and their generated registry lives in `src/data/projects/generated/videoTranscripts.ts`.
The player connects entries by MP4 basename. Optional `captionsSrc` and non-empty
`transcript` fields on the project's video override the generated alternatives.

Captions should include speech and meaningful audio information. Provide a
checked visual description where important on-screen information is not conveyed
by the soundtrack. The case-study reading estimate counts configured and
published text, not the film's playback duration.

## Check before publishing

- Inspect fine text, character details and audio after compression.
- In DevTools Network, confirm no MP4 request occurs before Play.
- Test keyboard Play, native controls, captions and opening the direct MP4 link.
- Test mobile inline/fullscreen playback, navigating away and missing-file behaviour.
- Verify the public MP4 URL serves video/mp4, not the SPA fallback HTML.

References: https://ffmpeg.org/ffmpeg-codecs.html,
https://ffmpeg.org/ffmpeg-formats.html,
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video
