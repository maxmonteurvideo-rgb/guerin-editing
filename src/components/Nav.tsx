"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Projets", href: "#projets" },
  { label: "Brief", href: "#brief" },
  { label: "FAQ", href: "#faq" },
] as const;

const NAV_CARDS = [
  {
    label: "Portfolio",
    links: [
      { label: "SaaS Project", href: "#projets" },
      { label: "VSL Project", href: "#projets" },
      { label: "Instagram Ads", href: "#projets" },
      { label: "YouTube Long Format", href: "#projets" },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "Montage vidéo", href: "#brief" },
      { label: "Motion design", href: "#brief" },
      { label: "Short format", href: "#brief" },
    ],
  },
  {
    label: "Contact",
    links: [
      { label: "Démarrer un projet", href: "#brief" },
      { label: "FAQ", href: "#faq" },
    ],
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isExpanded]);

  const calculateHeight = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return 320;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const prev = {
          visibility: contentEl.style.visibility,
          pointerEvents: contentEl.style.pointerEvents,
          position: contentEl.style.position,
          height: contentEl.style.height,
        };
        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";
        void contentEl.offsetHeight;
        const h = 60 + contentEl.scrollHeight + 16;
        contentEl.style.visibility = prev.visibility;
        contentEl.style.pointerEvents = prev.pointerEvents;
        contentEl.style.position = prev.position;
        contentEl.style.height = prev.height;
        return h;
      }
    }
    return 320;
  }, []);

  const createTimeline = useCallback(() => {
    const navEl = navRef.current;
    if (!navEl) return null;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cards, { y: 40, opacity: 0 });
    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: calculateHeight, duration: 0.4, ease: "power3.out" });
    tl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 }, "-=0.1");
    return tl;
  }, [calculateHeight]);

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => { tl?.kill(); tlRef.current = null; };
  }, [createTimeline]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        gsap.set(navRef.current, { height: calculateHeight() });
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) { newTl.progress(1); tlRef.current = newTl; }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) tlRef.current = newTl;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded, calculateHeight, createTimeline]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const closeMenu = () => {
    if (!isExpanded) return;
    const tl = tlRef.current;
    if (!tl) return;
    setIsOpen(false);
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
    tl.reverse();
  };

  return (
    <div className="sticky top-0 z-50 w-full px-4 md:px-8 pt-3">
      <nav
        ref={navRef}
        className="mx-auto max-w-[1200px] rounded-2xl transition-colors duration-300"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: scrolled
            ? "0 0 30px rgba(100, 180, 255, 0.08)"
            : "0 0 20px rgba(100, 180, 255, 0.04)",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 md:px-6" style={{ height: 60 }}>
          <a
            href="/"
            className="font-display text-text-primary transition-opacity duration-200 hover:opacity-80"
            style={{ fontSize: "var(--fs-h3)" }}
          >
            GUERIN EDITING
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-muted transition-colors duration-200 hover:text-text-primary"
                style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#brief"
              className="hidden md:inline-block rounded-lg px-5 py-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-200 hover:opacity-90"
              style={{ backgroundColor: "#7EB6FF", color: "#000000" }}
            >
              Contact
            </a>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="relative w-6 h-6 flex flex-col justify-center items-center gap-[5px] cursor-pointer"
              onClick={toggleMenu}
            >
              <span
                className="block h-[2px] w-6 bg-text-primary transition-transform duration-300 origin-center"
                style={isOpen ? { transform: "translateY(3.5px) rotate(45deg)" } : undefined}
              />
              <span
                className="block h-[2px] w-6 bg-text-primary transition-all duration-300 origin-center"
                style={isOpen ? { opacity: 0, transform: "scaleX(0)" } : undefined}
              />
              <span
                className="block h-[2px] w-6 bg-text-primary transition-transform duration-300 origin-center"
                style={isOpen ? { transform: "translateY(-3.5px) rotate(-45deg)" } : undefined}
              />
            </button>
          </div>
        </div>

        {/* Expandable card content */}
        <div
          className="card-nav-content px-5 md:px-6 pb-5"
          style={{
            visibility: isExpanded ? "visible" : "hidden",
            pointerEvents: isExpanded ? "auto" : "none",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
            {NAV_CARDS.map((card, idx) => (
              <div
                key={card.label}
                ref={(el) => { cardsRef.current[idx] = el; }}
                className="rounded-xl p-5"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <p
                  className="text-text-muted uppercase mb-3"
                  style={{ fontSize: "0.65rem", letterSpacing: "0.12em", fontWeight: 600 }}
                >
                  {card.label}
                </p>
                <div className="flex flex-col gap-2">
                  {card.links.map((lnk) => (
                    <a
                      key={lnk.label}
                      href={lnk.href}
                      onClick={closeMenu}
                      className="flex items-center gap-2 text-text-primary text-sm font-light transition-colors duration-150 hover:text-accent"
                    >
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-50">
                        <path d="M4 12L12 4M12 4H5M12 4v7" />
                      </svg>
                      {lnk.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
