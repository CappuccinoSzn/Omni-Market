"use client";

import { useCallback } from "react";
import { readBrowserList, useBrowserList, writeBrowserList } from "./browser-store";
import type { CartLine } from "./store";

export type Listing = {
  id: string;
  title: string;
  category: string;
  price: number;
  condition: string;
  location: string;
  description: string;
  createdAt: string;
};

export type Order = {
  id: string;
  customerName: string;
  phone: string;
  county: string;
  address: string;
  total: number;
  itemCount: number;
  status: "Awaiting payment";
  createdAt: string;
};

const LISTINGS_KEY = "omni-market-listings";
const ORDERS_KEY = "omni-market-orders";

function decodeListings(raw: string | null): Listing[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? (parsed as Listing[]) : [];
  } catch {
    return [];
  }
}

function decodeOrders(raw: string | null): Order[] {
  try {
    const parsed: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function useListings() {
  const listings = useBrowserList<Listing>(LISTINGS_KEY, decodeListings);

  const addListing = useCallback(
    (listing: Omit<Listing, "id" | "createdAt">) => {
      const current = readBrowserList<Listing>(LISTINGS_KEY, decodeListings);
      const created: Listing = {
        ...listing,
        id: `LST-${String(current.length + 1).padStart(4, "0")}`,
        createdAt: new Date().toISOString(),
      };

      writeBrowserList(LISTINGS_KEY, [created, ...current]);
      return created;
    },
    []
  );

  const removeListing = useCallback((id: string) => {
    writeBrowserList(
      LISTINGS_KEY,
      readBrowserList<Listing>(LISTINGS_KEY, decodeListings).filter(
        (listing) => listing.id !== id
      )
    );
  }, []);

  return { listings, addListing, removeListing };
}

export function useOrders() {
  const orders = useBrowserList<Order>(ORDERS_KEY, decodeOrders);

  const placeOrder = useCallback(
    (details: {
      customerName: string;
      phone: string;
      county: string;
      address: string;
      lines: CartLine[];
      total: number;
    }) => {
      const current = readBrowserList<Order>(ORDERS_KEY, decodeOrders);
      const order: Order = {
        id: `OM-${Date.now().toString().slice(-6)}`,
        customerName: details.customerName,
        phone: details.phone,
        county: details.county,
        address: details.address,
        total: details.total,
        itemCount: details.lines.reduce((count, line) => count + line.quantity, 0),
        status: "Awaiting payment",
        createdAt: new Date().toISOString(),
      };

      writeBrowserList(ORDERS_KEY, [order, ...current]);
      return order;
    },
    []
  );

  return { orders, placeOrder };
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
