"use client";

import { motion } from "framer-motion";
import GradientText from "@/components/GradientText";
import { revealVariants, staggerContainer } from "@/lib/motion";
import { InViewVideo } from "./ShowcaseRow";

/* Vidéos de la section — déposer les fichiers dans /public/videos puis remplir src/poster */
const FINARY_CLIPS: { id: number; src: string | null; poster: string | null }[] = [
  { id: 1, src: "/videos/finary-1.mp4", poster: "/videos/finary-1.jpg" },
  { id: 2, src: "/videos/finary-2.mp4", poster: "/videos/finary-2.jpg" },
];

export default function FinaryStyleSection() {
  return (
    <motion.div
      id="finary"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="mt-32 md:mt-40"
    >
      <motion.p
        variants={revealVariants}
        className="text-accent font-sans uppercase mb-4 text-center"
        style={{ fontSize: "18px", letterSpacing: "4px", fontWeight: 500 }}
      >
        FINARY EDITING STYLE
      </motion.p>

      <motion.div variants={revealVariants} className="mb-6 text-center">
        <h2 className="font-display tracking-[-0.02em] overflow-visible text-center">
          <GradientText colors={["#8B5CF6", "#7EB6FF", "#FFFFFF"]} animationSpeed={6} direction="horizontal">
            <span className="block leading-[1.05]" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}>
              Le motion des grandes chaînes business
            </span>
          </GradientText>
        </h2>
      </motion.div>

      <motion.p
        variants={revealVariants}
        className="mx-auto mb-14 max-w-[620px] text-center text-text-secondary"
        style={{ fontSize: "1.05rem", lineHeight: 1.6 }}
      >
        Graphiques animés, chiffres qui s&apos;écrivent, interfaces qui se construisent : le style des grandes chaînes
        finance, appliqué à votre contenu.
      </motion.p>

      <motion.div variants={staggerContainer} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {FINARY_CLIPS.map((clip) => (
          <motion.div key={clip.id} variants={revealVariants} className="glass p-3">
            <div
              className="relative aspect-video overflow-hidden"
              style={{ borderRadius: 12, background: "rgba(5, 8, 20, 0.6)" }}
            >
              {clip.src ? (
                <InViewVideo src={clip.src} poster={clip.poster} />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-[0.75rem] uppercase tracking-[0.12em] text-text-muted">Vidéo à venir</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <p className="mt-6 text-center text-[0.7rem] text-text-muted">
        Style inspiré des contenus de Finary. Aucune affiliation avec la marque.
      </p>
    </motion.div>
  );
}
