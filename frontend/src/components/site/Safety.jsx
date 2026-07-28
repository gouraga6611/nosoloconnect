import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SAFETY } from "@/constants/strings";

const SAFETY_IMAGE =
  "https://images.pexels.com/photos/12650678/pexels-photo-12650678.jpeg";

export const Safety = () => {
  return (
    <section id="safety" className="nosolo-section bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <p className="text-sky-300 uppercase tracking-[0.16em] text-xs font-semibold mb-4">
            {SAFETY.eyebrow}
          </p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {SAFETY.heading}
          </h2>
          <ul className="mt-10 space-y-4">
            {SAFETY.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-brand mt-1 shrink-0" />
                <span className="text-slate-200 text-base">{b}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-6"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10">
            <img
              src={SAFETY_IMAGE}
              alt={SAFETY.imageAlt}
              className="w-full h-[480px] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-brand animate-pulse" />
                <span className="text-sm text-white/90">
                  Live 24/7 moderation on every conversation
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Safety;
