// ============================================================================
// strings.js — Every user-facing string in the app lives here.
// Rules:
//   * No hardcoded string in components/pages — always import from here.
//   * Group by section, keep keys in the order they appear on-screen.
//   * Sub-objects (e.g. HERO.stats) are stable snapshots; live counts from
//     Firebase override them at render time via hooks (see hooks/useCoverage).
// ============================================================================

export const BRAND = {
  name: "NoSolo",
  tagline: "Travel Solo. Never Feel Alone.",
  wordmark: "NoSolo",
  copyright: "© 2026 NoSolo. All rights reserved.",
};

// -----------------------------
// App Store / Play Store badges
// -----------------------------
export const APP_STORES = {
  heading: "Coming soon on",
  playStore: {
    label: "GET IT ON",
    name: "Google Play",
    url: "https://play.google.com/store/search?q=nosolo&c=apps",
    ariaLabel: "Download NoSolo on Google Play",
  },
  appStore: {
    label: "Download on the",
    name: "App Store",
    url: "https://apps.apple.com/search?term=nosolo",
    ariaLabel: "Download NoSolo on the App Store",
  },
};

// -----------------------------
// Navigation
// -----------------------------
export const NAV = {
  home: "Home",
  features: "Features",
  safety: "Safety",
  about: "About",
  coverage: "Coverage",
  ratings: "Ratings",
  contact: "Feedback & Support",
  cta: "Share your feedback",
};

// -----------------------------
// Hero (top of landing)
// -----------------------------
export const HERO = {
  eyebrow: "Made in India · For India first",
  title: "Travel Solo.",
  titleAccent: "Never Feel Alone.",
  subtitle:
    "From Manali to Meghalaya, Goa to Gokarna — NoSolo connects verified Indian solo travelers to explore together. Anonymously at first, safely always. Global rollout coming next.",
  primaryCta: "Send us feedback",
  secondaryCta: "Explore how it works",
  // Fallback stat labels — values are pulled live from Firebase (see useCoverage).
  stats: {
    placesLabel: "Places covered",
    countriesLabel: "Countries covered",
    ratingLabel: "Community rating",
    ratingFallback: "—",
    zeroFallback: "0",
  },
};

// -----------------------------
// Features grid
// -----------------------------
export const FEATURES = {
  eyebrow: "What makes us different",
  heading: "A safer way to share the road across India",
  intro:
    "Anonymous trip posting, Aadhaar-backed KYC and a companionship system built around Indian travel realities — long-distance trains, monsoon treks, and the odd solo trip to a place your family has never heard of.",
  items: [
    { key: "anonymous", title: "Anonymous Posting", description: "Post a trip without revealing your identity. Reveal only when you accept a request — perfect for solo women travelers and first-timers." },
    { key: "kyc", title: "Aadhaar / ID Verified", description: "Aadhaar, PAN or passport plus a selfie check. Every companion on the platform is a real, accountable person." },
    { key: "matching", title: "Match Your Style", description: "Filter by destination, budget in ₹, dates, food preference and travel pace to find your best-fit companion." },
    { key: "chat", title: "In-App Chat", description: "One-to-one and group chat unlocks after both sides accept the request. WhatsApp-familiar, moderated for safety." },
    { key: "sos", title: "Emergency SOS", description: "One-tap SOS shares live location with trusted contacts and connects to 112 India emergency helpline." },
    { key: "reviews", title: "Trust Ratings", description: "Post-trip reviews on safety, friendliness and reliability build a lasting reputation on the platform." },
  ],
};

// -----------------------------
// Safety
// -----------------------------
export const SAFETY = {
  eyebrow: "Safety first",
  heading: "Built for Indian solo travelers who want the freedom of going alone — never the risk.",
  bullets: [
    "Aadhaar + selfie verification for every host",
    "AI + human moderation on chats and listings, 24/7 IST",
    "Admin oversight on every anonymous trip",
    "Report, block and community-review controls",
    "One-tap 112 emergency helpline integration",
  ],
  imageAlt: "Solo traveler at sunset",
};

