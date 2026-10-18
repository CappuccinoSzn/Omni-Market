"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, ShoppingBag, Truck } from "lucide-react";
import { useCartView, useFavoriteProducts } from "@/app/lib/cart";
import { formatDate, money } from "@/app/lib/format";
import { useListings, useOrders } from "@/app/lib/local-data";
import { useApp } from "@/app/lib/store";
import { supabase } from "@/app/lib/supabase";
import ProductCard from "./product-card";
import ProductMedia from "./product-media";
import { btnGhost, btnPrimary, card, eyebrow, noticePanel } from "./styles";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "listings", label: "My listings" },
  { id: "orders", label: "Orders" },
  { id: "favorites", label: "Favourites" },
  { id: "account", label: "Account" },
];

const tabIds = tabs.map((tab) => tab.id);

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
    { label: "Saved listings", value: String(listings.length), href: "/dashboard?tab=listings" },
    { label: "Orders recorded", value: String(orders.length), href: "/dashboard?tab=orders" },
    { label: "Favourites", value: String(favoriteProducts.length), href: "/dashboard?tab=favorites" },
    { label: "Bag value", value: ready ? money(subtotal) : "—", href: "/cart" },
  ];

  return (
    <main className="mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className={eyebrow}>Your space</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Your dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-500">
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

      <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist">
        {tabs.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={tab === item.id}
            onClick={() => setTab(item.id)}
            className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition ${
              tab === item.id
                ? "bg-[#234b35] text-white"
                : "border border-[#e4e6de] bg-white text-gray-600 hover:border-[#234b35] hover:text-[#234b35]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === "overview" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="rounded-3xl border border-[#e6e8df] bg-white p-5 transition hover:-translate-y-1 hover:border-[#cbd7c2]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[1.5px] text-gray-500">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-2xl font-bold text-[#234b35]">
                    {stat.value}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className={card}>
                <h2 className="text-lg font-semibold">In your bag</h2>
                {!ready ? (
                  <p className="mt-3 text-sm text-gray-500">
                    Matching saved ids with live listings...
                  </p>
                ) : lines.length === 0 ? (
                  <p className="mt-3 text-sm text-gray-500">
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
                      <li key={line.product.id} className="flex items-center gap-3">
                        <div className="w-12 shrink-0">
                          <ProductMedia
                            product={line.product}
                            rounded="rounded-xl"
                            className="h-12"
                          />
                        </div>
                        <Link
                          href={`/products/${line.product.id}`}
                          className="flex-1 font-medium hover:text-[#234b35]"
                        >
                          {line.product.name}
                        </Link>
                        <span className="text-gray-500">×{line.quantity}</span>
                        <span className="font-semibold">
                          {money(line.product.price * line.quantity)}
                        </span>
                      </li>
                    ))}
                    <li className="flex justify-between border-t border-[#e6e8df] pt-3 text-sm">
                      <span className="text-gray-500">
                        {itemCount} item{itemCount === 1 ? "" : "s"} in the bag
                      </span>
                      <span className="font-semibold">{money(subtotal)}</span>
                    </li>
                  </ul>
                )}
                <Link href="/checkout" className={`${btnPrimary} mt-5`}>
                  Go to checkout
                </Link>
              </div>

              <div className={card}>
                <h2 className="text-lg font-semibold">Next steps for sellers</h2>
                <ol className="mt-4 space-y-3 text-sm text-gray-600">
                  <li>1. Write an honest title, condition and price.</li>
                  <li>2. Keep your listing notes clear — there is no in-app chat.</li>
                  <li>3. Agree the handover point and payment before you travel.</li>
                </ol>
                <Link href="/help" className={`${btnGhost} mt-5`}>
                  Read seller guide
                </Link>
              </div>
            </div>
          </>
        )}

        {tab === "listings" && (
          <div className="space-y-4">
            {listings.length === 0 ? (
              <div className={`${card} text-center`}>
                <ShoppingBag size={36} className="mx-auto text-[#719267]" />
                <h2 className="mt-4 text-xl font-semibold">No listings yet</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Create your first listing and it will appear here with its
                  reference number.
                </p>
                <Link href="/sell" className={`${btnPrimary} mt-5`}>
                  Create a listing
                </Link>
              </div>
            ) : (
              listings.map((listing) => (
                <article
                  key={listing.id}
                  className="flex flex-wrap items-start gap-4 rounded-3xl border border-[#e6e8df] bg-white p-5"
                >
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
                    <p className="text-lg font-bold text-[#234b35]">
                      {money(listing.price)}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-[#edf2e8] px-3 py-1.5 text-xs font-semibold text-[#315e43]">
                      Draft on this device
                    </span>
                    <button
                      onClick={() => removeListing(listing.id)}
                      className="mt-3 block text-xs font-medium text-red-600 hover:underline"
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
              <div className={`${card} text-center`}>
                <Truck size={36} className="mx-auto text-[#719267]" />
                <h2 className="mt-4 text-xl font-semibold">No orders yet</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Orders you record at checkout are listed here with their totals.
                  They stay on this device and no payment has been taken.
                </p>
                <Link href="/products" className={`${btnPrimary} mt-5`}>
                  Find something to buy
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-3xl border border-[#e6e8df] bg-white p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[1.5px] text-gray-400">
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
                      <p className="text-lg font-bold">{money(order.total)}</p>
                      <span className="mt-2 inline-block rounded-full bg-[#fdf0e2] px-3 py-1.5 text-xs font-semibold text-[#8a5a1f]">
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
              <div className={`${card} text-center`}>
                <Heart size={36} className="mx-auto text-[#719267]" />
                <h2 className="mt-4 text-xl font-semibold">Nothing saved yet</h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  Tap the heart on any listing to keep it here for later.
                </p>
                <Link href="/products" className={`${btnPrimary} mt-5`}>
                  Browse listings
                </Link>
              </div>
            ) : !ready ? (
              <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
                {favorites.slice(0, 4).map((id) => (
                  <div
                    key={id}
                    className="h-[320px] animate-pulse rounded-[26px] bg-[#eef1e9]"
                  />
                ))}
              </div>
            ) : favoriteProducts.length === 0 ? (
              <div className={`${card} text-center`}>
                <Heart size={36} className="mx-auto text-[#719267]" />
                <h2 className="mt-4 text-xl font-semibold">
                  Saved listings are no longer live
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
                  {favorites.length} saved{" "}
                  {favorites.length === 1 ? "reference" : "references"} do not
                  match a published listing.
                </p>
                <button
                  onClick={() => favorites.forEach((id) => toggleFavorite(id))}
                  className={`${btnGhost} mt-5`}
                >
                  Clear saved references
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 lg:grid-cols-4">
                  {favoriteProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
                <button
                  onClick={() => favorites.forEach((id) => toggleFavorite(id))}
                  className="mt-6 text-xs font-semibold text-gray-500 underline underline-offset-4 hover:text-red-600"
                >
                  Clear all favourites
                </button>
              </>
            )}
          </div>
        )}

        {tab === "account" && (
          <div className={`${card} max-w-2xl`}>
            <h2 className="text-lg font-semibold">Account</h2>

            {session ? (
              <p className="mt-3 text-sm text-gray-600">
                Signed in as <strong>{session.user.email}</strong>. Your
                listings, orders and favourites are stored on this device until
                account syncing is enabled.
              </p>
            ) : authReady ? (
              <>
                <p className="mt-3 text-sm text-gray-600">
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
              <p className="mt-3 text-sm text-gray-500">Checking your session...</p>
            )}

            {!supabase && (
              <div className={`${noticePanel} mt-5`}>
                Supabase credentials are not configured for this environment, so
                account sign-in is disabled. Shopping, listings and orders still
                work.
              </div>
            )}

            <dl className="mt-6 grid gap-4 border-t border-[#e6e8df] pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-gray-500">Saved listings</dt>
                <dd className="mt-1 font-semibold">{listings.length}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Orders recorded</dt>
                <dd className="mt-1 font-semibold">{orders.length}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Favourites</dt>
                <dd className="mt-1 font-semibold">{favoriteProducts.length}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Bag value</dt>
                <dd className="mt-1 font-semibold">
                  {ready ? money(subtotal) : "Loading"}
                </dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </main>
  );
}
