import React from "react";
import "./homeSections.css";

export const InfoCards = () => {
  const cards = [
    {
      title: "Dernières dénonciations",
      content:
        "Consultez les signalements récents et suivez les actions entreprises.",
      color: "bg-blue-900",
      arrowColor: "bg-orange-400",
      link: "#dernieres-denonciations",
    },
    {
      title: "Comment faire la démarche ?",
      content:
        "Un guide pas à pas pour soumettre votre signalement de manière sécurisée et anonyme.",
      color: "bg-blue-800",
      arrowColor: "bg-pink-400",
      link: "#comment-faire",
    },
    {
      title: "Protection et sécurité",
      content:
        "Découvrez vos droits et les mesures mises en place pour protéger les lanceurs d’alerte.",
      color: "bg-blue-700",
      arrowColor: "bg-green-400",
      link: "#protection-securite",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 text-center">
      {cards.map((card, index) => (
        <a key={index} href={card.link} className="relative block h-50">
          <div
            className={`relative ${card.color} text-white p-6 rounded shadow flex flex-col items-center justify-between h-full`}
          >
            <h3 className="font-bold mb-2">{card.title}</h3>
            <p className="flex-grow flex items-center justify-center">
              {card.content}
            </p>
            <div className={`absolute bottom-0 right-0 p-3 ${card.arrowColor}`}>
              <span className="text-black text-xl">→</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};
