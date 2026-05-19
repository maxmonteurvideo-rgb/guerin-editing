"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SNAP_ANGLE = Math.PI / 2;
const PROJECT_COUNT = 4;

function normalizeAngle(angle: number): number {
  const mod = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  return mod;
}

function getActiveIndex(angle: number): number {
  const normalized = normalizeAngle(angle);
  const index = Math.round(normalized / SNAP_ANGLE) % PROJECT_COUNT;
  return index;
}

function getSnappedAngle(index: number): number {
  return index * SNAP_ANGLE;
}

export function useOrbitalRotation() {
  const [targetAngle, setTargetAngle] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const animationRef = useRef<number | null>(null);

  const snapToNearest = useCallback((angle: number) => {
    const normalized = normalizeAngle(angle);
    const index = Math.round(normalized / SNAP_ANGLE) % PROJECT_COUNT;
    const snapped = getSnappedAngle(index);
    setTargetAngle(snapped);
    setActiveIndex(index);
  }, []);

  const goToProject = useCallback((index: number) => {
    const snapped = getSnappedAngle(index % PROJECT_COUNT);
    setTargetAngle(snapped);
    setActiveIndex(index % PROJECT_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % PROJECT_COUNT;
      setTargetAngle(getSnappedAngle(next));
      return next;
    });
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + PROJECT_COUNT) % PROJECT_COUNT;
      setTargetAngle(getSnappedAngle(next));
      return next;
    });
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true;
      dragStartX.current = e.clientX;
      dragStartAngle.current = currentAngle;
    },
    [currentAngle]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    const sensitivity = 0.005;
    const newAngle = dragStartAngle.current + dx * sensitivity;
    setTargetAngle(newAngle);
  }, []);

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    snapToNearest(targetAngle);
  }, [snapToNearest, targetAngle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  useEffect(() => {
    const animate = () => {
      setCurrentAngle((prev) => {
        const diff = targetAngle - prev;
        if (Math.abs(diff) < 0.001) return targetAngle;
        return prev + diff * 0.08;
      });
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetAngle]);

  return {
    currentAngle,
    activeIndex,
    goToProject,
    goNext,
    goPrev,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
