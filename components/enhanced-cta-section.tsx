import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Download, MessageCircle, Star, Globe, Shield, Zap } from "lucide-react"
import { CONTACT, whatsappLink } from "@/lib/contact"

export default function EnhancedCTASection() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('/waxed-cotton-texture.jpg')] bg-cover bg-center opacity-5"></div>
      <div className="absolute inset-0 bg-gray-50/95"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent hover:bg-accent/90 text-white px-4 py-2 text-sm font-semibold">
              <Globe className="w-4 h-4 mr-2" />
              Export Ready Manufacturing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Ready to Start Your
              <span className="text-accent block">Premium Collection?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
              Join 1000+ global brands who trust {CONTACT.company} for their waxed cotton and oilskin manufacturing
              needs. Get started with our comprehensive catalogue or speak directly with our export specialists.
            </p>
          </div>

          {/* CTA Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {/* Download Catalogue Card */}
            <Card className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <Download className="w-8 h-8 text-accent" />
                  </div>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Download Complete Catalogue</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Get our comprehensive 40-page catalogue with detailed specifications, pricing, and customization
                  options for all product lines.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Complete product specifications & sizing charts</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Bulk pricing tiers and MOQ information</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Customization options and private labeling</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Export documentation and shipping details</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  size="lg"
                  asChild
                >
                  <a href="/contact">
                    <Download className="w-5 h-5 mr-2" />
                    Download Free Catalogue
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  Instant download • No registration required • 40+ pages
                </p>
              </CardContent>
            </Card>

            {/* Direct Contact Card */}
            <Card className="bg-white border shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-accent p-3 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-accent text-white px-3 py-1">
                    <Zap className="w-3 h-3 mr-1" />
                    24h Response
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">Speak with Export Specialist</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Get personalized consultation for your specific requirements. Our experts will help you choose the
                  right products and quantities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Custom quote based on your requirements</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Sample arrangement and quality discussion</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Production timeline and shipping options</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Private labeling and customization guidance</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <a href={whatsappLink(CONTACT.cta_default_message)} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-semibold py-3 px-4 rounded-lg transition-all duration-300 bg-transparent"
                    asChild
                  >
                    <a href={`tel:${CONTACT.phone}`}>Call Now</a>
                  </Button>
                </div>

                <p className="text-sm text-muted-foreground text-center">Available {CONTACT.hours} • English & Hindi</p>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">50+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">1000+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-3">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-1">50</div>
              <div className="text-muted-foreground">Min. Order Qty</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
