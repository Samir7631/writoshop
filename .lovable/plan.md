# Convert to a static React + Vite SPA (Writoshop)

Rebuild the Writoshop bookstore in **this** project as a plain **React + Vite single-page app** with **hash routing**, producing a `dist/` folder (`index.html` + hashed static assets) that drops onto Hostinger or any shared host with zero server config. No TanStack Start, no Nitro, no Cloudflare, no SSR.

## Important context
- This project is currently a blank TanStack Start template — the real Writoshop source isn't accessible here, so this is a faithful rebuild, not a file-by-file port.
- The public preview only exposed the **home page** (now expired). The home page is reproduced from captured content; the other pages are reconstructed from the known routes/data and typical store structure. Exact pixel/color parity on internal pages can't be guaranteed, but the visual language (same layout, typography, product data, INR pricing) will match.

## What the app contains (from captured content)
- **Brand:** Writoshop — "Discover Books That Inspire Your Mind"
- **Products:** p1 Whispers of the Quiet Forest (Story Books, ₹299), p2 The Curious Atlas of Animals (Learning Books, ₹449), p3 Colours of the Festival (Colouring Books, ₹199), p4 Mindful Mornings (Ebook) (Ebooks, ₹149)
- **Categories:** Ebooks, Story Books, Colouring Books, Learning Books
- **Sections:** hero (Shop Books / Login CTAs), Featured books grid, Browse by category, feature strip (Easy ordering / UPI payment / Curated books)

## Routing (hash-based, refresh-safe on shared hosting)
- `#/` — Home
- `#/products` — All books (with category filter)
- `#/products/:id` — Book detail (Add to cart, price, description)
- `#/cart` — Cart summary
- `#/login` — Email + social login form (UI only, no backend)

## Technical plan

### 1. Stack swap
- Remove TanStack Start pieces: `src/router.tsx`, `src/routes/`, `src/routeTree.gen.ts`, `src/server.ts`, `src/start.ts`, and the `@lovable.dev/vite-tanstack-config` usage.
- Uninstall `@tanstack/react-start`, `@tanstack/react-router`, `@tanstack/router-plugin`, `nitro`, `@lovable.dev/vite-tanstack-config`.
- Add `react-router-dom` and `@vitejs/plugin-react`.

### 2. Vite config for static export
- New `vite.config.ts` using `@vitejs/plugin-react`, `@tailwindcss/vite`, `vite-tsconfig-paths`, `base: './'` (relative asset paths so it works in any subfolder on Hostinger), output to `dist/`.
- Root `index.html` with `<div id="root">` and `<script src="/src/main.tsx">`, plus real title/meta ("Writoshop — Discover Books That Inspire Your Mind").

### 3. App shell
- `src/main.tsx` — mount React, import `styles.css`.
- `src/App.tsx` — `HashRouter` + `<Routes>`, shared `Header` (logo, nav, Login) and `Footer`.
- Keep existing Tailwind v4 `src/styles.css` and shadcn UI components (already installed).

### 4. Pages & components
- `src/data/books.ts` — the product catalog above (single source of truth).
- `src/components/`: `Header`, `Footer`, `BookCard`, `CategoryCard`, `FeatureStrip`.
- `src/pages/`: `Home`, `Products`, `ProductDetail`, `Cart`, `Login`.
- Cart state via a lightweight React context + `localStorage` (client-only; matches "add to cart" behavior without a server).

### 5. Build & verify
- `bun run build` → confirm `dist/index.html` + `dist/assets/*` are generated.
- Serve `dist/` locally and click through all routes + refresh on a deep link to confirm hash routing works offline.

## Deploying to Hostinger
Upload the contents of `dist/` to `public_html`. Because it's hash-routed with relative asset paths, every route and refresh works with no `.htaccess` or server settings.

## Out of scope
- No real authentication, payments, or database (the original's login/cart are UI/client-only here).
- Any server-driven data from the original that wasn't publicly visible.
