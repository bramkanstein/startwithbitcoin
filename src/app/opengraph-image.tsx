import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Start With Bitcoin - Autonomous payment capabilities for AI agents";
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
          padding: "60px",
          fontFamily: "monospace",
        }}
      >
        {/* Top: Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "48px",
            fontWeight: "bold",
          }}
        >
          <span style={{ color: "#FF9900" }}>&lt;</span>
          <span style={{ color: "#09090B" }}>₿</span>
          <span style={{ color: "#FF9900" }}>/&gt;</span>
          <span style={{ color: "#09090B", marginLeft: "12px", fontSize: "36px" }}>
            Start With Bitcoin
          </span>
        </div>

        {/* Middle: Main message */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#09090B",
              lineHeight: 1.2,
            }}
          >
            Autonomous payment
            <br />
            capabilities for{" "}
            <span style={{ color: "#FF9900" }}>AI agents</span>
          </div>

          <div
            style={{
              fontSize: "28px",
              color: "#71717A",
              maxWidth: "800px",
            }}
          >
            Identity, wallet, and payments via Lightning Network and Nostr.
            Everything free and available today.
          </div>
        </div>

        {/* Bottom: Terminal snippet */}
        <div
          style={{
            display: "flex",
            background: "#FAFAFA",
            border: "1px solid #E4E4E7",
            padding: "20px 24px",
            fontSize: "20px",
            color: "#09090B",
            gap: "8px",
          }}
        >
          <span style={{ color: "#FF9900" }}>$</span>
          <span>npm install @getalby/sdk</span>
          <span style={{ color: "#71717A", marginLeft: "24px" }}>
            // Start building now
          </span>
        </div>

        {/* Accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "6px",
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
