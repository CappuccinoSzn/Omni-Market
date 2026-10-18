"use client";

import { categoryTile, type Product } from "@/app/lib/catalog";

// Listings in Supabase have no photo yet (image_url is null), so we show a
// labelled category tile instead of borrowing a stock photo of a similar item.
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
      className={`flex w-full items-center justify-center ${rounded} ${className}`}
      style={{
        background: `linear-gradient(140deg, ${tile.from}, ${tile.to})`,
      }}
    >
      <div className="text-center">
        <span className="text-4xl leading-none sm:text-5xl">{tile.emoji}</span>
        <p className="mt-2 px-3 text-[10px] font-semibold uppercase tracking-[1.5px] text-[#3f5a46] sm:text-[11px]">
          {product.category}
        </p>
        <p className="mt-1 text-[10px] text-[#5c7a63]">No photo yet</p>
      </div>
    </div>
  );
}
