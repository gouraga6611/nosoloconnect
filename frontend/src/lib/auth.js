// ============================================================================
// auth.js — Google Sign-In wrapper with a graceful stub for local dev.
//   * Real mode (Firebase configured): uses signInWithPopup + GoogleAuthProvider
//     and returns a { uid, name, email, photo, verified: true } object.
//   * Stub mode: stores a user object in localStorage under the AUTH_USER key.
//     Callers pass in an explicit { name, email } — used by RatingsSection's
//     "demo sign-in" fallback.
// ============================================================================

import {
  signInWithPopup,
  signOut as fbSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider, firebaseEnabled } from "@/lib/firebase";
import { LOCAL_STORAGE_AUTH_USER_KEY } from "@/constants/config";

// -- Read/write stub user in localStorage --------------------------------------
const readStubUser = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStubUser = (user) => {
  if (user) {
    localStorage.setItem(LOCAL_STORAGE_AUTH_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_USER_KEY);
  }
};

// -- Public API ----------------------------------------------------------------

/** Attempt a Google Sign-In popup. Only usable when Firebase is configured. */
export const signInWithGoogle = async () => {
  if (!(firebaseEnabled && auth && googleProvider)) {
    throw new Error("firebase-not-configured");
  }
  const cred = await signInWithPopup(auth, googleProvider);
  const u = cred.user;
  return {
    uid: u.uid,
    name: u.displayName || "Traveler",
    email: u.email || "",
    photo: u.photoURL || "",
    verified: true,
    provider: "google.com",
  };
};

/** Stub sign-in used when Firebase is not configured — accepts a demo profile. */
export const signInDemo = async ({ name, email }) => {
  const user = {
    uid: `demo_${email.toLowerCase()}`,
    name,
    email,
    photo: "",
    verified: true,
    provider: "demo",
  };
  writeStubUser(user);
  return user;
};

/** Sign the current user out. */
export const signOutUser = async () => {
  if (firebaseEnabled && auth) {
    await fbSignOut(auth);
  }
  writeStubUser(null);
};

/** Subscribe to auth changes. Returns an unsubscribe fn. */
export const subscribeAuth = (callback) => {
  if (firebaseEnabled && auth) {
    return onAuthStateChanged(auth, (u) => {
      if (!u) return callback(null);
      callback({
        uid: u.uid,
        name: u.displayName || "Traveler",
        email: u.email || "",
        photo: u.photoURL || "",
        verified: !!u.emailVerified || u.providerData.some((p) => p.providerId === "google.com"),
        provider: u.providerData[0]?.providerId || "unknown",
      });
    });
  }
  // Stub: no real events — just push current value once and return no-op.
  callback(readStubUser());
  return () => {};
};

export const getStubUser = readStubUser;
