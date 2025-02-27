import { Link } from "react-router-dom";

export const StepCards = () => {
  const steps = [
    {
      title: "Déposer un signalement",
      content:
        "Suivez les étapes pour soumettre une dénonciation de manière anonyme et sécurisée.",
      color: "bg-blue-900",
      arrowColor: "bg-orange-400",
      link: "/signaler",
    },
    {
      title: "Suivi de votre dossier",
      content:
        "Consultez l'état de votre signalement et les actions entreprises.",
      color: "bg-blue-800",
      arrowColor: "bg-pink-400",
      link: "#suivi-dossier",
    },
    {
      title: "Vos droits et protections",
      content:
        "Informez-vous sur les mesures de protection des lanceurs d’alerte.",
      color: "bg-blue-700",
      arrowColor: "bg-green-400",
      link: "#droits-protection",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-8 text-center">
      {steps.map((step, index) => (
        <Link key={index} to={step.link} className="relative block h-full">
          <div
            className={`relative ${step.color} text-white p-6 rounded shadow flex flex-col items-center justify-between h-full`}
          >
            <h3 className="font-bold mb-2">{step.title}</h3>
            <p className="flex-grow flex items-center justify-center">
              {step.content}
            </p>
            <div className={`absolute bottom-0 right-0 p-3 ${step.arrowColor}`}>
              <span className="text-black text-xl">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
