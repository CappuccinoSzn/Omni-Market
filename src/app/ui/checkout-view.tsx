"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
  PlugZap,
  RefreshCw,
  ShoppingBag,
  WalletMinimal,
} from "lucide-react";
import { useCartView } from "@/app/lib/cart";
import { money } from "@/app/lib/format";
import { useOrders, type Order } from "@/app/lib/local-data";
import { loadProducts } from "@/app/lib/catalog";
import { useApp } from "@/app/lib/store";
import ProductMedia from "./product-media";
import {
  btnGhost,
  btnPrimary,
  card,
  input,
  kicker,
  label,
  rule,
} from "./styles";

const counties = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa",
  "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
  "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
  "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
  "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
  "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
  "Other",
];

const deliveryMethods = [
  {
    id: "rider",
    name: "Rider delivery",
    feeLabel: "Fee set by the seller",
    body: "A rider collects from the seller and brings your order to the address you give. Agree the fee before payment.",
  },
  {
    id: "pickup",
    name: "Collection",
    feeLabel: "Free",
    body: "Agree a collection point with the seller and pick the item up yourself.",
  },
];

const emptyForm = {
  customerName: "",
  phone: "",
  county: "Nairobi",
  address: "",
  notes: "",
};

export default function CheckoutView() {
  const { cartCount, clearCart } = useApp();
  const { lines, itemCount, subtotal, unavailable, ready, status, error } =
    useCartView();
  const { placeOrder } = useOrders();
  const [form, setForm] = useState(emptyForm);
  const [method, setMethod] = useState(deliveryMethods[0].id);
  const [placed, setPlaced] = useState<Order | null>(null);

  const selectedMethod =
    deliveryMethods.find((option) => option.id === method) ?? deliveryMethods[0];

  function update(key: keyof typeof emptyForm, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const order = placeOrder({
      customerName: form.customerName,
      phone: form.phone,
      county: form.county,
      address: form.address,
      method: selectedMethod.name,
      notes: form.notes,
      itemCount,
      total: subtotal,
    });

    clearCart();
    setPlaced(order);
    setForm(emptyForm);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <main className="relative mx-auto w-full max-w-[900px] px-4 py-14 sm:px-8 lg:px-12">
        <span
          className="cuk-blob left-[6%] top-2 h-[240px] w-[240px] opacity-35"
          style={{ background: "#9ec77f" }}
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-[30px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#f4f8ee] p-6 text-center shadow-[0_24px_60px_rgba(28,54,34,0.10)] sm:p-9">
          <span className="cuk-dots absolute inset-0 text-[#234b35]" aria-hidden />
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-white shadow-[0_16px_34px_rgba(28,64,42,0.32)]"
          >
            <Check size={30} strokeWidth={3} />
          </motion.span>
          <h1 className="relative mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Order{" "}
            <span className="cuk-grad-text font-mono font-bold italic">
              {placed.id}
            </span>{" "}
            is recorded
          </h1>
          <p className="relative mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">
            We saved {placed.itemCount} item{placed.itemCount === 1 ? "" : "s"} for{" "}
            <strong>{money(placed.total)}</strong> with your delivery details.
            Omni Market has not charged you anything and no payment has been made.
          </p>

          <div className="relative mt-7 rounded-[26px] border border-[#dfead0] bg-white/85 p-5 text-left shadow-[0_10px_28px_rgba(28,54,34,0.06)] backdrop-blur">
            <p className={kicker}>
              <BadgeCheck size={13} className="text-[#315e43]" />
              What this record is
            </p>
            <ol className="mt-4 space-y-3 text-sm leading-6">
              {[
                "It stays in this browser so you can quote the reference when you arrange handover.",
                "It is not sent to a seller or to our team — the marketplace has no order backend or messaging yet.",
                "Agree the price, delivery fee and payment with the seller directly, then pay at handover.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2c5c3f] to-[#173624] text-[11px] font-bold text-[#c5dba9]">
                    {index + 1}
                  </span>
                  <span className="text-gray-600">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard?tab=orders" className={btnPrimary}>
              View my orders <ArrowRight size={16} />
            </Link>
            <Link href="/products" className={btnGhost}>
              Keep shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="relative mx-auto w-full max-w-[900px] px-4 py-16 sm:px-8 lg:px-12">
        <span
          className="cuk-blob right-[8%] top-6 h-[220px] w-[220px] opacity-40"
          style={{ background: "#f0b429" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-xl rounded-[28px] border border-[#e6d9bd] bg-gradient-to-br from-[#fdf7ea] to-white p-7 text-center shadow-[0_18px_46px_rgba(28,54,34,0.08)]">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f0b429] to-[#dd7a55] text-white shadow-[0_12px_26px_rgba(221,122,85,0.3)]">
            <PlugZap size={26} />
          </span>
          <p className="mt-5 text-lg font-semibold">
            Checkout cannot price your bag.
          </p>
          <p className="mt-1 text-sm text-[#40544a]">{error}</p>
          <button
            onClick={() => loadProducts(true)}
            className={`${btnPrimary} mt-5`}
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-[900px] px-4 py-16 sm:px-8 lg:px-12">
        <p className={kicker}>
          <span className="cuk-live-dot" aria-hidden />
          Final step
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <div className={rule} />
        <p className="mt-4 text-sm text-gray-500">
          Checking {cartCount} saved item{cartCount === 1 ? "" : "s"} against live
          listings...
        </p>
        <div className="cuk-skeleton mt-8 h-56 rounded-3xl" />
      </main>
    );
  }

  if (lines.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[900px] px-4 py-16 sm:px-8 lg:px-12">
        <div className="relative overflow-hidden rounded-[30px] border border-dashed border-[#cfd9c4] bg-gradient-to-br from-[#f2f7ec] to-white px-6 py-14 text-center">
          <motion.span
            initial={{ scale: 0.86, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="cuk-float mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-[#315e43] shadow-[0_16px_38px_rgba(28,54,34,0.12)]"
          >
            <ShoppingBag size={34} />
          </motion.span>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
            Nothing to{" "}
            <span className="cuk-grad-text font-serif font-normal italic">
              check out
            </span>{" "}
            yet
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
            {unavailable > 0
              ? `${unavailable} item${unavailable === 1 ? "" : "s"} in your bag point at listings that are no longer published, so there is nothing left to order.`
              : "Add listings to your bag and they will appear here with delivery options."}
          </p>
          {unavailable > 0 && (
            <button onClick={clearCart} className={`${btnGhost} mt-5`}>
              Clear saved ids
            </button>
          )}
          <div className="mt-6 flex justify-center">
            <Link href="/products" className={btnPrimary}>
              Browse listings <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <span
        className="cuk-blob right-[-6%] top-8 h-[250px] w-[250px] opacity-30"
        style={{ background: "#9ec77f" }}
        aria-hidden
      />

      <Link
        href="/cart"
        className="relative inline-flex items-center gap-2 rounded-full border border-[#e2e7dc] bg-white/85 px-4 py-2 text-sm text-gray-600 transition hover:-translate-x-1 hover:border-[#8fae86] hover:text-[#234b35]"
      >
        <ArrowRight size={15} className="rotate-180" />
        Back to my bag
      </Link>

      <div className="relative mt-5">
        <p className={kicker}>
          <span className="cuk-live-dot" aria-hidden />
          Final step
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout{" "}
          <span className="cuk-grad-text font-serif font-normal italic">
            without the wallet
          </span>
        </h1>
        <div className={rule} />
        <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          Record what you want and where it should go. Nothing is charged and no
          payment is taken here.
        </p>
      </div>

      <div className="relative mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-[28px] border border-[#e6e9dd] bg-gradient-to-br from-white to-[#fafcf6] p-5 shadow-[0_16px_44px_rgba(28,54,34,0.07)] sm:p-8"
        >
          <section>
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#eaf2e0] to-[#f7f9f1] text-[#315e43] ring-1 ring-[#e0e8d6]">
                <BadgeCheck size={16} />
              </span>
              Contact information
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className={label}>
                Full name *
                <input
                  required
                  autoComplete="name"
                  value={form.customerName}
                  onChange={(event) => update("customerName", event.target.value)}
                  className={input}
                  placeholder="Your full name"
                />
              </label>

              <label className={label}>
                Phone number *
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  pattern="(\+254|0)[0-9]{9}"
                  title="Enter a Kenyan number, such as 0712345678 or +254712345678"
                  className={input}
                  placeholder="0712345678"
                />
              </label>
            </div>
          </section>

          <section className="border-t border-[#e6e9dd] pt-7">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#eaf2e0] to-[#f7f9f1] text-[#315e43] ring-1 ring-[#e0e8d6]">
                <MapPin size={16} />
              </span>
              Delivery
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {deliveryMethods.map((option) => (
                <label
                  key={option.id}
                  className={`relative cursor-pointer overflow-hidden rounded-2xl border p-4 text-sm transition duration-200 ${
                    method === option.id
                      ? "border-[#234b35] bg-gradient-to-br from-[#eef4e6] to-white shadow-[0_12px_28px_rgba(28,64,42,0.12)]"
                      : "border-[#dfe3d9] bg-white hover:-translate-y-0.5 hover:border-[#a8c199] hover:shadow-[0_10px_22px_rgba(28,54,34,0.07)]"
                  }`}
                >
                  <span
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#234b35] via-[#719477] to-[#c5dba9] transition ${
                      method === option.id ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 font-semibold">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition ${
                          method === option.id
                            ? "border-[#234b35] bg-[#234b35] text-white"
                            : "border-[#cfd7c6] bg-white"
                        }`}
                      >
                        {method === option.id && <Check size={12} strokeWidth={3} />}
                      </span>
                      {option.name}
                    </span>
                    <span className="rounded-full bg-white/80 px-2 py-1 text-[10px] font-bold uppercase tracking-[1px] text-[#315e43] ring-1 ring-[#e0e8d6]">
                      {option.feeLabel}
                    </span>
                  </div>
                  <input
                    type="radio"
                    name="delivery-method"
                    value={option.id}
                    checked={method === option.id}
                    onChange={() => setMethod(option.id)}
                    className="sr-only"
                  />
                  <p className="mt-2 text-xs leading-5 text-gray-500">
                    {option.body}
                  </p>
                </label>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              <label className={`${label} block`}>
                County *
                <select
                  required
                  value={form.county}
                  onChange={(event) => update("county", event.target.value)}
                  className={input}
                >
                  {counties.map((county) => (
                    <option key={county} value={county}>
                      {county}
                    </option>
                  ))}
                </select>
              </label>

              <label className={`${label} block`}>
                {method === "pickup"
                  ? "Preferred collection area *"
                  : "Delivery address *"}
                <textarea
                  required
                  rows={3}
                  autoComplete="street-address"
                  value={form.address}
                  onChange={(event) => update("address", event.target.value)}
                  className={`${input} resize-y`}
                  placeholder="Estate, building, street, campus, or agreed collection point"
                />
              </label>

              <label className={`${label} block`}>
                Notes for the handover (optional)
                <textarea
                  rows={2}
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  className={`${input} resize-y`}
                  placeholder="Landmarks, best time to call, floor number..."
                />
              </label>
            </div>
          </section>

          <section className="border-t border-[#e6e9dd] pt-7">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#eaf2e0] to-[#f7f9f1] text-[#315e43] ring-1 ring-[#e0e8d6]">
                <WalletMinimal size={16} />
              </span>
              Payment
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Pay the seller by M-Pesa or cash at handover. Omni Market does not
              process payments, so this form places no charge on you or the
              seller.
            </p>
          </section>

          <button type="submit" className={`${btnPrimary} w-full`}>
            Record order · {money(subtotal)}
          </button>
        </form>

        <aside className={`${card} relative h-fit overflow-hidden lg:sticky lg:top-28`}>
          <span
            className="cuk-blob left-[-14%] top-[-35%] h-[190px] w-[190px] opacity-25"
            style={{ background: "#a2bd70" }}
            aria-hidden
          />
          <div className="relative">
            <p className={kicker}>
              <span className="cuk-live-dot" aria-hidden />
              Your order
            </p>

            <div className="mt-5 space-y-4">
              {unavailable > 0 && (
                <p className="rounded-2xl border border-[#f2d8d8] bg-gradient-to-br from-[#fdf1f1] to-white px-4 py-3 text-xs leading-5 text-red-700">
                  {unavailable} saved item{unavailable === 1 ? "" : "s"} is no
                  longer listed and is not included.
                </p>
              )}

              {lines.map((line) => (
                <div
                  key={line.product.id}
                  className="flex gap-3 rounded-2xl border border-[#eef1e7] bg-white/80 p-2.5 transition hover:border-[#d7e3c9]"
                >
                  <div className="w-16 shrink-0 overflow-hidden rounded-xl">
                    <ProductMedia product={line.product} rounded="" className="h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{line.product.name}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Quantity: {line.quantity} · {line.product.seller}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-[#1f4531]">
                    {money(line.product.price * line.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-[#e6e9dd] pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Subtotal ({itemCount} item{itemCount === 1 ? "" : "s"})
                </span>
                <span className="font-semibold">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">{selectedMethod.name}</span>
                <span className="text-gray-500">
                  {selectedMethod.id === "pickup" ? "Free" : "With seller"}
                </span>
              </div>
              <div className="flex items-end justify-between gap-4 border-t border-[#e6e9dd] pt-4">
                <span className="font-semibold">Listings total</span>
                <span className="bg-gradient-to-r from-[#234b35] to-[#5d8a5b] bg-clip-text text-2xl font-black tracking-tight text-transparent">
                  {money(subtotal)}
                </span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-gray-500">
              Check each listing&rsquo;s price and condition, then agree the final
              figure with the seller before paying.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
