/**
 * Liste des certifications affichées sur la page d'accueil.
 *
 * Champs d'une certification :
 *   id        (obligatoire) identifiant unique
 *   title     (obligatoire) { fr, en } nom de la certification
 *   issuer    (obligatoire) organisme qui la délivre (texte simple)
 *   status    (obligatoire) "obtained" | "progress" | "planned"
 *   date      (optionnel)   "AAAA-MM" — date d'obtention, ou date visée
 *   url       (optionnel)   lien vers le justificatif ; si absent, pas de lien
 *   skills    (optionnel)   tableau de mots-clés affichés sous le titre
 */
export const CERTIFICATIONS = [
  {
    id: "exemple-ccna-itn",
    title: {
      fr: "CCNA — Introduction aux réseaux",
      en: "CCNA — Introduction to Networks",
    },
    issuer: "Cisco Networking Academy",
    status: "planned",
    date: "2026-12",
    url: "",
    skills: ["Réseau", "TCP/IP", "VLAN"],
  },
  {
    id: "exemple-pix",
    title: {
      fr: "Pix — compétences numériques",
      en: "Pix — digital skills",
    },
    issuer: "Pix",
    status: "obtained",
    date: "2026-03",
    url: "",
    skills: ["Sécurité", "Données", "Bureautique"],
  },
  {
    id: "exemple-toeic",
    title: {
      fr: "TOEIC Listening & Reading",
      en: "TOEIC Listening & Reading",
    },
    issuer: "ETS Global",
    status: "planned",
    date: "2027-05",
    url: "",
    skills: ["Anglais"],
  },
];
