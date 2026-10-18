# Omni Market

Omni Market is a Kenyan marketplace for discovering, buying and selling everyday
items. Built with [Next.js](https://nextjs.org) App Router, Tailwind CSS and
Supabase for account authentication.

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Authentication is optional for browsing. To enable sign-in and registration, put
your project keys in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Without those variables the site still works end to end; the account pages
explain that sign-in is not configured.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero, categories, featured finds, deals, seller call to action |
| `/products` | Full catalogue with search, category filters, sorting and favourites |
| `/products/[slug]` | Product detail with seller info, quantity, buy now and related items |
| `/cart` | Shopping bag with quantity controls, favourites and order summary |
| `/checkout` | Delivery details, delivery method, order confirmation |
| `/sell` | Create a listing with live preview of the buyer-facing summary |
| `/dashboard` | Listings, orders, favourites and account tabs |
| `/login`, `/register` | Account access through Supabase |
| `/about`, `/help`, `/shipping`, `/contact`, `/privacy`, `/terms` | Buyer and seller information |

## Where things live

- `src/app/lib/catalog.ts` — the shared product and category data used by every page.
- `src/app/lib/browser-store.ts` — reads and writes the local-storage lists through `useSyncExternalStore`.
- `src/app/lib/store.tsx` — cart, favourites, cart drawer and Supabase session state.
- `src/app/lib/local-data.ts` — listings and orders saved to browser storage.
- `src/app/ui/` — header, footer, cart drawer, product cards and the interactive page bodies.
- `src/app/**/page.tsx` — one folder per route; each stays a Server Component that exports its own metadata.

Shop and dashboard filters come from the URL. The page reads `searchParams` on the
server inside a `<Suspense>` boundary and passes the values to the client component
as initial state, so `/products?category=Fashion` and `/dashboard?tab=orders` work
when shared or reloaded.

Bag, favourites, listings and order drafts are stored in browser local storage
under keys prefixed with `omni-market-`. Checkout records an order locally and
does not charge anyone.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
