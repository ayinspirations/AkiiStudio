import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Akii Studio, Webdesign und digitale Produkte";

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
          background: "#f3f1ed",
          backgroundImage:
            "radial-gradient(68% 58% at 22% 4%, rgba(255,252,244,0.95), rgba(255,252,244,0))",
          padding: "72px 80px",
          color: "#26241f",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontFamily: "sans-serif" }}>
          akii
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "serif",
              fontSize: 76,
              letterSpacing: -1.5,
              maxWidth: 900,
            }}
          >
            Digitale Lösungen, die bewegen.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 24,
              fontFamily: "sans-serif",
              color: "#595449",
            }}
          >
            Webdesign und digitale Produkte
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
