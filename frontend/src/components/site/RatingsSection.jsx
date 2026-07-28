// ============================================================================
// RatingsSection.jsx — Landing section that:
//   1. Shows the current community rating (aggregate + per-dimension) so any
//      visitor can see it.
//   2. Prompts users to sign in with Google — either via a real Firebase
//      popup (when configured) or a demo-name/email fallback in stub mode.
//   3. After sign-in, lets the verified user submit ratings across all
//      dimensions defined in constants/config.js RATING_DIMENSIONS.
//   4. Persists ratings via lib/ratings.submitRating (Firestore or stub).
//   5. Structured data on the page picks up the new aggregate automatically.
// ============================================================================

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Chrome, LogOut, ShieldCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RATINGS } from "@/constants/strings";
import { RATING_DIMENSIONS } from "@/constants/config";
import { TID } from "@/constants/testIds";
import { firebaseEnabled } from "@/lib/firebase";
import {
  signInWithGoogle,
  signInDemo,
  signOutUser,
} from "@/lib/auth";
import { submitRating, findUserRating } from "@/lib/ratings";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useRatingsSummary } from "@/hooks/useRatingsSummary";
import StarRating from "@/components/site/StarRating";

const emptyDims = () =>
  RATING_DIMENSIONS.reduce((acc, d) => ({ ...acc, [d.key]: 0 }), {});

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());

