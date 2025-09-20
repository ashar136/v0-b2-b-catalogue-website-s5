"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Download, Ruler, Info, Calculator } from "lucide-react"
import Link from "next/link"

export function SizeGuideWomen() {
  const [selectedSize, setSelectedSize] = useState("")
  const [measurements, setMeasurements] = useState({
    bust: "",
    waist: "",
    hips: "",
    height: "",
  })
  const [recommendedSize, setRecommendedSize] = useState("")

  const sizeChart = [
    { size: "XS", bust: "81-86", waist: "61-66", hips: "86-91", length: "60" },
    { size: "S", bust: "86-91", waist: "66-71", hips: "91-96", length: "62" },
    { size: "M", bust: "91-96", waist: "71-76", hips: "96-101", length: "64" },
    { size: "L", bust: "96-101", waist: "76-81", hips: "101-106", length: "66" },
    { size: "XL", bust: "101-106", waist: "81-86", hips: "106-111", length: "68" },
    { size: "XXL", bust: "106-111", waist: "86-91", hips: "111-116", length: "70" },
  ]

  const fitGuides = {
    jackets: {
      title: "Jacket Fit Guide",
      description: "Our women's jackets are designed with a tailored fit that allows for layering.",
      measurements: [
        { point: "Bust", instruction: "Measure around the fullest part of your bust" },
        { point: "Waist", instruction: "Measure around your natural waistline" },
        { point: "Hips", instruction: "Measure around the fullest part of your hips" },
        { point: "Length", instruction: "From shoulder point to desired hem length" },
      ],
    },
    coats: {
      title: "Coat Fit Guide",
      description: "Our coats offer a relaxed fit suitable for heavy layering underneath.",
      measurements: [
        { point: "Bust", instruction: "Measure around the fullest part of your bust, add 5cm for layering" },
        { point: "Waist", instruction: "Measure around your natural waistline, add 5cm for comfort" },
        { point: "Hips", instruction: "Measure around the fullest part of your hips" },
        { point: "Length", instruction: "From shoulder point to desired hem length" },
      ],
    },
    vests: {
      title: "Vest Fit Guide",
      description: "Vests are designed for a close fit that works well for layering.",
      measurements: [
        { point: "Bust", instruction: "Measure around the fullest part of your bust" },
        { point: "Waist", instruction: "Measure around your natural waistline" },
        { point: "Length", instruction: "From shoulder point to desired hem length" },
      ],
    },
  }

  const calculateSize = () => {
    const bust = Number.parseFloat(measurements.bust)
    const waist = Number.parseFloat(measurements.waist)
    const hips = Number.parseFloat(measurements.hips)

    if (!bust || !waist || !hips) {
      alert("Please enter all measurements")
      return
    }

    // Simple size calculation logic
    for (const size of sizeChart) {
      const [bustMin, bustMax] = size.bust.split("-").map(Number)
      const [waistMin, waistMax] = size.waist.split("-").map(Number)
      const [hipsMin, hipsMax] = size.hips.split("-").map(Number)

      if (
        bust >= bustMin &&
        bust <= bustMax &&
        waist >= waistMin &&
        waist <= waistMax &&
        hips >= hipsMin &&
        hips <= hipsMax
      ) {
        setRecommendedSize(size.size)
        return
      }
    }

    // If no exact match, find closest
    let closestSize = sizeChart[0]
    let minDiff = Number.POSITIVE_INFINITY

    sizeChart.forEach((size) => {
      const [bustMin, bustMax] = size.bust.split("-").map(Number)
      const bustMid = (bustMin + bustMax) / 2
      const diff = Math.abs(bust - bustMid)

      if (diff < minDiff) {
        minDiff = diff
        closestSize = size
      }
    })

    setRecommendedSize(closestSize.size)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 bg-muted border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/products/womens">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Women's Collection
              </Link>
            </Button>
          </div>
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">
              Women's Size Guide
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Perfect Fit Guarantee</h1>
            <p className="text-lg text-muted-foreground">
              Find your ideal size with our comprehensive measurement guide and size calculator.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="size-chart" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="size-chart">Size Chart</TabsTrigger>
            <TabsTrigger value="fit-guide">Fit Guide</TabsTrigger>
            <TabsTrigger value="calculator">Size Calculator</TabsTrigger>
            <TabsTrigger value="custom">Custom Sizing</TabsTrigger>
          </TabsList>

          <TabsContent value="size-chart" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Women's Size Chart (cm)
                </CardTitle>
                <p className="text-muted-foreground">
                  All measurements are in centimeters. For the best fit, measure yourself wearing the undergarments you
                  plan to wear with the garment.
                </p>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border px-4 py-3 text-left font-semibold">Size</th>
                        <th className="border border-border px-4 py-3 text-left font-semibold">Bust (cm)</th>
                        <th className="border border-border px-4 py-3 text-left font-semibold">Waist (cm)</th>
                        <th className="border border-border px-4 py-3 text-left font-semibold">Hips (cm)</th>
                        <th className="border border-border px-4 py-3 text-left font-semibold">Length (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.map((size, index) => (
                        <tr
                          key={size.size}
                          className={`${index % 2 === 0 ? "bg-background" : "bg-muted/30"} ${selectedSize === size.size ? "ring-2 ring-accent" : ""}`}
                          onClick={() => setSelectedSize(selectedSize === size.size ? "" : size.size)}
                        >
                          <td className="border border-border px-4 py-3 font-medium cursor-pointer">
                            {size.size}
                            {selectedSize === size.size && (
                              <Badge variant="secondary" className="ml-2">
                                Selected
                              </Badge>
                            )}
                          </td>
                          <td className="border border-border px-4 py-3">{size.bust}</td>
                          <td className="border border-border px-4 py-3">{size.waist}</td>
                          <td className="border border-border px-4 py-3">{size.hips}</td>
                          <td className="border border-border px-4 py-3">{size.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">Sizing Notes</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Measurements are body measurements, not garment measurements</li>
                        <li>• For between sizes, we recommend sizing up for comfort</li>
                        <li>• All garments include ease for movement and layering</li>
                        <li>• Custom sizing available for orders over 100 pieces</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fit-guide" className="mt-8">
            <div className="grid gap-6">
              {Object.entries(fitGuides).map(([key, guide]) => (
                <Card key={key}>
                  <CardHeader>
                    <CardTitle>{guide.title}</CardTitle>
                    <p className="text-muted-foreground">{guide.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {guide.measurements.map((measurement, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-semibold text-sm">{measurement.point}</h4>
                            <p className="text-sm text-muted-foreground">{measurement.instruction}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Size Calculator
                </CardTitle>
                <p className="text-muted-foreground">
                  Enter your measurements to get a personalized size recommendation.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bust">Bust Measurement (cm)</Label>
                      <Input
                        id="bust"
                        type="number"
                        value={measurements.bust}
                        onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                        placeholder="e.g., 86"
                      />
                    </div>
                    <div>
                      <Label htmlFor="waist">Waist Measurement (cm)</Label>
                      <Input
                        id="waist"
                        type="number"
                        value={measurements.waist}
                        onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                        placeholder="e.g., 71"
                      />
                    </div>
                    <div>
                      <Label htmlFor="hips">Hip Measurement (cm)</Label>
                      <Input
                        id="hips"
                        type="number"
                        value={measurements.hips}
                        onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                        placeholder="e.g., 96"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (cm) - Optional</Label>
                      <Input
                        id="height"
                        type="number"
                        value={measurements.height}
                        onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                        placeholder="e.g., 165"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-semibold mb-3">How to Measure</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <p>
                          <strong>Bust:</strong> Measure around the fullest part of your bust
                        </p>
                        <p>
                          <strong>Waist:</strong> Measure around your natural waistline
                        </p>
                        <p>
                          <strong>Hips:</strong> Measure around the fullest part of your hips
                        </p>
                        <p>
                          <strong>Height:</strong> Your total height for length recommendations
                        </p>
                      </div>
                    </div>

                    <Button onClick={calculateSize} className="w-full">
                      Calculate My Size
                    </Button>

                    {recommendedSize && (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">Recommended Size</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-lg px-3 py-1">
                            {recommendedSize}
                          </Badge>
                          <span className="text-green-800">Based on your measurements</span>
                        </div>
                        <p className="text-sm text-green-700 mt-2">
                          This is our recommendation based on standard fit. For a looser fit, consider sizing up.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Custom Sizing & Alterations</CardTitle>
                <p className="text-muted-foreground">
                  For bulk orders and private label customers, we offer custom sizing and pattern adjustments.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Custom Sizing Options</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Pattern grading for regional fit preferences</li>
                      <li>• Extended size ranges (XS to 4XL)</li>
                      <li>• Length adjustments for different markets</li>
                      <li>• Sleeve length modifications</li>
                      <li>• Waist and hip adjustments</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Requirements</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Minimum order: 100 pieces per size/style</li>
                      <li>• Lead time: Additional 2-3 weeks</li>
                      <li>• Pattern development fee may apply</li>
                      <li>• Fit samples provided for approval</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-semibold mb-2">Need Custom Sizing?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Contact our technical team to discuss your specific sizing requirements and get a custom quote.
                  </p>
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link href="/contact?subject=custom-sizing">Contact Technical Team</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/downloads/custom-sizing-form.pdf" target="_blank">
                        <Download className="h-4 w-4 mr-2" />
                        Download Form
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
