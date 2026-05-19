export interface HorizontalProject {
  id: number;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  detail: {
    brief: string;
    constraints: string;
    approach: string;
    benefits: string[];
  };
}

export interface VerticalProject {
  id: number;
  name: string;
  label: string;
  videoUrl: string;
}

export const horizontalProjects: HorizontalProject[] = [
  {
    id: 1,
    name: "Animation SaaS",
    category: "SAAS PROJECT",
    thumbnail: "/images/thmbn_SaaS.png",
    videoUrl: "https://www.youtube.com/embed/ZT1CTp-8Zc4",
    description: "Motion design pour interfaces et produits SaaS",
    detail: {
      brief:
        "La startup avait besoin d'une série de vidéos pour le lancement de sa plateforme B2B : une vidéo hero pour la landing page, une démo produit de 2 minutes, et 3 teasers pour les réseaux sociaux.",
      constraints:
        "Délai serré de 3 semaines avant le lancement. Pas de footage réel disponible — tout devait être construit à partir de screen recordings et de motion design. La charte graphique existante était minimaliste, il fallait créer du dynamisme sans trahir l'identité.",
      approach:
        "J'ai opté pour un montage rythmé avec des transitions fluides entre les écrans produit, en utilisant du motion design pour guider l'oeil sur les fonctionnalités clés. Chaque vidéo a été pensée pour fonctionner de manière autonome tout en formant un ensemble cohérent.",
      benefits: [
        "Taux de conversion landing page +34% après intégration de la vidéo hero",
        "Les teasers ont généré 2x plus d'engagement que les posts statiques",
        "Livrables réutilisables pour les campagnes paid media",
      ],
    },
  },
  {
    id: 2,
    name: "VSL & Ads",
    category: "VSL PROJECT",
    thumbnail: "/images/thmbn_manael.png",
    videoUrl: "https://www.youtube.com/embed/4vpvWlgDoCc",
    description: "Video Sales Letters haute conversion",
    detail: {
      brief:
        "Créer une VSL pour un coach spécialisé en posing bodybuilding. L'objectif : vendre une formation en ligne sur les techniques de posing pour compétiteurs. Le script existait déjà, il fallait le transformer en une vidéo qui capte l'attention et pousse à l'achat.",
      constraints:
        "La VSL devait convertir un public très niche — des compétiteurs bodybuilding et des aspirants qui veulent maîtriser leur posing sur scène. Le budget ne permettait pas de tournage studio, tout devait être construit en post-production à partir de rushs existants. Le ton devait inspirer confiance et ambition, sans tomber dans le fitness générique.",
      approach:
        "Montage dynamique calé sur l'énergie de la compétition. Utilisation de motion graphics pour mettre en avant les points clés de la méthode. Jeu sur les ralentis et les plans de scène pour créer une tension visuelle. Structure narrative : frustration du posing raté → solution → transformation → offre.",
      benefits: [
        "Taux de rétention de 58% sur la durée totale de la VSL",
        "Taux de conversion de 3.8% (moyenne secteur formation : 1.5-2%)",
        "Réutilisée comme base pour 2 lancements successifs",
      ],
    },
  },
  {
    id: 3,
    name: "Finance & Crypto",
    category: "FINANCE & YOUTUBE",
    thumbnail: "/images/thmbn_finary.png",
    videoUrl: "https://www.youtube.com/embed/-2_bqFVJmO8",
    description: "Habillage et motion pour la finance",
    detail: {
      brief:
        "Démonstration de motion design pour le secteur financier, inspiré des codes visuels des meilleures chaînes finance francophones. L'objectif : montrer qu'un contenu financier peut être visuellement premium sans sacrifier la clarté du propos.",
      constraints:
        "La finance est un secteur où la crédibilité visuelle est non-négociable. Trop d'effets et on perd le sérieux. Pas assez et on ressemble à un PowerPoint filmé. L'autre défi : rendre des concepts abstraits (courbes de marché, données chiffrées, indicateurs) lisibles et engageants en quelques secondes à l'écran.",
      approach:
        "Habillage graphique inspiré des interfaces de trading et des dashboards financiers. Animation de données en temps réel : graphiques qui se construisent, chiffres qui comptent, indicateurs qui apparaissent en couches. Éclairage et color grading sombre et bleuté pour renforcer le côté tech/finance. Chaque animation sert la compréhension, jamais la décoration.",
      benefits: [
        "Pièce de démonstration portfolio pour le secteur finance",
        "Approche réutilisable pour tout contenu finance, crypto ou fintech",
        "Format adaptable : YouTube long, shorts, publicités",
      ],
    },
  },
  {
    id: 4,
    name: "Documentary Style",
    category: "YOUTUBE LONG FORMAT",
    thumbnail: "/images/thmbn_documentary.png",
    videoUrl: "https://www.youtube.com/embed/AZfNonZ12Yo",
    description: "Montage narratif et storytelling visuel",
    detail: {
      brief:
        "Extrait de démonstration en style documentaire narratif, inspiré des codes visuels des chaînes YouTube à plusieurs millions d'abonnés. Le format : un montage court de 20 secondes retraçant un moment clé de la Seconde Guerre mondiale, conçu pour montrer la maîtrise du style documentary editing le plus viral du marché actuellement.",
      constraints:
        "Le documentary style exige une précision chirurgicale dans le rythme. Chaque plan doit servir le récit. Les archives visuelles doivent être retravaillées, colorisées et intégrées dans un univers visuel cohérent. Le tout en 20 secondes — ce qui veut dire que chaque frame compte et qu'il n'y a aucune place pour le remplissage.",
      approach:
        "Montage narratif calqué sur les codes des documentaires premium YouTube. Travail de compositing sur les images d'archives : color grading cinématique, ajout de profondeur et de textures. Typographie intégrée à l'image pour contextualiser sans voix off. Sound design immersif pour renforcer la tension dramatique. Transitions fluides qui servent le storytelling plutôt que l'esthétique.",
      benefits: [
        "Pièce de démonstration portfolio pour le format documentaire narratif",
        "Style directement applicable aux chaînes YouTube histoire, géopolitique, business",
        "Format scalable : de l'extrait 20s au documentaire long format 30min+",
      ],
    },
  },
];

