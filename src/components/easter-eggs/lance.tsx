"use client";

import { useEffect, useRef } from "react";

interface Props {
  trigger: number;
}

export function LanceAnimation({ trigger }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 0 || !ref.current) return;
    const el = ref.current;

    el.style.transition = "none";
    el.style.transform = "translate(120vw, -20vh) rotate(-45deg)";
    el.style.opacity = "0";

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s";
        el.style.transform = "translate(-20vw, 110vh) rotate(-45deg)";
        el.style.opacity = "0.8";
      });
    });
  }, [trigger]);

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none"
      style={{ zIndex: 10002, top: 0, left: 0 }}
    >
      {/* Stylized lance — CSS drawn */}
      <div className="relative w-64 h-4">
        <div className="absolute inset-y-0 left-0 right-0"
          style={{
            background: "linear-gradient(90deg, #FF0000, #660099, #FF0000)",
            clipPath: "polygon(0 30%, 100% 0, 100% 100%, 0 70%)",
          }}
        />
        {/* Double helix fork */}
        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-12">
          <div className="w-full h-[2px] bg-eva-red absolute top-1" style={{ transform: "rotate(-30deg)" }} />
          <div className="w-full h-[2px] bg-eva-red absolute bottom-1" style={{ transform: "rotate(30deg)" }} />
        </div>
      </div>
    </div>
  );
}
