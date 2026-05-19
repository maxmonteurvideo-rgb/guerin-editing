"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const minDuration = 1800;

    const tick = () => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / minDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 300);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg-primary"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASING }}
        >
          <motion.span
            className="font-display text-text-primary tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASING }}
          >
            GUERIN EDITING
          </motion.span>

          <div className="mt-8 w-48">
            <div className="h-px w-full bg-border">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="mt-3 text-center text-text-muted text-[0.75rem] font-medium uppercase tracking-[0.12em]">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
