import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** The lowercase mark, cut into the bone surface. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f3f1ed",
          color: "#26241f",
          fontFamily: "serif",
          fontSize: 44,
          paddingBottom: 6,
        }}
      >
        a
      </div>
    ),
    { ...size },
  );
}
