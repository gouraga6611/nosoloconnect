// ============================================================================
// useAuthUser.js — Subscribes to Firebase Auth (or the local stub) and
// exposes the current signed-in user object. In stub mode we also listen for
// EVENTS.AUTH_CHANGED so signInDemo / signOutUser refresh consumers without
// requiring a page reload.
// ============================================================================

import { useEffect, useState } from "react";
import { subscribeAuth, getStubUser } from "@/lib/auth";
import { EVENTS, on } from "@/lib/events";
import { firebaseEnabled } from "@/lib/firebase";

export const useAuthUser = () => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Real Firebase: subscribe to auth state directly.
    const unsub = subscribeAuth((u) => {
      setUser(u);
      setReady(true);
    });

    // Stub mode: also listen to our own auth-changed events (signInDemo etc.).
    let off = () => {};
    if (!firebaseEnabled) {
      off = on(EVENTS.AUTH_CHANGED, () => {
        setUser(getStubUser());
      });
    }

    return () => {
      unsub && unsub();
      off && off();
    };
  }, []);

  return { user, ready };
};
