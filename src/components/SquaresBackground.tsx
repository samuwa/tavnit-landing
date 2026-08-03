"use client";

import dynamic from "next/dynamic";

/**
 * Client-only wrapper for the animated canvas background.
 *
 * Extracted so src/app/page.tsx can be a server component (dynamic() with
 * ssr:false is client-only), which in turn lets the homepage emit its own
 * page-level JSON-LD instead of inheriting the root layout's.
 */
const Squares = dynamic(() => import("@/components/Squares"), { ssr: false });

export default function SquaresBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0a0a1a]" aria-hidden="true">
      <Squares
        direction="diagonal"
        speed={0.17}
        borderColor="#1E2740"
        squareSize={45}
        hoverFillColor="#222"
      />
    </div>
  );
}
