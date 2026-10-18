"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { countByCategory, type Category, type Product } from "@/app/lib/catalog";
import { useApp } from "@/app/lib/store";
import ProductCard from "./product-card";
import { btnGhost, btnPrimary, eyebrow, shell } from "./styles";

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
  { value: "deals", label: "Biggest discount" },
];

const sortValues = sorts.map((option) => option.value);

export default function Shop({
  products,
  categories,
  initialQuery,
  initialCategory,
  initialSort,
}: {
  products: Product[];
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
  initialSort: string;
}) {
  const { favorites } = useApp();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(() =>
    initialCategory && categories.some((item) => item.name === initialCategory)
      ? initialCategory
      : "All items"
  );
  const [sort, setSort] = useState(() =>
    sortValues.includes(initialSort) ? initialSort : "featured"
  );
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  function updateUrl(next: { q?: string; category?: string; sort?: string }) {
    const params = new URLSearchParams(window.location.search);

    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "All items") params.delete(key);
      else params.set(key, value);
    });

    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      search ? `${window.location.pathname}?${search}` : window.location.pathname
    );
  }

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesCategory =
          category === "All items" || product.category === category;

        const matchesSearch =
          !term ||
          [product.name, product.category, product.seller, product.location]
            .join(" ")
            .toLowerCase()
            .includes(term);

        const matchesFavorites = !favoritesOnly || favorites.includes(product.id);

        return matchesCategory && matchesSearch && matchesFavorites;
      })
      .sort((a, b) => {
        if (sort === "price-low") return a.price - b.price;
        if (sort === "price-high") return b.price - a.price;
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "deals") {
          const saving = (product: Product) =>
            product.oldPrice ? product.oldPrice - product.price : 0;
          return saving(b) - saving(a);
        }
        return 0;
      });
  }, [products, query, category, sort, favorites, favoritesOnly]);

  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>The full shelf</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Shop all listings
          </h1>
          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Search, filter and sort everything sellers have listed across Kenya.
          </p>
        </div>
        <Link href="/sell" className={btnGhost}>
          List an item
        </Link>
      </div>

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
            value={sort}
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

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2" aria-label="Filter by category">
        {["All items", ...categories.map((item) => item.name)].map((name) => (
          <button
            key={name}
            onClick={() => {
              setCategory(name);
              updateUrl({ category: name });
            }}
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium transition sm:text-sm ${
              category === name
                ? "bg-[#234b35] text-white"
                : "border border-[#e4e6de] bg-white text-gray-600 hover:border-[#234b35] hover:text-[#234b35]"
            }`}
          >
            {name}
            <span
              className={`ml-2 text-[10px] ${
                category === name ? "text-white/70" : "text-gray-400"
              }`}
            >
              {name === "All items"
                ? products.length
                : countByCategory(name)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-gray-500" aria-live="polite">
          Showing{" "}
          <span className="font-semibold text-[#26382a]">{visible.length}</span>{" "}
          of {favoritesOnly ? favorites.length : products.length}{" "}
          {favoritesOnly ? "favourites" : "products"}
          {category !== "All items" && ` in ${category}`}
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

          {(query || category !== "All items" || favoritesOnly || sort !== "featured") && (
            <button
              onClick={() => {
                setQuery("");
                setCategory("All items");
                setSort("featured");
                setFavoritesOnly(false);
                window.history.replaceState(null, "", window.location.pathname);
              }}
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
              : "No matching products found"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {favoritesOnly
              ? "Tap the heart on any product to save it here."
              : "Try a different keyword, category or sort option."}
          </p>
          <button
            onClick={() => {
              setQuery("");
              setCategory("All items");
              setSort("featured");
              setFavoritesOnly(false);
              window.history.replaceState(null, "", window.location.pathname);
            }}
            className={`${btnPrimary} mt-5`}
          >
            Clear filters
          </button>
        </div>
      )}

      <div className="mt-12 rounded-3xl bg-[#edf2e8] px-5 py-8 text-center sm:px-8">
        <h2 className="text-xl font-semibold text-[#234b35] sm:text-2xl">
          Selling something good?
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#40544a]">
          Create a listing in a minute and reach buyers searching Omni Market
          every day.
        </p>
        <Link href="/sell" className={`${btnPrimary} mt-5`}>
          Start selling
        </Link>
      </div>
    </main>
  );
}
