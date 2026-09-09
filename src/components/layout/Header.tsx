"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { mainNav } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { DesktopNavItem } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

const SCROLL_THRESHOLD = 24;

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useScrolled(): boolean {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );
}

/**
 * Sticky header. Transparent (light text) over the dark hero at the top of every
 * page, then switches to a solid warm-white bar after scrolling.
 */
export function Header() {
  const pathname = usePathname();
  const solid = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,box-shadow] duration-300 ease-out-expo",
          solid
            ? "border-b border-line bg-canvas/85 text-fg shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent text-white",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-20 lg:px-8">
          <Logo tone={solid ? "forest" : "white"} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <DesktopNavItem
                  key={item.href}
                  item={item}
                  active={pathname === item.href || pathname.startsWith(`${item.href}/`)}
                  solid={solid}
                />
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/contact"
              className={cn(
                "touch-target inline-flex items-center rounded-full px-4 text-[15px] font-semibold transition-colors",
                solid ? "text-fg hover:bg-card-2" : "text-white/90 hover:bg-white/10",
              )}
            >
              Contact
            </Link>
            <Button href="/contact?intent=quote" variant={solid ? "primary" : "lime"} size="md" icon="arrow">
              Get a Quote
            </Button>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={cn(
              "touch-target -mr-2 inline-flex items-center justify-center rounded-full lg:hidden",
              solid ? "hover:bg-card-2" : "hover:bg-white/10",
            )}
          >
            <Menu aria-hidden className="size-6" />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
