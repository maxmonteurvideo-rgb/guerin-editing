"use client";

import { motion } from "framer-motion";
import { faqItems } from "@/data/projects";
import { revealVariants, staggerContainer } from "@/lib/motion";
import GradientText from "@/components/GradientText";
import Accordion from "./Accordion";

export default function FAQSection() {
  return (
    <section id="faq" className="py-32 md:py-40">
      <motion.div
        className="mx-auto max-w-[720px] px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.p
          variants={revealVariants}
          className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-accent"
        >
          FAQ
        </motion.p>

        <motion.div variants={revealVariants} className="mb-16">
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
                Questions fréquentes
              </span>
            </GradientText>
          </h2>
        </motion.div>

        <motion.div variants={revealVariants}>
          <Accordion items={faqItems} />
        </motion.div>
      </motion.div>
    </section>
  );
}
