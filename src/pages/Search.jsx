import { useState } from "react";
import Loader from "../components/common/Loader";
import ErrorAlert from "../components/common/ErrorAlert";
import { searchPerson, getErrorMessage } from "../services/api";

function getInitials(prenom, nom) {
  const p = prenom ? prenom[0] : "";
  const n = nom ? nom[0] : "";
  return (p + n).toUpperCase() || "?";
}

const FAKE_PREVIEW = true;
const FAKE_PERSON = {
  numero_dossier: "DKR-2026-3938",
  prenom: "Amadou",
  nom: "Diop",
  adresse: "Plateau, Dakar",
  date_naissance: "1990-03-12",
};

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

    if (FAKE_PREVIEW) {
      setTimeout(() => {
        setPersonne(FAKE_PERSON);
        setIsLoading(false);
      }, 600);
      return;
    }

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
    <div className="app-main">
      <div className="page-header">
        <h1>Recherche d'une personne</h1>
        <p className="page-header__subtitle">
          Retrouvez le dossier complet d'une personne enrôlée grâce à son numéro de dossier.
        </p>
      </div>

      <div className="search-panel">
        <form onSubmit={handleSearch}>
          <div className="field">
            <label htmlFor="numero_dossier">Numéro de dossier</label>
            <input
              id="numero_dossier"
              type="text"
              value={numeroDossier}
              onChange={(e) => setNumeroDossier(e.target.value)}
              placeholder="Ex. Ousseynou"
            />
          </div>
          <button type="submit" className="btn" disabled={isLoading}>
            Rechercher
          </button>
        </form>
      </div>

      {isLoading && <Loader text="Recherche en cours..." />}

      {error && <ErrorAlert message={error} />}

      {personne && (
        <div className="result-card">
          <div className="result-card__photo">
            {getInitials(personne.prenom, personne.nom)}
          </div>
          <div className="result-card__body">
            <div className="result-card__header">
              <h2>{personne.prenom} {personne.nom}</h2>
              <span className="badge">Enregistré</span>
            </div>
            <dl>
              <dt>Numéro de dossier</dt>
              <dd>{personne.numero_dossier}</dd>

              <dt>Adresse</dt>
              <dd>{personne.adresse || "—"}</dd>

              <dt>Date de naissance</dt>
              <dd>{personne.date_naissance || "—"}</dd>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
