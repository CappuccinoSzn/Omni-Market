import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/app/ui/page-header";
import { BulletList, Callout, TextSection } from "@/app/ui/sections";
import { shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Marketplace rules",
  description:
    "The rules sellers and buyers agree to when listing an item or saving an order on Omni Market.",
};

export default function TermsPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Legal"
        title="Marketplace rules"
        description="Last updated 18 October 2026. By listing an item or placing an order you agree to these rules."
      />

      <TextSection title="Listings must be accurate">
        <BulletList
          items={[
            "Describe the real condition: new, like new or good, with any marks or faults.",
            "State what is included so buyers are not surprised at handover.",
            "Price what you actually intend to sell. Reserve nothing for a better offer.",
            "Only list items you are entitled to sell and physically have available.",
          ]}
        />
      </TextSection>

      <TextSection title="What cannot be listed">
        <BulletList
          items={[
            "Stolen goods or items you have no right to sell.",
            "Firearms, ammunition and regulated weapons.",
            "Prescription medicine without a licensed pharmacy account.",
            "Wildlife products and items restricted under Kenyan law.",
            "Counterfeit goods presented as originals.",
          ]}
        />
        <Callout>
          There is no moderation queue reading listings before they appear — the
          shop shows what the seller database holds. Tell us about anything that
          breaks these rules and we can take the listing out. Law enforcement
          handles anything criminal; Omni Market does not shield it.
        </Callout>
      </TextSection>

      <TextSection title="Payments between buyers and sellers">
        <p>
          Omni Market does not hold funds. Payment is made directly to the seller
          at handover, by M-Pesa or cash. Keep the payment reference until the
          item is confirmed working. A seller who requests payment before a
          handover is agreed is acting against these rules.
        </p>
      </TextSection>

      <TextSection title="Conduct">
        <BulletList
          items={[
            "Describe items truthfully; do not misrepresent what a buyer will get.",
            "No spam or duplicate listings.",
            "Respect the agreed collection point and time, or tell the other party early.",
            "Report anything suspicious through the contact page rather than resolving it in person.",
          ]}
        />
      </TextSection>

      <TextSection title="When something goes wrong">
        <p>
          Omni Market is not a party to the sale. We do not judge disputes, issue
          refunds or reverse a payment made outside the platform, and orders on
          this demo are saved only in the buyer&apos;s browser. Raise the problem
          with the seller first and keep photos and the payment reference.
        </p>
      </TextSection>

      <TextSection title="Availability and changes">
        <p>
          The service is provided as available. We may change features, including
          adding marketplace payment, and will update this page when the rules
          change. Continued use after an update means you accept it.
        </p>
      </TextSection>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        <Link href="/privacy" className="font-semibold text-[#234b35] underline underline-offset-4">
          Privacy policy
        </Link>
        <Link href="/help" className="font-semibold text-[#234b35] underline underline-offset-4">
          Help centre
        </Link>
        <Link href="/contact" className="font-semibold text-[#234b35] underline underline-offset-4">
          Report a listing
        </Link>
      </div>
    </main>
  );
}
