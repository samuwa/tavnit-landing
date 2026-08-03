import { ImageResponse } from "next/og";

/**
 * Generated OG/social card.
 *
 * Replaces the hardcoded https://tavnit.io/assets/og-image.png reference, which
 * pointed at a file that was never committed — so every social share, and every
 * schema `image`/`screenshot` fetch, was resolving to a 404.
 */

export const alt =
  "Tavnit — AI document pipeline: extract structured data from PDFs, review it, and let AI agents act on it";
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
          justifyContent: "space-between",
          background: "#0a0a1a",
          padding: "72px",
          position: "relative",
        }}
      >
        {/* brand gradient wash, top-right */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -180,
            width: 760,
            height: 760,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(59,130,246,0.34) 0%, rgba(108,66,240,0.16) 45%, rgba(10,10,26,0) 70%)",
            display: "flex",
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6 0%, #6c42f0 100%)",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            Tavnit
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              maxWidth: 940,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Documents to structured data.</span>
            <span style={{ color: "#93c5fd" }}>Then agents act on it.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#94a3b8",
              lineHeight: 1.4,
              maxWidth: 900,
            }}
          >
            AI extraction, cleaning, and human review — with a REST API,
            webhooks, and an MCP connector for claude.ai and Cursor.
          </div>
        </div>

        {/* pipeline footer */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {["Extract", "Review", "Act"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 26,
                  fontWeight: 600,
                  color: "#e2e8f0",
                  padding: "12px 28px",
                  borderRadius: 9999,
                  border: "1px solid rgba(148,163,184,0.28)",
                  background: "rgba(255,255,255,0.04)",
                }}
              >
                {step}
              </div>
              {i < 2 && (
                <div style={{ display: "flex", fontSize: 28, color: "#3b82f6" }}>→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
