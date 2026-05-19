"use client";

import { useRef, useEffect, useCallback, useState, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  glowColor?: string;
  particleCount?: number;
  className?: string;
}

export default function GlowCard({
  children,
  glowColor = "126, 182, 255",
  particleCount = 10,
  className = "",
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const isHoveredRef = useRef(false);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      card.style.setProperty("--glow-x", `${x}%`);
      card.style.setProperty("--glow-y", `${y}%`);
    },
    []
  );

  const spawnParticles = useCallback(() => {
    const card = cardRef.current;
    if (!card || !isHoveredRef.current) return;

    const rect = card.getBoundingClientRect();

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      const startX = Math.random() * rect.width;
      const startY = Math.random() * rect.height;
      const size = 2 + Math.random() * 3;
      const duration = 2000 + Math.random() * 2000;
      const delay = i * 80;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(${glowColor}, 0.8);
        box-shadow: 0 0 ${size * 2}px rgba(${glowColor}, 0.4);
        pointer-events: none;
        z-index: 10;
        left: ${startX}px;
        top: ${startY}px;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;

      setTimeout(() => {
        if (!isHoveredRef.current || !card.contains(particle)) return;
        particle.style.opacity = "1";
      }, delay);

      card.appendChild(particle);
      particlesRef.current.push(particle);

      const driftX = (Math.random() - 0.5) * 80;
      const driftY = (Math.random() - 0.5) * 80;

      const startTime = performance.now() + delay;

      function animate(now: number) {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          rafRef.current = requestAnimationFrame(animate);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 2);
        const fadeOut = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;

        particle.style.transform = `translate(${driftX * ease}px, ${driftY * ease}px)`;
        particle.style.opacity = isHoveredRef.current ? String(fadeOut * 0.8) : "0";

        if (progress < 1 && isHoveredRef.current) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          particle.remove();
          particlesRef.current = particlesRef.current.filter((p) => p !== particle);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }
  }, [glowColor, particleCount]);

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach((p) => {
      p.style.opacity = "0";
      setTimeout(() => p.remove(), 300);
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnter = () => {
      isHoveredRef.current = true;
      spawnParticles();
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      clearParticles();
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    card.addEventListener("mousemove", handleMouseMove);

    return () => {
      isHoveredRef.current = false;
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      card.removeEventListener("mousemove", handleMouseMove);
      clearParticles();
      cancelAnimationFrame(rafRef.current);
    };
  }, [spawnParticles, clearParticles, handleMouseMove]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--glow-x": "50%",
          "--glow-y": "50%",
          "--glow-color": glowColor,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--glow-x) var(--glow-y), rgba(${glowColor}, 0.12) 0%, rgba(${glowColor}, 0.04) 30%, transparent 70%)`,
        }}
        ref={(el) => {
          if (!el) return;
          const card = cardRef.current;
          if (!card) return;
          const show = () => (el.style.opacity = "1");
          const hide = () => (el.style.opacity = "0");
          card.addEventListener("mouseenter", show);
          card.addEventListener("mouseleave", hide);
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] rounded-[2px] opacity-0 transition-opacity duration-300"
        style={{
          boxShadow: `inset 0 0 0 1px rgba(${glowColor}, 0.25)`,
        }}
        ref={(el) => {
          if (!el) return;
          const card = cardRef.current;
          if (!card) return;
          const show = () => (el.style.opacity = "1");
          const hide = () => (el.style.opacity = "0");
          card.addEventListener("mouseenter", show);
          card.addEventListener("mouseleave", hide);
        }}
      />
      <div className="relative z-[3]">{children}</div>
    </div>
  );
}
