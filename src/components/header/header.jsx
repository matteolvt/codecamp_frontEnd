import React from "react";
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
            <a href="#" className="text-gray-700 hover:text-[#000091]">
              Accueil
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-[#000091]">
              Vos démarches
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-[#000091]">
              Signaler un fait
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-[#000091]">
              Actualités
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-[#000091]">
              Infos et ressources
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-[#000091]">
              À Propos
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
