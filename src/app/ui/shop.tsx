"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
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
import { btnGhost, btnPrimary, card, eyebrow, noticePanel, shell } from "./styles";

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
    copy: "Search, filter and sort every listing sellers have published on Omni Market.",
  },
  new: {
    kicker: "Just listed",
    title: "Fresh arrivals",
    copy: "The newest listings, most recent first, straight from the sellers' shelf.",
  },
  deals: {
    kicker: "Price drops",
    title: "Deals and reductions",
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

  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>{headline.kicker}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {headline.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">{headline.copy}</p>
        </div>
        <Link href="/sell" className={btnGhost}>
          List an item
        </Link>
      </div>

      {status === "error" && (
        <div className={`${noticePanel} mt-8`}>
          <p className="font-semibold">Live listings could not be loaded.</p>
          <p className="mt-1 text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-4`}
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      )}

      {status === "loading" && (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="h-[50px] animate-pulse rounded-full bg-[#eef1e9]" />
            <div className="h-[50px] animate-pulse rounded-full bg-[#eef1e9]" />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[320px] animate-pulse rounded-[26px] bg-[#eef1e9]"
              />
            ))}
          </div>
        </>
      )}

      {status === "ready" && base.length === 0 && (
        <div className={`${card} mt-8 text-center`}>
          <h2 className="text-lg font-semibold">
            {mode === "deals"
              ? "No reduced listings right now"
              : "No active listings yet"}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            {mode === "deals"
              ? "Every active listing is at the price the seller first set. Check back after the next price drop."
              : "Sellers have not published a listing that matches this page. Be the first to add one."}
          </p>
          <Link href="/sell" className={`${btnPrimary} mt-5`}>
            Start selling
          </Link>
        </div>
      )}

      {status === "ready" && base.length > 0 && (
        <>
          <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
            <label className="flex items-center gap-2 rounded-full border border-[#e2e7dc] bg-white px-4 py-3 shadow-sm focus-within:border-[#719477]">
              <Search size={18} className="shrink-0 text-gray-400" />
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  updateUrl({ q: event.target.value });
                }}
                placeholder="Search products, sellers or towns..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </label>

            <label className="flex items-center gap-2 rounded-full border border-[#e4e6de] bg-white px-4 py-3 text-sm text-gray-600">
              <SlidersHorizontal size={16} />
              Sort
              <select
                aria-label="Sort products"
                value={activeSort}
                onChange={(event) => {
                  setSort(event.target.value);
                  updateUrl({ sort: event.target.value });
                }}
                className="max-w-[170px] bg-transparent font-semibold text-[#26382a] outline-none"
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
              className="mt-5 flex gap-2 overflow-x-auto pb-2"
              aria-label="Filter by category"
            >
              {["All items", ...categories.map((item) => item.name)].map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setCategory(name);
                    updateUrl({ category: name });
                  }}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium transition sm:text-sm ${
                    activeCategory === name
                      ? "bg-[#234b35] text-white"
                      : "border border-[#e4e6de] bg-white text-gray-600 hover:border-[#234b35] hover:text-[#234b35]"
                  }`}
                >
                  {name}
                  <span
                    className={`ml-2 text-[10px] ${
                      activeCategory === name ? "text-white/70" : "text-gray-400"
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

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-500" aria-live="polite">
              Showing{" "}
              <span className="font-semibold text-[#26382a]">{visible.length}</span> of{" "}
              {favoritesOnly ? favorites.length : base.length} {mode === "deals" ? "deals" : "listings"}
              {activeCategory !== "All items" && ` in ${activeCategory}`}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setFavoritesOnly((value) => !value)}
                aria-pressed={favoritesOnly}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  favoritesOnly
                    ? "border-[#234b35] bg-[#234b35] text-white"
                    : "border-[#e4e6de] bg-white text-gray-600 hover:border-[#234b35]"
                }`}
              >
                <Heart size={15} fill={favoritesOnly ? "currentColor" : "none"} />
                Favourites {favorites.length > 0 && `(${favorites.length})`}
              </button>

              {hasFilters && (
                <button
                  onClick={reset}
                  className="rounded-full px-3 py-2 text-xs font-semibold text-[#315e43] underline underline-offset-4"
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
            <div className="mt-8 rounded-3xl border border-dashed border-[#dfe3d9] bg-white/70 px-5 py-16 text-center">
              <Search className="mx-auto text-gray-400" size={30} />
              <h2 className="mt-4 text-lg font-semibold">
                {favoritesOnly && favorites.length === 0
                  ? "No favourites saved yet"
                  : "No matching listings found"}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                {favoritesOnly
                  ? "Tap the heart on any listing to save it here."
                  : "Try a different keyword, category or sort option."}
              </p>
              <button onClick={reset} className={`${btnPrimary} mt-5`}>
                Clear filters
              </button>
            </div>
          )}
        </>
      )}

      <div className="mt-12 rounded-3xl bg-[#edf2e8] px-5 py-8 text-center sm:px-8">
        <h2 className="text-xl font-semibold text-[#234b35] sm:text-2xl">
          Selling something good?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#40544a]">
          Add a title, an honest condition and a fair price, and your listing
          joins this shelf.
        </p>
        <Link href="/sell" className={`${btnPrimary} mt-5`}>
          Start selling
        </Link>
      </div>
    </main>
  );
}
