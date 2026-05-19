"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            className="glass"
            style={{
              border: isOpen ? "1px solid rgba(100, 180, 255, 0.4)" : undefined,
              boxShadow: isOpen ? "0 0 15px rgba(80, 120, 255, 0.12)" : undefined,
              transition: "border 300ms ease, box-shadow 300ms ease",
            }}
          >
            <motion.button
              type="button"
              onClick={() => toggle(index)}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left"
            >
              <span className="font-sans text-base font-medium text-text-primary">
                {item.question}
              </span>
              <span
                className="text-lg text-text-muted"
                style={{
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  transition: "transform 300ms ease",
                  display: "inline-block",
                }}
              >
                +
              </span>
            </motion.button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 pt-3 font-sans text-base font-light text-text-secondary">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
