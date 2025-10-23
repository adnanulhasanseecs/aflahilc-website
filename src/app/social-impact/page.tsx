"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const EVENTS = [
  { 
    id: "community-wellness-day",
    title: "Community Wellness Day", 
    date: "2024-11-02",
    image: "/logo.png",
    brief: "A comprehensive wellness event bringing together community members for health screenings, mindfulness sessions, and Islamic life coaching workshops.",
    slug: "community-wellness-day"
  },
  { 
    id: "youth-mindfulness-session",
    title: "Youth Mindfulness Session", 
    date: "2025-01-15",
    image: "/logo.png",
    brief: "Interactive sessions designed specifically for young adults, focusing on stress management, purpose discovery, and building resilience through Islamic principles.",
    slug: "youth-mindfulness-session"
  },
  { 
    id: "charity-collaboration",
    title: "Charity Collaboration", 
    date: "2025-03-01",
    image: "/logo.png",
    brief: "Partnering with local charities to provide life coaching services to underserved communities, promoting mental health and personal development.",
    slug: "charity-collaboration"
  },
  { 
    id: "women-empowerment-workshop",
    title: "Women's Empowerment Workshop", 
    date: "2025-04-15",
    image: "/logo.png",
    brief: "A specialized workshop focusing on empowering women through Islamic principles, career development, and personal growth strategies.",
    slug: "women-empowerment-workshop"
  },
  { 
    id: "family-counseling-session",
    title: "Family Counseling Session", 
    date: "2025-05-20",
    image: "/logo.png",
    brief: "Group counseling sessions for families, addressing communication, conflict resolution, and strengthening family bonds through faith-based guidance.",
    slug: "family-counseling-session"
  },
  { 
    id: "stress-management-seminar",
    title: "Stress Management Seminar", 
    date: "2025-06-10",
    image: "/logo.png",
    brief: "A comprehensive seminar on managing stress through Islamic mindfulness techniques, breathing exercises, and practical coping strategies.",
    slug: "stress-management-seminar"
  },
  { 
    id: "career-guidance-program",
    title: "Career Guidance Program", 
    date: "2025-07-05",
    image: "/logo.png",
    brief: "Professional development program helping individuals discover their career path, build skills, and achieve their professional goals.",
    slug: "career-guidance-program"
  },
  { 
    id: "mental-health-awareness",
    title: "Mental Health Awareness Campaign", 
    date: "2025-08-12",
    image: "/logo.png",
    brief: "Community-wide campaign to raise awareness about mental health, reduce stigma, and provide resources for those in need.",
    slug: "mental-health-awareness"
  },
  { 
    id: "youth-leadership-summit",
    title: "Youth Leadership Summit", 
    date: "2025-09-18",
    image: "/logo.png",
    brief: "Annual summit bringing together young leaders for skill development, networking, and community service planning.",
    slug: "youth-leadership-summit"
  },
];

const EVENTS_PER_PAGE = 3;

export default function SocialImpactPage() {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Track state changes
  useEffect(() => {
    console.log('State changed - currentPage:', currentPage);
  }, [currentPage]);
  
  const totalPages = Math.ceil(EVENTS.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = EVENTS.slice(startIndex, endIndex);

  // Debug logging
  console.log('Pagination Debug:', {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    eventsLength: EVENTS.length,
    currentEventsLength: currentEvents.length,
    eventsPerPage: EVENTS_PER_PAGE,
    slicedEvents: currentEvents.map(e => e.title)
  });

  const handlePageChange = (page: number) => {
    console.log('Changing to page:', page);
    console.log('Before change - currentPage:', currentPage, 'totalPages:', totalPages);
    setCurrentPage(page);
    console.log('After setCurrentPage call');
    // Scroll to top of events section
    const eventsSection = document.getElementById('events-section');
    if (eventsSection) {
      eventsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    // Simple pagination - show all pages for now
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "btn-aflah-primary" : "btn-aflah-secondary"}
          size="sm"
        >
          {i}
        </Button>
      );
    }
    
    return pages;
  };

  return (
    <div className="min-h-screen">
      <section className="py-16 bg-aflah-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Social Impact</h1>
          <p className="text-gray-600 max-w-3xl">Highlights from community events, programs, and collaborations making a positive difference.</p>
        </div>
      </section>

      <section id="events-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-8 text-center">Our Events & Impact</h2>
          </FadeIn>
          
          <div key={currentPage} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentEvents.length > 0 ? currentEvents.map((event) => (
              <div key={event.id}>
                <Card className="border-aflah-green/20 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{new Date(event.date).toLocaleDateString()}</p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4">{event.brief}</p>
                    </div>
                    <div className="mt-auto">
                      <Button 
                        asChild 
                        className="btn-aflah-primary w-full"
                      >
                        <Link href={`/social-impact/${event.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No events found for this page.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Button 
                variant="outline" 
                className="btn-aflah-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {renderPageNumbers()}
              </div>
              
              <Button 
                variant="outline" 
                className="btn-aflah-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            
            {/* Page Info */}
            <div className="text-center text-gray-600 text-sm">
              Showing {startIndex + 1}-{Math.min(endIndex, EVENTS.length)} of {EVENTS.length} events
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="text-center bg-green-50 p-8 rounded-xl">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Invite Aflah for an Event</h2>
              <p className="text-gray-600 mb-6">For event invitations, please use the Contact page. We welcome collaborations that uplift the community.</p>
              <Button asChild className="btn-aflah-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}