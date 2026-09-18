/**
 * Petits comportements partagés par toutes les pages.
 * Rien d'essentiel ici : si ce fichier ne se charge pas, le site reste lisible.
 */

/** Écrit l'année courante dans le pied de page (plus besoin d'y penser en janvier). */
export function initFooterYear() {
  const slot = document.querySelector("[data-year]");
  if (slot) slot.textContent = new Date().getFullYear();
}

/** Ajoute une classe à l'en-tête dès qu'on quitte le haut de la page. */
export function initHeaderScroll() {
  const header = document.querySelector(".topbar");
  if (!header) return;

  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/**
 * Souligne dans la navigation le lien de la section actuellement à l'écran.
 * IntersectionObserver prévient quand une section entre ou sort du cadre :
 * bien plus économe qu'un calcul de position à chaque pixel de défilement.
 */
export function initScrollSpy() {
  const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
  if (!links.length) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    // La zone de détection ne couvre qu'une bande au milieu de l'écran :
    // une seule section peut donc être "active" à la fois.
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/** Tout brancher d'un coup. */
export function initUI() {
  initFooterYear();
  initHeaderScroll();
  initScrollSpy();
}
