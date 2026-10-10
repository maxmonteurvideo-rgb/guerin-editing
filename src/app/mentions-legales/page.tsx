import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Mentions légales — Guerin.Editing",
  robots: { index: false },
};

export default function MentionsLegales() {
  return (
    <LegalPage title="Mentions légales" updated="10 octobre 2026">
      <LegalSection title="Éditeur du site">
        <p>
          Le site guerin-editing.vercel.app est édité par <strong className="text-text-primary">Maxence Guerin</strong>,
          personne physique exerçant sous le nom commercial <strong className="text-text-primary">Guerin.Editing</strong>.
        </p>
        <ul className="flex flex-col gap-1">
          <li>Adresse : Rue du Fosteau 36, 6530 Thuin, Belgique</li>
          <li>Numéro d&apos;entreprise (BCE) : 1017.672.431</li>
          <li>TVA : régime particulier de la franchise des petites entreprises — TVA non applicable</li>
          <li>
            Contact :{" "}
            <a href="mailto:max.monteur.video@gmail.com" className="text-accent hover:text-accent-light">
              max.monteur.video@gmail.com
            </a>
          </li>
        </ul>
        <p>Responsable de la publication : Maxence Guerin.</p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-light">
            vercel.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          La structure du site, ses textes, son design et ses éléments graphiques sont la propriété de Maxence Guerin, sauf
          mention contraire. Toute reproduction, même partielle, sans autorisation écrite préalable est interdite.
        </p>
        <p>
          Les vidéos, noms, photos et logos des clients présentés dans le portfolio restent la propriété de leurs titulaires
          respectifs. Ils sont présentés à titre de références, avec leur accord. Toute demande de retrait peut être adressée à
          l&apos;adresse de contact ci-dessus.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          Les informations publiées sur ce site sont fournies à titre indicatif et peuvent être modifiées à tout moment. Les
          prestations, délais et tarifs font l&apos;objet d&apos;un devis personnalisé qui seul engage les parties.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Le traitement des données transmises via le formulaire de contact est décrit dans la{" "}
          <a href="/confidentialite" className="text-accent hover:text-accent-light">
            politique de confidentialité
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>Le présent site et ses mentions légales sont régis par le droit belge.</p>
      </LegalSection>
    </LegalPage>
  );
}
