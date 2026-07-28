import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, NAV } from "@/constants/strings";
import { TID } from "@/constants/testIds";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const Navbar = () => {
  return (
    <header className="nosolo-nav sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <button
          data-testid={TID.navHome}
          onClick={() => scrollTo("top")}
          className="flex items-center gap-2 text-navy font-display font-bold text-xl"
        >
          <Compass className="w-5 h-5 text-sky-brand" />
          <span>{BRAND.wordmark}</span>
        </button>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            data-testid={TID.navFeatures}
            onClick={() => scrollTo("features")}
            className="text-navy-soft hover:text-navy transition-colors"
          >
            {NAV.features}
          </button>
          <button
            data-testid={TID.navSafety}
            onClick={() => scrollTo("safety")}
            className="text-navy-soft hover:text-navy transition-colors"
          >
            {NAV.safety}
          </button>
          <button
            data-testid={TID.navAbout}
            onClick={() => scrollTo("about")}
            className="text-navy-soft hover:text-navy transition-colors"
          >
            {NAV.about}
          </button>
          <button
            data-testid={TID.navContact}
            onClick={() => scrollTo("contact")}
            className="text-navy-soft hover:text-navy transition-colors"
          >
            {NAV.contact}
          </button>
        </nav>

        <Button
          data-testid={TID.navCta}
          onClick={() => scrollTo("contact")}
          className="rounded-full bg-navy hover:bg-[#001126] text-white h-10 px-5"
        >
          {NAV.cta}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
