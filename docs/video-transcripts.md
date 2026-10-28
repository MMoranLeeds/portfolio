# Case-study updates and local video transcripts

## How transcripts connect to the site

Video configuration belongs to each project's `video` field in
`src/data/projects/<slug>/index.ts`. The player and reading estimate share the
published registry in `src/data/projects/generated/videoTranscripts.ts`.

## What you need

- The portfolio project on your machine, with Node/npm already working.
- The current MP4s saved locally, with audio and timings matching the deployed films.
- Python 3.11 and FFmpeg for local speech recognition.
- Internet access for the initial Python package installation and model download.

Whisper runs locally, with no API key, subscription or per-minute service charge. Its dependencies and models can take significant disk space. Processing speed depends on your computer. This task uses the CPU for compatibility; it does not add Python, FFmpeg, model files or a transcription service to the portfolio bundle or Netlify build.

## 1. Check the maintenance commands

`transcript:generate` and `transcript:publish` are already configured in
`package.json`. Run commands from the portfolio root. No setup-script step is
needed for this version of the project.

Keep `.venv-transcripts/` and `.transcripts/` out of Git. They contain local tools
and unreviewed drafts rather than published assets.

## 2. Install the local tools once, on your Mac

If you use Homebrew, install Python and FFmpeg:

```bash
brew install python@3.11 ffmpeg
```

If FFmpeg is already installed for video optimisation, you can retain it. Verify the tools:

```bash
python3.11 --version
ffmpeg -version
```

Create a dedicated Python environment in the portfolio root, then install Whisper inside it:

```bash
python3.11 -m venv .venv-transcripts
.venv-transcripts/bin/python -m pip install --upgrade pip
.venv-transcripts/bin/python -m pip install openai-whisper
```

You do not need to activate the environment every time. The npm command finds its Python executable automatically. If package installation fails, check the error against the official Whisper installation guide, particularly FFmpeg and optional Rust requirements: https://github.com/openai/whisper#setup

Windows: use `py -3.11 -m venv .venv-transcripts`, then `.venv-transcripts\Scripts\python.exe -m pip install openai-whisper`; install FFmpeg separately and ensure it is on PATH. The Node task also recognises this environment layout.

## 3. Add the MP4s

Use the same names as the current players:

```text
src/assets/videos/original/huugo-promotion.mp4
src/assets/videos/original/accessible-trades-workflow.mp4
```

The task checks these original files first, then falls back to the corresponding files in `public/videos`. You can transcribe either, as long as the audio and timing match the deployed version. Video optimisation that only changes resolution/bitrate will normally preserve the timings. Trimming, speed changes or editing the soundtrack requires new captions.

## 4. Generate drafts

For Huugo:

```bash
npm run transcript:generate -- --project huugo-promotion
```

For Accessible Trades:

```bash
npm run transcript:generate -- --project accessible-trades-workflow
```

Or generate both in sequence:

```bash
npm run transcript:generate
```

The first run downloads the `small.en` model, which is cached outside the deployed website. Subsequent runs reuse it. For a faster, less accurate draft you can choose `--model base.en`; for a larger model use `--model medium.en` if your machine can accommodate it. These are English-language maintenance commands, not automatic translation.

Drafts appear here:

```text
.transcripts/huugo-promotion/captions.en.vtt
.transcripts/huugo-promotion/transcript.txt
.transcripts/huugo-promotion/source.json
```

Accessible Trades gets an equivalent folder. `source.json` records the original source file's hash; leave it intact. Publishing checks it to avoid attaching reviewed captions to a changed source video.

Drafts are ignored by Git and are outside the public directory. They do not appear on the website. Generating again replaces the drafts, so copy any reviewed versions you wish to retain before regenerating. It does not replace already published captions or transcripts.

## 5. Review the generated text

Open the `.vtt` and `.txt` files in your code editor and compare them with the film. Correct each file where necessary:

- Check Huugo, Fruugo, product names, punctuation and any misheard wording.
- Check the VTT timings against the spoken audio and split long captions into readable lines.
- Include speaker identification and meaningful sounds where these are needed to understand the content.
- Remove hallucinated speech during music or silence.
- Group the transcript into paragraphs, separated by a blank line.
- Add concise descriptions of important visual changes or on-screen text that the audio does not explain, so the written alternative makes sense independently.

