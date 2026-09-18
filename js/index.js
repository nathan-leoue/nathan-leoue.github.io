/**
 * Page d'accueil : affiche les derniers projets et les certifications,
 * puis redessine tout si on change de langue.
 */

import { PROJECTS } from "../data/projects_data.js";
import { CERTIFICATIONS } from "../data/certifications_data.js";
import { initI18n, onLanguageChange, count } from "./i18n.js";
import {
  sortByDate,
  renderProjects,
  renderCertifications,
  initProjectModal,
} from "./cards.js";
import { initUI } from "./ui.js";

/** Nombre de projets mis en avant sur l'accueil (les plus récents). */
const HOME_PROJECTS = 2;

const latestProjects = sortByDate(PROJECTS).slice(0, HOME_PROJECTS);

const projectsSlot = document.getElementById("home-projects");
const certificationsSlot = document.getElementById("certifications-list");
const projectsCount = document.getElementById("projects-count");
const skillsCount = document.getElementById("skills-count");

function render() {
  renderProjects(projectsSlot, latestProjects);
  renderCertifications(certificationsSlot, CERTIFICATIONS);

  if (projectsCount) {
    projectsCount.textContent =
      PROJECTS.length === 1 ? count("projects.countOne", 1) : count("projects.countMany", PROJECTS.length);
  }

  // Compté depuis la page : ajouter une carte de compétences suffit,
  // pas besoin de penser à mettre le chiffre à jour.
  if (skillsCount) {
    skillsCount.textContent = count("skills.count", document.querySelectorAll(".skill-card").length);
  }
}

initI18n();
initUI();
initProjectModal(PROJECTS);
render();
onLanguageChange(render);
