"use client";

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), {
  ssr: false,
});

export default function SplashCursorProvider() {
  return (
    <div
      className="fixed inset-0 z-[45] pointer-events-none"
      style={{ opacity: 0.4 }}
      aria-hidden
    >
      <SplashCursor
        RAINBOW_MODE={false}
        COLOR="#7EB6FF"
        SPLAT_FORCE={900}
        SPLAT_RADIUS={0.08}
        DENSITY_DISSIPATION={8}
        VELOCITY_DISSIPATION={4}
        SHADING={false}
        CURL={1.5}
      />
    </div>
  );
}
