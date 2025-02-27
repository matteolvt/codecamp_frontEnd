import { useState } from "react";

export const ReportForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    city: "", // Ajout du champ ville
    anonymous: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");
    setLoading(true);

    // Construction du payload au format attendu par votre API (correspondant au modèle Django)
    const payload = {
      titre: formData.title,
      description: formData.description,
      categorie: formData.category,
      localisation: "", // Ajoutez éventuellement un champ localisation dans le formulaire
      // Pour le champ point, on envoie un objet GeoJSON Point
      point: {
        type: "Point",
        coordinates: [0, 0] // Remplacez ces valeurs par celles récupérées (ex: via la géolocalisation)
      },
      important: false,
      // Le champ user doit correspondre à l'ID utilisateur ; ici, vous le mettez à 1 si non anonyme
      user: formData.anonymous ? null : 1,
    };

    fetch("http://localhost:8000/api/denonciations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Erreur lors de l'envoi du signalement");
        }
        return response.json();
      })
      .then(data => {
        console.log("Signalement créé :", data);
        setSuccessMessage("Signalement envoyé avec succès !");
        // Réinitialisation du formulaire
        setFormData({
          title: "",
          description: "",
          category: "",
          anonymous: false,
        });
      })
      .catch(error => {
        console.error("Erreur :", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
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

          {/* Signalement anonyme */}
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              name="anonymous"
              checked={formData.anonymous}
              onChange={handleChange}
              className="w-6 h-6 accent-red-600 rounded-md"
            />
            <label className="text-gray-700 font-semibold">
              Signaler anonymement
            </label>
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
