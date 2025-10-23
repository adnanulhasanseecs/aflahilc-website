import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem, ScaleIn } from "@/components/animations";

const SERVICES = [
  { title: "Life Coaching", desc: "One-on-one sessions tailored to your goals and faith-centered growth.", rate: "$80/hr" },
  { title: "Corporate Coaching", desc: "Leadership, communication, and team performance programs.", rate: "Custom" },
  { title: "Islamic Mindfulness Programs", desc: "Workshops and guided practices for spiritual wellbeing.", rate: "$60/hr" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Services</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-gray-600 max-w-3xl">Explore our offerings for individuals and organizations. All pricing is placeholder and can be customized.</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, index) => (
              <StaggerItem key={s.title}>
                <ScaleIn delay={index * 0.1}>
                  <Card className="border-aflah-green/20">
                    <CardHeader>
                      <CardTitle className="text-gray-900">{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{s.desc}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900 font-semibold">{s.rate}</span>
                        <Button 
                          className="btn-aflah-primary"
                          asChild
                        >
                          <a 
                            href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Book via Calendly
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}



