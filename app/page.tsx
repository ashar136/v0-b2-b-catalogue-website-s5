import type { Metadata } from "next"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ProductsPreview } from "@/components/products-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { CONTACT } from "@/lib/contact"

export const metadata: Metadata = {
  title: "F&A International - Premium Oilskin & Waxed Cotton Manufacturer | Export Ready",
  description:
    "Leading manufacturer & exporter of waxed cotton and oilskin garments from India. Private label, bulk orders, and custom manufacturing for outdoor brands worldwide. MOQ from 50 pieces.",
  keywords:
    "oilskin jackets manufacturer, waxed cotton supplier, private label outerwear, export-ready waxed cotton garments, India textile manufacturer, B2B manufacturing, bulk orders, custom outdoor apparel",
  openGraph: {
    title: "F&A International - Premium Oilskin & Waxed Cotton Manufacturer",
    description:
      "Leading manufacturer & exporter of waxed cotton and oilskin garments from India. Private label, bulk orders, and custom manufacturing for outdoor brands worldwide.",
    url: "https://fainternational.com",
    images: ["/og-image.jpg"],
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${CONTACT.company} - Premium Waxed Cotton Manufacturer`,
            description: "Leading manufacturer & exporter of waxed cotton and oilskin garments from India",
            url: "https://fainternational.com",
            mainEntity: {
              "@type": "Organization",
              name: CONTACT.company,
              description: "Premium waxed cotton and oilskin manufacturer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kanpur",
                addressRegion: "Uttar Pradesh",
                addressCountry: "India",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: CONTACT.phone,
                contactType: "customer service",
              },
            },
          }),
        }}
      />
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ProductsPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
