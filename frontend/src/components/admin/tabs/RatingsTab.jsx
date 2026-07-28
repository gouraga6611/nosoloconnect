// ============================================================================
// RatingsTab.jsx — Read-only summary of community ratings (aggregate,
// per-dimension averages, latest 10 entries). Uses the useRatingsSummary hook.
// ============================================================================

import { Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RATINGS_ADMIN } from "@/constants/strings";
import { RATING_DIMENSIONS } from "@/constants/config";
import { useRatingsSummary } from "@/hooks/useRatingsSummary";
import StarRating from "@/components/site/StarRating";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

export const RatingsTab = () => {
  const { averageOverall, count, dimensionAvgs, latest } = useRatingsSummary();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-navy">
          {RATINGS_ADMIN.title}
        </h2>
        <p className="text-sm text-navy-soft mt-1 max-w-2xl">
          {RATINGS_ADMIN.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="nosolo-card p-6">
          <p className="text-xs uppercase tracking-widest text-navy-soft">
            {RATINGS_ADMIN.overallTitle}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="font-display text-4xl font-extrabold text-navy">
              {count === 0 ? "—" : averageOverall.toFixed(1)}
            </p>
            <span className="text-navy-soft">/ 5</span>
          </div>
        </div>
        <div className="nosolo-card p-6">
          <p className="text-xs uppercase tracking-widest text-navy-soft">
            {RATINGS_ADMIN.totalTitle}
          </p>
          <p className="font-display text-4xl font-extrabold text-navy mt-2">
            {count}
          </p>
        </div>
        <div className="nosolo-card p-6">
          <p className="text-xs uppercase tracking-widest text-navy-soft mb-3">
            {RATINGS_ADMIN.breakdownTitle}
          </p>
          <ul className="space-y-2">
            {RATING_DIMENSIONS.map((d) => (
              <li
                key={d.key}
                className="flex items-center justify-between gap-2 text-sm"
              >
                <span className="text-navy">{d.label}</span>
                <div className="flex items-center gap-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-navy-soft w-8 text-right">
                    {(dimensionAvgs?.[d.key] || 0).toFixed(1)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 className="font-display text-lg font-bold text-navy mb-3">
        {RATINGS_ADMIN.latestTitle}
      </h3>

      {latest.length === 0 ? (
        <div className="nosolo-card p-12 text-center">
          <h4 className="font-display text-lg font-bold text-navy">
            {RATINGS_ADMIN.emptyTitle}
          </h4>
          <p className="text-navy-soft mt-1">{RATINGS_ADMIN.emptySubtitle}</p>
        </div>
      ) : (
        <div className="nosolo-card overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>{RATINGS_ADMIN.columns.when}</TableHead>
                <TableHead>{RATINGS_ADMIN.columns.user}</TableHead>
                <TableHead>{RATINGS_ADMIN.columns.overall}</TableHead>
                <TableHead>{RATINGS_ADMIN.columns.comment}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {latest.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="text-navy-soft text-sm whitespace-nowrap">
                    {formatDate(r.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="text-navy font-medium">{r.name}</div>
                    <div className="text-xs text-navy-soft">{r.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <StarRating
                        value={Math.round(r.overall || 0)}
                        readOnly
                        size="w-4 h-4"
                        dimension={`row-${r.id}`}
                      />
                      <span className="text-sm text-navy-soft">
                        {(r.overall || 0).toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[260px] truncate text-navy">
                    {r.comment || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RatingsTab;
