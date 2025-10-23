import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideIn } from "@/components/animations";

export default function CommunityWellnessDayPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Community Wellness Day</h1>
            <p className="text-gray-600 max-w-3xl">A comprehensive wellness event bringing together community members for health screenings, mindfulness sessions, and Islamic life coaching workshops.</p>
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
                    alt="Community Wellness Day"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Date:</span>
                      <span className="text-gray-600">November 2, 2024</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Time:</span>
                      <span className="text-gray-600">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Location:</span>
                      <span className="text-gray-600">Community Center</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Attendees:</span>
                      <span className="text-gray-600">150+ participants</span>
                    </div>
                  </div>
                </div>
              </div>
            </SlideIn>
            
            <SlideIn direction="right" delay={0.6}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Event</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    The Community Wellness Day was a transformative event that brought together over 150 community members for a day dedicated to holistic health and personal development. This comprehensive wellness initiative combined traditional health screenings with modern mindfulness practices and Islamic life coaching principles.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The event featured multiple workshops, interactive sessions, and one-on-one consultations, creating a supportive environment where participants could explore their physical, mental, and spiritual wellbeing.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-aflah-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Key Activities</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Health screenings and wellness assessments</li>
                        <li>• Islamic mindfulness and meditation sessions</li>
                        <li>• Life coaching workshops for personal development</li>
                        <li>• Stress management and resilience building</li>
                        <li>• Community networking and support groups</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-aflah-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Impact & Results</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• 95% of participants reported improved wellbeing</li>
                        <li>• 80% expressed interest in ongoing coaching</li>
                        <li>• 12 new community support groups formed</li>
                        <li>• Increased awareness of mental health resources</li>
                        <li>• Strengthened community bonds and connections</li>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interested in Similar Events?</h2>
            <p className="text-gray-600 mb-6">Join our community and stay updated on upcoming wellness events and programs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="btn-aflah-primary">
                <Link href="/contact">Contact Us</Link>
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
