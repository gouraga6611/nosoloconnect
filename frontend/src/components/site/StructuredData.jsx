// ============================================================================
// StructuredData.jsx — Injects a static Schema.org JSON-LD block into <head>
// so Google can index the app metadata.
// ============================================================================

import { useEffect } from "react";
import { SEO } from "@/constants/config";

const SCRIPT_ID = "nosolo-jsonld";

export const StructuredData = () => {
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
    };

    let el = document.getElementById(SCRIPT_ID);
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = SCRIPT_ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(payload);
  }, []);

  return null;
};

export default StructuredData;
