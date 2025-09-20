import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, MessageCircle } from "lucide-react"
import Link from "next/link"
import { CONTACT, whatsappLink } from "@/lib/contact"

export function CTASection() {
  return (
    <section className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {"Let's"} discuss your requirements and bring your vision to life with our premium manufacturing
            capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="bg-background text-foreground border-border">
            <CardContent className="p-8 text-center">
              <Download className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Download Full Catalogue</h3>
              <p className="text-muted-foreground mb-6">
                Get detailed specifications, pricing, and MOQ information for all our products.
              </p>
              <Button className="w-full" asChild>
                <Link href="/contact">Download Catalogue</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-background text-foreground border-border">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Start a Conversation</h3>
              <p className="text-muted-foreground mb-6">
                Connect with our team via WhatsApp for instant support and quick quotes.
              </p>
              <Button variant="secondary" className="w-full" asChild>
                <a href={whatsappLink(CONTACT.cta_default_message)} target="_blank" rel="noopener noreferrer">
                  WhatsApp Us
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
