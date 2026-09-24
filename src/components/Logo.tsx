import Image from "next/image";

/**
 * Brand lockup that works in both color themes.
 *
 * The site logo PNG has a white wordmark, so it disappears on the light
 * theme. This crops the gradient mark out of that same PNG (the left ~30% of
 * a 1287×444 image) and sets "Tavnit" next to it in the heading face, in the
 * theme's foreground color. The Lite pages have used this construction since
 * they launched; the header, footer and docs now share it.
 *
 * `height` is the mark's height in px; the wordmark scales with it.
 */
export default function Logo({
  height = 36,
  className = "",
  wordmarkClassName = "",
  alt = "Tavnit",
  priority = false,
}: {
  height?: number;
  className?: string;
  wordmarkClassName?: string;
  alt?: string;
  priority?: boolean;
}) {
  const width = Math.round(height * (390 / 444));
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: Math.round(height * 0.2) }} role="img" aria-label={alt}>
      <span className="relative block shrink-0 overflow-hidden" style={{ width, height }} aria-hidden>
        <Image
          src="/assets/tavnit_logo.png"
          alt=""
          width={1287}
          height={444}
          className="absolute left-0 top-0 max-w-none"
          style={{ height, width: "auto" }}
          priority={priority}
        />
      </span>
      <span
        className={`font-heading font-bold leading-none tracking-tight text-fg ${wordmarkClassName}`}
        style={{ fontSize: Math.round(height * 0.7) }}
        aria-hidden
      >
        Tavnit
      </span>
    </span>
  );
}
