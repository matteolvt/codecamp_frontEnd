import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
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
          <button className="bg-[#000091] text-white px-4 py-2 rounded mr-30">
            Se connecter
          </button>
        </div>
      </nav>
      <nav className="bg-white p-4 border-b h-20 flex items-center justify-center">
        <ul className="flex justify-center space-x-10 ">
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
            <Link to="/a-propos" className="text-gray-700 hover:text-[#000091]">
              À Propos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
