"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  Heart,
  PlugZap,
  RefreshCw,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  categorySummary,
  dealProducts,
  loadProducts,
  useProducts,
  type Product,
} from "@/app/lib/catalog";
import { discountPercent } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductCard from "./product-card";
import { btnGhost, btnPrimary, kicker, panelDark, shell } from "./styles";

const sorts = [
  { value: "featured", label: "Newest first" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
  { value: "savings", label: "Biggest saving" },
];

const sortValues = sorts.map((option) => option.value);

const headlines = {
  all: {
    kicker: "The full shelf",
    title: "Shop all listings",
    accent: "listings",
    copy: "Search, filter and sort every listing sellers have published on Omni Market.",
  },
  new: {
    kicker: "Just listed",
    title: "Fresh arrivals",
    accent: "arrivals",
    copy: "The newest listings, most recent first, straight from the sellers' shelf.",
  },
  deals: {
    kicker: "Price drops",
    title: "Deals and reductions",
    accent: "reductions",
    copy: "Listings whose current price is below the price the seller first set.",
  },
} as const;

export type ShopMode = keyof typeof headlines;

export default function Shop({
  mode = "all",
  initialQuery = "",
  initialCategory = "",
  initialSort = "",
}: {
  mode?: ShopMode;
  initialQuery?: string;
  initialCategory?: string;
  initialSort?: string;
}) {
  const { favorites } = useApp();
  const { status, products, error } = useProducts();
  const headline = headlines[mode];

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const base = useMemo(
    () => (mode === "deals" ? dealProducts(products) : products),
    [mode, products]
  );
  const categories = useMemo(() => categorySummary(base), [base]);

  const activeCategory =
    category && categories.some((item) => item.name === category)
      ? category
      : "All items";
  const activeSort = sortValues.includes(sort) ? sort : "featured";

  function updateUrl(next: { q?: string; category?: string; sort?: string }) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "All items") params.delete(key);
      else params.set(key, value);
    });

    const search = params.toString();
    window.history.replaceState(null, "", search ? `?${search}` : window.location.pathname);
  }

  function reset() {
    setQuery("");
    setCategory("");
    setSort("");
    setFavoritesOnly(false);
    window.history.replaceState(null, "", window.location.pathname);
  }

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();

    const filtered = base.filter((product) => {
      const matchesCategory = activeCategory === "All items" || product.category === activeCategory;

      const matchesSearch =
        !term ||
        [product.name, product.category, product.seller, product.location]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesFavorites = !favoritesOnly || favorites.includes(product.id);

      return matchesCategory && matchesSearch && matchesFavorites;
    });

    const savings = (product: Product) =>
      discountPercent(product.price, product.oldPrice);

    return filtered.sort((a, b) => {
      if (activeSort === "price-low") return a.price - b.price;
      if (activeSort === "price-high") return b.price - a.price;
      if (activeSort === "name") return a.name.localeCompare(b.name);
      if (activeSort === "savings") return savings(b) - savings(a);
      return 0;
    });
  }, [base, query, activeCategory, activeSort, favorites, favoritesOnly]);

  const hasFilters =
    query !== "" ||
    category !== "" ||
    favoritesOnly ||
    sort !== "";

  const titleWords = headline.title.split(" ");
  const titleTail = titleWords.slice(-1)[0];
  const titleHead = titleWords.slice(0, -1).join(" ");

  return (
    <main className={`${shell} relative py-12 sm:py-16`}>
      <span
        className="cuk-blob right-[-8%] top-0 h-[260px] w-[260px] opacity-30"
        style={{ background: mode === "deals" ? "#f0b429" : "#9ec77f" }}
        aria-hidden
      />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={kicker}>
            <span className="cuk-live-dot" aria-hidden />
            {headline.kicker}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {titleHead}{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              {titleTail}
            </span>
          </h1>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">{headline.copy}</p>
        </div>
        <Link href="/sell" className={btnGhost}>
          List an item <ArrowRight size={15} />
        </Link>
      </div>

      {status === "error" && (
        <div className="relative mx-auto mt-9 max-w-xl rounded-[28px] border border-[#e6d9bd] bg-gradient-to-br from-[#fdf7ea] to-white p-7 text-center shadow-[0_18px_46px_rgba(28,54,34,0.08)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0b429] to-[#dd7a55] text-white shadow-[0_12px_26px_rgba(221,122,85,0.3)]">
            <PlugZap size={26} />
          </span>
          <p className="mt-5 text-lg font-semibold">
            Live listings could not be loaded.
          </p>
          <p className="mt-1 text-sm text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-5`}
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      )}

      {status === "loading" && (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="cuk-skeleton h-[52px] rounded-full" />
            <div className="cuk-skeleton h-[52px] rounded-full" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="cuk-skeleton h-[320px] rounded-[26px]" />
            ))}
          </div>
        </>
      )}

      {status === "ready" && base.length === 0 && (
        <div className="mt-9 rounded-[28px] border border-dashed border-[#cfd9c4] bg-gradient-to-br from-[#f2f7ec] to-white px-6 py-14 text-center">
          <span className="cuk-float mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-[0_12px_30px_rgba(28,54,34,0.10)]">
            {mode === "deals" ? "🏷️" : "🧺"}
          </span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-[#234b35]">
            {mode === "deals"
              ? "No reduced listings right now"
              : "No active listings yet"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
            {mode === "deals"
              ? "Every active listing is at the price the seller first set. Check back after the next price drop."
              : "Sellers have not published a listing that matches this page. Be the first to add one."}
          </p>
          <Link href="/sell" className={`${btnPrimary} mt-6`}>
            Start selling <ArrowRight size={15} />
          </Link>
        </div>
      )}

      {status === "ready" && base.length > 0 && (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <label className="group flex items-center gap-2 rounded-full border border-[#dfe6d6] bg-white/95 px-3 py-2.5 shadow-[0_6px_20px_rgba(28,54,34,0.05)] transition focus-within:border-[#8fae86] focus-within:shadow-[0_0_0_4px_rgba(162,189,112,0.18)]">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#eaf2e0] to-[#f7f9f1] text-[#315e43] transition group-focus-within:scale-105">
                <Search size={17} />
              </span>
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  updateUrl({ q: event.target.value });
                }}
                placeholder="Search products, sellers or towns..."
                aria-label="Search products"
                className="w-full bg-transparent py-1.5 text-sm outline-none placeholder:text-gray-400"
              />
              {query !== "" && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    updateUrl({ q: "" });
                  }}
                  className="shrink-0 rounded-full px-3 py-1.5 text-[11px] font-semibold text-[#315e43] transition hover:bg-[#eef4e6]"
                >
                  Clear
                </button>
              )}
            </label>

            <label className="flex items-center gap-2 rounded-full border border-[#dfe6d6] bg-white/95 px-4 py-2.5 text-sm text-gray-600 shadow-[0_6px_20px_rgba(28,54,34,0.05)] transition focus-within:border-[#8fae86] focus-within:shadow-[0_0_0_4px_rgba(162,189,112,0.18)]">
              <SlidersHorizontal size={16} className="text-[#315e43]" />
              Sort
              <select
                aria-label="Sort products"
                value={activeSort}
                onChange={(event) => {
                  setSort(event.target.value);
                  updateUrl({ sort: event.target.value });
                }}
                className="max-w-[170px] bg-transparent py-1 font-semibold text-[#26382a] outline-none"
              >
                {sorts.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {mode !== "deals" && (
            <div
              className="mt-5 flex flex-wrap gap-2"
              aria-label="Filter by category"
            >
                {["All items", ...categories.map((item) => item.name)].map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setCategory(name);
                      updateUrl({ category: name });
                    }}
                    className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition duration-200 active:scale-[0.97] sm:text-sm ${
                      activeCategory === name
                        ? "bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_10px_24px_rgba(28,64,42,0.24)]"
                        : "border border-[#e2e7dc] bg-white/90 text-gray-600 hover:-translate-y-0.5 hover:border-[#a8c199] hover:text-[#234b35] hover:shadow-[0_8px_18px_rgba(28,54,34,0.07)]"
                    }`}
                  >
                    {name}
                    <span
                      className={`ml-2 rounded-full px-1.5 py-0.5 text-[10px] ${
                        activeCategory === name
                          ? "bg-white/20 text-white"
                          : "bg-[#eef4e6] text-[#3f5a46]"
                      }`}
                    >
                      {name === "All items"
                        ? base.length
                        : categories.find((item) => item.name === name)?.count ?? 0}
                    </span>
                  </button>
                ))}
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p
              className="inline-flex items-center gap-2 rounded-full border border-[#e2e7dc] bg-white/85 px-3 py-2 text-[11px] font-semibold text-[#3f5a46] shadow-[0_2px_10px_rgba(28,54,34,0.04)] sm:text-xs"
              aria-live="polite"
            >
              <span className="cuk-live-dot" aria-hidden />
              {mode === "deals" && (
                <BadgePercent size={13} className="text-[#dd7a55]" aria-hidden />
              )}
              Showing{" "}
              <span className="text-[#1f4531]">{visible.length}</span> of{" "}
              {favoritesOnly ? favorites.length : base.length}{" "}
              {mode === "deals" ? "deals" : "listings"}
              {activeCategory !== "All items" && ` in ${activeCategory}`}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFavoritesOnly((value) => !value)}
                aria-pressed={favoritesOnly}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition duration-200 active:scale-[0.97] sm:text-sm ${
                  favoritesOnly
                    ? "bg-gradient-to-br from-[#dd7a55] to-[#c25a38] text-white shadow-[0_10px_24px_rgba(194,90,56,0.26)]"
                    : "border border-[#e2e7dc] bg-white/90 text-gray-600 hover:-translate-y-0.5 hover:border-[#dd7a55] hover:text-[#c25a38]"
                }`}
              >
                <Heart size={15} fill={favoritesOnly ? "currentColor" : "none"} />
                Favourites {favorites.length > 0 && `(${favorites.length})`}
              </button>

              {hasFilters && (
                <button
                  onClick={reset}
                  className="rounded-full border border-[#e2e7dc] bg-white/70 px-4 py-2.5 text-xs font-semibold text-[#315e43] transition hover:border-[#8fae86] hover:bg-[#f4f8ef] sm:text-sm"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {visible.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
              {visible.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[28px] border border-dashed border-[#cfd9c4] bg-gradient-to-br from-white/80 to-[#f2f7ec] px-5 py-16 text-center">
              <span className="cuk-float mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-[#719267] shadow-[0_12px_30px_rgba(28,54,34,0.10)]">
                <Search size={28} />
              </span>
              <h2 className="mt-5 text-xl font-semibold tracking-tight text-[#234b35] sm:text-2xl">
                {favoritesOnly && favorites.length === 0
                  ? "No favourites saved yet"
                  : "No matching listings found"}
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {favoritesOnly
                  ? "Tap the heart on any listing to save it here."
                  : "Try a different keyword, category or sort option."}
              </p>
              <button onClick={reset} className={`${btnPrimary} mt-6`}>
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      <div className={`${panelDark} mt-12 px-6 py-10 text-center sm:px-10 sm:py-12`}>
        <span className="cuk-dots absolute inset-0 text-white" aria-hidden />
        <span
          className="cuk-blob right-[10%] top-[-40%] h-[230px] w-[230px] opacity-25"
          style={{ background: "#9ec77f" }}
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-xl font-semibold sm:text-3xl">
            Selling something good?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-white/75">
            Add a title, an honest condition and a fair price, and your listing
            joins this shelf.
          </p>
          <Link
            href="/sell"
            className="group mt-6 inline-flex items-center gap-3 rounded-full bg-[#c5dba9] px-6 py-3.5 text-sm font-semibold text-[#234b35] shadow-[0_14px_32px_rgba(197,219,169,0.26)] transition hover:-translate-y-1 hover:bg-white active:translate-y-0"
          >
            Start selling
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
