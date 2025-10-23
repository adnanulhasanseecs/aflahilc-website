import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  structuredData?: Record<string, unknown>;
}

export default function SEO({
  title = "Aflah Islamic Life Coaching Services | Empowering Growth Through Faith",
  description = "Professional life coaching and corporate consultancy services rooted in Islamic values. Empowering growth through faith, purpose, and professional excellence.",
  keywords = "Islamic life coaching, corporate coaching, mindfulness, leadership development, faith-based coaching",
  image = "/og-image.jpg",
  url = "https://aflahcoaching.com",
  type = "website",
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes("Aflah") ? title : `${title} | Aflah Islamic Life Coaching Services`;
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Aflah Islamic Life Coaching Services",
    "description": description,
    "url": url,
    "logo": "https://aflahcoaching.com/logo.png",
    "image": image,
    "telephone": "+1-555-123-4567",
    "email": "info@aflahcoaching.com",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "serviceType": [
      "Life Coaching",
      "Corporate Coaching", 
      "Islamic Mindfulness",
      "Leadership Development"
    ],
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Coaching Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Life Coaching",
            "description": "One-on-one sessions tailored to your goals and faith-centered growth"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Corporate Coaching",
            "description": "Leadership, communication, and team performance programs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Islamic Mindfulness Programs",
            "description": "Workshops and guided practices for spiritual wellbeing"
          }
        }
      ]
    }
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Aflah Islamic Life Coaching Services" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Aflah Islamic Life Coaching Services" />
      <link rel="canonical" href={url} />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(finalStructuredData),
        }}
      />
    </Head>
  );
}
