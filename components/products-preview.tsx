import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const productCategories = [
  {
    title: "Men's Collection",
    description:
      "Professional outerwear including coats, jackets, and vests crafted from premium waxed cotton and oilskin.",
    image: "/mens-waxed-cotton-jacket-collection-display.jpg",
    href: "/products/mens",
  },
  {
    title: "Women's Collection",
    description: "Stylish and functional outerwear combining fashion with durability.",
    image: "/womens-oilskin-coat-collection-elegant-display.jpg",
    href: "/products/womens",
  },
  {
    title: "Accessories",
    description: "Hats, bags, and complementary items to complete the outdoor look.",
    image: "/waxed-cotton-accessories-hats-bags-display.jpg",
    href: "/products/accessories",
  },
]

export function ProductsPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Product Collections</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of waxed cotton and oilskin garments, crafted for durability and style.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  asChild
                >
                  <Link href={category.href}>
                    View Collection
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
