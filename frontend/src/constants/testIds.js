export const TID = {
  // Nav
  navHome: "nav-home-link",
  navFeatures: "nav-features-link",
  navSafety: "nav-safety-link",
  navAbout: "nav-about-link",
  navContact: "nav-contact-link",
  navCta: "nav-cta-button",

  // Hero
  heroPrimaryCta: "hero-primary-cta",
  heroSecondaryCta: "hero-secondary-cta",

  // Contact form
  contactSection: "contact-section",
  formName: "form-name-input",
  formEmail: "form-email-input",
  formPhone: "form-phone-input",
  formType: "form-type-select",
  formPriority: "form-priority-select",
  formSubject: "form-subject-input",
  formMessage: "form-message-textarea",
  formSubmit: "form-submit-button",

  // Admin gate
  adminGate: "admin-gate-dialog",
  adminPassword: "admin-password-input",
  adminGateSubmit: "admin-gate-submit",
  adminGateError: "admin-gate-error",

  // Admin console
  adminSearch: "admin-search-input",
  adminFilterStatus: "admin-filter-status",
  adminFilterType: "admin-filter-type",
  adminLogout: "admin-logout-button",
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
};
