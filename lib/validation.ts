export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateProduct(product: any): ValidationResult {
  const errors: string[] = []

  // Required fields
  if (!product.slug || typeof product.slug !== "string") {
    errors.push("Product slug is required and must be a string")
  }

  if (!product.name || typeof product.name !== "string") {
    errors.push("Product name is required and must be a string")
  }

  if (!product.category || !["Men", "Women", "Accessories"].includes(product.category)) {
    errors.push("Product category must be one of: Men, Women, Accessories")
  }

  if (!product.images || !Array.isArray(product.images) || product.images.length === 0) {
    errors.push("Product must have at least one image")
  }

  if (!product.summary || typeof product.summary !== "string") {
    errors.push("Product summary is required and must be a string")
  }

  if (!product.keySpecs || !Array.isArray(product.keySpecs)) {
    errors.push("Product keySpecs must be an array")
  }

  if (!product.moq || typeof product.moq !== "string") {
    errors.push("Product MOQ is required and must be a string")
  }

  // Optional but validated fields
  if (product.fabric_oz && (typeof product.fabric_oz !== "number" || product.fabric_oz <= 0)) {
    errors.push("Product fabric_oz must be a positive number")
  }

  if (product.subCategory && typeof product.subCategory !== "string") {
    errors.push("Product subCategory must be a string")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function validateRFQData(data: any): ValidationResult {
  const errors: string[] = []

  // Required company information
  if (!data.companyName || typeof data.companyName !== "string" || data.companyName.trim().length === 0) {
    errors.push("Company name is required")
  }

  if (!data.contactName || typeof data.contactName !== "string" || data.contactName.trim().length === 0) {
    errors.push("Contact name is required")
  }

  if (!data.email || typeof data.email !== "string" || !isValidEmail(data.email)) {
    errors.push("Valid email address is required")
  }

  if (!data.country || typeof data.country !== "string" || data.country.trim().length === 0) {
    errors.push("Country is required")
  }

  // Validate items
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    errors.push("At least one product must be selected")
  } else {
    data.items.forEach((item: any, index: number) => {
      if (!item.productSlug || typeof item.productSlug !== "string") {
        errors.push(`Item ${index + 1}: Product slug is required`)
      }
      if (!item.quantity || typeof item.quantity !== "number" || item.quantity <= 0) {
        errors.push(`Item ${index + 1}: Valid quantity is required`)
      }
    })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return ""

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 1000) // Limit length
}

export function validateSearchTerm(searchTerm: string): string {
  if (typeof searchTerm !== "string") return ""

  return searchTerm.trim().replace(/[<>]/g, "").substring(0, 100) // Reasonable search term length
}
