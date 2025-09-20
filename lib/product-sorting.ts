export interface Product {
  slug: string
  name: string
  category: string
  subCategory?: string
  fabric_oz?: number
  keySpecs: string[]
  summary: string
  [key: string]: any
}

export type SortOption = "newest" | "fabric-weight-high" | "fabric-weight-low" | "most-rfq"

export function getProductTypePriority(product: Product): number {
  try {
    if (!product || typeof product !== "object") {
      console.warn("[v0] Invalid product passed to getProductTypePriority:", product)
      return 3 // Default to lowest priority
    }

    const subCategory = product.subCategory?.toLowerCase() || ""
    const name = product.name?.toLowerCase() || ""

    // Check if it's a jacket (highest priority)
    if (subCategory.includes("jacket") || name.includes("jacket")) {
      return 1
    }
    // Check if it's a coat (high priority)
    if (subCategory.includes("coat") || name.includes("coat")) {
      return 1
    }
    // Check if it's a vest (lower priority)
    if (subCategory.includes("vest") || name.includes("vest")) {
      return 2
    }
    // Everything else (lowest priority)
    return 3
  } catch (error) {
    console.error("[v0] Error in getProductTypePriority:", error)
    return 3 // Safe fallback
  }
}

export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  try {
    if (!Array.isArray(products)) {
      console.warn("[v0] Invalid products array passed to sortProducts:", products)
      return []
    }

    if (products.length === 0) {
      return []
    }

    // Validate products before sorting
    const validProducts = products.filter((product) => {
      if (!product || typeof product !== "object" || !product.slug || !product.name) {
        console.warn("[v0] Invalid product filtered out:", product)
        return false
      }
      return true
    })

    // First, apply primary sort by product type
    let sorted = [...validProducts].sort((a, b) => {
      try {
        const aPriority = getProductTypePriority(a)
        const bPriority = getProductTypePriority(b)
        return aPriority - bPriority
      } catch (error) {
        console.error("[v0] Error comparing products:", error)
        return 0 // Keep original order on error
      }
    })

    // Then apply secondary sort based on user selection
    switch (sortBy) {
      case "newest":
        // Maintain product type priority, but reverse within each type
        sorted = sorted.sort((a, b) => {
          try {
            const aPriority = getProductTypePriority(a)
            const bPriority = getProductTypePriority(b)

            // If same type, sort by newest (reverse order)
            if (aPriority === bPriority) {
              return 1 // Assume newer products are later in array, so reverse
            }

            return aPriority - bPriority
          } catch (error) {
            console.error("[v0] Error in newest sort:", error)
            return 0
          }
        })
        break

      case "fabric-weight-high":
        sorted = sorted.sort((a, b) => {
          try {
            const aPriority = getProductTypePriority(a)
            const bPriority = getProductTypePriority(b)

            // If same type, sort by fabric weight (high to low)
            if (aPriority === bPriority) {
              const aWeight = typeof a.fabric_oz === "number" ? a.fabric_oz : 0
              const bWeight = typeof b.fabric_oz === "number" ? b.fabric_oz : 0
              return bWeight - aWeight
            }

            return aPriority - bPriority
          } catch (error) {
            console.error("[v0] Error in fabric weight high sort:", error)
            return 0
          }
        })
        break

      case "fabric-weight-low":
        sorted = sorted.sort((a, b) => {
          try {
            const aPriority = getProductTypePriority(a)
            const bPriority = getProductTypePriority(b)

            // If same type, sort by fabric weight (low to high)
            if (aPriority === bPriority) {
              const aWeight = typeof a.fabric_oz === "number" ? a.fabric_oz : 0
              const bWeight = typeof b.fabric_oz === "number" ? b.fabric_oz : 0
              return aWeight - bWeight
            }

            return aPriority - bPriority
          } catch (error) {
            console.error("[v0] Error in fabric weight low sort:", error)
            return 0
          }
        })
        break

      case "most-rfq":
        // Maintain product type priority for RFQ sorting as well
        // Could be enhanced with actual RFQ data in the future
        break

      default:
        console.warn("[v0] Unknown sort option:", sortBy)
        break
    }

    return sorted
  } catch (error) {
    console.error("[v0] Error in sortProducts:", error)
    return products // Return original array on error
  }
}

