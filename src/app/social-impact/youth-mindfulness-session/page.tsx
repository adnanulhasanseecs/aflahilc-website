import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, SlideIn } from "@/components/animations";

export default function YouthMindfulnessSessionPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Youth Mindfulness Session</h1>
            <p className="text-gray-600 max-w-3xl">Interactive sessions designed specifically for young adults, focusing on stress management, purpose discovery, and building resilience through Islamic principles.</p>
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
                    alt="Youth Mindfulness Session"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Date:</span>
                      <span className="text-gray-600">January 15, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Time:</span>
                      <span className="text-gray-600">2:00 PM - 6:00 PM</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Location:</span>
                      <span className="text-gray-600">Youth Center</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 w-24">Attendees:</span>
                      <span className="text-gray-600">75+ young adults</span>
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
                    This specialized session was designed to address the unique challenges faced by young adults in today's fast-paced world. The program combined Islamic mindfulness practices with modern psychology to help participants develop essential life skills for personal and professional success.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Through interactive workshops, group discussions, and practical exercises, young adults learned to manage stress, discover their purpose, and build resilience while staying true to their Islamic values.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <Card className="border-aflah-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Session Topics</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• Stress management and emotional regulation</li>
                        <li>• Purpose discovery and goal setting</li>
                        <li>• Building resilience and mental strength</li>
                        <li>• Islamic mindfulness and meditation</li>
                        <li>• Career guidance and life planning</li>
                        <li>• Peer support and community building</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-aflah-green/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-gray-900 mb-3 text-lg">Participant Feedback</h3>
                      <ul className="text-gray-600 space-y-2">
                        <li>• "Helped me understand my purpose better"</li>
                        <li>• "Learned practical stress management techniques"</li>
                        <li>• "Connected with like-minded peers"</li>
                        <li>• "Gained confidence in my abilities"</li>
                        <li>• "Appreciated the Islamic perspective"</li>
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
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Youth Programs</h2>
            <p className="text-gray-600 mb-6">Stay connected with our ongoing youth development programs and mentorship opportunities.</p>
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
