# Daily Mood Tracker

A colorful, single-page mood tracking app. Log how you're feeling from a set of 20 moods, watch a live "Right now" card change color to match, and see your patterns build up in a running dashboard — all with light/dark theme support and data that's saved automatically.

## Features

- **20 moods to log** — Happy, Sad, Excited, Calm, Angry, Anxious, Loved, Tired, Grateful, Confused, Proud, Bored, Stressed, Hopeful, Lonely, Content, Motivated, Overwhelmed, Peaceful, and Nostalgic — each with its own color, browsable 6 at a time with Back / Next paging.
- **Live "Right now" card** — the card's background washes into the color of whatever mood you last logged (green for Happy, red for Sad, and so on for every mood).
- **Dashboard** — total check-ins, your most frequent mood, and a per-mood breakdown with counts and animated bars, paginated the same way as the mood picker.
- **Light / dark theme toggle** — top-right switch, affects the whole app.
- **Data persistence** — your mood history and theme preference are saved automatically and reload the next time you open the app.
- **Responsive layout** — the mood picker card sits full-width up top; the "Right now" and dashboard cards sit side-by-side below it, stacking on narrow screens.

## Project Structure

```
daily-mood-tracker/
├── index.html    # Page markup
├── style.css     # All styling (layout, theme colors, animations)
├── script.js     # App logic (mood data, pagination, rendering, storage)
└── README.md
```

## Getting Started

No build step or dependencies — it's plain HTML, CSS, and JavaScript.

1. Unzip the project.
2. Open `index.html` in any modern browser.

That's it. To host it online, upload the three files (`index.html`, `style.css`, `script.js`) to any static host — GitHub Pages, Netlify, Vercel, etc. — keeping them in the same folder.

## How It Works

1. Open the app and pick the mood that fits how you feel from the **Log your mood** card. Use **Back** / **Next** to browse all 20 moods, six at a time.
2. The **Right now** card instantly updates — its background washes into that mood's color, with the emoji and mood name front and center.
3. The **Dashboard** card updates too, showing your total check-ins, your most frequent mood, and a live percentage/count breakdown for every mood (also paginated).
4. Use the toggle in the top-right corner to switch between light and dark themes at any time.
5. Use **Clear history** in the dashboard to wipe your logged entries and start fresh.

## Data & Storage

Mood entries and your theme preference are saved through the app's built-in storage layer (`window.storage`), so they persist across sessions without any backend or database of your own. No entries or data leave the app — everything stays private to your session in this environment.

## Tech Stack

- **HTML** — semantic markup, no framework
- **CSS** — custom properties (CSS variables) drive both the color system and the light/dark theme switch; Flexbox and Grid handle layout
- **JavaScript (vanilla)** — no libraries or build tools; handles rendering, pagination, mood logging, and persistence
- **Fonts** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (display), [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) (body/UI), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (stats/labels), loaded from Google Fonts

## Customization

- **Add or edit moods** — update the `MOODS` array at the top of `script.js` (id, label, emoji, and CSS variable names for its color).
- **Add a mood's color** — define `--{id}` and `--{id}-wash` in the `:root` block of `style.css` (plus a dark-mode wash override in the `html[data-theme="dark"]` block).
- **Change moods per page** — adjust the `PAGE_SIZE` constant in `script.js`.
- **Adjust the color palette or theme** — edit the CSS custom properties in `style.css`.

## License

This project is open source. Add your preferred license (e.g., MIT) here.
