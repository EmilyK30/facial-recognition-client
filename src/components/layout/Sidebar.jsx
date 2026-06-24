import { NavLink } from "react-router-dom";

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

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">
          <IconShield />
        </div>
        <div className="sidebar__logo-text">
          <span className="sidebar__logo-title">FaceID</span>
          <span className="sidebar__logo-sub">Manager</span>
        </div>
      </div>

      <nav className="sidebar__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "sidebar__link" + (isActive ? " active" : "")
          }
        >
          <span className="sidebar__link-icon"><IconHome /></span>
          <span>Accueil</span>
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            "sidebar__link" + (isActive ? " active" : "")
          }
        >
          <span className="sidebar__link-icon"><IconUser /></span>
          <span>Enrôlement</span>
        </NavLink>

        <NavLink
          to="/recognize"
          className={({ isActive }) =>
            "sidebar__link" + (isActive ? " active" : "")
          }
        >
          <span className="sidebar__link-icon"><IconScan /></span>
          <span>Reconnaissance</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            "sidebar__link" + (isActive ? " active" : "")
          }
        >
          <span className="sidebar__link-icon"><IconSearch /></span>
          <span>Recherche</span>
        </NavLink>
      </nav>

      <div className="sidebar__agent">
        <div className="sidebar__agent-avatar">AG</div>
        <div className="sidebar__agent-info">
          <span className="sidebar__agent-name">Agent</span>
          <span className="sidebar__agent-role">Connecté</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
