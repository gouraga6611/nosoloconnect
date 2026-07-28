// ============================================================================
// firebase.js — Initialises Firebase App, Firestore and Auth exactly once.
//   * If FIREBASE_CONFIG still holds any "REPLACE_*" placeholder, the app runs
//     in STUB mode: `firebaseEnabled` is false and every storage/auth helper
//     falls back to localStorage. This lets the UI be fully functional locally
//     without a real Firebase project.
//   * The moment real values are pasted into config.js, everything switches
//     automatically to Firestore + Firebase Auth (Google popup).
// ============================================================================

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "@/constants/config";

const isConfigured = !Object.values(FIREBASE_CONFIG).some(
  (v) => typeof v === "string" && v.startsWith("REPLACE"),
);

let app = null;
let db = null;

if (isConfigured) {
  app = getApps()[0] || initializeApp(FIREBASE_CONFIG);
  db = getFirestore(app);
}

export const firebaseEnabled = isConfigured;
export { app, db };
