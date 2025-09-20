"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { isListSection } from "@/lib/routeSections"

interface ProductCardProps {
  product: {
    slug: string
    name: string
    summary: string
    images: string[]
    keySpecs: string[]
    moq: string
    category: string
    subCategory?: string
    fabric_oz?: number
    description?: string
    downloads?: {
      specSheet?: string
      sizeChartPdf?: string
    }
  }
  viewMode?: "grid" | "list"
  onCompare?: () => void
  isComparing?: boolean
  href?: string // Added optional href prop for custom routing
}

export function ProductCard({
  product,
  viewMode = "grid",
  onCompare,
  isComparing = false,
  href, // Added href parameter
}: ProductCardProps) {
  const router = useRouter()
  const pathname = usePathname() || ""
  const hideButtons = pathname && isListSection(pathname)

  const getProductPath = () => {
    if (href) return href

    if (product.category === "Women") {
      return `/products/womens/${product.slug}`
    } else if (product.category === "Men") {
      return `/products/mens/${product.slug}`
    } else if (product.category === "Accessories") {
      return `/products/accessories/${product.slug}`
    }
    // Fallback for other categories
    return `/products/${product.category.toLowerCase()}/${product.slug}`
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on buttons or checkboxes
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("a") ||
      (e.target as HTMLElement).closest("[data-radix-collection-item]")
    ) {
      return
    }
    router.push(getProductPath())
  }

  const getWhatsAppMessage = () => {
    const productUrl = `${window.location.origin}${getProductPath()}`
    return `Hi, I'm interested in the ${product.name}. Can you provide more details? ${productUrl}`
  }

  const displayImage = product.images?.[0] || "/modern-tech-product.png"

  const createBadges = () => {
    const badges = []

    if (product.fabric_oz) {
      badges.push(`${product.fabric_oz}oz`)
    }

    // Extract lining info from keySpecs
    const liningSpec = product.keySpecs?.find(
      (spec) =>
        spec.toLowerCase().includes("lining") ||
        spec.toLowerCase().includes("sherpa") ||
        spec.toLowerCase().includes("quilted"),
    )
    if (liningSpec) {
      if (liningSpec.toLowerCase().includes("sherpa")) badges.push("Sherpa-lined")
      else if (liningSpec.toLowerCase().includes("quilted")) badges.push("Quilted")
    }

    // Weather resistance
    const weatherResistant = product.keySpecs?.some(
      (spec) => spec.toLowerCase().includes("water") || spec.toLowerCase().includes("wind"),
    )
    if (weatherResistant) badges.push("Weather-resistant")

    // YKK Hardware
    const hasYKK = product.keySpecs?.some((spec) => spec.toLowerCase().includes("ykk"))
    if (hasYKK) badges.push("YKK")

    return badges.slice(0, 4) // Limit to 4 badges
  }

  const badges = createBadges()

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={handleCardClick}>
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Image */}
            <div className="w-32 h-32 bg-gray-50 rounded-lg flex-shrink-0 p-2">
              <img
                src={displayImage || "/modern-tech-product.png"}
                alt={product.name}
                className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{product.subCategory}</p>
                </div>
                <div className="flex items-center gap-2">
                  {onCompare && (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`compare-${product.slug}`}
                        checked={isComparing}
                        onCheckedChange={(checked) => {
                          onCompare()
                        }}
                      />
                      <label htmlFor={`compare-${product.slug}`} className="text-xs text-muted-foreground">
                        Compare
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{product.summary}</p>

              <div className="flex flex-wrap gap-1">
                {badges.map((badge, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-gray-50 border border-border text-muted-foreground"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">MOQ: </span>
                  <span className="font-medium text-foreground">{product.moq}</span>
                </div>

                <div className="flex gap-2">
                  {!hideButtons && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        window.open(
                          `https://wa.me/919876543210?text=${encodeURIComponent(getWhatsAppMessage())}`,
                          "_blank",
                        )
                      }}
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                  )}
                  <Button size="sm" asChild>
                    <Link href={`/contact?product=${product.slug}`}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Enquire
                    </Link>
                  </Button>
                  {!hideButtons && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={product.downloads?.specSheet || "/size-chart.pdf"} target="_blank">
                        <Download className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
      onClick={handleCardClick}
    >
      {/* Compare checkbox overlay */}
      {onCompare && (
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
            <Checkbox
              id={`compare-${product.slug}`}
              checked={isComparing}
              onCheckedChange={(checked) => {
                onCompare()
              }}
            />
            <label htmlFor={`compare-${product.slug}`} className="text-xs text-muted-foreground">
              Compare
            </label>
          </div>
        </div>
      )}

      <div className="aspect-[4/5] w-full bg-gray-50 p-4 rounded-t-lg">
        <img
          src={displayImage || "/modern-tech-product.png"}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-1 text-foreground">{product.name}</h3>
            {product.subCategory && <p className="text-xs text-muted-foreground mb-2">{product.subCategory}</p>}
            <p className="text-muted-foreground text-sm line-clamp-2">{product.summary}</p>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {badges.map((badge, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-gray-50 border border-border text-muted-foreground"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Category:</span>
              <span className="font-medium text-foreground">{product.subCategory || product.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">MOQ:</span>
              <span className="font-medium text-foreground">{product.moq}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button className="w-full bg-foreground hover:bg-foreground/90 text-background border-0" asChild>
              <Link href={`/contact?product=${product.slug}`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Quote
              </Link>
            </Button>

            <div className="grid grid-cols-2 gap-2">
              {!hideButtons && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-foreground text-foreground hover:border-foreground/80 hover:text-foreground/80 bg-transparent"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(getWhatsAppMessage())}`, "_blank")
                  }}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
              )}
              {!hideButtons && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-foreground text-foreground hover:border-foreground/80 hover:text-foreground/80 bg-transparent"
                  asChild
                >
                  <Link href={product.downloads?.specSheet || "/size-chart.pdf"} target="_blank">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
