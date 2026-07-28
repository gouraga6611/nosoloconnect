// ============================================================================
// StructuredData.jsx — Injects a Schema.org JSON-LD block into <head> so that
// Google shows the community rating as a rich snippet in search results.
// Fed by the live rating aggregate.
// ============================================================================

import { useEffect } from "react";
import { SEO } from "@/constants/config";
import { useRatingsSummary } from "@/hooks/useRatingsSummary";

const SCRIPT_ID = "nosolo-jsonld";

export const StructuredData = () => {
  const { count, averageOverall } = useRatingsSummary();

  useEffect(() => {
    const payload = {
      "@context": "https://schema.org",
      "@type": "MobileApplication",
      name: SEO.siteName,
      description: SEO.description,
      applicationCategory: "TravelApplication",
      operatingSystem: "iOS, Android",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      url: SEO.siteUrl,
      ...(count > 0 && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: averageOverall.toString(),
          ratingCount: count.toString(),
          bestRating: "5",
          worstRating: "1",
        },
      }),
    };

    let el = document.getElementById(SCRIPT_ID);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = SCRIPT_ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(payload);
  }, [count, averageOverall]);

  return null;
};

export default StructuredData;
