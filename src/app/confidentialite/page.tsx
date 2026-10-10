import type { Metadata } from "next";
import LegalPage, { LegalSection } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Guerin.Editing",
  robots: { index: false },
};

const link = "text-accent hover:text-accent-light";

export default function Confidentialite() {
  return (
    <LegalPage title="Politique de confidentialité" updated="10 octobre 2026">
      <LegalSection title="Responsable du traitement">
        <p>
          Maxence Guerin (Guerin.Editing), Rue du Fosteau 36, 6530 Thuin, Belgique — BCE 1017.672.431 — {" "}
          <a href="mailto:max.monteur.video@gmail.com" className={link}>
            max.monteur.video@gmail.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Le site ne demande des données que lorsque vous remplissez le formulaire « Démarrer un projet » : nom, adresse
          e-mail, lien vers votre projet / chaîne / marque (facultatif), message (facultatif), ainsi que vos réponses au
          formulaire (type de projet, volume, délai).
        </p>
        <p>Aucun compte n&apos;est créé et aucune donnée bancaire n&apos;est collectée sur ce site.</p>
      </LegalSection>

      <LegalSection title="Finalité et base légale">
        <p>
          Ces données servent uniquement à répondre à votre demande, à préparer un devis et, le cas échéant, à organiser
          notre collaboration. Le traitement repose sur les mesures précontractuelles prises à votre demande (article 6.1.b du
          RGPD).
        </p>
        <p>Vos données ne sont jamais vendues, ni utilisées pour de la publicité.</p>
      </LegalSection>

      <LegalSection title="Destinataires et sous-traitants">
        <p>Vos données sont destinées à Maxence Guerin uniquement. Elles transitent par les prestataires techniques suivants :</p>
        <ul className="flex flex-col gap-1">
          <li>
            <strong className="text-text-primary">Web3Forms</strong> — transmission du formulaire par e-mail (
            <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className={link}>
              web3forms.com
            </a>
            ) ;
          </li>
          <li>
            <strong className="text-text-primary">Google (Gmail)</strong> — réception et stockage des e-mails ;
          </li>
          <li>
            <strong className="text-text-primary">Vercel Inc.</strong> — hébergement du site.
          </li>
        </ul>
        <p>
          Certains de ces prestataires sont situés hors de l&apos;Union européenne (notamment aux États-Unis). Ces transferts
          sont encadrés par les garanties prévues par le RGPD (décision d&apos;adéquation ou clauses contractuelles types de la
          Commission européenne).
        </p>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Les demandes qui n&apos;aboutissent pas à une collaboration sont conservées au maximum 3 ans après le dernier
          échange. En cas de collaboration, les données nécessaires sont conservées pendant la durée imposée par les
          obligations comptables et fiscales belges.
        </p>
      </LegalSection>

      <LegalSection title="Cookies et mesure d'audience">
        <p>
          Ce site n&apos;utilise ni cookies publicitaires, ni outil de mesure d&apos;audience, ni pixel de suivi. Aucun bandeau de
          consentement n&apos;est donc nécessaire.
        </p>
        <p>
          Une police de caractères est chargée depuis les serveurs de Google Fonts : à cette occasion, votre adresse IP est
          transmise à Google, comme pour toute ressource chargée depuis un serveur tiers.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous pouvez à tout moment demander l&apos;accès à vos données, leur rectification, leur effacement, la limitation du
          traitement, leur portabilité, ou vous opposer au traitement, en écrivant à{" "}
          <a href="mailto:max.monteur.video@gmail.com" className={link}>
            max.monteur.video@gmail.com
          </a>
          . Une réponse vous sera apportée dans un délai d&apos;un mois.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de
          l&apos;Autorité de protection des données, rue de la Presse 35, 1000 Bruxelles —{" "}
          <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" className={link}>
            autoriteprotectiondonnees.be
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
