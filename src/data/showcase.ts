export type ShowcaseFormat = "landscape" | "portrait";

export interface ShowcaseClip {
  src: string;
  poster: string;
  format: ShowcaseFormat;
}

export interface ShowcaseItem {
  id: number;
  /** Nom du client / de la chaîne */
  client: string;
  /** Nombre d'abonnés affiché, ex. "1,2M" — laisser vide tant qu'il n'est pas vérifié */
  subscribers: string;
  /** Plateforme affichée sous le nombre, ex. "abonnés YouTube" */
  platform: string;
  /** Type de travail réalisé, ex. "Montage long format · Motion" */
  work: string;
  /**
   * Photo détourée du client (PNG/WebP transparent), dans /public/clients — affichée en fond de la ligne.
   * ratio = largeur / hauteur de l'image ; bustX = position horizontale du buste (0 = bord gauche, 1 = bord droit)
   * textBottom = hauteur du bloc texte depuis le bas de la photo (0.03 par défaut)
   * fadeSides = estompe les bords gauche/droit (photo recadrée dont les côtés sont coupés)
   */
  photo: { src: string; ratio: number; bustX: number; textBottom?: number; fadeSides?: boolean } | null;
  /** Extrait vidéo compressé, dans /public/videos — null = placeholder */
  video: string | null;
  poster: string | null;
  /** landscape = 16:9 (YouTube), portrait = 9:16 (short / ad) */
  format: ShowcaseFormat;
  /** Plusieurs vidéos empilées qui tournent l'une derrière l'autre (remplace video/poster/format) */
  clips?: ShowcaseClip[];
}

// Ordre = ordre d'affichage. Les lignes alternent automatiquement gauche / droite.
export const showcase: ShowcaseItem[] = [
  {
    id: 1,
    client: "Yomi Denzel",
    subscribers: "2,50M",
    platform: "abonnés cumulés",
    work: "Ads · Motion ultra dynamique",
    photo: { src: "/clients/client-1.webp", ratio: 1310 / 1200, bustX: 0.52 },
    video: "/videos/ad-yomi.mp4",
    poster: "/videos/ad-yomi.jpg",
    format: "portrait",
  },
  {
    id: 2,
    client: "Baptiste IA",
    subscribers: "25K",
    platform: "abonnés",
    work: "Automate IA",
    photo: { src: "/clients/client-2.webp", ratio: 910 / 941, bustX: 0.5, textBottom: 0.15, fadeSides: true },
    video: null,
    poster: null,
    format: "portrait",
    clips: [
      { src: "/videos/ia-ytb.mp4", poster: "/videos/ia-ytb.jpg", format: "landscape" },
      { src: "/videos/ia-short.mp4", poster: "/videos/ia-short.jpg", format: "portrait" },
    ],
  },
  {
    id: 3,
    client: "Manael Posing",
    subscribers: "100K",
    platform: "abonnés",
    work: "VSL · Montage & Motion",
    photo: { src: "/clients/client-3.webp", ratio: 1287 / 1222, bustX: 0.5, fadeSides: true },
    video: "/videos/vsl-manael-2.mp4",
    poster: "/videos/vsl-manael-2.jpg",
    format: "landscape",
  },
];
