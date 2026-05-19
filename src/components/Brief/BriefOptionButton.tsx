"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface BriefOptionButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
}

export default function BriefOptionButton({
  active,
  onClick,
  children,
  className = "",
}: BriefOptionButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        border: active ? "1px solid rgba(100, 180, 255, 0.5)" : undefined,
        boxShadow: active ? "0 0 15px rgba(80, 120, 255, 0.15)" : undefined,
        transition: "border 300ms ease, box-shadow 300ms ease",
      }}
      className={`text-left px-6 py-4 rounded-[12px] border cursor-pointer font-sans font-normal text-text-primary ${
        active ? "bg-accent-muted" : "border-white/10 bg-white/5 hover:bg-white/8"
      } ${className}`.trim()}
    >
      {children}
    </motion.button>
  );
}
