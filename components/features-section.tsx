import { Card, CardContent } from "@/components/ui/card"
import { Globe, Shield, Zap, Users } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "Global Export Ready",
    description: "Compliant with international standards and ready for worldwide distribution.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous quality control ensures every garment meets premium standards.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description: "Efficient production processes with reliable delivery timelines.",
  },
  {
    icon: Users,
    title: "Private Label Support",
    description: "Complete branding and customization support for your unique requirements.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose F&A International?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Located in Kanpur, {"India's"} textile hub, we combine traditional craftsmanship with modern manufacturing
            capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
