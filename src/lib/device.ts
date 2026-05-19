// src/lib/device.ts
"use client";

import { useState, useEffect } from "react";

export interface DeviceInfo {
  isMobile: boolean;
  supportsWebGL: boolean;
  prefersReducedMotion: boolean;
  isTouch: boolean;
}

export function useDeviceCapabilities(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>({
    isMobile: false,
    supportsWebGL: true,
    prefersReducedMotion: false,
    isTouch: false,
  });

  useEffect(() => {
    const isMobile =
      /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent) ||
      window.innerWidth < 768;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let supportsWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      supportsWebGL = !!(
        canvas.getContext("webgl") || canvas.getContext("webgl2")
      );
    } catch {
      supportsWebGL = false;
    }

    setInfo({ isMobile, supportsWebGL, prefersReducedMotion, isTouch });
  }, []);

  return info;
}
