"use client";

import { useEffect, useState, useMemo } from "react";

interface CalendlyWidgetProps {
  url?: string;
  prefill?: {
    name?: string;
    email?: string;
    customAnswers?: Record<string, string>;
  };
  utm?: {
    utmCampaign?: string;
    utmSource?: string;
    utmMedium?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  className?: string;
  height?: string;
  loadingMessage?: string;
}

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

// Counter for generating unique IDs
let widgetCounter = 0;

export default function CalendlyWidget({
  url,
  prefill,
  utm,
  className = "",
  height = "450px",
  loadingMessage = "Loading calendar..."
}: CalendlyWidgetProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Generate a stable ID that's consistent between server and client
  const widgetId = useMemo(() => {
    return `calendly-widget-${++widgetCounter}`;
  }, []);
  
  // Use environment variable as fallback
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/aflahcoaching/discovery-call";

  // Responsive height calculation
  const responsiveHeight = useMemo(() => {
    if (typeof window !== 'undefined') {
      const viewportHeight = window.innerHeight;
      // Use 60% of viewport height, but cap between 400px and 600px
      const calculatedHeight = Math.max(400, Math.min(600, viewportHeight * 0.6));
      return `${calculatedHeight}px`;
    }
    return height;
  }, [height]);

  useEffect(() => {
    if (!calendlyUrl) {
      setError("Calendly URL not configured");
      setIsLoading(false);
      return;
    }

    const initCalendly = () => {
      try {
        if (window.Calendly) {
          const element = document.getElementById(widgetId);
          if (element) {
            // Clear any existing content to prevent duplicates
            element.innerHTML = '';
            window.Calendly.initInlineWidget({
              url: calendlyUrl,
              parentElement: element,
              prefill,
              utm,
            });
            setIsLoading(false);
          }
        }
      } catch {
        setError("Failed to load Calendly widget");
        setIsLoading(false);
      }
    };

    // Load Calendly script if not already loaded
    if (!window.Calendly) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);

      script.onload = initCalendly;
      script.onerror = () => {
        setError("Failed to load Calendly script");
        setIsLoading(false);
      };
    } else {
      initCalendly();
    }

    // Cleanup function to prevent memory leaks
    return () => {
      const element = document.getElementById(widgetId);
      if (element) {
        element.innerHTML = '';
      }
    };
  }, [calendlyUrl, prefill, utm, widgetId]);

  if (error) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-6 text-center ${className}`}>
        <p className="text-red-600 mb-4">{error}</p>
        <a 
          href={calendlyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-aflah-primary"
        >
          Open Calendar in New Tab
        </a>
      </div>
    );
  }

  return (
    <div className={className}>
      {isLoading && (
        <div className="flex items-center justify-center" style={{ height: responsiveHeight }}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aflah-green mx-auto mb-4"></div>
            <p className="text-gray-600">{loadingMessage}</p>
          </div>
        </div>
      )}
      <div
        id={widgetId}
        className={`calendly-inline-widget ${isLoading ? 'hidden' : ''}`}
        data-url={calendlyUrl}
        style={{ minWidth: "320px", height: responsiveHeight }}
      />
    </div>
  );
}
