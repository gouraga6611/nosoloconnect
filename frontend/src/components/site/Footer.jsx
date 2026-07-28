import { Compass } from "lucide-react";
import { BRAND, FOOTER } from "@/constants/strings";

export const Footer = () => {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 text-white font-display font-bold text-xl">
            <Compass className="w-5 h-5 text-sky-300" />
            <span>{BRAND.wordmark}</span>
          </div>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            {FOOTER.madeWith}
          </p>
        </div>
        {FOOTER.columns.map((col) => (
          <div key={col.title}>
            <div className="text-white font-semibold mb-4 text-sm uppercase tracking-widest">
              {col.title}
            </div>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l} className="text-slate-400 hover:text-white transition-colors">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 text-xs text-slate-500 flex justify-between flex-wrap gap-2">
          <span>{BRAND.copyright}</span>
          <span>{BRAND.tagline}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
