// src/components/effects/at-field.tsx
"use client";

import { useEffect, useRef } from "react";

interface Props {
  trigger: number; // increment this to trigger animation
}

export function ATField({ trigger }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (trigger === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;
    const startTime = performance.now();
    const duration = 600;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw concentric hexagons
      for (let ring = 0; ring < 4; ring++) {
        const delay = ring * 0.15;
        const ringProgress = Math.max(
          0,
          Math.min(1, (eased - delay) / 0.85)
        );
        if (ringProgress <= 0) continue;

        const radius = ringProgress * maxRadius;
        const alpha = (1 - ringProgress) * (1 - ring * 0.2);
        const color =
          ring < 2
            ? `rgba(102, 0, 153, ${alpha})`
            : `rgba(255, 0, 0, ${alpha * 0.6})`;

        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i - Math.PI / 6;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [trigger]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10000 }}
    />
  );
}
