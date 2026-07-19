// Renders animation.html frame by frame in headless Chromium and encodes
// looping GIFs for the email signature, plus a static PNG fallback.
//
// Usage: node generate.mjs [--debug-frames]
// Env:   CHROME_PATH  path to a Chromium binary (defaults to Playwright's install)

import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import * as gifencModule from "gifenc";

const { GIFEncoder, quantize, applyPalette } = gifencModule.GIFEncoder
  ? gifencModule
  : gifencModule.default;

const DIR = import.meta.dirname;
const OUT_DIR = path.resolve(DIR, "../../public");
const HTML = path.join(DIR, "animation.html");
const CHROME =
  process.env.CHROME_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const WIDTH = 460;
const HEIGHT = 150;
const FPS = 20;
const STEP = 1000 / FPS;

// The GIF starts at the "extraction complete" hold so email clients that only
// show the first frame (e.g. classic Outlook) display the finished state.
const SEGMENTS = [
  { at: 3600, hold: 1300 }, // complete-state hold (first frame)
  { at: 0, hold: 500 }, // initial still
  { from: 500, to: 800 }, // scan border + "AI Processing" fade in
  { at: 800, hold: 400 }, // scanning hold
  { from: 1200, to: 3050 }, // particles fly, table fills, arrow bounces
  { at: 3050, hold: 250 }, // filled-table hold
  { from: 3300, to: 3600 }, // banner fade in
];

function planFrames() {
  const frames = [];
  for (const seg of SEGMENTS) {
    if (seg.hold !== undefined) {
      frames.push({ t: seg.at, delay: seg.hold });
    } else {
      for (let t = seg.from; t < seg.to; t += STEP) {
        frames.push({ t, delay: STEP });
      }
    }
  }
  return frames;
}

async function captureFrames(browser, scale, frames, debugDir) {
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: scale,
  });
  const page = await context.newPage();
  await page.goto("file://" + HTML);
  await page.waitForFunction(() => window.__ready === true);

  const captured = [];
  for (const [i, frame] of frames.entries()) {
    await page.evaluate((t) => window.__seek(t), frame.t);
    const buf = await page.screenshot({
      clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT },
    });
    if (debugDir) {
      fs.writeFileSync(
        path.join(debugDir, `f${String(i).padStart(3, "0")}-t${frame.t}-${scale}x.png`),
        buf
      );
    }
    const png = PNG.sync.read(buf);
    captured.push({ rgba: new Uint8Array(png.data), delay: frame.delay });
  }

  const size = { w: WIDTH * scale, h: HEIGHT * scale };
  await context.close();
  return { frames: captured, ...size };
}

function encodeGif({ frames, w, h }) {
  // Global palette sampled across the timeline keeps colors stable frame to frame.
  const sampleIdx = [...new Set([0, 1, 10, 20, 28, 36, 44, frames.length - 1])].filter(
    (i) => i < frames.length
  );
  const sample = new Uint8Array(sampleIdx.length * w * h * 4);
  sampleIdx.forEach((idx, n) => sample.set(frames[idx].rgba, n * w * h * 4));
  const palette = quantize(sample, 256);

  const gif = GIFEncoder();
  for (const frame of frames) {
    const indexed = applyPalette(frame.rgba, palette);
    gif.writeFrame(indexed, w, h, { palette, delay: frame.delay });
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}

async function main() {
  const debug = process.argv.includes("--debug-frames");
  const debugDir = debug ? path.join(DIR, "frames") : null;
  if (debugDir) fs.mkdirSync(debugDir, { recursive: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const frames = planFrames();
  const total = frames.reduce((s, f) => s + f.delay, 0);
  console.log(`${frames.length} frames, ${total}ms loop`);

  const browser = await chromium.launch({
    executablePath: CHROME,
    args: [
      "--force-color-profile=srgb",
      "--hide-scrollbars",
      "--allow-file-access-from-files",
      "--font-render-hinting=none",
    ],
  });

  try {
    for (const scale of [1, 2]) {
      const capture = await captureFrames(browser, scale, frames, debugDir);
      const gifBuf = encodeGif(capture);
      const name = scale === 1 ? "email-signature.gif" : "email-signature-2x.gif";
      fs.writeFileSync(path.join(OUT_DIR, name), gifBuf);
      console.log(
        `${name}: ${capture.w}x${capture.h}, ${(gifBuf.length / 1024).toFixed(0)} KB`
      );

      if (scale === 2) {
        // Static fallback of the completed state (first frame of the plan).
        const still = PNG.sync.write(
          Object.assign(new PNG({ width: capture.w, height: capture.h }), {
            data: Buffer.from(capture.frames[0].rgba),
          })
        );
        fs.writeFileSync(path.join(OUT_DIR, "email-signature-still.png"), still);
        console.log(`email-signature-still.png: ${capture.w}x${capture.h}`);
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
