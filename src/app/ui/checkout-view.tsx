"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ShoppingBag } from "lucide-react";
import { money } from "@/app/lib/catalog";
import { useOrders, type Order } from "@/app/lib/local-data";
import { useApp } from "@/app/lib/store";
import { btnGhost, btnPrimary, card, eyebrow, input, label, noticePanel } from "./styles";

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
    fee: 300,
    body: "A rider collects from the seller and brings your order to the address you give.",
  },
  {
    id: "pickup",
    name: "Seller pickup",
    fee: 0,
    body: "Agree a collection point with the seller. No delivery fee.",
  },
];

const emptyForm = {
  customerName: "",
  phone: "",
  email: "",
  county: "Nairobi",
  address: "",
  notes: "",
};

export default function CheckoutView() {
  const { cartItems, cartTotal, cartCount, clearCart } = useApp();
  const { placeOrder } = useOrders();
  const [form, setForm] = useState(emptyForm);
  const [method, setMethod] = useState(deliveryMethods[0].id);
  const [placed, setPlaced] = useState<Order | null>(null);

  const selectedMethod =
    deliveryMethods.find((option) => option.id === method) ?? deliveryMethods[0];
  const total = cartTotal + (cartItems.length > 0 ? selectedMethod.fee : 0);

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
      lines: cartItems,
      total,
    });

    clearCart();
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placed) {
    return (
      <main className="mx-auto w-full max-w-[900px] px-4 py-14 sm:px-8 lg:px-12">
        <div className={`${card} text-center`}>
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#edf2e8]">
            <Check size={26} className="text-[#234b35]" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold sm:text-3xl">
            Order {placed.id} is recorded
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-600">
            We saved your delivery details with {placed.itemCount} item(s) for{" "}
            <strong>{money(placed.total)}</strong>. Payment is completed directly
            with the seller — Omni Market has not charged you anything.
          </p>

          <div className={`${noticePanel} mt-6 text-left`}>
            <p className="font-semibold">What happens next</p>
            <ol className="mt-3 space-y-2 text-sm">
              <li>1. The seller reviews your order and confirms the item is ready.</li>
              <li>2. You agree the final delivery or collection details.</li>
              <li>3. You pay by M-Pesa or cash when the handover happens.</li>
            </ol>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
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

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[900px] px-4 py-16 sm:px-8 lg:px-12">
        <div className={`${card} text-center`}>
          <ShoppingBag size={42} className="mx-auto text-[#719267]" />
          <h1 className="mt-5 text-2xl font-semibold">Nothing to check out yet</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Add products to your bag and they will appear here with delivery
            options.
          </p>
          <Link href="/products" className={`${btnPrimary} mt-6`}>
            Browse products <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1360px] px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
      <Link href="/cart" className="text-sm text-gray-500 hover:text-[#234b35]">
        ← Back to my bag
      </Link>

      <div className="mt-4">
        <p className={eyebrow}>Final step</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Confirm your items and tell the seller where to bring them.
        </p>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 rounded-3xl border border-[#e6e8df] bg-white p-5 sm:p-8"
        >
          <section>
            <h2 className="text-lg font-semibold">Contact information</h2>

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

              <label className={`${label} sm:col-span-2`}>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  className={input}
                  placeholder="you@example.com"
                />
              </label>
            </div>
          </section>

          <section className="border-t border-[#e6e8df] pt-6">
            <h2 className="text-lg font-semibold">Delivery</h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {deliveryMethods.map((option) => (
                <label
                  key={option.id}
                  className={`cursor-pointer rounded-2xl border p-4 text-sm transition ${
                    method === option.id
                      ? "border-[#234b35] bg-[#edf2e8]"
                      : "border-[#dfe3d9] bg-white hover:border-[#cbd7c2]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{option.name}</span>
                    <span className="text-xs font-semibold text-[#315e43]">
                      {option.fee === 0 ? "Free" : `+ ${money(option.fee)}`}
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
                Notes for the seller (optional)
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

          <section className="border-t border-[#e6e8df] pt-6">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="mt-2 text-sm leading-6 text-gray-500">
              Pay the seller by M-Pesa or cash at handover. Online payment
              processing will be enabled when the order backend is connected —
              this form does not charge you.
            </p>
          </section>

          <button type="submit" className={`${btnPrimary} w-full`}>
            Place order · {money(total)}
          </button>
        </form>

        <aside className={`${card} h-fit lg:sticky lg:top-28`}>
          <h2 className="text-lg font-semibold">Your order</h2>

          <div className="mt-5 space-y-5">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Quantity: {item.quantity} · {item.seller}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold">
                  {money(item.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-[#e6e8df] pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Subtotal ({cartCount} item(s))
              </span>
              <span className="font-semibold">{money(cartTotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-500">{selectedMethod.name}</span>
              <span className="font-semibold">
                {selectedMethod.fee === 0 ? "Free" : money(selectedMethod.fee)}
              </span>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#e6e8df] pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">{money(total)}</span>
            </div>
          </div>

          <p className="mt-5 text-xs leading-5 text-gray-500">
            Check product details and agree delivery with the seller before
            making payment.
          </p>
        </aside>
      </div>
    </main>
  );
}
