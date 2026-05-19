"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Mesh } from "three";

interface OrbitalProjectsProps {
  currentAngle: number;
  activeIndex: number;
}

const RADIUS = 4;
const COUNT = 4;

export default function OrbitalProjects({
  currentAngle,
  activeIndex,
}: OrbitalProjectsProps) {
  const meshRefs = useRef<(Mesh | null)[]>([]);
  const { camera } = useThree();

  useFrame(() => {
    for (const mesh of meshRefs.current) {
      if (mesh) {
        mesh.lookAt(camera.position);
      }
    }
  });

  return (
    <group>
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = currentAngle + (i * Math.PI) / 2;
        const isActive = i === activeIndex;
        const s = isActive ? 1.2 : 0.8;

        return (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
            position={[
              Math.sin(angle) * RADIUS,
              0,
              Math.cos(angle) * RADIUS,
            ]}
            scale={[s, s, s]}
          >
            <planeGeometry args={[1.2, 0.675]} />
            <meshBasicMaterial
              color="#131316"
              transparent
              opacity={isActive ? 1 : 0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}
