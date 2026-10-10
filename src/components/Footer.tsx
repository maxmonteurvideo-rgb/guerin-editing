export default function Footer() {
  const socials = [
    { label: "INSTAGRAM", href: "https://www.instagram.com/guerin.editing/" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 px-4 py-12 text-center md:flex-row md:justify-between md:gap-0 md:px-8 md:text-left">
        <p className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-muted">
          &copy; {new Date().getFullYear()} Guerin Editing
          <span className="mx-2" aria-hidden>&middot;</span>
          <a href="/mentions-legales" className="transition-colors duration-200 hover:text-text-primary">
            Mentions légales
          </a>
          <span className="mx-2" aria-hidden>&middot;</span>
          <a href="/confidentialite" className="transition-colors duration-200 hover:text-text-primary">
            Confidentialité
          </a>
        </p>
        <nav className="flex gap-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-text-muted">
          {socials.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>&middot;</span>}
              <a
                href={link.href}
                {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
