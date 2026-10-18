import type { Metadata } from "next";
import CartView from "@/app/ui/cart-view";

export const metadata: Metadata = {
  title: "Your bag",
  description:
    "Review the items you added on Omni Market, adjust quantities and continue to checkout.",
};

export default function CartPage() {
  return <CartView />;
}
