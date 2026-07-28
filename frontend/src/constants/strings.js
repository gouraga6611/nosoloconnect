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
  eyebrow: "For the ones who wander",
  title: "Travel Solo.",
  titleAccent: "Never Feel Alone.",
  subtitle:
    "NoSolo connects verified solo travelers to explore the world together — anonymously at first, safely always.",
  primaryCta: "Send us feedback",
  secondaryCta: "Explore how it works",
  stats: [
    { value: "128+", label: "Countries covered" },
    { value: "42k", label: "Verified travelers" },
    { value: "4.9", label: "Community rating" },
  ],
};

export const FEATURES = {
  eyebrow: "What makes us different",
  heading: "A safer way to share the road",
  intro:
    "Anonymous trip posting, verified profiles and a companionship system built around trust.",
  items: [
    {
      key: "anonymous",
      title: "Anonymous Posting",
      description:
        "Post trips without revealing your identity. Reveal only when you accept a request.",
    },
    {
      key: "kyc",
      title: "KYC Verified Profiles",
      description:
        "Government ID and selfie checks keep the community authentic and accountable.",
    },
    {
      key: "matching",
      title: "Compatibility Matching",
      description:
        "Filter by travel style, budget, dates and interests to find your best-fit companion.",
    },
    {
      key: "chat",
      title: "In-App Chat",
      description:
        "One-to-one and group chat unlocks after both sides accept the trip request.",
    },
    {
      key: "sos",
      title: "Emergency SOS",
      description:
        "Share live location with trusted contacts and reach help in a single tap.",
    },
    {
      key: "reviews",
      title: "Trust Ratings",
      description:
        "Post-trip reviews on safety, friendliness and reliability build a lasting reputation.",
    },
  ],
};

export const SAFETY = {
  eyebrow: "Safety first",
  heading: "Built for travelers who want the freedom of going alone — never the risk.",
  bullets: [
    "Government ID + selfie verification for every host",
    "AI moderation on chats and listings, 24/7",
    "Admin oversight on every anonymous trip",
    "Report, block and community-review controls",
  ],
  imageAlt: "Solo traveler at sunset",
};

export const ABOUT = {
  eyebrow: "Our mission",
  heading: "To be the most trusted global platform for solo travelers.",
  paragraph:
    "We started NoSolo because the best trips shouldn't be the ones you miss for lack of a companion. Whether you are a backpacker, a digital nomad or a first-time solo traveler, NoSolo helps you find people who move at your pace, respect your privacy and share your curiosity.",
  audience: [
    "Backpackers",
    "Digital Nomads",
    "Students",
    "Working Professionals",
    "Female Solo Travelers",
    "Weekend Explorers",
  ],
};

export const CONTACT = {
  eyebrow: "We're listening",
  heading: "Feedback & Support",
  intro:
    "Report a bug, request a feature, or ask us anything. Every message reaches a real human on the team.",
  form: {
    nameLabel: "Full name",
    namePh: "Ada Kaur",
    emailLabel: "Email",
    emailPh: "you@example.com",
    phoneLabel: "Phone (optional)",
    phonePh: "+1 415 555 0123",
    typeLabel: "Category",
    priorityLabel: "Priority",
    subjectLabel: "Subject",
    subjectPh: "Short summary of your message",
    messageLabel: "Message",
    messagePh: "Tell us what happened, or what you would love to see next…",
    submit: "Submit message",
    submitting: "Sending…",
    successTitle: "Thanks — message received",
    successDesc: "We usually reply within one working day.",
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
  madeWith: "Made for solo travelers, everywhere.",
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
