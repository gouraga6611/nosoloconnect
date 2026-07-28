// ============================================================================
// useAuthUser.js — Subscribes to Firebase Auth (or the local stub) and
// exposes the current signed-in user object.
// ============================================================================

import { useEffect, useState } from "react";
import { subscribeAuth } from "@/lib/auth";

export const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = subscribeAuth((u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub && unsub();
  }, []);

  return { user, ready };
};
