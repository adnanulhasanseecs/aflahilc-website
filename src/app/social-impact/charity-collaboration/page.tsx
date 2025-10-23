import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideIn } from "@/components/animations";

export default function CharityCollaborationPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Charity Collaboration</h1>
            <p className="text-gray-600 max-w-3xl">Partnering with local charities to provide life coaching services to underserved communities, promoting mental health and personal development.</p>
          </FadeIn>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <SlideIn direction="left" delay={0.4}>
              <div className="space-y-6">
                <div className="relative h-96 w-full rounded-xl overflow-hidden bg-gray-100 shadow-lg">
                  <Image 
                    src="/logo.png" 
                    alt="Charity Collaboration"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Start Date:</span>
                      <span className="text-gray-600">March 1, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Duration:</span>
                      <span className="text-gray-600">Ongoing</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Partners:</span>
                      <span className="text-gray-600">3 Local Charities</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Beneficiaries:</span>
                      <span className="text-gray-600">200+ individuals</span>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
            
            <SlideIn direction="right" delay={0.6}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Initiative</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    This ongoing collaboration represents our commitment to making life coaching accessible to underserved communities. By partnering with local charities, we're able to reach individuals who might not otherwise have access to professional mental health and personal development services.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The program focuses on providing culturally sensitive, faith-based coaching that respects the values and circumstances of each participant while offering practical tools for personal growth and resilience.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-aflah-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Services Provided</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Individual life coaching sessions</li>
                        <li>• Group workshops and support circles</li>
                        <li>• Mental health awareness programs</li>
                        <li>• Career guidance and skill development</li>
                        <li>• Family counseling and support</li>
                        <li>• Crisis intervention and referral services</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-aflah-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Impact & Outcomes</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• 85% of participants showed improved wellbeing</li>
                        <li>• 60% achieved their personal development goals</li>
                        <li>• 40% gained employment or better opportunities</li>
                        <li>• Strengthened community support networks</li>
                        <li>• Reduced stigma around mental health</li>
                        <li>• Enhanced access to professional services</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn delay={0.8}>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Support Our Mission</h2>
            <p className="text-gray-600 mb-6">Help us expand our reach and provide more services to underserved communities.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-aflah-primary">
                <Link href="/contact">Partner With Us</Link>
              </Button>
              <Button asChild variant="outline" className="btn-aflah-secondary">
                <Link href="/social-impact">View All Events</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
