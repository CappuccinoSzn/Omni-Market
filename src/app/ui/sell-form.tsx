"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { categories, money } from "@/app/lib/catalog";
import { useListings, type Listing } from "@/app/lib/local-data";
import { useApp } from "@/app/lib/store";
import { btnGhost, btnPrimary, card, input, label, noticePanel } from "./styles";

const conditions = ["New", "Like new", "Good"];

const emptyListing = {
  title: "",
  category: categories[0].name,
  condition: conditions[1],
  price: "",
  location: "",
  description: "",
};

export default function SellForm() {
  const { addListing } = useListings();
  const { notify } = useApp();
  const [form, setForm] = useState(emptyListing);
  const [created, setCreated] = useState<Listing | null>(null);

  function update(key: keyof typeof emptyListing, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const listing = addListing({
      title: form.title.trim(),
      category: form.category,
      condition: form.condition,
      price: Number(form.price),
      location: form.location.trim(),
      description: form.description.trim(),
    });

    setCreated(listing);
    setForm(emptyListing);
    notify("Listing saved to your dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const priceNumber = Number(form.price);

  if (created) {
    return (
      <div className={`${card}`}>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2e8]">
          <Check size={22} className="text-[#234b35]" />
        </span>
        <h2 className="mt-4 text-2xl font-semibold">
          “{created.title}” is listed
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Listing reference <strong>{created.id}</strong> · {created.category} ·{" "}
          {created.condition} · {money(created.price)} · {created.location}
        </p>

        <div className={`${noticePanel} mt-5`}>
          Your listing is saved on this device and appears on your dashboard. It
          goes live to buyers once seller publishing is connected to the
          backend.
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard?tab=listings" className={btnPrimary}>
            Manage my listings <ArrowRight size={16} />
          </Link>
          <button onClick={() => setCreated(null)} className={btnGhost}>
            Create another listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${card} space-y-6`}
      aria-label="Create a listing"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={`${label} sm:col-span-2`}>
          What are you selling? *
          <input
            required
            value={form.title}
            onChange={(event) => update("title", event.target.value)}
            maxLength={70}
            className={input}
            placeholder="e.g. Wireless headphones, barely used"
          />
        </label>

        <label className={`${label} block`}>
          Category *
          <select
            required
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            className={input}
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.name}>
                {category.emoji} {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className={`${label} block`}>
          Condition *
          <select
            required
            value={form.condition}
            onChange={(event) => update("condition", event.target.value)}
            className={input}
          >
            {conditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </label>

        <label className={label}>
          Asking price (KSh) *
          <input
            required
            type="number"
            min={50}
            max={5000000}
            value={form.price}
            onChange={(event) => update("price", event.target.value)}
            className={input}
            placeholder="1500"
          />
        </label>

        <label className={label}>
          Town or county *
          <input
            required
            value={form.location}
            onChange={(event) => update("location", event.target.value)}
            className={input}
            placeholder="Nairobi"
          />
        </label>

        <label className={`${label} sm:col-span-2`}>
          Describe the item *
          <textarea
            required
            rows={5}
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            className={`${input} resize-y`}
            placeholder="What is included, how long you used it, any marks or faults buyers should know about."
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f4f7f0] px-4 py-3 text-sm">
        <span className="text-gray-600">
          Your buyer sees: {form.title.trim() || "your item title"}
        </span>
        <span className="font-semibold text-[#234b35]">
          {Number.isFinite(priceNumber) && priceNumber > 0
            ? money(priceNumber)
            : "Price pending"}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>
          Publish listing <ArrowRight size={16} />
        </button>
        <Link href="/help" className={btnGhost}>
          Pricing help
        </Link>
      </div>

      <p className="text-xs leading-5 text-gray-500">
        By listing an item you confirm you are allowed to sell it and that the
        description is honest. Prohibited items are removed under our{" "}
        <Link href="/terms" className="font-semibold text-[#234b35] hover:underline">
          marketplace rules
        </Link>
        .
      </p>
    </form>
  );
}
