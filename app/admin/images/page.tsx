"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ImageUploader } from "@/components/admin/image-uploader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function AdminImagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Image Management</h1>
            <p className="text-muted-foreground">
              Upload and manage product images with automatic optimization and processing.
            </p>
          </div>

          <div className="grid gap-6">
            {/* Image Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>Image Upload & Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader
                  productHandle="swift-waxed-jacket"
                  onImagesProcessed={(images) => {
                    console.log("[v0] Images processed in admin:", images)
                  }}
                />
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Image Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Filename Pattern</h4>
                  <code className="text-sm bg-muted px-2 py-1 rounded">{"{handle}-{color}-{view}-{index}.png"}</code>
                  <p className="text-sm text-muted-foreground mt-1">Example: swift-waxed-jacket-brown-front-01.png</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">View Types</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">front</Badge>
                    <Badge variant="secondary">back</Badge>
                    <Badge variant="secondary">side</Badge>
                    <Badge variant="secondary">detail</Badge>
                    <Badge variant="secondary">on-model</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Processing Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Auto-converts PNG to WebP/AVIF for web display</li>
                    <li>• Generates responsive sizes: 2000px, 1500px, 1000px, 600px, 200px</li>
                    <li>• Maintains 4:5 aspect ratio for grid display</li>
                    <li>• First front image becomes primary automatically</li>
                    <li>• Generates color swatches from primary images</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
