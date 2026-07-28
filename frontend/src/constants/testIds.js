// ============================================================================
// testIds.js — Every interactive/critical element receives a stable data-testid
// from this map. Never inline a raw string in JSX; import TID.<key> instead.
// ============================================================================

export const TID = {
  // --- Nav ---
  navHome: "nav-home-link",
  navFeatures: "nav-features-link",
  navSafety: "nav-safety-link",
  navAbout: "nav-about-link",
  navCoverage: "nav-coverage-link",
  navRatings: "nav-ratings-link",
  navContact: "nav-contact-link",
  navCta: "nav-cta-button",

  // --- App store badges ---
  playStoreBadge: "playstore-badge",
  appStoreBadge: "appstore-badge",

  // --- Hero ---
  heroPrimaryCta: "hero-primary-cta",
  heroSecondaryCta: "hero-secondary-cta",
  heroStatPlaces: "hero-stat-places",
  heroStatCountries: "hero-stat-countries",
  heroStatRating: "hero-stat-rating",

  // --- Coverage search (landing) ---
  coverageInput: "coverage-search-input",
  coverageResult: "coverage-search-result",
  coverageMatchItem: (id) => `coverage-match-${id}`,

  // --- Ratings (landing) ---
  ratingsSection: "ratings-section",
  ratingsSignInBtn: "ratings-signin-btn",
  ratingsSignOutBtn: "ratings-signout-btn",
  ratingsDemoName: "ratings-demo-name",
  ratingsDemoEmail: "ratings-demo-email",
  ratingsDemoSubmit: "ratings-demo-submit",
  ratingsSubmitBtn: "ratings-submit-btn",
  ratingsComment: "ratings-comment-input",
  ratingsStar: (dim, star) => `ratings-star-${dim}-${star}`,
  ratingsAverage: "ratings-average-value",
  ratingsCount: "ratings-total-count",

  // --- Contact form ---
  contactSection: "contact-section",
  formName: "form-name-input",
  formEmail: "form-email-input",
  formPhone: "form-phone-input",
  formType: "form-type-select",
  formPriority: "form-priority-select",
  formSubject: "form-subject-input",
  formMessage: "form-message-textarea",
  formSubmit: "form-submit-button",

  // --- Admin gate ---
  adminGate: "admin-gate-dialog",
  adminPassword: "admin-password-input",
  adminGateSubmit: "admin-gate-submit",
  adminGateError: "admin-gate-error",

  // --- Admin shell ---
  adminLogout: "admin-logout-button",
  adminTabTickets: "admin-tab-tickets",
  adminTabLocations: "admin-tab-locations",
  adminTabRatings: "admin-tab-ratings",

  // --- Admin: Tickets tab ---
  adminSearch: "admin-search-input",
  adminFilterStatus: "admin-filter-status",
  adminFilterType: "admin-filter-type",
  adminTable: "admin-tickets-table",
  adminRow: (id) => `admin-ticket-row-${id}`,
  adminView: (id) => `admin-view-${id}`,
  adminClose: (id) => `admin-close-${id}`,
  adminReopen: (id) => `admin-reopen-${id}`,
  adminDelete: (id) => `admin-delete-${id}`,
  adminEmpty: "admin-empty-state",
  adminDetailsDialog: "admin-details-dialog",
  adminDeleteConfirm: "admin-delete-confirm",
  adminDeleteCancel: "admin-delete-cancel",

  // --- Admin: Locations tab ---
  locAddBtn: "loc-add-btn",
  locFormPlace: "loc-form-place",
  locFormState: "loc-form-state",
  locFormCountry: "loc-form-country",
  locFormSubmit: "loc-form-submit",
  locTable: "loc-table",
  locRow: (id) => `loc-row-${id}`,
  locDelete: (id) => `loc-delete-${id}`,
  locDeleteConfirm: "loc-delete-confirm",
  locDeleteCancel: "loc-delete-cancel",
  locEmpty: "loc-empty-state",
  locStatPlaces: "loc-stat-places",
  locStatCountries: "loc-stat-countries",
};
