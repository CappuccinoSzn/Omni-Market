"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { discountPercent } from "./format";
import { supabase } from "./supabase";

// Mirrors the live public.products table. Columns the table does not have
// (rating, stock, slug, description…) deliberately do not appear here.
type Row = {
  id: number;
  name: string;
  category: string;
  price_kes: number;
  old_price_kes: number | null;
  condition: string;
  seller: string;
  location: string;
  image_url: string | null;
  color: string | null;
  badge: string | null;
  is_active: boolean;
  created_at: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number | null;
  condition: string;
  seller: string;
  location: string;
  image: string | null;
  color: string | null;
  badge: string | null;
  listedAt: string;
};

export type CategorySummary = { name: string; count: number };

type ProductsState = {
  status: "loading" | "ready" | "error";
  products: Product[];
  error: string | null;
};

const toProduct = (row: Row): Product => ({
  id: row.id,
  name: row.name,
  category: row.category,
  price: row.price_kes,
  oldPrice: row.old_price_kes,
  condition: row.condition,
  seller: row.seller,
  location: row.location,
  image: row.image_url,
  color: row.color,
  badge: row.badge,
  listedAt: row.created_at,
});

const EMPTY_STATE: ProductsState = { status: "loading", products: [], error: null };

let state = EMPTY_STATE;
let inFlight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function commit(next: ProductsState) {
  state = next;
  listeners.forEach((listener) => listener());
}

export function loadProducts(force = false): Promise<void> {
  if (state.status === "ready" && !force) return Promise.resolve();
  if (inFlight) return inFlight;

  if (!supabase) {
    commit({
      status: "error",
      products: [],
      error: "Supabase credentials are not configured, so live listings cannot load.",
    });

    return Promise.resolve();
  }

  const client = supabase;

  commit({ ...state, status: "loading", error: null });

  const run = async (): Promise<void> => {
    const { data, error } = await client
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      commit({ status: "error", products: [], error: error.message });

      return;
    }

    commit({ status: "ready", products: (data ?? []).map(toProduct), error: null });
  };

  inFlight = run().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

export function useProducts(): ProductsState {
  const subscribe = useCallback((listener: () => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const snapshot = useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY_STATE
  );

  useEffect(() => {
    loadProducts();
  }, []);

  return snapshot;
}

export const findProduct = (products: Product[], id: number) =>
  products.find((product) => product.id === id) ?? null;

export const categorySummary = (products: Product[]): CategorySummary[] => {
  const counts = new Map<string, number>();

  products.forEach((product) =>
    counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
  );

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export const dealProducts = (products: Product[]) =>
  products.filter((product) => discountPercent(product.price, product.oldPrice) > 0);

export const badgeProducts = (products: Product[]) =>
  products.filter((product) => product.badge !== null);

export const sellerNames = (products: Product[]) => [
  ...new Set(products.map((product) => product.seller)),
];

export const relatedProducts = (products: Product[], product: Product) => {
  const others = products.filter((item) => item.id !== product.id);
  const sameCategory = others.filter((item) => item.category === product.category);

  return [...sameCategory, ...others].slice(0, 4);
};

// Presentation only: a labelled tile for listings that have no image_url yet.
const categoryTiles: Record<string, { emoji: string; from: string; to: string }> = {
  Electronics: { emoji: "🎧", from: "#dbe7ff", to: "#f4f8ff" },
  Fashion: { emoji: "👟", from: "#ffe2ec", to: "#fff4f8" },
  "Home & Living": { emoji: "🪴", from: "#dcf2df", to: "#f3faf4" },
  Books: { emoji: "📚", from: "#ffeed2", to: "#fff8ec" },
  Sports: { emoji: "⚽", from: "#d9f2f1", to: "#effafa" },
};

export const categoryTile = (name: string) =>
  categoryTiles[name] ?? { emoji: "🧺", from: "#e7e9e1", to: "#f6f7f3" };
