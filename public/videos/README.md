# public/videos

Short clips for the home page section ("On Our Floor").

This file exists so git tracks the folder while it is empty. Leave it here.

## Adding a clip

1. Drop the file in this folder. Name it `rg-video-01.mp4`, `rg-video-02.mp4`, …
   — lowercase, no spaces, so the public path needs no escaping.

2. Add an entry to `lib/videos.js`. Nothing renders until you do; a file here
   that is not listed there is ignored.

   ```js
   {
       src: '/videos/rg-video-01.mp4',
       title: 'Mild steel on the bed',
       caption: '6 mm MS sheet, nested and cut in a single setup.',
       width: 1080,
       height: 1920,
   },
   ```

   `width` and `height` are the clip's real pixel size — right-click the file →
   Properties → Details. They reserve the frame so the page does not reflow when
   the video's metadata arrives.

3. Check it on localhost. At this point the clip is served straight from
   `public/`, which is fine locally and too heavy for production.

4. Upload it:

   ```
   npm run cloudinary:upload
   ```

   From then on the same entry delivers through `f_auto,q_auto` — Cloudinary
   picks the codec per browser and a ~15 MB phone clip lands under 3 MB. The
   poster frame is generated automatically from one second in.

## Format

- **MP4 (H.264)** is the safe choice. Straight off a phone is fine.
- **Keep them short.** 10–30 seconds. These loop; they are not a film.
- **Shoot with no sound in mind.** They play muted, and a single clip autoplays.
- **Portrait or landscape both work.** The grid is built for portrait, which is
  what phone footage of a machine bed usually is.
- **Free-tier cap is 100 MB per file**, which a minute of phone video is well
  inside.
