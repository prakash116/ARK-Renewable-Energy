import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} – ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social card, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b0f0e 0%, #0f3d2e 100%)",
          color: "#f2f4f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#0F3D2E" stroke="#C9F24B" strokeWidth="1" />
            <path d="M9.5 30.5 20 9.5l10.5 21" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.4 23.4h11.2" stroke="#C9F24B" strokeWidth="3.6" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{siteConfig.shortName}</div>
            <div style={{ fontSize: 16, letterSpacing: 4, opacity: 0.7 }}>RENEWABLE ENERGY</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Engineering a Cleaner Energy Future.
          </div>
          <div style={{ fontSize: 26, opacity: 0.75, maxWidth: 860, lineHeight: 1.4 }}>
            Solar water pumping · Rooftop solar · Power plants · Street lighting
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 20, opacity: 0.8 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#C9F24B" }} />
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