export const verticalProjects: VerticalProject[] = [
  { id: 1, name: "Daily Reel #1", label: "INSTAGRAM", videoUrl: "/videos/reel-1.mp4" },
  { id: 2, name: "Daily Reel #2", label: "INSTAGRAM", videoUrl: "/videos/reel-2.mp4" },
  { id: 3, name: "Daily Reel #3", label: "INSTAGRAM", videoUrl: "/videos/reel-3.mp4" },
];

export const orbitalProjects = [
  { name: "SaaS Product", category: "SaaS" },
  { name: "VSL Performance", category: "VSL" },
  { name: "Finance Report", category: "Finance" },
  { name: "Documentary", category: "Documentary" },
];

export const faqItems = [
  {
    question: "Quels sont vos délais de livraison ?",
    answer:
      "En moyenne 5 à 10 jours ouvrés selon la complexité du projet. Les formats courts (Reels, TikTok) sont livrés en 3-5 jours. Pour les urgences, un supplément s'applique.",
  },
  {
    question: "Comment se déroule une collaboration ?",
    answer:
      "On commence par un appel de 20 minutes pour cadrer le projet. Je vous envoie ensuite un devis détaillé. Une fois validé, je travaille sur un premier jet que vous pouvez réviser. Deux tours de corrections sont inclus.",
  },
  {
    question: "Quels formats de fichiers acceptez-vous ?",
    answer:
      "Je travaille avec tous les formats standards : MP4, MOV, ProRes. Pour le motion design, je livre en MP4 H.264 pour le web et ProRes 4444 si vous avez besoin de la version haute qualité.",
  },
  {
    question: "Travaillez-vous avec des marques internationales ?",
    answer:
      "Oui, je travaille régulièrement avec des clients francophones et anglophones. La communication se fait en français ou en anglais selon votre préférence.",
  },
  {
    question: "Proposez-vous des packs ou abonnements ?",
    answer:
      "Oui, pour les clients avec un besoin récurrent (contenu social, YouTube régulier), je propose des formules mensuelles adaptées à votre volume. On en discute lors du premier appel.",
  },
];
