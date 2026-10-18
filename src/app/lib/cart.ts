"use client";

import { useMemo } from "react";
import { useProducts, type Product } from "./catalog";
import { useApp } from "./store";

export type CartLine = { product: Product; quantity: number };

// Bag contents are stored as product ids on this device; prices and names come
// from the live Supabase listings, so a bag never shows invented data.
export function useCartView() {
  const { cart } = useApp();
  const { status, products, error } = useProducts();

  return useMemo(() => {
    const counts = new Map<number, number>();
    cart.forEach((id) => counts.set(id, (counts.get(id) ?? 0) + 1));

    const lines: CartLine[] = [];

    products.forEach((product) => {
      const quantity = counts.get(product.id);

      if (quantity) {
        lines.push({ product, quantity });
        counts.delete(product.id);
      }
    });

    const unavailable = [...counts.values()].reduce((total, n) => total + n, 0);
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce(
      (total, line) => total + line.product.price * line.quantity,
      0
    );

    return {
      lines,
      itemCount,
      subtotal,
      unavailable,
      sellers: new Set(lines.map((line) => line.product.seller)).size,
      ready: status === "ready",
      status,
      error,
    };
  }, [cart, products, status, error]);
}

export function useFavoriteProducts(): Product[] {
  const { favorites } = useApp();
  const { products, status } = useProducts();

  return useMemo(() => {
    if (status !== "ready") return [];

    return products.filter((product) => favorites.includes(product.id));
  }, [favorites, products, status]);
}
