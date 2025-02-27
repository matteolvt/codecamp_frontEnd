import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/homePage/homePage";
import { VosDemarches } from "./pages/vosDemarches/vosDemarches";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { SignalerUnFait } from "./pages/signalerUnFait/signalerUnFait";

const App = () => {
  return (
    <Router>
      <Header />
      <div className="p-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vos-demarches" element={<VosDemarches />} />
          <Route path="/signaler" element={<SignalerUnFait />} />
          {/* Nouvelle route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