// -----------------------------
// Coverage search (landing) — checks whether NoSolo has a location live yet
// -----------------------------
export const COVERAGE = {
  eyebrow: "Where we go",
  heading: "Is your next destination already on NoSolo?",
  intro:
    "Search a place, state or country. If it's not live yet, we'll note your interest.",
  placeholder: "Try 'Manali', 'Kerala' or 'Nepal'…",
  searchLabel: "Search coverage",
  emptyHint: "Type at least 2 characters to search.",
  availableTitle: (n) => `${n} match${n === 1 ? "" : "es"} found — you're covered`,
  unavailableTitle: "Not on NoSolo yet",
  unavailableCopy:
    "We haven't gone live here. Send us a request in the Feedback form and we'll prioritise your route.",
  matchLine: (l) => `${l.place}${l.state ? ", " + l.state : ""}, ${l.country}`,
};

// -----------------------------
// Ratings section (landing) — sign in with Google → submit multi-dimension rating
// -----------------------------
export const RATINGS = {
  eyebrow: "Community verified",
  heading: "Rate your NoSolo experience",
  intro:
    "Ratings are collected from Google-verified travelers only. They power the community score you see in Google search results.",
  dimensionsCopy: "Rate us across the things that matter",
  signInPrompt: "Sign in with Google to submit your rating",
  signInBtn: "Continue with Google",
  submitBtn: "Submit rating",
  submittingBtn: "Submitting…",
  signOutBtn: "Sign out",
  commentLabel: "Add a short note (optional)",
  commentPh: "Tell us what stood out — the trip, your companion, the app…",
  successToastTitle: "Thanks for rating!",
  successToastDesc: "Your community rating is now live.",
  errorToastTitle: "Could not submit",
  errorToastDesc: "Please try again in a moment.",
  alreadyRated: "You have already rated. Thanks for supporting NoSolo!",
  averageOf: (n) => `Based on ${n} verified rating${n === 1 ? "" : "s"}`,
  breakdownTitle: "Breakdown",
  needSignIn: "Sign in to leave a rating",
  demoNoteTitle: "Demo sign-in",
  demoNoteDesc:
    "Firebase Auth is not configured yet — we'll capture your name + email locally so the flow works end-to-end.",
  demoName: "Name",
  demoEmail: "Email",
  demoSubmit: "Continue",
  demoNameError: "Please enter your name.",
  demoEmailError: "Please enter a valid email.",
};

// -----------------------------
// About
// -----------------------------
export const ABOUT = {
  eyebrow: "Our mission",
  heading: "India first. Then, the world.",
  paragraph:
    "We started NoSolo because the best trips in India — the sunrise at Nandi Hills, a solo Vipassana in Igatpuri, a backpacking loop through Spiti — shouldn't be the ones you miss for lack of a companion. We're launching for Indian travelers first, learning fast, and then taking NoSolo global. Whether you are a Bengaluru techie planning a weekend to Coorg, a Delhi backpacker heading to Ladakh, or a solo woman traveler making her first trip — NoSolo helps you find people who move at your pace, respect your privacy and share your curiosity.",
  audience: [
    "Indian Solo Travelers",
    "Female Solo Travelers",
    "Backpackers",
    "Digital Nomads",
    "College Students",
    "Working Professionals",
    "Weekend Explorers",
    "Trekkers & Bikers",
  ],
};

// -----------------------------
// Contact form (Feedback & Support)
// -----------------------------
export const CONTACT = {
  eyebrow: "We're listening",
  heading: "Feedback & Support",
  intro:
    "Report a bug, request a feature, or ask us anything. Every message reaches a real human on the team.",
  form: {
    nameLabel: "Full name",
    namePh: "Aarav Sharma",
    emailLabel: "Email",
    emailPh: "you@example.com",
    phoneLabel: "Phone (optional)",
    phonePh: "+91 98XXX XXXXX",
    typeLabel: "Category",
    priorityLabel: "Priority",
    subjectLabel: "Subject",
    subjectPh: "Short summary of your message",
    messageLabel: "Message",
    messagePh: "Tell us what happened, or what you would love to see next…",
    submit: "Submit message",
    submitting: "Sending…",
    successTitle: "Thanks — message received",
    successDesc: "We usually reply within one working day (IST).",
    errorTitle: "Could not send",
    errorDesc: "Please try again in a moment.",
    requiredError: "This field is required.",
    emailError: "Please enter a valid email address.",
  },
};

