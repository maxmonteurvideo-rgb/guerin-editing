"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import type { Group } from "three";

useGLTF.preload("/models/moon.glb");

export default function Moon() {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF("/models/moon.glb");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <ambientLight intensity={0.08} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} />
      <group ref={groupRef} scale={2.5}>
        <primitive object={scene} />
      </group>
    </>
  );
}
