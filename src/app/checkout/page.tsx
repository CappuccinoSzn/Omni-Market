import type { Metadata } from "next";
import CheckoutView from "@/app/ui/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Enter your delivery details and confirm your Omni Market order. Payment is agreed with the seller.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
