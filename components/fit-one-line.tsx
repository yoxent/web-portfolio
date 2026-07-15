"use client";

import { useLayoutEffect, useRef } from "react";

type FitOneLineProps = {
  children: string;
  className?: string;
  /** Largest font size to try (px). */
  maxPx?: number;
  /** Smallest font size allowed (px). */
  minPx?: number;
};

/**
 * Scales font-size down so `children` stays on a single line within its parent width.
 */
export function FitOneLine({
  children,
  className,
  maxPx = 30,
  minPx = 14,
}: FitOneLineProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;

    const fit = () => {
      el.style.whiteSpace = "nowrap";
      let size = maxPx;
      el.style.fontSize = `${size}px`;

      // Binary search keeps layout thrashing low while hitting exact max fit.
      let lo = minPx;
      let hi = maxPx;
      for (let i = 0; i < 16; i++) {
        const mid = (lo + hi) / 2;
        el.style.fontSize = `${mid}px`;
        if (el.scrollWidth <= parent.clientWidth) {
          lo = mid;
        } else {
          hi = mid;
        }
      }
      size = Math.max(minPx, Math.floor(lo * 10) / 10);
      el.style.fontSize = `${size}px`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [children, maxPx, minPx]);

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
