import { useEffect, useState } from "react";
import { HeroSectionDem } from "../../components/heroSectionDem/heroSectionDem";
import { StepCards } from "../../components/stepCards/stepCards";

export const VosDemarches = ({ addNotification }) => {
  const [userId, setUserId] = useState(null);
  const [denonces, setDenonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      setDenonces((prevDenonces) => prevDenonces.filter((d) => d.id !== id));
      addNotification("📢 Dénonciation supprimée avec succès !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      addNotification("❌ Erreur lors de la suppression !");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <HeroSectionDem />
      <StepCards />
      <div className="w-full max-w-5xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">📋 Vos Dénonciations</h2>
        {loading ? (
          <p className="text-center text-gray-600">Chargement...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : denonces.length === 0 ? (
          <p className="text-center text-gray-500">Aucune dénonciation trouvée.</p>
        ) : (
          <div className={`grid ${denonces.length === 1 ? "grid-cols-1 justify-center" : "grid-cols-1 md:grid-cols-2 justify-center"} gap-8`}>
            {denonces.map((feature) => (
              <div
                key={feature.id}
                className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto relative"
              >
                <h3 className="text-lg font-bold text-gray-800">{feature.properties.titre}</h3>
                <p className="text-gray-600 mt-2">{feature.properties.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Catégorie :</strong> {feature.properties.categorie}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Localisation :</strong> {feature.properties.localisation}
                </p>
                <p className="text-sm text-gray-500">
                  <strong>Date :</strong> {new Date(feature.properties.date_creation).toLocaleString()}
                </p>
                <button
                  onClick={() => handleDelete(feature.id)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                >
                  🗑 Supprimer
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
