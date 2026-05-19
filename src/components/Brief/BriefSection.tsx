"use client";

import { motion } from "framer-motion";
import { revealVariants, staggerContainer } from "@/lib/motion";
import GradientText from "@/components/GradientText";
import BriefForm from "./BriefForm";

export default function BriefSection() {
  return (
    <section id="brief" className="py-32 md:py-40">
      <motion.div
        className="mx-auto px-8 max-md:px-4"
        style={{ maxWidth: "720px" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.p
          variants={revealVariants}
          className="text-accent font-medium uppercase mb-5"
          style={{ fontSize: "0.75rem", letterSpacing: "0.12em" }}
        >
          BRIEF
        </motion.p>

        <motion.div variants={revealVariants} className="mb-5">
          <h2 className="font-display tracking-[-0.02em] overflow-visible">
            <GradientText colors={["#5227FF", "#FF9FFC", "#B497CF"]} animationSpeed={8}>
              <span
                style={{
                  fontSize: "42px",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  display: "inline-block",
                }}
              >
                Démarrer un projet
              </span>
            </GradientText>
          </h2>
        </motion.div>

        <motion.p
          variants={revealVariants}
          className="text-text-secondary font-light mb-16 leading-relaxed"
        >
          Décrivez votre projet en quelques clics. Je reviens vers vous sous 24h avec un créneau
          d&apos;appel.
        </motion.p>
        <motion.div variants={revealVariants}>
          <BriefForm />
        </motion.div>
      </motion.div>
    </section>
  );
}
