import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

export const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Vérifier si un token est présent dans le localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsAuthenticated(!!token); // Met à jour l'état si un token existe
  }, []);

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Supprime le token
    localStorage.removeItem("user_role"); // Supprime le rôle (si nécessaire)
    setIsAuthenticated(false); // Met à jour l'état
    navigate("/"); // Redirige vers l'accueil
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 border-b h-60">
        <div className="flex items-center space-x-2">
          <img
            src="/Republique-francaise-logo.svg.png"
            alt="République Française"
            className="h-35 ml-30"
          />
          <span className="font-semibold">Dénonciation Civique</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Rechercher"
            className="border px-2 py-1 rounded"
          />
          {/* Affiche "Se déconnecter" si l'utilisateur est connecté, sinon "Se connecter" */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded mr-30"
            >
              Se déconnecter
            </button>
          ) : (
            <Link
              to="/connexion"
              className="bg-[#000091] text-white px-4 py-2 rounded mr-30"
            >
              Se connecter
            </Link>
          )}
        </div>
      </nav>
      <nav className="bg-white p-4 border-b h-20 flex items-center justify-center">
        <ul className="flex justify-center space-x-10">
          <li>
            <Link to="/" className="text-gray-700 hover:text-[#000091]">
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/vos-demarches"
              className="text-gray-700 hover:text-[#000091]"
            >
              Vos démarches
            </Link>
          </li>
          <li>
            <Link to="/signaler" className="text-gray-700 hover:text-[#000091]">
              Signaler un fait
            </Link>
          </li>
          <li>
            <Link
              to="/actualites"
              className="text-gray-700 hover:text-[#000091]"
            >
              Actualités
            </Link>
          </li>
          <li>
            <Link
              to="/infos-ressources"
              className="text-gray-700 hover:text-[#000091]"
            >
              Infos et ressources
            </Link>
          </li>
          <li>
            <Link to="/propos" className="text-gray-700 hover:text-[#000091]">
              À Propos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
