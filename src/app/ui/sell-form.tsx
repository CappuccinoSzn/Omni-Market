"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { categoryTile } from "@/app/lib/catalog";
import { money } from "@/app/lib/format";
import { useListings, type Listing } from "@/app/lib/local-data";
import { useApp } from "@/app/lib/store";
import {
  btnGhost,
  btnPrimary,
  card,
  input,
  label,
  noticePanel,
} from "./styles";

const conditions = ["New", "Like new", "Good"];

// "Other" lets a seller list something the current shelves do not cover.
const categoryNames = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Books",
  "Sports",
  "Other",
];

const emptyListing = {
  title: "",
  category: categoryNames[0],
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
  const tile = categoryTile(form.category);

  if (created) {
    const createdTile = categoryTile(created.category);

    return (
      <div className={`${card} relative overflow-hidden`}>
        <span
          className="cuk-blob right-[-10%] top-[-40%] h-[220px] w-[220px] opacity-30"
          style={{ background: "#9ec77f" }}
          aria-hidden
        />
        <div className="relative">
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_14px_30px_rgba(28,64,42,0.28)]"
          >
            <Check size={26} strokeWidth={3} />
          </motion.span>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
            “{created.title}” is{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              saved
            </span>
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Listing reference <strong>{created.id}</strong> · {created.category} ·{" "}
            {created.condition} · {money(created.price)} · {created.location}
          </p>

          <div className="mt-5 flex items-center gap-4 rounded-3xl border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-4">
            <span
              className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-3xl"
              style={{
                background: `radial-gradient(120% 120% at 0% 0%, ${createdTile.from}, ${createdTile.to})`,
              }}
            >
              {createdTile.emoji}
              <span className="cuk-dots absolute inset-0 text-[#234b35]" aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[1.6px] text-gray-400">
                Seller draft
              </p>
              <p className="mt-1 truncate text-base font-semibold">
                {created.title}
              </p>
              <p className="mt-1 text-sm font-bold text-[#1f4531]">
                {money(created.price)} · {created.location}
              </p>
            </div>
          </div>

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
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`${card} relative space-y-7 overflow-hidden`}
      aria-label="Create a listing"
    >
      <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9]" />

      <div className="relative grid gap-5 sm:grid-cols-2">
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

        <fieldset className="sm:col-span-2">
          <legend className={label}>Category *</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {categoryNames.map((name) => {
              const option = categoryTile(name);
              const active = form.category === name;

              return (
                <label key={name} className="cursor-pointer">
                  <input
                    type="radio"
                    name="listing-category"
                    value={name}
                    checked={active}
                    onChange={() => update("category", name)}
                    className="sr-only"
                  />
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2.5 text-xs font-semibold transition duration-200 active:scale-[0.97] sm:text-sm ${
                      active
                        ? "bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_10px_24px_rgba(28,64,42,0.22)]"
                        : "border border-[#e2e7dc] bg-white text-gray-600 hover:-translate-y-0.5 hover:border-[#a8c199] hover:text-[#234b35]"
                    }`}
                  >
                    <span className="text-base" aria-hidden>
                      {option.emoji}
                    </span>
                    {name}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className={label}>Condition *</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {conditions.map((condition) => {
              const active = form.condition === condition;

              return (
                <label key={condition} className="cursor-pointer">
                  <input
                    type="radio"
                    name="listing-condition"
                    value={condition}
                    checked={active}
                    onChange={() => update("condition", condition)}
                    className="sr-only"
                  />
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition duration-200 active:scale-[0.97] sm:text-sm ${
                      active
                        ? "border border-[#234b35] bg-[#eef4e6] text-[#234b35] shadow-[0_6px_16px_rgba(28,54,34,0.08)]"
                        : "border border-[#e2e7dc] bg-white text-gray-600 hover:-translate-y-0.5 hover:border-[#a8c199]"
                    }`}
                  >
                    {active && <Check size={13} strokeWidth={3} />}
                    {condition}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

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

      <div className="relative flex flex-wrap items-center gap-4 rounded-[26px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#f6f9f1] p-4 shadow-[0_10px_28px_rgba(28,54,34,0.06)]">
        <span
          className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-3xl"
          style={{
            background: `radial-gradient(120% 120% at 0% 0%, ${tile.from}, ${tile.to})`,
          }}
        >
          {tile.emoji}
          <span className="cuk-dots absolute inset-0 text-[#234b35]" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[1.6px] text-gray-400">
            <Sparkles size={11} className="text-[#a2bd70]" />
            Live preview · your buyer sees
          </p>
          <p className="mt-1 truncate text-base font-semibold text-[#26382a]">
            {form.title.trim() || "your item title"}
          </p>
          <p className="mt-0.5 text-xs text-gray-500">
            {form.condition} · {form.category}
            {form.location.trim() && ` · ${form.location.trim()}`}
          </p>
        </div>
        <p className="shrink-0 bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-xl font-black tracking-tight text-transparent">
          {Number.isFinite(priceNumber) && priceNumber > 0
            ? money(priceNumber)
            : "Price pending"}
        </p>
      </div>

      <div className="relative flex flex-wrap gap-3">
        <button type="submit" className={btnPrimary}>
          Save listing <ArrowRight size={16} />
        </button>
        <Link href="/help" className={btnGhost}>
          Pricing help
        </Link>
      </div>

      <p className="relative text-xs leading-5 text-gray-500">
        By listing an item you confirm you are allowed to sell it and that the
        description is honest. Our{" "}
        <Link href="/terms" className="font-semibold text-[#234b35] hover:underline">
          marketplace rules
        </Link>{" "}
        explain what cannot be sold.
      </p>
    </form>
  );
}
