import { useNavigate } from "react-router-dom";
import NeuralHero from "../components/common/NeuralHero";

const STATS = [
  {
    value: "1 248",
    label: "Personnes enrôlées",
    color: "#6366F1",
    bg: "rgba(99,102,241,0.1)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    value: "856",
    label: "Reconnaissances réussies",
    color: "#10B981",
    bg: "rgba(16,185,129,0.1)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    value: "392",
    label: "Recherches effectuées",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,0.1)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    value: "Actif",
    label: "Statut du système",
    color: "#4F46E5",
    bg: "rgba(79,70,229,0.1)",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];


const CARDS = [
  {
    key: "register",
    title: "Enrôlement",
    desc: "Capturez et enregistrez un nouveau visage dans la base biométrique.",
    path: "/register",
    accent: "#6366F1",
    iconBg: "rgba(99,102,241,0.1)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
        <line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
  },
  {
    key: "recognize",
    title: "Reconnaissance",
    desc: "Identifiez une personne en temps réel via webcam ou photo.",
    path: "/recognize",
    accent: "#4F46E5",
    iconBg: "rgba(79,70,229,0.1)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
  },
  {
    key: "search",
    title: "Recherche",
    desc: "Retrouvez une fiche par numéro de dossier ou attribut.",
    path: "/search",
    accent: "#8B5CF6",
    iconBg: "rgba(139,92,246,0.1)",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <NeuralHero
        title="Bienvenue sur FaceID Manager"
        subtitle="Plateforme de reconnaissance faciale multi-tenant.\nEnrôlez, identifiez et gérez les personnes en temps réel."
      />

      {/* CARTES */}
      <div className="home-cards">
        {CARDS.map((card) => (
          <div
            key={card.key}
            className="home-card"
            style={{ "--accent": card.accent }}
            onClick={() => navigate(card.path)}
          >
            <div className="home-card__icon" style={{ background: card.iconBg }}>
              {card.icon}
            </div>
            <h3 className="home-card__title">{card.title}</h3>
            <p className="home-card__desc">{card.desc}</p>
            <button
              className="home-card__btn"
              style={{ background: card.accent }}
            >
              Ouvrir →
            </button>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="stats-bar">
        {STATS.map((s, i) => (
          <div key={i} className="stats-bar__item" style={{ "--stat-accent": s.color }}>
            <div className="stats-bar__header">
              <span className="stats-bar__label">{s.label}</span>
              <div className="stats-bar__icon" style={{ background: s.bg }}>
                {s.icon}
              </div>
            </div>
            <div className="stats-bar__body">
              <span className="stats-bar__value" style={{ color: s.color }}>{s.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
