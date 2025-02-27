import { useEffect, useState } from "react";
import { HeroSectionDem } from "../../components/heroSectionDem/heroSectionDem";
import { StepCards } from "../../components/stepCards/stepCards";
import "./vosDemarches.css";

export const VosDemarches = () => {
  const [userId, setUserId] = useState(null);
  const [denonces, setDenonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les infos de l'utilisateur connecté
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      setError("Utilisateur non authentifié");
      setLoading(false);
      return;
    }

    fetch("http://localhost:8000/api/user/", {  // Modifiez ici l'URL si nécessaire
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des informations utilisateur");
        }
        return res.json();
      })
      .then((userData) => {
        setUserId(userData.id);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Une fois l'id utilisateur connu, récupérer et filtrer les dénonciations
  useEffect(() => {
    if (!userId) return;
    const token = localStorage.getItem("access_token");

    fetch("http://localhost:8000/api/denonciations/", {
      headers: { "Authorization": `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des dénonciations");
        }
        return res.json();
      })
      .then((data) => {
        if (data.features) {
          // Filtrer les dénonciations dont la propriété "user" correspond à l'id connecté
          const myDenonces = data.features.filter(
            (feature) => feature.properties.user === userId
          );
          setDenonces(myDenonces);
        } else {
          setDenonces([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="flex flex-col items-center">
      <HeroSectionDem />
      <StepCards />
      <div className="w-full max-w-3xl p-6">
        <h2 className="text-2xl font-bold mb-4">Vos dénonciations</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : denonces.length === 0 ? (
          <p>Aucune dénonciation trouvée.</p>
        ) : (
          <ul className="space-y-4">
            {denonces.map((feature) => (
              <li key={feature.id} className="p-4 border rounded">
                <h3 className="font-bold">{feature.properties.titre}</h3>
                <p>{feature.properties.description}</p>
                <p>
                  <strong>Catégorie :</strong> {feature.properties.categorie}
                </p>
                <p>
                  <strong>Localisation :</strong> {feature.properties.localisation}
                </p>
                <p>
                  <strong>Date :</strong>{" "}
                  {new Date(feature.properties.date_creation).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
