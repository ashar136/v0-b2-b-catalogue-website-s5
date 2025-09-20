"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { isHiddenPath } from "@/lib/routeSections"
import { Button } from "@/components/ui/button"
import { SizeChartModal } from "./SizeChartModal"
import { Ruler } from "lucide-react"

interface SizeChartButtonProps {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
  className?: string
}

export function SizeChartButton({ variant = "outline", size = "default", className }: SizeChartButtonProps) {
  const pathname = usePathname() || ""
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (pathname && isHiddenPath(pathname)) return null

  return (
    <>
      <Button variant={variant} size={size} onClick={() => setIsModalOpen(true)} className={className}>
        <Ruler className="w-4 h-4 mr-2" />
        Size chart
      </Button>

      <SizeChartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
