# Charades Night

A single-page charades game. No build step, no dependencies.

## Play it

- **On any computer:** double-click `index.html`.
- **On a phone (installable):** host this folder on any static web host and open the link,
  then use *Add to Home Screen* (iPhone: Share button; Android: browser menu).
  Once installed it works offline.

## Free hosts that work

- **GitHub Pages:** push this folder to a repo, enable Pages (Settings → Pages → main branch, root).
- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop
- **Cloudflare Pages / Vercel:** import the folder as a static site.

## Files

- `index.html` – the whole game (styles, word lists, logic)
- `manifest.webmanifest` – app name, colors, icons for Add to Home Screen
- `sw.js` – service worker that caches the game for offline play
- `icon.svg`, `icon-192.png`, `icon-512.png` – app icons
