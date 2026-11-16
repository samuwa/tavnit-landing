"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * A phrase typed in one letter at a time.
 *
 * It replaced a clip-path wipe in steps. That cut by width, not by letter,
 * so in a proportional italic the steps landed in the middle of glyphs and
 * the slanted letters were sliced as they appeared. Here each letter is its
 * own span: all of them are laid out from the start (invisible until typed),
 * so the line has its final width and nothing moves; each fades in over a
 * few frames instead of popping. (A caret was tried and dropped: on an
 * italic it never sat right against the slanted letters.)
 *
 * Decorative (the hero's H1 carries the words), so it is aria-hidden by its
 * parent. With reduced motion the phrase is simply there.
 */
export default function TypedPhrase({
  text,
  delay = 1.6,
  every = 0.065,
  className = "",
}: {
  text: string;
  /** Seconds before the first letter. */
  delay?: number;
  /** Seconds between letters. */
  every?: number;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;
  const letters = [...text];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timers: number[] = [];
    letters.forEach((_, i) => timers.push(window.setTimeout(() => setShown(i + 1), (delay + i * every) * 1000)));
    return () => timers.forEach(clearTimeout);
    // letters is derived from text
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, every, reduced]);

  const count = reduced ? letters.length : shown;

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      {letters.map((ch, i) => (
        <span
          key={i}
          className={`transition-opacity duration-100 ease-out ${i < count ? "opacity-100" : "opacity-0"}`}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
