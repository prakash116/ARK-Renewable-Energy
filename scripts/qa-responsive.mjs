/**
 * Responsive + interaction QA sweep.
 *
 * Usage: node scripts/qa-responsive.mjs [baseUrl] [outDir]
 *   - Loads every route at each target width
 *   - Fails on horizontal overflow, page errors and console errors
 *   - Exercises the mobile menu, desktop dropdown, project filters, FAQ and the contact form
 *   - Saves full-page screenshots at 360 / 768 / 1440 into outDir
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const BASE = process.argv[2] ?? "http://localhost:3000";
const OUT = process.argv[3] ?? path.resolve("qa-output");

const ROUTES = [
  "/",
  "/about",
  "/team",
  "/contact",
  "/solutions",
  "/solutions/solar-water-pumping",
  "/solutions/solar-rooftop",
  "/solutions/solar-power-plants",
  "/solutions/solar-street-lighting",
  "/projects",
  "/projects/rajasthan-solar-water-pumping",
  "/projects/uttar-pradesh-street-lighting",
  "/resources",
  "/resources/catalogues",
  "/resources/manuals",
  "/resources/faqs",
  "/investors",
  "/careers",
  "/careers/solar-design-engineer",
  "/csr",
  "/privacy-policy",
  "/terms-and-conditions",
  "/this-page-does-not-exist",
];

/** Optional subsets: QA_ROUTES="/,/about" QA_WIDTHS="360,1440" node scripts/qa-responsive.mjs */
const ROUTE_LIST = process.env.QA_ROUTES ? process.env.QA_ROUTES.split(",") : ROUTES;
const WIDTHS = process.env.QA_WIDTHS
  ? process.env.QA_WIDTHS.split(",").map(Number)
  : [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920];
const SHOT_WIDTHS = new Set([360, 768, 1440]);

const IGNORED_CONSOLE = [/Download the React DevTools/i, /third-party cookie/i, /google\.com\/maps/i, /ERR_BLOCKED_BY_CLIENT/i];

const failures = [];
const notes = [];

function slug(route) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__");
}

async function measure(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const inner = window.innerWidth;
    const scrollW = Math.max(doc.scrollWidth, document.body.scrollWidth);
    const offenders = [];
    if (scrollW > inner + 1) {
      const all = document.querySelectorAll("body *");
      for (const el of all) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.right > inner + 1 && getComputedStyle(el).position !== "fixed") {
          const id = el.id ? `#${el.id}` : "";
          const cls = typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : "";
          offenders.push(`${el.tagName.toLowerCase()}${id}${cls} (right=${Math.round(r.right)})`);
          if (offenders.length >= 6) break;
        }
      }
    }
    return { inner, scrollW, offenders };
  });
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    // Instant scrolling: the site uses CSS smooth scrolling, which would otherwise
    // swallow rapid programmatic scrolls and leave in-view animations untriggered.
    const step = Math.max(300, window.innerHeight * 0.6);
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo({ top: total, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 900));
    window.scrollTo({ top: 0, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 200));
  });
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"] });

  for (const width of WIDTHS) {
    const mobile = width < 768;
    const context = await browser.newContext({
      viewport: { width, height: mobile ? 800 : 900 },
      deviceScaleFactor: 1,
      isMobile: mobile,
      hasTouch: mobile,
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && !IGNORED_CONSOLE.some((re) => re.test(msg.text()))) consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));

    for (const route of ROUTE_LIST) {
      consoleErrors.length = 0;
      const url = `${BASE}${route}`;
      let status = 0;
      try {
        const res = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
        status = res?.status() ?? 0;
      } catch (e) {
        failures.push({ width, route, issue: `navigation failed: ${e.message}` });
        continue;
      }
      const expected404 = route.includes("does-not-exist");
      if (expected404 ? status !== 404 : status !== 200) {
        failures.push({ width, route, issue: `unexpected status ${status}` });
      }
      await scrollThrough(page);
      await page.waitForTimeout(150);
      const m = await measure(page);
      if (m.scrollW > m.inner + 1) {
        failures.push({ width, route, issue: `horizontal overflow ${m.scrollW}px > ${m.inner}px`, offenders: m.offenders });
      }
      const h1s = await page.locator("h1").count();
      if (h1s !== 1) failures.push({ width, route, issue: `expected 1 <h1>, found ${h1s}` });

      const realErrors = expected404
        ? consoleErrors.filter((e) => !/status of 404/.test(e))
        : consoleErrors;
      if (realErrors.length) {
        failures.push({ width, route, issue: "console errors", offenders: realErrors.slice(0, 4) });
      }
      if (SHOT_WIDTHS.has(width)) {
        await page.screenshot({ path: path.join(OUT, `${width}-${slug(route)}.png`), fullPage: true });
        await page.screenshot({ path: path.join(OUT, `${width}-${slug(route)}-top.png`), fullPage: false });
      }
    }

    /* ---------- Interactions (recorded, never fatal) ---------- */
    try {
      await interactions(page, width);
    } catch (e) {
      failures.push({ width, route: "(interactions)", issue: `interaction step threw: ${e.message.split("\n")[0]}` });
    }

    await context.close();
  }

  await browser.close();

  console.log("\n=== NOTES ===");
  for (const n of notes) console.log("•", n);
  console.log("\n=== FAILURES ===");
  if (failures.length === 0) {
    console.log("None. All routes pass at all widths.");
  } else {
    for (const f of failures) {
      console.log(`✗ [${f.width}] ${f.route}: ${f.issue}`);
      if (f.offenders) for (const o of f.offenders) console.log("    -", o);
    }
  }
  console.log(`\nScreenshots: ${OUT}`);
  process.exit(failures.length ? 1 : 0);
}

