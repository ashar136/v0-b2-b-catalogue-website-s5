"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Download, X, Phone, ChevronLeft, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { SizeChartButton } from "@/components/size-chart/SizeChartButton"
import ProductSizeChartPanel from "@/components/pdp/ProductSizeChartPanel"
import { usePathname } from "next/navigation"
import { isPdpPath } from "@/lib/routeSections"

interface Product {
  slug: string
  name: string
  category: string
  subCategory?: string
  images: string[]
  summary: string
  descriptionShort?: string
  descriptionLong?: string
  keySpecs: string[]
  materials?: Array<{ type: string; composition: string; percentage: number }>
  fabric_oz?: number
  lining?: string
  hardware_notes?: string
  fit_notes?: string
  variants?: Array<{ colorName: string; sizes: string[] }>
  moq: string
  customization?: {
    privateLabelReady: boolean
    brandedSnaps: boolean
    liningOptions: string[]
    colorways: string
  }
  downloads?: {
    specSheet?: string
    sizeChartPdf?: string
  }
  needsReview?: boolean
  notes?: string
  description: string
  features: string[]
  sizeChart: Array<{ Size: string; Chest_cm: number; Hip_cm: number; Length_cm: number }>
  care: string[]
  shipping: string[]
}

interface ProductDetailPageProps {
  product: Product
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const pathname = usePathname()
  const hidePdpButtons = isPdpPath(pathname)

  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [showRFQModal, setShowRFQModal] = useState(false)
  const [selectedColor, setSelectedColor] = useState(product.variants?.[0]?.colorName || "")
  const [selectedSize, setSelectedSize] = useState("")
  const [zoomLevel, setZoomLevel] = useState(1)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const breadcrumbCategory = product.category === "Women" ? "womens" : product.category.toLowerCase()

