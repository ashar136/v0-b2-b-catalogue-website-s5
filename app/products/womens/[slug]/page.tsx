export const dynamic = "force-dynamic"
export const revalidate = 0

import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailPage } from "@/components/product-detail-page"
import { EventTrackerProvider } from "@/components/analytics/event-tracker"
import { products } from "@/data/products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug && p.category === "Women")

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | Women | F&A International`,
    description: product.summary,
    keywords: [
      product.name,
      "women's outerwear",
      "B2B",
      "private label",
      "waxed cotton",
      "oilskin",
      ...(product.keySpecs || []),
    ].join(", "),
  }
}

export default function WomensProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug && p.category === "Women")

  if (!product) {
    notFound()
  }

  return (
    <EventTrackerProvider>
      <div className="min-h-screen">
        <Header />
        <ProductDetailPage product={product} />
        <Footer />
      </div>
    </EventTrackerProvider>
  )
}

export async function generateStaticParams() {
  const womensProducts = products.filter((product) => product.category === "Women")

  return womensProducts.map((product) => ({
    slug: product.slug,
  }))
}
