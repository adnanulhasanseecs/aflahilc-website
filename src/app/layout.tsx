import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aflah Islamic Life Coaching Services | Empowering Growth Through Faith",
  description: "Professional life coaching and corporate consultancy services rooted in Islamic values. Empowering growth through faith, purpose, and professional excellence.",
  keywords: "Islamic life coaching, corporate coaching, mindfulness, leadership development, faith-based coaching",
  authors: [{ name: "Aflah Islamic Life Coaching Services" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    title: "Aflah Islamic Life Coaching Services",
    description: "Empowering Growth Through Faith, Purpose, and Professional Excellence",
    type: "website",
    locale: "en_US",
    url: "https://aflahcoaching.com",
    siteName: "Aflah Islamic Life Coaching Services",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Aflah Islamic Life Coaching Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aflah Islamic Life Coaching Services",
    description: "Empowering Growth Through Faith, Purpose, and Professional Excellence",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <GoogleAnalytics />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
