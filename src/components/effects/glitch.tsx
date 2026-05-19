// src/components/effects/glitch.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  enabled: boolean;
}

interface GlitchBlock {
  id: number;
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
}

export function Glitch({ enabled }: Props) {
  const [blocks, setBlocks] = useState<GlitchBlock[]>([]);

  useEffect(() => {
    if (!enabled) return;

    const spawnGlitch = () => {
      const block: GlitchBlock = {
        id: Date.now(),
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
        width: 40 + Math.random() * 120,
        height: 2 + Math.random() * 8,
        opacity: 0.06 + Math.random() * 0.08,
      };
      setBlocks((prev) => [...prev.slice(-3), block]);
      setTimeout(() => {
        setBlocks((prev) => prev.filter((b) => b.id !== block.id));
      }, 800);
    };

    const interval = setInterval(spawnGlitch, 8000 + Math.random() * 7000);
    return () => clearInterval(interval);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9997 }}>
      {blocks.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            top: b.top,
            left: b.left,
            width: b.width,
            height: b.height,
            background: `rgba(255,0,0,${b.opacity})`,
            transform: "skewX(-5deg)",
            transition: "opacity 0.3s",
          }}
        />
      ))}
    </div>
  );
}
