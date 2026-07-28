// ============================================================================
// useCoverage.js — Hook to read live "places / countries covered" counts.
// ============================================================================

import { useEffect, useState, useCallback } from "react";
import { countStats } from "@/lib/locations";

export const useCoverage = () => {
  const [stats, setStats] = useState({ places: 0, countries: 0 });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const s = await countStats();
      setStats(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...stats, loading, refresh };
};
