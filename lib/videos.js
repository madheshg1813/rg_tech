/**
 * Short clips for the home page video section.
 *
 * Drop the files into public/videos/ and add an entry here. Nothing renders
 * until an entry exists — the folder is not scanned — so a file sitting in
 * public/videos/ that is not listed below is simply ignored.
 *
 * `src` is the local public path, resolved through lib/cloudinary.js like every
 * other asset. Before the upload script has run the path is served straight out
 * of public/; afterwards the same entry delivers from Cloudinary with f_auto
 * and q_auto, which picks the codec per browser and typically takes a 15 MB
 * phone clip under 3 MB. Nothing here changes when that happens.
 *
 * `width` and `height` are the clip's true pixel size. They are not optional:
 * the section reserves the frame from this ratio, so without them the page
 * reflows when the video's metadata arrives. Phone video is usually 1080x1920
 * portrait or 1920x1080 landscape — check the file's properties if unsure.
 *
 * `poster` is optional and worth setting. Without one the browser shows a black
 * box until it has fetched enough of the clip to paint a frame. Once the video
 * is on Cloudinary the poster is generated automatically from a frame at one
 * second, so you only need this field for a hand-picked still.
 *
 * Example:
 *
 *     {
 *         src: '/videos/rg-video-01.mp4',
 *         title: 'Mild steel on the bed',
 *         caption: '6 mm MS sheet, nested and cut in a single setup.',
 *         width: 1080,
 *         height: 1920,
 *     },
 */

export const videos = [
    /*
     * The two 720x1280 clips lead: they are the sharpest of the set, and this
     * row is the only place on the home page where the machine is seen working
     * rather than its output photographed afterwards.
     *
     * `title` is the accessible name, not visible text. Only `caption` renders,
     * and none of these carry one yet.
     */
    {
        src: '/videos/rg-video-02.mp4',
        title: 'Laser-cut work by RG Tech Engineering Works',
        width: 720,
        height: 1280,
    },
    {
        src: '/videos/rg-video-03.mp4',
        title: 'Laser-cut work by RG Tech Engineering Works',
        width: 720,
        height: 1280,
    },
    {
        src: '/videos/rg-video-01.mp4',
        title: 'Fiber laser cutting a perforated circular panel on the bed',
        width: 478,
        height: 850,
    },
    {
        src: '/videos/rg-video-04.mp4',
        title: 'Laser-cut work by RG Tech Engineering Works',
        width: 478,
        height: 850,
    },
]

export default videos
