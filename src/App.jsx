import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/homePage/homePage";
import { VosDemarches } from "./pages/vosDemarches/vosDemarches";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { SignalerUnFait } from "./pages/signalerUnFait/signalerUnFait";
import { AuthPage } from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Forbidden from "./pages/Forbidden.jsx/Forbidden";
import { Actualites } from "./pages/actualites/actualites"; // Nouvelle route Actualites
import { Notifications } from "./components/notifications/notifications"; // Importation du composant Notifications
import { Propos } from "./pages/propos/propos";
import { InfosRessources } from "./pages/InfosRessources/InfoRessources";

const AppContent = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/connexion";
  const isAuthenticated = localStorage.getItem("access_token");
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    setNotifications((prev) => [message, ...prev]);
  };

  return (
    <>
      {!hideHeaderFooter && (
        <Header toggleNotifications={() => {}} notifications={notifications} />
      )}
      <Notifications notifications={notifications} />
      <div className="p-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/vos-demarches"
            element={<VosDemarches addNotification={addNotification} />}
          />
          <Route path="/signaler" element={<SignalerUnFait />} />
          <Route path="/connexion" element={<AuthPage />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/connexion" />
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
        </Routes>
      </div>
      {!hideHeaderFooter && <Footer />}
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
