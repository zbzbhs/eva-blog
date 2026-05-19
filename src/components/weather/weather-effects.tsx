"use client";

import { useEffect, useRef } from "react";
import { useWeather } from "./weather-provider";
import { useDeviceCapabilities } from "@/lib/device";
import { getWeatherParticleConfig } from "@/lib/weather";

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  wobble: number;
}

export function WeatherEffects() {
  const { weather } = useWeather();
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (!weather || prefersReducedMotion) return;

    const config = getWeatherParticleConfig(weather.evaCode);
    if (config.count === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const actualCount = isMobile ? Math.floor(config.count / 4) : config.count;

    // Init particles
    particlesRef.current = Array.from({ length: actualCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: config.speed * (0.5 + Math.random()),
      size: 1 + Math.random() * (weather.evaCode === "第二次冲击之冬" ? 3 : 2),
      opacity: 0.3 + Math.random() * 0.5,
      wobble: Math.random() * Math.PI * 2,
    }));

    // Glitch flash for 使徒来袭
    let lastFlash = 0;

    const animate = (now: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;

      for (const p of particles) {
        p.y += p.speed;
        p.wobble += 0.02;

        // Wind effect for AT力场崩坏
        const windDrift =
          weather.evaCode === "AT力场崩坏"
            ? Math.cos(p.wobble) * config.speed * 0.5
            : weather.evaCode === "LCL污染"
            ? Math.sin(p.wobble * 0.5) * 0.5
            : 0;

        p.x += windDrift;

        // Wrap around
        if (p.y > canvas.height + 10) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.x < -10) p.x = canvas.width + 10;

        ctx.beginPath();

        if (weather.evaCode === "第二次冲击之冬") {
          // Snow: circles
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
          ctx.fill();
        } else {
          // Rain / particles: vertical lines
          const lineHeight = p.speed * 3;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + windDrift * 2, p.y - lineHeight);
          ctx.strokeStyle = `rgba(${config.color === "#FF0000" ? "255,0,0" : "102,0,153"}, ${p.opacity})`;
          ctx.lineWidth = p.size;
          ctx.stroke();
        }
      }

      // 使徒来袭: random flash
      if (weather.evaCode === "使徒来袭" && now - lastFlash > 3000 + Math.random() * 5000) {
        lastFlash = now;
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setTimeout(() => {
          // Flash clears on next frame
        }, 100);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [weather, isMobile, prefersReducedMotion]);

  if (!weather || prefersReducedMotion) return null;

  const config = getWeatherParticleConfig(weather.evaCode);
  if (config.count === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
