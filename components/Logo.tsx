import { site } from "@/lib/content";

/**
 * The wordmark is just the lowercase name, set in the page sans at a light
 * weight with a touch of tracking, the way it sits on the studio signage.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[1.0625rem] tracking-[0.02em] ${className}`}>
      {site.name}
      <span className="sr-only"> {site.fullName}</span>
    </span>
  );
}
