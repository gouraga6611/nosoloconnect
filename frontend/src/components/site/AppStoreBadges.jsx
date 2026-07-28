import { Apple, Play } from "lucide-react";
import { APP_STORES } from "@/constants/strings";
import { TID } from "@/constants/testIds";

/**
 * Reusable pair of App Store + Google Play "badge" buttons.
 * variant: "light" (dark badges on light bg) | "dark" (light-outlined badges on dark bg)
 */
export const AppStoreBadges = ({ variant = "light", className = "" }) => {
  const dark = variant === "dark";
  const base =
    "inline-flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors";
  const styles = dark
    ? `${base} bg-white text-navy hover:bg-sky-100`
    : `${base} bg-navy text-white hover:bg-[#001126]`;

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a
        data-testid={TID.appStoreBadge}
        href={APP_STORES.appStore.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={APP_STORES.appStore.ariaLabel}
        className={styles}
      >
        <Apple className="w-7 h-7" strokeWidth={1.5} />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-widest opacity-80">
            {APP_STORES.appStore.label}
          </span>
          <span className="font-display font-bold text-lg">
            {APP_STORES.appStore.name}
          </span>
        </span>
      </a>

      <a
        data-testid={TID.playStoreBadge}
        href={APP_STORES.playStore.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={APP_STORES.playStore.ariaLabel}
        className={styles}
      >
        <Play className="w-6 h-6 fill-current" strokeWidth={1.5} />
        <span className="flex flex-col leading-tight text-left">
          <span className="text-[10px] uppercase tracking-widest opacity-80">
            {APP_STORES.playStore.label}
          </span>
          <span className="font-display font-bold text-lg">
            {APP_STORES.playStore.name}
          </span>
        </span>
      </a>
    </div>
  );
};

export default AppStoreBadges;
