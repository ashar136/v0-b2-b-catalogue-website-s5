"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { CONTACT, mailto } from "@/lib/contact"

export function HeroSection() {
  return (
    <section className="relative bg-muted section-padding">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-balance leading-tight text-foreground">
                Your Brand, Our Craft — Oilskin & Waxed Outerwear
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground text-pretty leading-relaxed max-w-2xl">
                From rugged jackets to weatherproof vests, we build to your tech pack with expert craftsmanship. MOQ
                50/style (any size mix), full customization, and timelines quoted after spec & materials confirmation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href={mailto(CONTACT.cta_subject, CONTACT.cta_default_message)}
                className="inline-flex items-center justify-center gap-3 text-lg px-10 py-4 rounded-md font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                style={{
                  backgroundColor: "#1f2937",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#111827"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#1f2937"
                }}
              >
                Request a Quote
                <ArrowRight className="ml-3 h-5 w-5" />
              </a>
              <Button
                variant="outline"
                className="border-foreground text-foreground hover:border-foreground/80 hover:text-foreground/80 text-lg px-10 py-4 bg-transparent"
                asChild
              >
                <Link href="/contact#quote">Start Your Order</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12">
              <div className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-sm border border-border">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground">Low MOQs from 50 pieces</span>
              </div>
              <div className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-sm border border-border">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground">Full Customization</span>
              </div>
              <div className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-sm border border-border">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground">Export Ready Quality</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden shadow-xl relative">
              <img
                src="/professional-waxed-cotton-jacket-on-mannequin-in-w.jpg"
                alt="Premium waxed cotton jacket showcasing craftsmanship"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-card p-8 rounded-xl shadow-lg border border-border">
              <div className="text-3xl font-heading font-bold text-foreground">15+</div>
              <div className="text-sm font-medium text-muted-foreground tracking-wide">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
