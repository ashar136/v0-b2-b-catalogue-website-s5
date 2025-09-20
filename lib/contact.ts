import CONTACT_DATA from "@/data/contact.json"

export const CONTACT = CONTACT_DATA

export function mailto(subject: string, body: string): string {
  return `mailto:${CONTACT.email_primary}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function whatsappLink(text: string): string {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`
}
