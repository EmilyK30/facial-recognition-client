/**
 * Compteurs d'activité locaux.
 *
 * L'API backend n'expose pas de endpoint de statistiques : on tient donc
 * des compteurs dans le localStorage, incrémentés par le service API à
 * chaque opération réussie (enrôlement, reconnaissance, consultation).
 *
 * Comme pour photoStorage, tout est tolérant aux erreurs : si le
 * localStorage est indisponible, les compteurs restent simplement à zéro
 * et l'app fonctionne normalement.
 */

const KEY = "stats_activite";

/** Lit l'objet compteurs depuis le localStorage (ou objet vide). */
function readStats() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

/**
 * Incrémente un compteur ("enrolements", "reconnaissances" ou "recherches").
 * Ne lève jamais d'exception : un échec de stockage ne doit pas
 * perturber l'opération métier qui vient de réussir.
 */
export function incrementStat(nom) {
  try {
    const stats = readStats();
    stats[nom] = (stats[nom] || 0) + 1;
    localStorage.setItem(KEY, JSON.stringify(stats));
  } catch {
    // Quota plein ou stockage inaccessible : on ignore silencieusement
  }
}

/** Retourne les trois compteurs, à zéro par défaut. */
export function getStats() {
  const s = readStats();
  return {
    enrolements: s.enrolements || 0,
    reconnaissances: s.reconnaissances || 0,
    recherches: s.recherches || 0,
  };
}
