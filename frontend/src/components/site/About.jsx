import { motion } from "framer-motion";
import { ABOUT } from "@/constants/strings";

export const About = () => {
  return (
    <section id="about" className="nosolo-section bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <p className="nosolo-eyebrow mb-4">{ABOUT.eyebrow}</p>
          <h2 className="nosolo-heading text-4xl sm:text-5xl lg:text-6xl">
            {ABOUT.heading}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-lg text-navy-soft leading-relaxed max-w-2xl">
            {ABOUT.paragraph}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {ABOUT.audience.map((a, i) => (
              <motion.span
                key={a}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="nosolo-audience-pill"
              >
                {a}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
