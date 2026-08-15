import { ImageResponse } from "next/og";
import { getInviteByToken } from "@/lib/followup/store";

/**
 * Link preview for the personalized follow-up link. This is the first thing
 * the prospect sees when the rep sends the link over WhatsApp, so it carries
 * the brand and the "Tavnit × Company" pairing instead of the generic site
 * card. The client's name is deliberately left out: previews can be seen by
 * anyone the message is forwarded to.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tavnit — tu demo personalizado";

export default async function OgImage(props: { params: Promise<{ token: string }> }) {
  const { token } = await props.params;
  const invite = await getInviteByToken(token).catch(() => null);
  const company = invite?.company ?? null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0a0a1a",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(59,130,246,0.25), transparent 50%), radial-gradient(circle at 100% 100%, rgba(108,66,240,0.25), transparent 50%)",
          color: "#e2e8f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6, #6c42f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            T
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#f1f5f9" }}>
            Tavnit
            {company ? (
              <span style={{ color: "#64748b", margin: "0 18px" }}>×</span>
            ) : null}
            {company ? <span style={{ color: "#93c5fd" }}>{company}</span> : null}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 800, color: "#f8fafc", lineHeight: 1.1 }}>
            Preparemos tu demo personalizado
          </div>
          <div style={{ fontSize: 32, color: "#94a3b8" }}>
            3 a 5 preguntas · menos de un minuto
          </div>
        </div>

        <div
          style={{
            height: 10,
            borderRadius: 5,
            background: "linear-gradient(90deg, #3b82f6, #6c42f0)",
          }}
        />
      </div>
    ),
    size,
  );
}
