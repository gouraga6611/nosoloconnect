// Storage service abstraction — talks to Firestore when configured,
// otherwise falls back to localStorage so the site remains fully usable.
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, firebaseEnabled } from "@/lib/firebase";
import {
  FIRESTORE_TICKETS_COLLECTION,
  LOCAL_STORAGE_TICKETS_KEY,
  TICKET_STATUS,
} from "@/constants/config";

const readLocal = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_TICKETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeLocal = (items) => {
  localStorage.setItem(LOCAL_STORAGE_TICKETS_KEY, JSON.stringify(items));
};

const genId = () =>
  `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

export const createTicket = async (payload) => {
  const record = {
    ...payload,
    status: TICKET_STATUS.OPEN,
    createdAt: new Date().toISOString(),
  };

  if (firebaseEnabled && db) {
    const ref = await addDoc(collection(db, FIRESTORE_TICKETS_COLLECTION), record);
    return { id: ref.id, ...record };
  }

  const items = readLocal();
  const withId = { id: genId(), ...record };
  items.unshift(withId);
  writeLocal(items);
  return withId;
};

export const listTickets = async () => {
  if (firebaseEnabled && db) {
    const q = query(
      collection(db, FIRESTORE_TICKETS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
  return readLocal();
};

export const deleteTicket = async (id) => {
  if (firebaseEnabled && db) {
    await deleteDoc(doc(db, FIRESTORE_TICKETS_COLLECTION, id));
    return;
  }
  writeLocal(readLocal().filter((t) => t.id !== id));
};

export const updateTicketStatus = async (id, status) => {
  if (firebaseEnabled && db) {
    await updateDoc(doc(db, FIRESTORE_TICKETS_COLLECTION, id), { status });
    return;
  }
  const items = readLocal().map((t) => (t.id === id ? { ...t, status } : t));
  writeLocal(items);
};
