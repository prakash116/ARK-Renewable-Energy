import Image from "next/image";
import type { TeamMember } from "@/types/content";
import { cn } from "@/lib/utils";
import { PlaceholderBadge } from "./Badge";
import { SocialIcon } from "./SocialIcon";

function initials(text: string) {
  return text
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Leadership profile. Renders a monogram tile until a photo is supplied. */
export function TeamCard({ member, className }: { member: TeamMember; className?: string }) {
  return (
    <article className={cn("flex flex-col", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-ink-2 xs:aspect-square">
        {member.photo?.src ? (
          <Image
            src={member.photo.src}
            alt={member.photo.alt || member.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 420px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary via-ink-2 to-ink">
            <span aria-hidden className="font-display text-4xl font-bold text-white/85 xs:text-5xl">
              {initials(member.designation)}
            </span>
            <span aria-hidden className="absolute inset-0 bg-grid-dark opacity-40" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-h4">{member.name}</h3>
          {member.isPlaceholder && <PlaceholderBadge />}
        </div>
        <p className="mt-0.5 text-sm font-medium text-primary theme-dark:text-lime">{member.designation}</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{member.bio}</p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-3 inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-muted hover:text-fg"
          >
            <SocialIcon name="linkedin" className="size-4" />
          </a>
        )}
      </div>
    </article>
  );
}
