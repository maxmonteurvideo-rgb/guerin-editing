"use client";

import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

const DynamicScene = dynamic(
  () =>
    import("@react-three/fiber").then(({ Canvas }) => {
      const Moon = require("./Moon").default;
      const Stars = require("./Stars").default;

      function Scene() {
        return (
          <Canvas
            camera={{ position: [0, 0, 6], fov: 50 }}
            style={{ background: "transparent" }}
            className="h-full w-full"
          >
            <Moon />
            <Stars />
          </Canvas>
        );
      }

      return Scene;
    }),
  { ssr: false }
);

export default function MoonCanvas() {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(detectWebGL());
  }, []);

  if (!webgl) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-48 w-48 rounded-full bg-bg-elevated" />
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="bg-bg-primary h-full w-full" />}>
      <DynamicScene />
    </Suspense>
  );
}
