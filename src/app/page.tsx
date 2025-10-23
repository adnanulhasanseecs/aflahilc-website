"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  Heart, 
  Users, 
  Lightbulb, 
  Star,
  ArrowRight,
  BookOpen,
  Globe
} from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem, HoverScale } from "@/components/animations";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function Home() {
  const services = [
    {
      title: "Life Coaching",
      description: "Personalized one-on-one sessions to help you discover your purpose and achieve your goals.",
      icon: Heart,
      href: "/services"
    },
    {
      title: "Corporate Coaching",
      description: "Leadership development and team building programs for organizations.",
      icon: Users,
      href: "/services"
    },
    {
      title: "Islamic Mindfulness",
      description: "Faith-based mindfulness practices for spiritual and mental wellbeing.",
      icon: BookOpen,
      href: "/services"
    },
    {
      title: "Workshops & Training",
      description: "Group sessions and corporate training programs on various topics.",
      icon: Lightbulb,
      href: "/trainings"
    }
  ];

  const upcomingWorkshops = [
    {
      title: "Finding Purpose Through Faith",
      date: "March 15, 2025",
      mode: "Online",
      description: "A 2-hour workshop on discovering your life's purpose through Islamic teachings."
    },
    {
      title: "Leadership Excellence Workshop",
      date: "March 22, 2025",
      mode: "Hybrid",
      description: "Corporate leadership training combining modern techniques with Islamic values."
    }
  ];

  const fbReviews = [
    {
      name: "Sarah Ahmed",
      avatar: undefined,
      content: "Aflah's coaching helped me find clarity in my career path while staying true to my Islamic values. The sessions were transformative.",
      rating: 5,
      date: "2024-01-15"
    },
    {
      name: "Mohammed Hassan",
      avatar: undefined,
      content: "Professional, insightful, and deeply rooted in faith. Aflah's approach to life coaching is exactly what I needed during a difficult transition.",
      rating: 5,
      date: "2024-01-10"
    },
    {
      name: "Fatima Ali",
      avatar: undefined,
      content: "The mindfulness techniques combined with Islamic principles have been life-changing. Highly recommend for anyone seeking authentic growth.",
      rating: 5,
      date: "2024-01-08"
    }
  ];

  const socialImpactHighlights = [
    {
      title: "Community Events",
      description: "Organized 15+ community workshops on mental health awareness",
      icon: Users
    },
    {
      title: "Educational Programs",
      description: "Developed faith-based curriculum for youth development programs",
      icon: BookOpen
    },
    {
      title: "Global Reach",
      description: "Served clients across 5 countries through online coaching sessions",
      icon: Globe
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        {/* Background image */}
        <div
          aria-hidden
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/upscaled_bg.png')" }}
        />
        {/* Soft overlay to keep text readable */}
        <div aria-hidden className="absolute inset-0 bg-white/85" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FadeIn delay={0.2}>
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Empowering Growth Through{" "}
                <span className="text-aflah-green">Faith, Purpose,</span>{" "}
                and Professional Excellence
              </h1>
            </FadeIn>
            <FadeIn delay={0.4}>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your life with professional Islamic life coaching services. 
                Discover your purpose, achieve your goals, and find balance through 
                faith-based guidance and modern psychology.
              </p>
            </FadeIn>
            <FadeIn delay={0.6}>
              <div className="flex justify-center">
                <HoverScale>
                  <Button
                    size="lg"
                    className="btn-aflah-primary px-8 py-3 text-lg"
                    asChild
                  >
                    <a 
                      href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
            target="_blank"
            rel="noopener noreferrer"
          >
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Appointment
                    </a>
                  </Button>
                </HoverScale>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Aflah Islamic Life Coaching Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine the wisdom of Islamic teachings with modern psychology to provide 
              comprehensive life coaching and corporate consultancy services. Our approach 
              is rooted in faith, integrity, and evidence-based practices.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive coaching solutions tailored to your personal and professional needs
            </p>
          </div>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <StaggerItem key={index}>
                  <HoverScale>
                    <Card className="hover:shadow-lg transition-shadow duration-300 border-aflah-green/20">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-aflah-gradient-light rounded-lg flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-aflah-green" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {service.description}
                    </CardDescription>
                    <Link href={service.href}>
                      <Button variant="outline" size="sm" className="btn-aflah-secondary w-full">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                    </Card>
                  </HoverScale>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Workshops
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our transformative workshops and training programs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {upcomingWorkshops.map((workshop, index) => (
              <Card key={index} className="border-aflah-green/20 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      {workshop.title}
                    </CardTitle>
                    <span className="bg-aflah-gradient-light text-aflah-green px-3 py-1 rounded-full text-sm font-medium">
                      {workshop.mode}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {workshop.date}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {workshop.description}
                  </CardDescription>
                  <Button className="btn-aflah-primary w-full">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Link href="/trainings">
              <Button variant="outline" size="lg" className="btn-aflah-secondary">
                View All Workshops
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials (Facebook) */}
      <section className="py-16 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest Facebook reviews from our clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(fbReviews.length ? fbReviews : []).slice(0, 6).map((rev, idx) => (
              <Card key={idx} className="border-green-100 bg-white">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: Math.max(1, Math.min(5, Math.round(rev.rating))) }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    &ldquo;{rev.content || ""}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {rev.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                    ) : null}
                    <div>
                      <p className="font-semibold text-gray-900">{rev.name}</p>
                      {rev.date ? (
                        <p className="text-xs text-gray-500">{new Date(rev.date).toLocaleDateString()}</p>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {fbReviews.length === 0 && (
              <div className="col-span-full text-center text-sm text-gray-500">
                Facebook reviews unavailable. We’ll show them here once API access is configured.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Impact Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Making a Difference
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to community service and social impact
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {socialImpactHighlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <Card key={index} className="text-center border-aflah-green/20 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-aflah-gradient-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-aflah-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link href="/social-impact">
              <Button variant="outline" size="lg" className="btn-aflah-secondary">
                Learn More About Our Impact
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-aflah-gradient cta-aflah">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Take the first step towards a more purposeful and fulfilling life. 
            Schedule your discovery call today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-aflah-green px-8 py-3 text-lg hover:bg-white hover:text-aflah-green"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Discovery Call
            </Button>
            <a
              href="https://wa.me/923315558474"
          target="_blank"
          rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-16 h-16 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors duration-200"
              title="WhatsApp Chat"
            >
              <WhatsAppIcon className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}