  const safeImages = product.images || []
  const safeFeatures = product.features || []
  const safeSizeChart = product.sizeChart || []
  const safeCare = product.care || []
  const safeShipping = product.shipping || []
  const safeKeySpecs = product.keySpecs || []

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxOpen) {
        switch (e.key) {
          case "Escape":
            setLightboxOpen(false)
            setZoomLevel(1)
            break
          case "ArrowLeft":
            e.preventDefault()
            setSelectedImage((prev) => (prev > 0 ? prev - 1 : safeImages.length - 1))
            break
          case "ArrowRight":
            e.preventDefault()
            setSelectedImage((prev) => (prev < safeImages.length - 1 ? prev + 1 : 0))
            break
          case "+":
          case "=":
            e.preventDefault()
            setZoomLevel((prev) => Math.min(prev + 0.5, 3))
            break
          case "-":
            e.preventDefault()
            setZoomLevel((prev) => Math.max(prev - 0.5, 1))
            break
        }
      } else {
        if (e.key === "Escape" && showRFQModal) {
          setShowRFQModal(false)
        }
      }
    },
    [lightboxOpen, showRFQModal, safeImages.length],
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && selectedImage < safeImages.length - 1) {
      setSelectedImage((prev) => prev + 1)
    }
    if (isRightSwipe && selectedImage > 0) {
      setSelectedImage((prev) => prev - 1)
    }
  }

  const getOrderedImages = () => {
    const imageOrder = ["front", "back", "open", "side", "detail", "model"]
    const orderedImages = [...safeImages]

    orderedImages.sort((a, b) => {
      const aType = imageOrder.find((type) => a.toLowerCase().includes(type)) || "zzz"
      const bType = imageOrder.find((type) => b.toLowerCase().includes(type)) || "zzz"
      return imageOrder.indexOf(aType) - imageOrder.indexOf(bType)
    })

    return orderedImages
  }

  const orderedImages = getOrderedImages()

  const getImagesForColor = (color: string) => {
    if (!color) return orderedImages
    return orderedImages.filter(
      (img) =>
        img.toLowerCase().includes(color.toLowerCase()) ||
        !product.variants?.some((v) => img.toLowerCase().includes(v.colorName.toLowerCase())),
    )
  }

  const currentImages = selectedColor ? getImagesForColor(selectedColor) : orderedImages
  const displayImages = currentImages.length > 0 ? currentImages : orderedImages

  useEffect(() => {
    if (selectedColor) {
      const colorImages = getImagesForColor(selectedColor)
      if (colorImages.length > 0 && !colorImages.includes(orderedImages[selectedImage])) {
        setSelectedImage(0)
      }
    }
  }, [selectedColor])

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/products/${breadcrumbCategory}`} className="hover:text-foreground">
              {product.category === "Women" ? "Womens" : product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Enhanced Images Gallery */}
          <div className="space-y-4">
            {/* Main Image with swipe support */}
            <div
              className="aspect-square bg-gray-50 rounded-lg overflow-hidden relative group"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={displayImages[selectedImage] || "/placeholder.svg"}
                alt={`${product.name} – ${selectedColor || "default"} view ${selectedImage + 1}`}
                width={600}
                height={600}
                className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => setLightboxOpen(true)}
                priority={selectedImage === 0}
              />

              {/* Navigation arrows for desktop */}
              {displayImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1))}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0))}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* Image counter */}
              {displayImages.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {selectedImage + 1} / {displayImages.length}
                </div>
              )}
            </div>

            {/* Enhanced Thumbnail Gallery */}
            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "aspect-square bg-gray-50 rounded-lg overflow-hidden border-2 transition-all duration-200",
                      selectedImage === index
                        ? "border-accent ring-2 ring-accent/20"
                        : "border-border hover:border-gray-300 hover:shadow-md",
                    )}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      width={150}
                      height={150}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info (Sticky) */}
          <div className="lg:sticky lg:top-8 lg:h-fit space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
              {product.subCategory && <p className="text-sm text-muted-foreground mb-2">{product.subCategory}</p>}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.descriptionShort || product.summary}
              </p>
            </div>

            {/* Key Specs with enhanced B2B info */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {product.fabric_oz && (
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200">
                    {product.fabric_oz}oz
                  </Badge>
                )}
                {product.lining && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border border-green-200">
                    {product.lining.includes("Sherpa")
                      ? "Sherpa-lined"
                      : product.lining.includes("Quilted")
                        ? "Quilted"
                        : "Lined"}
                  </Badge>
                )}
                {product.hardware_notes?.includes("YKK") && (
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border border-purple-200">
                    YKK Hardware
                  </Badge>
                )}
                {safeKeySpecs.some((spec) => spec.toLowerCase().includes("water")) && (
                  <Badge variant="secondary" className="bg-cyan-50 text-cyan-700 border border-cyan-200">
                    Weather-resistant
                  </Badge>
                )}
              </div>
            </div>

            {/* MOQ Block */}
            <Card className="border-2 border-accent/20 bg-accent/5">
              <CardContent className="p-4">
                <p className="font-semibold text-foreground mb-1">MOQ: {product.moq}</p>
                <p className="text-sm text-muted-foreground">
                  {product.customization?.privateLabelReady
                    ? "Private-label ready with custom branding options"
                    : "Built to your tech pack — private-label ready"}
                </p>
              </CardContent>
            </Card>

            {/* Enhanced Variant Pickers */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                {/* Color Picker with live gallery filtering */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Color {selectedColor && <span className="text-muted-foreground">({selectedColor})</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(product.variants || []).map((variant) => (
                      <button
                        key={variant.colorName}
                        onClick={() => setSelectedColor(variant.colorName)}
                        className={cn(
                          "px-3 py-2 text-sm border rounded-md transition-all duration-200",
                          selectedColor === variant.colorName
                            ? "border-accent bg-accent text-accent-foreground shadow-md"
                            : "border-border bg-background hover:border-accent/50 hover:shadow-sm",
                        )}
                      >
                        {variant.colorName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Size Picker with availability */}
                {selectedColor && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Size {selectedSize && <span className="text-muted-foreground">({selectedSize})</span>}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(product.variants || [])
                        .find((v) => v.colorName === selectedColor)
                        ?.sizes?.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={cn(
                              "px-3 py-2 text-sm border rounded-md transition-all duration-200",
                              selectedSize === size
                                ? "border-accent bg-accent text-accent-foreground shadow-md"
                                : "border-border bg-background hover:border-accent/50 hover:shadow-sm",
                            )}
                          >
                            {size}
                          </button>
                        )) || []}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3">
              <Button
                onClick={() => setShowRFQModal(true)}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3"
              >
                Request a Quote
              </Button>

              <div className="grid grid-cols-3 gap-2">
                <SizeChartButton
                  variant="outline"
                  size="sm"
                  className="border-foreground text-foreground hover:border-foreground/80 hover:text-foreground/80 bg-transparent"
                />
                {!hidePdpButtons && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-foreground text-foreground hover:border-foreground/80 hover:text-foreground/80 bg-transparent"
                    asChild
                  >
                    <Link
                      href={`https://wa.me/1234567890?text=Hi, I'm interested in the ${product.name}${selectedColor ? ` in ${selectedColor}` : ""}${selectedSize ? ` size ${selectedSize}` : ""}. Can you provide more details?`}
                      target="_blank"
                    >
                      <Phone className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Link>
                  </Button>
                )}
                {!hidePdpButtons && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-foreground text-foreground hover:border-foreground/80 hover:text-foreground/80 bg-transparent"
                    asChild
                  >
                    <Link href={product.downloads?.specSheet || "/downloads/spec-sheet.pdf"} target="_blank">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-muted">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="customization">Customization</TabsTrigger>
              <TabsTrigger value="moq-leadtime">MOQ & Lead Time</TabsTrigger>
              <TabsTrigger value="sizing">Size Chart</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Materials & Construction</h3>
                  <div className="space-y-3">
                    {(product.materials || []).map((material, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{material.type}:</span>
                        <span className="font-medium">
                          {material.composition} ({material.percentage}%)
                        </span>
                      </div>
                    ))}
                    {product.fabric_oz && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fabric Weight:</span>
                        <span className="font-medium">{product.fabric_oz}oz</span>
                      </div>
                    )}
                    {product.lining && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Lining:</span>
                        <span className="font-medium">{product.lining}</span>
                      </div>
                    )}
                    {product.hardware_notes && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Hardware:</span>
                        <span className="font-medium">{product.hardware_notes}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="space-y-2">
                    {safeFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-muted-foreground text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customization" className="mt-8">
              {product.customization ? (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Private Label Options</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            product.customization.privateLabelReady ? "bg-green-500" : "bg-gray-300",
                          )}
                        ></div>
                        <span>Private Label Ready</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            product.customization.brandedSnaps ? "bg-green-500" : "bg-gray-300",
                          )}
                        ></div>
                        <span>Branded Snaps Available</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Customization Options</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-muted-foreground">Lining Options:</span>
                        <p className="font-medium">{(product.customization.liningOptions || []).join(", ")}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Colorways:</span>
                        <p className="font-medium">{product.customization.colorways}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Customization details available upon request.</p>
              )}
            </TabsContent>

            <TabsContent value="moq-leadtime" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Minimum Order Quantity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-accent mb-2">{product.moq}</p>
                    <p className="text-sm text-muted-foreground">Mix and match sizes within the same style and color</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Lead Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-accent mb-2">TBD</p>
                    <p className="text-sm text-muted-foreground">Quoted after spec & materials confirmation</p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>
                <div className="space-y-2">
                  {safeShipping.map((info, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-muted-foreground">{info}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="sizing" className="mt-8">
              <ProductSizeChartPanel gender={product.category === "Women" ? "womens" : "mens"} slug={product.slug} />
              {product.fit_notes && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold mb-2">Fit Notes</h4>
                  <p className="text-muted-foreground">{product.fit_notes}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="care" className="mt-8">
              <div className="space-y-3">
                {safeCare.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{instruction}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="compliance" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Packaging & Labels</h3>
                  <p className="text-muted-foreground">TBD - Custom packaging and labeling options available</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">HS Code & Compliance</h3>
                  <p className="text-muted-foreground">
                    TBD - Export documentation and compliance certificates provided
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Enhanced Lightbox Modal with zoom and navigation */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={() => {
                setLightboxOpen(false)
                setZoomLevel(1)
              }}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Zoom controls */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(prev - 0.5, 1))}
                disabled={zoomLevel <= 1}
                className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full disabled:opacity-50"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <button
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.5, 3))}
                disabled={zoomLevel >= 3}
                className="text-white hover:text-gray-300 bg-black/50 p-2 rounded-full disabled:opacity-50"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              <span className="text-white bg-black/50 px-3 py-2 rounded-full text-sm">
                {Math.round(zoomLevel * 100)}%
              </span>
            </div>

            {/* Navigation arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => (prev > 0 ? prev - 1 : displayImages.length - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev < displayImages.length - 1 ? prev + 1 : 0))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Main lightbox image */}
            <div
              className="overflow-auto max-w-full max-h-full"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={displayImages[selectedImage] || "/placeholder.svg"}
                alt={`${product.name} - Full View`}
                width={1200}
                height={1200}
                className="max-w-none object-contain transition-transform duration-200"
                style={{
                  transform: `scale(${zoomLevel})`,
                  cursor: zoomLevel > 1 ? "grab" : "zoom-in",
                }}
                onClick={() => {
                  if (zoomLevel === 1) {
                    setZoomLevel(2)
                  }
                }}
              />
            </div>

            {/* Image counter */}
            {displayImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {selectedImage + 1} / {displayImages.length}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enhanced RFQ Modal */}
      {showRFQModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-foreground">Request Quote</h3>
              <button
                onClick={() => setShowRFQModal(false)}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-muted-foreground mb-4">
              Get a custom quote for the {product.name}. We'll respond within 24 hours.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <input
                type="text"
                placeholder="Target Quantity"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <textarea
                placeholder="Customization requirements, timeline, and other details..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                defaultValue={`I'm interested in the ${product.name}${selectedColor ? ` in ${selectedColor}` : ""}${selectedSize ? ` size ${selectedSize}` : ""}. Please provide pricing and lead times.`}
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Send Quote Request</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
