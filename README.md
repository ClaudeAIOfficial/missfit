# MISFITS

> They call it a scam. We call it home.

One-page site for the first Misfits protest — **New York, December 3**. People sign up with their email and get a random entry code (e.g. `MSF-7KQ2-XW9P`) to show at check-in.

Plain static site: `index.html` + `styles.css` + `app.js`. No build step. Deploy as-is to GitHub Pages, Vercel, Netlify or any static host.

## Before going live: connect signups

The site is static, so it can't store signups by itself. Without this step people still see a code, but you have no list to check it against.

1. Create a free form at [formspree.io](https://formspree.io) (or any service that accepts a JSON POST).
2. Paste its endpoint into `FORM_ENDPOINT` at the top of `app.js`.
3. Every signup arrives as `{ email, code }`. Export that list and check codes against it at the door.

Codes are generated in the browser, so one person could sign up with several emails. If that matters, dedupe by email in your export.

## Placeholders to fill in

- `[TIME]` and `[MEETING POINT]` in the details box (`index.html`)
- `PROTEST_START` in `app.js` (drives the countdown — currently noon NYC time)
- Misfit IRL photos: drop them in `images/` and replace each `.ph` div with `<img src="images/misfit-1.jpg" alt="@handle">`

## Accent colour

Change `--accent` at the top of `styles.css`.
