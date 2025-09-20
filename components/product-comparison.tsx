"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Download, MessageSquare } from "lucide-react"
import Link from "next/link"
import { products } from "@/data/products"

interface ProductComparisonProps {
  productSlugs: string[]
  onClose: () => void
}

export function ProductComparison({ productSlugs, onClose }: ProductComparisonProps) {
  const compareProducts = products.filter((p) => productSlugs.includes(p.slug))

  if (compareProducts.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Product Comparison</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <div className="grid gap-6" style={{ gridTemplateColumns: `200px repeat(${compareProducts.length}, 1fr)` }}>
              {/* Header Row */}
              <div className="font-semibold text-muted-foreground">Product</div>
              {compareProducts.map((product) => (
                <Card key={product.slug} className="relative">
                  <CardHeader className="pb-3">
                    <div className="aspect-square bg-gray-50 rounded-lg mb-3 overflow-hidden">
                      <img
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{product.subCategory}</p>
                  </CardHeader>
                </Card>
              ))}

              {/* Materials Row */}
              <div className="font-semibold text-muted-foreground">Materials</div>
              {compareProducts.map((product) => (
                <div key={`materials-${product.slug}`} className="space-y-1">
                  {product.materials?.map((material, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {material.composition} ({material.percentage}%)
                    </Badge>
                  )) || <span className="text-sm text-muted-foreground">-</span>}
                </div>
              ))}

              {/* Fabric Weight Row */}
              <div className="font-semibold text-muted-foreground">Fabric Weight</div>
              {compareProducts.map((product) => (
                <div key={`fabric-${product.slug}`}>
                  {product.fabric_oz ? (
                    <Badge variant="outline">{product.fabric_oz}oz</Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">-</span>
                  )}
                </div>
              ))}

              {/* Lining Row */}
              <div className="font-semibold text-muted-foreground">Lining</div>
              {compareProducts.map((product) => (
                <div key={`lining-${product.slug}`} className="text-sm">
                  {product.lining || <span className="text-muted-foreground">-</span>}
                </div>
              ))}

              {/* Customization Row */}
              <div className="font-semibold text-muted-foreground">Customization</div>
              {compareProducts.map((product) => (
                <div key={`custom-${product.slug}`} className="space-y-1">
                  {product.customization ? (
                    <div className="space-y-1">
                      {product.customization.privateLabelReady && (
                        <Badge variant="secondary" className="text-xs">
                          Private Label
                        </Badge>
                      )}
                      {product.customization.brandedSnaps && (
                        <Badge variant="secondary" className="text-xs">
                          Branded Snaps
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Available</span>
                  )}
                </div>
              ))}

              {/* Size Range Row */}
              <div className="font-semibold text-muted-foreground">Size Range</div>
              {compareProducts.map((product) => (
                <div key={`sizes-${product.slug}`} className="text-sm">
                  {product.variants?.[0]?.sizes
                    ? `${product.variants[0].sizes[0]} - ${product.variants[0].sizes[product.variants[0].sizes.length - 1]}`
                    : `${product.sizeChart[0]?.Size} - ${product.sizeChart[product.sizeChart.length - 1]?.Size}`}
                </div>
              ))}

              {/* MOQ Row */}
              <div className="font-semibold text-muted-foreground">MOQ</div>
              {compareProducts.map((product) => (
                <div key={`moq-${product.slug}`} className="text-sm font-medium">
                  {product.moq}
                </div>
              ))}

              {/* Actions Row */}
              <div className="font-semibold text-muted-foreground">Actions</div>
              {compareProducts.map((product) => (
                <div key={`actions-${product.slug}`} className="space-y-2">
                  <Button size="sm" className="w-full" asChild>
                    <Link href={`/contact?product=${product.slug}`}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Enquire
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" className="w-full bg-transparent" asChild>
                    <Link href={product.downloads?.specSheet || "/downloads/spec-sheet.pdf"} target="_blank">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
