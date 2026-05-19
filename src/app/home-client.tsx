// src/app/home-client.tsx
"use client";

import dynamic from "next/dynamic";

const EVA3DScene = dynamic(
  () => import("@/components/three/eva-scene").then((m) => ({ default: m.EVA3DScene })),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center font-mono text-eva-red text-sm">
        &gt; LCL FILLING...
      </div>
    ),
  }
);

export function HomeClient() {
  return <EVA3DScene />;
}
