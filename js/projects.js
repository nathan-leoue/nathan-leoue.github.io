/**
 * Page Projets : la liste complète, avec un filtre par technologie.
 *
 * Le filtre actif est gardé dans une simple variable ; à chaque changement
 * (clic sur un filtre ou changement de langue) on redessine la grille.
 */

import { PROJECTS } from "../data/projects_data.js";
import { initI18n, onLanguageChange, t, count, tagLabel } from "./i18n.js";
import { sortByDate, collectTags, renderProjects, initProjectModal, esc } from "./cards.js";
import { initUI } from "./ui.js";

const ALL = "*";

const grid = document.getElementById("projects-grid");
const filtersSlot = document.getElementById("projects-filters");
const countSlot = document.getElementById("projects-count");

const sorted = sortByDate(PROJECTS);
const tags = collectTags(PROJECTS);

let activeTag = ALL;

/** Projets correspondant au filtre courant. */
function visibleProjects() {
  if (activeTag === ALL) return sorted;
  return sorted.filter((project) => project.tags?.includes(activeTag));
}

function renderFilters() {
  if (!filtersSlot) return;

  const buttons = [
    `<button class="filter" type="button" data-tag="${ALL}">${esc(t("projects.filterAll"))}</button>`,
    // data-tag garde toujours le nom d'origine : c'est lui qui sert à filtrer.
    // Seul le texte affiché est traduit.
    ...tags.map(
      (tag) => `<button class="filter" type="button" data-tag="${esc(tag)}">${esc(tagLabel(tag))}</button>`
    ),
  ];

  filtersSlot.innerHTML = buttons.join("");
  filtersSlot.setAttribute("aria-label", t("projects.filterLabel"));
  updateFilterState();
}

function updateFilterState() {
  filtersSlot?.querySelectorAll(".filter").forEach((button) => {
    const active = button.dataset.tag === activeTag;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function render() {
  const list = visibleProjects();
  renderProjects(grid, list);

  if (countSlot) {
    countSlot.textContent =
      list.length === 1 ? count("projects.countOne", 1) : count("projects.countMany", list.length);
  }
}

filtersSlot?.addEventListener("click", (event) => {
  const button = event.target.closest(".filter");
  if (!button) return;

  activeTag = button.dataset.tag;
  updateFilterState();
  render();
});

initI18n();
initUI();
initProjectModal(PROJECTS);
renderFilters();
render();

// Au changement de langue : les libellés des filtres et les cartes changent,
// mais le filtre sélectionné, lui, reste le même.
onLanguageChange(() => {
  renderFilters();
  render();
});
