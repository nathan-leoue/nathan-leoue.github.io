/**
 * Toutes les chaînes de texte du site, en français et en anglais.
 *
 * Règle simple : une clé = un texte. On garde la même liste de clés dans `fr`
 * et dans `en`. Si une clé manque en anglais, le moteur (js/i18n.js) affiche
 * automatiquement la version française plutôt que de laisser un trou.
 *
 * Les clés sont nommées "zone.element" pour s'y retrouver :
 *   nav.*      -> barre de navigation
 *   hero.*     -> première section de la page d'accueil
 *   fetch.*    -> encadré "neofetch" du hero
 *   about.*    -> section À propos
 *   skills.*   -> section Compétences
 *   projects.* -> sections projets (accueil + page projets)
 *   certs.*    -> section Certifications
 *   contact.*  -> section Contact
 *   footer.*   -> pied de page
 *   a11y.*     -> textes lus par les lecteurs d'écran uniquement
 */
export const TRANSLATIONS = {
  fr: {
    // --- Méta (titre de l'onglet, description pour Google / partages) ---
    "meta.title": "Nathan Leoue — Développement web & systèmes",
    "meta.description":
      "Portfolio de Nathan Leoue, étudiant en BTS SIO en Île-de-France : développement web, systèmes Linux et cybersécurité.",
    "meta.titleProjects": "Projets — Nathan Leoue",

    // --- Navigation ---
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.certs": "Certifications",
    "nav.contact": "Contact",
    "nav.cv": "CV",
    "nav.home": "Accueil",
    "nav.backHome": "Retour à l'accueil",

    // --- Hero ---
    "hero.role": "Étudiant en BTS SIO, en recherche d'alternance.",
    "hero.pitch":
      "Je construis des choses qui tournent d'abord chez moi : un serveur maison, un bot Discord en IA locale, des outils pour mon propre environnement. Ce qui m'intéresse, c'est de comprendre le fonctionnement des outils que j'utilise.",
    "hero.ctaProjects": "Voir mes projets",
    "hero.ctaCv": "Télécharger mon CV",

    // --- Encadré "fastfetch" ---
    "fetch.formation": "formation",
    "fetch.formationValue": "BTS SIO — Île-de-France",
    "fetch.focus": "alternance",
    "fetch.focusValue": "Informatique",
    "fetch.system": "système",
    "fetch.systemValue": "Linux · Fedora · Neovim",
    "fetch.now": "en ce moment",
    "fetch.nowValue": "Home lab, IA locale, CTF",
    "fetch.contact": "contact",

    // --- À propos ---
    "about.title": "À propos",
    "about.p1":
      "Passionné d'informatique depuis l'enfance, j'ai commencé par démonter des PC et bidouiller des configs bien avant d'en faire mes études. Aujourd'hui je suis en BTS SIO en Île-de-France, en recherche d'alternance.",
    "about.p2":
      "Au quotidien je travaille sous Linux, dans un environnement que je configure entièrement à la main : gestionnaire de fenêtres, éditeur, terminal, thème. Ça ne sert pas qu'à faire joli, c'est un boost de productivité et c'est comme ça que j'apprends. Je préfère passer trois heures à comprendre pourquoi quelque chose casse plutôt que de coller une solution trouvée en ligne.",

    // --- Compétences ---
    "skills.title": "Compétences",
    "skills.count": "{n} domaines",
    "skills.dev": "Développement",
    "skills.devNote": "Web, back-end et bases de données",
    "skills.sys": "Systèmes & réseau",
    "skills.sysNote": "Auto-hébergement, Linux, infrastructure",
    "skills.tools": "Outils & pratiques",
    "skills.toolsNote": "Ce que j'utilise tous les jours",

    // --- Projets ---
    "projects.title": "Projets",
    "projects.homeIntro": "Mes réalisations les plus récentes.",
    "projects.seeAll": "Tous les projets",
    "projects.pageIntro":
      "Chaque projet est né d'un besoin réel : un service à héberger, un outil qui n'existait pas, ou juste l'envie de comprendre comment ça marche.",
    "projects.filterAll": "Tout",
    "projects.filterLabel": "Filtrer par technologie",
    "projects.empty": "Aucun projet ne correspond à ce filtre.",
    "projects.countOne": "1 projet",
    "projects.countMany": "{n} projets",
    "projects.github": "Voir sur GitHub",
    "projects.details": "En savoir plus",
    "projects.close": "Fermer",
    "projects.stack": "Technologies",

    // --- Certifications ---
    "certs.title": "Certifications",
    "certs.intro": "Les certifications que j'ai passées ou que je prépare.",
    "certs.empty": "Aucune certification à afficher pour le moment.",
    "certs.status.obtained": "Obtenue",
    "certs.status.progress": "En cours",
    "certs.status.planned": "Prévue",
    "certs.view": "Voir le justificatif",

    // --- Contact ---
    "contact.title": "Contact",
    "contact.intro":
      "Une alternance, un projet, ou juste une question ? Écrivez-moi, je réponds.",
    "contact.email": "E-mail",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.cv": "Mon CV",
    "contact.cvValue": "Télécharger le PDF",

    // --- Pied de page ---
    "footer.rights": "Tous droits réservés.",
    "footer.built": "",
    "footer.top": "Haut de page",

    // --- Page 404 ---
    "notfound.title": "Page introuvable",
    "notfound.text": "Cette adresse ne mène nulle part. Le lien est peut-être cassé, ou la page a été déplacée.",


    // --- Libellés de technologies ---------------------------------------
    // Une clé "tag.X" n'est nécessaire QUE si la technologie se dit
    // différemment en français et en anglais. Sinon (Python, Linux, Git…)
    // le nom brut du tag est affiché tel quel.
    "tag.Self-hosting": "Auto-hébergement",
    "tag.Local AI": "IA locale",
    "tag.Cybersecurity": "Cybersécurité",
    "tag.Networking": "Réseau",

    // --- Accessibilité ---
    "a11y.skip": "Aller au contenu",
    "a11y.langGroup": "Choisir la langue",
    "a11y.nav": "Navigation principale",
    "a11y.avatar": "Photo de profil de Nathan Leoue",
    "a11y.projectImage": "Aperçu du projet",
  },

  en: {
    "meta.title": "Nathan Leoue — Web development & systems",
    "meta.description":
      "Portfolio of Nathan Leoue, BTS SIO student near Paris: web development, Linux systems and cybersecurity.",
    "meta.titleProjects": "Projects — Nathan Leoue",

    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.certs": "Certifications",
    "nav.contact": "Contact",
    "nav.cv": "Resume",
    "nav.home": "Home",
    "nav.backHome": "Back to home",

    "hero.role": "BTS SIO student, searching for an apprenticeship.",
    "hero.pitch":
      "I build things that run at home first: a self-hosted server, a Discord bot powered by a local LLM, small tools for my own setup. What I'm really after is understanding what happens under the hood.",
    "hero.ctaProjects": "See my projects",
    "hero.ctaCv": "Download my resume",

    "fetch.formation": "studies",
    "fetch.formationValue": "BTS SIO — Île-de-France, France",
    "fetch.focus": "work-study",
    "fetch.focusValue": "IT",
    "fetch.system": "daily driver",
    "fetch.systemValue": "Linux · Fedora · Neovim",
    "fetch.now": "right now",
    "fetch.nowValue": "Home lab, local AI, CTFs",
    "fetch.contact": "contact",

    "about.title": "About",
    "about.p1":
      "I've been into computers since I was a kid, taking PCs apart and messing with configs long before it became my degree. I'm now a BTS SIO student in the Paris area, searching for an apprenticeship.",
    "about.p2":
      "I work on Linux every day, in an environment I configure entirely by hand: window manager, editor, terminal, theme. It isn't only about looks, it's how I learn. I'd rather spend three hours figuring out why something breaks than paste in a fix I found online.",

    "skills.title": "Skills",
    "skills.count": "{n} areas",
    "skills.dev": "Development",
    "skills.devNote": "Web, back-end and databases",
    "skills.sys": "Systems & networking",
    "skills.sysNote": "Self-hosting, Linux, infrastructure",
    "skills.tools": "Tools & practices",
    "skills.toolsNote": "What I use every day",

    "projects.title": "Projects",
    "projects.homeIntro": "My most recent work.",
    "projects.seeAll": "All projects",
    "projects.pageIntro":
      "Every project started from a real need: a service to host, a tool that didn't exist, or simply wanting to know how something works.",
    "projects.filterAll": "All",
    "projects.filterLabel": "Filter by technology",
    "projects.empty": "No project matches this filter.",
    "projects.countOne": "1 project",
    "projects.countMany": "{n} projects",
    "projects.github": "View on GitHub",
    "projects.details": "Read more",
    "projects.close": "Close",
    "projects.stack": "Built with",

    "certs.title": "Certifications",
    "certs.intro": "Certifications I've earned or I'm currently preparing.",
    "certs.empty": "No certification to show yet.",
    "certs.status.obtained": "Earned",
    "certs.status.progress": "In progress",
    "certs.status.planned": "Planned",
    "certs.view": "View credential",

    "contact.title": "Contact",
    "contact.intro":
      "An apprenticeship, a project, or just a question ? Drop me a line, I answer.",
    "contact.email": "Email",
    "contact.github": "GitHub",
    "contact.linkedin": "LinkedIn",
    "contact.cv": "Resume",
    "contact.cvValue": "Download the PDF",

    "footer.rights": "All rights reserved.",
    "footer.built": "",
    "footer.top": "Back to top",

    "notfound.title": "Page not found",
    "notfound.text": "This address leads nowhere. The link may be broken, or the page has moved.",


    // --- Libellés de technologies ---------------------------------------
    "tag.Self-hosting": "Self-hosting",
    "tag.Local AI": "Local AI",
    "tag.Cybersecurity": "Cybersecurity",
    "tag.Networking": "Networking",
    "a11y.skip": "Skip to content",
    "a11y.langGroup": "Choose a language",
    "a11y.nav": "Main navigation",
    "a11y.avatar": "Profile picture of Nathan Leoue",
    "a11y.projectImage": "Project preview",
  },
};
