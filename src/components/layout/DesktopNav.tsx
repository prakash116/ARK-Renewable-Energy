"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { NavItem } from "@/config/site";
import { cn } from "@/lib/utils";

export function DesktopNavItem({
  item,
  active,
  solid,
}: {
  item: NavItem;
  active: boolean;
  solid: boolean;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const closeTimer = useRef<number | null>(null);
  const rootRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };

  const linkClass = cn(
    "relative inline-flex h-11 items-center gap-1 rounded-full px-3.5 text-[15px] font-medium transition-colors",
    solid ? "text-fg hover:bg-card-2" : "text-white/90 hover:bg-white/10 hover:text-white",
  );

  const indicator = (
    <span
      aria-hidden
      className={cn(
        "absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full transition-opacity duration-300",
        solid ? "bg-primary" : "bg-lime",
        active ? "opacity-100" : "opacity-0",
      )}
    />
  );

  if (!item.children) {
    return (
      <li>
        <Link href={item.href} className={linkClass} aria-current={active ? "page" : undefined}>
          {item.label}
          {indicator}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={linkClass}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        onFocus={cancelClose}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={cn("size-4 transition-transform duration-300", open && "rotate-180")}
        />
        {indicator}
      </button>

      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 pt-3"
            onMouseEnter={cancelClose}
          >
            <div className="w-[26rem] rounded-2xl border border-[#dfe3dc] bg-white p-2 text-ink shadow-[0_24px_60px_-20px_rgba(11,15,14,0.35)]">
              <ul className="grid gap-0.5">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="group/child flex items-start justify-between gap-4 rounded-xl px-3.5 py-3 transition-colors hover:bg-[#eceee8]"
                    >
                      <span>
                        <span className="block text-[15px] font-semibold">{child.label}</span>
                        {child.description && (
                          <span className="mt-0.5 block text-[13px] text-[#5b6561]">
                            {child.description}
                          </span>
                        )}
                      </span>
                      <ArrowRight
                        aria-hidden
                        className="mt-1 size-4 shrink-0 text-[#5b6561] opacity-0 transition-all duration-300 group-hover/child:translate-x-0.5 group-hover/child:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-1 border-t border-[#dfe3dc] p-2 pt-3">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f3d2e] hover:underline"
                >
                  All solutions <ArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}
