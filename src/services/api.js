import axios from "axios";

/**
 * Service API centralise.
 * Toutes les pages (Register, Recognize, Search) passent par ce fichier
 * pour parler au backend. Aucun appel axios direct ailleurs dans le code.
 *
 * Le tenant (organisation) est determine par le DOMAINE de baseURL,
 * pas par un parametre : voir cahier des charges section 6.
 */

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://hopital-dakar.local";

export const api = axios.create({
  baseURL,
  // Pas de Content-Type fixe ici : axios le definit automatiquement
  // en multipart/form-data quand on envoie un FormData (voir plus bas).
});

/**
 * Messages d'erreur lisibles, mappes sur les codes du contrat d'API
 * (cahier des charges, section 6.4).
 */
const ERROR_MESSAGES = {
  404: "Aucune fiche trouvee.",
  409: "Ce numero de dossier existe deja.",
  422: "Image invalide ou aucun visage detecte.",
  502: "Service momentanement indisponible.",
  500: "Erreur, reessayez plus tard.",
};

/**
 * Transforme une erreur axios en message lisible pour l'agent.
 * A utiliser dans les composants : catch (err) { setError(getErrorMessage(err)) }
 */
export function getErrorMessage(error) {
  if (!error.response) {
    // Pas de reponse du tout : reseau coupe, CORS, serveur injoignable...
    return "Impossible de contacter le serveur. Verifiez votre connexion.";
  }
  const status = error.response.status;
  return ERROR_MESSAGES[status] || "Une erreur inattendue est survenue.";
}

/**
 * F1 - Enrolement d'une personne
 * POST /register (multipart/form-data)
 * Champs obligatoires : numero_dossier, file
 * Champs optionnels : prenom, nom, adresse, date_naissance
 */
export async function registerPerson({
  numeroDossier,
  prenom,
  nom,
  adresse,
  dateNaissance,
  file,
}) {
  const formData = new FormData();
  formData.append("numero_dossier", numeroDossier);
  if (prenom) formData.append("prenom", prenom);
  if (nom) formData.append("nom", nom);
  if (adresse) formData.append("adresse", adresse);
  if (dateNaissance) formData.append("date_naissance", dateNaissance);
  formData.append("file", file);

  const response = await api.post("/register", formData);
  return response.data; // { message, personne, face_id, faces_count }
}

/**
 * F2 - Reconnaissance d'un visage
 * POST /recognize (multipart/form-data)
 * Champs : file (obligatoire), threshold (optionnel, defaut 0.4)
 */
export async function recognizeFace({ file, threshold }) {
  const formData = new FormData();
  formData.append("file", file);
  if (threshold !== undefined) {
    formData.append("threshold", threshold);
  }

  const response = await api.post("/recognize", formData);
  return response.data; // { tenant, resultats: [...] }
}

/**
 * F3 - Consultation d'une fiche par numero de dossier
 * GET /?numero_dossier=X
 */
export async function searchPerson(numeroDossier) {
  const response = await api.get("/", {
    params: { numero_dossier: numeroDossier },
  });
  return response.data; // { message, tenant, personne }
}
