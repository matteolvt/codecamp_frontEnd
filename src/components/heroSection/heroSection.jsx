import React from "react";
import "./heroSection.css";

export const HeroSection = () => {
  return (
    <div
      className="relative text-white text-center py-16 flex flex-col items-center justify-center bg-cover bg-center h-200"
      style={{ backgroundImage: "url('/picsou.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative p-8 rounded">
        <h1 className="text-2xl font-bold">
          Exposez la vérité. Protéger l’intérêt public.
        </h1>
        <p className="mt-2">
          Un espace sécurisé pour signaler les abus et injustices
        </p>
        <button className="bg-blue-700 px-6 py-2 mt-4 rounded text-white font-semibold">
          Faire un signalement
        </button>
      </div>
    </div>
  );
};
