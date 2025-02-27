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

    fetch("http://localhost:8000/api/user/", {
      headers: { Authorization: `Bearer ${token}` },
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
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des dénonciations");
        }
        return res.json();
      })
      .then((data) => {
        if (data.features) {
          // Filtrer les dénonciations appartenant à l'utilisateur connecté
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

  // 🔴 Fonction pour SUPPRIMER une dénonciation
  const handleDelete = async (id) => {
    const token = localStorage.getItem("access_token");
    if (!window.confirm("Voulez-vous vraiment supprimer cette dénonciation ?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/denonciations/${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Échec de la suppression");
      }

      // 🔄 Mise à jour de la liste après suppression
      setDenonces((prevDenonces) => prevDenonces.filter((d) => d.id !== id));
      alert("Dénonciation supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression !");
    }
  };

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
              <li key={feature.id} className="p-4 border rounded flex flex-col space-y-2">
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

                {/* 🔴 Bouton Supprimer uniquement */}
                <button
                  onClick={() => handleDelete(feature.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 mt-2"
                >
                  🗑 Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
