import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/app/ui/page-header";
import { BulletList, Callout, Table, TextSection } from "@/app/ui/sections";
import { btnPrimary, shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Delivery and pickup",
  description:
    "How delivery, collection points and handover work on Omni Market, including typical costs and timing across Kenya.",
};

export default function ShippingPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Delivery"
        title="Delivery and pickup options"
        description="Every listing is handled by an independent seller, so you agree the handover with them. These are the options most buyers and sellers use."
      />

      <TextSection title="The two ways to receive an order">
        <Table
          head={["Option", "How it works", "Typical cost", "Best for"]}
          rows={[
            [
              "Rider delivery",
              "The seller hands your item to a rider app or a rider you both agree on; the rider brings it to your address.",
              "KSh 150 – 400 within a town",
              "Bulky items, or when you cannot travel",
            ],
            [
              "Seller pickup",
              "You agree a public collection point and time with the seller and inspect the item there.",
              "Free",
              "Town centres, campuses, quick handovers",
            ],
          ]}
        />
        <Callout>
          At checkout Omni Market adds an indicative KSh 300 for rider delivery,
          or free for pickup. The seller confirms the final amount before you
          pay — nothing is charged automatically.
        </Callout>
      </TextSection>

      <TextSection title="Timing you can plan around">
        <Table
          head={["Route", "Usual time"]}
          rows={[
            ["Same town (Nairobi to Nairobi, Kisumu to Kisumu)", "Same day"],
            ["Nearby towns (Nairobi to Thika, Nakuru to Eldoret)", "1 working day"],
            ["Long distance (Nairobi to Mombasa, Kisumu to Garissa)", "2 – 3 working days"],
          ]}
        />
      </TextSection>

      <TextSection title="Staying safe at handover">
        <BulletList
          items={[
            "Meet in a public place and inspect the item before paying.",
            "Keep the conversation and payment reference inside the listing so it can be traced.",
            "Do not send an advance payment to a number that differs from the one on the listing.",
            "If something is wrong, contact us before the handover closes — see the contact page.",
          ]}
        />
      </TextSection>

      <TextSection title="Frequently asked">
        <BulletList
          items={[
            "Can I change my address after checkout? Yes, tell the seller in your order notes or a message.",
            "Who pays for delivery? Buyer and seller agree; most buyers cover rider fees.",
            "Is delivery insured? Rider apps set their own cover. Ask the seller to photograph the sealed package before dispatch.",
          ]}
        />
      </TextSection>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/products" className={btnPrimary}>
          Browse items ready to ship <ArrowRight size={16} />
        </Link>
        <Link href="/contact" className={btnPrimary}>
          Ask about an order
        </Link>
      </div>
    </main>
  );
}
