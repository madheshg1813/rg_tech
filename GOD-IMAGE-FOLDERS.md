# RG Tech — deity panel image folders

One folder per gallery page. Drop the panel photos straight in; nothing else to set up.

> **Generating them?** Read [DEITY-PANEL-IMAGES.md](DEITY-PANEL-IMAGES.md) first — it has the
> house style, the prompt, the review checklist, and a record of the approaches that did not work.

## Image spec

| | |
|---|---|
| Size | **1536 x 2752 px** (9:16 portrait) |
| Format | .jpg |
| Count | up to 7 per folder (more is fine, the page adapts) |
| Naming | `<slug>-<design-name>.jpg` — e.g. `murugan-lotus-frame.jpg` |

Size matters: next/image needs the true ratio or the strip reflows as each image loads. If yours are a different size, tell me and I will batch-resize them.

## After you add images

```bash
npm run cloudinary:migrate
```

Then tell me, and I will paste the URLs into lib/godDesigns.js. Each page turns indexable and enters the sitemap on its own once it has images.

## Folders

### Primary deities  (20)

| # | Name | Folder | Page |
|---|---|---|---|
| 1 | Lord Ganesh (Vinayagar) ✅ | `public/gallery/gods/ganesh/` | /designs/gods/ganesh |
| 2 | Murugan | `public/gallery/gods/murugan/` | /designs/gods/murugan |
| 3 | Shiva | `public/gallery/gods/shiva/` | /designs/gods/shiva |
| 4 | Parvati | `public/gallery/gods/parvati/` | /designs/gods/parvati |
| 5 | Lakshmi | `public/gallery/gods/lakshmi/` | /designs/gods/lakshmi |
| 6 | Saraswati | `public/gallery/gods/saraswati/` | /designs/gods/saraswati |
| 7 | Durga | `public/gallery/gods/durga/` | /designs/gods/durga |
| 8 | Ayyappa | `public/gallery/gods/ayyappa/` | /designs/gods/ayyappa |
| 9 | Hanuman | `public/gallery/gods/hanuman/` | /designs/gods/hanuman |
| 10 | Rama | `public/gallery/gods/rama/` | /designs/gods/rama |
| 11 | Sita | `public/gallery/gods/sita/` | /designs/gods/sita |
| 12 | Krishna | `public/gallery/gods/krishna/` | /designs/gods/krishna |
| 13 | Radha Krishna | `public/gallery/gods/radha-krishna/` | /designs/gods/radha-krishna |
| 14 | Perumal | `public/gallery/gods/perumal/` | /designs/gods/perumal |
| 15 | Narasimha | `public/gallery/gods/narasimha/` | /designs/gods/narasimha |
| 16 | Hayagriva | `public/gallery/gods/hayagriva/` | /designs/gods/hayagriva |
| 17 | Dhanvantari | `public/gallery/gods/dhanvantari/` | /designs/gods/dhanvantari |
| 18 | Ardhanarishvara | `public/gallery/gods/ardhanarishvara/` | /designs/gods/ardhanarishvara |
| 19 | Nataraja | `public/gallery/gods/nataraja/` | /designs/gods/nataraja |
| 20 | Dakshinamurthy | `public/gallery/gods/dakshinamurthy/` | /designs/gods/dakshinamurthy |

### Amman & village deities  (12)

| # | Name | Folder | Page |
|---|---|---|---|
| 21 | Kaliamman | `public/gallery/gods/kaliamman/` | /designs/gods/kaliamman |
| 22 | Meenakshi Amman | `public/gallery/gods/meenakshi-amman/` | /designs/gods/meenakshi-amman |
| 23 | Mariamman | `public/gallery/gods/mariamman/` | /designs/gods/mariamman |
| 24 | Karuppasamy | `public/gallery/gods/karuppasamy/` | /designs/gods/karuppasamy |
| 25 | Ayyanar | `public/gallery/gods/ayyanar/` | /designs/gods/ayyanar |
| 26 | Madurai Veeran | `public/gallery/gods/madurai-veeran/` | /designs/gods/madurai-veeran |
| 27 | Muneeswaran | `public/gallery/gods/muneeswaran/` | /designs/gods/muneeswaran |
| 28 | Bhairava | `public/gallery/gods/bhairava/` | /designs/gods/bhairava |
| 29 | Navadurga | `public/gallery/gods/navadurga/` | /designs/gods/navadurga |
| 30 | Mahalakshmi | `public/gallery/gods/mahalakshmi/` | /designs/gods/mahalakshmi |
| 31 | Annapoorani | `public/gallery/gods/annapoorani/` | /designs/gods/annapoorani |
| 32 | Andal | `public/gallery/gods/andal/` | /designs/gods/andal |

### Navagraha & planetary  (5)

| # | Name | Folder | Page |
|---|---|---|---|
| 33 | Navagraha | `public/gallery/gods/navagraha/` | /designs/gods/navagraha |
| 34 | Surya Bhagavan | `public/gallery/gods/surya/` | /designs/gods/surya |
| 35 | Chandra Bhagavan | `public/gallery/gods/chandra/` | /designs/gods/chandra |
| 36 | Shani Bhagavan | `public/gallery/gods/shani/` | /designs/gods/shani |
| 37 | Rahu Ketu | `public/gallery/gods/rahu-ketu/` | /designs/gods/rahu-ketu |

### Saints & gurus  (4)

| # | Name | Folder | Page |
|---|---|---|---|
| 38 | Raghavendra Swamy | `public/gallery/gods/raghavendra-swamy/` | /designs/gods/raghavendra-swamy |
| 39 | Sai Baba | `public/gallery/gods/sai-baba/` | /designs/gods/sai-baba |
| 40 | Shirdi Sai Baba | `public/gallery/gods/shirdi-sai-baba/` | /designs/gods/shirdi-sai-baba |
| 41 | Sathya Sai Baba | `public/gallery/gods/sathya-sai-baba/` | /designs/gods/sathya-sai-baba |

### Sacred symbols  (5)

| # | Name | Folder | Page |
|---|---|---|---|
| 42 | Om Symbol | `public/gallery/gods/om-symbol/` | /designs/gods/om-symbol |
| 43 | Vel Symbol | `public/gallery/gods/vel-symbol/` | /designs/gods/vel-symbol |
| 44 | Trishul | `public/gallery/gods/trishul/` | /designs/gods/trishul |
| 45 | Swastik | `public/gallery/gods/swastik/` | /designs/gods/swastik |
| 46 | Kalasam | `public/gallery/gods/kalasam/` | /designs/gods/kalasam |

### Temple & pooja room  (4)

| # | Name | Folder | Page |
|---|---|---|---|
| 47 | Temple Arch | `public/gallery/gods/temple-arch/` | /designs/gods/temple-arch |
| 48 | Temple Entrance Panel | `public/gallery/gods/temple-entrance-panel/` | /designs/gods/temple-entrance-panel |
| 49 | Pooja Room | `public/gallery/gods/pooja-room/` | /designs/gods/pooja-room |
| 50 | Hindu Temple Decoration | `public/gallery/gods/hindu-temple-decoration/` | /designs/gods/hindu-temple-decoration |

✅ = already has images.