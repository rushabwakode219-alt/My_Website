# GB PHOTOGRAPHY

Premium cinematic wedding photography portfolio using HTML5, CSS3, Vanilla JavaScript, GSAP, ScrollTrigger and Lenis.

## No CMS
There is no CMS, database, login, admin panel or custom backend. Content is manually managed through files.

## Install
```bash
npm install
```

## Local development
```bash
npm run dev
```

## Main files
- `index.html` — Home
- `portfolio.html` — All categories
- `videos.html` — Cinematic films
- `contact.html` — Contact form
- `pages/` — Individual category pages
- `js/config.js` — Central content/contact/gallery configuration
- `assets/images-source/` — Original images; never overwrite/delete
- `assets/images/` — Website-ready images
- `assets/videos-source/` — Original videos
- `assets/videos/` — Optimized videos

## Change contact/social details
Edit only `js/config.js`.

## Add images
1. Put originals into `assets/images-source/`.
2. Run `npm run optimize-images`.
3. Add the website-ready asset path to the appropriate gallery array in `js/config.js`.

Supported source formats include JPG, JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF/TIF, BMP, HEIC and HEIF. Sharp support for HEIC/HEIF depends on the installed libvips build. Unsupported files are reported and skipped; originals are never deleted.

## Add videos
Put originals into `assets/videos-source/`, then run:
```bash
npm run optimize-videos
```
FFmpeg is required. The script creates H.264 MP4 and attempts WebM/VP9 output. Original videos are untouched.

## Add categories
Copy an existing file under `pages/`, add a configuration object to `js/config.js`, add navigation links if needed, and update `sitemap.xml`.

## Themes
Dark/light mode is stored in `localStorage` using the `site-theme` key.

## SEO
Before production, replace `https://example.com/` in canonical URLs, Open Graph URLs, `sitemap.xml`, `robots.txt`, and `SITE_CONFIG.siteUrl`.

## Contact form
The form is frontend-ready only. No passwords, SMTP credentials, API keys or secrets are included. Connect it later to a secure form provider/serverless endpoint.

## Deployment
Netlify is the simplest choice for this static project. Vercel and Cloudflare Pages also work without a backend.

## Performance
Run image optimization before deployment. Use poster images and lazy loading for videos, keep animations lightweight on mobile, test reduced motion, and test real mobile devices.

## Placeholders
Generated SVG placeholders are included so the project works immediately. Replace them with real photography and update the configuration as you add assets.

## Browser support
Modern Chrome, Edge, Firefox, Safari, iOS Safari and Android Chrome.
