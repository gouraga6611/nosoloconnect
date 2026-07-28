// ============================================================================
// useRatingsSummary.js — Hook to read aggregate ratings for landing + admin.
// ============================================================================

import { useEffect, useState, useCallback } from "react";
import { getRatingsSummary } from "@/lib/ratings";

export const useRatingsSummary = () => {
  const [summary, setSummary] = useState({
    count: 0,
    averageOverall: 0,
    dimensionAvgs: {},
    latest: [],
  });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const s = await getRatingsSummary();
      setSummary(s);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { ...summary, loading, refresh };
};
