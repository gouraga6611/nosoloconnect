import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Features from "@/components/site/Features";
import Safety from "@/components/site/Safety";
import About from "@/components/site/About";
import Footer from "@/components/site/Footer";
import FeedbackSupportForm from "@/components/forms/FeedbackSupportForm";
import { CONTACT } from "@/constants/strings";
import { TID } from "@/constants/testIds";

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
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Safety />
        <About />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