// -- Sign-in dialog for stub mode (no real Firebase config) -------------------
const DemoSignInDialog = ({ open, onOpenChange, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return setError(RATINGS.demoNameError);
    if (!isEmail(email)) return setError(RATINGS.demoEmailError);
    setError("");
    await onSubmit({ name: name.trim(), email: email.trim() });
    setName("");
    setEmail("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {RATINGS.demoNoteTitle}
          </DialogTitle>
          <DialogDescription>{RATINGS.demoNoteDesc}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>{RATINGS.demoName}</Label>
            <Input
              data-testid={TID.ratingsDemoName}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 nosolo-input"
            />
          </div>
          <div className="space-y-2">
            <Label>{RATINGS.demoEmail}</Label>
            <Input
              data-testid={TID.ratingsDemoEmail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 nosolo-input"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <Button
            data-testid={TID.ratingsDemoSubmit}
            type="submit"
            className="w-full h-11 rounded-full bg-navy hover:bg-[#001126] text-white"
          >
            {RATINGS.demoSubmit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// -- Aggregate summary card ---------------------------------------------------
const RatingsSummaryCard = () => {
  const { count, averageOverall, dimensionAvgs } = useRatingsSummary();

  return (
    <div className="nosolo-card p-8">
      <div className="flex items-baseline gap-4 mb-2">
        <span
          data-testid={TID.ratingsAverage}
          className="font-display text-6xl font-extrabold text-navy"
        >
          {count === 0 ? "—" : averageOverall.toFixed(1)}
        </span>
        <span className="text-navy-soft">/ 5</span>
      </div>
      <p data-testid={TID.ratingsCount} className="text-sm text-navy-soft mb-6">
        {RATINGS.averageOf(count)}
      </p>

      <div>
        <p className="text-xs uppercase tracking-widest text-navy-soft mb-3">
          {RATINGS.breakdownTitle}
        </p>
        <ul className="space-y-3">
          {RATING_DIMENSIONS.map((d) => {
            const v = dimensionAvgs?.[d.key] || 0;
            return (
              <li key={d.key} className="flex items-center justify-between gap-4">
                <span className="text-navy text-sm">{d.label}</span>
                <div className="flex items-center gap-2">
                  <StarRating value={Math.round(v)} readOnly size="w-4 h-4" dimension={`avg-${d.key}`} />
                  <span className="text-sm text-navy-soft w-8 text-right">
                    {v.toFixed(1)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// -- Rating form (authed users only) ------------------------------------------
const RatingForm = ({ user }) => {
  const [dims, setDims] = useState(emptyDims());
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyRated, setAlreadyRated] = useState(false);

  useEffect(() => {
    let mounted = true;
    findUserRating(user.uid).then((existing) => {
      if (!mounted || !existing) return;
      setAlreadyRated(true);
      setDims(existing.dimensions || emptyDims());
      setComment(existing.comment || "");
    });
    return () => {
      mounted = false;
    };
  }, [user.uid]);

  const canSubmit =
    Object.values(dims).every((v) => v >= 1) && !submitting;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await submitRating({ user, dimensions: dims, comment });
      toast.success(RATINGS.successToastTitle, {
        description: RATINGS.successToastDesc,
      });
      setAlreadyRated(true);
      // No parent callback needed — submitRating() emits EVENTS.RATINGS_CHANGED
      // and every useRatingsSummary consumer refreshes automatically.
    } catch {
      toast.error(RATINGS.errorToastTitle, {
        description: RATINGS.errorToastDesc,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="nosolo-card p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-soft flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-sky-brand" />
          </div>
          <div>
            <p className="text-navy font-semibold">{user.name}</p>
            <p className="text-xs text-navy-soft">{user.email}</p>
          </div>
        </div>
        <Button
          data-testid={TID.ratingsSignOutBtn}
          type="button"
          variant="ghost"
          size="sm"
          onClick={signOutUser}
          className="text-navy-soft hover:text-navy"
        >
          <LogOut className="w-4 h-4 mr-1.5" />
          {RATINGS.signOutBtn}
        </Button>
      </div>

      <p className="text-sm text-navy-soft">{RATINGS.dimensionsCopy}</p>

      <div className="space-y-4">
        {RATING_DIMENSIONS.map((d) => (
          <div
            key={d.key}
            className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 last:border-b-0"
          >
            <div>
              <p className="text-navy font-medium">{d.label}</p>
              <p className="text-xs text-navy-soft">{d.helper}</p>
            </div>
            <StarRating
              dimension={d.key}
              value={dims[d.key]}
              onChange={(v) => setDims((p) => ({ ...p, [d.key]: v }))}
            />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>{RATINGS.commentLabel}</Label>
        <Textarea
          data-testid={TID.ratingsComment}
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={RATINGS.commentPh}
          className="nosolo-input resize-none"
        />
      </div>

      <Button
        data-testid={TID.ratingsSubmitBtn}
        type="submit"
        disabled={!canSubmit}
        className="rounded-full bg-navy hover:bg-[#001126] text-white h-12 px-8"
      >
        {submitting ? RATINGS.submittingBtn : RATINGS.submitBtn}
      </Button>

      {alreadyRated && (
        <p className="text-xs text-emerald-700">{RATINGS.alreadyRated}</p>
      )}
    </form>
  );
};

// -- Root section -------------------------------------------------------------
export const RatingsSection = () => {
  const { user } = useAuthUser();
  const [demoOpen, setDemoOpen] = useState(false);

  const handleGoogleClick = async () => {
    if (firebaseEnabled) {
      try {
        await signInWithGoogle();
      } catch (err) {
        toast.error("Sign-in cancelled or failed");
      }
    } else {
      setDemoOpen(true);
    }
  };

  const handleDemoSubmit = async (payload) => {
    await signInDemo(payload);
    setDemoOpen(false);
    // useAuthUser subscribes to EVENTS.AUTH_CHANGED and will pick this up.
  };

  return (
    <section
      id="ratings"
      data-testid={TID.ratingsSection}
      className="nosolo-section bg-cream"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-10">
          <p className="nosolo-eyebrow mb-4">{RATINGS.eyebrow}</p>
          <h2 className="nosolo-heading text-4xl sm:text-5xl">
            {RATINGS.heading}
          </h2>
          <p className="mt-4 text-lg text-navy-soft">{RATINGS.intro}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <RatingsSummaryCard />
          </div>
          <div className="lg:col-span-7">
            {user ? (
              <RatingForm user={user} />
            ) : (
              <div className="nosolo-card p-10 flex flex-col items-start gap-6">
                <p className="text-lg text-navy-soft">
                  {RATINGS.signInPrompt}
                </p>
                <Button
                  data-testid={TID.ratingsSignInBtn}
                  onClick={handleGoogleClick}
                  className="rounded-full bg-navy hover:bg-[#001126] text-white h-12 px-6"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  {RATINGS.signInBtn}
                </Button>
                <p className="text-xs text-navy-soft">
                  {RATINGS.needSignIn}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <DemoSignInDialog
        open={demoOpen}
        onOpenChange={setDemoOpen}
        onSubmit={handleDemoSubmit}
      />
    </section>
  );
};

export default RatingsSection;
