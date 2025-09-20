import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary" // Added error boundary import
import { Toaster } from "@/components/toaster" // Added toaster import
import { CONTACT } from "@/lib/contact"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "600", "700"],
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  title: `${CONTACT.company} - Premium Oilskin & Waxed Cotton Manufacturer`,
  description:
    "Leading manufacturer & exporter of waxed cotton and oilskin garments from India. Private label, bulk orders, and custom manufacturing for outdoor brands worldwide.",
  generator: "v0.app",
  keywords:
    "oilskin jackets manufacturer, waxed cotton supplier, private label outerwear, export-ready waxed cotton garments, India textile manufacturer, B2B manufacturing, bulk orders, custom outdoor apparel",
  authors: [{ name: CONTACT.company }],
  creator: CONTACT.company,
  publisher: CONTACT.company,
  metadataBase: new URL("https://fainternational.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${CONTACT.company} - Premium Oilskin & Waxed Cotton Manufacturer`,
    description:
      "Leading manufacturer & exporter of waxed cotton and oilskin garments from India. Private label, bulk orders, and custom manufacturing for outdoor brands worldwide.",
    url: "https://fainternational.com",
    siteName: CONTACT.company,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${CONTACT.company} - Premium Waxed Cotton Manufacturing`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${CONTACT.company} - Premium Oilskin & Waxed Cotton Manufacturer`,
    description:
      "Leading manufacturer & exporter of waxed cotton and oilskin garments from India. Private label, bulk orders, and custom manufacturing.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: CONTACT.company,
              description: "Leading manufacturer & exporter of waxed cotton and oilskin garments from India",
              url: "https://fainternational.com",
              logo: "https://fainternational.com/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: CONTACT.phone,
                  email: CONTACT.email_primary,
                  contactType: "customer service",
                  availableLanguage: ["English", "Hindi"],
                  hoursAvailable: CONTACT.hours,
                },
                {
                  "@type": "ContactPoint",
                  email: CONTACT.email_general,
                  contactType: "sales",
                  availableLanguage: ["English", "Hindi"],
                  hoursAvailable: CONTACT.hours,
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Kanpur",
                addressRegion: "Uttar Pradesh",
                addressCountry: "India",
              },
              sameAs: ["https://linkedin.com/company/fa-international", "https://facebook.com/fainternational"],
              foundingDate: "2008",
              numberOfEmployees: "50-100",
              industry: "Textile Manufacturing",
              keywords: "waxed cotton, oilskin, private label manufacturing, B2B textile export",
            }),
          }}
        />
      </head>
      <body className={`font-sans ${montserrat.variable} ${openSans.variable}`}>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <Toaster />
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  )
}
