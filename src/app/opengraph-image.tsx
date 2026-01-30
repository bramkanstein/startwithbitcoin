import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Start With Bitcoin - Enable AI agents to use Bitcoin";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFFFF",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "72px",
            fontWeight: "bold",
            marginBottom: "40px",
          }}
        >
          <span style={{ color: "#FF9900" }}>&lt;</span>
          <span style={{ color: "#09090B" }}>₿</span>
          <span style={{ color: "#FF9900" }}>/&gt;</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "#09090B",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Start With Bitcoin
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            color: "#71717A",
            textAlign: "center",
            maxWidth: "800px",
          }}
        >
          Enable AI agents to use Bitcoin via Lightning Network and Nostr
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "8px",
            background: "#FF9900",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
