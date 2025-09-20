import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import { CONTACT } from "@/lib/contact"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">{CONTACT.company}</h3>
            <p className="text-muted-foreground text-sm">
              Premium manufacturer of waxed cotton and oilskin garments, serving brands worldwide from {"India's"}{" "}
              textile hub.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Products</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/products/mens"
                className="block text-foreground hover:text-accent-foreground hover:underline transition-all"
              >
                {"Men's Collection"}
              </Link>
              <Link
                href="/products/womens"
                className="block text-foreground hover:text-accent-foreground hover:underline transition-all"
              >
                {"Women's Collection"}
              </Link>
              <Link
                href="/products/accessories"
                className="block text-foreground hover:text-accent-foreground hover:underline transition-all"
              >
                Accessories
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <div className="space-y-2 text-sm">
              <Link
                href="/about"
                className="block text-foreground hover:text-accent-foreground hover:underline transition-all"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block text-foreground hover:text-accent-foreground hover:underline transition-all"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Info</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <div>
                  <div>{CONTACT.address_lines[0]}</div>
                  
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={`tel:${CONTACT.phone}`} className="hover:text-accent transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${CONTACT.email_general}`} className="hover:text-accent transition-colors">
                  {CONTACT.email_general}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 {CONTACT.company}. All rights reserved. | Crafted in India, Worn Worldwide</p>
        </div>
      </div>
    </footer>
  )
}