A VTT file is plain text with a header and timed cues:

```vtt
WEBVTT

00:00:01.000 --> 00:00:04.000
Meet Huugo, Fruugo's AI shopping assistant.
```

This example explains the format; replace it with the actual narration and timing. Do not insert this sample into a real caption file unless it matches the film.

The browser's native CC control displays the VTT track. It does not generate captions itself. The separate TXT file becomes the expandable transcript beneath the video, and a downloadable text alternative. Keep both aligned after corrections. Meaningful visual information may also need audio description depending on what the narration already conveys; captions and a transcript alone should not be treated as a complete video accessibility audit.

### If the film contains music and visual steps, but no speech

Do not publish invented speech captions. A speech recognition model cannot reliably describe screen recordings. Add a descriptive transcript covering the important on-screen content.

You can skip generation entirely for such a film:

1. Create `.transcripts/accessible-trades-workflow/` in your editor.
2. Add a `transcript.txt` describing the demonstrated sequence in readable paragraphs.
3. Use the publish command below with `--captions no`.

A source manifest is optional for a manually prepared descriptive transcript. With music-only audio, include a short note such as “The video has background music and no spoken narration.” Only omit captions when there is no meaningful speech or other audio information that needs a text equivalent. A visual description should reflect the actual film, so it needs a review rather than being invented automatically.

## 6. Publish the reviewed alternatives

For a film with speech and checked captions:

```bash
npm run transcript:publish -- --project huugo-promotion --captions yes
```

For Accessible Trades with checked captions:

```bash
npm run transcript:publish -- --project accessible-trades-workflow --captions yes
```

For a visual demonstration without meaningful audio information:

```bash
npm run transcript:publish -- --project accessible-trades-workflow --captions no
```

Publishing is an explicit confirmation that you have reviewed the files. It checks the basic VTT structure, not caption accuracy or full WebVTT conformance. It then:

- Copies the approved text and, where chosen, VTT into `public/videos/captions/`.
- Updates `src/data/projects/generated/videoTranscripts.ts`, retaining the other film's published entry.
- Connects the files to the existing player automatically, using the MP4 filename.
- Makes the transcript available as readable HTML and a downloadable TXT file.
- Includes the published transcript in the case-study reading-time calculation.

No placeholder or empty caption track is added before publishing. Existing manually configured `captionsSrc` and non-empty `transcript` values in a project's `video` configuration take precedence; remove those overrides if you want the generated files to supply the content instead.

The registry is generated TypeScript with a marked, JSON-compatible data block. Its export has `prettier-ignore` to preserve machine readability. Change the reviewed draft files and rerun publish rather than hand-editing the generated registry. Keep `ProjectVideoTranscript`'s interface outside the marked data block.

## 7. Check locally, then commit

```bash
npm run dev
```

On both case studies, play the video and check:

- The browser's captions menu offers English when captions were published.
- Captions match the audio and are readable on desktop and mobile.
- “Read the video transcript” opens with keyboard and pointer input.
- The download link supplies the TXT file.
- Without published alternatives, there are no empty controls or missing-file requests.

Run the existing project checks, including `npm run type-check` and `npm run build`. Commit the project configuration, the generated registry and the approved files in `public/videos/captions/`. Do not commit `.venv-transcripts`, `.transcripts` or downloaded model weights.

Deploy through the usual GitHub/Netlify workflow when ready. Nothing runs automatically during production builds. For a changed film, repeat generate, review, publish and commit. If publishing reports a source change, regenerate from the current source rather than deleting the hash to bypass the check.

## Adding another film later

Add its filename to the `videos` object at the top of `scripts/transcripts.mjs`, then configure the player as usual. The registry keys must match MP4 basenames. Reuse the same generate/review/publish process. No route or component changes are needed.

## References

- Whisper setup and usage: https://github.com/openai/whisper
- HTML track element and WebVTT: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track
- W3C captions and automatic-caption review: https://www.w3.org/WAI/media/av/captions/
