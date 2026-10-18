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

Every listing on the site is read live from the Supabase `products` table, so the
two variables below are required for the shop, home rails, categories, deals,
product pages and bag to show anything. Put them in `.env.local` (gitignored):

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Without them the shelves load nothing and each one shows a
"Live listings could not be loaded" panel with a **Try again** button. Because
`NEXT_PUBLIC_*` values are inlined into the client bundle at build time, adding
them after a deploy only takes effect once the site is rebuilt.

Listings and orders that you create yourself stay in this browser's storage — they
are not sent to Supabase yet.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page: hero, category strip, featured and deals previews, seller call to action |
| `/products` | Full catalogue with search, category filters, sorting and favourites |
| `/products/[id]` | Listing detail with quantity, add to bag, buy now and related items |
| `/categories` | Every live category with its listing count and lowest price |
| `/new` | Newest arrivals shelf |
| `/deals` | Listings whose price dropped below an earlier price |
| `/cart` | Shopping bag with quantity controls, favourites and order summary |
| `/checkout` | Delivery details, delivery method, order confirmation |
| `/sell` | Create a listing with live preview of the buyer-facing summary |
| `/dashboard` | Listings, orders, favourites and account tabs |
| `/login`, `/register` | Account access through Supabase |
| `/about`, `/help`, `/shipping`, `/contact`, `/privacy`, `/terms` | Buyer and seller information |

## Where things live

- `src/app/lib/catalog.ts` — the client-side store over the live Supabase `products` table that every shelf reads.
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

## Deploying

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the
host project (Vercel: Settings → Environment Variables) for Production and Preview,
then deploy. A deployment built without them renders the retry panel on every shelf,
and adding the variables afterwards does not change an already-built deployment.

`npm run build` must pass before pushing; with `cacheComponents` enabled, any route
that reads `params` or `searchParams` outside a `<Suspense>` boundary fails at
prerender.

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```
