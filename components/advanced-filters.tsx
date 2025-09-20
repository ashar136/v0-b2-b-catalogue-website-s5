"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, Filter } from "lucide-react"

interface FilterState {
  category: string[]
  fabric: string[]
  fabricWeight: number[]
  lining: string[]
  weatherResistant: boolean
  hardware: string[]
  sizeRange: string[]
  color: string[]
  moq: string[]
  leadTime: string[]
}

interface AdvancedFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClose: () => void
  productCount: number
}

export function AdvancedFilters({ filters, onFiltersChange, onClose, productCount }: AdvancedFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: [],
      fabric: [],
      fabricWeight: [9, 12],
      lining: [],
      weatherResistant: false,
      hardware: [],
      sizeRange: [],
      color: [],
      moq: [],
      leadTime: [],
    })
  }

  const activeFilterCount = Object.values(filters).reduce((count, value) => {
    if (Array.isArray(value)) return count + value.length
    if (typeof value === "boolean") return count + (value ? 1 : 0)
    return count
  }, 0)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{productCount} products match your criteria</p>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && <Badge variant="secondary">{activeFilterCount} active</Badge>}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Category</Label>
              <div className="space-y-2">
                {["Jackets", "Coats", "Vests", "Outerwear"].map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.category.includes(category)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter("category", [...filters.category, category])
                        } else {
                          updateFilter(
                            "category",
                            filters.category.filter((c) => c !== category),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Fabric Type</Label>
              <div className="space-y-2">
                {["Oilskin", "Waxed Cotton"].map((fabric) => (
                  <div key={fabric} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fabric-${fabric}`}
                      checked={filters.fabric.includes(fabric.toLowerCase())}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter("fabric", [...filters.fabric, fabric.toLowerCase()])
                        } else {
                          updateFilter(
                            "fabric",
                            filters.fabric.filter((f) => f !== fabric.toLowerCase()),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`fabric-${fabric}`} className="text-sm">
                      {fabric}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Fabric Weight Slider */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Fabric Weight: {filters.fabricWeight[0]}oz - {filters.fabricWeight[1]}oz
              </Label>
              <Slider
                value={filters.fabricWeight}
                onValueChange={(value) => updateFilter("fabricWeight", value)}
                min={9}
                max={12}
                step={1}
                className="mt-2"
              />
            </div>

            {/* Lining Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Lining</Label>
              <div className="space-y-2">
                {["Sherpa", "Quilted", "Cotton Drill", "Fleece"].map((lining) => (
                  <div key={lining} className="flex items-center space-x-2">
                    <Checkbox
                      id={`lining-${lining}`}
                      checked={filters.lining.includes(lining.toLowerCase())}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter("lining", [...filters.lining, lining.toLowerCase()])
                        } else {
                          updateFilter(
                            "lining",
                            filters.lining.filter((l) => l !== lining.toLowerCase()),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`lining-${lining}`} className="text-sm">
                      {lining}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Features</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="weather-resistant"
                    checked={filters.weatherResistant}
                    onCheckedChange={(checked) => updateFilter("weatherResistant", checked)}
                  />
                  <Label htmlFor="weather-resistant" className="text-sm">
                    Weather-resistant
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="ykk-hardware"
                    checked={filters.hardware.includes("YKK")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter("hardware", [...filters.hardware, "YKK"])
                      } else {
                        updateFilter(
                          "hardware",
                          filters.hardware.filter((h) => h !== "YKK"),
                        )
                      }
                    }}
                  />
                  <Label htmlFor="ykk-hardware" className="text-sm">
                    YKK Hardware
                  </Label>
                </div>
              </div>
            </div>

            {/* MOQ Filter */}
            <div>
              <Label className="text-sm font-medium mb-3 block">MOQ Range</Label>
              <div className="space-y-2">
                {["≤50 pieces", "51-100 pieces", "100+ pieces"].map((moq) => (
                  <div key={moq} className="flex items-center space-x-2">
                    <Checkbox
                      id={`moq-${moq}`}
                      checked={filters.moq.includes(moq)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFilter("moq", [...filters.moq, moq])
                        } else {
                          updateFilter(
                            "moq",
                            filters.moq.filter((m) => m !== moq),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={`moq-${moq}`} className="text-sm">
                      {moq}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <Button variant="outline" onClick={clearAllFilters}>
              Clear All Filters
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>Apply Filters ({productCount} products)</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
