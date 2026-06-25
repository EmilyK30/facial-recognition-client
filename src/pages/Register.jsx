import { useState } from "react";
import WebcamCapture from "../components/webcam/WebcamCapture";
import Loader from "../components/common/Loader";
import ErrorAlert from "../components/common/ErrorAlert";
import NeuralHero from "../components/common/NeuralHero";
import { registerPerson, getErrorMessage } from "../services/api";

function Register() {
  const [numeroDossier, setNumeroDossier] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const canSubmit = numeroDossier.trim() && file && consent && !loading;

  const handleCapture = (capturedFile) => {
    setFile(capturedFile);
    setError("");
    setSuccess(null);
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError("");
    setSuccess(null);
    try {
      const data = await registerPerson({
        numeroDossier: numeroDossier.trim(),
        prenom: prenom.trim() || undefined,
        nom: nom.trim() || undefined,
        adresse: adresse.trim() || undefined,
        dateNaissance: dateNaissance || undefined,
        file,
      });
      setSuccess(data.personne);
      setNumeroDossier("");
      setPrenom("");
      setNom("");
      setAdresse("");
      setDateNaissance("");
      setFile(null);
      setConsent(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NeuralHero title="Enrôlement" subtitle="Enregistrez une nouvelle personne avec sa photo." />

      {/* Grille 2 colonnes : infos | webcam */}
      <div className="register-layout">

        {/* Colonne gauche : informations générales uniquement */}
        <div className="register-layout__form">
          <div className="panel">
            <p className="panel__title">Informations générales</p>

            <div className="field">
              <label htmlFor="numeroDossier">
                Numéro de dossier <span className="field__required">*</span>
              </label>
              <input
                id="numeroDossier"
                type="text"
                placeholder="Ex : DOS-2024-001"
                value={numeroDossier}
                onChange={(e) => setNumeroDossier(e.target.value)}
              />
            </div>

            <div className="field-row">
              <div className="field">
                <label htmlFor="prenom">Prénom</label>
                <input
                  id="prenom"
                  type="text"
                  placeholder="Ousseynou"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="nom">Nom</label>
                <input
                  id="nom"
                  type="text"
                  placeholder="Ndour"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="adresse">Adresse</label>
              <input
                id="adresse"
                type="text"
                placeholder="Ex : Dakar, Sénégal"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="dateNaissance">Date de naissance</label>
              <input
                id="dateNaissance"
                type="date"
                value={dateNaissance}
                onChange={(e) => setDateNaissance(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Colonne droite : capture du visage uniquement */}
        <div className="register-layout__webcam">
          <div className="panel">
            <p className="panel__title">Capture du visage</p>
            <WebcamCapture onCapture={handleCapture} />
            {file && (
              <p className="register-layout__photo-ok">
                Photo prête à l'envoi.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Hors grille : ordre mobile correct — consentement → bouton → feedback */}
      <div className="consent-box" style={{ marginTop: "var(--space-3)" }}>
        <input
          type="checkbox"
          id="consent"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
        />
        <label htmlFor="consent">
          La personne concernée a été informée et a donné son consentement
          explicite pour la collecte et le traitement de ses données
          biométriques conformément aux exigences de protection des données
          en vigueur.
        </label>
      </div>

      <button
        className="btn"
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={{ width: "100%", marginTop: "var(--space-3)" }}
      >
        {loading ? "Enregistrement en cours..." : "Enrôler la personne"}
      </button>

      {loading && <Loader text="Enregistrement en cours..." />}
      {error && <ErrorAlert message={error} />}

      {success && (
        <div className="success-alert" style={{ marginTop: "var(--space-3)" }}>
          <div>
            <strong>
              {success.prenom || ""} {success.nom || ""} enregistré(e) avec succès
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: "0.85rem" }}>
              Dossier · {success.numero_dossier}
              {success.created_at && (
                <> · Le {new Date(success.created_at).toLocaleString("fr-FR")}</>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;

