/**
 * Service de stockage local des photos d'enrôlement.
 *
 * L'API backend ne retourne pas les photos des personnes : on conserve donc
 * une copie compressée (base64 JPEG, max 300px de large) dans le localStorage,
 * indexée par numéro de dossier, pour pouvoir l'afficher dans les résultats
 * de recherche et de reconnaissance.
 *
 * Toutes les fonctions sont tolérantes aux erreurs : si le localStorage est
 * plein ou indisponible (mode privé, etc.), l'app continue de fonctionner.
 */

const PREFIX = "photo_";
const MAX_WIDTH = 300;
const JPEG_QUALITY = 0.8;

/**
 * Redimensionne l'image à 300px de large maximum (en conservant les
 * proportions) et la convertit en base64 JPEG pour économiser l'espace.
 */
function compressToBase64(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      // On ne fait que réduire : jamais d'agrandissement
      const scale = Math.min(1, MAX_WIDTH / img.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Impossible de lire l'image."));
    };
    img.src = url;
  });
}

/**
 * Compresse puis stocke la photo dans le localStorage sous la clé
 * "photo_" + numeroDossier.
 * Ne lève jamais d'exception : un échec (quota plein, localStorage
 * indisponible) ne doit pas bloquer l'enrôlement.
 */
export async function savePhoto(numeroDossier, file) {
  if (!numeroDossier || !file) return;
  try {
    const base64 = await compressToBase64(file);
    localStorage.setItem(PREFIX + numeroDossier, base64);
  } catch (err) {
    // Quota dépassé ou stockage inaccessible : on ignore silencieusement
    console.warn("Photo non sauvegardée localement :", err);
  }
}

/**
 * Retourne la photo stockée (data URL base64) pour ce numéro de dossier,
 * ou null si aucune photo n'est stockée ou si le localStorage est indisponible.
 */
export function getPhoto(numeroDossier) {
  if (!numeroDossier) return null;
  try {
    return localStorage.getItem(PREFIX + numeroDossier);
  } catch {
    return null;
  }
}
