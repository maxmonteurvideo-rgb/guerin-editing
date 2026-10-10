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
  poster: string;
  title: string;
  isSoundOn: boolean;
  onSoundToggle: (id: number) => void;
}

function ReelVideo({ id, src, poster, title, isSoundOn, onSoundToggle }: ReelVideoProps) {
  return (
    <div className="glass relative aspect-[9/16] overflow-hidden">
      <video
        src={src}
        poster={poster}
        title={title}
        autoPlay
        muted={!isSoundOn}
        loop
        playsInline
        preload="metadata"
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
      id="shorts"
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
        REELS / ADS
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

      {/* Une seule liste : défilement horizontal sur mobile, grille 3 colonnes sur desktop */}
      <motion.div
        variants={staggerContainer}
        className="reels-scroll flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style>{`.reels-scroll::-webkit-scrollbar { display: none; }`}</style>
        {projects.map((project) => (
          <motion.div
            key={project.id}
            variants={revealVariants}
            className="min-w-[260px] snap-center md:min-w-0"
          >
            <ReelVideo
              id={project.id}
              src={project.videoUrl}
              poster={project.poster}
              title={project.name}
              isSoundOn={unmutedId === project.id}
              onSoundToggle={handleSoundToggle}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
