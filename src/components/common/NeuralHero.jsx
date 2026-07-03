import { useApiStatus } from "../../hooks/useApiStatus";

/**
 * Contenu du badge de statut selon l'état réel du backend
 * (vérifié via le hook useApiStatus).
 */
const BADGE_DISPLAY = {
  checking: { dot: "#94A3B8", text: "Vérification du système…" },
  up: { dot: "#10B981", text: "Système biométrique actif" },
  down: { dot: "#EF4444", text: "Système hors ligne" },
};

function NeuralHero({ title, subtitle, children, actions }) {
  const apiStatus = useApiStatus();
  const badge = BADGE_DISPLAY[apiStatus];

  return (
    <div style={{
      background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 30%, #4338CA 65%, #6366F1 100%)",
      borderRadius: "20px",
      padding: "40px 44px",
      position: "relative",
      overflow: "hidden",
      marginBottom: "24px",
      boxShadow: "0 24px 64px rgba(67,56,202,0.28), 0 4px 16px rgba(0,0,0,0.14)",
    }}>

      {/* Grille de points en fond */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        pointerEvents: "none",
      }} />

      {/* Orbe lumineux gauche */}
      <div style={{
        position: "absolute", top: "-80px", left: "-60px",
        width: "320px", height: "320px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Orbe lumineux droite */}
      <div style={{
        position: "absolute", bottom: "-100px", right: "100px",
        width: "280px", height: "280px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Réseau neuronal SVG */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.14 }}
        viewBox="0 0 900 240"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1="20" y1="60" x2="110" y2="30" stroke="white" strokeWidth="0.8"/>
        <line x1="20" y1="60" x2="110" y2="110" stroke="white" strokeWidth="0.8"/>
        <line x1="20" y1="180" x2="110" y2="110" stroke="white" strokeWidth="0.8"/>
        <line x1="20" y1="180" x2="110" y2="200" stroke="white" strokeWidth="0.8"/>
        <line x1="110" y1="30" x2="220" y2="60" stroke="white" strokeWidth="0.8"/>
        <line x1="110" y1="110" x2="220" y2="60" stroke="white" strokeWidth="0.8"/>
        <line x1="110" y1="110" x2="220" y2="140" stroke="white" strokeWidth="0.8"/>
        <line x1="110" y1="200" x2="220" y2="140" stroke="white" strokeWidth="0.8"/>
        <line x1="110" y1="200" x2="220" y2="210" stroke="white" strokeWidth="0.8"/>
        <line x1="220" y1="60" x2="340" y2="30" stroke="white" strokeWidth="0.8"/>
        <line x1="220" y1="60" x2="340" y2="90" stroke="white" strokeWidth="0.8"/>
        <line x1="220" y1="140" x2="340" y2="90" stroke="white" strokeWidth="0.8"/>
        <line x1="220" y1="140" x2="340" y2="170" stroke="white" strokeWidth="0.8"/>
        <line x1="220" y1="210" x2="340" y2="170" stroke="white" strokeWidth="0.8"/>
        <line x1="220" y1="210" x2="340" y2="220" stroke="white" strokeWidth="0.8"/>
        <line x1="340" y1="30" x2="460" y2="55" stroke="white" strokeWidth="0.8"/>
        <line x1="340" y1="90" x2="460" y2="55" stroke="white" strokeWidth="0.8"/>
        <line x1="340" y1="90" x2="460" y2="130" stroke="white" strokeWidth="0.8"/>
        <line x1="340" y1="170" x2="460" y2="130" stroke="white" strokeWidth="0.8"/>
        <line x1="340" y1="170" x2="460" y2="195" stroke="white" strokeWidth="0.8"/>
        <line x1="340" y1="220" x2="460" y2="195" stroke="white" strokeWidth="0.8"/>
        <line x1="460" y1="55" x2="580" y2="35" stroke="white" strokeWidth="0.8"/>
        <line x1="460" y1="55" x2="580" y2="100" stroke="white" strokeWidth="0.8"/>
        <line x1="460" y1="130" x2="580" y2="100" stroke="white" strokeWidth="0.8"/>
        <line x1="460" y1="130" x2="580" y2="160" stroke="white" strokeWidth="0.8"/>
        <line x1="460" y1="195" x2="580" y2="160" stroke="white" strokeWidth="0.8"/>
        <line x1="460" y1="195" x2="580" y2="210" stroke="white" strokeWidth="0.8"/>
        <line x1="580" y1="35" x2="700" y2="60" stroke="white" strokeWidth="0.8"/>
        <line x1="580" y1="100" x2="700" y2="60" stroke="white" strokeWidth="0.8"/>
        <line x1="580" y1="100" x2="700" y2="130" stroke="white" strokeWidth="0.8"/>
        <line x1="580" y1="160" x2="700" y2="130" stroke="white" strokeWidth="0.8"/>
        <line x1="580" y1="210" x2="700" y2="130" stroke="white" strokeWidth="0.8"/>
        <line x1="700" y1="60" x2="820" y2="40" stroke="white" strokeWidth="0.8"/>
        <line x1="700" y1="60" x2="820" y2="110" stroke="white" strokeWidth="0.8"/>
        <line x1="700" y1="130" x2="820" y2="110" stroke="white" strokeWidth="0.8"/>
        <line x1="700" y1="130" x2="820" y2="185" stroke="white" strokeWidth="0.8"/>
        <line x1="820" y1="40" x2="900" y2="70" stroke="white" strokeWidth="0.8"/>
        <line x1="820" y1="110" x2="900" y2="70" stroke="white" strokeWidth="0.8"/>
        <line x1="820" y1="185" x2="900" y2="150" stroke="white" strokeWidth="0.8"/>
        <circle cx="20" cy="60" r="2.5" fill="white"/>
        <circle cx="20" cy="180" r="2.5" fill="white"/>
        <circle cx="110" cy="30" r="3.5" fill="white"/>
        <circle cx="110" cy="110" r="5" fill="white"/>
        <circle cx="110" cy="200" r="3" fill="white"/>
        <circle cx="220" cy="60" r="4.5" fill="white"/>
        <circle cx="220" cy="140" r="3.5" fill="white"/>
        <circle cx="220" cy="210" r="2.5" fill="white"/>
        <circle cx="340" cy="30" r="3" fill="white"/>
        <circle cx="340" cy="90" r="6" fill="white"/>
        <circle cx="340" cy="170" r="4" fill="white"/>
        <circle cx="340" cy="220" r="2.5" fill="white"/>
        <circle cx="460" cy="55" r="5" fill="white"/>
        <circle cx="460" cy="130" r="7" fill="white"/>
        <circle cx="460" cy="195" r="3.5" fill="white"/>
        <circle cx="580" cy="35" r="3" fill="white"/>
        <circle cx="580" cy="100" r="5.5" fill="white"/>
        <circle cx="580" cy="160" r="4" fill="white"/>
        <circle cx="580" cy="210" r="2.5" fill="white"/>
        <circle cx="700" cy="60" r="4.5" fill="white"/>
        <circle cx="700" cy="130" r="6" fill="white"/>
        <circle cx="820" cy="40" r="3.5" fill="white"/>
        <circle cx="820" cy="110" r="5" fill="white"/>
        <circle cx="820" cy="185" r="3" fill="white"/>
      </svg>

      {/* Ligne de scan animée */}
      <div style={{
        position: "absolute",
        left: 0, right: 0, top: 0,
        height: "1.5px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        animation: "hero-scan 5s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Contenu principal */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px" }}>

        {/* Texte + actions */}
        <div style={{ flex: 1 }}>
          {/* Badge statut */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
            padding: "5px 14px",
            fontSize: "11.5px", fontWeight: 600, color: "rgba(255,255,255,0.92)",
            marginBottom: "18px",
            backdropFilter: "blur(6px)",
          }}>
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: badge.dot, display: "inline-block", flexShrink: 0 }} />
            {badge.text}
          </div>

          <h1 style={{
            fontSize: "1.95rem", fontWeight: 800, color: "white",
            margin: "0 0 10px", lineHeight: 1.18, letterSpacing: "-0.025em",
          }}>
            {title}
          </h1>

          {subtitle && (
            <p style={{
              fontSize: "0.88rem", color: "rgba(255,255,255,0.72)",
              margin: "0 0 26px", lineHeight: 1.65, maxWidth: "460px",
            }}>
              {subtitle.split("\\n").map((line, i) => (
                <span key={i} style={{ display: "block" }}>{line}</span>
              ))}
            </p>
          )}

          {/* Boutons d'action */}
          {actions && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  style={{
                    padding: "9px 22px",
                    borderRadius: "9px",
                    border: action.variant === "ghost"
                      ? "1px solid rgba(255,255,255,0.28)"
                      : "none",
                    background: action.variant === "ghost"
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(255,255,255,0.94)",
                    color: action.variant === "ghost" ? "rgba(255,255,255,0.88)" : "#4338CA",
                    fontSize: "0.875rem", fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.15s ease",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {children && <div style={{ marginTop: "20px" }}>{children}</div>}
        </div>

        {/* Icône biométrique */}
        <div style={{ width: "148px", height: "148px", position: "relative", flexShrink: 0 }}>
          {/* Anneau extérieur tournant */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.18)",
            borderTopColor: "rgba(255,255,255,0.6)",
            animation: "hero-spin 8s linear infinite",
          }} />
          {/* Anneau intermédiaire */}
          <div style={{
            position: "absolute", inset: "20px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.22)",
            borderBottomColor: "rgba(255,255,255,0.6)",
            animation: "hero-spin 5s linear infinite reverse",
          }} />
          {/* Centre vitré */}
          <div style={{
            position: "absolute", inset: "40px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.22)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 3H5a2 2 0 00-2 2v4"/>
              <path d="M15 3h4a2 2 0 012 2v4"/>
              <path d="M9 21H5a2 2 0 01-2-2v-4"/>
              <path d="M15 21h4a2 2 0 002-2v-4"/>
              <circle cx="9" cy="10" r="1.3" fill="white" stroke="none"/>
              <circle cx="15" cy="10" r="1.3" fill="white" stroke="none"/>
              <path d="M9 15.5c.6 1.2 1.6 1.8 3 1.8s2.4-.6 3-1.8"/>
            </svg>
          </div>
          {/* Coins de scan */}
          {[
            { top: "4px", left: "4px", borderTop: "2px solid white", borderLeft: "2px solid white" },
            { top: "4px", right: "4px", borderTop: "2px solid white", borderRight: "2px solid white" },
            { bottom: "4px", left: "4px", borderBottom: "2px solid white", borderLeft: "2px solid white" },
            { bottom: "4px", right: "4px", borderBottom: "2px solid white", borderRight: "2px solid white" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: "14px", height: "14px", ...s }} />
          ))}
          {/* Badge vert */}
          <div style={{
            position: "absolute", top: "10px", right: "8px",
            width: "20px", height: "20px",
            background: "#10B981",
            borderRadius: "50%",
            border: "2.5px solid rgba(255,255,255,0.9)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NeuralHero;
