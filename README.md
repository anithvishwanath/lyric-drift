# Lyric Drift

Track how often words appear across an artist's studio discography — album by album.

Built with [Astro](https://astro.build) and powered by [lrclib.net](https://lrclib.net) for lyrics. No API key required.

![Lyric Drift screenshot](screenshot.png)

---

## Features

- Select an artist and fetch lyrics for their full studio discography
- Word frequency chart across albums, normalized per 1,000 words
- Auto-suggests the most meaningful words on load
- Track up to 8 custom words simultaneously
- Light and dark mode support

## Artists

Currently includes curated discographies for:

- **Kendrick Lamar** — Section.80 through GNX
- **The Beatles** — Please Please Me through Let It Be
- **Linkin Park** — Hybrid Theory through From Zero

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run locally

```bash
git clone https://github.com/your-username/lyric-drift.git
cd lyric-drift
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Deploying to Netlify

1. Push the repo to GitHub
2. Go to [app.netlify.com](https://app.netlify.com) → Add new site → Import from Git
3. Select your repo — Netlify will detect `netlify.toml` automatically
4. Deploy

No environment variables needed.

## Adding an Artist

1. Create a new file in `src/data/` following this shape:

```json
[
  {
    "name": "Album Title",
    "year": 2001,
    "tracks": [
      "Track One",
      "Track Two"
    ]
  }
]
```

2. Open `src/pages/index.astro` and add the artist in three places:

**Import the file** (in the frontmatter at the top):
```js
import myartist from "../data/myartist.json";
```

**Add to the discographies object:**
```js
const discographies = {
  "Kendrick Lamar": kendrick,
  "The Beatles": beatles,
  "Linkin Park": linkinpark,
  "Artist Name": myartist   // add this line
};
```

**Add to the dropdown:**
```html
<option value="Artist Name">Artist Name</option>
```

3. Re-run the inline script to regenerate the bundled data (or just `npm run dev` — Astro handles it at build time).

## Project Structure

```
lyric-drift/
├── src/
│   ├── data/
│   │   ├── kendrick.json
│   │   ├── beatles.json
│   │   └── linkinpark.json
│   └── pages/
│       ├── index.astro       # main app
│       └── api/
│           ├── genius/       # unused, kept for reference
│           └── page.js       # unused, kept for reference
├── astro.config.mjs
├── netlify.toml
└── package.json
```

## Tech Stack

- [Astro](https://astro.build) — framework
- [lrclib.net](https://lrclib.net) — lyrics API (free, no auth)
- [Chart.js](https://www.chartjs.org) — charting

## License

MIT
