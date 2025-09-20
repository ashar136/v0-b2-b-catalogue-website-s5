import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect /products/accessory/* to /products/accessories/*
  if (pathname.startsWith("/products/accessory/")) {
    const newPath = pathname.replace("/products/accessory/", "/products/accessories/")
    return NextResponse.redirect(new URL(newPath, request.url), 308)
  }

  if (
    pathname.startsWith("/products/accessories/") &&
    pathname.endsWith("/") &&
    pathname !== "/products/accessories/"
  ) {
    const newPath = pathname.slice(0, -1)
    return NextResponse.redirect(new URL(newPath, request.url), 308)
  }

  const legacyAccessoryRoutes = [
    "oilskin-boot-guards",
    "oilskin-dog-coat-black",
    "oilskin-dog-coat-black-check",
    "oilskin-dog-coat-black-sherpa",
    "oilskin-overpants",
    "oilskin-chaps",
    "oilskin-hat-no-flaps",
    "oilskin-hat-with-flaps",
    "murray-hat",
    "oilskin-gaiters",
  ]

  for (const route of legacyAccessoryRoutes) {
    if (pathname === `/products/accessories/${route}`) {
      const newPath = `/products/accessories/${route}-acc`
      return NextResponse.redirect(new URL(newPath, request.url), 308)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/products/accessory/:path*", "/products/accessories/:path*"],
}
