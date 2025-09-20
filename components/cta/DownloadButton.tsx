"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { isListSection } from "@/lib/routeSections"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Link from "next/link"

interface DownloadButtonProps {
  href: string
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
  children?: React.ReactNode
}

export function DownloadButton({
  href,
  variant = "outline",
  size = "default",
  className,
  children,
}: DownloadButtonProps) {
  const pathname = usePathname() || ""
  if (pathname && isListSection(pathname)) return null

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={href} target="_blank">
        <Download className="h-4 w-4 mr-1" />
        {children || "Download"}
      </Link>
    </Button>
  )
}
