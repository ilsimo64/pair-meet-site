# Pair Meet website

Static multi-page website designed for GitHub Pages. Built from the Pair Meet Rust source archive supplied for this task.

## Pages
- `index.html` — home
- `features.html` — feature overview
- `commands.html` — searchable command reference
- `setup.html` — setup guide
- `safety.html` — safety and privacy controls
- `terms.html` and `privacy.html` — legal page drafts requiring operator review

## Publish on GitHub Pages
1. Extract this ZIP.
2. Upload all files and the `assets/` folder to the root of your repository (or the configured Pages folder).
3. In GitHub, open **Settings → Pages** and select the branch/folder containing `index.html`.
4. Keep relative paths intact. No build step is required.

## Notes
- Pure HTML, CSS and vanilla JavaScript; no framework or build process.
- Navigation has a fade/slide entrance and respects `prefers-reduced-motion`.
- Command list and access labels are derived from the supplied Rust `commands.rs` dispatch/registration.
- The source registers 28 commands/actions, including the `View bio` message context action.
- Legal pages are drafts, not legal advice. Complete operator-specific details before treating them as final.
- External Google Fonts are optional; the site has system fallbacks.
