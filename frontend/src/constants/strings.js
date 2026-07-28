// All user-facing strings live here. No hardcoded strings in components.
export const BRAND = {
  name: "NoSolo",
  tagline: "Travel Solo. Never Feel Alone.",
  wordmark: "NoSolo",
  copyright: "© 2026 NoSolo. All rights reserved.",
};

export const NAV = {
  home: "Home",
  features: "Features",
  safety: "Safety",
  about: "About",
  contact: "Feedback & Support",
  cta: "Share your feedback",
};

export const HERO = {
  eyebrow: "Made in India · For India first",
  title: "Travel Solo.",
  titleAccent: "Never Feel Alone.",
  subtitle:
    "From Manali to Meghalaya, Goa to Gokarna — NoSolo connects verified Indian solo travelers to explore together. Anonymously at first, safely always. Global rollout coming next.",
  primaryCta: "Send us feedback",
  secondaryCta: "Explore how it works",
  stats: [
    { value: "28", label: "Indian states covered" },
    { value: "12k+", label: "Verified travelers" },
    { value: "4.9", label: "Community rating" },
  ],
};

export const FEATURES = {
  eyebrow: "What makes us different",
  heading: "A safer way to share the road across India",
  intro:
    "Anonymous trip posting, Aadhaar-backed KYC and a companionship system built around Indian travel realities — long-distance trains, monsoon treks, and the odd solo trip to a place your family has never heard of.",
  items: [
    {
      key: "anonymous",
      title: "Anonymous Posting",
      description:
        "Post a trip without revealing your identity. Reveal only when you accept a request — perfect for solo women travelers and first-timers.",
    },
    {
      key: "kyc",
      title: "Aadhaar / ID Verified",
      description:
        "Aadhaar, PAN or passport plus a selfie check. Every companion on the platform is a real, accountable person.",
    },
    {
      key: "matching",
      title: "Match Your Style",
      description:
        "Filter by destination, budget in ₹, dates, food preference and travel pace to find your best-fit companion.",
    },
    {
      key: "chat",
      title: "In-App Chat",
      description:
        "One-to-one and group chat unlocks after both sides accept the request. WhatsApp-familiar, moderated for safety.",
    },
    {
      key: "sos",
      title: "Emergency SOS",
      description:
        "One-tap SOS shares live location with trusted contacts and connects to 112 India emergency helpline.",
    },
    {
      key: "reviews",
      title: "Trust Ratings",
      description:
        "Post-trip reviews on safety, friendliness and reliability build a lasting reputation on the platform.",
    },
  ],
};

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

export const FOOTER = {
  columns: [
    {
      title: "Product",
      links: ["Features", "Safety", "About"],
    },
    {
      title: "Company",
      links: ["Feedback", "Support", "Press"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Community Guidelines"],
    },
  ],
  madeWith: "Made in India · For Indian solo travelers first, the world next.",
};

export const ADMIN = {
  gateTitle: "Restricted area",
  gateSubtitle: "Enter the admin password to view feedback and support tickets.",
  gatePlaceholder: "Password",
  gateSubmit: "Unlock",
  gateWrong: "Incorrect password.",
  pageTitle: "Feedback & Support Console",
  pageSubtitle: "View, close and delete tickets submitted through the website.",
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
