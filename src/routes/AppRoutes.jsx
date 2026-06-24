import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Recognize from "../pages/Recognize";
import Search from "../pages/Search";

/**
 * Routing centralise de l'application.
 * Chaque page correspond a une fonctionnalite du cahier des charges :
 * - /          -> Accueil
 * - /register  -> F1 Enrolement (Lissa)
 * - /recognize -> F2 Reconnaissance (Maguette)
 * - /search    -> F3 Consultation (Emilie)
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recognize" element={<Recognize />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default AppRoutes;
