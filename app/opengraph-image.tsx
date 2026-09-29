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
          background: "#f6f2ea",
          color: "#11352d",
          borderLeft: "24px solid #11352d",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 8, textTransform: "uppercase", color: "#775819" }}>
          {site.pillarsLine}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 1 }}>
          <span>Opening pathways.</span>
          <span style={{ fontStyle: "italic", color: "#245e4c" }}>Building leaders.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: 6, textTransform: "uppercase" }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
