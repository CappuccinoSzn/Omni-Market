import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products, relatedProducts } from "@/app/lib/catalog";
import ProductDetail from "@/app/ui/product-detail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // Partial prerendering means an unknown slug already sent its status line,
  // so the not-found page cannot arrive as a 404. Keep it out of search results.
  if (!product) return { title: "Product not found", robots: { index: false } };

  return {
    title: product.name,
    description: `${product.description} Listed by ${product.seller} in ${product.location}.`,
    openGraph: {
      title: `${product.name} | Omni Market`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

function ProductSkeleton() {
  return (
    <main className="mx-auto grid w-full max-w-[1360px] gap-8 px-4 py-14 lg:grid-cols-2 lg:px-12">
      <div className="h-[320px] animate-pulse rounded-[28px] bg-[#eceee6] sm:h-[520px]" />
      <div className="space-y-4">
        <div className="h-6 w-32 animate-pulse rounded-full bg-[#eceee6]" />
        <div className="h-10 w-2/3 animate-pulse rounded-2xl bg-[#eceee6]" />
        <div className="h-6 w-40 animate-pulse rounded-full bg-[#eceee6]" />
        <div className="h-24 w-full animate-pulse rounded-2xl bg-[#eceee6]" />
      </div>
    </main>
  );
}

async function ResolvedProduct({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  return <ProductDetail product={product} related={relatedProducts(product)} />;
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ResolvedProduct params={params} />
    </Suspense>
  );
}
