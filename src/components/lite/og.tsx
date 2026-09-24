import { ImageResponse } from "next/og";
import type { Locale } from "@/lib/locale";

/**
 * Social card for a free-tool page: the sheet, drawn. Shared by the
 * per-route opengraph-image.tsx files so every tool's card has the same
 * shape and only the words change.
 */

export const LITE_OG_SIZE = { width: 1200, height: 630 };

export function liteOgImage(opts: { title: string; subtitle: string; locale: Locale }) {
  const columns = opts.locale === "es"
    ? ["proveedor", "número", "fecha", "descripción", "cantidad", "total"]
    : ["vendor", "number", "date", "description", "qty", "total"];
  const widths = [190, 150, 110, 300, 100, 120];
  const rows = [
    ["Distribuidora Istmo", "FAC-004417", "2026-09-12", "Arroz grano largo 20 lb", "120", "2,220.00"],
    ["Distribuidora Istmo", "FAC-004417", "2026-09-12", "Aceite vegetal 3.78 L", "48", "1,075.20"],
    ["Distribuidora Istmo", "FAC-004417", "2026-09-12", "Atún en agua 170 g", "300", "345.00"],
    ["Distribuidora Istmo", "FAC-004417", "2026-09-12", "Detergente en polvo 5 kg", "36", "356.40"],
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fbfbf7",
          padding: "64px 72px",
          color: "#1c2321",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 9,
              background: "linear-gradient(135deg, #3b82f6 0%, #6c42f0 100%)",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, display: "flex" }}>Tavnit</div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#6c42f0",
              background: "#efeafd",
              padding: "4px 10px",
              borderRadius: 8,
              display: "flex",
            }}
          >
            Lite
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 58, fontWeight: 700, letterSpacing: -1.5, marginTop: 36, lineHeight: 1.05 }}>
          {opts.title}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#5c6963", marginTop: 14 }}>{opts.subtitle}</div>

        {/* the sheet */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 40,
            background: "#ffffff",
            border: "1px solid #d8dfda",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 24px 48px -28px rgba(28,35,33,0.35)",
          }}
        >
          <div style={{ display: "flex", background: "#eaf1fe", color: "#3b82f6", fontSize: 14, fontWeight: 700 }}>
            <div style={{ width: 44, display: "flex" }} />
            {columns.map((c, i) => (
              <div key={c} style={{ width: widths[i], padding: "8px 12px", display: "flex", justifyContent: "center", borderLeft: "1px solid #d8dfda" }}>
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", background: "#f3f6f4", fontSize: 16, fontWeight: 700 }}>
            <div style={{ width: 44, display: "flex" }} />
            {columns.map((c, i) => (
              <div key={c} style={{ width: widths[i], padding: "10px 12px", display: "flex", borderLeft: "1px solid #d8dfda", borderTop: "1px solid #d8dfda" }}>
                {c}
              </div>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div key={ri} style={{ display: "flex", fontSize: 17 }}>
              <div style={{ width: 44, display: "flex", justifyContent: "center", alignItems: "center", background: "#f6f8f6", color: "#5c6963", fontSize: 13, borderTop: "1px solid #e6ede8" }}>
                {ri + 1}
              </div>
              {r.map((cell, ci) => (
                <div
                  key={ci}
                  style={{
                    width: widths[ci],
                    padding: "10px 12px",
                    display: "flex",
                    justifyContent: ci >= 4 ? "flex-end" : "flex-start",
                    borderLeft: "1px solid #e6ede8",
                    borderTop: "1px solid #e6ede8",
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...LITE_OG_SIZE },
  );
}
