export const HIDE_PREFIXES = ["/products/mens", "/products/womens", "/products/accessories"]

export function isHiddenPath(pathname: string) {
  return HIDE_PREFIXES.some((p) => pathname.startsWith(p))
}

function normalize(pathname: string) {
  const p = (pathname || "").split("?")[0].split("#")[0]
  return p
}

export function isListSection(pathname: string) {
  const p = normalize(pathname)
  const segs = p.split("/").filter(Boolean)
  // /products/mens  OR  /products/womens  OR  /products/accessories
  const isMensList = segs.length === 2 && segs[0] === "products" && segs[1] === "mens"
  const isWomensList = segs.length === 2 && segs[0] === "products" && segs[1] === "womens"
  const isAccessoriesList = segs.length === 2 && segs[0] === "products" && segs[1] === "accessories"
  return isMensList || isWomensList || isAccessoriesList
}

export function isPdpPath(pathname: string) {
  const p = (pathname || "").split("?")[0].split("#")[0]
  const segs = p.split("/").filter(Boolean)
  // /products/mens/{slug}, /products/womens/{slug}, /products/accessories/{slug}
  if (segs.length >= 3 && segs[0] === "products" && ["mens", "womens", "accessories"].includes(segs[1])) return true
  // /accessories/{slug} (if accessories also lives at root)
  if (segs.length >= 2 && segs[0] === "accessories") return true
  return false
}
