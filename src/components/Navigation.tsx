"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/trainings", label: "Trainings & Workshops" },
    { href: "/social-impact", label: "Social Impact" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo.png"
                alt="Aflah Islamic Life Coaching Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-playfair text-xl font-semibold text-aflah-green">
              Aflah Islamic Life Coaching
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-aflah-green transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  size="sm"
                  className="btn-aflah-primary"
                  asChild
                >
                  <a 
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Session
                  </a>
                </Button>
                <a
                  href="https://wa.me/923315558474"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 bg-aflah-green/10 hover:bg-aflah-green/20 text-aflah-green rounded-full transition-colors duration-200"
                  title="WhatsApp Chat"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                </a>
              </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-green-100 bg-white/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-aflah-green hover:bg-aflah-gradient-light rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
                  <div className="pt-4 space-y-2">
                    <Button
                      size="sm"
                      className="w-full btn-aflah-primary"
                      asChild
                    >
                      <a 
                        href={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Session
                      </a>
                    </Button>
                    <a
                      href="https://wa.me/923315558474"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center py-2 px-3 bg-aflah-green/10 hover:bg-aflah-green/20 text-aflah-green rounded-md transition-colors duration-200"
                    >
                      <WhatsAppIcon className="w-5 h-5 mr-2" />
                      WhatsApp Chat
                    </a>
                  </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
