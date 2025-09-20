"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { isListSection } from "@/lib/routeSections"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

interface WhatsAppButtonProps {
  message: string
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({
  message,
  variant = "outline",
  size = "default",
  className,
  children,
}: WhatsAppButtonProps) {
  const pathname = usePathname() || ""
  if (pathname && isListSection(pathname)) return null

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, "_blank")
  }

  return (
    <Button variant={variant} size={size} className={className} onClick={handleWhatsAppClick}>
      <Phone className="h-4 w-4 mr-1" />
      {children || "WhatsApp"}
    </Button>
  )
}
