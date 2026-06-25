import { useState } from "react";
import WebcamCapture from "../components/webcam/WebcamCapture";
import NeuralHero from "../components/common/NeuralHero";
import { recognizeFace, getErrorMessage } from "../services/api";

const styles = {
  page: { padding: "2rem 1.5rem", maxWidth: 680, margin: "0 auto", fontFamily: "sans-serif" },
  title: { fontSize: 28, fontWeight: 600, margin: "0 0 0.25rem" },
  sub: { fontSize: 14, color: "#888", margin: "0 0 2rem" },
  captureBox: { background: "#f5f5f5", border: "1px solid #e0e0e0", borderRadius: 12, padding: "1.5rem", marginBottom: "1.5rem" },
  btnPrimary: { marginTop: 12, width: "100%", padding: "10px 0", background: "#185FA5", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" },
  btnDisabled: { marginTop: 12, width: "100%", padding: "10px 0", background: "#ccc", color: "#fff", border: "none", borderRadius: 8, fontSize: 14 },
  error: { color: "#A32D2D", background: "#FCEBEB", border: "1px solid #F7C1C1", borderRadius: 8, padding: "10px 14px", marginTop: 12, fontSize: 14 },
  empty: { textAlign: "center", color: "#888", padding: "2rem", border: "1px dashed #ccc", borderRadius: 12 },
  card: { background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, padding: "1.25rem", marginTop: 12 },
  cardHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: "50%", background: "#E6F1FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: "#185FA5" },
  name: { fontSize: 15, fontWeight: 600, margin: 0 },
  dossier: { fontSize: 13, color: "#888", margin: 0 },
  scoreLabel: { fontSize: 12, color: "#888", marginBottom: 4 },
  scoreBar: { height: 6, background: "#e0e0e0", borderRadius: 99, overflow: "hidden" },
  scoreFill: (score) => ({ height: "100%", background: score > 0.7 ? "#1D9E75" : score > 0.4 ? "#BA7517" : "#A32D2D", borderRadius: 99, width: `${score * 100}%` }),
  scoreVal: (score) => ({ fontSize: 13, fontWeight: 600, color: score > 0.7 ? "#0F6E56" : score > 0.4 ? "#854F0B" : "#A32D2D", marginTop: 4 }),
  infoRow: { display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 0", borderTop: "1px solid #f0f0f0", color: "#888" },
  infoVal: { color: "#222" },
};

function getInitials(prenom, nom) {
  return `${prenom?.[0] ?? ""}${nom?.[0] ?? ""}`.toUpperCase();
}

function ResultCard({ resultat }) {
  const { personne, score, numero_dossier } = resultat;
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <div style={styles.avatar}>{getInitials(personne.prenom, personne.nom)}</div>
        <div>
          <p style={styles.name}>{personne.prenom} {personne.nom}</p>
          <p style={styles.dossier}>Dossier · {numero_dossier}</p>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <p style={styles.scoreLabel}>Score de confiance</p>
        <div style={styles.scoreBar}><div style={styles.scoreFill(score)} /></div>
        <p style={styles.scoreVal(score)}>{(score * 100).toFixed(1)} %</p>
      </div>
      {personne.adresse && (
        <div style={styles.infoRow}>
          <span>📍 Adresse</span>
          <span style={styles.infoVal}>{personne.adresse}</span>
        </div>
      )}
      {personne.date_naissance && (
        <div style={styles.infoRow}>
          <span>📅 Date de naissance</span>
          <span style={styles.infoVal}>{personne.date_naissance}</span>
        </div>
      )}
    </div>
  );
}

function Recognize() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultats, setResultats] = useState(null);
  const [error, setError] = useState("");

  const handleCapture = (capturedFile) => {
    setFile(capturedFile);
    setResultats(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) return setError("Veuillez fournir une image.");
    setLoading(true);
    setError("");
    setResultats(null);
    try {
      const data = await recognizeFace({ file });
      setResultats(data.resultats);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NeuralHero title="Reconnaissance" subtitle="Prenez une photo pour identifier une personne." />

      <div style={styles.captureBox}>
        <WebcamCapture onCapture={handleCapture} />
        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          style={!file || loading ? styles.btnDisabled : styles.btnPrimary}
        >
          {loading ? "⏳ Analyse en cours..." : "Reconnaître"}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {resultats !== null && (
        resultats.length === 0
          ? <div style={styles.empty}>Aucune correspondance trouvée.</div>
          : resultats.map((r, i) => <ResultCard key={i} resultat={r} />)
      )}
    </div>
  );
}

export default Recognize;