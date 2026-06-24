import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <h1>Bienvenue</h1>
        <p className="page-header__subtitle">
          Que souhaitez-vous faire aujourd'hui ?
        </p>
      </div>

      <div className="home-cards">
        <div className="home-card" onClick={() => navigate("/register")}>
          <div className="home-card__icon home-card__icon--register">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
              <line x1="12" y1="12" x2="12" y2="16"/>
              <line x1="10" y1="14" x2="14" y2="14"/>
            </svg>
          </div>
          <h3 className="home-card__title">Enrôlement</h3>
          <p className="home-card__desc">
            Enregistrer un nouveau visage dans le système.
          </p>
          <button className="home-card__btn home-card__btn--register">
            Commencer →
          </button>
        </div>

        <div className="home-card" onClick={() => navigate("/recognize")}>
          <div className="home-card__icon home-card__icon--recognize">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <h3 className="home-card__title">Reconnaissance</h3>
          <p className="home-card__desc">
            Identifier une personne en temps réel.
          </p>
          <button className="home-card__btn home-card__btn--recognize">
            Commencer →
          </button>
        </div>

        <div className="home-card" onClick={() => navigate("/search")}>
          <div className="home-card__icon home-card__icon--search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <h3 className="home-card__title">Recherche</h3>
          <p className="home-card__desc">
            Rechercher une personne par son numéro de dossier.
          </p>
          <button className="home-card__btn home-card__btn--search">
            Commencer →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
