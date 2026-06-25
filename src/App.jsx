import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import "./styles/global.css";

function BiometricBg() {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: "240px",
      right: 0,
      bottom: 0,
      pointerEvents: "none",
      zIndex: 0,
      overflow: "hidden",
      opacity: 0.18,
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── Cluster haut-gauche (continuité avec le header) ── */}
        <line x1="60"  y1="50"  x2="180" y2="20"  stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="180" y1="20"  x2="300" y2="60"  stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="60"  y1="50"  x2="140" y2="130" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="140" y1="130" x2="280" y2="110" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="280" y1="110" x2="300" y2="60"  stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="300" y1="60"  x2="420" y2="90"  stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="140" y1="130" x2="200" y2="210" stroke="#6366F1" strokeWidth="0.9"/>
        <circle cx="60"  cy="50"  r="4"   fill="#6366F1"/>
        <circle cx="180" cy="20"  r="5.5" fill="#8B5CF6"/>
        <circle cx="300" cy="60"  r="3.5" fill="#6366F1"/>
        <circle cx="140" cy="130" r="6"   fill="#8B5CF6"/>
        <circle cx="280" cy="110" r="3"   fill="#6366F1"/>
        <circle cx="420" cy="90"  r="4.5" fill="#8B5CF6"/>
        <circle cx="200" cy="210" r="3"   fill="#6366F1"/>

        {/* ── Cluster haut-droite ── */}
        <line x1="820" y1="30"  x2="960"  y2="60"  stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="960" y1="60"  x2="1080" y2="30"  stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="820" y1="30"  x2="900"  y2="120" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="900" y1="120" x2="1020" y2="100" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="1020" y1="100" x2="1080" y2="30" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="1080" y1="30"  x2="1180" y2="70" stroke="#8B5CF6" strokeWidth="0.9"/>
        <circle cx="820"  cy="30"  r="3.5" fill="#6366F1"/>
        <circle cx="960"  cy="60"  r="6"   fill="#8B5CF6"/>
        <circle cx="1080" cy="30"  r="4"   fill="#6366F1"/>
        <circle cx="900"  cy="120" r="5"   fill="#8B5CF6"/>
        <circle cx="1020" cy="100" r="3"   fill="#6366F1"/>
        <circle cx="1180" cy="70"  r="4"   fill="#8B5CF6"/>

        {/* ── Cluster milieu-gauche ── */}
        <line x1="30"  y1="380" x2="130" y2="320" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="130" y1="320" x2="260" y2="360" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="30"  y1="380" x2="80"  y2="480" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="80"  y1="480" x2="220" y2="450" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="220" y1="450" x2="260" y2="360" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="260" y1="360" x2="360" y2="400" stroke="#8B5CF6" strokeWidth="0.9"/>
        <circle cx="30"  cy="380" r="3"   fill="#8B5CF6"/>
        <circle cx="130" cy="320" r="5.5" fill="#6366F1"/>
        <circle cx="260" cy="360" r="4"   fill="#8B5CF6"/>
        <circle cx="80"  cy="480" r="3.5" fill="#6366F1"/>
        <circle cx="220" cy="450" r="5"   fill="#8B5CF6"/>
        <circle cx="360" cy="400" r="3"   fill="#6366F1"/>

        {/* ── Cluster milieu-droite ── */}
        <line x1="900" y1="360" x2="1020" y2="310" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="1020" y1="310" x2="1160" y2="350" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="900"  y1="360" x2="960"  y2="460" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="960"  y1="460" x2="1100" y2="440" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="1100" y1="440" x2="1160" y2="350" stroke="#8B5CF6" strokeWidth="0.9"/>
        <circle cx="900"  cy="360" r="4.5" fill="#6366F1"/>
        <circle cx="1020" cy="310" r="6"   fill="#8B5CF6"/>
        <circle cx="1160" cy="350" r="3.5" fill="#6366F1"/>
        <circle cx="960"  cy="460" r="4"   fill="#8B5CF6"/>
        <circle cx="1100" cy="440" r="5"   fill="#6366F1"/>

        {/* ── Cluster bas-gauche ── */}
        <line x1="50"  y1="680" x2="180" y2="640" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="180" y1="640" x2="300" y2="700" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="50"  y1="680" x2="100" y2="800" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="100" y1="800" x2="240" y2="780" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="240" y1="780" x2="300" y2="700" stroke="#6366F1" strokeWidth="0.9"/>
        <circle cx="50"  cy="680" r="3.5" fill="#8B5CF6"/>
        <circle cx="180" cy="640" r="5"   fill="#6366F1"/>
        <circle cx="300" cy="700" r="4"   fill="#8B5CF6"/>
        <circle cx="100" cy="800" r="3"   fill="#6366F1"/>
        <circle cx="240" cy="780" r="4.5" fill="#8B5CF6"/>

        {/* ── Cluster bas-droite ── */}
        <line x1="850"  y1="700" x2="980"  y2="660" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="980"  y1="660" x2="1100" y2="700" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="850"  y1="700" x2="900"  y2="820" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="900"  y1="820" x2="1040" y2="800" stroke="#6366F1" strokeWidth="0.9"/>
        <line x1="1040" y1="800" x2="1100" y2="700" stroke="#8B5CF6" strokeWidth="0.9"/>
        <line x1="1100" y1="700" x2="1200" y2="740" stroke="#6366F1" strokeWidth="0.9"/>
        <circle cx="850"  cy="700" r="4"   fill="#6366F1"/>
        <circle cx="980"  cy="660" r="6"   fill="#8B5CF6"/>
        <circle cx="1100" cy="700" r="3.5" fill="#6366F1"/>
        <circle cx="900"  cy="820" r="3"   fill="#8B5CF6"/>
        <circle cx="1040" cy="800" r="5"   fill="#6366F1"/>
        <circle cx="1200" cy="740" r="3"   fill="#8B5CF6"/>
      </svg>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <BiometricBg />
        <main className="app-content">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