// -----------------------------
// Footer
// -----------------------------
export const FOOTER = {
  columns: [
    { title: "Product", links: ["Features", "Safety", "About", "Coverage"] },
    { title: "Company", links: ["Feedback", "Support", "Press"] },
    { title: "Legal", links: ["Privacy", "Terms", "Community Guidelines"] },
  ],
  madeWith: "Made in India · For Indian solo travelers first, the world next.",
};

// -----------------------------
// Admin console (/support)
// -----------------------------
export const ADMIN = {
  gateTitle: "Restricted area",
  gateSubtitle: "Enter the admin password to view feedback and support tickets.",
  gatePlaceholder: "Password",
  gateSubmit: "Unlock",
  gateWrong: "Incorrect password.",
  pageTitle: "Feedback & Support Console",
  pageSubtitle: "View, close and delete tickets. Manage locations and ratings.",
  tabs: {
    tickets: "Tickets",
    locations: "Locations",
    ratings: "Ratings",
  },
  searchPlaceholder: "Search by name, email, subject…",
  filterStatusAll: "All statuses",
  filterTypeAll: "All types",
  countLabel: (n) => `${n} ticket${n === 1 ? "" : "s"}`,
  emptyTitle: "No tickets yet",
  emptySubtitle: "Submissions from the website will appear here.",
  columns: {
    submitted: "Submitted",
    name: "Name",
    email: "Email",
    type: "Type",
    priority: "Priority",
    subject: "Subject",
    status: "Status",
    actions: "Actions",
  },
  actions: {
    view: "View",
    close: "Close",
    reopen: "Reopen",
    delete: "Delete",
  },
  deleteConfirm: {
    title: "Delete this ticket?",
    description: "This cannot be undone. The ticket will be permanently removed.",
    confirm: "Delete",
    cancel: "Cancel",
  },
  detailsTitle: "Ticket details",
  logout: "Lock console",
  toasts: {
    closed: "Ticket marked as closed",
    reopened: "Ticket reopened",
    deleted: "Ticket deleted",
  },
};

// -----------------------------
// Admin — Locations tab
// -----------------------------
export const LOCATIONS_ADMIN = {
  title: "Manage locations",
  subtitle:
    "Add places NoSolo goes live in. These power the landing coverage search and the 'places / countries covered' counters.",
  addBtn: "Add location",
  form: {
    placeLabel: "Place",
    placePh: "Manali",
    stateLabel: "State / Region",
    statePh: "Himachal Pradesh",
    countryLabel: "Country",
    countryPh: "India",
    submit: "Save location",
    saving: "Saving…",
    required: "This field is required.",
    successToast: "Location added",
    errorToast: "Could not save",
  },
  columns: {
    place: "Place",
    state: "State / Region",
    country: "Country",
    added: "Added",
    actions: "Actions",
  },
  deleteConfirm: {
    title: "Delete this location?",
    description:
      "This will remove it from the coverage search and lower the totals shown on the landing.",
    confirm: "Delete",
    cancel: "Cancel",
  },
  toasts: { deleted: "Location deleted" },
  emptyTitle: "No locations yet",
  emptySubtitle: "Add your first location to start populating the coverage map.",
  countsCard: {
    placesTitle: "Places",
    countriesTitle: "Countries",
  },
};

// -----------------------------
// Admin — Ratings tab (read-only summary)
// -----------------------------
export const RATINGS_ADMIN = {
  title: "Community ratings",
  subtitle:
    "Read-only summary of ratings submitted by Google-verified travelers.",
  overallTitle: "Overall rating",
  totalTitle: "Total ratings",
  breakdownTitle: "Dimension breakdown",
  latestTitle: "Latest 10 ratings",
  columns: {
    when: "When",
    user: "User",
    overall: "Overall",
    comment: "Note",
  },
  emptyTitle: "No ratings yet",
  emptySubtitle: "Ratings from verified users will appear here.",
};
