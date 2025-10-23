import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Mail, 
  Phone, 
  MapPin,
  Facebook
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { href: "/services", label: "Life Coaching" },
      { href: "/services", label: "Corporate Coaching" },
      { href: "/services", label: "Islamic Mindfulness" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/trainings", label: "Trainings" },
      { href: "/social-impact", label: "Social Impact" },
      { href: "/contact", label: "Contact" },
    ],
    resources: [
      { href: "#", label: "Blog" },
      { href: "#", label: "Testimonials" },
      { href: "#", label: "FAQ" },
      { href: "#", label: "Privacy Policy" },
    ],
  };

  const socialLinks = [
    { href: "https://www.facebook.com/aflahilc", icon: Facebook, label: "Facebook" },
  ];

  return (
    <footer className="bg-gradient-to-br from-green-50 to-green-100 border-t border-green-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Aflah Islamic Life Coaching Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-lg font-semibold text-aflah-green leading-tight">
                  Aflah
                </span>
                <span className="font-playfair text-sm font-medium text-aflah-green leading-tight">
                  Islamic Life Coaching
                </span>
              </div>
            </Link>
            <p className="text-gray-600 mb-6 leading-relaxed text-sm">
              Empowering growth through faith, purpose, and professional excellence. 
              Your journey to holistic wellbeing starts here.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-aflah-green mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-aflah-green transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-aflah-green mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-aflah-green transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-aflah-green mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-aflah-green transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Information - Full Width Row */}
        <div className="mt-8 pt-6 border-t border-green-200">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Phone className="w-4 h-4 text-aflah-green flex-shrink-0" />
              <span>+92 331 555 8474</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <Mail className="w-4 h-4 text-aflah-green flex-shrink-0" />
              <span>aflahilc@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 text-sm">
              <MapPin className="w-4 h-4 text-aflah-green flex-shrink-0" />
              <span>Available Worldwide</span>
            </div>
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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-green-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 text-sm mb-4 md:mb-0">
              © {currentYear} Aflah Islamic Life Coaching Services. All rights reserved.
            </div>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-aflah-green transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
