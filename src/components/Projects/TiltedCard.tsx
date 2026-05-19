"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

interface TiltedCardProps {
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  cardHeight?: string;
  cardWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showTooltip?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

export default function TiltedCard({
  captionText = "",
  containerHeight = "100%",
  containerWidth = "100%",
  cardHeight = "100%",
  cardWidth = "100%",
  scaleOnHover = 1.03,
  rotateAmplitude = 10,
  showTooltip = true,
  children,
  onClick,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className="relative flex items-center justify-center cursor-pointer"
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "800px",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-[2px]"
        style={{
          width: cardWidth,
          height: cardHeight,
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="pointer-events-none absolute top-0 left-0 z-20 rounded-[2px] bg-bg-elevated px-4 py-2 font-display text-text-primary whitespace-nowrap"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
            fontSize: "var(--fs-h3)",
            letterSpacing: "-0.02em",
            translateX: "-50%",
            translateY: "-120%",
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
