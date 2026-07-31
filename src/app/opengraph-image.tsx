import { ImageResponse } from "next/og";

export const alt = "Niall Tech — Technology Consulting";
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
          background: "linear-gradient(145deg, #0B1320 0%, #0E1A2E 55%, #102A56 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <svg width="56" height="56" viewBox="0 0 100 100">
            <rect x="21" y="15" width="14.5" height="70" rx="7.25" fill="#FFFFFF" />
            <line
              x1="41.5875"
              y1="23.75"
              x2="69.575"
              y2="76.75"
              stroke="#FFFFFF"
              strokeWidth="14.5"
              strokeLinecap="round"
            />
            <rect x="64.5" y="15" width="14.5" height="37" rx="7.25" fill="#146BFF" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>
            <span>NIALL</span>
            <span style={{ color: "#146BFF", fontWeight: 500, marginLeft: 10, letterSpacing: 6 }}>
              TECH
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Technology consulting you can trust.
          </div>
          <div style={{ fontSize: 28, color: "#cbd5e1", maxWidth: 820 }}>
            Microsoft 365 · Azure · Entra ID · Intune · Security · Infrastructure
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
