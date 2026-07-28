# NoSolo — Feedback & Support Site

## Original Problem Statement
Build a static website for NoSolo (travel companion app) collecting user feedback and support. Use reusable components, keep all constants in one file, no hardcoded strings in component code, keep styles in a single (splittable) file. Host to Firebase, store submissions in Firebase. Visiting `{hostname}/support` must popup for a password (`Nosolo!23`) and reveal a management page where the admin can view, delete, and close feedback/support tickets.

## Architecture (2026-02-28)
- **Static React SPA** (CRA + Tailwind + Shadcn UI + Framer Motion + Sonner + lucide-react).
- Two routes: `/` (marketing landing + inline feedback form) and `/support` (admin console).
- **Persistence layer** (`/app/frontend/src/lib/storage.js`) abstracts Firestore + localStorage:
  - When `FIREBASE_CONFIG` in `/app/frontend/src/constants/config.js` has real values → Firebase Firestore (`tickets` collection).
  - Otherwise → localStorage stub (`nosolo_tickets_stub`) so the app works without keys.
- **Constants** (all user-facing text, options, colors, testIds) centralised under `/app/frontend/src/constants/{strings,config,testIds}.js`.
- **Styles** unified in `/app/frontend/src/styles/theme.css` (imported by `index.css`).

## User Personas
- Solo travelers submitting feedback / bug reports / feature suggestions.
- NoSolo admin/support agent reviewing and triaging submissions.

## Core Requirements (static)
1. Reusable components (`components/site`, `components/forms`, `components/admin`).
2. No hardcoded strings in components — all in `constants/strings.js`.
3. Single styling source (`styles/theme.css`).
4. Firebase-ready storage layer with placeholder config.
5. Password-gated `/support` admin console with view / delete / close-reopen / search / status + type filter.

## What's Been Implemented (2026-02-28)
- Landing page: Navbar, Hero (with brand image), Features (6-card grid), Safety (navy split section), About, inline Feedback & Support form, Footer.
- Reusable `FeedbackSupportForm` with Name, Email, Phone, Type, Priority, Subject, Message + client-side validation + Sonner toast on success.
- `/support` admin page: password gate dialog (Nosolo!23), sessionStorage-persistent unlock, tickets table with Shadcn `Table`, badges for type/priority/status, view details dialog, close/reopen, delete with confirmation `AlertDialog`, search, status filter, type filter, refresh, lock-console button.
- Firebase SDK installed; storage service auto-detects placeholder config and falls back to localStorage.
- 15/15 end-to-end tests passed via testing agent.

## Prioritized Backlog
- **P0**: User plugs real `FIREBASE_CONFIG` values into `/app/frontend/src/constants/config.js`; enable Firestore security rules; run `firebase init hosting` + `firebase deploy`.
- **P1**: Email/Slack notification (via Firebase Function) when new ticket is created; admin reply / notes on each ticket.
- **P2**: CSV export of tickets; multi-admin auth via Firebase Auth (replace shared password); attach screenshots on the feedback form.
