"use client";

export default function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a1a] overflow-hidden">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Primary blob - top right */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] blur-[120px]"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
          top: "-10%",
          right: "-5%",
          animation: "meshFloat1 25s ease-in-out infinite",
        }}
      />

      {/* Secondary blob - bottom left */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]"
        style={{
          background: "radial-gradient(circle, #6c42f0 0%, transparent 70%)",
          bottom: "10%",
          left: "-8%",
          animation: "meshFloat2 30s ease-in-out infinite",
        }}
      />

      {/* Accent blob - center */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[80px]"
        style={{
          background: "radial-gradient(circle, #5E6AD2 0%, transparent 70%)",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "meshFloat3 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
