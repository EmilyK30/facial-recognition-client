import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const IconHome = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

const IconScan = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconSearch = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

function useClock() {
  const fmt = () =>
    new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function Sidebar() {
  const time = useClock();

  return (
    <aside className="sidebar">

      {/* Grille de points — même dynamique que le hero */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Orbe violet haut-gauche */}
      <div style={{
        position: "absolute", top: "-70px", left: "-50px",
        width: "220px", height: "220px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Orbe indigo bas-droite */}
      <div style={{
        position: "absolute", bottom: "-80px", right: "-60px",
        width: "200px", height: "200px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Réseau neuronal vertical */}
      <svg
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.09, pointerEvents: "none", zIndex: 0 }}
        viewBox="0 0 240 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1="40" y1="90" x2="120" y2="160" stroke="white" strokeWidth="0.8"/>
        <line x1="40" y1="90" x2="80" y2="220" stroke="white" strokeWidth="0.8"/>
        <line x1="200" y1="90" x2="120" y2="160" stroke="white" strokeWidth="0.8"/>
        <line x1="120" y1="160" x2="80" y2="220" stroke="white" strokeWidth="0.8"/>
        <line x1="120" y1="160" x2="170" y2="290" stroke="white" strokeWidth="0.8"/>
        <line x1="80" y1="220" x2="170" y2="290" stroke="white" strokeWidth="0.8"/>
        <line x1="80" y1="220" x2="40" y2="360" stroke="white" strokeWidth="0.8"/>
        <line x1="170" y1="290" x2="200" y2="400" stroke="white" strokeWidth="0.8"/>
        <line x1="40" y1="360" x2="120" y2="430" stroke="white" strokeWidth="0.8"/>
        <line x1="200" y1="400" x2="120" y2="430" stroke="white" strokeWidth="0.8"/>
        <line x1="120" y1="430" x2="60" y2="530" stroke="white" strokeWidth="0.8"/>
        <line x1="120" y1="430" x2="185" y2="540" stroke="white" strokeWidth="0.8"/>
        <line x1="60" y1="530" x2="185" y2="540" stroke="white" strokeWidth="0.8"/>
        <line x1="60" y1="530" x2="100" y2="640" stroke="white" strokeWidth="0.8"/>
        <line x1="185" y1="540" x2="100" y2="640" stroke="white" strokeWidth="0.8"/>
        <line x1="185" y1="540" x2="160" y2="700" stroke="white" strokeWidth="0.8"/>
        <circle cx="40" cy="90" r="3" fill="white"/>
        <circle cx="200" cy="90" r="2.5" fill="white"/>
        <circle cx="120" cy="160" r="5" fill="white"/>
        <circle cx="80" cy="220" r="3.5" fill="white"/>
        <circle cx="170" cy="290" r="4" fill="white"/>
        <circle cx="40" cy="360" r="2.5" fill="white"/>
        <circle cx="200" cy="400" r="3" fill="white"/>
        <circle cx="120" cy="430" r="5.5" fill="white"/>
        <circle cx="60" cy="530" r="3.5" fill="white"/>
        <circle cx="185" cy="540" r="4" fill="white"/>
        <circle cx="100" cy="640" r="3" fill="white"/>
        <circle cx="160" cy="700" r="2.5" fill="white"/>
      </svg>

      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <IconShield />
        </div>
        <div className="sidebar__logo-text">
          <span className="sidebar__logo-title">FaceID</span>
          <span className="sidebar__logo-sub">Manager</span>
        </div>
      </div>

      <span className="sidebar__nav-label">Navigation</span>

      <nav className="sidebar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
        >
          <span className="sidebar__link-icon"><IconHome /></span>
          <span>Accueil</span>
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
        >
          <span className="sidebar__link-icon"><IconUser /></span>
          <span>Enrôlement</span>
        </NavLink>

        <NavLink
          to="/recognize"
          className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
        >
          <span className="sidebar__link-icon"><IconScan /></span>
          <span>Reconnaissance</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) => "sidebar__link" + (isActive ? " active" : "")}
        >
          <span className="sidebar__link-icon"><IconSearch /></span>
          <span>Recherche</span>
        </NavLink>
      </nav>

      <div className="sidebar__footer">
        <span className="sidebar__time">{time}</span>
        <div className="sidebar__status">
          <span className="sidebar__status-dot" />
          <span className="sidebar__status-text">Actif</span>
        </div>
      </div>

      <div className="sidebar__agent">
        <div className="sidebar__agent-avatar">AG</div>
        <div className="sidebar__agent-info" style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1.3 }}>
          <span className="sidebar__agent-name" style={{ margin: 0, padding: 0, display: "block" }}>Agent</span>
          <span className="sidebar__agent-role" style={{ margin: 0, padding: 0, display: "flex", alignItems: "center", gap: "4px" }}><span className="sidebar__online-dot" />Connecté</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
