/**
 * Moteur de traduction du site.
 *
 * Comment ça marche, en trois temps :
 *
 *  1. Dans le HTML, on marque les éléments à traduire avec un attribut :
 *       <span data-i18n="nav.about"></span>          -> remplace le texte
 *       <p data-i18n-html="about.p1"></p>            -> remplace le HTML (permet <br>, <a>…)
 *       <a data-i18n-attr="title:nav.cv"></a>        -> remplace un attribut
 *          (plusieurs attributs possibles : "title:cle1, aria-label:cle2")
 *
 *  2. applyTranslations() parcourt la page et remplit tous ces éléments.
 *
 *  3. Le contenu généré en JavaScript (cartes de projets, certifications) ne
 *     peut pas être marqué à l'avance : ces modules s'abonnent avec
 *     onLanguageChange(callback) et se redessinent eux-mêmes au changement.
 */

import { TRANSLATIONS } from "../data/i18n.js";

const STORAGE_KEY = "nl-portfolio-lang";
const FALLBACK_LANG = "fr";
const AVAILABLE_LANGS = Object.keys(TRANSLATIONS);

/** Liste des fonctions à rappeler quand la langue change. */
const subscribers = [];

let currentLang = FALLBACK_LANG;

/* ------------------------------------------------------------------ *
 * Lecture / écriture de la langue
 * ------------------------------------------------------------------ */

/**
 * Détermine la langue à utiliser au premier chargement :
 * 1. celle choisie lors d'une visite précédente,
 * 2. sinon celle du navigateur si on la gère,
 * 3. sinon le français.
 */
function detectLang() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch {
    // localStorage peut être bloqué (navigation privée stricte) : on ignore.
  }
  if (saved && AVAILABLE_LANGS.includes(saved)) return saved;

  const browser = (navigator.language || FALLBACK_LANG).slice(0, 2).toLowerCase();
  return AVAILABLE_LANGS.includes(browser) ? browser : FALLBACK_LANG;
}

/** Renvoie la langue active ("fr" ou "en"). */
export function getLang() {
  return currentLang;
}

/**
 * Renvoie le texte correspondant à une clé.
 * Si la clé n'existe pas dans la langue active, on retombe sur le français ;
 * si elle n'existe nulle part, on renvoie la clé elle-même (visible = repérable).
 */
export function t(key) {
  const dict = TRANSLATIONS[currentLang] || {};
  const fallback = TRANSLATIONS[FALLBACK_LANG] || {};
  return dict[key] ?? fallback[key] ?? key;
}

/**
 * Choisit la bonne variante d'un champ bilingue des fichiers de données.
 * Accepte aussi bien { fr: "…", en: "…" } qu'une simple chaîne.
 */
export function pick(field) {
  if (field == null) return "";
  if (typeof field === "string") return field;
  return field[currentLang] ?? field[FALLBACK_LANG] ?? "";
}

/* ------------------------------------------------------------------ *
 * Application des traductions au DOM
 * ------------------------------------------------------------------ */

function applyTranslations(root = document) {
  root.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  root.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = t(el.dataset.i18nHtml);
  });

  root.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    // Format attendu : "title:ma.cle, aria-label:autre.cle"
    el.dataset.i18nAttr.split(",").forEach((pair) => {
      const [attr, key] = pair.split(":").map((part) => part.trim());
      if (attr && key) el.setAttribute(attr, t(key));
    });
  });
}

/** Met à jour le <title> et la balise description selon la page. */
function applyDocumentMeta() {
  const titleKey = document.body.dataset.titleKey || "meta.title";
  document.title = t(titleKey);

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", t("meta.description"));

  document.documentElement.lang = currentLang;
}

/* ------------------------------------------------------------------ *
 * Changement de langue
 * ------------------------------------------------------------------ */

/** Enregistre une fonction à exécuter à chaque changement de langue. */
export function onLanguageChange(callback) {
  subscribers.push(callback);
}

/** Change la langue active, met à jour la page et prévient les abonnés. */
export function setLang(lang) {
  if (!AVAILABLE_LANGS.includes(lang)) return;
  currentLang = lang;

  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Pas grave : la langue ne sera juste pas mémorisée pour la prochaine visite.
  }

  applyTranslations();
  applyDocumentMeta();
  updateSwitchState();
  subscribers.forEach((callback) => callback(lang));
}

/* ------------------------------------------------------------------ *
 * Bouton FR / EN
 * ------------------------------------------------------------------ */

function updateSwitchState() {
  document.querySelectorAll("[data-lang-switch]").forEach((group) => {
    group.querySelectorAll("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === currentLang;
      button.setAttribute("aria-pressed", String(active));
      button.classList.toggle("is-active", active);
    });
    // Sert au CSS pour faire glisser la pastille derrière le bon bouton.
    group.dataset.langSwitch = currentLang;
  });
}

/**
 * À appeler une fois par page. Détecte la langue, l'applique et branche
 * les boutons FR / EN.
 */
export function initI18n() {
  currentLang = detectLang();

  document.querySelectorAll("[data-lang-switch]").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lang]");
      if (button && button.dataset.lang !== currentLang) {
        setLang(button.dataset.lang);
      }
    });
  });

  applyTranslations();
  applyDocumentMeta();
  updateSwitchState();
}

/* ------------------------------------------------------------------ *
 * Petits utilitaires liés à la langue
 * ------------------------------------------------------------------ */

/** "2026-05" -> "mai 2026" en français, "May 2026" en anglais. */
export function formatDate(value) {
  if (!value) return "";
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month || 1) - 1, 1);
  if (Number.isNaN(date.getTime())) return value;

  const locale = currentLang === "fr" ? "fr-FR" : "en-GB";
  const label = date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  // En français, toLocaleDateString renvoie "mai 2026" : on met la majuscule.
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/**
 * Libellé affiché pour une technologie.
 * Cherche une clé "tag.<nom>" dans les traductions ; si elle n'existe pas,
 * renvoie le nom brut. Résultat : seules les technologies qui se disent
 * différemment d'une langue à l'autre ont besoin d'une traduction.
 */
export function tagLabel(tag) {
  const key = `tag.${tag}`;
  const dict = TRANSLATIONS[currentLang] || {};
  return dict[key] ?? tag;
}

/** Remplace {n} dans une chaîne traduite : count("projects.countMany", 4). */
export function count(key, n) {
  return t(key).replace("{n}", String(n));
}
