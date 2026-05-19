// src/components/terminal/status-bar.tsx
"use client";

import { useState, useEffect } from "react";

interface Props {
  weatherDisplay?: React.ReactNode;
}

export function StatusBar({ weatherDisplay }: Props) {
  const [syncRate, setSyncRate] = useState(99.8);
  const [glitchText, setGlitchText] = useState<string | null>(null);

  // Random sync fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncRate(95 + Math.random() * 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Random SIG_ERR glitch
  useEffect(() => {
    const showGlitch = () => {
      setGlitchText("SIG_ERR: 0x7F");
      setTimeout(() => setGlitchText(null), 1500);
    };
    const interval = setInterval(
      showGlitch,
      8000 + Math.random() * 12000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-eva-black border-t border-eva-purple z-50">
      <div className="flex justify-between items-center px-4 py-1 font-mono text-xs text-text-muted">
        <span className="text-eva-purple">MELCHIOR-1</span>
        <span className="hidden sm:inline text-text-muted">|</span>
        <span className="hidden sm:inline text-eva-purple">BALTHASAR-2</span>
        <span className="hidden sm:inline text-text-muted">|</span>
        <span className="hidden sm:inline text-eva-purple">CASPER-3</span>
        <span className="text-text-muted">|</span>
        {weatherDisplay ?? <span className="text-text-muted">TOKYO-3</span>}
        <span className="text-text-muted">|</span>
        <span>
          SYNC:{" "}
          <span
            className={
              syncRate < 97
                ? "text-eva-red"
                : syncRate < 99
                ? "text-eva-purple"
                : "text-text-secondary"
            }
          >
            {syncRate.toFixed(1)}%
          </span>
        </span>
        {glitchText && (
          <span className="text-eva-red animate-pulse ml-2">{glitchText}</span>
        )}
      </div>
    </div>
  );
}
