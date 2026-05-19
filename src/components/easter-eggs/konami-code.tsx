"use client";

import { useEffect, useState, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export function useKonamiCode() {
  const [berserk, setBerserk] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.code].slice(-KONAMI_SEQUENCE.length);
        if (
          next.length === KONAMI_SEQUENCE.length &&
          next.every((k, i) => k === KONAMI_SEQUENCE[i])
        ) {
          setBerserk(true);
          return [];
        }
        return next;
      });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // ESC to exit berserk
  useEffect(() => {
    if (!berserk) return;
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Escape") setBerserk(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [berserk]);

  const exitBerserk = useCallback(() => setBerserk(false), []);

  return { berserk, exitBerserk };
}

interface BerserkOverlayProps {
  active: boolean;
}

export function BerserkOverlay({ active }: BerserkOverlayProps) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10001 }}>
      {/* Red tint */}
      <div className="absolute inset-0 bg-eva-red/10 animate-pulse" />
      {/* Screen shake */}
      <div
        className="absolute inset-0"
        style={{
          animation: "shake 0.1s infinite",
        }}
      />
      {/* Warning text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-mono">
        <div
          className="text-eva-red text-2xl md:text-4xl font-bold animate-pulse"
          style={{ textShadow: "0 0 20px #FF0000" }}
        >
          ⚠ 暴走模式 ⚠
        </div>
        <div className="text-eva-purple text-sm mt-2">
          初号機 失控临界 · 同步率 400%
        </div>
        <div className="text-text-muted text-xs mt-4">按 ESC 退出暴走模式</div>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 1px); }
          50% { transform: translate(2px, -1px); }
          75% { transform: translate(-1px, -2px); }
        }
      `}</style>
    </div>
  );
}
