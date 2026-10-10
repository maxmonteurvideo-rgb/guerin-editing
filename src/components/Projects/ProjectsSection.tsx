"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { verticalProjects } from "@/data/projects";
import { showcase } from "@/data/showcase";
import { revealVariants, staggerContainer } from "@/lib/motion";
import SplitText from "@/components/SplitText";
import GradientText from "@/components/GradientText";
import LogoLoop, { type LogoItem } from "@/components/LogoLoop";
import "@/components/LogoLoop.css";
import ShowcaseRow, { ShowcaseDivider } from "./ShowcaseRow";
import FinaryStyleSection from "./FinaryStyleSection";
import VerticalProjects from "./VerticalProjects";

const trustLogos: LogoItem[] = [
  { src: "/logos/manael.png", alt: "Manael" },
  { src: "/logos/henri.png", alt: "Henri" },
  { src: "/logos/vk.png", alt: "VK" },
  { src: "/logos/ruiz.png", alt: "Ruiz" },
  { src: "/logos/mano.png", alt: "Mano" },
  { src: "/logos/ora.png", alt: "ORA" },
  { src: "/logos/infit.png", alt: "Infit" },
  { src: "/logos/nofoni.png", alt: "Nofoni" },
  { src: "/logos/medhi.png", alt: "Medhi" },
  { src: "/logos/valek.png", alt: "Valek" },
  { src: "/logos/retour-aux-sources.png", alt: "Retour aux Sources" },
  { src: "/logos/natmor.png", alt: "Natmor" },
  { src: "/logos/gebiz.png", alt: "Gebiz" },
  { src: "/logos/dxt.png", alt: "DXT" },
];

export default function ProjectsSection() {
  return (
    <>
      <section
        id="projets"
        className="py-32 md:py-40 overflow-x-clip"
        style={{
          background:
            "radial-gradient(ellipse 55% 30% at 15% 20%, rgba(90, 60, 220, 0.18), transparent), radial-gradient(ellipse 50% 30% at 85% 45%, rgba(50, 110, 255, 0.16), transparent), radial-gradient(ellipse 60% 30% at 25% 80%, rgba(126, 182, 255, 0.10), transparent), #030305",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="mb-20 md:mb-28 text-center"
          >
            <motion.p
              variants={revealVariants}
              className="text-accent font-sans uppercase mb-5 text-center"
              style={{ fontSize: "20px", letterSpacing: "5px", fontWeight: 500 }}
            >
              PROJETS
            </motion.p>

            <motion.div variants={revealVariants} className="text-center">
              <h2 className="font-display tracking-[-0.02em] overflow-visible">
                <GradientText
                  colors={["#8B5CF6", "#7EB6FF", "#FFFFFF"]}
                  animationSpeed={6}
                  direction="horizontal"
                >
                  <span
                    className="block leading-[1.05]"
                    style={{ fontSize: "96px", fontWeight: 900 }}
                  >
                    Selected Work
                  </span>
                </GradientText>
              </h2>
            </motion.div>
          </motion.div>

          <div className="flex flex-col">
            {showcase.map((item, index) => (
              <Fragment key={item.id}>
                {index > 0 && <ShowcaseDivider />}
                <ShowcaseRow item={item} index={index} />
              </Fragment>
            ))}
          </div>

          <FinaryStyleSection />

          <div className="mt-32 md:mt-40">
            <VerticalProjects projects={verticalProjects} />
          </div>

          {/* Trust / Logos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
            className="mt-32 md:mt-40"
          >
            <div className="mb-14 text-center">
              <SplitText
                text="Ils me font confiance"
                tag="h2"
                className="font-display text-text-primary section-title gradient-blue"
                splitType="chars"
                delay={30}
                duration={0.9}
                ease="power3.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />
            </div>

            <motion.div variants={revealVariants} className="trust-logos">
              <LogoLoop
                logos={trustLogos}
                speed={50}
                logoHeight={60}
                gap={48}
                pauseOnHover
                fadeOut
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  );
}
