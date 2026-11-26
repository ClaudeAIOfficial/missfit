# MISFITS

> They call it a scam. We call it home.

Landing page for the Misfits movement — a protest against the stigma of being in crypto.

Plain static site: `index.html` + `styles.css`. No build step. Deploy as-is to GitHub Pages, Vercel, Netlify or any static host.

## Adding misfit photos

1. Drop photos in `images/`.
2. **Hero:** in `index.html`, replace the `.hero-ph` div with
   `<img src="images/hero.jpg" alt="A misfit in the wild" class="hero-img par">` (4:5 portrait works best).
3. **The Wall:** in each card, replace the `.ph` div with `<img src="images/misfit-1.jpg" alt="@handle">` and fill in the handle and city. Copy a card to add more.

## Placeholders to fill in

- `[#HASHTAG]` and `[@X_HANDLE]` in the Join section
- `href="#"` on the **Post on X** and **Join the Telegram** buttons

## Accent colour

Change `--accent` at the top of `styles.css`.
