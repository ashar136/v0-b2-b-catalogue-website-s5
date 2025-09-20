"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { getChartForPath, type Row } from "@/lib/sizeChart"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface SizeChartModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SizeChartModal({ isOpen, onClose }: SizeChartModalProps) {
  const pathname = usePathname()
  const [chartData, setChartData] = useState<{ gender: "mens" | "womens"; rows: Row[]; pdfHref: string } | null>(null)

  useEffect(() => {
    if (isOpen && pathname) {
      const data = getChartForPath(pathname)
      setChartData(data)
    }
  }, [isOpen, pathname])

  if (!chartData) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Size Chart</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Size</th>
                <th className="text-left p-3 font-medium">Chest (cm)</th>
                <th className="text-left p-3 font-medium">Hip (cm)</th>
                <th className="text-left p-3 font-medium">Length (cm)</th>
              </tr>
            </thead>
            <tbody>
              {chartData.rows.map((row, index) => (
                <tr key={row.size} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="p-3 font-medium">{row.size}</td>
                  <td className="p-3">{row.chest}</td>
                  <td className="p-3">{row.hip}</td>
                  <td className="p-3">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <a
            href={chartData.pdfHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Download full size chart (PDF)
            <ExternalLink className="w-3 h-3" />
          </a>
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
