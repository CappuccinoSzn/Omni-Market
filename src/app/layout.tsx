
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CUK Shop | Buy and Sell Online",
  description:
    "Discover products, shop online, and connect with sellers on CUK Shop.",
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
