import type { Metadata } from "next";
import CategoriesExplorer from "@/app/ui/categories-explorer";

export const metadata: Metadata = {
  title: "Explore categories",
  description:
    "Every category sellers publish on Omni Market, with live listing counts and starting prices.",
};

export default function CategoriesPage() {
  return <CategoriesExplorer />;
}
