// ============================================================================
// useCoverage.js — Hook to read live "places / countries covered" counts.
// Subscribes to EVENTS.LOCATIONS_CHANGED so hero + coverage stay in sync when
// admin adds/removes locations in another tab (or the same page).
// ============================================================================

import { useEffect, useState, useCallback } from "react";
import { countStats } from "@/lib/locations";
import { EVENTS, on } from "@/lib/events";

export const useCoverage = () => {
  const [stats, setStats] = useState({ places: 0, countries: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setStats(await countStats());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const off = on(EVENTS.LOCATIONS_CHANGED, refresh);
    return off;
  }, [refresh]);

  return { ...stats, loading, refresh };
};
