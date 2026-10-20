"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  PackageOpen,
  ReceiptText,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { useCartView, useFavoriteProducts } from "@/app/lib/cart";
import { formatDate, money } from "@/app/lib/format";
import { useListings, useOrders } from "@/app/lib/local-data";
import { useApp } from "@/app/lib/store";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "./product-card";
import ProductMedia from "./product-media";
import {
  btnGhost,
  btnPrimary,
  card,
  kicker,
  noticePanel,
  rule,
} from "./styles";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "listings", label: "My listings" },
  { id: "orders", label: "Orders" },
  { id: "favorites", label: "Favourites" },
  { id: "account", label: "Account" },
];

const tabIds = tabs.map((tab) => tab.id);

function EmptyPanel({
  emoji,
  title,
  body,
  cta,
  href,
  children,
}: {
  emoji: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[30px] border border-dashed border-[#cfd9c4] bg-gradient-to-br from-[#f2f7ec] to-white px-6 py-14 text-center">
      <span
        className="cuk-blob right-[6%] top-[-35%] h-[200px] w-[200px] opacity-30"
        style={{ background: "#9ec77f" }}
        aria-hidden
      />
      <span className="cuk-float relative mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-[0_14px_34px_rgba(28,54,34,0.12)]">
        {emoji}
      </span>
      <h2 className="relative mt-5 text-xl font-semibold tracking-tight sm:text-2xl">
        {title}
      </h2>
      <p className="relative mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
        {body}
      </p>
      <Link href={href} className={`${btnPrimary} relative mt-6`}>
        {cta} <ArrowRight size={16} />
      </Link>
      {children && <div className="relative mt-4">{children}</div>}
    </div>
  );
}

export default function Dashboard({ initialTab }: { initialTab: string }) {
  const { session, authReady, favorites, toggleFavorite } = useApp();
  const { lines, itemCount, subtotal, ready } = useCartView();
  const favoriteProducts = useFavoriteProducts();
  const { listings, removeListing } = useListings();
  const { orders } = useOrders();
  const [tab, setTab] = useState(() =>
    tabIds.includes(initialTab) ? initialTab : "overview"
  );
  const [signingOut, setSigningOut] = useState(false);

  async function signOut() {
    if (!supabase) return;
    setSigningOut(true);
    await supabase.auth.signOut();
    setSigningOut(false);
  }

  const stats = [
    { label: "Saved listings", value: String(listings.length), href: "/dashboard?tab=listings", icon: Store, tint: "#2f6b46" },
    { label: "Orders recorded", value: String(orders.length), href: "/dashboard?tab=orders", icon: Truck, tint: "#6fa8c9" },
    { label: "Favourites", value: String(favoriteProducts.length), href: "/dashboard?tab=favorites", icon: Heart, tint: "#dd7a55" },
    { label: "Bag value", value: ready ? money(subtotal) : "—", href: "/cart", icon: ShoppingBag, tint: "#f0b429" },
  ];

  return (
    <main className="relative mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <span
        className="cuk-blob right-[-6%] top-4 h-[250px] w-[250px] opacity-30"
        style={{ background: "#9ec77f" }}
        aria-hidden
      />

      <div className="relative flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={kicker}>
            <span className="cuk-live-dot" aria-hidden />
            Your space
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              dashboard
            </span>
          </h1>
          <div className={rule} />
          <p className="mt-4 text-sm text-gray-500">
            {session
              ? `Signed in as ${session.user.email ?? session.user.id}`
              : "Everything here is stored on this device. Sign in to keep it with your account."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/sell" className={btnPrimary}>
            New listing <ArrowRight size={16} />
          </Link>
          {session ? (
            <button
              onClick={signOut}
              disabled={signingOut}
              className={btnGhost}
            >
              {signingOut ? "Signing out..." : "Sign out"}
            </button>
          ) : (
            <Link href="/login" className={btnGhost}>
              Sign in
            </Link>
          )}
        </div>
      </div>

      <div className="relative mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist">
        {tabs.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200 active:scale-[0.97] ${
              tab === item.id
                ? "bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_10px_24px_rgba(28,64,42,0.22)]"
                : "border border-[#e2e7dc] bg-white/90 text-gray-600 hover:-translate-y-0.5 hover:border-[#a8c199] hover:text-[#234b35]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative mt-8"
      >
        {tab === "overview" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                >
                  <Link
                    href={stat.href}
                    className="cuk-sheen-host group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-5 shadow-[0_8px_24px_rgba(28,54,34,0.05)] transition duration-300 hover:border-[#c7d8b8] hover:shadow-[0_22px_44px_rgba(28,54,34,0.12)]"
                  >
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-2xl text-white shadow-[0_8px_18px_rgba(28,54,34,0.18)] transition group-hover:-translate-y-0.5 group-hover:scale-105"
                      style={{ background: stat.tint }}
                    >
                      <stat.icon size={18} />
                    </span>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[1.5px] text-gray-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-3xl font-black tracking-tight text-transparent">
                      {stat.value}
                    </p>
                    <span className="cuk-sheen rounded-[26px]" aria-hidden />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className={`${card} relative overflow-hidden`}>
                <p className={kicker}>
                  <ShoppingBag size={12} className="text-[#315e43]" />
                  In your bag
                </p>
                {!ready ? (
                  <div className="mt-4 space-y-3">
                    <div className="cuk-skeleton h-12 rounded-2xl" />
                    <div className="cuk-skeleton h-12 rounded-2xl" />
                  </div>
                ) : lines.length === 0 ? (
                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Your bag is empty.{" "}
                    <Link
                      href="/products"
                      className="font-semibold text-[#234b35] hover:underline"
                    >
                      Browse listings
                    </Link>
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3 text-sm">
                    {lines.slice(0, 4).map((line) => (
                      <li
                        key={line.product.id}
                        className="flex items-center gap-3 rounded-2xl border border-[#eef1e7] bg-white/80 p-2 transition hover:border-[#d7e3c9]"
                      >
                        <div className="w-12 shrink-0 overflow-hidden rounded-xl">
                          <ProductMedia product={line.product} rounded="" className="h-12" />
                        </div>
                        <Link
                          href={`/products/${line.product.id}`}
                          className="flex-1 font-medium transition hover:text-[#315e43]"
                        >
                          {line.product.name}
                        </Link>
                        <span className="text-gray-500">×{line.quantity}</span>
                        <span className="font-semibold text-[#1f4531]">
                          {money(line.product.price * line.quantity)}
                        </span>
                      </li>
                    ))}
                    <li className="flex justify-between border-t border-[#e6e9dd] pt-3 text-sm">
                      <span className="text-gray-500">
                        {itemCount} item{itemCount === 1 ? "" : "s"} in the bag
                      </span>
                      <span className="font-bold text-[#1f4531]">
                        {money(subtotal)}
                      </span>
                    </li>
                  </ul>
                )}
                <Link href="/checkout" className={`${btnPrimary} mt-5`}>
                  Go to checkout <ArrowRight size={16} />
                </Link>
              </div>

              <div className={`${card} relative overflow-hidden`}>
                <span
                  className="cuk-blob right-[-16%] top-[-40%] h-[200px] w-[200px] opacity-25"
                  style={{ background: "#a2bd70" }}
                  aria-hidden
                />
                <div className="relative">
                  <p className={kicker}>
                    <Sparkles size={12} className="text-[#315e43]" />
                    Next steps for sellers
                  </p>
                  <ol className="mt-4 space-y-3 text-sm text-gray-600">
                    {[
                      "Write an honest title, condition and price.",
                      "Keep your listing notes clear — there is no in-app chat.",
                      "Agree the handover point and payment before you travel.",
                    ].map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-[11px] font-bold text-[#c5dba9]">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <Link href="/help" className={`${btnGhost} mt-6`}>
                    Read seller guide
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "listings" && (
          <div className="space-y-4">
            {listings.length === 0 ? (
              <EmptyPanel
                emoji="🧺"
                title="No listings yet"
                body="Create your first listing and it will appear here with its reference number."
                cta="Create a listing"
                href="/sell"
              />
            ) : (
              listings.map((listing) => (
                <article
                  key={listing.id}
                  className="relative flex flex-wrap items-start gap-4 overflow-hidden rounded-[26px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-5 pl-7 shadow-[0_8px_24px_rgba(28,54,34,0.05)] transition duration-300 hover:border-[#c7d8b8] hover:shadow-[0_20px_42px_rgba(28,54,34,0.11)]"
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-[#234b35] via-[#719477] to-[#c5dba9]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[1.5px] text-gray-400">
                      {listing.id} · {formatDate(listing.createdAt)}
                    </p>
                    <h2 className="mt-2 text-lg font-semibold">{listing.title}</h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {listing.category} · {listing.condition} · {listing.location}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {listing.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-xl font-black text-transparent">
                      {money(listing.price)}
                    </p>
                    <span className="mt-2 inline-block rounded-full border border-[#dfead0] bg-[#edf2e8] px-3 py-1.5 text-[11px] font-semibold text-[#315e43]">
                      Draft on this device
                    </span>
                    <button
                      onClick={() => removeListing(listing.id)}
                      className="mt-3 block text-xs font-semibold text-red-600/80 transition hover:bg-[#fdf1f1] hover:text-red-700"
                    >
                      Delete listing
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <EmptyPanel
                emoji="📦"
                title="No orders yet"
                body="Orders you record at checkout are listed here with their totals. They stay on this device and no payment has been taken."
                cta="Find something to buy"
                href="/products"
              />
            ) : (
              orders.map((order) => (
                <article
                  key={order.id}
                  className="relative overflow-hidden rounded-[26px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-5 shadow-[0_8px_24px_rgba(28,54,34,0.05)] transition duration-300 hover:border-[#c7d8b8] hover:shadow-[0_20px_42px_rgba(28,54,34,0.11)]"
                >
                  <span className="cuk-dots absolute inset-0 text-[#234b35]" aria-hidden />
                  <div className="relative flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[1.5px] text-gray-400">
                        <ReceiptText size={13} className="text-[#719267]" />
                        {order.id} · {formatDate(order.createdAt)}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold">
                        {order.itemCount} item{order.itemCount === 1 ? "" : "s"} ·{" "}
                        {order.county}
                      </h2>
                      <p className="mt-1 text-sm text-gray-500">
                        {order.method}: {order.address}
                      </p>
                      {order.notes && (
                        <p className="mt-2 text-xs leading-5 text-gray-500">
                          Notes: {order.notes}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#1f4531]">
                        {money(order.total)}
                      </p>
                      <span className="mt-2 inline-block rounded-full border border-[#f2ddc2] bg-[#fdf0e2] px-3 py-1.5 text-[11px] font-semibold text-[#8a5a1f]">
                        <span className="cuk-live-dot mr-1.5" aria-hidden />
                        {order.status}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        )}

        {tab === "favorites" && (
          <div>
            {favorites.length === 0 ? (
              <EmptyPanel
                emoji="💚"
                title="Nothing saved yet"
                body="Tap the heart on any listing to keep it here for later."
                cta="Browse listings"
                href="/products"
              />
            ) : !ready ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
                {favorites.slice(0, 4).map((id) => (
                  <div key={id} className="cuk-skeleton h-[320px] rounded-[26px]" />
                ))}
              </div>
            ) : favoriteProducts.length === 0 ? (
              <EmptyPanel
                emoji="🫥"
                title="Saved listings are no longer live"
                body={`${favorites.length} saved ${favorites.length === 1 ? "reference" : "references"} do not match a published listing.`}
                cta="Browse live listings"
                href="/products"
              >
                <button
                  onClick={() => favorites.forEach((id) => toggleFavorite(id))}
                  className={btnGhost}
                >
                  Clear saved references
                </button>
              </EmptyPanel>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
                  {favoriteProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
                <button
                  onClick={() => favorites.forEach((id) => toggleFavorite(id))}
                  className="mt-6 rounded-full border border-[#e2e7dc] bg-white/80 px-4 py-2.5 text-xs font-semibold text-gray-500 transition hover:-translate-y-0.5 hover:border-[#dd7a55] hover:text-[#c25a38] sm:text-sm"
                >
                  Clear all favourites
                </button>
              </>
            )}
          </div>
        )}

        {tab === "account" && (
          <div className={`${card} relative max-w-2xl overflow-hidden`}>
            <span
              className="cuk-blob left-[-12%] top-[-45%] h-[200px] w-[200px] opacity-20"
              style={{ background: "#6fa8c9" }}
              aria-hidden
            />
            <div className="relative">
              <p className={kicker}>
                <PackageOpen size={12} className="text-[#315e43]" />
                Account
              </p>

              {session ? (
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  Signed in as <strong>{session.user.email}</strong>. Your
                  listings, orders and favourites are stored on this device until
                  account syncing is enabled.
                </p>
              ) : authReady ? (
                <>
                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    You are browsing as a guest. Everything still works — your bag
                    and favourites stay on this device.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href="/login" className={btnPrimary}>
                      Sign in
                    </Link>
                    <Link href="/register" className={btnGhost}>
                      Create an account
                    </Link>
                  </div>
                </>
              ) : (
                <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <span className="cuk-live-dot" aria-hidden />
                  Checking your session...
                </p>
              )}

              {!supabase && (
                <div className={`${noticePanel} mt-5`}>
                  Supabase credentials are not configured for this environment, so
                  account sign-in is disabled. Shopping, listings and orders still
                  work.
                </div>
              )}

              <dl className="mt-6 grid gap-4 border-t border-[#e6e9dd] pt-6 text-sm sm:grid-cols-2">
                {[
                  { term: "Saved listings", value: listings.length },
                  { term: "Orders recorded", value: orders.length },
                  { term: "Favourites", value: favoriteProducts.length },
                  {
                    term: "Bag value",
                    value: ready ? money(subtotal) : "Loading",
                  },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="rounded-2xl border border-[#eef1e7] bg-white/80 px-4 py-3"
                  >
                    <dt className="text-gray-500">{row.term}</dt>
                    <dd className="mt-1 text-base font-bold text-[#1f4531]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
