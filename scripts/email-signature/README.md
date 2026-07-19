# Email signature GIF

A compact remix of the landing page hero animation (document → AI extraction →
table) rendered as a looping GIF for email signatures.

## Output (committed to `public/`)

| File | Size | Use |
| --- | --- | --- |
| `public/email-signature.gif` | 460×150 | Dark theme (matches the site) — smallest file |
| `public/email-signature-2x.gif` | 920×300 | Dark, retina-crisp; display at 460px wide |
| `public/email-signature-still.png` | 920×300 | Dark static fallback of the completed state |
| `public/email-signature-light.gif` | 460×150 | Light theme — blends into white email backgrounds |
| `public/email-signature-light-2x.gif` | 920×300 | Light, retina-crisp; display at 460px wide |
| `public/email-signature-light-still.png` | 920×300 | Light static fallback of the completed state |

Preview either theme by opening `animation.html` (dark) or
`animation.html?theme=light` in a browser (animations are paused for capture —
run `window.__seek(<ms>)` in devtools, or temporarily remove the
`animation-play-state: paused` rule to watch it play).

Once deployed, the files are served from the site, e.g.
`https://tavnit.io/email-signature.gif`.

## Adding it to a signature

Most clients (Gmail, Apple Mail, Outlook settings) let you insert an image into
the signature editor — either upload the GIF or reference the hosted URL:

```html
<img src="https://tavnit.io/email-signature-2x.gif" width="460" height="150" alt="Tavnit — documents to structured data">
```

The GIF's first frame is the completed table ("Extraction complete"), so
clients that don't play GIFs (classic desktop Outlook) still show a finished
state rather than an empty table.

## Regenerating

```bash
cd scripts/email-signature
npm install
npm run generate            # writes the three files into public/
node generate.mjs --debug-frames   # also dumps per-frame PNGs into frames/
```

Requires a Chromium binary; set `CHROME_PATH` if it is not at the default
Playwright location.

`animation.html` is a standalone copy of the animation with every effect
expressed as a CSS keyframe on a fixed 4900ms timeline. All animations are
paused globally and `generate.mjs` seeks the timeline via the Web Animations
API, so frames are deterministic. The timeline is captured starting at the
"complete" hold so the first GIF frame is the finished state; frame delays are
variable (static holds are single long frames) to keep the file small.

`dmsans-latin.woff2` is DM Sans (the site's body font, SIL Open Font License),
embedded so text renders identically in headless Chromium.
