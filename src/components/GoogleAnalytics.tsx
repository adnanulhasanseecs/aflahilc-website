"use client";

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  measurementId?: string;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics({ 
  measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID 
}: GoogleAnalyticsProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", measurementId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [measurementId]);

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// Utility function to track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Utility function to track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_title: title || document.title,
      page_location: url,
    });
  }
};
