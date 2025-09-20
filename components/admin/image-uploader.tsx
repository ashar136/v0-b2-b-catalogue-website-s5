"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileImage, X } from "lucide-react"
import { ImageIngestService, type ImageUpload, type ProcessedImage } from "@/lib/image-ingest"

interface ImageUploaderProps {
  productHandle?: string
  onImagesProcessed?: (images: ProcessedImage[]) => void
}

export function ImageUploader({ productHandle, onImagesProcessed }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploads, setUploads] = useState<ImageUpload[]>([])
  const [processing, setProcessing] = useState(false)
  const [csvData, setCsvData] = useState("")
  const [folderPath, setFolderPath] = useState("")

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files).filter(
      (file) => file.type === "image/png" && file.name.endsWith(".png"),
    )

    processFiles(files)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    processFiles(files)
  }

  const processFiles = (files: File[]) => {
    const newUploads: ImageUpload[] = []

    files.forEach((file) => {
      const parsed = ImageIngestService.parseFilename(file.name)
      if (parsed) {
        newUploads.push({
          handle: parsed.handle,
          colorName: parsed.color,
          view: parsed.view as any,
          index: parsed.index,
          file,
          isPrimary: parsed.view === "front" && parsed.index === 1,
        })
      }
    })

    setUploads((prev) => [...prev, ...newUploads])
  }

  const processUploads = async () => {
    if (uploads.length === 0) return

    setProcessing(true)
    try {
      const processed = await Promise.all(uploads.map((upload) => ImageIngestService.processImage(upload)))

      console.log("[v0] Processed uploads:", processed)
      onImagesProcessed?.(processed)
      setUploads([])
    } catch (error) {
      console.error("[v0] Error processing uploads:", error)
    } finally {
      setProcessing(false)
    }
  }

  const processFolderIngest = async () => {
    if (!folderPath || !productHandle) return

    setProcessing(true)
    try {
      const processed = await ImageIngestService.ingestFromFolder(folderPath, productHandle)
      console.log("[v0] Folder ingest completed:", processed)
      onImagesProcessed?.(processed)
      setFolderPath("")
    } catch (error) {
      console.error("[v0] Error processing folder:", error)
    } finally {
      setProcessing(false)
    }
  }

  const processCSVIngest = async () => {
    if (!csvData.trim()) return

    setProcessing(true)
    try {
      const processed = await ImageIngestService.ingestFromCSV(csvData)
      console.log("[v0] CSV ingest completed:", processed)
      onImagesProcessed?.(processed)
      setCsvData("")
    } catch (error) {
      console.error("[v0] Error processing CSV:", error)
    } finally {
      setProcessing(false)
    }
  }

  const removeUpload = (index: number) => {
    setUploads((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      {/* Drag & Drop Upload */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            PNG Image Upload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FileImage className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Drop PNG files here</p>
            <p className="text-sm text-muted-foreground mb-4">
              Files should follow naming pattern: {"{handle}-{color}-{view}-{index}.png"}
            </p>
            <Input type="file" multiple accept=".png" onChange={handleFileInput} className="max-w-xs mx-auto" />
          </div>

          {uploads.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Queued Uploads ({uploads.length})</h4>
                <Button onClick={processUploads} disabled={processing}>
                  {processing ? "Processing..." : "Process Images"}
                </Button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {uploads.map((upload, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileImage className="h-4 w-4" />
                      <div>
                        <p className="font-medium text-sm">{upload.file.name}</p>
                        <div className="flex gap-1 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {upload.colorName}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {upload.view}
                          </Badge>
                          {upload.isPrimary && (
                            <Badge variant="default" className="text-xs">
                              Primary
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeUpload(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Folder Ingest */}
      <Card>
        <CardHeader>
          <CardTitle>Folder Ingest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="folder-path">Folder Path</Label>
            <Input
              id="folder-path"
              placeholder="/uploads/womens/{handle}/{color}/"
              value={folderPath}
              onChange={(e) => setFolderPath(e.target.value)}
            />
          </div>
          <Button onClick={processFolderIngest} disabled={!folderPath || !productHandle || processing}>
            Ingest from Folder
          </Button>
        </CardContent>
      </Card>

      {/* CSV Ingest */}
      <Card>
        <CardHeader>
          <CardTitle>CSV Ingest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="csv-data">CSV Data</Label>
            <Textarea
              id="csv-data"
              placeholder="handle,colorName,view,image_filename,alt_text,is_primary,swatch_filename"
              rows={6}
              value={csvData}
              onChange={(e) => setCsvData(e.target.value)}
            />
          </div>
          <Button onClick={processCSVIngest} disabled={!csvData.trim() || processing}>
            Process CSV
          </Button>
        </CardContent>
      </Card>

      {/* Status */}
      {processing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-sm font-medium text-blue-800">Processing images...</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
