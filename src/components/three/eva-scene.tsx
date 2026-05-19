// src/components/three/eva-scene.tsx
"use client";

import { Canvas } from "@react-three/fiber";
import { useDeviceCapabilities } from "@/lib/device";

function FallbackScene() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* SVG NERV Logo placeholder */}
      <svg viewBox="0 0 200 200" className="w-64 h-64 opacity-20">
        <text
          x="100"
          y="80"
          textAnchor="middle"
          fill="#FF0000"
          fontSize="24"
          fontFamily="monospace"
          fontWeight="bold"
        >
          NERV
        </text>
        <polygon
          points="100,95 140,118 140,164 100,187 60,164 60,118"
          fill="none"
          stroke="#660099"
          strokeWidth="1.5"
        />
        <text
          x="100"
          y="155"
          textAnchor="middle"
          fill="#660099"
          fontSize="8"
          fontFamily="monospace"
        >
          GOD&apos;S IN HIS HEAVEN
        </text>
        <text
          x="100"
          y="168"
          textAnchor="middle"
          fill="#660099"
          fontSize="8"
          fontFamily="monospace"
        >
          ALL&apos;S RIGHT WITH THE WORLD
        </text>
      </svg>
    </div>
  );
}

function ParticleField() {
  // Simplified placeholder — real implementation uses useFrame
  return null;
}

export function EVA3DScene() {
  const { isMobile, supportsWebGL, prefersReducedMotion } =
    useDeviceCapabilities();
  const use3D = supportsWebGL && !isMobile && !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {use3D ? (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#FF0000" />
          <pointLight position={[-10, -5, -5]} intensity={0.5} color="#660099" />
          {/* 3D model placeholder */}
          <mesh rotation={[0, 0, 0]}>
            <boxGeometry args={[1, 2, 0.5]} />
            <meshStandardMaterial color="#6A0572" wireframe />
          </mesh>
        </Canvas>
      ) : (
        <FallbackScene />
      )}
      <ParticleField />
    </div>
  );
}
