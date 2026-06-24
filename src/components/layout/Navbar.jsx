import { Link } from "react-router-dom";

/**
 * Navigation simple entre les 3 fonctionnalites.
 * Permet de tester chaque page sans taper l'URL a la main.
 */
function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      <Link to="/register">Enrolement</Link>
      <Link to="/recognize">Reconnaissance</Link>
      <Link to="/search">Recherche</Link>
    </nav>
  );
}

export default Navbar;


