// ============================================================================
// locations.js — CRUD for the "locations" collection.
//   * Real Firestore when configured, otherwise localStorage stub.
//   * Also exposes helpers used by the landing:
//       - searchLocations(q)   → coverage search
//       - countStats()         → { places, countries }
// ============================================================================

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import {
  FIRESTORE_LOCATIONS_COLLECTION,
  LOCAL_STORAGE_LOCATIONS_KEY,
} from "@/constants/config";

const readLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_LOCATIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (items) =>
  localStorage.setItem(LOCAL_STORAGE_LOCATIONS_KEY, JSON.stringify(items));

const genId = () =>
  `loc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;

// -- CRUD ---------------------------------------------------------------------

export const addLocation = async ({ place, state, country }) => {
  const record = {
    place: place.trim(),
    state: (state || "").trim(),
    country: country.trim(),
    createdAt: new Date().toISOString(),
  };
  if (firebaseEnabled && db) {
    const ref = await addDoc(
      collection(db, FIRESTORE_LOCATIONS_COLLECTION),
      record,
    );
    return { id: ref.id, ...record };
  }
  const items = readLocal();
  const withId = { id: genId(), ...record };
  items.unshift(withId);
  writeLocal(items);
  return withId;
};

export const listLocations = async () => {
  if (firebaseEnabled && db) {
    const q = query(
      collection(db, FIRESTORE_LOCATIONS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return readLocal();
};

export const deleteLocation = async (id) => {
  if (firebaseEnabled && db) {
    await deleteDoc(doc(db, FIRESTORE_LOCATIONS_COLLECTION, id));
    return;
  }
  writeLocal(readLocal().filter((l) => l.id !== id));
};

// -- Derived helpers ----------------------------------------------------------

/** Case-insensitive search across place/state/country fields. */
export const searchLocations = async (rawQuery) => {
  const q = (rawQuery || "").trim().toLowerCase();
  if (!q) return [];
  const all = await listLocations();
  return all.filter((l) =>
    [l.place, l.state, l.country]
      .filter(Boolean)
      .some((v) => v.toLowerCase().includes(q)),
  );
};

/** Distinct place & country counts (case-insensitive on names). */
export const countStats = async () => {
  const all = await listLocations();
  const places = new Set(
    all.map((l) => `${l.place.toLowerCase()}|${(l.country || "").toLowerCase()}`),
  );
  const countries = new Set(
    all.map((l) => (l.country || "").toLowerCase()).filter(Boolean),
  );
  return { places: places.size, countries: countries.size };
};
