"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, MessageCircle, ZoomIn } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

const productImages = [
  {
    src: "/outrider-long-coat-front-black.png",
    alt: "Outrider Long Coat - Front View Black",
    thumbnail: "/outrider-long-coat-front-black.png",
  },
  {
    src: "/outrider-long-coat-back.png",
    alt: "Outrider Long Coat - Back View with Cape",
    thumbnail: "/outrider-long-coat-back.png",
  },
  {
    src: "/outrider-long-coat-open.png",
    alt: "Outrider Long Coat - Open View with Interior",
    thumbnail: "/outrider-long-coat-open.png",
  },
]

const sizeChart = [
  { size: "XS", chest: "116", hip: "115", length: "136" },
  { size: "S", chest: "122", hip: "121", length: "138" },
  { size: "M", chest: "128", hip: "127", length: "140" },
  { size: "L", chest: "134", hip: "133", length: "142" },
  { size: "XL", chest: "140", hip: "139", length: "144" },
  { size: "2XL", chest: "146", hip: "145", length: "146" },
  { size: "3XL", chest: "152", hip: "151", length: "148" },
  { size: "4XL", chest: "158", hip: "157", length: "150" },
]

export default function OutriderLongCoatPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)

  const safeProductImages = productImages || []

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Breadcrumbs */}
        <section className="py-4 border-b border-gray-200">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-gray-900">
                Products
              </Link>
              <span>/</span>
              <Link href="/products/mens" className="hover:text-gray-900">
                Men
              </Link>
              <span>/</span>
              <span className="text-gray-900">Outrider Long Coat</span>
            </nav>
          </div>
        </section>

        {/* Product Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Column - Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-[4/5] bg-gray-50 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={safeProductImages[selectedImage]?.src || "/placeholder.svg"}
                    alt={safeProductImages[selectedImage]?.alt || "Product image"}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => setShowLightbox(true)}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3">
                  {safeProductImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={cn(
                        "relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors",
                        selectedImage === index ? "border-gray-900" : "border-gray-200 hover:border-gray-300",
                      )}
                    >
                      <Image
                        src={image?.thumbnail || "/placeholder.svg"}
                        alt={image?.alt || `Product image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Column - Product Info */}
              <div className="lg:sticky lg:top-8 lg:self-start">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Outrider Long Coat</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      Lightweight long oilskin coat for warmer conditions, designed for protection and mobility while
                      riding.
                    </p>
                  </div>

                  {/* Key Specs */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Specifications</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        12oz Natural Oilskin Cotton
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        Cotton Drill Lining
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        Water & Wind Resistant
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        Detachable/Attached Shoulder Cape
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        Riding Gusset for Mobility
                      </Badge>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                        YKK Zippers
                      </Badge>
                    </div>
                  </div>

                  {/* MOQ */}
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm font-medium text-orange-800 mb-1">Minimum Order Quantity</p>
                    <p className="text-lg font-bold text-orange-900">MOQ 50/style (any size mix)</p>
                  </div>

                  {/* Customization */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Customization Available</p>
                    <p className="text-gray-900">Built to your tech pack — full private-label branding available.</p>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white" asChild>
                      <Link href="/contact?product=outrider-long-coat">Request a Quote</Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Size Chart
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp Us
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="py-12 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Key Features</TabsTrigger>
                <TabsTrigger value="sizing">Size Chart</TabsTrigger>
                <TabsTrigger value="care">Care Instructions</TabsTrigger>
                <TabsTrigger value="shipping">Shipping & MOQ</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    This lightweight long oilskin coat is made for warmer conditions without sacrificing protection.
                    Constructed from 12oz natural oilskin cotton, it features an attached shoulder cape, snap-tab neck
                    closure, spacious front pockets, and a rear gusset for improved mobility when riding. Its relaxed
                    fit makes it easy to wear comfortably over other layers.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="features" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Main Fabric:</p>
                        <p className="text-gray-700">100% natural oilskin cotton, 12oz</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Lining:</p>
                        <p className="text-gray-700">100% cotton drill (half-body & sleeve)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Weather:</p>
                        <p className="text-gray-700">Water & wind resistant</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Cape:</p>
                        <p className="text-gray-700">Detachable/attached shoulder cape with underarm retainers</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Front:</p>
                        <p className="text-gray-700">Storm flap with logo snap closure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Pockets:</p>
                        <p className="text-gray-700">Patch pockets with top entry; felt-lined hand warmers</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Cuffs:</p>
                        <p className="text-gray-700">Adjustable snap cuffs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Back:</p>
                        <p className="text-gray-700">Riding gusset with snap closure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Ride Features:</p>
                        <p className="text-gray-700">Inside leg straps</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Branding:</p>
                        <p className="text-gray-700">Mock-suede branded patch (your brand)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Other:</p>
                        <p className="text-gray-700">Back-neck hanging loop; internal patch pocket</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-medium text-gray-900">Zippers:</p>
                        <p className="text-gray-700">YKK</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sizing" className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                          Chest (cm)
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                          Hip (cm)
                        </th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">
                          Length (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-300 px-4 py-3 font-medium text-gray-900">{row.size}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.chest}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.hip}</td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">{row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="care" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Store dry, out of direct sunlight</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Do not machine wash, dry clean, or iron</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Reproof oilskin periodically to maintain water resistance</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">
                      <strong>MOQ 50/style</strong> (any size mix)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Lead times quoted after spec & material confirmation</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">Export documentation provided; worldwide shipping</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
