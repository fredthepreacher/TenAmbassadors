import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Text-only share card (no photography, so no people are altered or cropped). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #07211b 0%, #103f35 100%)",
          color: "#f5f1e8",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#d6b574" }}>
          {site.pillarsLine}
        </div>
        <div style={{ display: "flex", fontSize: 92, lineHeight: 1.02, maxWidth: 900 }}>
          Developing the next generation of leaders.
        </div>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, textTransform: "uppercase" }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
