import { ImageResponse } from "next/og";
import { brandColors } from "@/lib/brand";

export const alt = "Niall Tech — Practical IT expertise for Kitsap County";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: `linear-gradient(145deg, #04070f 0%, ${brandColors.navy} 48%, ${brandColors.blue} 100%)`,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: brandColors.navy,
              border: "1px solid rgba(248,250,252,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 64 64" fill={brandColors.reversed}>
              <rect x="11" y="13" width="10" height="38" rx="2" />
              <path d="M21 13h11l16 26v12H37L21 26V13z" />
              <rect x="42" y="13" width="10" height="38" rx="2" />
              <rect x="36" y="13" width="18" height="10" rx="2" />
            </svg>
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.02em" }}>
            Niall Tech
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.12,
              maxWidth: 920,
              letterSpacing: "-0.03em",
            }}
          >
            Practical IT expertise for Kitsap County organizations
          </div>
          <div style={{ fontSize: 26, color: "#cbd5e1", maxWidth: 820 }}>
            Founder-led Microsoft cloud, cybersecurity, and infrastructure
            consulting · Bremerton, WA
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
