import type { Metadata } from "next";
import AuthForm from "@/app/ui/auth-form";
import { shell } from "@/app/ui/styles";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Omni Market account to reach your bag, favourites and listings.",
};

export default function LoginPage() {
  return (
    <main className={`${shell} py-12 sm:py-16`}>
      <AuthForm mode="login" />
    </main>
  );
}
