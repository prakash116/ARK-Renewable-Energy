import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** ARK mark: a peaked "A" (ark / roof / panel pitch) with a lime crossbar. */
export function LogoMark({ className, tone = "forest" }: { className?: string; tone?: "forest" | "white" | "ink" }) {
  const bg = tone === "forest" ? "#0F3D2E" : tone === "white" ? "#FFFFFF" : "#0B0F0E";
  const stroke = tone === "white" ? "#0F3D2E" : "#FFFFFF";
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-9", className)}>
      <rect width="40" height="40" rx="11" fill={bg} />
      <path
        d="M9.5 30.5 20 9.5l10.5 21"
        fill="none"
        stroke={stroke}
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14.4 23.4h11.2" stroke="#C9F24B" strokeWidth="3.6" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  className,
  tone = "forest",
  wordmark = true,
  onClick,
}: {
  className?: string;
  tone?: "forest" | "white" | "ink";
  wordmark?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn("inline-flex touch-target items-center gap-3", className)}
    >
      <LogoMark tone={tone} />
      {wordmark ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.15rem] font-extrabold tracking-[-0.02em]">
            {siteConfig.shortName}
          </span>
          <span className="mt-1 text-[0.62rem] font-semibold tracking-[0.16em] uppercase opacity-70">
            Renewable Energy
          </span>
        </span>
      ) : (
        <span className="sr-only">{siteConfig.name}</span>
      )}
      <span className="sr-only"> – Home</span>
    </Link>
  );
}
