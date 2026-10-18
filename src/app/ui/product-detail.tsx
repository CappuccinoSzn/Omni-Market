"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Heart, ShoppingBag, Truck } from "lucide-react";
import {
  discountPercent,
  money,
  type Product,
} from "@/app/lib/catalog";
import { useApp } from "@/app/lib/store";
import ProductCard from "./product-card";
import { btnGhost, btnPrimary, card, chip, eyebrow } from "./styles";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addToCart, favorites, toggleFavorite, setCartOpen } = useApp();
  const [quantity, setQuantity] = useState(1);
  const isFavorite = favorites.includes(product.id);

  function addMany() {
    for (let index = 0; index < quantity; index += 1) addToCart(product.id);
    setCartOpen(true);
  }

  function buyNow() {
    for (let index = 0; index < quantity; index += 1) addToCart(product.id);
    router.push("/checkout");
  }

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
        <div
          className="relative overflow-hidden rounded-[28px] ring-1 ring-black/[0.03]"
          style={{ backgroundColor: product.color }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="h-[320px] w-full object-cover sm:h-[520px]"
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
            <span className={chip}>
              <span className="text-[#7a6a2e]">★</span>{" "}
              {product.rating.toFixed(1)} ({product.reviews})
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[1.1]">
            {product.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-3">
            <span className="text-3xl font-bold text-[#234b35]">
              {money(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-base text-gray-400 line-through">
                  {money(product.oldPrice)}
                </span>
                <span className="rounded-full bg-[#edf2e8] px-3 py-1.5 text-xs font-semibold text-[#315e43]">
                  Save {money(product.oldPrice - product.price)} ·{" "}
                  {discountPercent(product)}% off
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
            {product.description}
          </p>

          <ul className="mt-5 space-y-2">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-sm text-gray-600">
                <Check size={17} className="mt-0.5 shrink-0 text-[#658958]" />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap items-center gap-3">
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
                onClick={() =>
                  setQuantity((value) => Math.min(product.stock, value + 1))
                }
                aria-label="Increase quantity"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[#dfe3d9] hover:border-[#234b35]"
              >
                +
              </button>
            </div>

            <p className="text-xs text-gray-500">
              {product.stock > 0
                ? `${product.stock} available with this seller`
                : "Currently sold out"}
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
                <p className="mt-1 text-sm text-gray-500">
                  {product.location}, Kenya
                </p>
              </div>
              <Link
                href="/contact"
                className="text-xs font-semibold text-[#234b35] underline underline-offset-4"
              >
                Ask a question
              </Link>
            </div>
            <div className="mt-4 flex items-start gap-2 border-t border-[#e6e8df] pt-4 text-xs leading-5 text-gray-500">
              <Truck size={16} className="mt-0.5 shrink-0 text-[#658958]" />
              <span>
                Agree delivery or a collection point with the seller before
                paying.{" "}
                <Link href="/shipping" className="font-semibold text-[#234b35] hover:underline">
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