async function interactions(page, width) {
    if (width === 390) {
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.click("button[aria-controls='mobile-menu']");
      await page.waitForSelector("#mobile-menu", { state: "visible" });
      await page.waitForTimeout(700);
      const m = await measure(page);
      if (m.scrollW > m.inner + 1) failures.push({ width, route: "/ (menu open)", issue: "overflow with menu open", offenders: m.offenders });
      await page.screenshot({ path: path.join(OUT, `390-menu-open.png`) });
      await page.keyboard.press("Escape");
      await page.waitForSelector("#mobile-menu", { state: "detached", timeout: 3000 }).catch(() => failures.push({ width, route: "/", issue: "mobile menu did not close on Escape" }));
      notes.push("390: mobile menu open/close OK");

      // Project filters
      await page.goto(`${BASE}/projects`, { waitUntil: "networkidle" });
      const before = await page.locator("article").count();
      await page.click("button[aria-pressed]:has-text('Rooftop')");
      await page.waitForTimeout(500);
      const after = await page.locator("article").count();
      if (after >= before) failures.push({ width, route: "/projects", issue: `filter did not reduce results (${before} -> ${after})` });
      else notes.push(`390: project filter OK (${before} -> ${after})`);

      // FAQ accordion
      await page.goto(`${BASE}/resources/faqs`, { waitUntil: "networkidle" });
      const secondSummary = page.locator("details summary").nth(1);
      await secondSummary.click();
      const isOpen = await page.locator("details").nth(1).evaluate((d) => d.open);
      if (!isOpen) failures.push({ width, route: "/resources/faqs", issue: "FAQ did not open" });
      else notes.push("390: FAQ accordion OK");
    }

    if (width === 1440) {
      await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
      await page.hover("nav[aria-label='Primary'] button[aria-expanded]");
      await page.waitForTimeout(500);
      const dd = await page.locator("nav[aria-label='Primary'] a:has-text('Solar Water Pumping')").isVisible();
      if (!dd) failures.push({ width, route: "/", issue: "desktop Solutions dropdown not visible on hover" });
      else notes.push("1440: desktop dropdown OK");
      await page.screenshot({ path: path.join(OUT, `1440-dropdown.png`) });

      // WebGL hero canvas present?
      await page.waitForTimeout(2500);
      const canvas = await page.locator("canvas").count();
      notes.push(`1440: hero canvas count = ${canvas}`);
      await page.screenshot({ path: path.join(OUT, `1440-hero-webgl.png`) });

      // Header solid after scroll
      await page.evaluate(() => window.scrollTo(0, 600));
      await page.waitForTimeout(400);
      const headerClass = await page.locator("header").getAttribute("class");
      if (!/backdrop-blur/.test(headerClass ?? "")) failures.push({ width, route: "/", issue: "header did not switch to solid after scroll" });
      else notes.push("1440: header solid on scroll OK");

      // Contact form: validation then success
      await page.goto(`${BASE}/contact?intent=quote&solution=solar-rooftop`, { waitUntil: "networkidle" });
      await page.click("button[type='submit']");
      await page.waitForTimeout(1500);
      const errCount = await page.locator("[role='alert']").count();
      if (errCount === 0) failures.push({ width, route: "/contact", issue: "no validation errors shown for empty submit" });
      else notes.push(`1440: contact validation OK (${errCount} alerts)`);
      await page.screenshot({ path: path.join(OUT, `1440-contact-errors.png`), fullPage: true });

      await page.fill("input[name='fullName']", "QA Tester");
      await page.fill("input[name='phone']", "+91 98765 43210");
      await page.fill("input[name='email']", "qa@example.com");
      await page.fill("input[name='city']", "Gurugram");
      await page.fill("textarea[name='message']", "Testing the enquiry form end to end with a rooftop project.");
      await page.click("button[type='submit']");
      await page.waitForSelector("text=We have your enquiry", { timeout: 15000 }).then(
        () => notes.push("1440: contact form success OK"),
        () => failures.push({ width, route: "/contact", issue: "form did not reach success state" }),
      );
      await page.screenshot({ path: path.join(OUT, `1440-contact-success.png`), fullPage: true });
    }
}

run().catch((e) => {
  console.error(e);
  process.exit(2);
});
