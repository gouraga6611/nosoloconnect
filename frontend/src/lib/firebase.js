// Firebase initialisation with graceful stub fallback.
// If FIREBASE_CONFIG still contains placeholder values, we skip real init and
// use a localStorage-backed store so the UI is fully functional locally.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FIREBASE_CONFIG } from "@/constants/config";

const isConfigured = !Object.values(FIREBASE_CONFIG).some(
  (v) => typeof v === "string" && v.startsWith("REPLACE"),
);

let app = null;
let db = null;

if (isConfigured) {
  app = initializeApp(FIREBASE_CONFIG);
  db = getFirestore(app);
}

export const firebaseEnabled = isConfigured;
export { app, db };
