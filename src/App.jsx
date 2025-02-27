import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./pages/homePage/homePage";
import { VosDemarches } from "./pages/vosDemarches/vosDemarches";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { SignalerUnFait } from "./pages/signalerUnFait/signalerUnFait";
import { AuthPage } from "./pages/login/login";

const AppContent = () => {
  const location = useLocation(); // Récupère la route actuelle

  const hideHeaderFooter = location.pathname === "/connexion"; // Vérifie si on est sur la page login

  return (
    <>
      {!hideHeaderFooter && <Header />}{" "}
      {/* Affiche uniquement si on N'EST PAS sur /connexion */}
      <div className="p-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vos-demarches" element={<VosDemarches />} />
          <Route path="/signaler" element={<SignalerUnFait />} />
          <Route path="/connexion" element={<AuthPage />} />{" "}
          {/* Route de connexion */}
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}{" "}
      {/* Affiche uniquement si on N'EST PAS sur /connexion */}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
