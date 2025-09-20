"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Phone, Mail, ShoppingCart } from "lucide-react"
import { useState, useEffect } from "react"
import { CONTACT, mailto } from "@/lib/contact"

export function Header() {
  const [rfqCount, setRfqCount] = useState(0)

  useEffect(() => {
    // Listen for RFQ updates from localStorage or context
    const updateRfqCount = () => {
      const rfqItems = JSON.parse(localStorage.getItem("rfqBasket") || "[]")
      setRfqCount(rfqItems.length)
    }

    // Initial load
    updateRfqCount()

    // Listen for storage changes
    window.addEventListener("storage", updateRfqCount)

    // Listen for custom RFQ events
    window.addEventListener("rfqUpdated", updateRfqCount)

    return () => {
      window.removeEventListener("storage", updateRfqCount)
      window.removeEventListener("rfqUpdated", updateRfqCount)
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .dropdown-menu {
          background-color: #ffffff !important;
          border: 1px solid #e5e7eb !important;
        }
        .dropdown-menu::before,
        .dropdown-menu::after {
          display: none !important;
        }
        .dropdown-item {
          color: #111827 !important;
          background-color: transparent !important;
        }
        .dropdown-item:hover {
          background-color: #f9fafb !important;
          color: #111827 !important;
        }
      `}</style>
      <header className="bg-muted text-foreground sticky top-0 z-50 border-b border-border">
        <div className="container-wide">
          <div className="flex items-center justify-between py-2 text-sm border-b border-border">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${CONTACT.phone}`} className="font-medium hover:text-accent transition-colors">
                  {CONTACT.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${CONTACT.email_general}`} className="font-medium hover:text-accent transition-colors">
                  {CONTACT.email_general}
                </a>
              </div>
            </div>
            <div className="text-sm font-medium tracking-wide">{"Crafted in India, Worn Worldwide"}</div>
          </div>

          <div className="flex items-center justify-between py-6">
            <Link href="/" className="text-3xl font-heading font-bold tracking-tight">
              {CONTACT.company}
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <Link href="/" className="font-medium text-foreground hover:underline transition-all duration-200">
                Home
              </Link>
              <Link href="/about" className="font-medium text-foreground hover:underline transition-all duration-200">
                About Us
              </Link>
              <div className="relative group">
                <button className="font-medium text-foreground hover:underline transition-all duration-200">
                  Products
                </button>
                <div className="dropdown-menu absolute top-full left-0 mt-2 w-56 shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/products/mens"
                    className="dropdown-item block px-6 py-3 font-medium transition-colors duration-200 first:rounded-t-lg"
                  >
                    {"Men's Collection"}
                  </Link>
                  <Link
                    href="/products/womens"
                    className="dropdown-item block px-6 py-3 font-medium transition-colors duration-200"
                  >
                    {"Women's Collection"}
                  </Link>
                  <Link
                    href="/products/accessories"
                    className="dropdown-item block px-6 py-3 font-medium transition-colors duration-200 last:rounded-b-lg"
                  >
                    Accessories
                  </Link>
                </div>
              </div>
              <Link href="/contact" className="font-medium text-foreground hover:underline transition-all duration-200">
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              {rfqCount > 0 && (
                <Link
                  href="/rfq"
                  className="relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-3 py-2 border border-border hover:bg-accent hover:text-accent-foreground"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden sm:inline">RFQ</span>
                  <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {rfqCount}
                  </span>
                </Link>
              )}

              <a
                href={mailto(CONTACT.cta_subject, CONTACT.cta_default_message)}
                className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all h-9 px-4 py-2 shadow-sm bg-foreground text-background hover:bg-foreground/90"
              >
                Request Quote
              </a>
              <Button className="md:hidden" variant="ghost" size="sm">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
