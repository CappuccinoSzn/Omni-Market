
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Wireless headphones",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Everyday sneakers",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Minimal desk lamp",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Classic wristwatch",
    price: 2750,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Study essentials",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 6,
    name: "Wireless game controller",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 7,
    name: "Everyday backpack",
    price: 1600,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 8,
    name: "Football",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1614632537190-23e4b2e69c29?auto=format&fit=crop&w=300&q=80",
  },
];

const money = (amount: number) =>
  `KSh ${amount.toLocaleString("en-KE")}`;

export default function CheckoutPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [county, setCounty] = useState("Nairobi");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cuk-shop-cart");

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (id) =>
              typeof id === "number" &&
              products.some((product) => product.id === id)
          )
        ) {
          setCart(parsed);
        }
      }
    } catch {
      setCart([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  const items = useMemo(
    () =>
      products
        .map((product) => ({
          ...product,
          quantity: cart.filter((id) => id === product.id).length,
        }))
        .filter((product) => product.quantity > 0),
    [cart]
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Your delivery details are ready. Order submission and payment will be enabled when the backend is connected."
    );
  }

  if (!loaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fcfcf9]">
        <p className="text-sm text-gray-500">Loading your order...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fcfcf9] px-4 py-8 text-[#202a22] sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#234b35]"
        >
          cuk<span className="text-[#a2bd70]">.</span>shop
        </Link>

        <div className="mt-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-[#234b35]">
            ← Continue shopping
          </Link>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Confirm your items and enter your delivery details.
          </p>
        </div>

        {items.length === 0 ? (
          <section className="mt-8 rounded-3xl border border-[#e6e8df] bg-white p-8 text-center">
            <h2 className="text-xl font-semibold">Your bag is empty</h2>
            <p className="mt-2 text-sm text-gray-500">
              Add products to your bag before checking out.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex rounded-full bg-[#234b35] px-5 py-3 text-sm font-semibold text-white"
            >
              Browse products
            </Link>
          </section>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-3xl border border-[#e6e8df] bg-white p-5 sm:p-8"
            >
              <section>
                <h2 className="text-lg font-semibold">
                  Contact information
                </h2>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-medium">
                    Full name *
                    <input
                      required
                      autoComplete="name"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#dfe3d9] px-4 py-3 font-normal outline-none focus:border-[#719267]"
                      placeholder="Your full name"
                    />
                  </label>

                  <label className="text-sm font-medium">
                    Phone number *
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      pattern="(\+254|0)[0-9]{9}"
                      title="Enter a Kenyan number, such as 0712345678 or +254712345678"
                      className="mt-2 w-full rounded-xl border border-[#dfe3d9] px-4 py-3 font-normal outline-none focus:border-[#719267]"
                      placeholder="0712345678"
                    />
                  </label>

                  <label className="text-sm font-medium sm:col-span-2">
                    Email address
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#dfe3d9] px-4 py-3 font-normal outline-none focus:border-[#719267]"
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
              </section>

              <section className="border-t border-[#e6e8df] pt-6">
                <h2 className="text-lg font-semibold">Delivery details</h2>

                <div className="mt-5 space-y-4">
                  <label className="block text-sm font-medium">
                    County *
                    <select
                      required
                      value={county}
                      onChange={(event) => setCounty(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#dfe3d9] bg-white px-4 py-3 font-normal outline-none focus:border-[#719267]"
                    >
                      <option>Nairobi</option>
                      <option>Kisumu</option>
                      <option>Mombasa</option>
                      <option>Nakuru</option>
                      <option>Uasin Gishu</option>
                      <option>Kiambu</option>
                      <option>Kakamega</option>
                      <option>Other</option>
                    </select>
                  </label>

                  <label className="block text-sm font-medium">
                    Delivery address or collection point *
                    <textarea
                      required
                      rows={3}
                      autoComplete="street-address"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      className="mt-2 w-full resize-y rounded-xl border border-[#dfe3d9] px-4 py-3 font-normal outline-none focus:border-[#719267]"
                      placeholder="Estate, building, street, campus, or agreed collection point"
                    />
                  </label>

                  <label className="block text-sm font-medium">
                    Delivery notes (optional)
                    <textarea
                      rows={2}
                      value={deliveryNotes}
                      onChange={(event) => setDeliveryNotes(event.target.value)}
                      className="mt-2 w-full resize-y rounded-xl border border-[#dfe3d9] px-4 py-3 font-normal outline-none focus:border-[#719267]"
                      placeholder="Any helpful delivery instructions"
                    />
                  </label>
                </div>
              </section>

              <section className="border-t border-[#e6e8df] pt-6">
                <h2 className="text-lg font-semibold">Payment</h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  M-Pesa payment will be connected after the order backend is
                  ready. This form does not charge you or place a real order.
                </p>
              </section>

              {message && (
                <p
                  role="status"
                  className="rounded-xl bg-[#edf2e8] p-4 text-sm leading-6 text-[#234b35]"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-[#234b35] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#315e43]"
              >
                Review delivery details
              </button>
            </form>

            <aside className="h-fit rounded-3xl border border-[#e6e8df] bg-white p-5 sm:p-8">
              <h2 className="text-lg font-semibold">Your order</h2>

              <div className="mt-5 space-y-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl bg-gray-100 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-semibold">
                      {money(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-[#e6e8df] pt-5">
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-semibold">{money(subtotal)}</span>
                </div>
                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="text-gray-500">To be confirmed</span>
                </div>
                <div className="flex justify-between gap-4 border-t border-[#e6e8df] pt-4">
                  <span className="font-semibold">Total before delivery</span>
                  <span className="text-xl font-bold">{money(subtotal)}</span>
                </div>
              </div>

              <p className="mt-5 text-xs leading-5 text-gray-500">
                Check product details and agree on delivery with the seller
                before making payment.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
