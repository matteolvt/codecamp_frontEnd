import { useState } from "react";

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    try {
      // Utilisation de Nominatim pour géocoder la ville saisie
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(formData.city)}&format=json`
      );
      const geoData = await geoResponse.json();
      if (geoData.length === 0) {
        throw new Error("Ville non trouvée. Veuillez vérifier le nom de la ville.");
      }
      // On prend le premier résultat
      const { lat, lon } = geoData[0];

      // Construction du payload attendu par votre API (correspondant au modèle Django)
      const payload = {
        titre: formData.title,
        description: formData.description,
        categorie: formData.category,
        localisation: formData.city,
        point: {
          type: "Point",
          // En GeoJSON, l'ordre est [longitude, latitude]
          coordinates: [parseFloat(lon), parseFloat(lat)]
        },
        important: false,
        // Le champ "user" n'est pas envoyé car il est automatiquement attribué dans perform_create.
      };

      // Récupération du token depuis le localStorage
      const token = localStorage.getItem("access_token");

      const response = await fetch("http://localhost:8000/api/denonciations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du signalement");
      }
      const data = await response.json();
      console.log("Signalement créé :", data);
      setSuccessMessage("Signalement envoyé avec succès !");
      // Réinitialisation du formulaire
      setFormData({
        title: "",
        description: "",
        category: "",
        city: "",
      });
    } catch (error) {
      console.error("Erreur :", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center bg-gray-100 p-2">
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          🚨 Faites entendre votre voix !
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Titre */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Titre du signalement
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Ex : Corruption dans mon quartier"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="5"
              required
              placeholder="Expliquez la situation en détail..."
            />
          </div>

          {/* Catégorie */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Catégorie
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              <option value="corruption">Corruption & Abus de pouvoir</option>
              <option value="droits_humains">Violations des droits humains</option>
              <option value="fraude">Fraudes & Crimes économiques</option>
              <option value="sante_securite">Santé publique & Sécurité</option>
              <option value="maltraitance_animale">Maltraitance animale</option>
            </select>
          </div>

          {/* Ville */}
          <div>
            <label className="block text-gray-700 font-semibold">Ville</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              placeholder="Ex : Paris, Marseille..."
            />
          </div>

          {/* Bouton de soumission */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-xl text-lg font-bold transition-all hover:bg-red-700 shadow-lg"
          >
            {loading ? "Envoi en cours..." : "🚀 Envoyer le signalement"}
          </button>
        </form>
      </div>
    </div>
  );
};
