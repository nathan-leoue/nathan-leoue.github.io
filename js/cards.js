/**
 * Fabrique les blocs répétitifs du site : cartes de projets, lignes de
 * certifications et fiche détaillée (la fenêtre qui s'ouvre par-dessus la page).
 *
 * Tout est regroupé ici pour qu'un même projet s'affiche exactement pareil sur
 * l'accueil et sur la page Projets : une seule fonction à corriger si besoin.
 */

import { t, pick, formatDate, tagLabel } from "./i18n.js";

/* ------------------------------------------------------------------ *
 * Utilitaires
 * ------------------------------------------------------------------ */

/**
 * Neutralise les caractères qui auraient un sens en HTML.
 * Les données viennent de mes propres fichiers, mais prendre l'habitude
 * d'échapper évite les mauvaises surprises le jour où elles viendront d'ailleurs.
 */
export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Copie triée du plus récent au plus ancien (sans modifier le tableau d'origine). */
export function sortByDate(list) {
  return [...list].sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

/** Toutes les technologies utilisées, sans doublon, par ordre alphabétique. */
export function collectTags(projects) {
  const tags = new Set();
  projects.forEach((project) => project.tags?.forEach((tag) => tags.add(tag)));
  return [...tags].sort((a, b) => a.localeCompare(b));
}

function tagListHtml(tags = []) {
  return tags.map((tag) => `<li class="tag">${esc(tagLabel(tag))}</li>`).join("");
}

/* ------------------------------------------------------------------ *
 * Carte de projet
 * ------------------------------------------------------------------ */

export function projectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.tags = (project.tags || []).join("|");

  const visual = project.image
    ? `<img src="${esc(project.image)}" alt="${esc(pick(project.title))}" loading="lazy" decoding="async">`
    : `<span class="project-visual-fallback" aria-hidden="true">${esc(pick(project.title).charAt(0))}</span>`;

  const githubLink = project.url
    ? `<a class="btn btn-primary" href="${esc(project.url)}" target="_blank" rel="noopener">
         ${esc(t("projects.github"))} <i class="fa-brands fa-github" aria-hidden="true"></i>
       </a>`
    : "";

  card.innerHTML = `
    <button class="project-visual" type="button" data-project="${esc(project.id)}"
            aria-label="${esc(pick(project.title))} — ${esc(t("projects.details"))}">
      ${visual}
    </button>
    <div class="project-body">
      <p class="project-date mono">${esc(formatDate(project.date))}</p>
      <h3 class="project-title">${esc(pick(project.title))}</h3>
      <p class="project-desc">${esc(pick(project.description))}</p>
      <ul class="tag-list">${tagListHtml(project.tags)}</ul>
      <div class="project-actions">
        ${githubLink}
        <button class="btn btn-quiet" type="button" data-project="${esc(project.id)}">
          ${esc(t("projects.details"))}
        </button>
      </div>
    </div>
  `;

  return card;
}

/** Vide un conteneur puis y injecte les cartes des projets donnés. */
export function renderProjects(container, projects) {
  if (!container) return;
  container.replaceChildren();

  if (!projects.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = t("projects.empty");
    container.append(empty);
    return;
  }

  projects.forEach((project) => container.append(projectCard(project)));
}

/* ------------------------------------------------------------------ *
 * Certifications
 * ------------------------------------------------------------------ */

const STATUS_KEYS = {
  obtained: "certs.status.obtained",
  progress: "certs.status.progress",
  planned: "certs.status.planned",
};

export function certificationCard(cert) {
  const item = document.createElement("article");
  const status = STATUS_KEYS[cert.status] ? cert.status : "planned";
  item.className = `cert-card cert-${status}`;

  const link = cert.url
    ? `<a class="cert-link" href="${esc(cert.url)}" target="_blank" rel="noopener">
         ${esc(t("certs.view"))} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
       </a>`
    : "";

  item.innerHTML = `
    <div class="cert-main">
      <h3 class="cert-title">${esc(pick(cert.title))}</h3>
      <p class="cert-issuer">${esc(cert.issuer || "")}</p>
      <ul class="tag-list">${tagListHtml(cert.skills)}</ul>
    </div>
    <div class="cert-side">
      <span class="cert-status">${esc(t(STATUS_KEYS[status]))}</span>
      <span class="cert-date mono">${esc(formatDate(cert.date))}</span>
      ${link}
    </div>
  `;

  return item;
}

export function renderCertifications(container, certifications) {
  if (!container) return;
  container.replaceChildren();

  if (!certifications.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = t("certs.empty");
    container.append(empty);
    return;
  }

  certifications.forEach((cert) => container.append(certificationCard(cert)));
}

/* ------------------------------------------------------------------ *
 * Fiche détaillée (modale)
 * ------------------------------------------------------------------ */

let modal = null;
let lastFocused = null;

function buildModal() {
  const element = document.createElement("div");
  element.className = "modal";
  element.id = "project-modal";
  element.hidden = true;
  element.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button class="modal-close" type="button" data-close>
        <i class="fa-solid fa-xmark" aria-hidden="true"></i>
        <span class="visually-hidden js-close-label"></span>
      </button>
      <div class="modal-visual"><img alt="" decoding="async"></div>
      <div class="modal-content">
        <p class="modal-date mono"></p>
        <h2 class="modal-title" id="modal-title"></h2>
        <p class="modal-text"></p>
        <p class="modal-stack-label"></p>
        <ul class="tag-list modal-tags"></ul>
        <a class="btn btn-primary modal-link" target="_blank" rel="noopener"></a>
      </div>
    </div>
  `;
  document.body.append(element);
  return element;
}

function closeModal() {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove("no-scroll");
  if (lastFocused) lastFocused.focus();
}

function openModal(project) {
  if (!modal) return;
  lastFocused = document.activeElement;

  const image = modal.querySelector(".modal-visual img");
  const visual = modal.querySelector(".modal-visual");
  if (project.image) {
    image.src = project.image;
    image.alt = pick(project.title);
    visual.hidden = false;
  } else {
    visual.hidden = true;
  }

  modal.querySelector(".modal-date").textContent = formatDate(project.date);
  modal.querySelector(".modal-title").textContent = pick(project.title);
  modal.querySelector(".modal-text").textContent =
    pick(project.details) || pick(project.description);
  modal.querySelector(".modal-stack-label").textContent = t("projects.stack");
  modal.querySelector(".modal-tags").innerHTML = tagListHtml(project.tags);
  modal.querySelector(".js-close-label").textContent = t("projects.close");

  const link = modal.querySelector(".modal-link");
  if (project.url) {
    link.href = project.url;
    link.innerHTML = `${esc(t("projects.github"))} <i class="fa-brands fa-github" aria-hidden="true"></i>`;
    link.hidden = false;
  } else {
    link.hidden = true;
  }

  modal.hidden = false;
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal-close").focus();
}

/**
 * Branche la fiche détaillée sur toute la page.
 * On écoute les clics au niveau du document (délégation d'événements) : les
 * cartes peuvent donc être recréées autant de fois qu'on veut — au changement
 * de langue ou de filtre — sans avoir à rebrancher quoi que ce soit.
 */
export function initProjectModal(projects) {
  modal = buildModal();

  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-project]");
    if (trigger) {
      const project = projects.find((item) => item.id === trigger.dataset.project);
      if (project) openModal(project);
      return;
    }
    if (event.target.closest("[data-close]")) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (modal.hidden) return;

    if (event.key === "Escape") {
      closeModal();
      return;
    }

    // Piège le clavier dans la modale tant qu'elle est ouverte.
    if (event.key === "Tab") {
      const focusables = modal.querySelectorAll("button, a[href]:not([hidden])");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
