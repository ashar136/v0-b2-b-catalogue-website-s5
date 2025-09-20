import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Package, Globe } from "lucide-react"
import Link from "next/link"
import { products } from "@/data/products"

export default function ProductsOverviewPage() {
  const mensProducts = products.filter((product) => product.category === "Men")
  const womensProducts = products.filter((product) => product.category === "Women")

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                B2B Product Catalogue
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Professional Outerwear Collections</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Premium oilskin and waxed cotton outerwear designed for B2B partners. Private-label ready with
                customizable branding and materials.
              </p>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Men's Collection */}
              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-[4/3] bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/men-s-outerwear-collection.jpg"
                      alt="Men's Collection"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-2xl">Men's Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Rugged outerwear designed for durability and functionality. Features coats, jackets, and vests in
                    premium materials.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>{mensProducts.length} Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>MOQ: 50+ pieces</span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/products/mens">
                      View Men's Collection
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Women's Collection */}
              <Card className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="aspect-[4/3] bg-gray-50 rounded-lg mb-4 overflow-hidden">
                    <img
                      src="/women-s-outerwear-collection.jpg"
                      alt="Women's Collection"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-2xl">Women's Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Sophisticated outerwear combining feminine styling with outdoor functionality. Tailored fits with
                    premium materials and finishes.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="h-4 w-4" />
                      <span>{womensProducts.length} Products</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>MOQ: 25+ pieces</span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/products/womens">
                      View Women's Collection
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Collections</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Private Label Ready</h3>
                  <p className="text-muted-foreground">
                    All products support custom branding, labels, and packaging to match your brand identity.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Flexible MOQs</h3>
                  <p className="text-muted-foreground">
                    Low minimum order quantities starting from 25 pieces, with size mix flexibility.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Global Shipping</h3>
                  <p className="text-muted-foreground">
                    Export-ready documentation and worldwide shipping capabilities for international partners.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Order?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contact our B2B team to discuss your requirements, get samples, and receive custom quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Request Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
