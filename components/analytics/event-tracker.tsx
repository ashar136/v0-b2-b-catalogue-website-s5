"use client"

import type React from "react"

import { useEffect } from "react"

interface EventData {
  handle?: string
  collection?: string
  category?: string
  action?: string
  [key: string]: any
}

export class EventTracker {
  static track(eventName: string, data: EventData = {}) {
    // In a real implementation, this would send to analytics service
    console.log(`[v0] Event: ${eventName}`, data)

    // Simulate analytics tracking
    if (typeof window !== "undefined") {
      // @ts-ignore - Mock analytics
      window.gtag?.("event", eventName, data)
    }
  }

  static trackProductCardOpen(handle: string, collection: string) {
    this.track("product_card_open", { handle, collection })
  }

  static trackViewItem(handle: string, category: string) {
    this.track("view_item", { handle, category })
  }

  static trackSizeGuideOpen(handle: string) {
    this.track("size_guide_open", { handle })
  }

  static trackSpecsheetDownload(handle: string) {
    this.track("specsheet_downloaded", { handle })
  }

  static trackAddToRFQ(handle: string) {
    this.track("add_to_rfq", { handle })
  }
}

export const trackProductEvent = (eventName: string, productData: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    console.log(`[v0] 📊 Tracking event: ${eventName}`, productData)

    switch (eventName) {
      case "product_card_open":
        window.gtag("event", "select_item", {
          item_list_id: "product_catalog",
          item_list_name: "Product Catalog",
          items: [
            {
              item_id: productData.slug,
              item_name: productData.name,
              item_category: productData.category,
              item_category2: productData.subCategory,
              price: productData.moq || "Contact for pricing",
            },
          ],
        })
        break

      case "view_item":
        window.gtag("event", "view_item", {
          currency: "USD",
          value: 0, // B2B pricing varies
          items: [
            {
              item_id: productData.slug,
              item_name: productData.name,
              item_category: productData.category,
              item_category2: productData.subCategory,
              quantity: 1,
            },
          ],
        })
        break

      case "size_guide_open":
        window.gtag("event", "view_item_list", {
          item_list_id: "size_guide",
          item_list_name: "Size Guide",
          items: [
            {
              item_id: productData.slug,
              item_name: `${productData.name} Size Guide`,
            },
          ],
        })
        break

      case "specsheet_downloaded":
        window.gtag("event", "file_download", {
          file_name: `${productData.slug}-spec-sheet.pdf`,
          file_extension: "pdf",
          link_url: productData.downloads?.specSheet,
        })
        break

      case "add_to_rfq":
        window.gtag("event", "add_to_cart", {
          currency: "USD",
          value: 0,
          items: [
            {
              item_id: productData.slug,
              item_name: productData.name,
              item_category: productData.category,
              quantity: productData.quantity || 1,
            },
          ],
        })
        break

      default:
        window.gtag("event", eventName, productData)
    }
  } else {
    console.log(`[v0] 📊 Event tracking not available: ${eventName}`, productData)
  }
}

// Component to initialize event tracking
export function EventTrackerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("[v0] Event tracking initialized")

    // Bind global event listeners for tracking
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const productCard = target.closest("[data-product-slug]")

      if (productCard) {
        const slug = productCard.getAttribute("data-product-slug")
        const collection = productCard.getAttribute("data-collection")

        if (slug && collection && !target.closest("button") && !target.closest("a")) {
          EventTracker.trackProductCardOpen(slug, collection)
        }
      }
    }

    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return <>{children}</>
}

export default EventTracker
