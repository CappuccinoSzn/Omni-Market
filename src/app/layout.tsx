import type { Metadata } from "next";
import { AppProvider } from "@/app/lib/store";
import CartDrawer from "@/app/ui/cart-drawer";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/header";
import Toast from "@/app/ui/toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Omni Market | Buy and sell online in Kenya",
    template: "%s | Omni Market",
  },
  description:
    "Discover products, shop online, and connect with sellers on Omni Market — a marketplace made for everyone in Kenya.",
  applicationName: "Omni Market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#fcfcf9] text-[#202a22]">
        <AppProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CartDrawer />
          <Toast />
        </AppProvider>
      </body>
    </html>
  );
}
