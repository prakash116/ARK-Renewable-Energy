import type { ImageRef, VisualVariant } from "@/types/content";

/**
 * Generative, deterministic SVG scenes used wherever photography is not yet
 * available. Pure string rendering (no React) so scenes can be served as
 * static assets by `app/visuals/[file]/route.ts`.
 *
 * Every scene is drawn in an 800x500 box (16:10) with
 * `preserveAspectRatio="xMidYMid slice"` so it crops like a photo.
 *
 * TODO: Replace with real photography by setting `src` on ImageRef entries.
 */

export type Tone = NonNullable<ImageRef["tone"]>;

export const VISUAL_VARIANTS: VisualVariant[] = ["plant", "field", "pumping", "rooftop", "lighting", "grid", "community"];
export const VISUAL_TONES: Tone[] = ["forest", "ink", "lime", "solar"];

export const DEFAULT_TONE: Record<VisualVariant, Tone> = {
  plant: "forest",
  field: "solar",
  pumping: "forest",
  rooftop: "ink",
  lighting: "ink",
  grid: "ink",
  community: "forest",
};

export function resolveTone(variant: VisualVariant, tone?: Tone): Tone {
  return tone ?? DEFAULT_TONE[variant];
}

interface Sky {
  top: string;
  mid: string;
  horizon: string;
  sun: string;
  ground: string;
  groundDeep: string;
}

const SKIES: Record<Tone, Sky> = {
  forest: { top: "#0a1714", mid: "#0f3d2e", horizon: "#2d7358", sun: "#C9F24B", ground: "#0e2a21", groundDeep: "#0b0f0e" },
  ink: { top: "#06080a", mid: "#0f1a17", horizon: "#243d34", sun: "#C9F24B", ground: "#0c1411", groundDeep: "#060808" },
  lime: { top: "#0a1f18", mid: "#1b4a36", horizon: "#6ea24a", sun: "#E7FF7A", ground: "#12301f", groundDeep: "#0b0f0e" },
  solar: { top: "#0f1a1a", mid: "#2a3833", horizon: "#c68a3b", sun: "#F2B441", ground: "#1a2320", groundDeep: "#0b0f0e" },
};

const VP = { x: 400, y: 300 };
const ID = "sv";

/** Compact number formatting for attribute values. */
const n = (v: number) => String(Math.round(v * 100) / 100);

