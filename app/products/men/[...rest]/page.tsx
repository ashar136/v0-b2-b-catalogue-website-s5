import { redirect } from "next/navigation"

export default function MenRedirect({ params }: { params: { rest: string[] } }) {
  const restPath = params.rest ? params.rest.join("/") : ""
  redirect(`/products/mens/${restPath}`)
}
