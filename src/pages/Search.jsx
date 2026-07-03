import { useState } from "react";
import Loader from "../components/common/Loader";
import ErrorAlert from "../components/common/ErrorAlert";
import NeuralHero from "../components/common/NeuralHero";
import { searchPerson, getErrorMessage } from "../services/api";
import { getPhoto } from "../services/photoStorage";

function getInitials(prenom, nom) {
  const p = prenom ? prenom[0] : "";
  const n = nom ? nom[0] : "";
  return (p + n).toUpperCase() || "?";
}


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
    <div className="app-main">
      <NeuralHero title="Recherche" subtitle="Retrouvez une personne par son numéro de dossier." />

      <div className="search-panel">
        <form onSubmit={handleSearch}>
          <div className="field">
            <label htmlFor="numero_dossier">Numéro de dossier</label>
            <input
              id="numero_dossier"
              type="text"
              value={numeroDossier}
              onChange={(e) => setNumeroDossier(e.target.value)}
              placeholder="Ex : DOS-2024-001"
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
          {/* Photo stockée localement si disponible, sinon avatar avec initiales */}
          {getPhoto(personne.numero_dossier) ? (
            <img
              className="result-card__photo"
              src={getPhoto(personne.numero_dossier)}
              alt={`Photo de ${personne.prenom || ""} ${personne.nom || ""}`.trim()}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
              }}
            />
          ) : (
            <div className="result-card__photo" style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              fontWeight: "800",
              color: "white",
              flexShrink: 0,
              boxShadow: "0 4px 12px rgba(99,102,241,0.4)",
            }}>
              {getInitials(personne.prenom, personne.nom)}
            </div>
          )}
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
