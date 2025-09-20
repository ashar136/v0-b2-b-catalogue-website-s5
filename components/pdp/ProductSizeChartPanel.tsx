"use client"
import { getRowsByGenderAndSlug } from "@/lib/sizeChart"

export default function ProductSizeChartPanel({
  gender,
  slug,
}: {
  gender: "mens" | "womens"
  slug: string
}) {
  const { rows, usedKey } = getRowsByGenderAndSlug(gender, slug)
  if (!rows || rows.length === 0) {
    return (
      null
    )
  }
  const keys = ["chest", "bust", "hip", "shoulder", "sleeve", "length"].filter(
    (k) => rows[0][k as keyof (typeof rows)[0]] !== undefined,
  )
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2 pr-4 text-left">Size</th>
            {keys.map((k) => (
              <th key={k} className="py-2 pr-4 text-left capitalize">
                {k} (cm)
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-2 pr-4">{r.size}</td>
              {keys.map((k) => (
                <td key={k} className="py-2 pr-4">
                  {(r as any)[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs opacity-70">Per-product measurements in centimeters. Dataset key: {usedKey}</p>
    </div>
  )
}
