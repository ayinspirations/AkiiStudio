import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#050607",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#9a9fa6",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Webdesign · SEO · SaaS · KI-Agenten
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 72,
            fontWeight: 600,
            color: "#f4f5f2",
            letterSpacing: -2,
          }}
        >
          Akii<span style={{ color: "#39ffb0" }}>Studio</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
