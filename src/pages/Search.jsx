import { useState } from "react";
import Loader from "../components/common/Loader";
import ErrorAlert from "../components/common/ErrorAlert";
import { searchPerson, getErrorMessage } from "../services/api";

/**
 * Page Recherche / Consultation - F3 du cahier des charges.
 * GET /?numero_dossier=X -> affiche la fiche, ou message si 404.
 */
function Search() {
  const [numeroDossier, setNumeroDossier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personne, setPersonne] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!numeroDossier.trim()) {
      setError("Veuillez saisir un numéro de dossier.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPersonne(null);

    try {
      const data = await searchPerson(numeroDossier.trim());
      setPersonne(data.personne);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Recherche d'une personne</h1>

      <form onSubmit={handleSearch} className="search-page__form">
        <label htmlFor="numero_dossier">Numéro de dossier</label>
        <input
          id="numero_dossier"
          type="text"
          value={numeroDossier}
          onChange={(e) => setNumeroDossier(e.target.value)}
          placeholder="Ex. Ousseynou"
        />
        <button type="submit" disabled={isLoading}>
          Rechercher
        </button>
      </form>

      {isLoading && <Loader text="Recherche en cours..." />}

      {error && <ErrorAlert message={error} />}

      {personne && (
        <div className="search-page__result">
          <h2>Fiche trouvée</h2>
          <dl>
            <dt>Numéro de dossier</dt>
            <dd>{personne.numero_dossier}</dd>

            <dt>Prénom</dt>
            <dd>{personne.prenom || "—"}</dd>

            <dt>Nom</dt>
            <dd>{personne.nom || "—"}</dd>

            <dt>Adresse</dt>
            <dd>{personne.adresse || "—"}</dd>

            <dt>Date de naissance</dt>
            <dd>{personne.date_naissance || "—"}</dd>
          </dl>
        </div>
      )}
    </div>
  );
}

export default Search;