export function filterProducts(
  products: Product[],
  searchTerm: string,
  filters: {
    category: string[]
    fabric: string[]
    fabricWeight: string[]
    weatherResistant: boolean
    hardware: string[]
  },
): Product[] {
  try {
    if (!Array.isArray(products) || products.length === 0) {
      console.warn("[v0] Invalid or empty products array passed to filterProducts:", products)
      return []
    }

    // Sanitize search term
    const sanitizedSearchTerm = typeof searchTerm === "string" ? searchTerm.toLowerCase().trim() : ""

    const safeFilters = {
      category: Array.isArray(filters?.category) ? filters.category : [],
      fabric: Array.isArray(filters?.fabric) ? filters.fabric : [],
      fabricWeight: Array.isArray(filters?.fabricWeight) ? filters.fabricWeight : [],
      weatherResistant: Boolean(filters?.weatherResistant),
      hardware: Array.isArray(filters?.hardware) ? filters.hardware : [],
    }

    return products.filter((product) => {
      try {
        if (!product || typeof product !== "object") {
          return false
        }

        // Search filter
        if (sanitizedSearchTerm) {
          const name = product.name?.toLowerCase() || ""
          const summary = product.summary?.toLowerCase() || ""

          if (!name.includes(sanitizedSearchTerm) && !summary.includes(sanitizedSearchTerm)) {
            return false
          }
        }

        // Category filter (subCategory)
        if (safeFilters.category.length > 0) {
          if (!product.subCategory || !safeFilters.category.includes(product.subCategory)) {
            return false
          }
        }

        // Fabric filter
        if (safeFilters.fabric.length > 0) {
          const keySpecs = Array.isArray(product.keySpecs) ? product.keySpecs : []
          const hasOilskin = keySpecs.some((spec) => typeof spec === "string" && spec.toLowerCase().includes("oilskin"))
          const hasWaxed = keySpecs.some((spec) => typeof spec === "string" && spec.toLowerCase().includes("waxed"))

          if (safeFilters.fabric.includes("oilskin") && !hasOilskin) return false
          if (safeFilters.fabric.includes("waxed") && !hasWaxed) return false
        }

        // Fabric weight filter
        if (safeFilters.fabricWeight.length > 0 && typeof product.fabric_oz === "number") {
          const weightRange = safeFilters.fabricWeight.some((range) => {
            if (range === "9oz" && product.fabric_oz === 9) return true
            if (range === "10-11oz" && product.fabric_oz >= 10 && product.fabric_oz <= 11) return true
            if (range === "12oz+" && product.fabric_oz >= 12) return true
            return false
          })
          if (!weightRange) return false
        }

        // Weather resistant filter
        if (safeFilters.weatherResistant) {
          const keySpecs = Array.isArray(product.keySpecs) ? product.keySpecs : []
          const isWeatherResistant = keySpecs.some(
            (spec) =>
              typeof spec === "string" && (spec.toLowerCase().includes("water") || spec.toLowerCase().includes("wind")),
          )
          if (!isWeatherResistant) return false
        }

        // Hardware filter
        if (safeFilters.hardware.length > 0) {
          const keySpecs = Array.isArray(product.keySpecs) ? product.keySpecs : []
          const hasYKK = keySpecs.some((spec) => typeof spec === "string" && spec.toLowerCase().includes("ykk"))
          if (safeFilters.hardware.includes("YKK") && !hasYKK) return false
        }

        return true
      } catch (error) {
        console.error("[v0] Error filtering product:", product, error)
        return false // Exclude problematic products
      }
    })
  } catch (error) {
    console.error("[v0] Error in filterProducts:", error)
    return [] // Return empty array on error
  }
}
