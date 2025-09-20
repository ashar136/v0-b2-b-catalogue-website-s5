export const dynamic = "force-dynamic"
export const revalidate = 0

import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailPage } from "@/components/product-detail-page"
import { products } from "@/data/products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

const SLUG_ALIASES: Record<string, string> = {
  "oilskin-boot-guards": "oilskin-boot-guards-acc",
  "oilskin-dog-coat-black": "oilskin-dog-coat-black-acc",
  "oilskin-dog-coat-black-check": "oilskin-dog-coat-black-check-acc",
  "oilskin-dog-coat-black-sherpa": "oilskin-dog-coat-black-sherpa-acc",
  "oilskin-overpants": "oilskin-overpants-acc",
  "oilskin-chaps": "oilskin-chaps-acc",
  "oilskin-hat-no-flaps": "oilskin-hat-no-flaps-acc",
  "oilskin-hat-with-flaps": "oilskin-hat-with-flaps-acc",
  "murray-hat": "murray-hat-acc",
  "oilskin-gaiters": "oilskin-gaiters-acc",
}

export async function generateMetadata({ params }: ProductPageProps) {
  let product = products.find((p) => p.slug === params.slug && p.category === "Accessories")

  if (!product && SLUG_ALIASES[params.slug]) {
    product = products.find((p) => p.slug === SLUG_ALIASES[params.slug] && p.category === "Accessories")
  }

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | Accessories | F&A International`,
    description: product.summary,
    keywords: [
      product.name,
      "accessories",
      "B2B",
      "private label",
      "oilskin",
      "outdoor accessories",
      ...(product.keySpecs || []),
    ].join(", "),
  }
}

export default function AccessoriesProductPage({ params }: ProductPageProps) {
  let product = products.find((p) => p.slug === params.slug && p.category === "Accessories")

  if (!product && SLUG_ALIASES[params.slug]) {
    product = products.find((p) => p.slug === SLUG_ALIASES[params.slug] && p.category === "Accessories")
  }

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
  const accessoryProducts = products.filter((product) => product.category === "Accessories")

  // Generate params for both original slugs and aliases
  const params = []

  for (const product of accessoryProducts) {
    params.push({ slug: product.slug })

    // Also generate for alias slugs
    for (const [alias, originalSlug] of Object.entries(SLUG_ALIASES)) {
      if (originalSlug === product.slug) {
        params.push({ slug: alias })
      }
    }
  }

  return params
}
