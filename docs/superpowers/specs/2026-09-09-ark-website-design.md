# ARK Renewable Energy — Website Design Spec

Date: 2026-09-09
Status: Approved by brief. The client brief is the source of requirements; this document records the design decisions made to implement it.

## 1. Positioning

ARK Renewable Energy is presented as a modern renewable-energy engineering company delivering solar water pumping, rooftop solar, solar power plants (EPC) and solar street lighting. Tone: credible, engineering-led, restrained. No slogan spam.

Primary line: "Powering a Smarter, Sustainable Future."
Supporting line: "Engineering clean energy for a more resilient tomorrow."

## 2. Information architecture

```
/                          Home
/about                     Company story, mission, values, timeline, capabilities
/team                      Leadership grid
/contact                   High-conversion contact page + enquiry form
/solutions                 Editorial listing of the four solution lines
/solutions/[slug]          Data-driven solution template (4 static slugs)
/projects                  Filterable portfolio
/projects/[slug]           Project case study
/resources                 Resource hub
/resources/catalogues      Catalogue downloads
/resources/manuals         Installation manuals
/resources/faqs            FAQ page (FAQ schema)
/investors                 Investor relations
/careers                   Culture + open positions
/careers/[slug]            Job detail (JobPosting schema)
/csr                       CSR & impact
/privacy-policy            Legal
/terms-and-conditions      Legal
sitemap.xml, robots.txt, manifest, opengraph-image
```

Header nav: Solutions (with dropdown on desktop), Projects, About, Resources, Investors, Careers. Right: "Get a Quote" CTA. Mobile: logo + menu button opening a full-screen sheet with staggered links and Call / WhatsApp / Get Quote at the bottom.

## 3. Design tokens

Palette (light surfaces dominate; green is an accent, not a wash):

| Token | Value | Use |
|---|---|---|
| --background | #F6F5F0 | Page ground (warm off-white) |
| --surface | #FFFFFF | Cards on light |
| --surface-muted | #ECEFE9 | Tinted panels |
| --foreground | #0C1110 | Body text |
| --muted-foreground | #5B6561 | Secondary text |
| --border | #DFE3DC | Hairlines |
| --primary | #0F3D2E | Deep forest, primary buttons, headings accent |
| --primary-strong | #0A2C21 | Hover |
| --lime | #C9F24B | Electric accent: indicators, glows, small highlights |
| --solar | #F2B441 | Sparse warm accent |
| --ink | #0B0F0E | Dark section ground |
| --ink-2 | #141A18 | Dark section surface |
| --ink-border | rgba(255,255,255,.10) | Hairlines on dark |
| --ink-muted | #9AA5A0 | Muted text on dark |

Dark sections invert tokens via a `.theme-dark` scope so components stay token-driven.

Typography: Manrope (display, weights 500–800) + Inter (body/UI). Scale is mobile-first: display 2.5rem → 4.5rem+, h2 1.875rem → 3rem, body 1rem → 1.0625rem. Tight tracking on display, `text-balance` on headings, `text-pretty` on paragraphs.

Spacing rhythm: sections `py-16 sm:py-20 lg:py-28`; container `max-w-7xl px-5 sm:px-6 lg:px-8`.

Radii: 12px controls, 20px cards, 28px large media. Shadows minimal; depth via tone, not blur.

## 4. Visual system

No verified photography exists. Rather than fake stock imagery, all imagery is a generative SVG visual system (`lib/solar-scenes.ts`) with variants: pumping, rooftop, plant, lighting, field, grid, community, in four tones. Scenes are rendered to strings (no React) and served as immutable static assets by the prerendered route handler `app/visuals/[file]/route.ts`, then placed with `<img>` via `components/visuals/SolarImage`. Inlining them was measured at ~980 KB of home-page HTML (scenes duplicated into the RSC payload); as assets the page is ~250 KB and each 30 KB scene is cached across pages. Every image slot is an `ImageRef` (`{ src?, alt, visual, tone }`) so real photography drops in without UI changes.

