import Link from "next/link";

/* Gabarit commun des pages légales : fond du site, texte lisible, retour à l'accueil */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-[760px] px-4 py-24 md:px-8 md:py-32">
      <Link
        href="/"
        className="text-[0.75rem] font-medium uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-light"
      >
        ← Retour au site
      </Link>

      <h1
        className="font-display mt-8 text-text-primary"
        style={{ fontSize: "var(--fs-h1)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
      >
        {title}
      </h1>
      <p className="mt-3 text-sm text-text-muted">Dernière mise à jour : {updated}</p>

      <div className="legal-content mt-12 flex flex-col gap-10 text-text-secondary">{children}</div>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-text-primary" style={{ fontSize: "var(--fs-h3)", lineHeight: 1.2 }}>
        {title}
      </h2>
      {children}
    </section>
  );
}
