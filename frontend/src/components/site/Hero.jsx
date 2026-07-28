import { motion } from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import { HERO } from "@/constants/strings";
import { TID } from "@/constants/testIds";

const HERO_IMAGE =
  "https://images.pexels.com/photos/562623/pexels-photo-562623.jpeg";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Hero = () => {
  return (
    <section id="top" className="relative">
      <div className="relative min-h-[92vh] w-full overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Solo traveler on a boardwalk at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 nosolo-hero-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-24 lg:pt-40 lg:pb-32">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sky-200 uppercase tracking-[0.2em] text-xs font-semibold mb-6"
          >
            <span className="nosolo-dot mr-2" />
            {HERO.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-white text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.02] max-w-4xl"
          >
            {HERO.title}
            <br />
            <span className="text-sky-300">{HERO.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-lg lg:text-xl text-slate-200 max-w-2xl leading-relaxed"
          >
            {HERO.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid={TID.heroPrimaryCta}
              onClick={() => scrollTo("contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-white text-navy px-6 py-3 font-semibold hover:bg-sky-brand hover:text-white transition-colors"
            >
              {HERO.primaryCta}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              data-testid={TID.heroSecondaryCta}
              onClick={() => scrollTo("features")}
              className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              <MoveDown className="w-4 h-4" />
              {HERO.secondaryCta}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 grid grid-cols-3 max-w-xl gap-4"
          >
            {HERO.stats.map((s) => (
              <div key={s.label} className="text-white">
                <div className="font-display text-3xl lg:text-4xl font-bold text-white">
                  {s.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-slate-300 mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
