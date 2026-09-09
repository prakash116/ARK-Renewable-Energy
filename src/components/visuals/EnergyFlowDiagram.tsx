/**
 * Solar array → inverter → battery / grid / load.
 * Two hand-laid layouts (horizontal for md+, vertical for mobile) sharing
 * the same node glyphs. Dashes animate along the conductors.
 */

type Glyph = "array" | "inverter" | "battery" | "grid" | "load";

function GlyphIcon({ type, x, y, s = 1 }: { type: Glyph; x: number; y: number; s?: number }) {
  const stroke = "currentColor";
  const g = `translate(${x} ${y}) scale(${s})`;
  switch (type) {
    case "array":
      return (
        <g transform={g} stroke={stroke} strokeWidth="1.6" fill="none">
          <rect x="-16" y="-11" width="32" height="22" rx="2" />
          <path d="M-5.3 -11v22M5.3 -11v22M-16 0h32" />
        </g>
      );
    case "inverter":
      return (
        <g transform={g} stroke={stroke} strokeWidth="1.6" fill="none">
          <rect x="-15" y="-13" width="30" height="26" rx="4" />
          <path d="M-9 4h5v-8h8v8h5" />
        </g>
      );
    case "battery":
      return (
        <g transform={g} stroke={stroke} strokeWidth="1.6" fill="none">
          <rect x="-14" y="-8" width="25" height="16" rx="2" />
          <path d="M12 -3v6" />
          <rect x="-11" y="-5" width="12" height="10" fill="currentColor" stroke="none" />
        </g>
      );
    case "grid":
      return (
        <g transform={g} stroke={stroke} strokeWidth="1.6" fill="none" strokeLinecap="round">
          <path d="M-8 14L-3 -14h6l5 28M-12 -4h24M-10 3h20M-7 9h14" />
        </g>
      );
    case "load":
      return (
        <g transform={g} stroke={stroke} strokeWidth="1.6" fill="none" strokeLinejoin="round">
          <path d="M-14 0l14 -12l14 12" />
          <path d="M-10 -3v15h20v-15" />
          <rect x="-3" y="4" width="6" height="8" />
        </g>
      );
  }
}

function Node({
  x,
  y,
  w,
  h,
  type,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  type: Glyph;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g className={accent ? "text-lime" : "text-fg"}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="16"
        className={accent ? "fill-primary stroke-lime/50" : "fill-card stroke-line-strong"}
        strokeWidth="1"
      />
      <GlyphIcon type={type} x={x + 34} y={y + h / 2} />
      <text
        x={x + 62}
        y={y + h / 2 - (sub ? 5 : -5)}
        className={accent ? "fill-white" : "fill-fg"}
        fontSize="14"
        fontWeight="600"
        fontFamily="var(--font-display)"
      >
        {label}
      </text>
      {sub && (
        <text x={x + 62} y={y + h / 2 + 13} className={accent ? "fill-white/70" : "fill-fg-muted"} fontSize="11.5">
          {sub}
        </text>
      )}
    </g>
  );
}

function Wire({ d, label, lx, ly }: { d: string; label?: string; lx?: number; ly?: number }) {
  return (
    <g>
      <path d={d} fill="none" className="stroke-line-strong" strokeWidth="2" />
      <path
        d={d}
        fill="none"
        stroke="#8fbf1c"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 16"
        className="animate-energy-dash theme-dark:stroke-lime"
      />
      {label && lx !== undefined && ly !== undefined && (
        <g>
          <rect x={lx - 16} y={ly - 10} width="32" height="20" rx="10" className="fill-card stroke-line" strokeWidth="1" />
          <text x={lx} y={ly + 4} textAnchor="middle" fontSize="10.5" fontWeight="700" className="fill-fg-muted">
            {label}
          </text>
        </g>
      )}
    </g>
  );
}

export function EnergyFlowDiagram({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* Horizontal (md+) */}
      <svg viewBox="0 0 960 400" className="hidden w-full md:block" role="img" aria-labelledby="flow-h-title">
        <title id="flow-h-title">
          Energy flow: solar array to inverter, then to battery storage, grid export and building loads.
        </title>
        <Wire d="M240 200 H360" label="DC" lx={300} ly={200} />
        <Wire d="M600 200 C 660 200, 660 70, 720 70" label="AC" lx={666} ly={110} />
        <Wire d="M600 200 H720" />
        <Wire d="M600 200 C 660 200, 660 330, 720 330" />
        <Node x={40} y={160} w={200} h={80} type="array" label="Solar array" sub="PV modules · DC" />
        <Node x={360} y={160} w={240} h={80} type="inverter" label="Inverter / controller" sub="MPPT · protection · monitoring" accent />
        <Node x={720} y={30} w={200} h={80} type="battery" label="Battery storage" sub="Hybrid systems" />
        <Node x={720} y={160} w={200} h={80} type="grid" label="Grid export" sub="Net metering" />
        <Node x={720} y={290} w={200} h={80} type="load" label="Loads" sub="Home · pump · plant" />
      </svg>

      {/* Vertical (mobile) */}
      <svg viewBox="0 0 360 620" className="w-full md:hidden" role="img" aria-labelledby="flow-v-title">
        <title id="flow-v-title">
          Energy flow: solar array to inverter, then to battery storage, grid export and building loads.
        </title>
        <Wire d="M180 100 V160" label="DC" lx={180} ly={130} />
        <Wire d="M180 240 V300 C 180 330, 60 300, 60 350" />
        <Wire d="M180 240 V350" label="AC" lx={215} ly={300} />
        <Wire d="M180 240 V300 C 180 330, 300 300, 300 350" />
        <Node x={70} y={20} w={220} h={80} type="array" label="Solar array" sub="PV modules · DC" />
        <Node x={50} y={160} w={260} h={80} type="inverter" label="Inverter / controller" sub="MPPT · protection" accent />
        <g transform="translate(0 0)">
          <Node x={10} y={350} w={100} h={100} type="battery" label="" />
          <Node x={130} y={350} w={100} h={100} type="grid" label="" />
          <Node x={250} y={350} w={100} h={100} type="load" label="" />
        </g>
        <text x={60} y={480} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-fg">
          Battery
        </text>
        <text x={180} y={480} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-fg">
          Grid
        </text>
        <text x={300} y={480} textAnchor="middle" fontSize="12" fontWeight="600" className="fill-fg">
          Loads
        </text>
        <text x={180} y={540} textAnchor="middle" fontSize="11.5" className="fill-fg-muted">
          Solar serves loads first; surplus is stored or exported.
        </text>
      </svg>
    </div>
  );
}
