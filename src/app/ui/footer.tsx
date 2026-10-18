import Link from "next/link";
import { categories } from "@/app/lib/catalog";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/products", label: "All products" },
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
    <footer className="mt-auto border-t border-[#e6e8df] bg-white/90 px-4 pb-8 pt-12 sm:px-8 sm:pt-14 lg:px-12">
      <div className="mx-auto grid max-w-[1360px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="text-3xl font-black tracking-[-1.5px] text-[#234b35]"
          >
            Omni<span className="text-[#a2bd70]">.</span>Market
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500">
            Discover good finds, connect with sellers and shop your way. Your
            next favourite thing might be right here.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="rounded-full border border-[#e4e6de] bg-white px-3 py-1.5 text-xs text-gray-600 transition hover:border-[#234b35] hover:text-[#234b35]"
              >
                {category.emoji} {category.name}
              </Link>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold">{column.title}</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">
              {column.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-[#234b35]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-[1360px] flex-col justify-between gap-3 border-t border-[#e9eae3] pt-6 text-xs text-gray-500 sm:flex-row sm:items-center">
        <p>© 2026 Omni Market. All rights reserved.</p>
        <p>Made for discovery. Built for everyone in Kenya.</p>
      </div>
    </footer>
  );
}
