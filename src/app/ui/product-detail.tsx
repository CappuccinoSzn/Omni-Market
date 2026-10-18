"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  findProduct,
  loadProducts,
  relatedProducts,
  useProducts,
} from "@/app/lib/catalog";
import { discountPercent, money } from "@/app/lib/format";
import { useApp } from "@/app/lib/store";
import ProductCard from "./product-card";
import ProductMedia from "./product-media";
import { btnGhost, btnPrimary, card, chip, eyebrow, noticePanel } from "./styles";

export default function ProductDetail({ id }: { id: number }) {
  const router = useRouter();
  const { addToCart, favorites, toggleFavorite, setCartOpen } = useApp();
  const { status, products, error } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const product = status === "ready" ? findProduct(products, id) : null;

  if (status === "error") {
    return (
      <main className="mx-auto w-full max-w-[720px] px-4 py-16 sm:px-8">
        <div className={noticePanel}>
          <p className="font-semibold">This listing could not be loaded.</p>
          <p className="mt-1 text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-4`}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (status === "loading") {
    return (
      <main className="mx-auto grid w-full max-w-[1360px] gap-8 px-4 py-14 lg:grid-cols-2 lg:px-12">
        <div className="h-[320px] animate-pulse rounded-[28px] bg-[#eceee6] sm:h-[520px]" />
        <div className="space-y-4">
          <div className="h-6 w-32 animate-pulse rounded-full bg-[#eceee6]" />
          <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-[#eceee6]" />
          <div className="h-6 w-40 animate-pulse rounded-full bg-[#eceee6]" />
          <div className="h-24 w-full animate-pulse rounded-2xl bg-[#eceee6]" />
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-[720px] px-4 py-20 text-center sm:px-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          This listing is no longer here
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          It may have been sold or taken down by the seller. Numbers like #{id}
          point at live listings only.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/products" className={btnPrimary}>
            Browse all listings
          </Link>
          <Link href="/categories" className={btnGhost}>
            Explore categories
          </Link>
        </div>
      </main>
    );
  }

  const isFavorite = favorites.includes(product.id);
  const save = product.oldPrice
    ? discountPercent(product.price, product.oldPrice)
    : 0;
  const related = relatedProducts(products, product).filter(
    (item) => item.id !== product.id
  );
  const listingId = product.id;

  const addMany = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(listingId);
    setCartOpen(true);
  };

  const buyNow = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(listingId);
    router.push("/checkout");
  };

  return (
    <main className="mx-auto w-full max-w-[1360px] px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
      <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link href="/" className="hover:text-[#234b35]">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-[#234b35]">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/products?category=${encodeURIComponent(product.category)}`}
          className="hover:text-[#234b35]"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="font-medium text-[#26382a]">{product.name}</span>
      </nav>

      <div className="mt-7 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="relative overflow-hidden rounded-[28px] ring-1 ring-black/[0.03]">
          <ProductMedia
            product={product}
            rounded="rounded-[28px]"
            className="h-[320px] sm:h-[520px]"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold text-[#234b35] shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className={`${chip} hover:border-[#234b35] hover:text-[#234b35]`}
            >
              {product.category}
            </Link>
            <span className={chip}>{product.condition}</span>
            <span className={chip}>{product.location}</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-[#234b35]">
              {money(product.price)}
            </span>
            {product.oldPrice !== null && product.oldPrice > product.price && (
              <span className="rounded-full bg-[#edf2e8] px-3 py-1.5 text-xs font-semibold text-[#315e43]">
                Was {money(product.oldPrice)} · {save}% off
              </span>
            )}
          </div>

          <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
            The seller listed this as {product.condition.toLowerCase()} and has
            not added a longer description yet. Ask a question below for
            measurements, availability or the reason for the price.
          </p>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-[#dfe3d9] bg-white px-3 py-2">
              <button
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                aria-label="Decrease quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3d9] hover:border-[#234b35]"
              >
                −
              </button>
              <span className="min-w-6 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3d9] hover:border-[#234b35]"
              >
                +
              </button>
            </div>
            <p className="text-xs text-gray-500">
              Quantity is confirmed with the seller before payment.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={addMany} className={btnPrimary}>
              <ShoppingBag size={17} /> Add to bag
            </button>
            <button onClick={buyNow} className={btnGhost}>
              Buy now <ArrowRight size={16} />
            </button>
            <button
              onClick={() => toggleFavorite(product.id)}
              aria-pressed={isFavorite}
              className={`flex h-[50px] w-[50px] items-center justify-center rounded-full border transition ${
                isFavorite
                  ? "border-[#234b35] bg-[#edf2e8] text-[#234b35]"
                  : "border-[#dfe3d9] bg-white text-gray-600 hover:border-[#234b35]"
              }`}
              aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart size={19} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          <div className={`${card} mt-7`}>
            <p className={eyebrow}>Sold by</p>
            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-base font-semibold">{product.seller}</p>
                <p className="mt-1 text-sm text-gray-500">{product.location}</p>
              </div>
              <Link
                href={`/contact?about=${encodeURIComponent(`Listing #${product.id} — ${product.name}`)}`}
                className="text-xs font-semibold text-[#234b35] underline underline-offset-4"
              >
                Write about this listing
              </Link>
            </div>
            <div className="mt-4 flex items-start gap-2 border-t border-[#e6e8df] pt-4 text-xs leading-5 text-gray-500">
              <Truck size={16} className="mt-0.5 shrink-0 text-[#658958]" />
              <span>
                Agree delivery or a collection point with the seller before
                paying.{" "}
                <Link
                  href="/shipping"
                  className="font-semibold text-[#234b35] hover:underline"
                >
                  See delivery options
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 sm:mt-20">
          <p className={eyebrow}>You may also like</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            More from {product.category}
          </h2>
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-4">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={item} index={index} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
