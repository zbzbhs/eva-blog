// src/components/terminal/shell.tsx
"use client";

import { ReactNode, useState } from "react";
import { SystemMenu } from "./menu";
import { StatusBar } from "./status-bar";
import { Scanlines } from "../effects/scanlines";
import { Glitch } from "../effects/glitch";
import { ParticleField } from "../effects/particles";
import { CursorTrail } from "../effects/cursor-trail";
import { useDeviceCapabilities } from "@/lib/device";
import { WeatherProvider } from "../weather/weather-provider";
import { WeatherDisplay } from "../weather/weather-display";
import { WeatherEffects } from "../weather/weather-effects";
import { useKonamiCode, BerserkOverlay } from "../easter-eggs/konami-code";
import { LanceAnimation } from "../easter-eggs/lance";
import { useIdleTimer } from "../easter-eggs/idle-trigger";

export function TerminalShell({ children }: { children: ReactNode }) {
  const { isMobile, prefersReducedMotion } = useDeviceCapabilities();
  const crtEnabled = !isMobile && !prefersReducedMotion;

  const { berserk } = useKonamiCode();
  const idleCount = useIdleTimer(5000);
  const [nervLogoClicks, setNervLogoClicks] = useState(0);

  return (
    <WeatherProvider>
      <div className={`min-h-screen bg-eva-black ${crtEnabled ? "crt-overlay" : ""}`}>
        <WeatherEffects />
        <ParticleField />
        <CursorTrail />
        <Scanlines enabled={crtEnabled} />
        <Glitch enabled={crtEnabled} />
        <SystemMenu />
        {/* Main content area — offset for desktop sidebar */}
        <main className="md:ml-56 pt-4 pb-12 px-4 md:px-8 min-h-screen">
          {children}
        </main>
        <StatusBar weatherDisplay={<WeatherDisplay />} />
        {/* Easter eggs */}
        <BerserkOverlay active={berserk} />
        <LanceAnimation trigger={idleCount + (nervLogoClicks >= 3 ? 999 : 0)} />
      </div>
    </WeatherProvider>
  );
}
