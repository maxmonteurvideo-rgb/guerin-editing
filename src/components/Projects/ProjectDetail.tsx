"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { HorizontalProject } from "@/data/projects";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProjectDetailProps {
  project: HorizontalProject | null;
  onClose: () => void;
}

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="fixed inset-0 bg-bg-primary/80"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 my-12 w-full max-w-[800px] mx-4 md:mx-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: EASING }}
          >
            <div className="bg-bg-surface border border-border rounded-[4px] overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6 md:px-8 md:pt-8">
                <p
                  className="text-accent font-medium uppercase"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}
                >
                  {project.category}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Fermer"
                  className="text-text-muted hover:text-text-primary transition-colors duration-150 cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 5l10 10M15 5L5 15" />
                  </svg>
                </button>
              </div>

              <div className="px-6 pb-8 pt-4 md:px-8">
                <h2
                  className="font-display text-text-primary mb-8"
                  style={{ fontSize: "var(--fs-h1)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {project.name}
                </h2>

                <div className="mb-10 w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                  <iframe
                    src={project.videoUrl}
                    title={`${project.name} — vidéo`}
                    width="100%"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    style={{
                      width: "100%",
                      height: "100%",
                      aspectRatio: "16 / 9",
                      borderRadius: "12px",
                      border: "none",
                      display: "block",
                    }}
                  />
                </div>

                <div className="flex flex-col gap-10">
                  <DetailBlock title="Le brief" content={project.detail.brief} />
                  <DetailBlock title="Les contraintes" content={project.detail.constraints} />
                  <DetailBlock title="Mon approche" content={project.detail.approach} />

                  <div>
                    <h3
                      className="font-display text-text-primary mb-4"
                      style={{ fontSize: "var(--fs-h3)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                    >
                      Résultats
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {project.detail.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span className="text-text-secondary font-light">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DetailBlock({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h3
        className="font-display text-text-primary mb-3"
        style={{ fontSize: "var(--fs-h3)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>
      <p className="text-text-secondary font-light leading-relaxed">{content}</p>
    </div>
  );
}