/** Depth 0 (front) → 1 (horizon). Returns panel top y and scale. */
function depth(d: number) {
  return { y: 300 + 150 * (1 - d) ** 2, s: 1 - 0.82 * d };
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

function panel(x: number, y: number, s: number): string {
  const w = 108 * s;
  const h = 52 * s;
  const k = 7 * s;
  const pts = `${n(x + k)},${n(y)} ${n(x + w - k)},${n(y)} ${n(x + w)},${n(y + h)} ${n(x)},${n(y + h)}`;
  const v = (t: number) => `M${n(x + k + t * (w - 2 * k))},${n(y)} L${n(x + t * w)},${n(y + h)}`;
  let out = `<polygon points="${pts}" fill="url(#${ID}-panel)" stroke="rgba(201,242,75,0.28)" stroke-width="${n(0.8 * s)}"/>`;
  out += `<path d="${v(1 / 3)} ${v(2 / 3)} M${n(x + k / 2)},${n(y + h / 2)} L${n(x + w - k / 2)},${n(y + h / 2)}" stroke="rgba(255,255,255,0.11)" stroke-width="${n(Math.max(0.5, 0.7 * s))}" fill="none"/>`;
  out += `<line x1="${n(x + k)}" y1="${n(y + 0.6)}" x2="${n(x + w - k)}" y2="${n(y + 0.6)}" stroke="#C9F24B" stroke-opacity="0.5" stroke-width="${n(1.2 * s)}"/>`;
  if (s > 0.42) {
    out += `<path d="M${n(x + w * 0.25)},${n(y + h)} v${n(11 * s)} M${n(x + w * 0.75)},${n(y + h)} v${n(11 * s)}" stroke="rgba(255,255,255,0.22)" stroke-width="${n(1.4 * s)}"/>`;
  }
  return `<g>${out}</g>`;
}

interface RowSpec {
  d: number;
  count: number;
  /** Horizontal shift of the row centre (in front-row units). */
  offset?: number;
}

function panelRows(rows: RowSpec[]): string {
  let out = "";
  for (const row of rows) {
    const { y, s } = depth(row.d);
    const w = 108 * s;
    const gap = 22 * s;
    const total = row.count * w + (row.count - 1) * gap;
    const start = VP.x - total / 2 + (row.offset ?? 0) * s;
    for (let i = 0; i < row.count; i++) out += panel(start + i * (w + gap), y, s);
  }
  return out;
}

function groundGrid(opacity = 0.06): string {
  const verticals: string[] = [];
  for (let x = -600; x <= 1400; x += 100) verticals.push(`M${x},520 L${VP.x},${VP.y}`);
  const horizontals = [0, 0.15, 0.3, 0.45, 0.58, 0.7, 0.8, 0.88, 0.94].map((d) => {
    const p = depth(d);
    return `M-10,${n(p.y + 52 * p.s)} H810`;
  });
  return `<g stroke="#ffffff" stroke-opacity="${opacity}" stroke-width="1" fill="none"><path d="${verticals.join(" ")}"/><path d="${horizontals.join(" ")}"/></g>`;
}

function sun(x: number, y: number, r: number, glow = 1): string {
  return `<circle cx="${x}" cy="${y}" r="${n(r * 4.6 * glow)}" fill="url(#${ID}-glow)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${ID}-sun)"/>`;
}

function tower(x: number, d: number): string {
  const { y, s } = depth(d);
  const base = y + 52 * s;
  const h = 210 * s;
  const w = 26 * s;
  const arm = 34 * s;
  const sw = n(Math.max(0.6, 1.1 * s));
  return (
    `<g stroke="rgba(255,255,255,0.35)" stroke-width="${sw}" fill="none">` +
    `<path d="M${n(x - w)},${n(base)} L${n(x - w * 0.35)},${n(base - h)} M${n(x + w)},${n(base)} L${n(x + w * 0.35)},${n(base - h)}"/>` +
    `<path d="M${n(x - w * 0.9)},${n(base - h * 0.25)} L${n(x + w * 0.9)},${n(base - h * 0.25)} M${n(x - w * 0.75)},${n(base - h * 0.5)} L${n(x + w * 0.75)},${n(base - h * 0.5)} M${n(x - w * 0.6)},${n(base - h * 0.75)} L${n(x + w * 0.6)},${n(base - h * 0.75)}"/>` +
    `<path d="M${n(x - arm)},${n(base - h * 0.62)} H${n(x + arm)} M${n(x - arm * 0.8)},${n(base - h * 0.8)} H${n(x + arm * 0.8)} M${n(x - w * 0.35)},${n(base - h)} H${n(x + w * 0.35)}"/>` +
    `<path d="M${n(x - w * 0.9)},${n(base - h * 0.25)} L${n(x + w * 0.75)},${n(base - h * 0.5)} M${n(x + w * 0.9)},${n(base - h * 0.25)} L${n(x - w * 0.75)},${n(base - h * 0.5)}" stroke-opacity="0.6"/>` +
    `</g>`
  );
}

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */

function plantScene(): string {
  return (
    sun(560, 214, 26) +
    groundGrid() +
    tower(690, 0.86) +
    tower(740, 0.7) +
    `<path d="M700,241 Q715,262 741,232" stroke="rgba(255,255,255,0.25)" stroke-width="0.8" fill="none"/>` +
    panelRows([
      { d: 0.92, count: 15 },
      { d: 0.82, count: 13 },
      { d: 0.68, count: 10 },
      { d: 0.48, count: 8 },
      { d: 0.24, count: 6 },
      { d: 0, count: 6 },
    ])
  );
}

function fieldScene(): string {
  const furrows = [-380, -300, -220, -140, 640, 720, 800, 880, 960, 1040]
    .map((x) => `M${x},520 Q${n((x + VP.x) / 2 + (x < 400 ? 30 : -30))},420 ${VP.x},${VP.y}`)
    .join(" ");
  return (
    sun(190, 226, 30) +
    groundGrid(0.035) +
    `<path d="${furrows}" stroke="rgba(201,242,75,0.18)" stroke-width="1.2" fill="none"/>` +
    `<g fill="#0b0f0e" opacity="0.9"><rect x="608" y="266" width="64" height="36"/><polygon points="600,268 640,244 680,268"/><rect x="676" y="252" width="8" height="50"/></g>` +
    `<rect x="622" y="280" width="10" height="9" fill="#F2B441" opacity="0.7"/>` +
    panelRows([
      { d: 0.82, count: 7, offset: -80 },
      { d: 0.6, count: 6, offset: -60 },
      { d: 0.32, count: 5, offset: -40 },
      { d: 0.02, count: 4, offset: -20 },
    ])
  );
}

function pumpingScene(): string {
  return (
    sun(640, 200, 28) +
    groundGrid(0.045) +
    // pond
    `<ellipse cx="600" cy="452" rx="150" ry="26" fill="url(#${ID}-water)"/>` +
    `<g stroke="rgba(201,242,75,0.35)" stroke-width="1" fill="none"><ellipse cx="600" cy="452" rx="110" ry="17"/><ellipse cx="600" cy="452" rx="70" ry="10"/><ellipse cx="600" cy="452" rx="34" ry="5"/></g>` +
    // pump house + pipe
    `<rect x="470" y="366" width="52" height="46" rx="4" fill="#141a18" stroke="rgba(255,255,255,0.25)"/>` +
    `<rect x="481" y="378" width="30" height="8" rx="2" fill="#C9F24B" opacity="0.8"/>` +
    `<circle cx="486" cy="399" r="3" fill="#C9F24B"/><circle cx="498" cy="399" r="3" fill="rgba(255,255,255,0.4)"/>` +
    `<path d="M522,384 H590 V430" stroke="rgba(255,255,255,0.55)" stroke-width="4" fill="none" stroke-linejoin="round"/>` +
    `<path d="M522,384 H590 V430" stroke="url(#${ID}-flow)" stroke-width="2" fill="none" stroke-dasharray="8 10" stroke-linejoin="round"/>` +
    `<circle cx="590" cy="440" r="3" fill="#C9F24B" opacity="0.9"/><circle cx="590" cy="446" r="2" fill="#C9F24B" opacity="0.5"/>` +
    // tank
    `<rect x="690" y="300" width="60" height="56" fill="#141a18" stroke="rgba(255,255,255,0.28)"/>` +
    `<ellipse cx="720" cy="300" rx="30" ry="8" fill="#1d2522" stroke="rgba(255,255,255,0.35)"/>` +
    `<ellipse cx="720" cy="356" rx="30" ry="8" fill="#101513" stroke="rgba(255,255,255,0.2)"/>` +
    `<path d="M690,356 V420 M750,356 V420" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>` +
    panelRows([
      { d: 0.72, count: 5, offset: -170 },
      { d: 0.42, count: 4, offset: -150 },
      { d: 0.06, count: 3, offset: -130 },
    ])
  );
}

function rooftopScene(): string {
  let windows = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 8; c++) {
      const lit = (r * 3 + c) % 5 === 0;
      windows += `<rect x="${228 + c * 46}" y="${330 + r * 40}" width="26" height="18" rx="1" fill="${lit ? "#C9F24B" : "#ffffff"}" opacity="${lit ? 0.35 : 0.07}"/>`;
    }
  }
  return (
    sun(660, 150, 26) +
    groundGrid(0.03) +
    // skyline
    `<rect x="40" y="322" width="150" height="200" fill="#0d1311"/><rect x="612" y="352" width="160" height="180" fill="#0d1311"/>` +
    `<rect x="56" y="340" width="6" height="6" fill="#ffffff" opacity="0.15"/><rect x="640" y="372" width="6" height="6" fill="#C9F24B" opacity="0.35"/>` +
    // main building
    `<rect x="200" y="258" width="400" height="270" fill="url(#${ID}-bld)"/>` +
    `<rect x="196" y="252" width="408" height="8" fill="#1d2522"/>` +
    `<line x1="200" y1="300" x2="600" y2="300" stroke="rgba(255,255,255,0.08)"/>` +
    windows +
    panelRows([
      { d: 0.97, count: 7 },
      { d: 0.9, count: 6 },
    ]) +
    `<rect x="214" y="238" width="18" height="12" fill="#1d2522" stroke="rgba(255,255,255,0.2)"/><rect x="566" y="238" width="18" height="12" fill="#1d2522" stroke="rgba(255,255,255,0.2)"/>`
  );
}

