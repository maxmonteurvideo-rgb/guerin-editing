"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type VerticalProject } from "@/data/projects";
import { revealVariants, staggerContainer } from "@/lib/motion";
import GradientText from "@/components/GradientText";

interface VerticalProjectsProps {
  projects: VerticalProject[];
}

interface ReelVideoProps {
  id: number;
  src: string;
  title: string;
  isSoundOn: boolean;
  onSoundToggle: (id: number) => void;
}

function ReelVideo({ id, src, title, isSoundOn, onSoundToggle }: ReelVideoProps) {
  return (
    <div className="glass relative aspect-[9/16] overflow-hidden">
      <video
        src={src}
        title={title}
        autoPlay
        muted={!isSoundOn}
        loop
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "12px",
        }}
      />
      <button
        type="button"
        onClick={() => onSoundToggle(id)}
        aria-label={isSoundOn ? "Couper le son" : "Activer le son"}
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.125rem",
          lineHeight: 1,
        }}
      >
        {isSoundOn ? "🔊" : "🔇"}
      </button>
    </div>
  );
}

function ProjectTitle({ name }: { name: string }) {
  const hashIndex = name.indexOf("#");
  if (hashIndex === -1) {
    return <>{name}</>;
  }
  const textPart = name.slice(0, hashIndex);
  const numPart = name.slice(hashIndex);

  return (
    <>
      {textPart}
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 900,
        }}
      >
        {numPart}
      </span>
    </>
  );
}

export default function VerticalProjects({ projects }: VerticalProjectsProps) {
  const [unmutedId, setUnmutedId] = useState<number | null>(null);

  const handleSoundToggle = (id: number) => {
    setUnmutedId((current) => (current === id ? null : id));
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <motion.p
        variants={revealVariants}
        className="text-accent font-sans uppercase mb-4 text-center"
        style={{ fontSize: "18px", letterSpacing: "4px", fontWeight: 500 }}
      >
        INSTAGRAM / DAILY
      </motion.p>

      <motion.div variants={revealVariants} className="mb-10 text-center">
        <h2 className="font-display tracking-[-0.02em] overflow-visible text-center">
          <GradientText
            colors={["#8B5CF6", "#7EB6FF", "#FFFFFF"]}
            animationSpeed={6}
            direction="horizontal"
          >
            <span
              className="block leading-[1.05]"
              style={{ fontSize: "96px", fontWeight: 900 }}
            >
              Short Format
            </span>
          </GradientText>
        </h2>
      </motion.div>

      {/* Desktop grid */}
      <motion.div
        variants={staggerContainer}
        className="hidden md:grid grid-cols-3 gap-6"
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={revealVariants}>
            <ReelVideo
              id={project.id}
              src={project.videoUrl}
              title={project.name}
              isSoundOn={unmutedId === project.id}
              onSoundToggle={handleSoundToggle}
            />
            <h3
              className="font-display text-text-primary mt-3"
              style={{ fontSize: "var(--fs-h3)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              <ProjectTitle name={project.name} />
            </h3>
            <p
              className="text-text-muted uppercase mt-1"
              style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              {project.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile horizontal scroll */}
      <motion.div
        variants={staggerContainer}
        className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={revealVariants}
            className="min-w-[260px] snap-center scrollbar-hide"
          >
            <ReelVideo
              id={project.id}
              src={project.videoUrl}
              title={project.name}
              isSoundOn={unmutedId === project.id}
              onSoundToggle={handleSoundToggle}
            />
            <h3
              className="font-display text-text-primary mt-3"
              style={{ fontSize: "var(--fs-h3)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              <ProjectTitle name={project.name} />
            </h3>
            <p
              className="text-text-muted uppercase mt-1"
              style={{ fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 500 }}
            >
              {project.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
