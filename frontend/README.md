# Toy Store Frontend

This is a Vite + React single-page application for the toy store UI.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `frontend/dist`.

## Deployment notes

- This app uses client-side routing with `BrowserRouter`.
- Direct refreshes on routes like `/about` or `/product/1` need SPA rewrite support on the hosting platform.
- The repo includes:
  - `vercel.json` for Vercel
  - `netlify.toml` for Netlify
  - `public/_redirects` for Netlify-style static rewrites

## Recommended hosting settings

- Build directory: `frontend`
- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`
