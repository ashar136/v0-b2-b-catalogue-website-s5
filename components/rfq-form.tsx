"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Send } from "lucide-react"
import { products } from "@/data/products"
import { useToast } from "@/hooks/use-toast" // Added toast hook
import { validateRFQData } from "@/lib/validation" // Added validation

interface RFQItem {
  productSlug: string
  quantity: number
  color?: string
  sizes?: { [size: string]: number }
  customization?: string
}

interface RFQFormProps {
  initialItems?: string[]
  onClose: () => void
}

export function RFQForm({ initialItems = [], onClose }: RFQFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    country: "",
    businessType: "",
    timeline: "",
    additionalNotes: "",
  })

  const [rfqItems, setRfqItems] = useState<RFQItem[]>(
    initialItems.map((slug) => ({
      productSlug: slug,
      quantity: 50,
      sizes: {},
    })),
  )

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast() // Added toast hook

  const addProduct = (productSlug: string) => {
    if (!rfqItems.find((item) => item.productSlug === productSlug)) {
      setRfqItems([
        ...rfqItems,
        {
          productSlug,
          quantity: 50,
          sizes: {},
        },
      ])
    }
  }

  const removeProduct = (productSlug: string) => {
    setRfqItems(rfqItems.filter((item) => item.productSlug !== productSlug))
  }

  const updateItem = (productSlug: string, updates: Partial<RFQItem>) => {
    setRfqItems(rfqItems.map((item) => (item.productSlug === productSlug ? { ...item, ...updates } : item)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const validation = validateRFQData({
        ...formData,
        items: rfqItems,
      })

      if (!validation.isValid) {
        toast({
          variant: "destructive",
          title: "Validation Error",
          description: validation.errors.join(", "),
        })
        setIsSubmitting(false)
        return
      }

      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          items: rfqItems,
          timestamp: new Date().toISOString(),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        toast({
          variant: "success",
          title: "RFQ Submitted",
          description: "Your request has been submitted successfully. We'll respond within 24 hours.",
        })
      } else {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }))
        throw new Error(errorData.message || "Failed to submit RFQ")
      }
    } catch (error) {
      console.error("RFQ submission error:", error)
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit RFQ. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-green-600">RFQ Submitted Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Thank you for your request. We'll review your requirements and respond within 24 hours.
            </p>
            <p className="text-sm text-muted-foreground">A confirmation email has been sent to {formData.email}</p>
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Request for Quote</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>

        <CardContent className="overflow-auto max-h-[calc(90vh-120px)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData({ ...formData, businessType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="brand">Brand/Private Label</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Selection */}
            <div>
              <Label className="text-base font-semibold">Products</Label>
              <div className="space-y-4 mt-3">
                {rfqItems.map((item) => {
                  const product = products.find((p) => p.slug === item.productSlug)
                  if (!product) return null

                  return (
                    <Card key={item.productSlug} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex gap-3">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.subCategory}</p>
                            <Badge variant="outline" className="text-xs mt-1">
                              MOQ: {product.moq}
                            </Badge>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={() => removeProduct(item.productSlug)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor={`quantity-${item.productSlug}`}>Target Quantity</Label>
                          <Input
                            id={`quantity-${item.productSlug}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(item.productSlug, { quantity: Number.parseInt(e.target.value) || 0 })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`color-${item.productSlug}`}>Preferred Color</Label>
                          <Input
                            id={`color-${item.productSlug}`}
                            value={item.color || ""}
                            onChange={(e) => updateItem(item.productSlug, { color: e.target.value })}
                            placeholder="e.g., Navy, Black"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`customization-${item.productSlug}`}>Customization Notes</Label>
                          <Input
                            id={`customization-${item.productSlug}`}
                            value={item.customization || ""}
                            onChange={(e) => updateItem(item.productSlug, { customization: e.target.value })}
                            placeholder="Branding, labels, etc."
                          />
                        </div>
                      </div>
                    </Card>
                  )
                })}

                {/* Add Product Selector */}
                <Card className="p-4 border-dashed">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-3">Add more products to your quote</p>
                    <Select onValueChange={addProduct}>
                      <SelectTrigger className="max-w-sm mx-auto">
                        <SelectValue placeholder="Select a product to add" />
                      </SelectTrigger>
                      <SelectContent>
                        {products
                          .filter((p) => !rfqItems.find((item) => item.productSlug === p.slug))
                          .map((product) => (
                            <SelectItem key={product.slug} value={product.slug}>
                              {product.name} ({product.category})
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </Card>
              </div>
            </div>

            {/* Timeline and Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timeline">Target Timeline</Label>
                <Select
                  value={formData.timeline}
                  onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-2months">1-2 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6months+">6+ months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="additionalNotes">Additional Requirements</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Special requirements, packaging needs, shipping preferences, etc."
                rows={4}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || rfqItems.length === 0}>
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit RFQ
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
