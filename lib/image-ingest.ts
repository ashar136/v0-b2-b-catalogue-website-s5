export interface ImageUpload {
  handle: string
  colorName: string
  view: "front" | "back" | "side" | "detail" | "on-model"
  index: number
  file: File
  isPrimary?: boolean
  isSwatchSource?: boolean
}

export interface ProcessedImage {
  handle: string
  colorName: string
  view: string
  index: number
  originalUrl: string
  optimizedUrls: {
    hero: string // 2000px
    large: string // 1500px
    medium: string // 1000px
    small: string // 600px
    thumbnail: string // 200px for grid
  }
  altText: string
  isPrimary: boolean
  swatchUrl?: string
}

export class ImageIngestService {
  private static readonly SIZES = {
    hero: 2000,
    large: 1500,
    medium: 1000,
    small: 600,
    thumbnail: 200,
  }

  static parseFilename(filename: string): {
    handle: string
    color: string
    view: string
    index: number
  } | null {
    // Pattern: {handle}-{color}-{view}-{index}.png
    // Example: swift-waxed-jacket-brown-front-01.png
    const match = filename.match(/^(.+)-(.+)-(front|back|side|detail|on-model)-(\d{2})\.png$/i)

    if (!match) return null

    const [, handle, color, view, indexStr] = match
    return {
      handle: handle.toLowerCase(),
      color: color.toLowerCase(),
      view: view.toLowerCase(),
      index: Number.parseInt(indexStr, 10),
    }
  }

  static generateAltText(productName: string, color: string, view: string): string {
    const viewMap: Record<string, string> = {
      front: "Front View",
      back: "Back View",
      side: "Side View",
      detail: "Detail View",
      "on-model": "On Model",
    }

    const capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)
    const viewText = viewMap[view] || view

    return `${productName} in ${capitalizedColor} — ${viewText}`
  }

  static async processImage(upload: ImageUpload): Promise<ProcessedImage> {
    // In a real implementation, this would:
    // 1. Upload original PNG to storage
    // 2. Generate WebP/AVIF versions at different sizes
    // 3. Maintain 4:5 aspect ratio for grid images
    // 4. Generate 1:1 thumbnails if needed
    // 5. Extract dominant color for swatch if isPrimary

    const baseUrl = `/images/products/${upload.handle}/${upload.colorName}`
    const filename = `${upload.handle}-${upload.colorName}-${upload.view}-${upload.index.toString().padStart(2, "0")}`

    return {
      handle: upload.handle,
      colorName: upload.colorName,
      view: upload.view,
      index: upload.index,
      originalUrl: `${baseUrl}/${filename}.png`,
      optimizedUrls: {
        hero: `${baseUrl}/${filename}-2000w.webp`,
        large: `${baseUrl}/${filename}-1500w.webp`,
        medium: `${baseUrl}/${filename}-1000w.webp`,
        small: `${baseUrl}/${filename}-600w.webp`,
        thumbnail: `${baseUrl}/${filename}-200w.webp`,
      },
      altText: this.generateAltText(upload.handle.replace(/-/g, " "), upload.colorName, upload.view),
      isPrimary: upload.isPrimary || (upload.view === "front" && upload.index === 1),
      swatchUrl: upload.isSwatchSource ? `${baseUrl}/${filename}-swatch.webp` : undefined,
    }
  }

  static async ingestFromFolder(folderPath: string, handle: string): Promise<ProcessedImage[]> {
    // This would scan a folder structure like:
    // /uploads/womens/{handle}/{color}/*.png
    // and process all images found

    console.log(`[v0] Ingesting images from folder: ${folderPath} for product: ${handle}`)

    // Placeholder implementation - in reality would scan filesystem
    const mockFiles: ImageUpload[] = [
      {
        handle,
        colorName: "olive",
        view: "front",
        index: 1,
        file: new File([], `${handle}-olive-front-01.png`),
        isPrimary: true,
      },
      {
        handle,
        colorName: "olive",
        view: "back",
        index: 1,
        file: new File([], `${handle}-olive-back-01.png`),
      },
    ]

    const processed = await Promise.all(mockFiles.map((upload) => this.processImage(upload)))

    console.log(`[v0] Processed ${processed.length} images for ${handle}`)
    return processed
  }

  static async ingestFromCSV(csvData: string): Promise<ProcessedImage[]> {
    // Parse CSV with columns: handle,colorName,view,image_filename,alt_text,is_primary,swatch_filename
    const lines = csvData.trim().split("\n")
    const headers = lines[0].split(",")
    const processed: ProcessedImage[] = []

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",")
      const row = Object.fromEntries(headers.map((h, idx) => [h, values[idx]]))

      const parsed = this.parseFilename(row.image_filename)
      if (!parsed) continue

      const upload: ImageUpload = {
        handle: parsed.handle,
        colorName: parsed.color,
        view: parsed.view as any,
        index: parsed.index,
        file: new File([], row.image_filename),
        isPrimary: row.is_primary === "true",
        isSwatchSource: !!row.swatch_filename,
      }

      processed.push(await this.processImage(upload))
    }

    return processed
  }

  static updateProductImages(productSlug: string, processedImages: ProcessedImage[]): void {
    // This would update the product data with new image URLs
    console.log(`[v0] Updating product ${productSlug} with ${processedImages.length} processed images`)

    // Group by color and sort by view priority
    const imagesByColor = processedImages.reduce(
      (acc, img) => {
        if (!acc[img.colorName]) acc[img.colorName] = []
        acc[img.colorName].push(img)
        return acc
      },
      {} as Record<string, ProcessedImage[]>,
    )

    // Sort images by view priority: front, back, side, detail, on-model
    const viewPriority = ["front", "back", "side", "detail", "on-model"]

    Object.keys(imagesByColor).forEach((color) => {
      imagesByColor[color].sort((a, b) => {
        const aPriority = viewPriority.indexOf(a.view)
        const bPriority = viewPriority.indexOf(b.view)
        if (aPriority !== bPriority) return aPriority - bPriority
        return a.index - b.index
      })
    })

    console.log(`[v0] Organized images by color:`, Object.keys(imagesByColor))
  }
}

export default ImageIngestService
