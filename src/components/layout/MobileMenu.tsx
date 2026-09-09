"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, m, type Variants } from "motion/react";
import { ArrowUpRight, MessageCircle, Phone, X } from "lucide-react";
import { getPhoneHref, getWhatsAppHref, mobileNav, siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { pad2 } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.32, ease: EASE } },
  exit: { opacity: 0, transition: { duration: 0.24, ease: EASE, delay: 0.08 } },
};

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.12 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.18 } },
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + escape key + initial focus.
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 60);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="theme-dark fixed inset-0 z-[60] flex h-dvh flex-col bg-ink text-fg lg:hidden"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-dark mask-fade-b opacity-60"
          />
          <div className="relative flex h-16 shrink-0 items-center justify-between px-5 sm:px-6">
            <Logo tone="white" onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="touch-target -mr-2 inline-flex items-center justify-center rounded-full hover:bg-white/10"
            >
              <X aria-hidden className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav
            aria-label="Mobile"
            className="relative flex-1 overflow-y-auto overscroll-contain px-5 pt-4 sm:px-6"
          >
            <m.ul variants={list} className="divide-y divide-line">
              {mobileNav.map((entry, i) => (
                <m.li key={entry.href} variants={item}>
                  <Link
                    href={entry.href}
                    onClick={onClose}
                    className="group flex items-center justify-between py-4 xs:py-5"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="w-6 font-mono text-xs text-fg-soft tabular-nums">
                        {pad2(i)}
                      </span>
                      <span className="font-display text-[1.75rem] font-bold tracking-[-0.02em] xs:text-[2rem]">
                        {entry.label}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 text-fg-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-lime"
                    />
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </nav>

          <m.div
            variants={item}
            className="relative shrink-0 border-t border-line px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6"
          >
            <div className="grid grid-cols-3 gap-2">
              <a
                href={getPhoneHref()}
                onClick={onClose}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-semibold hover:bg-white/5"
              >
                <Phone aria-hidden className="size-4" /> Call
              </a>
              <a
                href={getWhatsAppHref()}
                onClick={onClose}
                className="flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong text-sm font-semibold hover:bg-white/5"
              >
                <MessageCircle aria-hidden className="size-4" /> WhatsApp
              </a>
              <Link
                href="/contact?intent=quote"
                onClick={onClose}
                className="flex h-12 items-center justify-center rounded-full bg-lime text-sm font-semibold text-ink hover:bg-[#d7f86a]"
              >
                Get Quote
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-fg-soft">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-fg">
                {siteConfig.contact.email}
              </a>
              <span aria-hidden> · </span>
              {siteConfig.contact.address.city}, {siteConfig.contact.address.state}
            </p>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
