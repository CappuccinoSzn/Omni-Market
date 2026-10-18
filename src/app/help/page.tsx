import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/app/ui/page-header";
import { shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Help centre",
  description:
    "Answers to the questions buyers and sellers ask most on Omni Market, from checkout to pricing and delivery.",
};

const groups = [
  {
    title: "Buying",
    items: [
      {
        q: "Do I need an account to buy?",
        a: "No. You can browse, add to your bag and check out as a guest. An account is useful if you want to publish listings or keep data beyond this device.",
      },
      {
        q: "When do I pay?",
        a: "At handover, directly to the seller by M-Pesa or cash. Omni Market never charges your card and does not hold funds.",
      },
      {
        q: "Can I see an item before paying?",
        a: "Yes. Ask the seller for a video call or extra photos, or choose pickup and inspect in person before you pay.",
      },
      {
        q: "How do I save something for later?",
        a: "Tap the heart on any product. Saved items appear under Favourites on your dashboard.",
      },
    ],
  },
  {
    title: "Selling",
    items: [
      {
        q: "How much does it cost to list?",
        a: "Listing is free and we take no commission. You keep the full amount the buyer pays.",
      },
      {
        q: "How should I price an item?",
        a: "Search the same category in the shop and compare. Price slightly above what you would accept, because buyers negotiate.",
      },
      {
        q: "What makes a listing sell faster?",
        a: "A clear title, honest condition, a list of what is included, and your town. Answer questions the same day if you can.",
      },
      {
        q: "Can I remove a listing?",
        a: "Yes. Open your dashboard, go to My listings and delete it. It disappears from this device immediately.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        q: "Which option is cheapest?",
        a: "Seller pickup costs nothing. Rider delivery inside one town is usually KSh 150 to 400 and is confirmed by the seller.",
      },
      {
        q: "Can you deliver outside Kenya?",
        a: "Not currently. All listings and handovers are within Kenya.",
      },
      {
        q: "My item arrived damaged. What now?",
        a: "Photograph it before paying if possible, tell the seller, then send us the listing and order references through the contact page.",
      },
    ],
  },
  {
    title: "Account and data",
    items: [
      {
        q: "I forgot my password.",
        a: "Use the password reset link Supabase sends when email recovery is configured, or contact us so we can help you regain access.",
      },
      {
        q: "Where is my bag stored?",
        a: "In your browser's local storage on this device. See the privacy policy for exactly which keys we write.",
      },
      {
        q: "How do I delete my account?",
        a: "Send a request from the email on your account through the contact page.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Help centre"
        title="Answers, without the waiting"
        description="The questions buyers and sellers ask most. If yours is not here, the contact page reaches a real person."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Link
          href="/shipping"
          className="rounded-2xl border border-[#e6e8df] bg-white p-5 transition hover:-translate-y-1 hover:border-[#cbd7c2]"
        >
          <p className="text-sm font-semibold">Delivery and pickup</p>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            Costs, timing and how to stay safe at handover.
          </p>
        </Link>
        <Link
          href="/terms"
          className="rounded-2xl border border-[#e6e8df] bg-white p-5 transition hover:-translate-y-1 hover:border-[#cbd7c2]"
        >
          <p className="text-sm font-semibold">Marketplace rules</p>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            What may be listed and how payments work.
          </p>
        </Link>
        <Link
          href="/contact"
          className="rounded-2xl border border-[#e6e8df] bg-white p-5 transition hover:-translate-y-1 hover:border-[#cbd7c2]"
        >
          <p className="text-sm font-semibold">Talk to a person</p>
          <p className="mt-2 text-xs leading-5 text-gray-500">
            Report a listing, ask about an order or request data deletion.
          </p>
        </Link>
      </div>

      {groups.map((group) => (
        <section key={group.title} className="mt-10">
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
            {group.title}
          </h2>

          <div className="mt-4 space-y-3">
            {group.items.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-[#e6e8df] bg-white p-5 open:border-[#cbd7c2]"
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-[#26382a] sm:text-base">
                  {item.q}
                  <span className="ml-2 text-[#719267] group-open:hidden">+</span>
                  <span className="ml-2 hidden text-[#719267] group-open:inline">
                    −
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
