"use client";

import { Stars as DreiStars } from "@react-three/drei";

export default function Stars() {
  return (
    <DreiStars
      radius={60}
      depth={50}
      count={3000}
      factor={4}
      saturation={0}
      fade
    />
  );
}
