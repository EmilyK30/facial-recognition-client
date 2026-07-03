import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NeuralHero from "../components/common/NeuralHero";
import { useApiStatus } from "../hooks/useApiStatus";
import { getStats } from "../services/stats";

/**
 * Configuration des tuiles de statistiques.
 * Les valeurs réelles proviennent des compteurs locaux (services/stats.js),
 * incrémentés à chaque opération réussie.
 */
const STAT_TILES = [
  {
    key: "enrolements",
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
    key: "reconnaissances",
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
    key: "recherches",
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
];

/**
 * Apparence de la tuile "Statut du système" selon l'état réel du backend,
 * vérifié au chargement de la page via checkApiStatus().
 */
const STATUS_DISPLAY = {
  checking: { value: "Vérification…", color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
  up: { value: "Actif", color: "#10B981", bg: "rgba(16,185,129,0.1)" },
  down: { value: "Hors ligne", color: "#DC2626", bg: "rgba(220,38,38,0.1)" },
};

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
    desc: "Retrouvez une fiche par numéro de dossier.",
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

  // Compteurs locaux lus une fois au montage de la page
  const [stats] = useState(getStats);

  // Statut réel du backend, partagé avec le badge du hero (une seule requête)
  const apiStatus = useApiStatus();
  const status = STATUS_DISPLAY[apiStatus];

  return (
    <div>
      {/* HERO */}
      <NeuralHero
        title="Bienvenue sur FaceID Manager"
        subtitle="Plateforme de reconnaissance faciale multi-tenant.\nEnrôlez, identifiez et gérez les personnes en temps réel."
      />

      {/* CARTES */}
      <div className="home-cards">
        {/* Chaque carte est entièrement cliquable ET navigable au clavier
            (Tab pour focus, Entrée ou Espace pour ouvrir) */}
        {CARDS.map((card) => (
          <div
            key={card.key}
            className="home-card"
            style={{ "--accent": card.accent }}
            role="button"
            tabIndex={0}
            aria-label={`Ouvrir ${card.title}`}
            onClick={() => navigate(card.path)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault(); // évite le défilement de la page avec Espace
                navigate(card.path);
              }
            }}
          >
            <div className="home-card__icon" style={{ background: card.iconBg }}>
              {card.icon}
            </div>
            <h3 className="home-card__title">{card.title}</h3>
            <p className="home-card__desc">{card.desc}</p>
            {/* Bouton décoratif : la carte entière gère la navigation,
                on le sort donc du parcours clavier et des lecteurs d'écran */}
            <button
              type="button"
              className="home-card__btn"
              style={{ background: card.accent }}
              tabIndex={-1}
              aria-hidden="true"
            >
              Ouvrir →
            </button>
          </div>
        ))}
      </div>

      {/* STATS */}
      <div className="stats-bar">
        {STAT_TILES.map((tile) => (
          <div key={tile.key} className="stats-bar__item" style={{ "--stat-accent": tile.color }}>
            <div className="stats-bar__header">
              <span className="stats-bar__label">{tile.label}</span>
              <div className="stats-bar__icon" style={{ background: tile.bg }}>
                {tile.icon}
              </div>
            </div>
            <div className="stats-bar__body">
              <span className="stats-bar__value" style={{ color: tile.color }}>
                {stats[tile.key].toLocaleString("fr-FR")}
              </span>
            </div>
          </div>
        ))}

        {/* Tuile statut : reflète l'état réel du backend */}
        <div className="stats-bar__item" style={{ "--stat-accent": status.color }}>
          <div className="stats-bar__header">
            <span className="stats-bar__label">Statut du système</span>
            <div className="stats-bar__icon" style={{ background: status.bg }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={status.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>
          <div className="stats-bar__body">
            <span className="stats-bar__value" style={{ color: status.color }}>
              {status.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
