// src/components/effects/scanlines.tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  enabled: boolean;
}

export function Scanlines({ enabled }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    let gapLines = new Set<number>();
    const totalLines = 40;

    const randomizeGaps = () => {
      gapLines = new Set<number>();
      const count = 1 + Math.floor(Math.random() * 3); // 1-3 gaps
      for (let i = 0; i < count; i++) {
        gapLines.add(Math.floor(Math.random() * totalLines));
      }
      if (ref.current) {
        const stops = Array.from({ length: totalLines }, (_, i) => {
          const y = (i / totalLines) * 100;
          const alpha = gapLines.has(i) ? 0 : 0.08;
          return `rgba(0,0,0,${alpha}) ${y}%`;
        }).join(", ");
        ref.current.style.background = `repeating-linear-gradient(0deg, ${stops})`;
      }
    };

    randomizeGaps();
    const interval = setInterval(randomizeGaps, 10000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
    />
  );
}
