"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowDownRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useApp } from "@/app/lib/store";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/sell", label: "Sell an item" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/help", label: "Help" },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, setCartOpen, favorites, session } = useApp();
  const [term, setTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = term.trim();
    router.push(query ? `/products?q=${encodeURIComponent(query)}` : "/products");
    setMenuOpen(false);
  }

  return (
    <>
      <div className="bg-[#1d3d2b] px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide text-white sm:text-xs">
        Your next great find is closer than you think.
        <span className="ml-2 hidden sm:inline">
          A better way to buy, sell and discover.
        </span>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e7eadf]/80 bg-[#fcfcf9]/90 shadow-[0_8px_30px_rgba(28,54,34,0.035)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1440px] items-center gap-3 px-4 py-3.5 sm:gap-5 sm:px-8 sm:py-4 lg:px-12">
          <Link href="/" className="shrink-0">
            <span className="block text-[25px] font-black tracking-[-1.8px] text-[#234b35] sm:text-3xl">
              Omni<span className="text-[#a2bd70]">.</span>Market
            </span>
            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[2px] text-gray-500">
              Discover something good
            </span>
          </Link>

          <form
            onSubmit={runSearch}
            className="ml-auto hidden max-w-[520px] flex-1 items-center rounded-full border border-[#e2e7dc] bg-white/95 px-4 py-3 shadow-sm transition focus-within:border-[#719477] focus-within:shadow-[0_0_0_4px_rgba(113,146,103,0.10)] md:flex"
          >
            <Search size={19} className="shrink-0 text-gray-400" />
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              placeholder="Search products, categories, sellers..."
              aria-label="Search products"
              className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="ml-2 rounded-full bg-[#234b35] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#315e43]"
            >
              Search
            </button>
          </form>

          <nav className="ml-auto hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-[#234b35]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard?tab=favorites"
              aria-label={`Favourites, ${favorites.length} saved`}
              className="relative hidden rounded-full p-2.5 transition hover:bg-[#eef1e9] sm:block"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c5dba9] px-1 text-[10px] font-bold text-[#203a28]">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              href={session ? "/dashboard" : "/login"}
              aria-label={session ? "My account" : "Sign in"}
              className="rounded-full p-2.5 transition hover:bg-[#eef1e9]"
            >
              <UserRound size={20} />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="relative rounded-full border border-[#e5e7df] bg-white p-2.5 transition hover:border-[#234b35] hover:bg-[#f4f7f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a2bd70]"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a2bd70] px-1 text-[10px] font-bold text-[#203a28]">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/sell"
              className="hidden items-center gap-2 rounded-full bg-[#234b35] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#315e43] sm:flex"
            >
              <span>Start selling</span>
              <ArrowDownRight size={16} />
            </Link>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle navigation"
              className="rounded-full p-2 hover:bg-[#eef1e9] lg:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-black/[0.06] bg-white px-5 py-5 lg:hidden">
            <form
              onSubmit={runSearch}
              className="mb-4 flex items-center gap-2 rounded-xl border border-[#e2e7dc] p-3"
            >
              <Search size={18} />
              <input
                value={term}
                onChange={(event) => setTerm(event.target.value)}
                placeholder="Find something..."
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </form>
            <div className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href={session ? "/dashboard" : "/login"} onClick={() => setMenuOpen(false)}>
                {session ? "My account" : "Sign in / Create account"}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