function lightingScene(): string {
  let stars = "";
  for (let i = 0; i < 28; i++) {
    const x = (i * 137.5) % 800;
    const y = 20 + ((i * 89.3) % 190);
    const r = 0.6 + ((i * 7) % 3) * 0.4;
    stars += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="#ffffff" opacity="${n(0.35 + ((i * 13) % 5) * 0.1)}"/>`;
  }
  const depths = [0, 0.3, 0.52, 0.68, 0.79, 0.87];
  const poles: string[] = [];
  for (const d of depths) {
    const { y, s } = depth(d);
    const yBase = y + 52 * s;
    const inset = (yBase - 300) * 0.5;
    const xl = 400 - inset - 34 * s;
    const xr = 400 + inset + 34 * s;
    const h = 150 * s;
    const arm = 26 * s;
    const cone = 60 * s;
    const pole = (x: number, dir: 1 | -1) =>
      `<g>` +
      `<polygon points="${n(x + dir * arm)},${n(yBase - h)} ${n(x + dir * (arm - cone))},${n(yBase)} ${n(x + dir * (arm + cone * 0.8))},${n(yBase)}" fill="url(#${ID}-cone)"/>` +
      `<line x1="${n(x)}" y1="${n(yBase)}" x2="${n(x)}" y2="${n(yBase - h)}" stroke="rgba(255,255,255,0.45)" stroke-width="${n(2.2 * s)}"/>` +
      `<line x1="${n(x)}" y1="${n(yBase - h)}" x2="${n(x + dir * arm)}" y2="${n(yBase - h)}" stroke="rgba(255,255,255,0.45)" stroke-width="${n(2 * s)}"/>` +
      `<rect x="${n(x + dir * arm - 5 * s)}" y="${n(yBase - h - 3 * s)}" width="${n(10 * s)}" height="${n(6 * s)}" fill="#C9F24B"/>` +
      `<rect x="${n(x + dir * arm - 8 * s)}" y="${n(yBase - h - 12 * s)}" width="${n(16 * s)}" height="${n(8 * s)}" fill="#1d2522" stroke="rgba(255,255,255,0.3)" stroke-width="0.6"/>` +
      `</g>`;
    poles.push(pole(xl, 1) + pole(xr, -1));
  }
  // Far poles first so near poles draw on top.
  poles.reverse();
  return (
    stars +
    sun(400, 292, 14, 0.8) +
    `<polygon points="270,520 530,520 400,300" fill="#0f1513"/>` +
    `<line x1="400" y1="520" x2="400" y2="300" stroke="rgba(242,180,65,0.5)" stroke-width="2" stroke-dasharray="16 16"/>` +
    `<path d="M270,520 L400,300 M530,520 L400,300" stroke="rgba(255,255,255,0.18)" stroke-width="1.2"/>` +
    poles.join("")
  );
}

function gridScene(): string {
  return (
    sun(230, 180, 24) +
    groundGrid(0.05) +
    tower(560, 0.86) +
    tower(600, 0.62) +
    tower(680, 0.22) +
    `<g stroke="rgba(255,255,255,0.3)" stroke-width="0.9" fill="none"><path d="M566,229 Q585,256 604,204"/><path d="M576,236 Q595,262 610,214"/><path d="M600,205 Q640,300 690,150"/><path d="M615,215 Q650,306 700,170"/></g>` +
    panelRows([
      { d: 0.8, count: 8, offset: -120 },
      { d: 0.56, count: 6, offset: -110 },
      { d: 0.3, count: 4, offset: -120 },
    ])
  );
}

function communityScene(): string {
  const houses = [
    { x: 150, y: 420, s: 1 },
    { x: 300, y: 372, s: 0.7 },
    { x: 470, y: 352, s: 0.55 },
    { x: 560, y: 400, s: 0.85 },
    { x: 690, y: 366, s: 0.6 },
  ];
  let out = sun(400, 190, 30) + groundGrid(0.035);
  out += `<path d="M-20,520 Q300,440 420,300" stroke="rgba(255,255,255,0.1)" stroke-width="14" fill="none"/>`;
  for (const h of houses) {
    const w = 120 * h.s;
    const bh = 60 * h.s;
    const rh = 40 * h.s;
    out +=
      `<g>` +
      `<rect x="${h.x}" y="${h.y}" width="${n(w)}" height="${n(bh)}" fill="#141a18" stroke="rgba(255,255,255,0.2)" stroke-width="0.8"/>` +
      `<polygon points="${n(h.x - 6 * h.s)},${h.y} ${n(h.x + w / 2)},${n(h.y - rh)} ${n(h.x + w + 6 * h.s)},${h.y}" fill="#1d2522" stroke="rgba(255,255,255,0.25)" stroke-width="0.8"/>` +
      `<polygon points="${n(h.x + w * 0.1)},${n(h.y - rh * 0.1)} ${n(h.x + w * 0.45)},${n(h.y - rh * 0.78)} ${n(h.x + w * 0.6)},${n(h.y - rh * 0.78)} ${n(h.x + w * 0.3)},${n(h.y - rh * 0.1)}" fill="url(#${ID}-panel)" stroke="rgba(201,242,75,0.5)" stroke-width="0.8"/>` +
      `<rect x="${n(h.x + w * 0.62)}" y="${n(h.y + bh * 0.3)}" width="${n(w * 0.16)}" height="${n(bh * 0.28)}" fill="#F2B441" opacity="0.55"/>` +
      `<rect x="${n(h.x + w * 0.2)}" y="${n(h.y + bh * 0.3)}" width="${n(w * 0.16)}" height="${n(bh * 0.28)}" fill="#ffffff" opacity="0.08"/>` +
      `</g>`;
  }
  out += `<g fill="#0d1a15"><circle cx="90" cy="380" r="26"/><rect x="87" y="395" width="6" height="30"/><circle cx="760" cy="420" r="32"/><rect x="757" y="440" width="6" height="34"/></g>`;
  return out;
}

const SCENES: Record<VisualVariant, () => string> = {
  plant: plantScene,
  field: fieldScene,
  pumping: pumpingScene,
  rooftop: rooftopScene,
  lighting: lightingScene,
  grid: gridScene,
  community: communityScene,
};

/* ------------------------------------------------------------------ */
/* Document                                                            */
/* ------------------------------------------------------------------ */

function defs(t: Sky): string {
  return (
    `<defs>` +
    `<linearGradient id="${ID}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.top}"/><stop offset="0.62" stop-color="${t.mid}"/><stop offset="1" stop-color="${t.horizon}"/></linearGradient>` +
    `<linearGradient id="${ID}-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t.ground}"/><stop offset="1" stop-color="${t.groundDeep}"/></linearGradient>` +
    `<linearGradient id="${ID}-panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f4a4f"/><stop offset="1" stop-color="#0f2b2e"/></linearGradient>` +
    `<linearGradient id="${ID}-bld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151c19"/><stop offset="1" stop-color="#0b0f0e"/></linearGradient>` +
    `<linearGradient id="${ID}-water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f5a5c"/><stop offset="1" stop-color="#0f2e33"/></linearGradient>` +
    `<linearGradient id="${ID}-flow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C9F24B" stop-opacity="0.2"/><stop offset="1" stop-color="#C9F24B"/></linearGradient>` +
    `<linearGradient id="${ID}-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9F24B" stop-opacity="0.28"/><stop offset="1" stop-color="#C9F24B" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="${ID}-sun" cx="0.4" cy="0.4" r="0.7"><stop offset="0" stop-color="#ffffff"/><stop offset="0.35" stop-color="${t.sun}"/><stop offset="1" stop-color="${t.sun}" stop-opacity="0.85"/></radialGradient>` +
    `<radialGradient id="${ID}-glow"><stop offset="0" stop-color="${t.sun}" stop-opacity="0.32"/><stop offset="0.5" stop-color="${t.sun}" stop-opacity="0.08"/><stop offset="1" stop-color="${t.sun}" stop-opacity="0"/></radialGradient>` +
    `</defs>`
  );
}

/** Render a complete standalone SVG document for a scene. */
export function renderSolarScene(variant: VisualVariant, tone?: Tone): string {
  const t = SKIES[resolveTone(variant, tone)];
  return (
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">` +
    defs(t) +
    `<rect width="800" height="500" fill="url(#${ID}-sky)"/>` +
    `<rect y="300" width="800" height="200" fill="url(#${ID}-ground)"/>` +
    `<line x1="0" y1="300" x2="800" y2="300" stroke="${t.horizon}" stroke-opacity="0.6"/>` +
    SCENES[variant]() +
    `</svg>`
  );
}
