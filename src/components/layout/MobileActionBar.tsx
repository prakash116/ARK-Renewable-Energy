import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import { getPhoneHref, getWhatsAppHref } from "@/config/site";

/** Sticky bottom conversion bar: Call · WhatsApp · Get Quote (mobile only). */
export function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/92 pb-safe backdrop-blur-md md:hidden"
      role="region"
      aria-label="Quick actions"
    >
      <div className="grid h-16 grid-cols-3 gap-2 px-3 py-2.5">
        <a
          href={getPhoneHref()}
          className="flex items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-semibold text-fg active:bg-card-2"
        >
          <Phone aria-hidden className="size-4" />
          Call
        </a>
        <a
          href={getWhatsAppHref()}
          className="flex items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-semibold text-fg active:bg-card-2"
        >
          <MessageCircle aria-hidden className="size-4" />
          WhatsApp
        </a>
        <Link
          href="/contact?intent=quote"
          className="flex items-center justify-center rounded-full bg-primary text-sm font-semibold text-white active:bg-primary-strong"
        >
          Get Quote
        </Link>
      </div>
    </div>
  );
}
