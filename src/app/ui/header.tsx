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
  { href: "/categories", label: "Categories" },
  { href: "/new", label: "New" },
  { href: "/deals", label: "Deals" },
  { href: "/sell", label: "Sell" },
  { href: "/help", label: "Help" },
];

function SearchBox({
  term,
  onTermChange,
  onSubmit,
  compact = false,
}: {
  term: string;
  onTermChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  compact?: boolean;
}) {
  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={
        compact
          ? "mb-4 flex items-center gap-2 rounded-xl border border-[#e2e7dc] p-2"
          : "hidden max-w-[520px] flex-1 items-center rounded-full border border-[#e2e7dc] bg-white/95 px-4 py-2.5 shadow-sm transition focus-within:border-[#719477] focus-within:shadow-[0_0_0_4px_rgba(113,146,103,0.10)] md:flex"
      }
    >
      <Search
        size={compact ? 18 : 19}
        className="shrink-0 text-gray-400"
        aria-hidden
      />
      <input
        value={term}
        onChange={(event) => onTermChange(event.target.value)}
        placeholder={compact ? "Find something..." : "Search listings, sellers..."}
        aria-label="Search listings"
        className={
          compact
            ? "min-w-0 flex-1 bg-transparent px-1 text-sm outline-none"
            : "ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        }
      />
      <button
        type="submit"
        className={
          compact
            ? "rounded-lg bg-[#234b35] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#315e43]"
            : "ml-2 rounded-full bg-[#234b35] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#315e43]"
        }
      >
        Search
      </button>
    </form>
  );
}

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
      <div className="relative overflow-hidden bg-gradient-to-r from-[#173624] via-[#234b35] to-[#2f6b46] px-4 py-2.5 text-center text-[11px] font-semibold tracking-wide text-white sm:text-xs">
        <span className="mr-2 inline-flex items-center gap-2">
          <span className="cuk-live-dot h-1.5 w-1.5" aria-hidden />
          Your next great find is closer than you think.
        </span>
        <span className="ml-2 hidden text-[#c5dba9] sm:inline">
          A better way to buy, sell and discover.
        </span>
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e7eadf]/80 bg-[#fcfcf9]/90 shadow-[0_8px_30px_rgba(28,54,34,0.035)] backdrop-blur-2xl">
        {/* Full width on purpose: the account and cart cluster sits against the
            right edge of the viewport instead of a centred column. */}
        <div className="flex w-full items-center gap-3 px-3 py-3 sm:gap-4 sm:px-5 sm:py-3.5">
          <Link href="/" className="shrink-0">
            <span className="block bg-gradient-to-r from-[#234b35] via-[#3f7a55] to-[#7fae6d] bg-clip-text text-[22px] font-black tracking-[-1.6px] text-transparent lg:text-3xl">
              Omni<span className="text-[#a2bd70]">.</span>Market
            </span>
            <span className="mt-0.5 hidden text-[9px] font-semibold uppercase tracking-[2px] text-gray-500 sm:block">
              Discover something good
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="ml-2 hidden shrink-0 items-center gap-4 xl:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-sm font-medium text-gray-600 transition hover:text-[#234b35]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-1 justify-end xl:justify-center">
            <SearchBox term={term} onTermChange={setTerm} onSubmit={runSearch} />
          </div>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Link
              href="/dashboard?tab=favorites"
              aria-label={`Favourites, ${favorites.length} saved`}
              className="relative hidden rounded-full p-2.5 transition hover:bg-[#eef1e9] sm:block"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c5dba9] px-1 text-[10px] font-bold text-[#203a28]">
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
              aria-label={`Shopping cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`}
              className="relative rounded-full border border-[#e5e7df] bg-white p-2.5 transition hover:border-[#234b35] hover:bg-[#f4f7f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a2bd70]"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span
                  key={cartCount}
                  className="cuk-pop absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#c5dba9] to-[#8fb266] px-1 text-[10px] font-bold text-[#203a28] shadow-[0_3px_10px_rgba(35,75,53,0.25)]"
                >
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href="/sell"
              className="hidden items-center gap-2 rounded-full bg-[#234b35] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#315e43] lg:flex"
            >
              <span>Start selling</span>
              <ArrowDownRight size={16} aria-hidden />
            </Link>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="rounded-full p-2 transition hover:bg-[#eef1e9] xl:hidden"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-black/[0.06] bg-white px-5 py-5 xl:hidden">
            <SearchBox
              term={term}
              onTermChange={setTerm}
              onSubmit={runSearch}
              compact
            />
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
              <Link
                href="/dashboard?tab=favorites"
                onClick={() => setMenuOpen(false)}
                className="sm:hidden"
              >
                Favourites ({favorites.length})
              </Link>
              <Link
                href={session ? "/dashboard" : "/login"}
                onClick={() => setMenuOpen(false)}
              >
                {session ? "My account" : "Sign in / Create account"}
              </Link>
              <Link href="/cart" onClick={() => setMenuOpen(false)}>
                My bag ({cartCount})
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
