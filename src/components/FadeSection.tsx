"use client";

import { motion } from "framer-motion";
import { easeOutExpo } from "@/lib/motion";

/* Fondu d'apparition au scroll pour une section entière (le hero n'en a pas) */
export default function FadeSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}
