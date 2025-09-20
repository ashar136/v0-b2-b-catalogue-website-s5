import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailPage } from "@/components/product-detail-page"
import { products } from "@/data/products"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function MensProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.slug === params.slug && p.category === "Men")

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetailPage product={product} />
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const mensProducts = products.filter((product) => product.category === "Men")

  return mensProducts.map((product) => ({
    slug: product.slug,
  }))
}
