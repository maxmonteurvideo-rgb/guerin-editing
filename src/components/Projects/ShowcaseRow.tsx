"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "framer-motion";
import type { ShowcaseClip, ShowcaseItem } from "@/data/showcase";
import { easeOutExpo } from "@/lib/motion";

/* Vidéo qui ne joue que lorsqu'elle est visible (économise la bande passante) */
export function InViewVideo({ src, poster }: { src: string; poster: string | null }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster ?? undefined}
      muted
      loop
      playsInline
      preload="none"
      className="h-full w-full object-cover"
      style={{ borderRadius: 12 }}
    />
  );
}

/* Pile de vidéos : celle de devant joue, puis passe derrière (fin de vidéo, 15 s max, ou clic sur celle de derrière) */
const STACK_MAX_SECONDS = 15;

function VideoStack({ clips }: { clips: ShowcaseClip[] }) {
  const [front, setFront] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const inView = useRef(false);

  const next = useCallback(() => setFront((f) => (f + 1) % clips.length), [clips.length]);

  const syncPlayback = useCallback(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === front && inView.current) v.play().catch(() => {});
      else v.pause();
    });
  }, [front]);

  // Lecture uniquement quand la pile est visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        syncPlayback();
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [syncPlayback]);

  // À chaque changement : la vidéo de devant repart du début, rotation auto après 15 s
  useEffect(() => {
    const v = videoRefs.current[front];
    if (v) v.currentTime = 0;
    syncPlayback();
    const timer = window.setTimeout(next, STACK_MAX_SECONDS * 1000);
    return () => window.clearTimeout(timer);
  }, [front, next, syncPlayback]);

  return (
    <div ref={containerRef} className="relative mx-auto flex h-[500px] w-full max-w-[560px] items-center justify-center">
      {clips.map((clip, i) => {
        const isFront = i === front;
        const isPortrait = clip.format === "portrait";
        return (
          <motion.div
            key={clip.src}
            className={`glass absolute p-3 ${isFront ? "" : "cursor-pointer"}`}
            style={{ width: isPortrait ? 270 : "92%" }}
            initial={false}
            animate={{
              x: 0,
              y: isFront ? 0 : -12,
              scale: isFront ? 1 : 0.88,
              rotate: isFront ? 0 : -4,
              opacity: isFront ? 1 : 0.45,
              filter: isFront ? "blur(0px)" : "blur(2px)",
              zIndex: isFront ? 20 : 10,
            }}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            onClick={isFront ? undefined : next}
            aria-label={isFront ? undefined : "Afficher cette vidéo"}
          >
            <div
              className={`relative overflow-hidden ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}
              style={{ borderRadius: 12, background: "rgba(5, 8, 20, 0.6)" }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={clip.src}
                poster={clip.poster}
                muted
                playsInline
                preload="metadata"
                onEnded={isFront ? next : undefined}
                className="h-full w-full object-cover"
                style={{ borderRadius: 12 }}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function VideoPanel({ item }: { item: ShowcaseItem }) {
  if (item.clips && item.clips.length > 1) return <VideoStack clips={item.clips} />;
  const isPortrait = item.format === "portrait";

  return (
    <div
      className={`glass mx-auto w-full p-3 ${isPortrait ? "max-w-[300px]" : "max-w-[560px]"}`}
    >
      <div
        className={`relative overflow-hidden ${isPortrait ? "aspect-[9/16]" : "aspect-video"}`}
        style={{ borderRadius: 12, background: "rgba(5, 8, 20, 0.6)" }}
      >
        {item.video ? (
          <InViewVideo src={item.video} poster={item.poster} />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-[0.75rem] uppercase tracking-[0.12em] text-text-muted">
              Vidéo à venir
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* Texte client : nom, abonnés (glow interactif), travail réalisé */
function ClientInfo({
  item,
  shine,
  glow,
}: {
  item: ShowcaseItem;
  /** position horizontale de la souris dans la ligne (0 → 1) */
  shine: MotionValue<number>;
  /** intensité du survol (0 → 1) */
  glow: MotionValue<number>;
}) {
  // Reflet lumineux qui suit la souris sur le chiffre
  const shinePos = useTransform(shine, [0, 1], [10, 90]);
  const shineStart = useTransform(shinePos, (v) => v - 22);
  const shineEnd = useTransform(shinePos, (v) => v + 22);
  const numberBg = useMotionTemplate`linear-gradient(100deg, #7EB6FF 0%, #C9DEFF ${shineStart}%, #FFFFFF ${shinePos}%, #C9DEFF ${shineEnd}%, #A78BFA 100%)`;
  // Halo autour du chiffre : présent en permanence (contraste), renforcé au survol
  const glowA = useTransform(glow, [0, 1], [10, 26]);
  const glowB = useTransform(glow, [0, 1], [24, 60]);
  const numberGlow = useMotionTemplate`drop-shadow(0 0 ${glowA}px rgba(126, 182, 255, 0.85)) drop-shadow(0 0 ${glowB}px rgba(139, 92, 246, 0.55))`;

  return (
    <div className="relative isolate flex flex-col items-center text-center">
      {/* Voile sombre derrière le texte pour le détacher de la photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[170%] w-[150%] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse at center, rgba(3, 3, 8, 0.82) 0%, rgba(3, 3, 8, 0.55) 45%, transparent 72%)" }}
      />

      <h3
        className="font-display text-white"
        style={{
          fontSize: "var(--fs-h2)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          textShadow: "0 2px 18px rgba(0, 0, 0, 0.9)",
        }}
      >
        {item.client}
      </h3>

      {item.subscribers && (
        <div className="mt-2 flex flex-col items-center">
          <motion.span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(3rem, 6vw, 4.75rem)",
              lineHeight: 1,
              backgroundImage: numberBg,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: numberGlow,
            }}
          >
            {item.subscribers}
          </motion.span>
          <span
            className="mt-1 text-sm font-medium uppercase tracking-[0.12em] text-white/85"
            style={{ textShadow: "0 2px 12px rgba(0, 0, 0, 0.9)" }}
          >
            {item.platform}
          </span>
        </div>
      )}

      <p
        className="mt-4 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#A8CFFF]"
        style={{ textShadow: "0 0 14px rgba(126, 182, 255, 0.6), 0 2px 10px rgba(0, 0, 0, 0.9)" }}
      >
        {item.work}
      </p>
    </div>
  );
}

/* Fondu vers le noir en bas pour que le buste se fonde dans la section (la tête n est jamais coupée) */
const photoMask = "linear-gradient(to bottom, black 0%, black 72%, transparent 100%)";
const sidesMask = "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)";

function maskStyle(fadeSides?: boolean): React.CSSProperties {
  if (!fadeSides) return { WebkitMaskImage: photoMask, maskImage: photoMask };
  const both = `${photoMask}, ${sidesMask}`;
  return { WebkitMaskImage: both, maskImage: both, WebkitMaskComposite: "source-in", maskComposite: "intersect" };
}
const HALO_PAD = 420; // le halo (rayon 420 px) peut déborder de la ligne sans être coupé
const ROW_HEIGHT = 620; // hauteur desktop d'une ligne (px)
const PHOTO_SCALE = 1.2; // taille de la photo par rapport à sa colonne (1 = largeur de la colonne)

export default function ShowcaseRow({ item, index }: { item: ShowcaseItem; index: number }) {
  // Lignes paires : vidéo à gauche, client à droite. Lignes impaires : l'inverse.
  const videoFirst = index % 2 === 0;

  /* Effet de profondeur : la photo suit légèrement la souris + halo sous le curseur */
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const photoX = useTransform(sx, [0, 1], [-18, 18]);
  const photoY = useTransform(sy, [0, 1], [-10, 10]);
  // Halo en pixels sur un calque débordant de HALO_PAD px : le dégradé n'est jamais coupé par les bords de la ligne
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.6 });
  const spy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.6 });
  const haloX = useTransform(spx, (v) => `${v + HALO_PAD}px`);
  const haloY = useTransform(spy, (v) => `${v + HALO_PAD}px`);
  const hover = useSpring(0, { stiffness: 80, damping: 20 });
  const haloBg = useMotionTemplate`radial-gradient(420px circle at ${haloX} ${haloY}, rgba(110, 140, 255, 0.16), rgba(139, 92, 246, 0.06) 40%, transparent 70%)`;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };
  const handleEnter = () => hover.set(1);
  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    hover.set(0);
  };

  const photo = item.photo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: easeOutExpo }}
      className="relative"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Halo qui suit le curseur (desktop uniquement) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{ inset: -HALO_PAD, background: haloBg, opacity: hover }}
      />

      {/* ===== Desktop : vidéo d'un côté, client (photo + infos centrées sur le buste) de l'autre ===== */}
      <div
        className="relative z-10 hidden grid-cols-2 items-center gap-16 md:grid"
        style={{ minHeight: ROW_HEIGHT }}
      >
        <div className={`${videoFirst ? "order-1" : "order-2"} py-16`}>
          <VideoPanel item={item} />
        </div>

        <div className={`${videoFirst ? "order-2" : "order-1"} relative self-stretch`}>
          {photo ? (
            <motion.div className="absolute inset-0" style={{ x: photoX, y: photoY }}>
              {/* Photo contenue dans sa colonne : ne déborde ni sur la vidéo ni hors de la page */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2"
                style={{
                  width: `min(${PHOTO_SCALE * 100}%, ${Math.round((ROW_HEIGHT - 24) * photo.ratio)}px)`,
                  aspectRatio: photo.ratio,
                }}
              >
                {/* Lueur douce derrière la personne pour la détacher du fond noir */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 45% 50% at ${photo.bustX * 100}% 45%, rgba(90, 120, 255, 0.22), rgba(139, 92, 246, 0.10) 50%, transparent 75%)`,
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={item.client}
                  className="pointer-events-none relative h-full w-full select-none"
                  style={maskStyle(photo.fadeSides)}
                />
                <div
                  className="absolute -translate-x-1/2 whitespace-nowrap"
                  style={{ left: `${photo.bustX * 100}%`, bottom: `${(photo.textBottom ?? 0.03) * 100}%` }}
                >
                  <ClientInfo item={item} shine={sx} glow={hover} />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <ClientInfo item={item} shine={sx} glow={hover} />
            </div>
          )}
        </div>
      </div>

      {/* ===== Mobile : photo + infos, puis vidéo ===== */}
      <div className="flex flex-col gap-8 py-12 md:hidden">
        <div className="relative">
          {photo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo.src}
              alt={item.client}
              className="block w-full select-none"
              style={maskStyle(photo.fadeSides)}
            />
          )}
          <div className={photo ? "absolute inset-x-0 bottom-[6%]" : ""}>
            <ClientInfo item={item} shine={sx} glow={hover} />
          </div>
        </div>
        <VideoPanel item={item} />
      </div>
    </motion.div>
  );
}

export function ShowcaseDivider() {
  return (
    <div
      aria-hidden
      className="relative z-20 h-[3px] w-full rounded-full"
      style={{
        background: "linear-gradient(90deg, rgba(90,158,255,0.15), #7EB6FF 20%, #A8CFFF 50%, #7EB6FF 80%, rgba(90,158,255,0.15))",
        boxShadow: "0 0 18px rgba(126, 182, 255, 0.45)",
      }}
    />
  );
}
