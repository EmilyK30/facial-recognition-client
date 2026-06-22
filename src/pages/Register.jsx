import { useState } from "react";
import WebcamCapture from "../components/webcam/WebcamCapture";
import { registerPerson, getErrorMessage } from "../services/api";

// ─── Styles (même convention que Recognize.jsx) ───────────────────────────────
const styles = {
  page: {
    padding: "2rem 1.5rem",
    maxWidth: 680,
    margin: "0 auto",
    fontFamily: "sans-serif",
  },
  title: { fontSize: 28, fontWeight: 600, margin: "0 0 0.25rem" },
  sub: { fontSize: 14, color: "#888", margin: "0 0 2rem" },

  section: {
    background: "#f5f5f5",
    border: "1px solid #e0e0e0",
    borderRadius: 12,
    padding: "1.5rem",
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#555",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    margin: "0 0 1rem",
  },

  // Formulaire
  fieldGroup: { display: "flex", flexDirection: "column", gap: "0.75rem" },
  row: { display: "flex", gap: "0.75rem" },
  label: { fontSize: 13, fontWeight: 500, color: "#444", marginBottom: 4, display: "block" },
  input: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #d0d0d0",
    borderRadius: 8,
    fontSize: 14,
    color: "#222",
    background: "#fff",
    boxSizing: "border-box",
    outline: "none",
  },
  inputRequired: {
    width: "100%",
    padding: "9px 12px",
    border: "1px solid #185FA5",
    borderRadius: 8,
    fontSize: 14,
    color: "#222",
    background: "#fff",
    boxSizing: "border-box",
    outline: "none",
  },

  // Consentement
  consentBox: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: 8,
    padding: "12px 14px",
    marginTop: "0.5rem",
  },
  consentText: { fontSize: 13, color: "#1E3A5F", lineHeight: 1.5, margin: 0 },
  checkbox: { marginTop: 2, accentColor: "#185FA5", width: 16, height: 16, flexShrink: 0 },

  // Boutons
  btnPrimary: {
    marginTop: 12,
    width: "100%",
    padding: "10px 0",
    background: "#185FA5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
  btnDisabled: {
    marginTop: 12,
    width: "100%",
    padding: "10px 0",
    background: "#ccc",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    cursor: "not-allowed",
  },

  // Feedback
  error: {
    color: "#A32D2D",
    background: "#FCEBEB",
    border: "1px solid #F7C1C1",
    borderRadius: 8,
    padding: "10px 14px",
    marginTop: 12,
    fontSize: 14,
  },
  success: {
    color: "#0F6E56",
    background: "#ECFDF5",
    border: "1px solid #A7F3D0",
    borderRadius: 8,
    padding: "14px",
    marginTop: 12,
    fontSize: 14,
  },
  successName: { fontWeight: 600, fontSize: 15, marginBottom: 4 },
  successDetail: { color: "#555", fontSize: 13, margin: "2px 0" },
};

// ─── Composant principal ──────────────────────────────────────────────────────
function Register() {
  // Champs du formulaire
  const [numeroDossier, setNumeroDossier] = useState("");
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");

  // Photo
  const [file, setFile] = useState(null);

  // Consentement
  const [consent, setConsent] = useState(false);

  // État de la requête
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null); // { personne }

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
      // Réinitialise le formulaire après succès
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
    <div style={styles.page}>
      <h1 style={styles.title}>📋 Enrôlement</h1>
      <p style={styles.sub}>
        Enregistrez une nouvelle personne dans le système avec sa photo.
      </p>

      {/* ── Section 1 : Informations de la personne ── */}
      <div style={styles.section}>
        <p style={styles.sectionTitle}>Informations</p>
        <div style={styles.fieldGroup}>

          {/* Numéro de dossier — obligatoire */}
          <div>
            <label style={styles.label}>
              Numéro de dossier <span style={{ color: "#A32D2D" }}>*</span>
            </label>
            <input
              style={styles.inputRequired}
              type="text"
              placeholder="Ex : DOS-2024-001"
              value={numeroDossier}
              onChange={(e) => setNumeroDossier(e.target.value)}
            />
          </div>

          {/* Prénom + Nom */}
          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Prénom</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Ousseynou"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Nom</label>
              <input
                style={styles.input}
                type="text"
                placeholder="Ndour"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
              />
            </div>
          </div>

          {/* Adresse */}
          <div>
            <label style={styles.label}>Adresse</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Ex : Dakar, Sénégal"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
            />
          </div>

          {/* Date de naissance */}
          <div>
            <label style={styles.label}>Date de naissance</label>
            <input
              style={styles.input}
              type="date"
              value={dateNaissance}
              onChange={(e) => setDateNaissance(e.target.value)}
            />
          </div>

        </div>
      </div>

      {/* ── Section 2 : Photo ── */}
      <div style={styles.section}>
        <p style={styles.sectionTitle}>Photo du visage</p>
        <WebcamCapture onCapture={handleCapture} />
      </div>

      {/* ── Section 3 : Consentement ── */}
      <div style={styles.section}>
        <p style={styles.sectionTitle}>Consentement</p>
        <label style={styles.consentBox}>
          <input
            type="checkbox"
            style={styles.checkbox}
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <p style={styles.consentText}>
            La personne concernée a été informée et a donné son consentement
            explicite pour la collecte et le traitement de ses données biométriques
            conformément aux exigences de protection des données en vigueur.
          </p>
        </label>
      </div>

      {/* ── Bouton de soumission ── */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        style={canSubmit ? styles.btnPrimary : styles.btnDisabled}
      >
        {loading ? "⏳ Enregistrement en cours..." : "Enrôler la personne"}
      </button>

      {/* ── Messages de retour ── */}
      {error && <div style={styles.error}>{error}</div>}

      {success && (
        <div style={styles.success}>
          <p style={styles.successName}>
            ✅ {success.prenom || ""} {success.nom || ""} enregistré(e) avec succès
          </p>
          <p style={styles.successDetail}>Dossier · {success.numero_dossier}</p>
          {success.created_at && (
            <p style={styles.successDetail}>
              Le {new Date(success.created_at).toLocaleString("fr-FR")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Register;


