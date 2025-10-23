import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FadeIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/animations";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden py-16 bg-aflah-gradient-light">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Aflah Islamic Life Coaching Services</h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-lg text-gray-600 max-w-3xl">Holistic wellbeing through Islamic values and modern psychology, delivered with compassion and professional excellence.</p>
          </FadeIn>
        </div>
      </section>

      {/* Founder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Founder</h2>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile - Column 1 */}
            <SlideIn direction="left" delay={0.4}>
              <div className="space-y-6">
                <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                  <Image src="/logo.png" alt="Aflah - Founder & Coach" fill className="object-cover" />
                </div>
                
                {/* Founder Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">Aflah - Founder & Lead Life Coach</h3>
                    <p className="text-sm text-gray-600">8+ Years Experience • Psychology & Islamic Studies</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-aflah-green text-white text-sm rounded-full">Life Coaching</span>
                    <span className="px-3 py-1 bg-aflah-green text-white text-sm rounded-full">Corporate Training</span>
                    <span className="px-3 py-1 bg-aflah-green text-white text-sm rounded-full">Islamic Mindfulness</span>
                    <span className="px-3 py-1 bg-aflah-green text-white text-sm rounded-full">Leadership Development</span>
                  </div>
                </div>
              </div>
            </SlideIn>
            
            {/* Text Content - Columns 2 & 3 */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Aflah */}
              <SlideIn direction="right" delay={0.6}>
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">About Aflah</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    Aflah is a professional life coach and corporate trainer focused on integrating faith-based wisdom with evidence-based coaching practices. She works with individuals and organizations to unlock purpose, build resilience, and cultivate compassionate leadership.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    With over 8 years of experience in psychology and Islamic studies, Aflah brings a unique perspective to personal and professional development. Her approach combines traditional Islamic values with modern psychological techniques to help clients achieve holistic growth and meaningful success.
                  </p>
                </div>
              </SlideIn>
              
              {/* Mission and Vision */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SlideIn direction="right" delay={0.8}>
                  <Card className="border-aflah-green/20 h-full">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Mission</h4>
                      <p className="text-gray-600 leading-relaxed">Empower clients to grow through faith, purpose, and excellence using Islamic values and modern psychology. We believe in nurturing the whole person - mind, body, and soul - to create lasting positive change.</p>
                    </CardContent>
                  </Card>
                </SlideIn>
                
                <SlideIn direction="right" delay={1.0}>
                  <Card className="border-aflah-green/20 h-full">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 mb-3 text-lg">Vision</h4>
                      <p className="text-gray-600 leading-relaxed">A community of mindful, values-driven leaders who uplift families, teams, and society. We envision a world where Islamic principles guide personal and professional excellence, creating positive impact in every sphere of life.</p>
                    </CardContent>
                  </Card>
                </SlideIn>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8">Core Values</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {["Faith", "Integrity", "Growth", "Service"].map((v) => (
              <StaggerItem key={v}>
                <Card className="border-aflah-green/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900">{v}</h3>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.6}>
            <div className="mt-10">
              <Button 
                className="btn-aflah-primary"
                asChild
              >
                <a 
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Discovery Call
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}



