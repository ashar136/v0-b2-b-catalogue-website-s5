export const dynamic = "force-dynamic"
export const revalidate = 0

import { notFound } from "next/navigation"
import { products } from "@/data/products"
import { ProductDetailPage } from "@/components/product-detail-page"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    notFound()
  }

  return <ProductDetailPage product={product} />
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} - FA International`,
    description: product.summary,
  }
}
