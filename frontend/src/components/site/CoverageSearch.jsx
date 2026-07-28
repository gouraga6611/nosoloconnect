// ============================================================================
// CoverageSearch.jsx — Landing section that lets a visitor check whether a
// place / state / country is already live on NoSolo. Results come from the
// same `locations` collection the admin populates.
// ============================================================================

import { useEffect, useState } from "react";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { COVERAGE } from "@/constants/strings";
import { TID } from "@/constants/testIds";
import { searchLocations } from "@/lib/locations";

export const CoverageSearch = () => {
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [dirty, setDirty] = useState(false);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setMatches([]);
      return;
    }
    const t = setTimeout(async () => {
      const found = await searchLocations(query);
      setMatches(found);
      setDirty(true);
    }, 220);
    return () => clearTimeout(t);
  }, [query]);

  const showHint = query.trim().length < 2;
  const isAvailable = !showHint && matches.length > 0;
  const isUnavailable = !showHint && dirty && matches.length === 0;

  return (
    <section id="coverage" className="nosolo-section bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-10">
          <p className="nosolo-eyebrow mb-4">{COVERAGE.eyebrow}</p>
          <h2 className="nosolo-heading text-4xl sm:text-5xl">
            {COVERAGE.heading}
          </h2>
          <p className="mt-4 text-lg text-navy-soft max-w-2xl mx-auto">
            {COVERAGE.intro}
          </p>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-navy-soft" />
          <Input
            data-testid={TID.coverageInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={COVERAGE.placeholder}
            aria-label={COVERAGE.searchLabel}
            className="h-14 pl-12 pr-4 text-lg nosolo-input rounded-2xl"
          />
        </div>

        <div
          data-testid={TID.coverageResult}
          className="mt-6 min-h-[80px]"
        >
          {showHint && (
            <p className="text-sm text-navy-soft">{COVERAGE.emptyHint}</p>
          )}

          {isAvailable && (
            <div className="nosolo-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <h3 className="font-display text-xl text-navy font-bold">
                  {COVERAGE.availableTitle(matches.length)}
                </h3>
              </div>
              <ul className="space-y-2">
                {matches.slice(0, 8).map((l) => (
                  <li
                    key={l.id}
                    data-testid={TID.coverageMatchItem(l.id)}
                    className="flex items-center gap-2 text-navy"
                  >
                    <span className="nosolo-dot" />
                    <span>{COVERAGE.matchLine(l)}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {isUnavailable && (
            <div className="nosolo-card p-6 border-orange-200">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-6 h-6 text-orange-500" />
                <h3 className="font-display text-xl text-navy font-bold">
                  {COVERAGE.unavailableTitle}
                </h3>
              </div>
              <p className="text-navy-soft">{COVERAGE.unavailableCopy}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CoverageSearch;
