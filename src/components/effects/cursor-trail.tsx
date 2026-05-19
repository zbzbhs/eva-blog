"use client";

import { useEffect, useRef } from "react";
import { useDeviceCapabilities } from "@/lib/device";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<TrailPoint[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handler = (e: MouseEvent) => {
      pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener("mousemove", handler);

    let running = true;

    const animate = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pointsRef.current = pointsRef.current
        .filter((p) => p.age < 30)
        .map((p) => ({ ...p, age: p.age + 1 }));

      for (const p of pointsRef.current) {
        const alpha = (1 - p.age / 30) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
        ctx.fill();
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      running = false;
      window.removeEventListener("mousemove", handler);
      cancelAnimationFrame(animRef.current);
    };
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9995 }}
    />
  );
}
