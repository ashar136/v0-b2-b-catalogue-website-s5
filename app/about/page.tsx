import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Award, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">
                Established 2009
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">Crafting Excellence in Every Stitch</h1>
              <p className="text-xl text-muted-foreground text-pretty">
                From {"India's"} textile capital to the world, we bring decades of expertise in manufacturing premium
                waxed cotton and oilskin garments for discerning brands globally.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-secondary">
                  <MapPin className="h-5 w-5 text-foreground" />
                  <span className="font-semibold text-foreground">Kanpur, Uttar Pradesh</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">Rooted in {"India's"} Textile Hub</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Located in Kanpur, the heart of {"India's"} textile industry, F&A International has been at the
                    forefront of premium garment manufacturing for over 15 years. Our strategic location provides us
                    with access to the finest raw materials and skilled artisans who understand the nuances of working
                    with waxed cotton and oilskin fabrics.
                  </p>
                  <p>
                    What started as a small family business has grown into a trusted manufacturing partner for outdoor
                    brands across Europe, North America, and Australia. Our commitment to quality, reliability, and
                    innovation has made us the preferred choice for brands seeking authentic, durable outerwear.
                  </p>
                  <p>
                    We specialize in private label manufacturing, offering complete customization from design
                    conceptualization to final packaging. Our in-house capabilities ensure that every garment meets
                    international quality standards while maintaining the authentic character that makes waxed cotton
                    and oilskin garments so distinctive.
                  </p>
                </div>
                <Button asChild>
                  <Link href="/contact">
                    Partner with Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src="/kanpur-textile-manufacturing-facility.jpg"
                    alt="F&A International manufacturing facility in Kanpur"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-lg border">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Brands Served</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide every decision we make and every garment we craft.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Reliability</h3>
                  <p className="text-muted-foreground">
                    Consistent quality, on-time delivery, and transparent communication. We build lasting partnerships
                    through dependable service and unwavering commitment to our promises.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Flexibility</h3>
                  <p className="text-muted-foreground">
                    Adaptable to your unique requirements, from low MOQs to complex customizations. We work with your
                    timeline and specifications to deliver exactly what you need.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Globe className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Craftsmanship</h3>
                  <p className="text-muted-foreground">
                    Traditional techniques combined with modern precision. Every stitch, seam, and finish reflects our
                    dedication to creating garments that stand the test of time.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                  <img
                    src="/manufacturing-process-quality-control.jpg"
                    alt="Quality control and manufacturing process at F&A International"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold">In-House Expertise & Export Readiness</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Complete Manufacturing Setup</h4>
                      <p className="text-muted-foreground text-sm">
                        From pattern making to final packaging, all processes are handled in-house for complete quality
                        control.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Private Label Specialization</h4>
                      <p className="text-muted-foreground text-sm">
                        Custom branding, labeling, and packaging solutions tailored to your brand identity and market
                        requirements.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">International Compliance</h4>
                      <p className="text-muted-foreground text-sm">
                        All products meet international safety and quality standards, with proper documentation for
                        seamless export.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Design & Development Support</h4>
                      <p className="text-muted-foreground text-sm">
                        Our design team works closely with you to bring your concepts to life, from initial sketches to
                        production samples.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button variant="outline" asChild>
                    <Link href="/contact">Discuss Your Requirements</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Brands Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-sm opacity-90">Countries Exported</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100K+</div>
                <div className="text-sm opacity-90">Garments Produced</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Experience the F&A Difference?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                {"Let's"} discuss how our expertise, reliability, and craftsmanship can help bring your brand vision to
                life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">Start Your Project</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/products/mens">View Our Work</Link>
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
