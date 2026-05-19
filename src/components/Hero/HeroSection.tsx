"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";
import SplitText from "@/components/SplitText";
import GradientText from "@/components/GradientText";

const Orb = dynamic(() => import("./Orb"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo, delay },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center overflow-hidden h-[85vh]"
      style={{ background: "#0a0a0a" }}
    >
      <div className="absolute inset-0">
        <Orb hue={0} hoverIntensity={0.2} rotateOnHover backgroundColor="#0a0a0a" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
          className="text-accent text-center font-sans font-medium uppercase"
          style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}
        >
          VIDEO EDITING & MOTION DESIGN
        </motion.p>

        <div className="mt-6 px-4">
          <SplitText
            text="GUERIN EDITING"
            tag="h1"
            className="font-display text-text-primary leading-[0.95] tracking-[-0.03em] hero-title"
            splitType="chars"
            delay={40}
            duration={1}
            ease="power3.out"
            from={{ opacity: 0, y: 50, rotateX: 40 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            threshold={0}
            rootMargin="0px"
            textAlign="center"
          />
        </div>

        <motion.div
          className="mt-8 max-w-[900px] px-6 text-center overflow-visible"
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          animate="visible"
        >
          <GradientText
            className="font-display leading-[1.35] tracking-[-0.02em]"
            colors={["#7EB6FF", "#A8CFFF", "#5a9eff", "#c084fc", "#7EB6FF"]}
            animationSpeed={6}
          >
            <span style={{ fontSize: "clamp(1.5rem, 3.5vw, 3rem)", display: "block" }}>
              L'impact visuel que vos concurrents ne pourront pas reproduire
            </span>
          </GradientText>
        </motion.div>

        <motion.a
          variants={fadeUp}
          custom={0.8}
          initial="hidden"
          animate="visible"
          href="#brief"
          className="mt-10 bg-accent text-bg-primary rounded-[2px] px-8 py-3.5 uppercase text-sm font-medium tracking-[0.12em] transition-all duration-250 hover:bg-accent-light hero-cta"
        >
          Démarrer un projet
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.5 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
      >
        <span className="text-text-muted text-[0.625rem] uppercase tracking-[0.12em]">Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" className="text-text-muted" strokeWidth="1.5">
          <path d="M4 6l4 4 4-4" />
        </svg>
      </motion.div>
    </section>
  );
}
