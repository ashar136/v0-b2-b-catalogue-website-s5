"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Download, Star, Globe } from "lucide-react"

interface LeadCapturePopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function LeadCapturePopup({ isOpen, onClose }: LeadCapturePopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    interest: "",
  })

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-0 relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 text-stone-500 hover:text-stone-700"
          onClick={onClose}
        >
          <X className="w-4 h-4" />
        </Button>

        <CardHeader className="text-center pb-4">
          <Badge className="mx-auto mb-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-sm font-semibold w-fit">
            <Star className="w-4 h-4 mr-2" />
            Exclusive Access
          </Badge>
          <CardTitle className="text-2xl font-bold text-stone-900">Download Complete Catalogue</CardTitle>
          <CardDescription className="text-stone-600">
            Get instant access to our 40-page catalogue with pricing, specifications, and customization options
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="popup-name" className="text-stone-700 font-medium">
              Full Name *
            </Label>
            <Input
              id="popup-name"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-stone-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-email" className="text-stone-700 font-medium">
              Business Email *
            </Label>
            <Input
              id="popup-email"
              type="email"
              placeholder="john@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-stone-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-company" className="text-stone-700 font-medium">
              Company Name *
            </Label>
            <Input
              id="popup-company"
              placeholder="Your Company Ltd."
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="border-stone-300 focus:border-amber-500 focus:ring-amber-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-country" className="text-stone-700 font-medium">
              Country *
            </Label>
            <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
              <SelectTrigger className="border-stone-300 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="popup-interest" className="text-stone-700 font-medium">
              Primary Interest
            </Label>
            <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
              <SelectTrigger className="border-stone-300 focus:border-amber-500 focus:ring-amber-500">
                <SelectValue placeholder="Select product category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mens">Men's Waxed Cotton</SelectItem>
                <SelectItem value="womens">Women's Oilskin</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="custom">Custom Design</SelectItem>
                <SelectItem value="all">All Products</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Catalogue Now
          </Button>

          <p className="text-xs text-stone-500 text-center">
            By downloading, you agree to receive updates about our products and services. We respect your privacy and
            won't spam you.
          </p>

          <div className="flex items-center justify-center gap-4 pt-2 text-xs text-stone-400">
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>50+ Countries</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              <span>1000+ Clients</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
