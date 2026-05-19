"use client";

import { motion } from "framer-motion";
import { type HorizontalProject } from "@/data/projects";
import { revealVariants, staggerContainer } from "@/lib/motion";
import GradientText from "@/components/GradientText";

interface HorizontalProjectProps {
  project: HorizontalProject;
  index: number;
  onSelect: () => void;
}

export default function HorizontalProjectCard({
  project,
  index,
  onSelect,
}: HorizontalProjectProps) {
  const isEven = index % 2 === 1;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`glass p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center cursor-pointer ${
        isEven ? "md:[direction:rtl]" : ""
      }`}
      onClick={onSelect}
    >
      <motion.div variants={revealVariants} className="md:[direction:ltr]">
        <div className="aspect-video w-full relative overflow-hidden rounded-[12px] group">
          <img
            src={project.thumbnail}
            alt={project.name}
            className="w-full h-full object-cover rounded-[12px]"
          />
          <motion.div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover:bg-black/30 transition-colors duration-300 rounded-[12px]">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white ml-1"
              >
                <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={revealVariants}
        className="flex flex-col gap-4 md:[direction:ltr]"
      >
        <p
          className="text-accent font-sans uppercase"
          style={{ fontSize: "14px", letterSpacing: "2px", fontWeight: 500 }}
        >
          {project.category}
        </p>

        <h3 className="font-display tracking-[-0.02em] overflow-visible">
          <GradientText
            colors={["#7EB6FF", "#A8CFFF", "#5227FF", "#B497CF"]}
            animationSpeed={8}
          >
            <span style={{ fontSize: "42px", fontWeight: 800, lineHeight: 1.2, display: "inline-block" }}>
              {project.name}
            </span>
          </GradientText>
        </h3>

        <p
          className="text-text-secondary leading-relaxed max-w-[480px]"
          style={{ fontWeight: 300 }}
        >
          {project.description}
        </p>

        <span className="text-accent text-sm font-medium mt-2">
          Voir le projet →
        </span>
      </motion.div>
    </motion.div>
  );
}
