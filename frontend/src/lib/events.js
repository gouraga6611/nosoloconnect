// ============================================================================
// events.js — Tiny in-app pub/sub used by lib/* writers to notify hooks.
// Keeps components in sync without prop-drilling or a heavy context.
// ============================================================================

const bus = new EventTarget();

export const EVENTS = {
  LOCATIONS_CHANGED: "locations:changed",
  TICKETS_CHANGED: "tickets:changed",
};

export const emit = (name, detail) =>
  bus.dispatchEvent(new CustomEvent(name, { detail }));

/** Subscribe. Returns an unsubscribe fn. */
export const on = (name, handler) => {
  const wrapped = (e) => handler(e.detail);
  bus.addEventListener(name, wrapped);
  return () => bus.removeEventListener(name, wrapped);
};
