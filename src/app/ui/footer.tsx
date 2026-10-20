import Link from "next/link";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All listings" },
      { href: "/categories", label: "Explore categories" },
      { href: "/new", label: "New arrivals" },
      { href: "/deals", label: "Deals & price drops" },
      { href: "/cart", label: "Your bag" },
      { href: "/checkout", label: "Checkout" },
      { href: "/sell", label: "Sell an item" },
    ],
  },
  {
    title: "Your account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/register", label: "Create account" },
      { href: "/dashboard", label: "My dashboard" },
      { href: "/dashboard?tab=favorites", label: "Favourites" },
    ],
  },
  {
    title: "Help & information",
    links: [
      { href: "/help", label: "Help centre" },
      { href: "/shipping", label: "Delivery & pickup" },
      { href: "/contact", label: "Contact us" },
      { href: "/about", label: "About Omni Market" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Marketplace rules" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-[linear-gradient(135deg,#12291d_0%,#1d3d2b_45%,#254c36_100%)] px-4 pb-8 pt-14 text-white/85 sm:px-8 sm:pt-16 lg:px-12">
      <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
      <span
        className="cuk-blob left-[-8%] top-[-30%] h-[260px] w-[260px] opacity-25"
        style={{ background: "#7fae6d" }}
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-[1360px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="text-3xl font-black tracking-[-1.5px] text-white transition hover:text-[#c5dba9]"
          >
            Omni<span className="text-[#a2bd70]">.</span>Market
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
            Discover good finds, connect with sellers and shop your way. Your
            next favourite thing might be right here.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1.6px] text-[#dcecc6] ring-1 ring-white/15">
            <span className="cuk-live-dot" aria-hidden />
            Listings load live
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { href: "/categories", label: "Explore categories" },
              { href: "/new", label: "Fresh arrivals" },
              { href: "/deals", label: "Price drops" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/20 bg-white/[0.06] px-3 py-1.5 text-xs text-white/75 transition duration-200 hover:-translate-y-0.5 hover:border-[#a2bd70]/70 hover:bg-white/[0.12] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-white">{column.title}</h3>
            <span
              className="mt-3 block h-1 w-12 rounded-full bg-gradient-to-r from-[#a2bd70] to-transparent"
              aria-hidden
            />
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/60">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="w-fit transition duration-200 hover:translate-x-1 hover:text-[#c5dba9]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-10 flex max-w-[1360px] flex-col justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center">
        <p>© 2026 Omni Market. All rights reserved.</p>
        <p>Made for discovery. Built for everyone in Kenya.</p>
      </div>
    </footer>
  );
}
