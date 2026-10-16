
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Omni Market | Buy and Sell Online",
  description:
    "Discover products, shop online, and connect with sellers on Omni Market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
