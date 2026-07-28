// ============================================================================
// useRatingsSummary.js — Hook to read aggregate ratings for landing + admin.
// Subscribes to EVENTS.RATINGS_CHANGED so every consumer refreshes instantly
// when a rating is submitted (no per-component polling).
// ============================================================================

import { useEffect, useState, useCallback } from "react";
import { getRatingsSummary } from "@/lib/ratings";
import { EVENTS, on } from "@/lib/events";

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
      setSummary(await getRatingsSummary());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const off = on(EVENTS.RATINGS_CHANGED, refresh);
    return off;
  }, [refresh]);

  return { ...summary, loading, refresh };
};
