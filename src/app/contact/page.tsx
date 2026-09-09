import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getFullAddress, getPhoneHref, getWhatsAppHref, isPhoneConfigured, isWhatsAppConfigured, siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/seo";
import { InnerHero } from "@/components/hero/InnerHero";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactPanel } from "@/components/forms/ContactPanel";

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Contact ARK Renewable Energy for sales, project consultation, dealer partnerships and service support. Gurugram, Haryana.",
  path: "/contact",
});

const options = [
  { title: "Sales", text: "Quotations and proposals for new systems." },
  { title: "Project consultation", text: "Sizing, feasibility and site assessment." },
  { title: "Dealer / Partner", text: "Join the dealer network or partner on EPC." },
  { title: "Service support", text: "Help with an installed ARK system." },
  { title: "General enquiry", text: "Media, careers, investors and everything else." },
];

function Channel({
  id,
  icon: IconEl,
  label,
  children,
}: {
  id?: string;
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li id={id} className="flex gap-4 scroll-mt-28">
      <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <IconEl aria-hidden className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold">{label}</p>
        <div className="mt-0.5 text-[15px] text-fg-muted">{children}</div>
      </div>
    </li>
  );
}

export default function ContactPage() {
  const phoneReady = isPhoneConfigured();
  const waReady = isWhatsAppConfigured();
  return (
    <>
      <InnerHero
        eyebrow="Contact"
        title="Let’s Talk About Your Energy Project."
        description="Tell us what you need. An engineer, not a call centre, will respond with next steps."
        crumbs={[{ name: "Contact", path: "/contact" }]}
        size="compact"
      >
        <ul className="hidden gap-2 sm:grid sm:grid-cols-2 lg:grid-cols-5">
          {options.map((o, i) => (
            <li key={o.title} className="rounded-xl border border-line bg-white/[0.03] px-4 py-3">
              <p className="text-sm font-semibold">
                <span className="mr-2 font-mono text-xs text-fg-soft">0{i + 1}</span>
                {o.title}
              </p>
              <p className="mt-0.5 text-xs text-fg-muted">{o.text}</p>
            </li>
          ))}
        </ul>
      </InnerHero>

      <Section ariaLabelledby="contact-form-title">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="order-1 lg:order-2 lg:col-span-7">
              <h2 id="contact-form-title" className="text-h3 mb-5">
                Send an enquiry
              </h2>
              <Suspense fallback={<div className="h-[32rem] animate-pulse rounded-[var(--radius-media)] bg-card-2" />}>
                <ContactPanel />
              </Suspense>
            </div>

            <div className="order-2 lg:order-1 lg:col-span-5">
              <Reveal>
                <h2 className="text-h3">Reach us directly</h2>
                <ul className="mt-6 space-y-6">
                  <Channel id="call" icon={Phone} label="Call">
                    <a href={getPhoneHref()} className="hover:text-fg">
                      {siteConfig.contact.phone}
                    </a>
                    {!phoneReady && (
                      <p className="mt-1 text-xs text-fg-soft">
                        Phone number pending. Use the form or email and we will call you back.
                      </p>
                    )}
                  </Channel>
                  <Channel id="whatsapp" icon={MessageCircle} label="WhatsApp">
                    <a href={getWhatsAppHref("Hello ARK, I would like to discuss a solar project.")} className="hover:text-fg">
                      {waReady ? "Message us on WhatsApp" : siteConfig.contact.whatsapp}
                    </a>
                    {!waReady && <p className="mt-1 text-xs text-fg-soft">WhatsApp number pending.</p>}
                  </Channel>
                  <Channel icon={Mail} label="Email">
                    <ul className="space-y-1">
                      <li>
                        <a href={`mailto:${siteConfig.contact.email}`} className="break-all hover:text-fg">
                          {siteConfig.contact.email}
                        </a>
                        <span className="ml-2 text-xs text-fg-soft">General</span>
                      </li>
                      <li>
                        <a href={`mailto:${siteConfig.contact.sales}`} className="break-all hover:text-fg">
                          {siteConfig.contact.sales}
                        </a>
                        <span className="ml-2 text-xs text-fg-soft">Sales</span>
                      </li>
                      <li>
                        <a href={`mailto:${siteConfig.contact.support}`} className="break-all hover:text-fg">
                          {siteConfig.contact.support}
                        </a>
                        <span className="ml-2 text-xs text-fg-soft">Support</span>
                      </li>
                    </ul>
                  </Channel>
                  <Channel icon={MapPin} label="Address">
                    <address className="not-italic">
                      {siteConfig.contact.address.line1},
                      <br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state}{" "}
                      {siteConfig.contact.address.postalCode}, {siteConfig.contact.address.country}
                    </address>
                    <a
                      href={siteConfig.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Open in Maps
                    </a>
                  </Channel>
                  <Channel icon={Clock} label="Hours">
                    {siteConfig.contact.hours}
                  </Channel>
                </ul>
              </Reveal>

              <Reveal delay={0.1} className="mt-8">
                <div className="overflow-hidden rounded-[var(--radius-media)] border border-line bg-card-2">
                  <iframe
                    title={`Map: ${getFullAddress()}`}
                    src={siteConfig.contact.mapEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                    className="h-64 w-full border-0 sm:h-72"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
