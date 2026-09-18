/**
 * Liste des projets affichés sur le site.
 *
 * Les projets sont triés automatiquement du plus récent au plus ancien
 * (voir js/cards.js -> sortByDate), donc l'ordre dans ce tableau n'a
 * aucune importance
 *
 * Champs d'un projet :
 *   id          (obligatoire) identifiant unique, en minuscules-avec-tirets
 *   title       (obligatoire) { fr, en } titre affiché
 *   description (obligatoire) { fr, en } résumé court, 1 à 2 phrases (carte)
 *   details     (optionnel)   { fr, en } texte long affiché dans la fiche détaillée
 *   tags        (obligatoire) tableau de technologies — sert aussi aux filtres
 *   date        (obligatoire) "AAAA-MM", utilisée pour le tri et l'affichage
 *   url         (optionnel)   lien GitHub ou démo ; si absent, le bouton disparaît
 *   image       (optionnel)   chemin depuis la racine du site ; si absent, une
 *                             vignette de repli est affichée
 */
export const PROJECTS = [
  {
    id: "home-lab",
    title: {
      fr: "Home lab — NAS sur un netbook recyclé",
      en: "Home lab — NAS on a recycled netbook",
    },
    description: {
      fr: "Serveur auto-hébergé monté sur un vieux Samsung NC10 : Debian 12, Pi-hole, Syncthing et accès SSH.",
      en: "Self-hosted server running on an old Samsung NC10: Debian 12, Pi-hole, Syncthing and SSH access.",
    },
    details: {
      fr: "L'idée de départ : voir jusqu'où on peut pousser une machine de 2008 plutôt que d'acheter un NAS tout fait. Le netbook tourne sous Debian 12 sans interface graphique, avec Pi-hole pour filtrer les requêtes DNS du réseau, Syncthing pour synchroniser mes fichiers entre mes machines, et un accès SSH pour tout administrer à distance. C'est le projet qui m'a le plus appris : partitionnement, services systemd, permissions, sauvegardes et diagnostic quand quelque chose ne démarre plus.",
      en: "The starting point: see how far a 2008 machine can be pushed instead of buying an off-the-shelf NAS. The netbook runs headless Debian 12, with Pi-hole filtering DNS requests across the network, Syncthing keeping my files in sync between machines, and SSH access to administer everything remotely. It's the project that taught me the most: partitioning, systemd services, permissions, backups, and troubleshooting when a service refuses to start.",
    },
    tags: ["Linux", "NAS", "Self-hosting"],
    date: "2026-05",
    url: "https://github.com/nathan-leoue/Serveur-home-lab",
    image: "assets/projects/server.jpg",
  },
  {
    id: "mei-bot",
    title: {
      fr: "Mei — bot Discord en IA locale",
      en: "Mei — Discord bot with a local LLM",
    },
    description: {
      fr: "Bot Discord alimenté par Ollama et Mistral, avec un historique par salon et une mémoire par utilisateur.",
      en: "Discord bot powered by Ollama and Mistral, with per-channel history and per-user memory.",
    },
    details: {
      fr: "Mei tourne entièrement en local : le modèle Mistral est servi par Ollama sur ma machine, donc aucune conversation ne part chez un fournisseur externe. Le bot garde un historique séparé par salon pour rester cohérent dans une discussion, et une mémoire par utilisateur pour se souvenir de qui lui parle. Le vrai défi n'était pas l'appel au modèle mais la gestion du contexte : décider quoi garder, quoi résumer et quoi jeter pour ne pas dépasser la fenêtre de contexte.",
      en: "Mei runs entirely locally: the Mistral model is served by Ollama on my own machine, so no conversation ever leaves it. The bot keeps a separate history per channel to stay coherent inside a discussion, plus a per-user memory so it remembers who it's talking to. The real challenge wasn't calling the model but managing context: deciding what to keep, what to summarise and what to drop so the context window never overflows.",
    },
    tags: ["Python", "Local AI"],
    date: "2026-03",
    url: "https://github.com/nathan-leoue",
    image: "assets/projects/mei.jpg",
  },
  {
    id: "rainmeter-widgets",
    title: {
      fr: "Widgets de bureau",
      en: "Desktop widgets",
    },
    description: {
      fr: "Trois widgets minimalistes pour le bureau Windows, développés avec Rainmeter : compteurs en direct et boutons interactifs.",
      en: "Three minimal widgets for the Windows desktop, built with Rainmeter: live counters and interactive buttons.",
    },
    details: {
      fr: "Premier vrai projet d'interface : trois widgets Rainmeter en verre dépoli qui affichent des éléments système en direct (heure, date, media-player) et réagissent au clic. Le comportement est écrit en Lua, le reste en configuration Rainmeter. C'est là que j'ai compris la différence entre « ça marche » et « c'est agréable à utiliser » : l'alignement au pixel près, les états de survol et la lisibilité sur n'importe quel fond d'écran m'ont pris plus de temps que la logique elle-même.",
      en: "My first real interface project: three frosted-glass Rainmeter widgets showing live system elements (time, date, media-player) and reacting to clicks. Behaviour is written in Lua, the rest in Rainmeter config. This is where I understood the gap between \"it works\" and \"it's pleasant to use\": pixel alignment, hover states and staying readable on any wallpaper took me longer than the logic itself.",
    },
    tags: ["Lua", "Rainmeter", "Windows", "UI"],
    date: "2025-06",
    url: "https://github.com/nathan-leoue/Rainmeter-widgets",
    image: "assets/projects/widgets.jpg",
  },
];
