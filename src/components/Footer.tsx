export default function Footer() {
  const socials = [
    { label: "INSTAGRAM", href: "#" },
    { label: "YOUTUBE", href: "#" },
    { label: "LINKEDIN", href: "#" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:justify-between md:gap-0 md:px-8 md:text-left">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-muted">
          &copy; 2025 Guerin Editing
        </p>
        <nav className="flex gap-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-muted">
          {socials.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>&middot;</span>}
              <a
                href={link.href}
                className="transition-colors duration-200 hover:text-text-primary"
              >
                {link.label}
              </a>
            </span>
          ))}
        </nav>
        <a
          href="mailto:max.monteur.video@gmail.com"
          className="text-sm text-accent transition-colors duration-200 hover:text-accent-light"
        >
          max.monteur.video@gmail.com
        </a>
      </div>
    </footer>
  );
}
