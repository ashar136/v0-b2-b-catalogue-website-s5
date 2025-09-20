import charts from "@/data/product-size-charts.json"

export type Row = {
  size: string
  chest?: number
  bust?: number
  hip?: number
  shoulder?: number
  sleeve?: number
  length?: number
}

export function getRowsByGenderAndSlug(
  gender: "mens" | "womens",
  slug: string,
): { rows: Row[]; usedKey: string | null } {
  const s = slug.toLowerCase()
  const aliases = (charts as any).aliases?.[gender] || {}
  const resolved = (aliases[s] || s) as string
  const rows = (charts as any)[gender]?.[resolved] as Row[] | undefined
  return { rows: rows ?? [], usedKey: rows ? resolved : null }
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function lastSeg(path: string) {
  const segs = path.split("?")[0].split("#")[0].split("/").filter(Boolean)
  return segs[segs.length - 1] || ""
}

export function genderFromPath(pathname: string): "mens" | "womens" {
  return pathname.includes("/womens") || pathname.includes("/women") ? "womens" : "mens"
}

export function getChartForPath(pathname: string): { gender: "mens" | "womens"; rows: Row[]; pdfHref: string } {
  const gender = genderFromPath(pathname)
  const handle = slugify(lastSeg(pathname))
  const { rows } = getRowsByGenderAndSlug(gender, handle)
  const pdfHref = gender === "womens" ? "/downloads/size-chart-women.pdf" : "/downloads/size-chart-men.pdf"

  return { gender, rows, pdfHref }
}
