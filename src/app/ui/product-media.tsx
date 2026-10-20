"use client";

import { Camera } from "lucide-react";
import { categoryTile, type Product } from "@/app/lib/catalog";

// Listings in Supabase have no photo yet (image_url is null), so we show a
// textured category tile instead of borrowing a stock photo of a similar item.
export default function ProductMedia({
  product,
  className = "",
  rounded = "rounded-[16px] sm:rounded-[20px]",
}: {
  product: Product;
  className?: string;
  rounded?: string;
}) {
  const tile = categoryTile(product.category);

  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={`w-full object-cover ${rounded} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${product.category} listing, no photo added yet`}
      className={`relative flex w-full items-center justify-center overflow-hidden ${rounded} ${className}`}
      style={{
        background: `radial-gradient(circle at 26% 18%, ${tile.to}, ${tile.from})`,
      }}
    >
      <span
        aria-hidden
        className="absolute -bottom-7 -right-3 rotate-[-12deg] text-[110px] leading-none opacity-25 sm:text-[150px]"
      >
        {tile.emoji}
      </span>
      <span
        aria-hidden
        className="cuk-dots absolute inset-0 text-[#234b35]"
        style={{ maskImage: "linear-gradient(to bottom right, #000, transparent)" }}
      />
      <span aria-hidden className="cuk-sheen" />

      <div className="relative z-10 text-center">
        <span className="text-4xl leading-none drop-shadow-[0_6px_14px_rgba(35,75,53,0.22)] transition duration-500 group-hover:scale-110 sm:text-5xl">
          {tile.emoji}
        </span>
        <p className="mt-2 px-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#3f5a46] sm:text-[11px]">
          {product.category}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/75 px-2.5 py-1 text-[10px] font-medium text-[#4b6152] shadow-[0_2px_8px_rgba(35,75,53,0.10)]">
          <Camera size={11} aria-hidden />
          No photo yet
        </p>
      </div>
    </div>
  );
}
