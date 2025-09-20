"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, Globe, Shield, Truck, Award } from "lucide-react"
import { CONTACT, mailto, whatsappLink } from "@/lib/contact"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const composedBody = `Name: ${formData.firstName} ${formData.lastName}
Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

${CONTACT.cta_default_message}`

    window.location.href = mailto(CONTACT.cta_subject, composedBody)
  }

  const handleWhatsApp = () => {
    const composedMessage = `Hi! I'm interested in your products.

Name: ${formData.firstName} ${formData.lastName}
Company: ${formData.company}

${formData.message}

${CONTACT.cta_default_message}`

    window.open(whatsappLink(composedMessage), "_blank")
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="relative section-padding bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/5 to-transparent"></div>
        <div className="container-wide relative z-10">
          <div className="max-w-4xl text-left">
            <Badge className="mb-6 bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 text-sm font-semibold">
              <Globe className="w-4 h-4 mr-2" />
              Global Export Ready
            </Badge>
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 text-balance text-foreground">
              Let's Build Your
              <span className="block text-foreground">Premium Collection</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl leading-relaxed">
              Connect with our export specialists to discuss your private label requirements, custom designs, and bulk
              manufacturing needs.
            </p>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>Quality Assured</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-accent" />
                <span>Global Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-accent" />
                <span>15+ Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="premium-card">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl font-heading font-bold text-foreground">Request a Quote</CardTitle>
                <CardDescription className="text-lg text-muted-foreground">
                  Tell us about your project and {CONTACT.response_time.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="border-border focus:border-ring focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="border-border focus:border-ring focus:ring-ring"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="company" className="text-foreground font-medium">
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      placeholder="Your Company Ltd."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="border-border focus:border-ring focus:ring-ring"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-foreground font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="border-border focus:border-ring focus:ring-ring"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project requirements, timeline, customization needs, and any specific questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-32 border-border focus:border-ring focus:ring-ring"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn-premium font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    size="lg"
                  >
                    Send Quote Request
                  </Button>

                  <Button
                    type="button"
                    onClick={handleWhatsApp}
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    size="lg"
                  >
                    Send via WhatsApp
                  </Button>
                </form>

                <p className="text-sm text-muted-foreground text-center">{CONTACT.response_time}</p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="premium-card bg-foreground text-background">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-bold text-background">Direct Contact</CardTitle>
                  <CardDescription className="text-background/80">Speak directly with our export team</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-background/10 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-background mb-1">Phone & WhatsApp</h4>
                      <p className="text-background/80">{CONTACT.phone}</p>
                      <p className="text-sm text-background/60">{CONTACT.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-background/10 p-3 rounded-lg">
                      <Mail className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-background mb-1">Email</h4>
                      <p className="text-background/80">{CONTACT.email_primary}</p>
                      <p className="text-sm text-background/60">{CONTACT.response_time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-background/10 p-3 rounded-lg">
                      <MapPin className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-background mb-1">Manufacturing Hub</h4>
                      <p className="text-background/80">{CONTACT.address_lines[0]}</p>
                      <p className="text-sm text-background/60">{CONTACT.address_lines[1]}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-background/10 p-3 rounded-lg">
                      <Clock className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-background mb-1">Business Hours</h4>
                      <p className="text-background/80">Monday - Saturday</p>
                      <p className="text-sm text-background/60">9:00 AM - 7:00 PM IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading font-bold text-foreground">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => window.open(whatsappLink(CONTACT.cta_default_message), "_blank")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    size="lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp Us Now
                  </Button>

                  <Button
                    onClick={() => (window.location.href = mailto(CONTACT.cta_subject, CONTACT.cta_default_message))}
                    variant="outline"
                    className="w-full btn-premium-outline font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    size="lg"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email Us
                  </Button>
                </CardContent>
              </Card>

              <Card className="premium-card bg-muted">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-4 text-center">Trusted Globally</h3>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-foreground">15+</div>
                      <div className="text-sm text-muted-foreground">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">50+</div>
                      <div className="text-sm text-muted-foreground">Countries Served</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">1000+</div>
                      <div className="text-sm text-muted-foreground">Happy Clients</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">24h</div>
                      <div className="text-sm text-muted-foreground">Response Time</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-muted-foreground">
                Quick answers to common export and manufacturing questions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="premium-card">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-foreground mb-2">What's your minimum order quantity?</h4>
                  <p className="text-muted-foreground">
                    Our MOQ starts from just 50 pieces per style, making us perfect for small to medium brands looking
                    to test new markets.
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-foreground mb-2">How long does production take?</h4>
                  <p className="text-muted-foreground">
                    Lead times are confirmed after finalizing product specifications and checking factory capacity.
                    Timelines depend on material sourcing and current production slots, but we always provide a clear
                    schedule before order confirmation.
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-foreground mb-2">Do you provide samples?</h4>
                  <p className="text-muted-foreground">
                    Yes! We provide samples for quality evaluation. Sample cost is refundable against bulk orders above
                    our MOQ.
                  </p>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardContent className="pt-6">
                  <h4 className="font-bold text-foreground mb-2">What customization options do you offer?</h4>
                  <p className="text-muted-foreground">
                    Full customization including colors, sizes, labels, packaging, and design modifications to match
                    your brand requirements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
