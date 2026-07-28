// ============================================================================
// LandingPage.jsx — Composes the full public landing:
//   Navbar → Hero → Features → Safety → Coverage search → About →
//   Contact form → Footer
// StructuredData is a headless component that injects Schema.org JSON-LD so
// Google can index the app.
// ============================================================================

import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Features from "@/components/site/Features";
import Safety from "@/components/site/Safety";
import CoverageSearch from "@/components/site/CoverageSearch";
import About from "@/components/site/About";
import Footer from "@/components/site/Footer";
import StructuredData from "@/components/site/StructuredData";
import FeedbackSupportForm from "@/components/forms/FeedbackSupportForm";
import { CONTACT } from "@/constants/strings";
import { TID } from "@/constants/testIds";

// Contact block is small enough to co-locate here since it's landing-only.
const ContactSection = () => (
  <section
    id="contact"
    data-testid={TID.contactSection}
    className="nosolo-section bg-cream"
  >
    <div className="max-w-6xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <p className="nosolo-eyebrow mb-4">{CONTACT.eyebrow}</p>
        <h2 className="nosolo-heading text-4xl sm:text-5xl">
          {CONTACT.heading}
        </h2>
        <p className="mt-6 text-lg text-navy-soft leading-relaxed max-w-md">
          {CONTACT.intro}
        </p>
      </div>
      <div className="lg:col-span-7">
        <div className="nosolo-card p-8 md:p-10">
          <FeedbackSupportForm />
        </div>
      </div>
    </div>
  </section>
);

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-cream">
      <StructuredData />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Safety />
        <CoverageSearch />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
