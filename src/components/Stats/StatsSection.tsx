"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { revealVariants, staggerContainer } from "@/lib/motion";

interface StatItem {
  value: number;
  suffix: string;
  prefix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: 100, prefix: "+", suffix: "M", label: "De vues générées" },
  { value: 100, prefix: "+", suffix: "", label: "De clients satisfaits" },
  { value: 500, prefix: "+", suffix: "", label: "De projets réalisés" },
];

function useCountUp(target: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, inView }: { stat: StatItem; inView: boolean }) {
  const count = useCountUp(stat.value, 2000, inView);

  return (
    <motion.div
      variants={revealVariants}
      className="glass flex flex-col items-center justify-center text-center w-full md:w-[350px] md:h-[350px] py-12 md:py-0"
    >
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
          fontSize: "80px",
          color: "#ffffff",
          marginBottom: "16px",
          lineHeight: 1,
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </span>
      <span
        style={{
          fontSize: "22px",
          fontWeight: 400,
          color: "rgba(255, 255, 255, 0.75)",
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) setInView(true);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.3 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      style={{
        padding: "120px 0",
        background:
          "radial-gradient(ellipse 60% 40% at 20% 50%, rgba(100, 50, 200, 0.12), transparent), radial-gradient(ellipse 50% 40% at 80% 50%, rgba(50, 100, 220, 0.10), transparent)",
      }}
    >
      <motion.div
        ref={ref}
        className="max-w-[1200px] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-center gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {STATS.map((stat) => (
          <StatCard key={stat.label} stat={stat} inView={inView} />
        ))}
      </motion.div>
    </section>
  );
}
