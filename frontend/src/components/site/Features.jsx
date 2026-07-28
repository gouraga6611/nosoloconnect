import { motion } from "framer-motion";
import {
  EyeOff,
  BadgeCheck,
  SlidersHorizontal,
  MessageCircle,
  Siren,
  Star,
} from "lucide-react";
import { FEATURES } from "@/constants/strings";

const ICONS = {
  anonymous: EyeOff,
  kyc: BadgeCheck,
  matching: SlidersHorizontal,
  chat: MessageCircle,
  sos: Siren,
  reviews: Star,
};

export const Features = () => {
  return (
    <section id="features" className="nosolo-section bg-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="nosolo-eyebrow mb-4">{FEATURES.eyebrow}</p>
          <h2 className="nosolo-heading text-4xl sm:text-5xl lg:text-6xl">
            {FEATURES.heading}
          </h2>
          <p className="mt-6 text-lg text-navy-soft leading-relaxed">
            {FEATURES.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.items.map((item, idx) => {
            const Icon = ICONS[item.key] ?? Star;
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="nosolo-card p-8"
              >
                <div className="w-11 h-11 rounded-xl bg-sky-soft flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-sky-brand" />
                </div>
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-navy-soft leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