Hero (home): lazy-loaded React Three Fiber scene. An instanced tilted panel field on a subtle grid terrain, a low sun, flowing energy particles, slow camera drift. Gated by: viewport >= 768px, fine pointer, no reduced-motion, no Save-Data, hardwareConcurrency >= 4. Otherwise a static SVG fallback with a light CSS shimmer. WebGL is only used on the home hero.

Technology section: SVG energy-flow diagram (array → inverter → battery / grid / load) with animated dash offsets. Communicates the system, no decoration.

## 5. Component architecture

```
components/
  layout/   Header, DesktopNav, MobileMenu, Footer, MobileActionBar, SkipLink
  ui/       Button, Container, SectionHeading, Badge, Eyebrow, Card, Divider, Icon, LinkArrow
  motion/   MotionProvider (LazyMotion + MotionConfig), Reveal, StaggerGroup, CountUp, ProgressLine
  hero/     Hero (home), InnerHero (all inner pages)
  visuals/  SolarVisual (SVG scenes), MediaFrame (image or visual), EnergyFlowDiagram
  three/    HeroEnergyScene (+ SolarField, EnergyParticles), HeroCanvas gate
  sections/ Stats, Intro, SolutionsGrid, FeaturedSolution, WhyArk, Process, FeaturedProjects,
            Technology, Impact, Testimonials, ResourcesTeaser, FinalCta
  solutions/ SolutionCard, SolutionDetail (+ sub-sections), SolutionList
  projects/ ProjectCard, ProjectGrid (client filter), ProjectDetail
  careers/  JobCard, JobFilters, JobDetail
  forms/    ContactForm, QuoteForm (shared EnquiryForm core), FormField
  seo/      JsonLd
data/      solutions, projects, testimonials, team, jobs, resources, stats, company (timeline, values), investors, csr
config/    site.ts (all contact + brand + social + nav)
lib/       utils (cn), enquiries (mock submit), seo (metadata + schema builders)
```

Server Components by default. Client components: Header, MobileMenu, motion wrappers, carousel, filters, forms, Three canvas.

## 6. Content model

All repeated content lives in typed data modules (see `types/content.ts`). Every unverified item carries `isPlaceholder: true` and a `// TODO:` comment; the UI renders a small "Sample" badge for placeholder items so they cannot be mistaken for claims. Contact details, socials, and brand metadata come only from `config/site.ts`. Phone is the literal `YOUR_PHONE_NUMBER` until supplied; call/WhatsApp links fall back to `/contact` while unset.

## 7. Responsive rules

- Mobile styles are the defaults; `sm/md/lg/xl` only enhance.
- Touch targets >= 44px; sticky bottom action bar (Call / WhatsApp / Get Quote) below `md`.
- No horizontal overflow: every wide element (process rail, tables, carousels) scrolls inside its own container.
- Heroes: stacked (copy → CTA → visual) on mobile, split on `lg`.
- Process: vertical timeline on mobile, horizontal rail on `lg`.
- Testimonials: native scroll-snap carousel with buttons; one card per view on mobile.

## 8. Motion

`MotionConfig reducedMotion="user"` + `LazyMotion domAnimation` (strict) with `m.*` elements. Reveal-on-scroll once, 0.5–0.7s, ease-out expo. Count-up on view. Process rail progress driven by `useScroll`. Mobile menu: sheet + staggered links. Nothing loops permanently except the hero energy shimmer and diagram dashes (CSS, paused under reduced motion).

## 9. Forms

`EnquiryForm` (client) → Server Action `submitEnquiry` validated with zod → `lib/enquiries.ts` mock handler (logs, returns `{ ok, id }`). Honeypot field, inline errors, success state, `aria-live`. Swappable for an API/CRM by replacing one function.

## 10. SEO & a11y

Per-page metadata via a `createMetadata()` helper (title template, canonical, OG, Twitter). JSON-LD: Organization + LocalBusiness (layout), BreadcrumbList (inner pages), FAQPage (FAQs), JobPosting (job detail), Service (solution detail). `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `manifest.ts`. One H1 per page, skip link, focus-visible rings, semantic buttons/links, labelled form fields, WCAG AA contrast.

## 11. Quality gates

`tsc --noEmit`, `eslint`, `next build`, then a Playwright viewport sweep (320 to 1920) checking `scrollWidth <= clientWidth` on every route plus screenshots.
