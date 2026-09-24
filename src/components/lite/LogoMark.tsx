import Image from "next/image";

/**
 * The real Tavnit mark, cropped out of the site logo PNG (whose wordmark is
 * white and so unusable on light surfaces). The crop keeps the mark's own
 * gradient; the wordmark next to it is set in the heading face.
 *
 * `size` is the mark's height in px; the crop box follows the logo's
 * proportions (the mark occupies the left ~30% of a 1287×444 image).
 */
export function LogoMark({ size = 20, className = "" }: { size?: number; className?: string }) {
  const height = size;
  const width = Math.round(size * (390 / 444));
  const imgHeight = height;
  return (
    <span className={`relative inline-block overflow-hidden align-middle ${className}`} style={{ width, height }} aria-hidden>
      <Image
        src="/assets/tavnit_logo.png"
        alt=""
        width={1287}
        height={444}
        className="absolute left-0 top-0 max-w-none"
        style={{ height: imgHeight, width: "auto" }}
      />
    </span>
  );
}

/** Mark + wordmark, for dark or light surfaces. */
export function LogoLockup({
  size = 18,
  tone = "light",
  label = "Tavnit",
  className = "",
}: {
  size?: number;
  /** "light" = dark text on a light tile; "dark" = white text on a dark/gradient tile. */
  tone?: "light" | "dark";
  label?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <LogoMark size={size} />
      <span
        className={`font-heading font-bold tracking-tight ${tone === "dark" ? "text-white" : "text-[var(--lite-ink)]"}`}
        style={{ fontSize: Math.round(size * 0.8) }}
      >
        {label}
      </span>
    </span>
  );
}
