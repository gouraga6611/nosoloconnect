// ============================================================================
// StarRating.jsx — Small reusable 1-5 star input used inside RatingsSection.
// ============================================================================

import { Star } from "lucide-react";
import { TID } from "@/constants/testIds";

export const StarRating = ({
  value = 0,
  onChange,
  size = "w-6 h-6",
  dimension = "generic",
  readOnly = false,
}) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = s <= value;
        return (
          <button
            key={s}
            type="button"
            data-testid={TID.ratingsStar(dimension, s)}
            aria-label={`${s} out of 5`}
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(s)}
            className={`${size} transition-transform hover:scale-110 disabled:cursor-default disabled:hover:scale-100`}
          >
            <Star
              className={`${size} ${
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "text-slate-300"
              }`}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
