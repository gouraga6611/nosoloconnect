// ============================================================================
// ratings.js — Persist multi-dimension ratings from Google-verified users.
//
//   * Real Firestore or localStorage stub (same pattern as tickets/locations).
//   * `submitRating` will upsert per user (uid) — one rating per user.
//   * `getRatingsSummary` computes:
//       - averageOverall  (rounded to 1 decimal)
//       - count           (# of ratings)
//       - dimensionAvgs   ({ experience: 4.7, safety: 4.9, … })
//     Used both by the landing Hero / RatingsSection and by the admin
//     ratings tab, and by the JSON-LD structured data script for Google
//     search rich snippets.
// ============================================================================

import {
  collection,
  getDocs,
  setDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import {
  FIRESTORE_RATINGS_COLLECTION,
  LOCAL_STORAGE_RATINGS_KEY,
  RATING_DIMENSIONS,
} from "@/constants/config";
import { emit, EVENTS } from "@/lib/events";

const readLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_RATINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (items) =>
  localStorage.setItem(LOCAL_STORAGE_RATINGS_KEY, JSON.stringify(items));

// -- Submit / list ------------------------------------------------------------

/**
 * Upserts a rating keyed by user uid.
 * `dimensions` is a { experience, safety, cost, app } object of 1-5 numbers.
 */
export const submitRating = async ({ user, dimensions, comment }) => {
  const dimAverage =
    RATING_DIMENSIONS.reduce((sum, d) => sum + (dimensions[d.key] || 0), 0) /
    RATING_DIMENSIONS.length;

  const record = {
    uid: user.uid,
    name: user.name,
    email: user.email,
    photo: user.photo || "",
    provider: user.provider || "google.com",
    verified: !!user.verified,
    dimensions,
    overall: Number(dimAverage.toFixed(2)),
    comment: (comment || "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (firebaseEnabled && db) {
    // uid as document ID → one rating per user, upsertable.
    await setDoc(doc(db, FIRESTORE_RATINGS_COLLECTION, user.uid), record);
    emit(EVENTS.RATINGS_CHANGED);
    return { id: user.uid, ...record };
  }

  // Stub upsert-by-uid
  const items = readLocal().filter((r) => r.uid !== user.uid);
  const withId = { id: user.uid, ...record };
  items.unshift(withId);
  writeLocal(items);
  emit(EVENTS.RATINGS_CHANGED);
  return withId;
};

export const listRatings = async () => {
  if (firebaseEnabled && db) {
    const q = query(
      collection(db, FIRESTORE_RATINGS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return readLocal();
};

/** Has this user already submitted? */
export const findUserRating = async (uid) => {
  const all = await listRatings();
  return all.find((r) => r.uid === uid) || null;
};

// -- Aggregate ---------------------------------------------------------------

/** Compute overall + per-dimension averages. */
export const getRatingsSummary = async () => {
  const all = await listRatings();
  if (all.length === 0) {
    return {
      count: 0,
      averageOverall: 0,
      dimensionAvgs: RATING_DIMENSIONS.reduce(
        (acc, d) => ({ ...acc, [d.key]: 0 }),
        {},
      ),
      latest: [],
    };
  }
  const dimensionAvgs = {};
  RATING_DIMENSIONS.forEach((d) => {
    const sum = all.reduce((s, r) => s + (r.dimensions?.[d.key] || 0), 0);
    dimensionAvgs[d.key] = Number((sum / all.length).toFixed(2));
  });
  const overallSum = all.reduce((s, r) => s + (r.overall || 0), 0);
  return {
    count: all.length,
    averageOverall: Number((overallSum / all.length).toFixed(1)),
    dimensionAvgs,
    latest: all.slice(0, 10),
  };
};
