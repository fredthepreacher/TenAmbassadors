import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Text-only share card in the V2.1 palette (navy, warm white, reward gold).
 * No photography, so no people are altered or cropped. Copy is the approved
 * core message; the entity line makes the card self-explanatory when shared.
 */
export default function OpengraphImage() {
  const [first, second, third] = site.coreMessage;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0E2F6E 0%, #081B33 62%)",
          color: "#F8F6F0",
          borderLeft: "20px solid #C7A34B",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 8, textTransform: "uppercase", color: "#E6CF93" }}>
          {site.pillarsLine}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.05 }}>
          <span>{first}</span>
          <span>{second}</span>
          <span style={{ fontStyle: "italic", color: "#E6CF93" }}>{third}</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", fontSize: 26 }}>
          <span style={{ letterSpacing: 6, textTransform: "uppercase" }}>{site.name}</span>
          <span style={{ color: "rgba(248,246,240,0.72)", fontSize: 24 }}>A leadership & impact organization</span>
        </div>
      </div>
    ),
    size,
  );
}
