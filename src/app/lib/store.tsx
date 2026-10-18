"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { readBrowserList, useBrowserList, writeBrowserList } from "./browser-store";
import { getProduct, products, type Product } from "./catalog";
import { supabase } from "./supabase";

const CART_KEY = "omni-market-cart";
const FAVORITES_KEY = "omni-market-favorites";
const LEGACY_CART_KEYS = ["Omni Market-cart", "cuk-shop-cart"];
const LEGACY_FAVORITES_KEYS = ["cuk-shop-favorites"];

const readIds = (stored: string | null): number[] | null => {
  if (!stored) return null;

  try {
    const parsed: unknown = JSON.parse(stored);

    if (
      Array.isArray(parsed) &&
      parsed.every((id) => typeof id === "number" && getProduct(id))
    ) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

// Bags and favourites saved before the multi-page rebuild used other storage keys.
const readWithLegacy = (
  current: number[] | null,
  legacyKeys: string[]
): number[] => {
  if (current) return current;

  for (const key of legacyKeys) {
    const found = readIds(localStorage.getItem(key));
    if (found) return found;
  }

  return [];
};

const decodeCart = (raw: string | null) => readWithLegacy(readIds(raw), LEGACY_CART_KEYS);
const decodeFavorites = (raw: string | null) =>
  readWithLegacy(readIds(raw), LEGACY_FAVORITES_KEYS);

export type CartLine = Product & { quantity: number };

type AppValue = {
  cart: number[];
  cartItems: CartLine[];
  cartCount: number;
  cartTotal: number;
  addToCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  notice: string;
  notify: (message: string) => void;
  session: Session | null;
  authReady: boolean;
};

const AppContext = createContext<AppValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const cart = useBrowserList(CART_KEY, decodeCart);
  const favorites = useBrowserList(FAVORITES_KEY, decodeFavorites);
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(supabase === null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => setSession(nextSession)
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const notify = useCallback((message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  }, []);

  const addToCart = useCallback(
    (id: number) => {
      writeBrowserList(CART_KEY, [...readBrowserList(CART_KEY, decodeCart), id]);
      notify("Added to your bag");
    },
    [notify]
  );

  const decreaseQuantity = useCallback((id: number) => {
    const current = readBrowserList(CART_KEY, decodeCart);
    const index = current.indexOf(id);
    if (index === -1) return;

    writeBrowserList(
      CART_KEY,
      current.filter((_, position) => position !== index)
    );
  }, []);

  const removeFromCart = useCallback((id: number) => {
    writeBrowserList(
      CART_KEY,
      readBrowserList(CART_KEY, decodeCart).filter((item) => item !== id)
    );
  }, []);

  const clearCart = useCallback(() => writeBrowserList(CART_KEY, []), []);

  const toggleFavorite = useCallback((id: number) => {
    const current = readBrowserList(FAVORITES_KEY, decodeFavorites);

    writeBrowserList(
      FAVORITES_KEY,
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }, []);

  const cartItems = useMemo(
    () =>
      products
        .map((product) => ({
          ...product,
          quantity: cart.filter((id) => id === product.id).length,
        }))
        .filter((product) => product.quantity > 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  );

  const value: AppValue = {
    cart,
    cartItems,
    cartCount: cart.length,
    cartTotal,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    favorites,
    toggleFavorite,
    cartOpen,
    setCartOpen,
    notice,
    notify,
    session,
    authReady,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) throw new Error("useApp must be used inside AppProvider");

  return context;
}
