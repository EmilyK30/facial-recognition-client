import { useEffect, useState } from "react";
import { checkApiStatus } from "../services/api";

/**
 * Hook partagé : statut réel du backend.
 * Retourne "checking" pendant la vérification, puis "up" ou "down".
 *
 * Si plusieurs composants montés en même temps utilisent le hook
 * (ex. le hero et la tuile statut de l'accueil), ils partagent la même
 * requête au lieu de pinger le serveur chacun de leur côté.
 */
let verificationEnCours = null;

export function useApiStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;

    // Une seule requête partagée par tous les abonnés simultanés
    if (!verificationEnCours) {
      verificationEnCours = checkApiStatus().finally(() => {
        verificationEnCours = null;
      });
    }

    verificationEnCours.then((up) => {
      if (!cancelled) setStatus(up ? "up" : "down");
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}
