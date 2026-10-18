import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/app/ui/page-header";
import { BulletList, Callout, Table, TextSection } from "@/app/ui/sections";
import { btnPrimary, shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Delivery and pickup",
  description:
    "How delivery, collection points and handover work on Omni Market, including the guidance sellers usually give on timing.",
};

export default function ShippingPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Delivery"
        title="Delivery and pickup options"
        description="Every listing is handled by an independent seller, so you agree the handover and the delivery fee with them. These are the two options buyers and sellers usually settle on."
      />

      <TextSection title="The two ways to receive an order">
        <Table
          head={["Option", "How it works", "Fee", "Best for"]}
          rows={[
            [
              "Rider delivery",
              "The seller hands your item to a rider app or a rider you both agree on; the rider brings it to your address.",
              "Set by the seller and agreed with you",
              "Bulky items, or when you cannot travel",
            ],
            [
              "Seller pickup",
              "You agree a public collection point and time with the seller and inspect the item there.",
              "None",
              "Town centres, campuses, quick handovers",
            ],
          ]}
        />
        <Callout>
          Delivery is agreed with the seller — sellers set the fee, not Omni
          Market. Checkout never shows a delivery amount, and nothing is
          charged automatically.
        </Callout>
      </TextSection>

      <TextSection title="Timing sellers usually quote">
        <p>
          Guidance only, from how riders and buses run between towns. The seller
          you agree with sets the real date.
        </p>
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
            "Keep your own payment reference and order note — Omni Market has no order tracking, so your records are the proof.",
            "Do not send an advance payment to a number that differs from the one the seller gave you.",
            "If something is wrong, sort it out with the seller before money changes hands.",
          ]}
        />
      </TextSection>

      <TextSection title="Frequently asked">
        <BulletList
          items={[
            "Can I change my address after checkout? Yes — your order is saved on this device, so tell the seller the correct place when you arrange the handover.",
            "Who pays for delivery? Buyer and seller agree; most buyers cover the rider fee the seller quotes.",
            "Is delivery insured? Rider apps set their own cover. Ask the seller to photograph the sealed package before dispatch.",
          ]}
        />
      </TextSection>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/products" className={btnPrimary}>
          Browse items ready to ship <ArrowRight size={16} />
        </Link>
        <Link href="/contact" className={btnPrimary}>
          Write to us about a delivery
        </Link>
      </div>
    </main>
  );
}
