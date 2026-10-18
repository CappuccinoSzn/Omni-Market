import type { Metadata } from "next";
import AuthForm from "@/app/ui/auth-form";
import { shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Create a free Omni Market account to save favourites, list items for sale and keep your order history.",
};

export default function RegisterPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <AuthForm mode="register" />
    </main>
  );
}
