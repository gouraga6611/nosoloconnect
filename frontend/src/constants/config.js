// ============================================================================
// config.js — Non-string configuration constants.
//   * Admin gate password
//   * Options for form selects (types, priorities, statuses)
//   * Badge className maps (Tailwind)
//   * Firebase config (placeholder until user pastes real values)
//   * Firestore collection names + localStorage keys used by the stub layer
//   * Rating dimensions (used by RatingsSection & aggregation logic)
// ============================================================================

// ------------------------------
// Admin gate
// ------------------------------
export const ADMIN_PASSWORD = "Nosolo!23";
export const ADMIN_SESSION_KEY = "nosolo_admin_unlocked";

// ------------------------------
// localStorage stub keys (used when Firebase is not configured)
// ------------------------------
export const LOCAL_STORAGE_TICKETS_KEY = "nosolo_tickets_stub";
export const LOCAL_STORAGE_LOCATIONS_KEY = "nosolo_locations_stub";
export const LOCAL_STORAGE_RATINGS_KEY = "nosolo_ratings_stub";
export const LOCAL_STORAGE_AUTH_USER_KEY = "nosolo_authed_user_stub";

// ------------------------------
// Firestore collection names (real Firestore + stub both)
// ------------------------------
export const FIRESTORE_TICKETS_COLLECTION = "tickets";
export const FIRESTORE_LOCATIONS_COLLECTION = "locations";
export const FIRESTORE_RATINGS_COLLECTION = "ratings";

// ------------------------------
// Ticket options
// ------------------------------
export const TICKET_TYPES = [
  { value: "feedback", label: "Feedback" },
  { value: "support", label: "Support" },
  { value: "bug", label: "Bug Report" },
  { value: "suggestion", label: "Suggestion" },
];

export const TICKET_PRIORITIES = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export const TICKET_STATUS = { OPEN: "open", CLOSED: "closed" };

export const TICKET_STATUS_OPTIONS = [
  { value: TICKET_STATUS.OPEN, label: "Open" },
  { value: TICKET_STATUS.CLOSED, label: "Closed" },
];

// ------------------------------
// Rating dimensions collected from every verified user
// ------------------------------
export const RATING_DIMENSIONS = [
  { key: "experience", label: "Experience", helper: "Overall trip vibe" },
  { key: "safety", label: "Safety", helper: "Verification & trust" },
  { key: "cost", label: "Cost / Value", helper: "Bang for the buck" },
  { key: "app", label: "App Quality", helper: "How the app performed" },
];

// ------------------------------
// Tailwind badge className maps
// ------------------------------
export const PRIORITY_BADGE = {
  urgent: "bg-red-100 text-red-700 border-red-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  low: "bg-sky-100 text-sky-700 border-sky-200",
};

export const STATUS_BADGE = {
  open: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
};

export const TYPE_BADGE = {
  feedback: "bg-sky-50 text-sky-700 border-sky-200",
  support: "bg-indigo-50 text-indigo-700 border-indigo-200",
  bug: "bg-rose-50 text-rose-700 border-rose-200",
  suggestion: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

// ------------------------------
// Firebase config (client-side).
// Replace REPLACE_* values with real ones from your Firebase console.
// When any value still starts with "REPLACE" the app runs in stub mode
// (localStorage-backed) — see lib/firebase.js.
// ------------------------------
export const FIREBASE_CONFIG = {
  apiKey: "REPLACE_WITH_FIREBASE_API_KEY",
  authDomain: "REPLACE.firebaseapp.com",
  projectId: "REPLACE_PROJECT_ID",
  storageBucket: "REPLACE.appspot.com",
  messagingSenderId: "REPLACE_SENDER_ID",
  appId: "REPLACE_APP_ID",
};

// ------------------------------
// Schema.org / SEO — used by StructuredData.jsx
// ------------------------------
export const SEO = {
  siteName: "NoSolo",
  description:
    "NoSolo connects verified Indian solo travelers to explore together. Anonymously at first, safely always.",
  siteUrl: "https://nosolo.app",
};
