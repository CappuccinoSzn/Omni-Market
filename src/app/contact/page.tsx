import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/app/ui/contact-form";
import PageHeader from "@/app/ui/page-header";
import { card, shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Reach the Omni Market team about an order, a listing you want to report, or a question about selling.",
};

const channels = [
  {
    title: "Email the team",
    body: "support@omnimarket.co.ke — reply within one working day.",
  },
  {
    title: "Seller line",
    body: "+254 700 000 000, Monday to Saturday, 9am to 6pm East Africa Time.",
  },
  {
    title: "Report a listing",
    body: "Pick “Report a listing” in the form and include the listing reference.",
  },
  {
    title: "Nairobi office",
    body: "Visits by appointment only — everything else is handled remotely.",
  },
];

export default function ContactPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <PageHeader
        kicker="Support"
        title="Talk to the Omni Market team"
        description="Order trouble, a listing that looks wrong, or a question about selling. Tell us what happened and we will follow up."
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <ContactForm />

        <aside className={`${card} space-y-6`}>
          <h2 className="text-lg font-semibold">Other ways to reach us</h2>

          <div className="space-y-5">
            {channels.map((channel) => (
              <div key={channel.title}>
                <h3 className="text-sm font-semibold text-[#26382a]">
                  {channel.title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-gray-500">
                  {channel.body}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e6e8df] pt-5 text-sm text-gray-600">
            Looking for a quick answer?{" "}
            <Link href="/help" className="font-semibold text-[#234b35] hover:underline">
              Check the help centre
            </Link>{" "}
            first — most delivery and pricing questions are covered there.
          </div>
        </aside>
      </div>
    </main>
  );
}
