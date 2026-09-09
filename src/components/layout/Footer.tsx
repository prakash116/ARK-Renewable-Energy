import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  footerNav,
  getFullAddress,
  getPhoneHref,
  legalNav,
  siteConfig,
} from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-dark relative bg-ink text-fg">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-5 pt-14 pb-24 sm:px-6 sm:pt-20 md:pb-10 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo tone="white" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-fg-muted">
              {siteConfig.supportingLine} Solar water pumping, rooftop solar, power plants and
              street lighting, engineered and delivered end to end.
            </p>
            <div className="mt-8">
              <p className="eyebrow mb-3 text-fg-soft">Newsletter</p>
              <NewsletterForm />
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <p className="eyebrow mb-4 text-fg-soft">{group.heading}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-block py-0.5 text-[15px] text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="eyebrow mb-4 text-fg-soft">Contact</p>
            <ul className="space-y-4 text-[15px]">
              <li className="flex gap-3">
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" />
                <address className="not-italic leading-relaxed text-fg-muted">
                  {siteConfig.contact.address.line1},
                  <br />
                  {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                  {siteConfig.contact.address.postalCode},
                  <br />
                  {siteConfig.contact.address.country}
                </address>
              </li>
              <li className="flex gap-3">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" />
                <a href={getPhoneHref()} className="text-fg-muted transition-colors hover:text-fg">
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-lime" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="break-all text-fg-muted transition-colors hover:text-fg"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex gap-2" aria-label="Social media">
              {siteConfig.social.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <SocialIcon name={s.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-[13px] text-fg-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="#main" className="transition-colors hover:text-fg">
                Back to top
              </a>
            </li>
          </ul>
        </div>
        <p className="sr-only">{getFullAddress()}</p>
      </div>
    </footer>
  );
}
